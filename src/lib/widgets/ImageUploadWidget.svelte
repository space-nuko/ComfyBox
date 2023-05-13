<script lang="ts">
 import ImageUpload from "$lib/components/ImageUpload.svelte"
 import type { WidgetLayout } from "$lib/stores/layoutState";
 import type { Writable } from "svelte/store";
 import type { ComfyGalleryNode, ComfyImageUploadNode, GalleryOutputEntry, MultiImageData } from "$lib/nodes/ComfyWidgetNodes";

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyImageUploadNode | null = null;
 let nodeValue: Writable<GalleryOutputEntry[]> | null = null;
 let propsChanged: Writable<number> | null = null;
 let imgWidth: number = 1;
 let imgHeight: number = 1;

 $: widget && setNodeValue(widget);

 $: if (!(node && $nodeValue && $nodeValue.length > 0)) {
     node.imageSize = [0, 0]
 }
 else if (imgWidth > 0 && imgHeight > 0) {
     node.imageSize = [imgWidth, imgHeight]
 }
 else {
     node.imageSize = [0, 0]
 }

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyImageUploadNode
         nodeValue = node.value;
         propsChanged = node.propsChanged;
     }
 };

 function onChange(e: CustomEvent<GalleryOutputEntry[]>) {
     console.warn("ONCHANGE!!!", e.detail)
     $nodeValue = e.detail || []
 }

 function onClear(e: CustomEvent<GalleryOutputEntry[]>) {
     console.warn("ONCLEAR!!!", e.detail)
     $nodeValue = []
 }
</script>

<div class="wrapper gradio-file comfy-image-upload" style={widget.attrs.style}>
    {#if widget && node && nodeValue}
        <ImageUpload value={$nodeValue}
                     bind:imgWidth
                     bind:imgHeight
                     bind:fileCount={node.properties.fileCount}
                     elem_classes={widget.attrs.classes.split(",")}
                     style={widget.attrs.style}
                     label={widget.attrs.title}
                     on:change={onChange}
                     on:clear={onClear}/>
    {/if}
</div>

<style lang="scss">
 .comfy-image-upload {
     height: var(--size-96);

     :global(.block) {
         height: inherit;
         padding: 0;
         border-radius: 0;
     }

     img {
         width: 100%;
         height: 100%;
         max-width: 100%;
         max-height: 100%;
         object-fit: contain;
     }
 }
</style>
