<script lang="ts">
 import { onMount } from "svelte";
 import type ComfyApp from "./ComfyApp";
 import DropZone from "./DropZone.svelte";
 import interfaceState from "$lib/stores/interfaceState";
 import workflowState from "$lib/stores/workflowState";
 import uiState from '$lib/stores/uiState';
 import ComfyGraphErrorList from "$lib/components/ComfyGraphErrorList.svelte"

 export let app: ComfyApp;

 let canvas: HTMLCanvasElement;

 onMount(async () => {
     if (app?.lCanvas) {
         canvas = app.lCanvas.canvas;
         app.lCanvas?.setCanvas(canvas)
     }
 })

 function doRecenter(): void {
     app?.lCanvas?.recenter();
 }

 function clearErrors(): void {
     $uiState.activeError = null;
 }
</script>

<div class="wrapper litegraph">
    <div class="canvas-wrapper pane-wrapper">
        <canvas bind:this={canvas} id="graph-canvas" />
        <DropZone {app} />
    </div>
    <div class="bar">
        {#if !$interfaceState.graphTransitioning}
            <span class="left">
                <button on:click={doRecenter}>Recenter</button>
                {#if $uiState.activeError != null}
                    <button on:click={clearErrors}>Clear Errors</button>
                {/if}
            </span>
        {/if}
    </div>
    {#if $uiState.activeError && app?.lCanvas?.activeErrors != null}
        <ComfyGraphErrorList {app} errors={app.lCanvas.activeErrors} />
    {/if}
</div>

<style lang="scss">
 $bar-height: 3em;

 .wrapper {
     width: 100%;
     height: 100%;
 }

 .canvas-wrapper {
     width: 100%;
     height: calc(100% - $bar-height);
     background-color: #333;
 }

 .bar {
     padding: 0.2em 0.5em;
     display: flex;
     align-items: center;
     width: 100%;
     height: $bar-height;
     background-color: #3A3A3A;
     border: 2px solid #2A2A2A;
     gap: var(--layout-gap);
     margin-top: auto;
     overflow-x: auto;

     > .left {
         flex-shrink: 0;
     }

     > .right {
         margin-left: auto
     }

     button {
         color: #EEE;
         border: 1px solid #888;
         padding: 2px 5px;
         background-color: #666;

         &:hover {
             background-color: #999;
             border-color: #AAA;
         }
         &:active {
             background-color: #555;
             border-color: #777;
         }
     }
 }
</style>
