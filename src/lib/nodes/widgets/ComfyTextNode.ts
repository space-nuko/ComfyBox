import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";

import TextWidget from "$lib/widgets/TextWidget.svelte";
import ComfyWidgetNode, { type ComfyWidgetProperties } from "./ComfyWidgetNode";

export interface ComfyTextProperties extends ComfyWidgetProperties {
    multiline: boolean;
    lines: number;
    maxLines: number;
}

export default class ComfyTextNode extends ComfyWidgetNode<string> {
    override properties: ComfyTextProperties = {
        tags: [],
        defaultValue: "",
        multiline: false,
        lines: 5,
        maxLines: 5,
        excludeFromJourney: false,
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

    override inputSlotName = "value";
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
