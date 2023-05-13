<script lang="ts">
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { Block, BlockTitle } from "@gradio/atoms";
 import { get, type Writable, writable } from "svelte/store";
 import Modal from "$lib/components/Modal.svelte";
 import { Button } from "@gradio/button";
 import type { ComfyImageEditorNode, GalleryOutputEntry, MultiImageData } from "$lib/nodes/ComfyWidgetNodes";
 import { Embed as Klecks, KL, KlApp, klHistory, type KlAppOptionsEmbed } from "klecks";
 import type { FileData as GradioFileData } from "@gradio/upload";

 import "klecks/style/style.scss";
	import ImageUpload from "$lib/components/ImageUpload.svelte";
	import { uploadImageToComfyUI, type ComfyUploadImageAPIResponse, convertComfyOutputToComfyURL } from "$lib/utils";
	import notify from "$lib/notify";

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyImageEditorNode | null = null;
 let nodeValue: Writable<GalleryOutputEntry[]> | null = null;
 let attrsChanged: Writable<number> | null = null;
 let leftUrl: string = ""
 let rightUrl: string = ""

 let imgElem: HTMLImageElement | null = null
 let imgWidth: number = 0;
 let imgHeight: number = 0;

 $: widget && setNodeValue(widget);

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyImageEditorNode
         nodeValue = node.value;
         attrsChanged = widget.attrsChanged;
     }
 };

 const urlPattern = /^((http|https|ftp):\/\/)/;

 $: updateUrls($nodeValue);

 function updateUrls(value: MultiImageData) {
     // leftUrl = ""
     // rightUrl = ""
     // console.warn("UPD", value)
     //
     // if (typeof value[0] === "string") {
     //     if (urlPattern.test(value[0]))
     //         leftUrl = value[0]
     //     else
     //         leftUrl = convertFilenameToComfyURL(value[0])
     // }
     // if (typeof value[1] === "string") {
     //     if (urlPattern.test(value[1]))
     //         rightUrl = value[1]
     //     else
     //         rightUrl = convertFilenameToComfyURL(value[1])
     // }
 }

 let editorRoot: HTMLDivElement | null = null;
 let showModal = false;
 let kl: Klecks | null = null;

 function disposeEditor() {
     console.warn("[ImageEditorWidget] CLOSING", widget, $nodeValue)

     if (editorRoot) {
         while (editorRoot.firstChild) {
             editorRoot.removeChild(editorRoot.firstChild);
         }
     }

     kl = null;
     showModal = false;
 }

 function generateBlankCanvas(width: number, height: number, fill: string = "#fff"): HTMLCanvasElement {
     const canvas = document.createElement('canvas');
     canvas.width = width;
     canvas.height = height;
     const ctx = canvas.getContext('2d');
     ctx.save();
     ctx.fillStyle = fill,
     ctx.fillRect(0, 0, canvas.width, canvas.height);
     ctx.restore();
     return canvas;
 }

 async function loadImage(imageURL: string): Promise<HTMLImageElement> {
     return new Promise((resolve) => {
         const e = new Image();
         e.setAttribute('crossorigin', 'anonymous'); // Don't taint the canvas from loading files on-disk
         e.addEventListener("load", () => { resolve(e); });
         e.src = imageURL;
         return e;
     });
 }

 async function generateImageCanvas(imageURL: string): Promise<[HTMLCanvasElement, number, number]> {
     const image = await loadImage(imageURL);
     const canvas = document.createElement('canvas');
     canvas.width = image.width;
     canvas.height = image.height;
     const ctx = canvas.getContext('2d');
     ctx.save();
     ctx.fillStyle = "rgba(255, 255, 255, 0.0)";
     ctx.fillRect(0, 0, canvas.width, canvas.height);
     ctx.drawImage(image, 0, 0);
     ctx.restore();
     return [canvas, image.width, image.height];
 }

 const FILENAME: string = "ComfyUITemp.png";
 // const SUBFOLDER: string = "ComfyBox_Editor";

 async function submitKlecksToComfyUI(onSuccess: () => void, onError: () => void) {
     const blob = kl.getPNG();

     await uploadImageToComfyUI(blob, FILENAME, "input")
         .then((entry: GalleryOutputEntry) => {
             $nodeValue = [entry] // TODO more than one image
             notify("Saved image to ComfyUI!", { type: "success" })
             onSuccess();
         })
         .catch(err => {
             notify(`Failed to upload image from editor: ${err}`, { type: "error", timeout: 10000 })
             $nodeValue = []
             onError();
         })
 }

 async function openImageEditor() {
     if (!editorRoot)
         return;

     showModal = true;

     const url = `http://${location.hostname}:8188` // TODO make configurable

     kl = new Klecks({
         embedUrl: url,
         onSubmit: submitKlecksToComfyUI,
         targetEl: editorRoot,
         warnOnPageClose: false
     });

     console.warn("[ImageEditorWidget] OPENING", widget, $nodeValue)

     let canvas = null;
     let width = 512;
     let height = 512;

     if ($nodeValue && $nodeValue.length > 0) {
         const comfyImage = $nodeValue[0];
         const comfyURL = convertComfyOutputToComfyURL(comfyImage);
         [canvas, width, height] = await generateImageCanvas(comfyURL);
     }
     else {
         canvas = generateBlankCanvas(width, height);
     }

     kl.openProject({
         width: width,
         height: height,
         layers: [{
             name: 'Image',
             opacity: 1,
             mixModeStr: 'source-over',
             image: canvas
         }]
     });

     setTimeout(function () {
         kl.klApp?.out("yo");
     }, 1000);
 }

 let status = "none"
 let uploadError = null;

 function onUploading() {
     uploadError = null;
     status = "uploading"
 }

 function onUploaded(e: CustomEvent<GalleryOutputEntry[]>) {
     uploadError = null;
     status = "uploaded"
     $nodeValue = e.detail;
 }

 function onClear() {
     uploadError = null;
     status = "none"
 }

 function onUploadError(e: CustomEvent<any>) {
     status = "error"
     uploadError = e.detail
 }

 function onChange(e: CustomEvent<GalleryOutputEntry[]>) {
     // $nodeValue = e.detail;
 }

 $: canEdit = status === "none" || status === "uploaded";

