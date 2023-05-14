import { LiteGraph, type ContextMenuItem, type LGraphNode, type Vector2, LConnectionKind, LLink, LGraphCanvas, type SlotType, TitleMode, type SlotLayout, LGraph, type INodeInputSlot, type ITextWidget, type INodeOutputSlot, type SerializedLGraphNode, BuiltInSlotType, type PropertyLayout, type IComboWidget, NodeMode, type INumberWidget, type UUID } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "./ComfyGraphNode";
import type { SvelteComponentDev } from "svelte/internal";
import { Watch } from "@litegraph-ts/nodes-basic";
import type IComfyInputSlot from "$lib/IComfyInputSlot";
import { writable, type Unsubscriber, type Writable, get } from "svelte/store";
import { clamp, convertComfyOutputToGradio, range, type ComfyUploadImageType, isComfyBoxImageMetadata, filenameToComfyBoxMetadata, type ComfyBoxImageMetadata, isComfyExecutionResult, executionResultToImageMetadata, parseWhateverIntoImageMetadata } from "$lib/utils"
import layoutState from "$lib/stores/layoutState";
import type { FileData as GradioFileData } from "@gradio/upload";
import queueState from "$lib/stores/queueState";

import ComboWidget from "$lib/widgets/ComboWidget.svelte";
import RangeWidget from "$lib/widgets/RangeWidget.svelte";
import TextWidget from "$lib/widgets/TextWidget.svelte";
import GalleryWidget from "$lib/widgets/GalleryWidget.svelte";
import ButtonWidget from "$lib/widgets/ButtonWidget.svelte";
import CheckboxWidget from "$lib/widgets/CheckboxWidget.svelte";
import RadioWidget from "$lib/widgets/RadioWidget.svelte";
import ImageUploadWidget from "$lib/widgets/ImageUploadWidget.svelte";
import ImageEditorWidget from "$lib/widgets/ImageEditorWidget.svelte";
import type { NodeID } from "$lib/api";

export type AutoConfigOptions = {
    includeProperties?: Set<string> | null,
    setDefaultValue?: boolean
    setWidgetTitle?: boolean
}

/*
 * NOTE: If you want to add a new widget but it has the same input/output type
 * as another one of the existing widgets, best to create a new "variant" of
 * that widget instead.
 *
 * - Go to layoutState, look for `ALL_ATTRIBUTES,` insert or find a "variant"
 *   attribute and set `validNodeTypes` to the type of the litegraph node
 * - Add a new entry in the `values` array, like "knob" or "dial" for ComfySliderWidget
 * - Add an {#if widget.attrs.variant === <...>} statement in the existing Svelte component
 *
 * Also, BEWARE of calling setOutputData() and triggerSlot() on the same frame!
 * You will have to either implement an internal delay on the event triggering
 * or use an Event Delay node to ensure the output slot data can propagate to
 * the rest of the graph first (see `delayChangedEvent` for details)
 */

export interface ComfyWidgetProperties extends ComfyGraphNodeProperties {
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

    /**
     * If true wait until next frame update to trigger the changed event.
     * Reason is, if the event is triggered immediately then other stuff that wants to run
     * their own onExecute on the output value won't have completed yet.
     */
    delayChangedEvent: boolean = true;

    private _aboutToChange: number = 0;
    private _aboutToChangeValue: any = null;
    private _noChangedEvent: boolean = false;

    abstract defaultValue: T;

    /** Names of properties to add as inputs */
    // shownInputProperties: string[] = []

    /** Names of properties to add as outputs */
    private shownOutputProperties: Record<string, { type: string, index: number }> = {}
    outputProperties: { name: string, type: string }[] = []

    override isBackendNode = false;
    override serialize_widgets = true;


