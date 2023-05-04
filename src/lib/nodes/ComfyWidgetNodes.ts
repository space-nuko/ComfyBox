import { LiteGraph, type ContextMenuItem, type LGraphNode, type Vector2, LConnectionKind, LLink, LGraphCanvas, type SlotType, TitleMode, type SlotLayout, LGraph, type INodeInputSlot, type ITextWidget, type INodeOutputSlot, type SerializedLGraphNode, BuiltInSlotType } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import ComboWidget from "$lib/widgets/ComboWidget.svelte";
import RangeWidget from "$lib/widgets/RangeWidget.svelte";
import TextWidget from "$lib/widgets/TextWidget.svelte";
import GalleryWidget from "$lib/widgets/GalleryWidget.svelte";
import ButtonWidget from "$lib/widgets/ButtonWidget.svelte";
import type { SvelteComponentDev } from "svelte/internal";
import { Watch } from "@litegraph-ts/nodes-basic";
import type IComfyInputSlot from "$lib/IComfyInputSlot";
import { writable, type Unsubscriber, type Writable, get } from "svelte/store";
import { clamp } from "$lib/utils"
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
    propsChanged: Writable<boolean> = writable(true) // dummy to indicate if props changed
    unsubscribe: Unsubscriber;

    /** Svelte class for the frontend logic */
    abstract svelteComponentType: typeof SvelteComponentDev

    /** If false, user manually set min/max/step, and should not be autoinherited from connected input */
    autoConfig: boolean = true;

    override isBackendNode = false;
    override serialize_widgets = true;

    outputIndex: number = 0;
    inputIndex: number = 0;
    changedIndex: number = 1;

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

    formatValue(value: any): string {
        return Watch.toString(value)
    }

    private onValueUpdated(value: any) {
        console.debug("[Widget] valueUpdated", this, value)
        this.displayWidget.value = this.formatValue(value)

        if (this.outputs.length >= this.outputIndex) {
            this.setOutputData(this.outputIndex, get(this.value))
        }
        if (this.outputs.length >= this.changedIndex) {
            const changedOutput = this.outputs[this.changedIndex]
            if (changedOutput.type === BuiltInSlotType.EVENT)
                this.triggerSlot(this.changedIndex, "changed")
        }
    }

    setValue(value: any) {
        this.value.set(value)
    }

    abstract validateValue(value: any): boolean;

    /*
     * Logic to run if this widget can be treated as output (slider, combo, text)
     */
    override onExecute() {
        if (this.inputs.length >= this.inputIndex) {
            const data = this.getInputData(this.inputIndex)
            if (data && this.validateValue(data)) { // TODO can "null" be a legitimate value here?
                this.setValue(data)
            }
        }
        if (this.outputs.length >= this.outputIndex) {
            this.setOutputData(this.outputIndex, get(this.value))
        }
    }

    /** Called when a backend node sends a ComfyUI output over a link */
    receiveOutput() {
    }

    onConnectOutput(
        outputIndex: number,
        inputType: INodeInputSlot["type"],
        input: INodeInputSlot,
        inputNode: LGraphNode,
        inputIndex: number
    ): boolean {
        if (this.autoConfig) {
            // Copy properties from default config in input slot
            if ("config" in input) {
                const comfyInput = input as IComfyInputSlot;
                for (const key in comfyInput.config)
                    this.setProperty(key, comfyInput.config[key])
            }
            if ("defaultValue" in this.properties)
                this.setValue(this.properties.defaultValue)

            const widget = layoutState.findLayoutForNode(this.id)
            if (widget && input.name !== "") {
                widget.attrs.title = input.name;
            }

            console.debug("Property copy", input, this.properties)

            this.setValue(get(this.value))
        }

        return true;
    }

    onConnectionsChange(
        type: LConnectionKind,
        slotIndex: number,
        isConnected: boolean,
        link: LLink,
        ioSlot: (INodeOutputSlot | INodeInputSlot)
    ): void {
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
        this.propsChanged.set(!get(this.propsChanged))
    }

    clampOneConfig(input: IComfyInputSlot) { }

    override onSerialize(o: SerializedLGraphNode) {
        (o as any).comfyValue = get(this.value)
    }

    override onConfigure(o: SerializedLGraphNode) {
        this.value.set((o as any).comfyValue)
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

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "value", type: "number" }
        ],
        outputs: [
            { name: "value", type: "number" },
            { name: "changed", type: BuiltInSlotType.EVENT }
        ]
    }

    constructor(name?: string) {
        super(name, 0)
    }

    override validateValue(value: any): boolean {
        return typeof value === "number"
            && value >= this.properties.min
            && value <= this.properties.max
    }

    override clampOneConfig(input: IComfyInputSlot) {
        // this.setProperty("min", clamp(this.properties.min, input.config.min, input.config.max))
        // this.setProperty("max", clamp(this.properties.max, input.config.max, input.config.min))
        // this.setProperty("step", Math.min(this.properties.step, input.config.step))
        this.setValue(clamp(this.properties.defaultValue, this.properties.min, this.properties.max))
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
            { name: "value", type: "string" }
        ],
        outputs: [
            { name: "value", type: "string" },
            { name: "changed", type: BuiltInSlotType.EVENT }
        ]
    }

    override svelteComponentType = ComboWidget

    constructor(name?: string) {
        super(name, "A")
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

    override validateValue(value: any): boolean {
        if (typeof value !== "string")
            return false;
        return this.properties.values.indexOf(value) !== -1;
    }

    override clampOneConfig(input: IComfyInputSlot) {
        if (input.config.values.indexOf(this.properties.value) === -1) {
            if (input.config.values.length === 0)
                this.setValue("")
            else
                this.setValue(input.config.values[0])
        }
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
            { name: "value", type: "string" }
        ],
        outputs: [
            { name: "value", type: "string" },
            { name: "changed", type: BuiltInSlotType.EVENT }
        ]
    }

    override svelteComponentType = TextWidget

    constructor(name?: string) {
        super(name, "")
    }

    override validateValue(value: any): boolean {
        return typeof value === "string"
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
}

