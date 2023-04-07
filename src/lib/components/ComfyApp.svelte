<script lang="ts">
 import { onMount } from "svelte";
 import { get } from "svelte/store";
 import { Pane, Splitpanes } from 'svelte-splitpanes';
 import { Button } from "@gradio/button";
 import ComfyUIPane from "./ComfyUIPane.svelte";
 import ComfyApp, { type SerializedAppState } from "./ComfyApp";
 import widgetState from "$lib/stores/widgetState";

 import { LGraph, LGraphNode } from "@litegraph-ts/core";

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

 let sidebarSize = 20;

 function toggleSidebar() {
     if (sidebarSize == 0) {
         sidebarSize = 20;
         app.resizeCanvas();
     }
     else {
         sidebarSize = 0;
     }
 }

 let graphResizeTimer: typeof Timer = -1;

 function doAutosave(graph: LGraph): void {
     // We will merge in the state of the frontend instead of what's inside the
     // LGraph structure.
     const frontendState = get(widgetState);

     const serializedGraph = graph.serialize()
     const serializedPaneOrder = uiPane.serialize()

     const savedWorkflow = {
         graph: serializedGraph,
         panes: serializedPaneOrder
     }

     localStorage.setItem("workflow", JSON.stringify(savedWorkflow))
 }

 function doRestore(workflow: SerializedAppState) {
     uiPane.restore(workflow.panes);
 }

 onMount(async () => {
     app = new ComfyApp();

     app.eventBus.on("nodeAdded", widgetState.nodeAdded);
     app.eventBus.on("nodeRemoved", widgetState.nodeRemoved);
     app.eventBus.on("configured", widgetState.configureFinished);
     app.eventBus.on("cleared", widgetState.clear);
     app.eventBus.on("autosave", doAutosave);
     app.eventBus.on("restored", doRestore);

     await app.setup();
     refreshView();

     (window as any).app = app;
     (window as any).appPane = uiPane;

     let wrappers = containerElem.querySelectorAll<HTMLDivNode>(".pane-wrapper")
     for (const wrapper of wrappers) {
         const paneNode = wrapper.parentNode; // get the node inside the <Pane/>
         paneNode.ontransitionend = () => {
             app.resizeCanvas()
         }
     }
 })
</script>

<div id="dropzone" class="dropzone"></div>
<div id="container" bind:this={containerElem}>
    <Splitpanes theme="comfy" on:resize={refreshView}>
        <Pane>
            <Splitpanes theme="comfy" on:resize={refreshView} horizontal="{true}">
                <Pane>
                    <ComfyUIPane bind:this={uiPane} {app} />
                </Pane>
                <Pane bind:size={graphSize}>
                    <div class="canvas-wrapper pane-wrapper">
                        <canvas id="graph-canvas" />
                    </div>
                </Pane>
            </Splitpanes>
        </Pane>
        <Pane bind:size={sidebarSize}>
            <div class="sidebar-wrapper pane-wrapper">
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
        Toggle Graph
    </Button>
    <Button variant="secondary" on:click={toggleSidebar}>
        Toggle Sidebar
    </Button>
</div>

<style lang="scss">
 @import '../../scss/shared.scss';

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

 .sidebar-wrapper {
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

 :global(.splitpanes.comfy>.splitpanes__splitter) {
     background-color: var(--secondary-100);

     &:hover:not([disabled]) {
         background-color: var(--secondary-300);
     }
     &:active:not([disabled]) {
         background-color: var(--secondary-400);
     }
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
