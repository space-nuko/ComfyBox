import layoutStates from "$lib/stores/layoutStates"
import { BuiltInSlotType, LGraphNode, LiteGraph, type ITextWidget, type OptionalSlots, type PropertyLayout, type SlotLayout, type Vector2 } from "@litegraph-ts/core"
import { get } from "svelte/store"
import ComfyGraphNode from "./ComfyGraphNode"

export default class ComfyConfigureQueuePromptButton extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        inputs: [
            { name: "config", type: BuiltInSlotType.ACTION },
        ],
    }

    static propertyLayout: PropertyLayout = [
    ]

    static optionalSlots: OptionalSlots = {
    }

    override size: Vector2 = [60, 30];

    constructor(title?: string) {
        super(title)
    }

    override onAction(action: any, param: any, options: { action_call?: string }) {
        if (action === "config" && param != null) {
            if (this.layoutState == null) {
                console.error(this, this.getRootGraph(), Object.keys(get(layoutStates).all))
                throw new Error(`Could not find layout attached to this node! ${this.id}`)
            }

            if (typeof param === "string")
                this.workflow.attrs.queuePromptButtonName = param || ""
            else if (typeof param === "object" && "buttonName" in param)
                this.workflow.attrs.queuePromptButtonName = param.buttonName || ""
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfyConfigureQueuePromptButton,
    title: "Comfy.ConfigureQueuePromptButton",
    desc: "Sets the properties of the global queue prompt button",
    type: "workflow/configure_queue_prompt_button"
})
