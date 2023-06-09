<script lang="ts">
 import { type WidgetLayout } from "$lib/stores/layoutStates";
 import { Block } from "@gradio/atoms";
 import { TextBox } from "@gradio/form";
 import Row from "$lib/components/gradio/app/Row.svelte";
 import { writable, type Writable } from "svelte/store";
 import { Button } from "@gradio/button";
 import {
     type ComfyBoxImageMetadata,
     comfyFileToComfyBoxMetadata,
     comfyBoxImageToComfyFile,
     type ComfyImageLocation,
     comfyBoxImageToComfyURL,
     convertComfyOutputToComfyURL,
     batchUploadBlobsToComfyUI,
     canvasToBlob,
	 basename
 } from "$lib/utils";
 import ImageUpload from "$lib/components/ImageUpload.svelte";
 import notify from "$lib/notify";
 import { ImageViewer } from "$lib/ImageViewer";
 import MaskCanvas, { type LineGroup, type MaskCanvasData } from "$lib/components/MaskCanvas.svelte";
 import type { ComfyImageUploadNode } from "$lib/nodes/widgets";
	import { tick } from "svelte";

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyImageUploadNode | null = null;
 let nodeValue: Writable<ComfyBoxImageMetadata[]> | null = null;

 let imgWidth: Writable<number> = writable(0);
 let imgHeight: Writable<number> = writable(0);

 let maskCanvasComp: MaskCanvas | null = null;
 let editMask: boolean = false;

 $: widget && setNodeValue(widget);

 let canMask = false;
 $: canMask = (node?.properties?.maskCount || 0) > 0;
 $: if (!canMask) clearMask();


 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyImageUploadNode
         nodeValue = node.value;
         imgWidth = node.imgWidth
         imgHeight = node.imgHeight
         status = $nodeValue && $nodeValue.length > 0 ? "uploaded" : "empty"
     }
 };

 let hasImage = false;
 $: hasImage = $nodeValue && $nodeValue.length > 0;
 $: if (!hasImage) {
     editMask = false;
 }

 let mask: ComfyImageLocation | null;
 $: if (hasImage && canMask) {
     mask = $nodeValue[0].children?.find(i => i.tags.includes("mask"))?.comfyUIFile;
 }
 else {
     mask = null;
 }

 const MASK_FILENAME: string = "ComfyBoxMask.png"

 async function onMaskReleased(e: CustomEvent<MaskCanvasData>) {
     const data = e.detail;
     if (data.maskCanvas != null && data.hasMask) {
         await saveMask(data.maskCanvas)
     }
 }

 async function saveMask(maskCanvas: HTMLCanvasElement) {
     if (!canMask) {
         notify("Mask editing is disabled for this widget.", { type: "warning" })
         return;
     }
     if (!maskCanvas) {
         notify("No mask canvas!", { type: "warning" })
         return
     }
     if (!$nodeValue || $nodeValue.length === 0) {
         notify("No image uploaded to apply mask to.", { type: "warning" })
         return
     }

     const hadNoMask = $nodeValue[0].children.findIndex(i => i.tags?.includes("mask")) === -1;
     const existFilename = $nodeValue[0].comfyUIFile.filename
     const filename = existFilename ? `${basename(existFilename)}_mask.png` : MASK_FILENAME

     console.warn("[ImageUpload] UPLOAD MASK", filename)

     await canvasToBlob(maskCanvas)
         .then(blob => batchUploadBlobsToComfyUI([{
             blob,
             filename,
             overwrite: true
         }]))
         .then(result => {
             const meta = result.files.map(f => {
                 const m = comfyFileToComfyBoxMetadata(f)
                 m.tags = ["mask"]
                 m.width = maskCanvas.width;
                 m.height = maskCanvas.height;
                 return m;
             });
             if ($nodeValue.length > 0) {
                 // TODO support multiple images?
                 $nodeValue[0].children = meta;
                 if (hadNoMask) {
                     notify("Uploaded mask successfully!", { type: "success" })
                 }
             }
             else {
                 throw new Error("No image was uploaded yet.")
             }
         })
         .catch(error => {
             notify(`Failed to upload mask to ComfyUI: ${error}`, { type: "error", timeout: 10000 })
         })
 }

 function clearMask() {
     for (const image of $nodeValue) {
         // TODO other child image types preserved here?
         image.children = [];
     }
     mask = null;
     if (maskCanvasComp) {
         maskCanvasComp.clearStrokes();
     }
 }

 async function toggleEditMask() {
     editMask = !editMask;
     await tick();
     if (maskCanvasComp) {
         maskCanvasComp.recenterImage();
     }
 }

 let editorRoot: HTMLDivElement | null = null;
 let showModal = false;

 function disposeEditor() {
     console.warn("[ImageEditorWidget] CLOSING", widget, $nodeValue)

     if (editorRoot) {
         while (editorRoot.firstChild) {
             editorRoot.removeChild(editorRoot.firstChild);
         }
     }

     showModal = false;
 }

 function openLightbox() {
     if (!$nodeValue || $nodeValue.length === 0)
         return;

     const comfyImage = $nodeValue[0];
     const comfyURL = comfyBoxImageToComfyURL(comfyImage);
     const images = [comfyURL]

     ImageViewer.instance.showModal(images, 0);
 }

 let status = "empty";
 let uploadError = null;

 function onUploading() {
     console.warn("UPLOADING!!!")
     uploadError = null;
     status = "uploading"
 }

 function onUploaded(e: CustomEvent<ComfyImageLocation[]>) {
     console.warn("UPLOADED!!!")
     uploadError = null;
     status = "uploaded"
     $nodeValue = e.detail.map(comfyFileToComfyBoxMetadata);
 }

 function onClear() {
     console.warn("CLEAR!!!")
     uploadError = null;
     status = "empty"
     $nodeValue = []
 }

 function onUploadError(e: CustomEvent<any>) {
     console.warn("ERROR!!!")
     status = "error"
     uploadError = e.detail
     $nodeValue = []
     notify(`Failed to upload image to ComfyUI: ${uploadError}`, { type: "error", timeout: 10000 })
 }

 let _value: ComfyImageLocation[] = []
 $: if ($nodeValue)
     _value = $nodeValue.map(comfyBoxImageToComfyFile)
 else
     _value = []

 $: canEdit = status === "empty" || status === "uploaded";

 function onChange(e: CustomEvent<ComfyImageLocation[]>) {
 }
