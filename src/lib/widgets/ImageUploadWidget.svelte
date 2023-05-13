<script lang="ts">
 import ImageUpload from "$lib/components/ImageUpload.svelte"
 import type { WidgetLayout } from "$lib/stores/layoutState";
 import type { Writable } from "svelte/store";
 import type { ComfyGalleryNode, ComfyImageUploadNode, ComfyImageLocation, MultiImageData } from "$lib/nodes/ComfyWidgetNodes";
	import notify from "$lib/notify";
	import { comfyFileToComfyBoxMetadata, type ComfyBoxImageMetadata } from "$lib/utils";

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyImageUploadNode | null = null;
 let nodeValue: Writable<ComfyBoxImageMetadata[]> | null = null;
 let propsChanged: Writable<number> | null = null;
 let imgWidth: number = 1;
 let imgHeight: number = 1;

 $: widget && setNodeValue(widget);

 $: if ($nodeValue && $nodeValue.length > 0) {
     // TODO improve
     if (imgWidth > 0 && imgHeight > 0) {
         $nodeValue[0].width = imgWidth
         $nodeValue[0].height = imgHeight
     }
     else {
         $nodeValue[0].width = 0
         $nodeValue[0].height = 0
     }
 }

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyImageUploadNode
         nodeValue = node.value;
         propsChanged = node.propsChanged;
     }
 };

 function onUploading() {
     console.warn("ONUPLOAD!!!")
     $nodeValue = []
 }

 function onChange(e: CustomEvent<ComfyImageLocation[]>) {
     console.warn("ONCHANGE!!!", e.detail)
     $nodeValue = (e.detail || []).map(comfyFileToComfyBoxMetadata)
 }

 function onUploaded(e: CustomEvent<ComfyImageLocation[]>) {
     console.warn("ONUPLOADED!!!", e.detail)
     $nodeValue = (e.detail || []).map(comfyFileToComfyBoxMetadata)
 }

 function onUploadError(e: CustomEvent<any>) {
     console.warn("ONUPLOADERRO!!!", e.detail)
     notify(`Error uploading image to ComfyUI: ${e.detail}`)
     $nodeValue = []
 }

 function onClear(e: CustomEvent<ComfyImageLocation[]>) {
     console.warn("ONCLEAR!!!", e.detail)
     $nodeValue = []
 }
</script>

<div class="wrapper gradio-file comfy-image-upload" style={widget.attrs.style}>
    {#if widget && node}
        <ImageUpload value={$nodeValue || []}
                     bind:imgWidth
                     bind:imgHeight
                     bind:fileCount={node.properties.fileCount}
                     elem_classes={widget.attrs.classes.split(",")}
                     style={widget.attrs.style}
                     label={widget.attrs.title}
                     on:uploading={onUploading}
                     on:uploaded={onUploaded}
                     on:upload_error={onUploadError}
                     on:clear={onClear}
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
