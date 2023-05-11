import { BuiltInSlotType, LGraphNode, LiteGraph, type ITextWidget, type SlotLayout, type PropertyLayout } from "@litegraph-ts/core"
import type { ComfyGraphNodeProperties } from "./ComfyGraphNode";
import { Watch } from "@litegraph-ts/nodes-basic";

export interface ComfyTriggerNewEventNodeProperties extends ComfyGraphNodeProperties {
    param: any,
}

export default class ComfyTriggerNewEventNode extends LGraphNode {
    override properties: ComfyTriggerNewEventNodeProperties = {
        param: true,
        tags: []
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "in", type: BuiltInSlotType.ACTION },
            { name: "param", type: "*" },
        ],
        outputs: [
            { name: "out", type: BuiltInSlotType.EVENT },
        ],
    }

    paramWidget: ITextWidget;

    constructor(title?: string) {
        super(title)
        this.paramWidget = this.addWidget("text", "Param", Watch.toString(this.properties.param), "param")
    }

    override onPropertyChanged(property: any, value: any) {
        if (property === "param")
            this.paramWidget.value = Watch.toString(value)
    }

    override onExecute() {
        const newParam = this.getInputData(1);
        if (newParam != null)
            this.setProperty("param", newParam)
    }

    override onAction(action: any, param: any, options: { action_call?: string }) {
        let newParam = this.getInputData(1);
        if (newParam == null)
            newParam = this.properties.param
        this.triggerSlot(0, newParam, null, options);
    }
}

LiteGraph.registerNodeType({
    class: ComfyTriggerNewEventNode,
    title: "Comfy.TriggerNewEvent",
    desc: "Triggers a new event with the specified parameter when an event is received",
    type: "events/trigger_new_event"
})
