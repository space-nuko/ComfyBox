import { LiteGraph, type ContextMenuItem, type LGraphNode, type Vector2, LConnectionKind, LLink, LGraphCanvas, type SlotType, TitleMode, type SlotLayout, LGraph, type INodeInputSlot, type ITextWidget, type INodeOutputSlot, type SerializedLGraphNode, BuiltInSlotType, type PropertyLayout, type IComboWidget, NodeMode } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import ComboWidget from "$lib/widgets/ComboWidget.svelte";
import RangeWidget from "$lib/widgets/RangeWidget.svelte";
import TextWidget from "$lib/widgets/TextWidget.svelte";
import GalleryWidget from "$lib/widgets/GalleryWidget.svelte";
import ButtonWidget from "$lib/widgets/ButtonWidget.svelte";
import CheckboxWidget from "$lib/widgets/CheckboxWidget.svelte";
import type { SvelteComponentDev } from "svelte/internal";
import { Watch } from "@litegraph-ts/nodes-basic";
import type IComfyInputSlot from "$lib/IComfyInputSlot";
import { writable, type Unsubscriber, type Writable, get } from "svelte/store";
import { clamp, range } from "$lib/utils"
import layoutState from "$lib/stores/layoutState";
import type { FileData as GradioFileData } from "@gradio/upload";
import queueState from "$lib/stores/queueState";

export interface ComfyWidgetProperties extends Record<string, any> {
    defaultValue: any
}

/*
 * A node that is tied to a UI widget in the frontend. When the frontend's
 * widget is changed, the value of the first output in the node is updated
 * in the litegraph instance.
 */
export abstract class ComfyWidgetNode<T = any> extends ComfyGraphNode {
    abstract properties: ComfyWidgetProperties;

    value: Writable<T>
    propsChanged: Writable<number> = writable(0) // dummy to indicate if props changed
    unsubscribe: Unsubscriber;

    /** Svelte class for the frontend logic */
    abstract svelteComponentType: typeof SvelteComponentDev

    /** If false, user manually set min/max/step, and should not be autoinherited from connected input */
    autoConfig: boolean = true;

    copyFromInputLink: boolean = true;

    abstract defaultValue: T;

    /** Names of properties to add as inputs */
    // shownInputProperties: string[] = []

    /** Names of properties to add as outputs */
    private shownOutputProperties: Record<string, { type: string, index: number }> = {}
    outputProperties: { name: string, type: string }[] = []

    override isBackendNode = false;
    override serialize_widgets = true;

    // input slots
    inputIndex: number = 0;

    // output slots
    outputIndex: number | null = 0;
    changedIndex: number | null = 1;

    displayWidget: ITextWidget;

    override size: Vector2 = [60, 40];

    constructor(name: string, value: T) {
        const color = LGraphCanvas.node_colors["blue"]
        super(name)
        this.value = writable(value)
        this.color ||= color.color
        this.bgColor ||= color.bgColor
        this.displayWidget = this.addWidget<ITextWidget>(
            "text",
            "Value",
            ""
        );
        this.displayWidget.disabled = true; // prevent editing
        this.unsubscribe = this.value.subscribe(this.onValueUpdated.bind(this))
    }

    addPropertyAsOutput(propertyName: string, type: string) {
        if (this.shownOutputProperties[propertyName])
            return;

        if (!(propertyName in this.properties)) {
            throw `No property named ${propertyName} found!`
        }

        this.shownOutputProperties[propertyName] = { type, index: this.outputs.length }
        this.addOutput(propertyName, type)
    }

    formatValue(value: any): string {
        return Watch.toString(value)
    }

    override changeMode(modeTo: NodeMode): boolean {
        const result = super.changeMode(modeTo);
        this.notifyPropsChanged();
        // Also need to notify the parent container since it's what controls the
        // hidden state of the widget
        const layoutEntry = layoutState.findLayoutEntryForNode(this.id)
        if (layoutEntry && layoutEntry.parent)
            layoutEntry.parent.attrsChanged.set(get(layoutEntry.parent.attrsChanged) + 1)
        return result;
    }

    private onValueUpdated(value: any) {
        console.debug("[Widget] valueUpdated", this, value)
        this.displayWidget.value = this.formatValue(value)

        if (this.outputIndex !== null && this.outputs.length >= this.outputIndex) {
            this.setOutputData(this.outputIndex, get(this.value))
        }
        if (this.changedIndex !== null && this.outputs.length >= this.changedIndex) {
            const changedOutput = this.outputs[this.changedIndex]
            if (changedOutput.type === BuiltInSlotType.EVENT)
                this.triggerSlot(this.changedIndex, get(this.value))
        }
    }

