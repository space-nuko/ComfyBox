import type { SerializedPrompt } from "$lib/components/ComfyApp";
import queueState from "$lib/stores/queueState";
import { BuiltInSlotType, LiteGraph, type SerializedLGraphNode, type SlotLayout } from "@litegraph-ts/core";
import { get } from "svelte/store";
import ComfyGraphNode from "../ComfyGraphNode";

export default class ComfyQueueEvents extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        outputs: [
            { name: "beforeQueued", type: BuiltInSlotType.EVENT },
            { name: "afterQueued", type: BuiltInSlotType.EVENT },
            { name: "onDefaultQueueAction", type: BuiltInSlotType.EVENT },
        ],
    }

    private getActionParams(subgraph: string | null): any {
        let queue = get(queueState)
        let queueRemaining = 0;

        if (typeof queue.queueRemaining === "number")
            queueRemaining = queue.queueRemaining

        return {
            queueRemaining,
            subgraph
        }
    }

    override beforeQueued(subgraph: string | null) {
        this.triggerSlot(0, this.getActionParams(subgraph))
    }

    override afterQueued(p: SerializedPrompt, subgraph: string | null) {
        this.triggerSlot(1, this.getActionParams(subgraph))
    }

    override onDefaultQueueAction() {
        let queue = get(queueState)
        let queueRemaining = 0;

        if (typeof queue.queueRemaining === "number")
            queueRemaining = queue.queueRemaining

        this.triggerSlot(2, { queueRemaining })
    }

    override onSerialize(o: SerializedLGraphNode) {
        super.onSerialize(o)
    }
}

LiteGraph.registerNodeType({
    class: ComfyQueueEvents,
    title: "Comfy.QueueEvents",
    desc: "Triggers a 'bang' event when a prompt is queued.",
    type: "events/queue_events"
})
