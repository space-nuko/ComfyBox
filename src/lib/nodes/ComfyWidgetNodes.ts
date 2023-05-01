import { LiteGraph, type ContextMenuItem, type LGraphNode, type Vector2, LConnectionKind, LLink, LGraphCanvas, type SlotType, TitleMode, type SlotLayout, LGraph, type INodeInputSlot, type ITextWidget } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import ComboWidget from "$lib/widgets/ComboWidget.svelte";
import RangeWidget from "$lib/widgets/RangeWidget.svelte";
import TextWidget from "$lib/widgets/TextWidget.svelte";
import type { SvelteComponentDev } from "svelte/internal";
import { ComfyWidgets } from "$lib/widgets";
import { Watch } from "@litegraph-ts/nodes-basic";

export interface ComfyWidgetProperties extends Record<string, any> {
    value: any,
}

/*
 * A node that is tied to a UI widget in the frontend. When the frontend's
 * widget is changed, the value of the first output in the node is updated
 * in the litegraph instance.
 */
export abstract class ComfyWidgetNode extends ComfyGraphNode {
    abstract properties: ComfyWidgetProperties;

    /** Svelte class for the frontend logic */
    abstract svelteComponentType: typeof SvelteComponentDev
    /** Compatible litegraph widget types that can be connected to this node */
    abstract inputWidgetTypes: string[]

    override isBackendNode = false;
    override serialize_widgets = true;

    displayWidget: ITextWidget;

    override size: Vector2 = [60, 40];

    constructor(name?: string) {
        super(name)
        const color = LGraphCanvas.node_colors["blue"]
        this.color ||= color.color
        this.bgColor ||= color.bgColor
        this.displayWidget = this.addWidget<ITextWidget>(
            "text",
            "Value",
            ""
        );
    }

    override onPropertyChanged(name: string, value: any) {
        if (name == "value") {
            this.displayWidget.value = Watch.toString(value)
        }
    }

    setValue(value: any) {
        this.setProperty("value", value)
    }

    override onExecute() {
        // Assumption: we will have one output in the inherited class with the
        // correct type
        this.setOutputData(0, this.properties.value)

        // TODO send event to linked nodes
    }
}

export interface ComfySliderProperties extends ComfyWidgetProperties {
    value: number
}

export class ComfySliderNode extends ComfyWidgetNode {
    override properties: ComfySliderProperties = {
        value: 0
    }

    override svelteComponentType = RangeWidget
    override inputWidgetTypes = ["number", "slider"]

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "value", type: "number" }
        ]
    }
}

LiteGraph.registerNodeType({
    class: ComfySliderNode,
    title: "UI.Slider",
    desc: "Slider outputting a number value",
    type: "ui/slider"
})

export interface ComfyComboProperties extends ComfyWidgetProperties {
    options: string[],
    value: string
}

export class ComfyComboNode extends ComfyWidgetNode {
    override properties: ComfyComboProperties = {
        options: ["*"],
        value: "*"
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "value", type: "string" }
        ]
    }

    override svelteComponentType = ComboWidget
    override inputWidgetTypes = ["combo", "enum"]
}

LiteGraph.registerNodeType({
    class: ComfyComboNode,
    title: "UI.Combo",
    desc: "Combo box outputting a string value",
    type: "ui/combo"
})

export interface ComfyTextProperties extends ComfyWidgetProperties {
    value: string
}

export class ComfyTextNode extends ComfyWidgetNode {
    override properties: ComfyTextProperties = {
        value: ""
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "value", type: "string" }
        ]
    }

    override svelteComponentType = TextWidget
    override inputWidgetTypes = ["text"]
}

LiteGraph.registerNodeType({
    class: ComfyTextNode,
    title: "UI.Text",
    desc: "Textbox outputting a string value",
    type: "ui/text"
})