</script>

<div class="wrapper comfy-image-editor">
    {#if isMobile}
        <span>TODO mask editor</span>
    {:else}
        <Modal bind:showModal closeOnClick={false} on:close={disposeEditor}>
            <div>
                <div id="klecks-loading-screen">
                    <span id="klecks-loading-screen-text"></span>
                </div>
                <div class="image-editor-root" bind:this={editorRoot} />
            </div>
        </Modal>
        <div class="comfy-image-editor-panel">
            <ImageUpload value={$nodeValue}
                         bind:imgWidth
                         bind:imgHeight
                         bind:imgElem
                         fileCount={"single"}
                         elem_classes={[]}
                         style={""}
                         label={"Image"}
                         on:uploading={onUploading}
                         on:uploaded={onUploaded}
                         on:upload_error={onUploadError}
                         on:clear={onClear}
                         on:change={onChange}
            />
            <Block>
                <Button variant="primary" disabled={!canEdit} on:click={openImageEditor}>
                    Edit Image
                </Button>
                <BlockTitle>Status: {status}</BlockTitle>
                {#if uploadError}
                    <div>
                        Upload error: {uploadError}
                    </div>
                {/if}
            </Block>
        </div>
    {/if}
</div>

<style lang="scss">
 .image-editor-root {
     width: 75vw;
     height: 75vh;
     overflow: hidden;

     color: black;

     :global(> .g-root) {
         height: calc(100% - 59px);
     }
 }

 .comfy-image-editor {
     :global(> dialog) {
         overflow: hidden;
     }
 }

 :global(.kl-popup) {
     z-index: 999999999999;
 }
</style>
