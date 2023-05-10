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

 import { LGraph } from "@litegraph-ts/core";
 import LightboxModal from "./LightboxModal.svelte";
 import ComfyQueue from "./ComfyQueue.svelte";
 import ComfyProperties from "./ComfyProperties.svelte";
 import queueState from "$lib/stores/queueState";
 import ComfyUnlockUIButton from "./ComfyUnlockUIButton.svelte";
	import ComfyGraphView from "./ComfyGraphView.svelte";
	import { download, jsonToJsObject } from "$lib/utils";
	import notify from "$lib/notify";

 export let app: ComfyApp = undefined;
 let queue: ComfyQueue = undefined;
 let mainElem: HTMLDivElement;
 let uiPane: ComfyUIPane = undefined;
 let props: ComfyProperties = undefined;
 let containerElem: HTMLDivElement;
 let resizeTimeout: NodeJS.Timeout | null;
 let hasShownUIHelpToast: boolean = false;
 let uiTheme: string = "";
 let fileInput: HTMLInputElement = undefined;

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

 $: if (app?.lCanvas) {
     app.lCanvas.allow_dragnodes = $uiState.uiUnlocked;
     app.lCanvas.allow_interaction = $uiState.uiUnlocked;

     if (!$uiState.uiUnlocked) {
         app.lCanvas.deselectAllNodes();
         $layoutState.currentSelectionNodes = []
     }
 }

 $: if ($uiState.uiEditMode)
     $layoutState.currentSelection = []

 let graphSize = 0;
 let graphTransitioning = false;

 function queuePrompt() {
     app.runDefaultQueueAction()
 }

 function toggleGraph() {
     if (graphSize == 0) {
         graphSize = 50;
         app.resizeCanvas();
     }
     else {
         graphSize = 0;
     }
 }

 let propsSidebarSize = 15; //15;

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

     app.querySave()
 }

 function doLoad(): void {
     if (!app?.lGraph || !fileInput)
         return;

     fileInput.click();
 }

 function loadWorkflow(): void {
     app.handleFile(fileInput.files[0]);
     fileInput.files = null;
}

 function doSaveLocal(): void {
     if (!app?.lGraph)
         return;

     app.saveStateToLocalStorage();
 }

 async function doLoadDefault() {
     var confirmed = confirm("Are you sure you want to clear the current workflow and load the default graph?");
     if (confirmed) {
         await app.initDefaultGraph();
     }
 }

 function doClear(): void {
     var confirmed = confirm("Are you sure you want to clear the current workflow?");
     if (confirmed) {
         app.clear();
     }
 }

 $: if ($uiState.uiUnlocked && !hasShownUIHelpToast) {
     hasShownUIHelpToast = true;
     notify("Right-click to open context menu.")
 }

 if (debugLayout) {
     layoutState.subscribe(s => {
         console.warn("UPDATESTATE", s)
     })
 }

 $: if (containerElem) {
     const canvas = containerElem.querySelector<HTMLDivElement>("#graph-canvas")
     if (canvas) {
         const paneNode = canvas.closest(".splitpanes__pane")
         if (paneNode) {
             (paneNode as HTMLElement).ontransitionstart = () => {
                 graphTransitioning = true
             }
             (paneNode as HTMLElement).ontransitionend = () => {
                 graphTransitioning = false
                 app.resizeCanvas()
             }
         }
     }
 }

 onMount(async () => {
     await app.setup();
     (window as any).app = app;
     (window as any).appPane = uiPane;

     // await import('../../scss/ux.scss');

     refreshView();
 })

 async function doRefreshCombos() {
     await app.refreshComboInNodes(true)
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
                        <ComfyGraphView {app} transitioning={graphTransitioning} />
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
        <div class="left">
            {#if $layoutState.attrs.queuePromptButtonName != ""}
                <Button variant="primary" on:click={queuePrompt}>
                    {$layoutState.attrs.queuePromptButtonName}
                </Button>
            {/if}
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
            <Button variant="secondary" on:click={doSaveLocal}>
                Save Local
            </Button>
            <Button variant="secondary" on:click={doLoad}>
                Load
            </Button>
            <Button variant="secondary" on:click={doClear}>
                Clear
            </Button>
            <Button variant="secondary" on:click={doLoadDefault}>
                Load Default
            </Button>
            <Button variant="secondary" on:click={doRefreshCombos}>
                🔄
            </Button>
            <!-- <Checkbox label="Lock Nodes" bind:value={$uiState.nodesLocked}/>
                 <Checkbox label="Disable Interaction" bind:value={$uiState.graphLocked}/> -->
            <span style="display: inline-flex !important">
                <Checkbox label="Auto-Add UI" bind:value={$uiState.autoAddUI}/>
            </span>
            <span class="label" for="ui-edit-mode">
                <BlockTitle>UI Edit mode</BlockTitle>
                <select id="ui-edit-mode" name="ui-edit-mode" bind:value={$uiState.uiEditMode}>
                    <option value="widgets">Widgets</option>
                </select>
            </span>
            <span class="label" for="ui-theme">
                <BlockTitle>Theme</BlockTitle>
                <select id="ui-theme" name="ui-theme" bind:value={uiTheme}>
                    <option value="">None</option>
                    <option value="anapnoe">Anapnoe</option>
                </select>
            </span>
        </div>
        <div class="right">
            <ComfyUnlockUIButton bind:toggled={$uiState.uiUnlocked} />
        </div>
    </div>
    <LightboxModal />
    <input bind:this={fileInput} id="comfy-file-input" type="file" accept=".json" on:change={loadWorkflow} />
</div>

<SvelteToast options={toastOptions} />

<style lang="scss">
 #container {
     height: calc(100vh - 70px);
     max-width: 100vw;
     display: grid;
     width: 100%;
 }

 #comfy-content {
     grid-area: content;
     height: 100vh;
 }

 #bottombar {
     padding-top: 0.5em;
     display: flex;
     width: 100%;
     gap: var(--layout-gap);
     padding-left: 1em;
     padding-right: 1em;
     margin-top: auto;
     overflow-x: auto;
     height: 70px;

     > .left {
         flex-shrink: 0;
     }

     > .right {
         margin-left: auto
     }
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
     max-height: calc(100vh - 70px);
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

 span.left {
     right: 0px;
 }

 #comfy-file-input {
     display: none;
 }
</style>
