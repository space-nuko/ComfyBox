<script lang="ts">
 import { onMount } from "svelte";
 import { Pane, Splitpanes } from 'svelte-splitpanes';
 import { Backpack, Gear } from 'radix-icons-svelte';
 import ComfyUIPane from "./ComfyUIPane.svelte";
 import ComfyApp from "./ComfyApp";

 import { LGraphNode } from "litegraph.js";

 let app: ComfyApp = undefined;
 let uiPane: ComfyUIPane = undefined;

 function refreshView(event) {
     app.resizeCanvas();
 }

 onMount(async () => {
     app = new ComfyApp();

     app.eventBus.on("nodeAdded", (node: LGraphNode) => {
         uiPane.addNodeUI(node);
     });

     app.eventBus.on("nodeRemoved", (node: LGraphNode) => {
         uiPane.removeNodeUI(node);
     });

     app.eventBus.on("configured", (graph: LGraph) => {
         uiPane.configureFinished(graph);
     });

     app.eventBus.on("cleared", () => {
         uiPane.clear();
     });

     await app.setup();
     refreshView();

     (window as any).app = app;
 })
</script>

<div id="dropzone" class="dropzone"></div>
<div id="container">
    <Splitpanes theme="comfy" on:resize={refreshView}>
        <Pane size={20} minSize={10}>
            <div>
                Sidebar
            </div>
        </Pane>
        <Pane>
            <Splitpanes theme="comfy" on:resize={refreshView} horizontal="{true}">
                <Pane minSize={15}>
                    <ComfyUIPane bind:this={uiPane} {app} />
                </Pane>
                <Pane minSize={10}>
                    <canvas id="graph-canvas" />
                </Pane>
            </Splitpanes>
        </Pane>
    </Splitpanes>
</div>

<style>
 #container {
     height: calc(100vh - 60px);
     display: grid;
     width: 100%;
 }

 #comfy-content {
     grid-area: content;
     height: 100vh;
 }

 #comfy-ui {
 }

 #comfy-graph {
 }

 #graph-canvas {
     width: 100%;
     height: 100%;
 }

 .dropzone {
     box-sizing: border-box;
     display: none;
     position: fixed;
     width: 100%;
     height: 100%;
     left: 0;
     top: 0;
     z-index: 99999;
     background: #60a7dc80;
     border: 4px dashed #60a7dc;
 }

 :global(html, body) {
     width: 100%;
     height: 100%;
     margin: 0px;
     font-family: Arial;
 }

 :global(.splitpanes.comfy.splitpanes--horizontal>.splitpanes__splitter) {
     min-height: 20px;
     cursor: row-resize;
 }

 :global(.splitpanes.comfy.splitpanes--vertical>.splitpanes__splitter) {
     min-width: 20px;
     cursor: col-resize;
 }

 :global(.splitpanes.comfy) {
     max-height: calc(100vh - 60px);
 }

 :global(.splitpanes__pane) {
     box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
     justify-content: center;
     align-items: center;
     display: flex;
     position: relative;
 }
</style>
