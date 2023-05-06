import { LiteGraph, type ContextMenuItem, type LGraphNode, type Vector2, LConnectionKind, LLink, LGraphCanvas, type SlotType, TitleMode, type SlotLayout, BuiltInSlotType, type ITextWidget, type SerializedLGraphNode } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import { Watch } from "@litegraph-ts/nodes-basic";
import type { SerializedPrompt } from "$lib/components/ComfyApp";
import { toast } from '@zerodevx/svelte-toast'
import type { GalleryOutput } from "./ComfyWidgetNodes";
import { get } from "svelte/store";
import queueState from "$lib/stores/queueState";

export interface ComfyQueueEventsProperties extends Record<any, any> {
    prompt: SerializedPrompt | null
}

export class ComfyQueueEvents extends ComfyGraphNode {
    override properties: ComfyQueueEventsProperties = {
        prompt: null
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "beforeQueued", type: BuiltInSlotType.EVENT },
            { name: "afterQueued", type: BuiltInSlotType.EVENT },
            { name: "prompt", type: "*" }
        ],
    }

    override onPropertyChanged(property: string, value: any, prevValue?: any) {
        if (property === "prompt") {
            this.setOutputData(2, value)
        }
    }

    override onExecute() {
        this.setOutputData(2, this.properties.prompt)
    }

    private getActionParams(subgraph: string | null): any {
        let queue = get(queueState)
        let remaining = 0;

        if (typeof queue.queueRemaining === "number")
            remaining = queue.queueRemaining

        return {
            queueRemaining: remaining,
            subgraph
        }
    }

    override beforeQueued(subgraph: string | null) {
        this.setProperty("prompt", null)
        this.triggerSlot(0, this.getActionParams(subgraph))
    }

    override afterQueued(p: SerializedPrompt, subgraph: string | null) {
        this.setProperty("prompt", p)
        this.triggerSlot(1, this.getActionParams(subgraph))
    }

    override onSerialize(o: SerializedLGraphNode) {
        super.onSerialize(o)
        o.properties = { prompt: null }
    }
}

LiteGraph.registerNodeType({
    class: ComfyQueueEvents,
    title: "Comfy.QueueEvents",
    desc: "Triggers a 'bang' event when a prompt is queued.",
    type: "actions/queue_events"
})

export interface ComfyOnExecutedEventProperties extends Record<any, any> {
    images: GalleryOutput | null,
    filename: string | null
}

export class ComfyOnExecutedEvent extends ComfyGraphNode {
    override properties: ComfyOnExecutedEventProperties = {
        images: null,
        filename: null
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "images", type: "IMAGE" }
        ],
        outputs: [
            { name: "images", type: "OUTPUT" },
            { name: "onExecuted", type: BuiltInSlotType.EVENT },
        ],
    }

    override onExecute() {
        if (this.properties.images !== null)
            this.setOutputData(0, this.properties.images)
    }

    override receiveOutput(output: any) {
        if (output && "images" in output) {
            this.setProperty("images", output as GalleryOutput)
            this.setOutputData(0, this.properties.images)
            this.triggerSlot(1, "bang")
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfyOnExecutedEvent,
    title: "Comfy.OnExecutedEvent",
    desc: "Triggers a 'bang' event when a prompt output is received.",
    type: "actions/on_executed"
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

export interface ComfyNotifyActionProperties extends Record<any, any> {
    message: string
}

export class ComfyNotifyAction extends ComfyGraphNode {
    override properties: ComfyNotifyActionProperties = {
        message: "Nya."
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "message", type: "string" },
            { name: "trigger", type: BuiltInSlotType.ACTION }
        ],
    }

    override onAction(action: any, param: any) {
        const message = this.getInputData(0);
        if (message) {
            toast.push(message);
        }
    };
}

LiteGraph.registerNodeType({
    class: ComfyNotifyAction,
    title: "Comfy.NotifyAction",
    desc: "Displays a message.",
    type: "actions/notify"
})

export interface ComfyExecuteSubgraphActionProperties extends Record<any, any> {
    tag: string | null,
}

export class ComfyExecuteSubgraphAction extends ComfyGraphNode {
    override properties: ComfyExecuteSubgraphActionProperties = {
        tag: null
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "execute", type: BuiltInSlotType.ACTION },
            { name: "tag", type: "string" }
        ],
    }

    override onExecute() {
        const tag = this.getInputData(1)
        if (tag)
            this.setProperty("tag", tag)
    }

    override onAction(action: any, param: any) {
        const tag = this.getInputData(1) || this.properties.tag;

        const app = (window as any)?.app;
        if (!app)
            return;

        app.queuePrompt(0, 1, tag);
    }
}

LiteGraph.registerNodeType({
    class: ComfyExecuteSubgraphAction,
    title: "Comfy.ExecuteSubgraphAction",
    desc: "Runs a part of the graph based on a tag",
    type: "actions/execute_subgraph"
})
