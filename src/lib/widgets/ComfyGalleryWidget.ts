import { get } from "svelte/store";
import type { WidgetPanelOptions } from "@litegraph-ts/core";
import ComfyWidget from "./ComfyWidget";
import type { ComfyImageResult } from "$lib/nodes/ComfySaveImageNode";
import queueState from "$lib/stores/queueState";

export type ComfyGalleryEntry = [string, string | null]; // <img> src and alt/title, gradio format

export interface ComfyGalleryWidgetOptions extends WidgetPanelOptions {
}

export default class ComfyGalleryWidget extends ComfyWidget<ComfyGalleryWidgetOptions, ComfyGalleryEntry[]> {
    override type = "comfy/gallery";
    override isVirtual = true;

    addImages(images: ComfyImageResult[]) {
        this.setValue(this.value.concat(images));
    }

    override afterQueued() {
        let queue = get(queueState)
        if (!(typeof queue.queueRemaining === "number" && queue.queueRemaining > 1)) {
            this.setValue([])
        }
    }
}
