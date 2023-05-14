import { LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import { isComfyBoxImageMetadataArray } from "$lib/utils";

/*
 * TODO: This is just a temporary workaround until litegraph can handle typed
 * array arguments.
 */
export default class ComfyPickImageNode extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        inputs: [
            { name: "images", type: "COMFYBOX_IMAGES" },
        ],
        outputs: [
            { name: "image", type: "COMFYBOX_IMAGE" },
        ]
    }

    override onExecute() {
        const data = this.getInputData(0)
        if (data == null || !isComfyBoxImageMetadataArray(data)) {
            this.setOutputData(0, null)
            return;
        }

        this.setOutputData(0, data[0]);
    }
}

LiteGraph.registerNodeType({
    class: ComfyPickImageNode,
    title: "Comfy.PickImage",
    desc: "Picks out the first image from an array of ComfyBox images.",
    type: "image/pick_image"
})
