import { LiteGraph, type ContextMenuItem, type LGraphNode, type Vector2, LConnectionKind, LLink, LGraphCanvas, type SlotType, TitleMode, type SlotLayout, BuiltInSlotType, type ITextWidget } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import { Watch } from "@litegraph-ts/nodes-basic";
import type { SerializedPrompt } from "$lib/components/ComfyApp";

export interface ComfyAfterQueuedAction extends Record<any, any> {
    prompt: SerializedPrompt
}

export class ComfyAfterQueuedAction extends ComfyGraphNode {
    override properties: ComfyCopyActionProperties = {
        prompt: null
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "afterQueued", type: BuiltInSlotType.EVENT },
            { name: "prompt", type: "*" }
        ],
    }

    override onPropertyChanged(property: string, value: any, prevValue?: any) {
        if (property === "value") {
            this.setOutputData(0, this.properties.prompt)
        }
    }

    override onExecute() {
        this.setOutputData(0, this.properties.prompt)
    }

    override afterQueued(p: SerializedPrompt) {
        this.setProperty("value", p)
        this.triggerSlot(0, "bang")
    }
}

LiteGraph.registerNodeType({
    class: ComfyAfterQueuedAction,
    title: "Comfy.AfterQueuedAction",
    desc: "Triggers a 'bang' event when a prompt is queued.",
    type: "actions/after_queued"
})

export interface ComfyCopyActionProperties extends Record<any, any> {
    value: any
}

export class ComfyCopyAction extends ComfyGraphNode {
    override properties: ComfyCopyActionProperties = {
        value: null
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "in", type: "*" },
            { name: "copy", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "out", type: "*" }
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
        this.setProperty("value", this.getInputData(0))
    }

    override onAction(action: any, param: any) {
        this.setProperty("value", this.getInputData(0))
        this.setOutputData(0, this.properties.value)
        console.log("setData", this.properties.value)
    };
}

LiteGraph.registerNodeType({
    class: ComfyCopyAction,
    title: "Comfy.CopyAction",
    desc: "Copies its input to its output when an event is received",
    type: "actions/copy"
})

export interface ComfySwapActionProperties extends Record<any, any> {
}

export class ComfySwapAction extends ComfyGraphNode {
    override properties: ComfySwapActionProperties = {
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "A", type: "*" },
            { name: "B", type: "*" },
            { name: "swap", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "B", type: "*" },
            { name: "A", type: "*" }
        ],
    }

    override onAction(action: any, param: any) {
        const a = this.getInputData(0)
        const b = this.getInputData(1)
        this.setOutputData(0, a)
        this.setOutputData(1, b)
    };
}

LiteGraph.registerNodeType({
    class: ComfySwapAction,
    title: "Comfy.SwapAction",
    desc: "Swaps two inputs when triggered",
    type: "actions/swap"
})
