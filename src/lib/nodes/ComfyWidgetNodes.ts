import { LiteGraph, type ContextMenuItem, type LGraphNode, type Vector2, LConnectionKind, LLink, LGraphCanvas, type SlotType, TitleMode, type SlotLayout, LGraph, type INodeInputSlot, type ITextWidget, type INodeOutputSlot, type SerializedLGraphNode } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import ComboWidget from "$lib/widgets/ComboWidget.svelte";
import RangeWidget from "$lib/widgets/RangeWidget.svelte";
import TextWidget from "$lib/widgets/TextWidget.svelte";
import type { SvelteComponentDev } from "svelte/internal";
import { ComfyWidgets } from "$lib/widgets";
import { Watch } from "@litegraph-ts/nodes-basic";
import type IComfyInputSlot from "$lib/IComfyInputSlot";
import { writable, type Unsubscriber, type Writable, get } from "svelte/store";
import { clamp } from "$lib/utils"
import layoutState from "$lib/stores/layoutState";

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

    private onValueUpdated(value: any) {
        console.debug("[Widget] valueUpdated", this, value)
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
            if ("defaultValue" in this.properties)
                this.setValue(this.properties.defaultValue)

            const widget = layoutState.findLayoutForNode(this.id)
            if (widget) {
                widget.attrs.title = input.name;
            }

            console.debug("Property copy", input, this.properties)
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
        outputs: [
            { name: "value", type: "number" }
        ]
    }

    constructor(name?: string) {
        super(name, 0)
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
        outputs: [
            { name: "value", type: "string" }
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
        outputs: [
            { name: "value", type: "string" }
        ]
    }

    override svelteComponentType = TextWidget

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
