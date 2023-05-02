import { LiteGraph, type ContextMenuItem, type LGraphNode, type Vector2, LConnectionKind, LLink, LGraphCanvas, type SlotType, TitleMode, type SlotLayout, LGraph, type INodeInputSlot, type ITextWidget } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import ComboWidget from "$lib/widgets/ComboWidget.svelte";
import RangeWidget from "$lib/widgets/RangeWidget.svelte";
import TextWidget from "$lib/widgets/TextWidget.svelte";
import type { SvelteComponentDev } from "svelte/internal";
import { ComfyWidgets } from "$lib/widgets";
import { Watch } from "@litegraph-ts/nodes-basic";
import type IComfyInputSlot from "$lib/IComfyInputSlot";
import { writable, type Unsubscriber, type Writable } from "svelte/store";

export interface ComfyWidgetProperties extends Record<string, any> {
}

/*
 * A node that is tied to a UI widget in the frontend. When the frontend's
 * widget is changed, the value of the first output in the node is updated
 * in the litegraph instance.
 */
export abstract class ComfyWidgetNode<T> extends ComfyGraphNode {
    abstract properties: ComfyWidgetProperties;

    value: Writable<T>
    unsubscribe: Unsubscriber;

    /** Svelte class for the frontend logic */
    abstract svelteComponentType: typeof SvelteComponentDev
    /** Compatible litegraph widget types that can be connected to this node */
    abstract inputWidgetTypes: string[]

    /** If false, user manually set min/max/step, and should not be autoinherited from connected input */
    autoConfig: boolean = true;

    override isBackendNode = false;
    override serialize_widgets = true;

    displayWidget: ITextWidget;

    override size: Vector2 = [60, 40];

    constructor(name?: string, value: T) {
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
        this.unsubscribe = this.value.subscribe(this.onValueUpdated.bind(this))
    }

    private onValueUpdated(value: any) {
        this.displayWidget.value = Watch.toString(value)
    }

    setValue(value: any) {
        this.value.set(value)
    }

    override onExecute() {
        // Assumption: we will have one output in the inherited class with the
        // correct type
        this.setOutputData(0, this.properties.value)

        // TODO send event to linked nodes
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
            console.debug("Property copy", input, this.properties)
        }

        return true;
    }

    clampConfig() {
        for (const link of this.getOutputLinks(0)) {
            const node = this.graph._nodes_by_id[link.target_id]
            if (node) {
                const input = node.inputs[link.target_slot]
                if (input && "config" in input)
                    this.clampOneConfig(input as IComfyInputSlot)
            }
        }
    }

    clampOneConfig(input: IComfyInputSlot) {}
}

export interface ComfySliderProperties extends ComfyWidgetProperties {
    min: number,
    max: number,
    step: number,
    precision: number
}

export class ComfySliderNode extends ComfyWidgetNode<number> {
    override properties: ComfySliderProperties = {
        min: 0,
        max: 10,
        step: 1,
        precision: 1
    }

    override svelteComponentType = RangeWidget
    override inputWidgetTypes = ["number", "slider"]

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "value", type: "number" }
        ]
    }

    constructor(name?: string) {
        super(name, 0)
    }

    override clampOneConfig(input: IComfyInputSlot) {
        this.setProperty("min", Math.max(this.properties.min, input.config.min))
        this.setProperty("max", Math.max(this.properties.max, input.config.max))
        this.setProperty("step", Math.max(this.properties.step, input.config.step))
        this.setProperty("value", Math.max(Math.min(this.properties.value, this.properties.max), this.properties.min))
    }
}

LiteGraph.registerNodeType({
    class: ComfySliderNode,
    title: "UI.Slider",
    desc: "Slider outputting a number value",
    type: "ui/slider"
})

export interface ComfyComboProperties extends ComfyWidgetProperties {
    options: string[]
}

export class ComfyComboNode extends ComfyWidgetNode<string> {
    override properties: ComfyComboProperties = {
        options: ["*"]
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "value", type: "string" }
        ]
    }

    override svelteComponentType = ComboWidget
    override inputWidgetTypes = ["combo", "enum"]

    constructor(name?: string) {
        super(name, "*")
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
        const otherProps = inputNode.properties;

        // Ensure combo options match
        if (!(otherProps.options instanceof Array))
            return false;
        if (otherProps.options.length !== thisProps.options.length)
            return false;
        if (otherProps.find((v, i) => thisProps[i] !== v))
            return false;

        return true;
    }

    override clampOneConfig(input: IComfyInputSlot) {
        if (!(this.properties.value in input.config.values)) {
            if (input.config.values.length === 0)
                this.setProperty("value", "")
            else
                this.setProperty("value", input.config.values[0])
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
        multiline: false
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "value", type: "string" }
        ]
    }

    override svelteComponentType = TextWidget
    override inputWidgetTypes = ["text"]

    constructor(name?: string) {
        super(name, "")
    }
}

LiteGraph.registerNodeType({
    class: ComfyTextNode,
    title: "UI.Text",
    desc: "Textbox outputting a string value",
    type: "ui/text"
})
