import { BuiltInSlotType, LiteGraph, type ITextWidget, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "../ComfyGraphNode";

export interface ComfyExecuteSubgraphActionProperties extends ComfyGraphNodeProperties {
    targetTag: string
}

export default class ComfyExecuteSubgraphAction extends ComfyGraphNode {
    override properties: ComfyExecuteSubgraphActionProperties = {
        tags: [],
        targetTag: ""
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "execute", type: BuiltInSlotType.ACTION },
            { name: "targetTag", type: "string" }
        ],
    }

    displayWidget: ITextWidget;

    constructor(title?: string) {
        super(title)
        this.displayWidget = this.addWidget("text", "targetTag", this.properties.targetTag, "targetTag")
    }

    override onExecute() {
        const tag = this.getInputData(1)
        if (tag)
            this.setProperty("tag", tag)
    }

    override onAction(action: any, param: any) {
        const tag = this.getInputData(1) || this.properties.targetTag;

        const app = (window as any)?.app;
        if (!app)
            return;

        // Hold control to queue at the front
        const num = app.ctrlDown ? -1 : 0;
        app.queuePrompt(num, 1, tag);
    }
}

LiteGraph.registerNodeType({
    class: ComfyExecuteSubgraphAction,
    title: "Comfy.ExecuteSubgraphAction",
    desc: "Runs a part of the graph based on a tag",
    type: "actions/execute_subgraph"
})
