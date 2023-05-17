import { parseWhateverIntoImageMetadata, type ComfyBoxImageMetadata } from "$lib/utils";
import type { FileData as GradioFileData } from "@gradio/upload";
import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";

import ImageUploadWidget from "$lib/widgets/ImageUploadWidget.svelte";
import type { ComfyWidgetProperties } from "./ComfyWidgetNode";
import ComfyWidgetNode from "./ComfyWidgetNode";

export interface ComfyImageUploadNodeProperties extends ComfyWidgetProperties {
}

export default class ComfyImageUploadNode extends ComfyWidgetNode<ComfyBoxImageMetadata[]> {
    properties: ComfyImageUploadNodeProperties = {
        defaultValue: [],
        tags: [],
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "store", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "images", type: "COMFYBOX_IMAGES" }, // TODO support batches
            { name: "changed", type: BuiltInSlotType.EVENT },
        ]
    }

    override svelteComponentType = ImageUploadWidget;
    override defaultValue = [];
    override storeActionName = "store";
    override saveUserState = false;

    constructor(name?: string) {
        super(name, [])
    }

    override parseValue(value: any): ComfyBoxImageMetadata[] {
        return parseWhateverIntoImageMetadata(value) || [];
    }

    override formatValue(value: GradioFileData[]): string {
        return `Images: ${value?.length || 0}`
    }
}

LiteGraph.registerNodeType({
    class: ComfyImageUploadNode,
    title: "UI.ImageUpload",
    desc: "Widget that lets you upload and edit a multi-layered image. Can also act like a standalone image uploader.",
    type: "ui/image_upload"
})