    // TODO these are bad, create override methods instead
    // input slots
    inputIndex: number | null = null;
    storeActionName: string | null = "store";

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
        return result;
    }

    private onValueUpdated(value: any) {
        // console.debug("[Widget] valueUpdated", this, value)
        this.displayWidget.value = this.formatValue(value)

        if (this.outputIndex !== null && this.outputs.length >= this.outputIndex) {
            this.setOutputData(this.outputIndex, get(this.value))
        }

        if (this.changedIndex !== null && this.outputs.length >= this.changedIndex && !this._noChangedEvent) {
            if (!this.delayChangedEvent)
                this.triggerChangeEvent(get(this.value))
            else {
                // console.debug("[Widget] queueChangeEvent", this, value)
                this._aboutToChange = 2; // wait 1.5-2 frames, in case we're already in the middle of executing the graph
                this._aboutToChangeValue = get(this.value);
            }
        }
        this._noChangedEvent = false;
    }

    private triggerChangeEvent(value: any) {
        // console.debug("[Widget] trigger changed", this, value)
        const changedOutput = this.outputs[this.changedIndex]
        if (changedOutput.type === BuiltInSlotType.EVENT)
            this.triggerSlot(this.changedIndex, value)
    }

    parseValue(value: any): T { return value as T };

    getValue(): T {
        return get(this.value);
    }

    setValue(value: any, noChangedEvent: boolean = false) {
        if (noChangedEvent)
            this._noChangedEvent = true;

        const parsed = this.parseValue(value)
        this.value.set(parsed)

        // In case value.set() does not trigger onValueUpdated, we need to reset
        // the counter here also.
        this._noChangedEvent = false;
    }

    override onPropertyChanged(property: string, value: any, prevValue?: any) {
        if (this.shownOutputProperties != null) {
            const data = this.shownOutputProperties[property]
            if (data)
                this.setOutputData(data.index, value)
        }
    }

    /*
     * Logic to run if this widget can be treated as output (slider, combo, text)
     */
    override onExecute(param: any, options: object) {
        if (this.inputIndex != null) {
            if (this.inputs.length >= this.inputIndex) {
                const data = this.getInputData(this.inputIndex)
                if (data != null) { // TODO can "null" be a legitimate value here?
                    this.setValue(data)
                }
            }
        }
        if (this.outputIndex != null) {
            if (this.outputs.length >= this.outputIndex) {
                this.setOutputData(this.outputIndex, get(this.value))
            }
        }
        for (const propName in this.shownOutputProperties) {
            const data = this.shownOutputProperties[propName]
            this.setOutputData(data.index, this.properties[propName])
        }

        // Fire a pending change event after one full step of the graph has
        // finished processing
        if (this._aboutToChange > 0) {
            this._aboutToChange -= 1
            if (this._aboutToChange <= 0) {
                const value = this._aboutToChangeValue;
                this._aboutToChange = 0;
                this._aboutToChangeValue = null;
                this.triggerChangeEvent(value);
            }
        }
    }

    override onAction(action: any, param: any, options: { action_call?: string }) {
        if (action === this.storeActionName) {
            let noChangedEvent = false;
            let value = param;
            if (param != null && typeof param === "object" && "value" in param) {
                value = param.value
                if ("noChangedEvent" in param)
                    noChangedEvent = Boolean(param.noChangedEvent)
            }
            this.setValue(value, noChangedEvent)
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

        if (this.autoConfig && "config" in input && !anyConnected && (input as IComfyInputSlot).widgetNodeType === this.type) {
            this.doAutoConfig(input as IComfyInputSlot)
        }

        return true;
    }

    doAutoConfig(input: IComfyInputSlot, options: AutoConfigOptions = { setDefaultValue: true, setWidgetTitle: true }) {
        // Copy properties from default config in input slot
        const comfyInput = input as IComfyInputSlot;
        for (const key in comfyInput.config) {
            if (options.includeProperties == null || options.includeProperties.has(key))
                this.setProperty(key, comfyInput.config[key])
        }

        if (options.setDefaultValue) {
            if ("defaultValue" in this.properties)
                this.setValue(this.properties.defaultValue)
        }

        if (options.setWidgetTitle) {
            const widget = layoutState.findLayoutForNode(this.id as NodeID)
            if (widget && input.name !== "") {
                widget.attrs.title = input.name;
            }
        }

        // console.debug("Property copy", input, this.properties)

        this.setValue(get(this.value))

        this.onAutoConfig(input);

        this.notifyPropsChanged();
    }

    onAutoConfig(input: IComfyInputSlot) {
    }

    notifyPropsChanged() {
        const layoutEntry = layoutState.findLayoutEntryForNode(this.id as NodeID)
        if (layoutEntry && layoutEntry.parent) {
            layoutEntry.parent.attrsChanged.set(get(layoutEntry.parent.attrsChanged) + 1)
        }
        // console.debug("propsChanged", this)
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
        const value = (o as any).comfyValue || LiteGraph.cloneObject(this.defaultValue);
        this.value.set(value);
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
        tags: [],
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

    override parseValue(value: any): number {
        if (typeof value !== "number")
            return this.properties.min;
        return clamp(value, this.properties.min, this.properties.max)
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

    /* JS Function body that takes a parameter named "value" as a parameter and returns the label for each combo entry */
    convertValueToLabelCode: string
}

export class ComfyComboNode extends ComfyWidgetNode<string> {
    override properties: ComfyComboProperties = {
        tags: [],
        defaultValue: "A",
        values: ["A", "B", "C", "D"],
        convertValueToLabelCode: ""
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
    override saveUserState = false;

    // True if at least one combo box refresh has taken place
    // Wait until the initial graph load for combo to be valid.
    firstLoad: Writable<boolean>;
    valuesForCombo: Writable<any[] | null>; // Changed when the combo box has values.

    constructor(name?: string) {
        super(name, "A")
        this.firstLoad = writable(false)
        this.valuesForCombo = writable(null)
    }

    override onPropertyChanged(property: any, value: any) {
        if (property === "values" || property === "convertValueToLabelCode") {
            // this.formatValues(this.properties.values)
        }
    }

    formatValues(values: string[]) {
        if (values == null)
            return;

        this.properties.values = values;

        let formatter: any;
        if (this.properties.convertValueToLabelCode)
            formatter = new Function("value", this.properties.convertValueToLabelCode) as (v: string) => string;
        else
            formatter = (value: any) => `${value}`;

        let valuesForCombo = []

        try {
            valuesForCombo = this.properties.values.map((value, index) => {
                return {
                    value,
                    label: formatter(value),
                    index
                }
            })
        }
        catch (err) {
            console.error("Failed formatting!", err)
            valuesForCombo = this.properties.values.map((value, index) => {
                return {
                    value,
                    label: `${value}`,
                    index
                }
            })
        }

        this.firstLoad.set(true)
        this.valuesForCombo.set(valuesForCombo);
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

    override parseValue(value: any): string {
        if (typeof value !== "string" || this.properties.values.indexOf(value) === -1)
            return this.properties.values[0]
        return value
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

    override onSerialize(o: SerializedLGraphNode) {
        super.onSerialize(o);
        // TODO fix saving combo nodes with huge values lists
        o.properties.values = []
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
        tags: [],
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

    override parseValue(value: any): string {
        return `${value}`
    }
}

LiteGraph.registerNodeType({
    class: ComfyTextNode,
    title: "UI.Text",
    desc: "Textbox outputting a string value",
    type: "ui/text"
})

/** Raw output as received from ComfyUI's backend */
export interface ComfyExecutionResult {
    // Technically this response can contain arbitrary data, but "images" is the
    // most frequently used as it's output by LoadImage and PreviewImage, the
    // only two output nodes in base ComfyUI.
    images: ComfyImageLocation[] | null,
}

/** Raw output entry as received from ComfyUI's backend */
export type ComfyImageLocation = {
    /* Filename with extension in the subfolder. */
    filename: string,
    /* Subfolder in the containing folder. */
    subfolder: string,
    /* Base ComfyUI folder where the image is located. */
    type: ComfyUploadImageType
}

export interface ComfyGalleryProperties extends ComfyWidgetProperties {
    index: number,
    updateMode: "replace" | "append",
}

export class ComfyGalleryNode extends ComfyWidgetNode<ComfyBoxImageMetadata[]> {
    override properties: ComfyGalleryProperties = {
        tags: [],
        defaultValue: [],
        index: 0,
        updateMode: "replace",
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "images", type: "OUTPUT" },
            { name: "store", type: BuiltInSlotType.ACTION, options: { color_off: "rebeccapurple", color_on: "rebeccapurple" } }
        ],
        outputs: [
            { name: "images", type: "COMFYBOX_IMAGES" },
            { name: "selected_index", type: "number" },
        ]
    }

    static propertyLayout: PropertyLayout = [
        { name: "updateMode", defaultValue: "replace", type: "enum", options: { values: ["replace", "append"] } }
    ]

    override svelteComponentType = GalleryWidget
    override defaultValue = []
    override inputIndex = null;
    override saveUserState = false;
    override outputIndex = null;
    override changedIndex = null;

    selectedFilename: string | null = null;

    selectedIndexWidget: ITextWidget;
    modeWidget: IComboWidget;

    constructor(name?: string) {
        super(name, [])
        this.selectedIndexWidget = this.addWidget("text", "Selected", String(this.properties.index), "index")
        this.selectedIndexWidget.disabled = true;
        this.modeWidget = this.addWidget("combo", "Mode", this.properties.updateMode, null, { property: "updateMode", values: ["replace", "append"] })
    }

    override onPropertyChanged(property: any, value: any) {
        if (property === "updateMode") {
            this.modeWidget.value = value;
        }
    }

    override onExecute() {
        this.setOutputData(0, get(this.value))
        this.setOutputData(1, this.properties.index)
    }

    override onAction(action: any, param: any, options: { action_call?: string }) {
        super.onAction(action, param, options)
    }

    override formatValue(value: ComfyBoxImageMetadata[] | null): string {
        return `Images: ${value?.length || 0}`
    }

    override parseValue(param: any): ComfyBoxImageMetadata[] {
        const meta = parseWhateverIntoImageMetadata(param) || [];

        console.debug("[ComfyGalleryNode] Received output!", param)

        if (this.properties.updateMode === "append") {
            const currentValue = get(this.value)
            return currentValue.concat(meta)
        }
        else {
            return meta;
        }
    }

    override setValue(value: any, noChangedEvent: boolean = false) {
        super.setValue(value, noChangedEvent)
        this.setProperty("index", null)
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
        tags: [],
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

    override parseValue(param: any): boolean {
        return Boolean(param);
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
        tags: [],
        defaultValue: false,
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "value", type: "boolean" },
            { name: "store", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "value", type: "boolean" },
            { name: "changed", type: BuiltInSlotType.EVENT },
        ]
    }

    override svelteComponentType = CheckboxWidget;
    override defaultValue = false;
    override changedIndex = 1;

    constructor(name?: string) {
        super(name, false)
    }

    override parseValue(param: any) {
        return Boolean(param);
    }
}

LiteGraph.registerNodeType({
    class: ComfyCheckboxNode,
    title: "UI.Checkbox",
    desc: "Checkbox that stores a boolean value",
    type: "ui/checkbox"
})

export interface ComfyRadioProperties extends ComfyWidgetProperties {
    choices: string[]
}

export class ComfyRadioNode extends ComfyWidgetNode<string> {
    override properties: ComfyRadioProperties = {
        tags: [],
        choices: ["Choice A", "Choice B", "Choice C"],
        defaultValue: "Choice A",
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "value", type: "string,number" },
            { name: "store", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "value", type: "string" },
            { name: "index", type: "number" },
            { name: "changed", type: BuiltInSlotType.EVENT },
        ]
    }

    override svelteComponentType = RadioWidget;
    override defaultValue = "";
    override changedIndex = 2;

    indexWidget: INumberWidget;

    index = 0;

    constructor(name?: string) {
        super(name, "Choice A")
        this.indexWidget = this.addWidget("number", "Index", this.index)
        this.indexWidget.disabled = true;
    }

    override onExecute(param: any, options: object) {
        super.onExecute(param, options);
        this.setOutputData(1, this.index)
    }

    override setValue(value: string, noChangedEvent: boolean = false) {
        super.setValue(value, noChangedEvent)

        value = get(this.value);

        const index = this.properties.choices.indexOf(value)
        if (index === -1)
            return;

        this.index = index;
        this.indexWidget.value = index;
        this.setOutputData(1, this.index)
    }

    override parseValue(param: any): string {
        if (typeof param === "string") {
            if (this.properties.choices.indexOf(param) === -1)
                return this.properties.choices[0]
            return param
        }
        else {
            const index = clamp(parseInt(param), 0, this.properties.choices.length - 1)
            return this.properties.choices[index] || this.properties.defaultValue
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfyRadioNode,
    title: "UI.Radio",
    desc: "Radio that outputs a string and index",
    type: "ui/radio"
})

export interface ComfyImageEditorNodeProperties extends ComfyWidgetProperties {
}

export class ComfyImageEditorNode extends ComfyWidgetNode<ComfyBoxImageMetadata[]> {
    override properties: ComfyImageEditorNodeProperties = {
        defaultValue: [],
        tags: [],
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "store", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "images", type: "COMFYBOX_IMAGES" }, // TODO support batches
            { name: "changed", type: BuiltInSlotType.EVENT },
        ]
    }

    override svelteComponentType = ImageEditorWidget;
    override defaultValue = [];
    override outputIndex = 0;
    override inputIndex = null;
    override changedIndex = 1;
    override storeActionName = "store";
    override saveUserState = false;

    constructor(name?: string) {
        super(name, [])
    }

    override parseValue(value: any): ComfyBoxImageMetadata[] {
        return parseWhateverIntoImageMetadata(value) || [];
    }

    override formatValue(value: GradioFileData[]): string {
        return `Images: ${value?.length || 0}`
    }
}

LiteGraph.registerNodeType({
    class: ComfyImageEditorNode,
    title: "UI.ImageEditor",
    desc: "Widget that lets you upload and edit a multi-layered image. Can also act like a standalone image uploader.",
    type: "ui/image_editor"
})
