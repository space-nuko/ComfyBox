import { LiteGraph, type ContextMenuItem, type LGraphNode, type Vector2, LConnectionKind, LLink, LGraphCanvas, type SlotType, TitleMode, type SlotLayout, BuiltInSlotType, type ITextWidget, type SerializedLGraphNode } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import { Watch } from "@litegraph-ts/nodes-basic";
import type { SerializedPrompt } from "$lib/components/ComfyApp";
import { toast } from '@zerodevx/svelte-toast'
import type { GalleryOutput } from "./ComfyWidgetNodes";
import { get } from "svelte/store";
import queueState from "$lib/stores/queueState";
import notify from "$lib/notify";

export interface ComfyQueueEventsProperties extends Record<any, any> {
}

export class ComfyQueueEvents extends ComfyGraphNode {
    override properties: ComfyQueueEventsProperties = {
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "beforeQueued", type: BuiltInSlotType.EVENT },
            { name: "afterQueued", type: BuiltInSlotType.EVENT },
            { name: "prompt", type: "*" }
        ],
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
        this.triggerSlot(0, this.getActionParams(subgraph))
    }

    override afterQueued(p: SerializedPrompt, subgraph: string | null) {
        this.triggerSlot(1, this.getActionParams(subgraph))
    }

    override onSerialize(o: SerializedLGraphNode) {
        super.onSerialize(o)
    }
}

LiteGraph.registerNodeType({
    class: ComfyQueueEvents,
    title: "Comfy.QueueEvents",
    desc: "Triggers a 'bang' event when a prompt is queued.",
    type: "actions/queue_events"
})

export interface ComfyStoreImagesActionProperties extends Record<any, any> {
    images: GalleryOutput | null
}

export class ComfyStoreImagesAction extends ComfyGraphNode {
    override properties: ComfyStoreImagesActionProperties = {
        images: null
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "output", type: BuiltInSlotType.ACTION, options: { color_off: "rebeccapurple", color_on: "rebeccapurple" } }
        ],
        outputs: [
            { name: "images", type: "OUTPUT" },
        ],
    }

    override onExecute() {
        if (this.properties.images !== null)
            this.setOutputData(0, this.properties.images)
    }

    override onAction(action: any, param: any) {
        if (action !== "store" || !param || !("images" in param))
            return;

        this.setProperty("images", param as GalleryOutput)
        this.setOutputData(0, this.properties.images)
    }
}

LiteGraph.registerNodeType({
    class: ComfyStoreImagesAction,
    title: "Comfy.StoreImagesAction",
    desc: "Stores images from an onExecuted callback",
    type: "actions/store_images"
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
            { name: "B", type: BuiltInSlotType.EVENT },
            { name: "A", type: BuiltInSlotType.EVENT }
        ],
    }

    override onAction(action: any, param: any) {
        const a = this.getInputData(0)
        const b = this.getInputData(1)
        this.triggerSlot(0, a)
        this.triggerSlot(1, b)
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
            notify(message);
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