    setValue(value: any) {
        this.value.set(value)
    }

    override onPropertyChanged(property: string, value: any, prevValue?: any) {
        const data = this.shownOutputProperties[property]
        if (data)
            this.setOutputData(data.index, value)
    }

    /*
     * Logic to run if this widget can be treated as output (slider, combo, text)
     */
    override onExecute() {
        if (this.copyFromInputLink) {
            if (this.inputs.length >= this.inputIndex) {
                const data = this.getInputData(this.inputIndex)
                if (data != null) { // TODO can "null" be a legitimate value here?
                    this.setValue(data)
                }
            }
        }
        if (this.outputs.length >= this.outputIndex) {
            this.setOutputData(this.outputIndex, get(this.value))
        }
        for (const propName in this.shownOutputProperties) {
            const data = this.shownOutputProperties[propName]
            this.setOutputData(data.index, this.properties[propName])
        }
    }

    onConnectOutput(
        outputIndex: number,
        inputType: INodeInputSlot["type"],
        input: INodeInputSlot,
        inputNode: LGraphNode,
        inputIndex: number
    ): boolean {
        const anyConnected = range(this.outputs.length).some(i => this.getOutputLinks(i).length > 0);

        if (this.autoConfig && "config" in input && !anyConnected) {
            this.doAutoConfig(input as IComfyInputSlot)
        }

        return true;
    }

    doAutoConfig(input: IComfyInputSlot) {
        // Copy properties from default config in input slot
        const comfyInput = input as IComfyInputSlot;
        for (const key in comfyInput.config)
            this.setProperty(key, comfyInput.config[key])

        if ("defaultValue" in this.properties)
            this.setValue(this.properties.defaultValue)

        const widget = layoutState.findLayoutForNode(this.id)
        if (widget && input.name !== "") {
            widget.attrs.title = input.name;
        }

        console.debug("Property copy", input, this.properties)

        this.setValue(get(this.value))
        this.notifyPropsChanged();
    }

    notifyPropsChanged() {
        this.propsChanged.set(get(this.propsChanged) + 1)
    }

    override onConnectionsChange(
        type: LConnectionKind,
        slotIndex: number,
        isConnected: boolean,
        link: LLink,
        ioSlot: (INodeOutputSlot | INodeInputSlot)
    ): void {
        super.onConnectionsChange(type, slotIndex, isConnected, link, ioSlot);
        this.clampConfig();
    }

    clampConfig() {
        let changed = false;
        for (const link of this.getOutputLinks(0)) {
            if (link) { // can be undefined if the link is removed
                const node = this.graph._nodes_by_id[link.target_id]
                if (node) {
                    const input = node.inputs[link.target_slot]
                    if (input && "config" in input) {
                        this.clampOneConfig(input as IComfyInputSlot)
                        changed = true;
                    }
                }
            }
        }

        // Force reactivity change so the frontend can be updated with the new props
        this.notifyPropsChanged();
    }

    clampOneConfig(input: IComfyInputSlot) { }

    override onSerialize(o: SerializedLGraphNode) {
        (o as any).comfyValue = get(this.value);
        (o as any).shownOutputProperties = this.shownOutputProperties
        super.onSerialize(o);
    }

    override onConfigure(o: SerializedLGraphNode) {
        this.value.set((o as any).comfyValue);
        this.shownOutputProperties = (o as any).shownOutputProperties;
    }

    override stripUserState(o: SerializedLGraphNode) {
        super.stripUserState(o);
        (o as any).comfyValue = this.defaultValue;
        o.properties.defaultValue = null;
    }
}

export interface ComfySliderProperties extends ComfyWidgetProperties {
    min: number,
    max: number,
    step: number,
    precision: number
}

export class ComfySliderNode extends ComfyWidgetNode<number> {
    override properties: ComfySliderProperties = {
        defaultValue: 0,
        min: 0,
        max: 10,
        step: 1,
        precision: 1
    }