export class ComfyGalleryNode extends ComfyWidgetNode<GradioFileData[]> {
    override properties: ComfyGalleryProperties = {
        defaultValue: []
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "images", type: "OUTPUT" }
        ]
    }

    override svelteComponentType = GalleryWidget

    constructor(name?: string) {
        super(name, [])
    }

    override afterQueued() {
        let queue = get(queueState)
        if (!(typeof queue.queueRemaining === "number" && queue.queueRemaining > 1)) {
            this.setValue([])
        }
    }

    override formatValue(value: GradioFileData[]): string {
        return `Images: ${value.length}`
    }

    override validateValue(value: any): boolean {
        return Array.isArray(value) && value.every(e => "images" in e)
    }

    receiveOutput() {
        const link = this.getInputLink(0)
        if (link.data && "images" in link.data) {
            const data = link.data as GalleryOutput
            console.debug("[ComfyGalleryNode] Received output!", data)

            const galleryItems: GradioFileData[] = data.images.map(r => {
                // TODO configure backend URL
                const url = "http://localhost:8188/view?"
                const params = new URLSearchParams(r)
                return {
                    name: null,
                    data: url + params
                }
            });

            const currentValue = get(this.value)
            this.setValue(currentValue.concat(galleryItems))
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
    message: string
}

export class ComfyButtonNode extends ComfyWidgetNode<boolean> {
    override properties: ComfyButtonProperties = {
        defaultValue: false,
        message: "bang"
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "event", type: BuiltInSlotType.EVENT },
            { name: "isClicked", type: "boolean" },
        ]
    }

    override outputIndex = 1;
    override svelteComponentType = ButtonWidget;

    override validateValue(value: any): boolean {
        return typeof value === "boolean"
    }

    onClick() {
        this.setValue(true)
        this.triggerSlot(0, this.properties.message);
        this.setValue(false)
    }

    constructor(name?: string) {
        super(name, false)
    }
}

LiteGraph.registerNodeType({
    class: ComfyButtonNode,
    title: "UI.Button",
    desc: "Button that triggers an event when clicked",
    type: "ui/button"
})
