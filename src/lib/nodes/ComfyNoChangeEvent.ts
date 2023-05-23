import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";

export default class ComfyNoChangeEvent extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        inputs: [
            { name: "in", type: BuiltInSlotType.ACTION },
        ],
        outputs: [
            { name: "out", type: BuiltInSlotType.EVENT },
        ],
    }

    override onAction(action: any, param: any, options: { action_call?: string }) {
        if (param && typeof param === "object" && "noChangedEvent" in param) {
            param.noChangedEvent = true;
        }
        else {
            param = {
                __widgetValue__: param,
                noChangedEvent: true
            }
        }

        this.triggerSlot(0, param, null, options);
    }
}

LiteGraph.registerNodeType({
    class: ComfyNoChangeEvent,
    title: "Comfy.NoChangeEvent",
    desc: "Wraps an event's parameter such that passing it into a ComfyWidgetNode's 'store' action will not trigger its 'changed' event",
    type: "events/no_change"
})
