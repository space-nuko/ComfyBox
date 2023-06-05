import { parseWhateverIntoImageMetadata, type ComfyBoxImageMetadata } from "$lib/utils";
import type { FileData as GradioFileData } from "@gradio/upload";
import { BuiltInSlotType, LiteGraph, type SerializedLGraphNode, type SlotLayout } from "@litegraph-ts/core";

import ImageUploadWidget from "$lib/widgets/ImageUploadWidget.svelte";
import type { ComfyWidgetProperties } from "./ComfyWidgetNode";
import ComfyWidgetNode from "./ComfyWidgetNode";
import { get, writable, type Writable } from "svelte/store";

export interface ComfyImageUploadNodeProperties extends ComfyWidgetProperties {
    maskCount: number
}

export default class ComfyImageUploadNode extends ComfyWidgetNode<ComfyBoxImageMetadata[]> {
    properties: ComfyImageUploadNodeProperties = {
        defaultValue: [],
        tags: [],
        maskCount: 0,
        excludeFromJourney: true,
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
    override outputSlotName = "images";
    override storeActionName = "store";
    override saveUserState = false;

    imgWidth: Writable<number> = writable(0);
    imgHeight: Writable<number> = writable(0);

    constructor(name?: string) {
        super(name, [])
    }

    override onExecute(param: any, options: object) {
        // TODO better way of getting image size?
        const value = get(this.value)
        if (value && value.length > 0) {
            value[0].width = get(this.imgWidth)
            value[0].height = get(this.imgHeight)

            // NOTE: assumes masks will have the same image size as the parent image!
            for (const child of value[0].children) {
                child.width = get(this.imgWidth)
                child.height = get(this.imgHeight)
            }
        }

        super.onExecute(param, options);
    }

    override parseValue(value: any): ComfyBoxImageMetadata[] {
        return parseWhateverIntoImageMetadata(value) || [];
    }

    override formatValue(value: GradioFileData[]): string {
        return `Images: ${value?.length || 0}`
    }

    override stripUserState(o: SerializedLGraphNode) {
        super.stripUserState(o);
        o.properties.defaultValue = [];
        (o as any).comfyValue = [];
    }
}

LiteGraph.registerNodeType({
    class: ComfyImageUploadNode,
    title: "UI.ImageUpload",
    desc: "Widget that lets you upload and edit a multi-layered image. Can also act like a standalone image uploader.",
    type: "ui/image_upload"
})
