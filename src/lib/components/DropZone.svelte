<script lang="ts">
	import { writable, type Writable } from "svelte/store";
 import type ComfyApp from "./ComfyApp";

 export let app: ComfyApp;
 let a1111Prompt: Writable<any | null> = writable(null);
 let dropZone: HTMLDivElement | null = null;
 let disabled = false;

 $: a1111Prompt = app.a1111Prompt;

 $: disabled = a1111Prompt && $a1111Prompt;

 $: if (disabled) {
     hideDropZone();
 }

 function showDropZone() {
     if (dropZone && !disabled)
         dropZone.style.display = "block";
 }

 function hideDropZone() {
     if (dropZone)
         dropZone.style.display = "none";
 }

 function allowDrag(event: DragEvent) {
     if (disabled)
         return

     if (event.dataTransfer != null && event.dataTransfer.items?.length > 0) {
         event.dataTransfer.dropEffect = 'copy';
         showDropZone();
         event.preventDefault();
     }
 }

 async function handleDrop(event: DragEvent) {
     if (disabled)
         return

     event.preventDefault();
     event.stopPropagation();
     hideDropZone();

     if (event.dataTransfer != null && event.dataTransfer.files.length > 0) {
         await app.handleFile(event.dataTransfer.files[0]);
     }
 }
</script>

<svelte:window on:dragenter={showDropZone} />

{#if !disabled}
    <div id="dropzone"
         class="dropzone"
         bind:this={dropZone}
         on:dragover={allowDrag}
         on:dragleave={hideDropZone}
         on:drop={handleDrop}
    />
{/if}

<style lang="scss">
 .dropzone {
     box-sizing: border-box;
     display: none;
     position: absolute;
     width: 100%;
     height: 100%;
     left: 0;
     top: 0;
     z-index: 99999;
     background: #60a7dc80;
     border: 4px dashed #60a7dc;
 }
</style>
