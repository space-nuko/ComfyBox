<script lang="ts">
 import { ImageViewer } from "$lib/ImageViewer";
 import { Block } from "@gradio/atoms";
 import { Gallery } from "@gradio/gallery";
 import type { Styles } from "@gradio/utils";
 import type { WidgetLayout } from "$lib/stores/layoutState";
 import type { Writable } from "svelte/store";
 import type { ComfyGalleryNode } from "$lib/nodes/ComfyWidgetNodes";
 import type { FileData as GradioFileData } from "@gradio/upload";
 import type { SelectData as GradioSelectData } from "@gradio/utils";

 export let widget: WidgetLayout | null = null;
 let node: ComfyGalleryNode | null = null;
 let nodeValue: Writable<GradioFileData[]> | null = null;
 let propsChanged: Writable<number> | null = null;
 let option: number | null = null;

 $: widget && setNodeValue(widget);

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyGalleryNode
         nodeValue = node.value;
         propsChanged = node.propsChanged;
         node.index = 0;
     }
 };

 let style: Styles = {
     // grid_cols: [2],
     grid: [3],
     // object_fit: "cover",
 }
 let element: HTMLDivElement;

 function onSelect(e: CustomEvent<GradioSelectData>) {
     // Setup lightbox
     // Wait for gradio gallery to show the large preview image, if no timeout then
     // the event might fire too early
     setTimeout(() => {
         const images = element.querySelectorAll<HTMLImageElement>('div.block div > img')
         if (images != null) {
             images.forEach(ImageViewer.instance.setupImageForLightbox.bind(ImageViewer.instance));
         }
         ImageViewer.instance.updateOnBackgroundChange();
     }, 200)

     // Update index
     node.index = e.detail.index as number;
 }

</script>
<div class="wrapper comfy-gallery-widget gradio-gallery" bind:this={element}>
    {#if widget && node && nodeValue}
        <Block variant="solid" padding={false}>
            <div class="padding">
                <Gallery
                    bind:value={$nodeValue}
                    label={widget.attrs.title}
                    show_label={widget.attrs.title !== ""}
                    {style}
                    root={""}
                    root_url={""}
                    on:select={onSelect}
                />
            </div>
        </Block>
    {/if}
</div>

<style>
 .wrapper {
     padding: 2px;
     width: 100%;
 }

 .padding {
     height: 30rem;
 }

 .wrapper :global(button.thumbnail-lg) {
     width: var(--size-32);
 }
</style>
