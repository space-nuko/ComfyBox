import { BuiltInSlotType, LiteGraph, type ITextWidget, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "../ComfyGraphNode";

export interface ComfyCopyActionProperties extends ComfyGraphNodeProperties {
    value: any
}

export default class ComfyCopyAction extends ComfyGraphNode {
    override properties: ComfyCopyActionProperties = {
        value: null,
        tags: []
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "in", type: "*" },
            { name: "copy", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "out", type: BuiltInSlotType.EVENT }
        ],
    }

    displayWidget: ITextWidget;

    constructor(title?: string) {
        super(title);
        this.displayWidget = this.addWidget<ITextWidget>(
            "text",
            "Value",
            "",
            "value"
        );
        this.displayWidget.disabled = true;
    }

    override onExecute() {
        if (this.getInputLink(0))
            this.setProperty("value", this.getInputData(0))
    }

    override onAction(action: any, param: any) {
        if (action === "copy") {
            this.setProperty("value", this.getInputData(0))
            this.triggerSlot(0, this.properties.value)
        }
    };
}

LiteGraph.registerNodeType({
    class: ComfyCopyAction,
    title: "Comfy.CopyAction",
    desc: "Copies its input to its output when an event is received",
    type: "actions/copy"
})