    override svelteComponentType = RangeWidget
    override defaultValue = 0;

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "value", type: "number" },
            { name: "store", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "value", type: "number" },
            { name: "changed", type: BuiltInSlotType.EVENT },
        ]
    }

    override outputProperties = [
        { name: "min", type: "number" },
        { name: "max", type: "number" },
        { name: "step", type: "number" },
        { name: "precision", type: "number" },
    ]

    constructor(name?: string) {
        super(name, 0)
    }

    override onAction(action: any, param: any) {
        if (action === "store" && typeof param === "number")
            this.setValue(param)
    }

    override setValue(value: any) {
        if (typeof value !== "number")
            return;
        super.setValue(clamp(value, this.properties.min, this.properties.max))
    }

    override clampOneConfig(input: IComfyInputSlot) {
        // this.setProperty("min", clamp(this.properties.min, input.config.min, input.config.max))
        // this.setProperty("max", clamp(this.properties.max, input.config.max, input.config.min))
        // this.setProperty("step", Math.min(this.properties.step, input.config.step))
        this.setValue(this.properties.defaultValue)
    }
}

LiteGraph.registerNodeType({
    class: ComfySliderNode,
    title: "UI.Slider",
    desc: "Slider outputting a number value",
    type: "ui/slider"
})

export interface ComfyComboProperties extends ComfyWidgetProperties {
    values: string[]
}

export class ComfyComboNode extends ComfyWidgetNode<string> {
    override properties: ComfyComboProperties = {
        defaultValue: "A",
        values: ["A", "B", "C", "D"]
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "value", type: "string" },
            { name: "store", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "value", type: "string" },
            { name: "changed", type: BuiltInSlotType.EVENT }
        ]
    }

    override svelteComponentType = ComboWidget
    override defaultValue = "A";

    comboRefreshed: Writable<boolean>;

    constructor(name?: string) {
        super(name, "A")
        this.comboRefreshed = writable(false)
    }

    onConnectOutput(
        outputIndex: number,
        inputType: INodeInputSlot["type"],
        input: INodeInputSlot,
        inputNode: LGraphNode,
        inputIndex: number
    ): boolean {
        if (!super.onConnectOutput(outputIndex, inputType, input, inputNode, inputIndex))
            return false;

        const thisProps = this.properties;
        if (!("config" in input))
            return true;

        const comfyInput = input as IComfyInputSlot;
        const otherProps = comfyInput.config;

        // Ensure combo options match
        if (!(otherProps.values instanceof Array))
            return false;
        if (thisProps.values.find((v, i) => otherProps.values.indexOf(v) === -1))
            return false;

        return true;
    }

    override onAction(action: any, param: any) {
        if (action === "store" && typeof param === "string")
            this.setValue(param)
    }

    override setValue(value: any) {
        if (typeof value !== "string" || this.properties.values.indexOf(value) === -1)
            return;
        super.setValue(value)
    }

    override clampOneConfig(input: IComfyInputSlot) {
        if (!input.config.values)
            this.setValue("")
        else if (input.config.values.indexOf(this.properties.value) === -1) {
            if (input.config.values.length === 0)
                this.setValue("")
            else
                this.setValue(input.config.defaultValue || input.config.values[0])
        }
    }

    override stripUserState(o: SerializedLGraphNode) {
        super.stripUserState(o);
        o.properties.values = []
    }
}

LiteGraph.registerNodeType({
    class: ComfyComboNode,
    title: "UI.Combo",
    desc: "Combo box outputting a string value",
    type: "ui/combo"
})

export interface ComfyTextProperties extends ComfyWidgetProperties {
    multiline: boolean;
}

export class ComfyTextNode extends ComfyWidgetNode<string> {
    override properties: ComfyTextProperties = {
        defaultValue: "",
        multiline: false
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "value", type: "string" },
            { name: "store", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "value", type: "string" },
            { name: "changed", type: BuiltInSlotType.EVENT }
        ]
    }

    override svelteComponentType = TextWidget
    override defaultValue = "";

    constructor(name?: string) {
        super(name, "")
    }

    override onAction(action: any, param: any) {
        if (action === "store")
            this.setValue(param)
    }

    override setValue(value: any) {
        super.setValue(`${value}`)
    }
}

LiteGraph.registerNodeType({
    class: ComfyTextNode,
    title: "UI.Text",
    desc: "Textbox outputting a string value",
    type: "ui/text"
})

/** Raw output as received from ComfyUI's backend */
export type GalleryOutput = {
    images: GalleryOutputEntry[]
}

/** Raw output entry as received from ComfyUI's backend */
export type GalleryOutputEntry = {
    filename: string,
    subfolder: string,
    type: string
}

export interface ComfyGalleryProperties extends ComfyWidgetProperties {
    index: number,
    updateMode: "replace" | "append"
}

