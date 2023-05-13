<script lang="ts">
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { Block, BlockTitle } from "@gradio/atoms";
 import { get, type Writable, writable } from "svelte/store";
 import Modal from "$lib/components/Modal.svelte";
 import { Button } from "@gradio/button";
 import type { ComfyImageEditorNode, MultiImageData } from "$lib/nodes/ComfyWidgetNodes";
 import { Embed as Klecks, KL, KlApp, klHistory, type KlAppOptionsEmbed } from "klecks";

 import "klecks/style/style.scss";

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyImageEditorNode | null = null;
 let nodeValue: Writable<MultiImageData> | null = null;
 let attrsChanged: Writable<number> | null = null;
 let leftUrl: string = ""
 let rightUrl: string = ""

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
     if (editorRoot) {
         while (editorRoot.firstChild) {
             editorRoot.removeChild(editorRoot.firstChild);
         }
     }

     kl = null;
     showModal = false;
 }

 function submitKlecksToComfyUI(onSuccess: () => void, onError: () => void) {
     const data = kl.getPNG();
 }

 function generateBlankImage(fill: string = "#fff"): HTMLCanvasElement {
     const canvas = document.createElement('canvas');
     canvas.width = 512;
     canvas.height = 512;
     const ctx = canvas.getContext('2d');
     ctx.save();
     ctx.fillStyle = fill,
     ctx.fillRect(0, 0, canvas.width, canvas.height);
     ctx.restore();
     return canvas;
 }

 function openImageEditor() {
     if (!editorRoot)
         return;

     showModal = true;

     const url = `http://${location.hostname}:8188` // TODO make configurable

     kl = new Klecks({
         embedUrl: url,
         onSubmit: submitKlecksToComfyUI,
         targetEl: editorRoot.parentElement.parentElement
     });

     kl.openProject({
         width: 512,
         height: 512,
         layers: [{
             name: 'Image',
             opacity: 1,
             mixModeStr: 'source-over',
             image: generateBlankImage(),
         }]
     });

     setTimeout(function () {
         kl.klApp?.out("yo");
     }, 1000);
 }
</script>

<div class="wrapper comfy-image-editor">
    {#if isMobile}
        <span>TODO mask editor</span>
    {:else}
        <Modal bind:showModal on:close={disposeEditor}>
            <div id="klecks-loading-screen">
                <span id="klecks-loading-screen-text"></span>
            </div>
            <div class="image-editor-root" bind:this={editorRoot} />
        </Modal>
        <div class="comfy-image-editor-panel">
            <Block>
                <BlockTitle>Image editor.</BlockTitle>
                <Button variant="secondary" on:click={openImageEditor}>
                    Open
                </Button>
            </Block>
        </div>
    {/if}
</div>

<style lang="scss">
 .image-editor-root {
     width: 75vw;
     height: 75vh;
     overflow: hidden;
 }

 .comfy-image-editor {
     :global(> dialog) {
         overflow: hidden;
     }
 }
</style>
