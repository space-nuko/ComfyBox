import type { WidgetPanelOptions } from "@litegraph-ts/core";
import ComfyWidget from "./ComfyWidget";
import type { ComfyImageResult } from "$lib/nodes/ComfySaveImageNode";

export type ComfyGalleryEntry = [string, string | null]; // <img> src and alt/title, gradio format

export interface ComfyGalleryWidgetOptions extends WidgetPanelOptions {
}

export default class ComfyGalleryWidget extends ComfyWidget<ComfyGalleryWidgetOptions, ComfyGalleryEntry[]> {
    override type = "comfy/gallery";
}