export class ComfyGalleryNode extends ComfyWidgetNode<GradioFileData[]> {
    override properties: ComfyGalleryProperties = {
        defaultValue: [],
        index: 0,
        updateMode: "replace"
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "images", type: "OUTPUT" },
            { name: "store", type: BuiltInSlotType.ACTION, options: { color_off: "rebeccapurple", color_on: "rebeccapurple" } },
            { name: "clear", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "selected_index", type: "number" }
        ]
    }

    static propertyLayout: PropertyLayout = [
        { name: "updateMode", defaultValue: "replace", type: "enum", options: { values: ["replace", "append"] } }
    ]

    override svelteComponentType = GalleryWidget
    override defaultValue = []
    override copyFromInputLink = false;
    override outputIndex = null;
    override changedIndex = null;

    modeWidget: IComboWidget;

    constructor(name?: string) {
        super(name, [])
        this.modeWidget = this.addWidget("combo", "Mode", this.properties.updateMode, null, { property: "updateMode", values: ["replace", "append"] })
    }

    override onPropertyChanged(property: any, value: any) {
        if (property === "updateMode") {
            this.modeWidget.value = value;
        }
    }

    override onExecute() {
        this.setOutputData(0, this.properties.index)
    }

    override onAction(action: any, param: any, options: { action_call?: string }) {
        if (action === "clear") {
            this.setValue([])
        }
        else if (action === "store") {
            if (param && "images" in param) {
                const data = param as GalleryOutput
                console.debug("[ComfyGalleryNode] Received output!", data)

                const galleryItems: GradioFileData[] = this.convertItems(data)

                if (this.properties.updateMode === "append") {
                    const currentValue = get(this.value)
                    this.setValue(currentValue.concat(galleryItems))
                }
                else {
                    this.setValue(galleryItems)
                }
            }
            this.setProperty("index", 0)
        }
    }

    override formatValue(value: GradioFileData[] | null): string {
        return `Images: ${value?.length || 0}`
    }

    private convertItems(output: GalleryOutput): GradioFileData[] {
        return output.images.map(r => {
            // TODO configure backend URL
            const url = `http://${location.hostname}:8188` // TODO make configurable
            const params = new URLSearchParams(r)
            return {
                name: null,
                data: url + "/view?" + params
            }
        });
    }

    override setValue(value: any) {
        if (Array.isArray(value)) {
            super.setValue(value)
        }
        else {
            super.setValue([])
        }

        const len = get(this.value).length
        if (this.properties.index < 0 || this.properties.index >= len) {
            this.setProperty("index", clamp(this.properties.index, 0, len))
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfyGalleryNode,
    title: "UI.Gallery",
    desc: "Gallery that shows most recent outputs",
    type: "ui/gallery"
})

export interface ComfyButtonProperties extends ComfyWidgetProperties {
    param: string
}

export class ComfyButtonNode extends ComfyWidgetNode<boolean> {
    override properties: ComfyButtonProperties = {
        defaultValue: false,
        param: "bang"
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "clicked", type: BuiltInSlotType.EVENT },
            { name: "isClicked", type: "boolean" },
        ]
    }

    override svelteComponentType = ButtonWidget;
    override defaultValue = false;
    override outputIndex = 1;

    constructor(name?: string) {
        super(name, false)
    }

    override setValue(value: any) {
        super.setValue(Boolean(value))
    }

    onClick() {
        this.setValue(true)
        this.triggerSlot(0, this.properties.param);
        this.setValue(false) // TODO onRelease
    }
}

LiteGraph.registerNodeType({
    class: ComfyButtonNode,
    title: "UI.Button",
    desc: "Button that triggers an event when clicked",
    type: "ui/button"
})

export interface ComfyCheckboxProperties extends ComfyWidgetProperties {
}

export class ComfyCheckboxNode extends ComfyWidgetNode<boolean> {
    override properties: ComfyCheckboxProperties = {
        defaultValue: false,
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "value", type: "boolean" },
            { name: "changed", type: BuiltInSlotType.EVENT },
        ]
    }

    override svelteComponentType = CheckboxWidget;
    override defaultValue = false;

    override setValue(value: any) {
        value = Boolean(value)
        const changed = value != get(this.value);
        super.setValue(Boolean(value))
        if (changed)
            this.triggerSlot(1, value)
    }

    constructor(name?: string) {
        super(name, false)
    }
}

LiteGraph.registerNodeType({
    class: ComfyCheckboxNode,
    title: "UI.Checkbox",
    desc: "Checkbox that stores a boolean value",
    type: "ui/checkbox"
})
