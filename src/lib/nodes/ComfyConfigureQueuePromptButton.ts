import layoutState from "$lib/stores/layoutState"
import { BuiltInSlotType, LGraphNode, LiteGraph, type ITextWidget, type OptionalSlots, type PropertyLayout, type SlotLayout, type Vector2 } from "@litegraph-ts/core"

export interface ComfyConfigureQueuePromptButtonProperties extends Record<string, any> {
}

export default class ComfyConfigureQueuePromptButton extends LGraphNode {
    override properties: ComfyConfigureQueuePromptButtonProperties = {
    }

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
            layoutState.update(state => {
                if (typeof param === "string")
                    state.attrs.queuePromptButtonName = param || ""
                else if (typeof param === "object" && "buttonName" in param)
                    state.attrs.queuePromptButtonName = param.buttonName || ""
                return state
            })
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfyConfigureQueuePromptButton,
    title: "Comfy.ConfigureQueuePromptButton",
    desc: "Sets the properties of the global queue prompt button",
    type: "workflow/configure_queue_prompt_button"
})
