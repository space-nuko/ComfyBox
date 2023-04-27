<script lang="ts">
 import { onMount } from "svelte";
 import { get } from "svelte/store";
 import { Pane, Splitpanes } from 'svelte-splitpanes';
 import { Button } from "@gradio/button";
 import ComfyUIPane from "./ComfyUIPane.svelte";
 import ComfyApp, { type SerializedAppState } from "./ComfyApp";
 import { Checkbox } from "@gradio/form"
 import widgetState from "$lib/stores/widgetState";
 import nodeState from "$lib/stores/nodeState";
 import uiState from "$lib/stores/uiState";
 import { ImageViewer } from "$lib/ImageViewer";
 import { download } from "$lib/utils"

 import { LGraph, LGraphNode } from "@litegraph-ts/core";
	import LightboxModal from "./LightboxModal.svelte";
	import { Block } from "@gradio/atoms";
	import ComfyQueue from "./ComfyQueue.svelte";
	import type { ComfyAPIStatus } from "$lib/api";
	import queueState from "$lib/stores/queueState";

 let app: ComfyApp = undefined;
 let imageViewer: ImageViewer;
 let uiPane: ComfyUIPane = undefined;
 let queue: ComfyQueue = undefined;
 let mainElem: HTMLDivElement;
 let containerElem: HTMLDivElement;
 let resizeTimeout: typeof Timer = -1;

 function refreshView(event?: Event) {
     clearTimeout(resizeTimeout);
     resizeTimeout = setTimeout(app.resizeCanvas.bind(app), 250);
 }

 function queuePrompt() {
     console.log("Queuing!");
     app.queuePrompt(0, 1);
 }

 $: if (app) app.lCanvas.allow_dragnodes = !$uiState.nodesLocked;
 $: if (app) app.lCanvas.allow_interaction = !$uiState.graphLocked;

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

 function serializeAppState(): SerializedAppState {
     const graph = app.lGraph;

     const serializedGraph = graph.serialize()
     const serializedPaneOrder = uiPane.serialize()

     return {
         createdBy: "ComfyBox",
         version: 1,
         workflow: serializedGraph,
         panes: serializedPaneOrder
     }
 }

 function doAutosave(graph: LGraph): void {
     const savedWorkflow = serializeAppState();
     localStorage.setItem("workflow", JSON.stringify(savedWorkflow))
 }

 function doRestore(workflow: SerializedAppState) {
     uiPane.restore(workflow.panes);
 }

 function doSave(): void {
     if (!app?.lGraph)
         return;

     const date = new Date();
     const formattedDate = date.toISOString().replace(/:/g, '-').replace(/\.\d{3}/g, '').replace('T', '_').replace("Z", "");

     download(`workflow-${formattedDate}.json`, JSON.stringify(serializeAppState()), "application/json")
 }

 onMount(async () => {
     app = new ComfyApp();

// TODO dedup
     app.eventBus.on("nodeAdded", nodeState.nodeAdded);
     app.eventBus.on("nodeRemoved", nodeState.nodeRemoved);
     app.eventBus.on("configured", nodeState.configureFinished);
     app.eventBus.on("cleared", nodeState.clear);

     app.eventBus.on("nodeAdded", widgetState.nodeAdded);
     app.eventBus.on("nodeRemoved", widgetState.nodeRemoved);
     app.eventBus.on("configured", widgetState.configureFinished);
     app.eventBus.on("cleared", widgetState.clear);
     app.eventBus.on("autosave", doAutosave);
     app.eventBus.on("restored", doRestore);

     app.api.addEventListener("status", (ev: CustomEvent) => {
         queueState.statusUpdated(ev.detail as ComfyAPIStatus);
     });

     await app.setup();
     refreshView();

     (window as any).app = app;
     (window as any).appPane = uiPane;

     imageViewer = new ImageViewer(app.rootEl);

     let wrappers = containerElem.querySelectorAll<HTMLDivElement>(".pane-wrapper")
     for (const wrapper of wrappers) {
         const paneNode = wrapper.parentNode as HTMLElement; // get the node inside the <Pane/>
         paneNode.ontransitionend = () => {
             app.resizeCanvas()
         }
     }
 })
</script>

<div id="main" bind:this={mainElem}>
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
                    <ComfyQueue bind:this={queue} />
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
        <Button variant="secondary" on:click={doSave}>
            Save
        </Button>
        <Checkbox label="Lock Nodes" bind:value={$uiState.nodesLocked}/>
        <Checkbox label="Disable Interaction" bind:value={$uiState.graphLocked}/>
        <Checkbox label="Enable UI Editing" bind:value={$uiState.unlocked}/>
    </div>
    <LightboxModal />
</div>

<style lang="scss">
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
     display: flex;
     flex-wrap: wrap;
     gap: var(--layout-gap);
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
