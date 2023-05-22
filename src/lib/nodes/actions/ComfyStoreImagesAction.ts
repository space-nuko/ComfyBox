import { type SerializedPromptOutput } from "$lib/utils";
import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "../ComfyGraphNode";

export interface ComfyStoreImagesActionProperties extends ComfyGraphNodeProperties {
    images: SerializedPromptOutput | null
}

export default class ComfyStoreImagesAction extends ComfyGraphNode {
    override properties: ComfyStoreImagesActionProperties = {
        tags: [],
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

        this.setProperty("images", param as SerializedPromptOutput)
        this.setOutputData(0, this.properties.images)
    }
}

LiteGraph.registerNodeType({
    class: ComfyStoreImagesAction,
    title: "Comfy.StoreImagesAction",
    desc: "Stores images from an onExecuted callback",
    type: "actions/store_images"
})
