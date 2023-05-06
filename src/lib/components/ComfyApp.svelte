<script lang="ts">
 import { onMount } from "svelte";
 import { get } from "svelte/store";
 import { Pane, Splitpanes } from 'svelte-splitpanes';
 import { Button } from "@gradio/button";
 import { BlockTitle } from "@gradio/atoms";
 import ComfyUIPane from "./ComfyUIPane.svelte";
 import ComfyApp, { type SerializedAppState } from "./ComfyApp";
 import { Checkbox, TextBox } from "@gradio/form"
 import uiState from "$lib/stores/uiState";
 import layoutState from "$lib/stores/layoutState";
 import { ImageViewer } from "$lib/ImageViewer";
 import type { ComfyAPIStatus } from "$lib/api";
 import { SvelteToast, toast } from '@zerodevx/svelte-toast'
 import defaultGraph from "$lib/defaultGraph"

 import { LGraph } from "@litegraph-ts/core";
 import LightboxModal from "./LightboxModal.svelte";
 import ComfyQueue from "./ComfyQueue.svelte";
 import ComfyProperties from "./ComfyProperties.svelte";
 import queueState from "$lib/stores/queueState";

 export let app: ComfyApp = undefined;
 let imageViewer: ImageViewer;
 let queue: ComfyQueue = undefined;
 let mainElem: HTMLDivElement;
 let uiPane: ComfyUIPane = undefined;
 let props: ComfyProperties = undefined;
 let containerElem: HTMLDivElement;
 let resizeTimeout: NodeJS.Timeout | null;
 let hasShownUIHelpToast: boolean = false;
 let uiTheme: string = "";

 let debugLayout: boolean = false;

 const toastOptions = {
     intro: { duration: 200 },
     theme: {
         '--toastBarHeight': 0
     }
 }

 function refreshView(event?: Event) {
     clearTimeout(resizeTimeout);
     resizeTimeout = setTimeout(app.resizeCanvas.bind(app), 250);
 }

 function queuePrompt() {
     console.log("Queuing!");
     app.queuePrompt(0, 1);
 }

 $: if (app?.lCanvas) app.lCanvas.allow_dragnodes = !$uiState.nodesLocked;
 $: if (app?.lCanvas) app.lCanvas.allow_interaction = !$uiState.graphLocked;

 $: if ($uiState.uiEditMode)
     $layoutState.currentSelection = []

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

 let propsSidebarSize = 15;

 function toggleProps() {
     if (propsSidebarSize == 0) {
         propsSidebarSize = 15;
         app.resizeCanvas();
     }
     else {
         propsSidebarSize = 0;
     }
 }

 let queueSidebarSize = 15;

 function toggleQueue() {
     if (queueSidebarSize == 0) {
         queueSidebarSize = 15;
         app.resizeCanvas();
     }
     else {
         queueSidebarSize = 0;
     }
 }

 function doSave(): void {
     if (!app?.lGraph)
         return;

     app.saveStateToLocalStorage();
     toast.push("Saved to local storage.")
     //
     //      const date = new Date();
     //      const formattedDate = date.toISOString().replace(/:/g, '-').replace(/\.\d{3}/g, '').replace('T', '_').replace("Z", "");
     //
     //      download(`workflow-${formattedDate}.json`, JSON.stringify(app.serialize()), "application/json")
 }

 function doReset(): void {
     var confirmed = confirm("Are you sure you want to clear the current workflow?");
     if (confirmed) {
         app.reset();
     }
 }

 async function doLoadDefault(): void {
     var confirmed = confirm("Are you sure you want to clear the current workflow and load the default graph?");
     if (confirmed) {
         await app.deserialize(defaultGraph)
     }
 }

 function doRecenter(): void {
     app.lCanvas.recenter();
 }

 $: if ($uiState.uiEditMode !== "disabled" && !hasShownUIHelpToast) {
     hasShownUIHelpToast = true;
     toast.push("Right-click to open context menu.")
 }

 if (debugLayout) {
     layoutState.subscribe(s => {
         console.warn("UPDATESTATE", s)
     })
 }

 app.api.addEventListener("status", (ev: CustomEvent) => {
     queueState.statusUpdated(ev.detail as ComfyAPIStatus);
 });

 $: if (app.rootEl && !imageViewer) {
     imageViewer = new ImageViewer(app.rootEl);
 }

 $: if (containerElem) {
     let wrappers = containerElem.querySelectorAll<HTMLDivElement>(".pane-wrapper")
     for (const wrapper of wrappers) {
         const paneNode = wrapper.parentNode as HTMLElement; // get the node inside the <Pane/>
         paneNode.ontransitionend = () => {
             app.resizeCanvas()
         }
     }
 }

 onMount(async () => {
     await app.setup();
     (window as any).app = app;
     (window as any).appPane = uiPane;

     refreshView();
 })

 async function doRefreshCombos() {
     await app.refreshComboInNodes()
 }
</script>

<svelte:head>
    {#if uiTheme === "anapnoe"}
        <link rel="stylesheet" href="/src/scss/ux.scss">
    {/if}
</svelte:head>

<div id="main">
    <div id="dropzone" class="dropzone"></div>
    <div id="container" bind:this={containerElem}>
        <Splitpanes theme="comfy" on:resize={refreshView}>
            <Pane bind:size={propsSidebarSize}>
                <div class="sidebar-wrapper pane-wrapper">
                    <ComfyProperties bind:this={props} />
                </div>
            </Pane>
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
            <Pane bind:size={queueSidebarSize}>
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
        <Button variant="secondary" on:click={toggleProps}>
            Toggle Props
        </Button>
        <Button variant="secondary" on:click={toggleQueue}>
            Toggle Queue
        </Button>
        <Button variant="secondary" on:click={doSave}>
            Save
        </Button>
        <Button variant="secondary" on:click={doReset}>
            Reset
        </Button>
        <Button variant="secondary" on:click={doLoadDefault}>
            Load Default
        </Button>
        <Button variant="secondary" on:click={doRecenter}>
            Recenter
        </Button>
        <Button variant="secondary" on:click={doRefreshCombos}>
            🔄
        </Button>
        <!-- <Checkbox label="Lock Nodes" bind:value={$uiState.nodesLocked}/>
             <Checkbox label="Disable Interaction" bind:value={$uiState.graphLocked}/> -->
        <Checkbox label="Auto-Add UI" bind:value={$uiState.autoAddUI}/>
        <label class="label" for="enable-ui-editing">
            <BlockTitle>Enable UI Editing</BlockTitle>
            <select id="enable-ui-editing" name="enable-ui-editing" bind:value={$uiState.uiEditMode}>
                <option value="disabled">Disabled</option>
                <option value="widgets">Widgets</option>
            </select>
        </label>
        <label class="label" for="ui-theme">
            <BlockTitle>Theme</BlockTitle>
            <select id="ui-theme" name="ui-theme" bind:value={uiTheme}>
                <option value="">None</option>
                <option value="anapnoe">Anapnoe</option>
            </select>
        </label>
    </div>
    <LightboxModal />
</div>

<SvelteToast options={toastOptions} />

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

 label.label > :global(span) {
     top: 20%;
 }
</style>
