<script lang="ts">
 import { Page, Navbar, Block, Tab, BlockHeader, Segmented, Button, Icon } from 'framework7-svelte';
 import { LGraphCanvas } from "@litegraph-ts/core";
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import ComfyGraphCanvas from "$lib/ComfyGraphCanvas";
 import { onMount } from 'svelte';

 export let app: ComfyApp = undefined;
 let lCanvas: LGraphCanvas | null = null;
 let canvasEl: HTMLCanvasElement | null = null;

 function resizeCanvas() {
     canvasEl.width = canvasEl.parentElement.offsetWidth;
     canvasEl.height = canvasEl.parentElement.offsetHeight;
     canvasEl.style.width = ""
     canvasEl.style.height = ""
     lCanvas.draw(true, true);
 }

 $: if (app && canvasEl) {
     if (!lCanvas) {
         lCanvas = new ComfyGraphCanvas(app, canvasEl);
         lCanvas.allow_interaction = false;
     }
     resizeCanvas();
 }

</script>

<Page>
  <Navbar title="Node Graph" backLink="Back" />
  <div class="canvas-wrapper pane-wrapper">
      <canvas bind:this={canvasEl} id="extra-canvas" />
  </div>
</Page>

<style lang="scss">
 .canvas-wrapper {
     width: 100%;
     height: 100%;
     background-color: #333;
 }
</style>
