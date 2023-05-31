import { BuiltInSlotType, LiteGraph, type ITextWidget, type SlotLayout } from "@litegraph-ts/core";

import MarkdownWidget from "$lib/widgets/MarkdownWidget.svelte";
import ComfyWidgetNode, { type ComfyWidgetProperties } from "./ComfyWidgetNode";

export interface ComfyMarkdownProperties extends ComfyWidgetProperties {
}

export default class ComfyMarkdownNode extends ComfyWidgetNode<string> {
    override properties: ComfyMarkdownProperties = {
        tags: [],
        defaultValue: false,
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "store", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "value", type: "string" },
            { name: "changed", type: BuiltInSlotType.EVENT },
        ]
    }

    override svelteComponentType = MarkdownWidget;
    override defaultValue = "";

    constructor(name?: string) {
        super(name, "")
    }

    override createDisplayWidget(): ITextWidget {
        const widget = this.addWidget<ITextWidget>(
            "text",
            "Value",
            "",
            (v: string) => {
                if (v == null || v === this.getValue()) {
                    return;
                }
                this.setValue(v);
            },
            {
                multiline: true,

                inputStyle: { fontFamily: "monospace" }
            }
        )
        return widget;
    }
}

LiteGraph.registerNodeType({
    class: ComfyMarkdownNode,
    title: "UI.Markdown",
    desc: "Displays Markdown in the UI",
    type: "ui/markdown"
})
