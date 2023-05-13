<script lang="ts">
 import { Block, BlockLabel, Empty } from "@gradio/atoms";
 import { File as FileIcon } from "@gradio/icons";
 import ImageUpload from "$lib/components/ImageUpload.svelte"
 import type { WidgetLayout } from "$lib/stores/layoutState";
 import type { Writable } from "svelte/store";
 import type { ComfyGalleryNode, ComfyImageUploadNode, GalleryOutputEntry } from "$lib/nodes/ComfyWidgetNodes";
 import type { FileData as GradioFileData } from "@gradio/upload";
 import UploadText from "$lib/components/gradio/app/UploadText.svelte";
	import { tick } from "svelte";
	import notify from "$lib/notify";
	import type { Vector2 } from "@litegraph-ts/core";

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyImageUploadNode | null = null;
 let nodeValue: Writable<Array<GradioFileData>> | null = null;
 let propsChanged: Writable<number> | null = null;
 let dragging = false;
 let pending_upload = false;
 let old_value: Array<GradioFileData> | null = null;
 let imgWidth: number = 1;
 let imgHeight: number = 1;

 $: widget && setNodeValue(widget);

 $: if (!(node && $nodeValue && $nodeValue.length > 0)) {
     node.imageSize = [1, 1]
 }
 else if (imgWidth > 1 || imgHeight > 1) {
     node.imageSize = [imgWidth, imgHeight]
 }
 else {
     node.imageSize = [1, 1]
 }

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyImageUploadNode
         nodeValue = node.value;
         propsChanged = node.propsChanged;
     }
 };

 function onChange(e: CustomEvent<GradioFileData[]>) {
     $nodeValue = e.detail || []
 }
</script>

<div class="wrapper gradio-file comfy-image-upload" style={widget.attrs.style}>
    {#if widget && node && nodeValue}
        <ImageUpload value={$nodeValue}
                     {isMobile}
                     bind:imgWidth
                     bind:imgHeight
                     bind:fileCount={node.properties.fileCount}
                     elem_classes={widget.attrs.classes.split(",")}
                     style={widget.attrs.style}
                     label={widget.attrs.title}
                     on:change={onChange}/>
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
