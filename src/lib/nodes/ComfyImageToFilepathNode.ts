import { LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import { comfyFileToAnnotatedFilepath, isComfyBoxImageMetadata, parseWhateverIntoImageMetadata } from "$lib/utils";

export default class ComfyImageToFilepathNode extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        inputs: [
            { name: "image", type: "COMFYBOX_IMAGES,COMFYBOX_IMAGE" },
        ],
        outputs: [
            { name: "filepath", type: "string" },
        ]
    }

    override onExecute() {
        const data = this.getInputData(0)
        const meta = parseWhateverIntoImageMetadata(data);
        if (meta == null || meta.length === 0) {
            this.setOutputData(0, null)
            return;
        }

        const path = comfyFileToAnnotatedFilepath(meta[0].comfyUIFile);
        this.setOutputData(0, path);
    }
}

LiteGraph.registerNodeType({
    class: ComfyImageToFilepathNode,
    title: "Comfy.ImageToFilepath",
    desc: "Converts ComfyBox image metadata to an annotated filepath like \"image.png[output]\" for use with ComfyUI.",
    type: "image/file_to_filepath"
})
