import type { SerializedPrompt } from "$lib/components/ComfyApp";
import notify from "$lib/notify";
import layoutState from "$lib/stores/layoutState";
import queueState from "$lib/stores/queueState";
import { BuiltInSlotType, LiteGraph, NodeMode, type ITextWidget, type IToggleWidget, type SerializedLGraphNode, type SlotLayout } from "@litegraph-ts/core";
import { get } from "svelte/store";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "./ComfyGraphNode";
import type { ComfyWidgetNode, GalleryOutput } from "./ComfyWidgetNodes";

export class ComfyQueueEvents extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        outputs: [
            { name: "beforeQueued", type: BuiltInSlotType.EVENT },
            { name: "afterQueued", type: BuiltInSlotType.EVENT }
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

export interface ComfyStoreImagesActionProperties extends ComfyGraphNodeProperties {
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

export interface ComfyCopyActionProperties extends ComfyGraphNodeProperties {
    value: any
}

export class ComfyCopyAction extends ComfyGraphNode {
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

export interface ComfySwapActionProperties extends ComfyGraphNodeProperties {
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

export interface ComfyNotifyActionProperties extends ComfyGraphNodeProperties {
    message: string
}

export class ComfyNotifyAction extends ComfyGraphNode {
    override properties: ComfyNotifyActionProperties = {
        message: "Nya.",
        tags: []
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

export interface ComfyExecuteSubgraphActionProperties extends ComfyGraphNodeProperties {
    targetTag: string
}

export class ComfyExecuteSubgraphAction extends ComfyGraphNode {
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

        app.queuePrompt(0, 1, tag);
    }
}

LiteGraph.registerNodeType({
    class: ComfyExecuteSubgraphAction,
    title: "Comfy.ExecuteSubgraphAction",
    desc: "Runs a part of the graph based on a tag",
    type: "actions/execute_subgraph"
})

export interface ComfySetNodeModeActionProperties extends ComfyGraphNodeProperties {
    targetTags: string,
    enable: boolean,
}

export class ComfySetNodeModeAction extends ComfyGraphNode {
    override properties: ComfySetNodeModeActionProperties = {
        targetTags: "",
        enable: false,
        tags: []
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "enabled", type: "boolean" },
            { name: "set", type: BuiltInSlotType.ACTION },
        ],
    }

    displayWidget: ITextWidget;
    enableWidget: IToggleWidget;

    constructor(title?: string) {
        super(title)
        this.displayWidget = this.addWidget("text", "Tags", this.properties.targetTags, "targetTags")
    }

    override onPropertyChanged(property: any, value: any) {
        if (property === "enabled") {
            this.enableWidget.value = value
        }
    }

    override onAction(action: any, param: any) {
        let enabled = this.getInputData(0)

        if (typeof param === "object" && "enabled" in param)
            enabled = param["enabled"]

        const tags = this.properties.targetTags.split(",").map(s => s.trim());

        for (const node of this.graph._nodes) {
            if ("tags" in node.properties) {
                const comfyNode = node as ComfyGraphNode;
                const hasTag = tags.some(t => comfyNode.properties.tags.indexOf(t) != -1);
                if (hasTag) {
                    let newMode: NodeMode;
                    if (enabled) {
                        newMode = NodeMode.ALWAYS;
                    } else {
                        newMode = NodeMode.NEVER;
                    }
                    console.warn("CHANGEMODE", newMode == NodeMode.ALWAYS ? "ALWAYS" : "NEVER", tags, node)
                    node.changeMode(newMode);
                    if ("notifyPropsChanged" in node)
                        (node as ComfyWidgetNode).notifyPropsChanged();
                }
            }
        }

        for (const entry of Object.values(get(layoutState).allItems)) {
            if (entry.dragItem.type === "container") {
                const container = entry.dragItem;
                const hasTag = tags.some(t => container.attrs.tags.indexOf(t) != -1);
                if (hasTag) {
                    container.attrs.hidden = !enabled;
                }
                container.attrsChanged.set(get(container.attrsChanged) + 1)
            }
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfySetNodeModeAction,
    title: "Comfy.SetNodeModeAction",
    desc: "Sets a group of nodes/UI containers as enabled/disabled based on their tags (comma-separated)",
    type: "actions/set_node_mode"
})
