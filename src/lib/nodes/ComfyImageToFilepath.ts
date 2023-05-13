import { LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import { comfyFileToAnnotatedFilepath, isComfyBoxImageMetadata } from "$lib/utils";

export class ComfyImageToFilepath extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        inputs: [
            { name: "image", type: "COMFYBOX_IMAGE" },
        ],
        outputs: [
            { name: "filepath", type: "string" },
        ]
    }

    override onExecute() {
        const data = this.getInputData(0)
        if (data == null || !isComfyBoxImageMetadata(data)) {
            this.setOutputData(0, null)
            return;
        }

        const path = comfyFileToAnnotatedFilepath(data.comfyUIFile);
        this.setOutputData(0, path);
    }
}

LiteGraph.registerNodeType({
    class: ComfyImageToFilepath,
    title: "Comfy.ImageToFilepath",
    desc: "Converts ComfyBox image metadata to an annotated filepath like \"image.png[output]\" for use with ComfyUI.",
    type: "images/file_to_filepath"
})
