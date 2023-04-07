<script lang="ts">
 import { onMount } from "svelte";
 import { get } from "svelte/store";
 import { Pane, Splitpanes } from 'svelte-splitpanes';
 import { Button } from "@gradio/button";
 import ComfyUIPane from "./ComfyUIPane.svelte";
 import ComfyApp from "./ComfyApp";
 import widgetState from "$lib/stores/widgetState";

 import { LGraphNode } from "@litegraph-ts/core";

 let app: ComfyApp = undefined;
 let uiPane: ComfyUIPane = undefined;
 let containerElem: HTMLDivElement;
 let resizeTimeout: typeof Timer = -1;

 function refreshView(event) {
     clearTimeout(resizeTimeout);
     resizeTimeout = setTimeout(app.resizeCanvas.bind(app), 250);
 }

 function queuePrompt() {
     const state = get(widgetState);
     console.log("Queuing!", state);
     app.queuePrompt(0, 1, state);
 }

 let graphSize = null;

 function toggleGraph() {
     if (graphSize == 0) {
         graphSize = 100;
         app.resizeCanvas();
     }
     else {
         graphSize = 0;
     }
 }

 let graphResizeTimer: typeof Timer = -1;

 onMount(async () => {
     app = new ComfyApp();

     app.eventBus.on("nodeAdded", widgetState.nodeAdded);
     app.eventBus.on("nodeRemoved", widgetState.nodeRemoved);
     app.eventBus.on("configured", widgetState.configureFinished);
     app.eventBus.on("cleared", widgetState.clear);

     await app.setup();
     refreshView();

     (window as any).app = app;

     let graphPaneDiv = containerElem.querySelector(".canvas-wrapper").parentNode as HTMLDivNode;
     graphPaneDiv.ontransitionend = () => {
         app.resizeCanvas()
     }
 })
</script>

<div id="dropzone" class="dropzone"></div>
<div id="container" bind:this={containerElem}>
    <Splitpanes theme="comfy" on:resize={refreshView}>
        <Pane>
            <Splitpanes theme="comfy" on:resize={refreshView} horizontal="{true}">
                <Pane minSize={15}>
                    <ComfyUIPane bind:this={uiPane} {app} />
                </Pane>
                <Pane snapSize={10} bind:size={graphSize}>
                    <div class="canvas-wrapper">
                        <canvas id="graph-canvas" />
                    </div>
                </Pane>
            </Splitpanes>
        </Pane>
        <Pane size={20} snapSize={10}>
            <div>
                Sidebar
            </div>
        </Pane>
    </Splitpanes>
</div>
<div id="bottombar">
    <Button variant="primary" on:click={queuePrompt}>
        Run
    </Button>
    <Button variant="secondary" on:click={toggleGraph}>
        Show/Hide Graph
    </Button>
</div>

<style>
 #container {
     height: calc(100vh - 60px);
     max-width: 100vw;
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
 }

 #bottombar {
     margin: 10px;
 }

 .canvas-wrapper {
     width: 100%;
     height: 100%;
     background-color: #333;
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
     max-width: 100vw;
 }

 :global(.splitpanes__pane) {
     box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
     justify-content: center;
     align-items: center;
     display: flex;
     position: relative;
 }
</style>