</script>

<div class="wrapper comfy-image-editor">
    {#if widget.attrs.variant === "fileUpload" || isMobile}
        <ImageUpload value={_value}
                     bind:imgWidth={$imgWidth}
                     bind:imgHeight={$imgHeight}
                     fileCount={"single"}
                     elem_classes={[]}
                     style={""}
                     label={widget.attrs.title}
                     on:uploading={onUploading}
                     on:uploaded={onUploaded}
                     on:upload_error={onUploadError}
                     on:clear={onClear}
                     on:change={onChange}
                     on:image_clicked={openLightbox}
        />
    {:else}
        <div class="comfy-image-editor-panel">
            {#if _value && _value.length > 0 && canMask}
                {@const comfyURL = convertComfyOutputToComfyURL(_value[0])}
                <div class="mask-canvas-wrapper" style:display={editMask ? "block" : "none"}>
                    <MaskCanvas bind:this={maskCanvasComp} fileURL={comfyURL} on:release={onMaskReleased} on:loaded={onMaskReleased} />
                </div>
            {/if}
            <div style:display={(canMask && editMask) ? "none" : "block"}>
                <ImageUpload value={_value}
                             bind:imgWidth={$imgWidth}
                             bind:imgHeight={$imgHeight}
                             {mask}
                             fileCount={"single"}
                             elem_classes={[]}
                             style={""}
                             label={widget.attrs.title}
                             on:uploading={onUploading}
                             on:uploaded={onUploaded}
                             on:upload_error={onUploadError}
                             on:clear={onClear}
                             on:change={onChange}
                             on:image_clicked={openLightbox}
                />
            </div>
            <Block>
                {#if hasImage}
                    {@const maskCount = $nodeValue[0] ? $nodeValue[0].children.filter(f => f.tags?.includes("mask")).length : 0}
                    <Row>
                        {#if canMask}
                            <div>
                                {#if editMask}
                                    <Button variant="secondary" on:click={() => { clearMask(); notify("Mask cleared."); }}>
                                        Clear Mask
                                    </Button>
                                {/if}
                                <Button disabled={!_value} on:click={toggleEditMask}>
                                    {#if editMask}
                                        Show Image
                                    {:else}
                                        Edit Mask
                                    {/if}
                                </Button>
                            </div>
                        {/if}
                        <div>
                            <TextBox label={""} show_label={false} disabled={true} lines={1} max_lines={1} value="Images: {$nodeValue.length}, masks: {maskCount}"/>
                        </div>
                        {#if uploadError}
                            <div>
                                Upload error: {uploadError}
                            </div>
                        {/if}
                    </Row>
                {/if}
            </Block>
        </div>
    {/if}
</div>

<style lang="scss">
 .comfy-image-editor {
     :global(> dialog) {
         overflow: hidden;
     }
 }

 .mask-canvas-wrapper {
     height: calc(var(--size-96) * 1.5);
 }
</style>
