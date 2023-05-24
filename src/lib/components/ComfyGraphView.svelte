<script lang="ts">
 import { Button } from "@gradio/button";
 import type ComfyApp from "./ComfyApp";
 import DropZone from "./DropZone.svelte";
 import interfaceState from "$lib/stores/interfaceState";

 export let app: ComfyApp;

 function doRecenter(): void {
     app?.lCanvas?.recenter();
 }
</script>

<div class="wrapper litegraph">
    <div class="canvas-wrapper pane-wrapper">
        <canvas id="graph-canvas" />
        <DropZone {app} />
    </div>
    <div class="bar">
        {#if !$interfaceState.graphTransitioning}
            <span class="left">
                <button on:click={doRecenter}>Recenter</button>
            </span>
        {/if}
    </div>
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
