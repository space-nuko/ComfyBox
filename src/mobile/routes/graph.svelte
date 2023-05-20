<script lang="ts">
 import { Page, Navbar, Block, Tab, BlockHeader, Segmented, Button, Icon } from 'framework7-svelte';
 import { LiteGraph, LGraphCanvas } from "@litegraph-ts/core";
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import ComfyGraphCanvas from "$lib/ComfyGraphCanvas";
 import { onMount } from 'svelte';
 import uiState from "$lib/stores/uiState"

 export let app: ComfyApp | null = null;
 let lCanvas: ComfyGraphCanvas | null = null;
 let canvasEl: HTMLCanvasElement | null = null;

 function resizeCanvas() {
     canvasEl.width = canvasEl.parentElement.offsetWidth;
     canvasEl.height = canvasEl.parentElement.offsetHeight;
     canvasEl.style.width = ""
     canvasEl.style.height = ""
     lCanvas.draw(true, true);
 }

 $: if (app?.activeGraph != null && canvasEl != null) {
     if (!lCanvas) {
         lCanvas = new ComfyGraphCanvas(app, app.activeGraph, canvasEl);
         lCanvas.allow_interaction = false;
         app.activeGraph.eventBus.on("afterExecute", () => lCanvas.draw(true))
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

     > canvas {
         // Don't try to scroll the page when scrolling on canvas
         touch-action: none;
     }
 }
</style>
