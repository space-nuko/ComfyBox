<script lang="ts">
 import { ListIcon as List, ImageIcon as Image, SettingsIcon as Settings } from "svelte-feather-icons";
 import { onMount } from "svelte";
 import { get, writable, type Writable } from "svelte/store";
 import { Pane, Splitpanes } from 'svelte-splitpanes';
 import { Button } from "@gradio/button";
 import { BlockTitle } from "@gradio/atoms";
 import ComfyUIPane from "./ComfyUIPane.svelte";
 import ComfyApp, { type A1111PromptAndInfo, type SerializedAppState } from "./ComfyApp";
 import { Checkbox, TextBox } from "@gradio/form"
 import uiState from "$lib/stores/uiState";
 import layoutState from "$lib/stores/layoutState";
 import selectionState from "$lib/stores/selectionState";
 import { ImageViewer } from "$lib/ImageViewer";
 import { SvelteToast, toast } from '@zerodevx/svelte-toast'

 import { LGraph } from "@litegraph-ts/core";
 import LightboxModal from "./LightboxModal.svelte";
 import ComfyQueue from "./ComfyQueue.svelte";
 import ComfyProperties from "./ComfyProperties.svelte";
 import Sidebar from "./Sidebar.svelte";
 import SidebarItem from "./SidebarItem.svelte";
 import queueState from "$lib/stores/queueState";
 import ComfyUnlockUIButton from "./ComfyUnlockUIButton.svelte";
 import ComfyGraphView from "./ComfyGraphView.svelte";
 import { download, jsonToJsObject } from "$lib/utils";
 import notify from "$lib/notify";
 import Modal from "./Modal.svelte";
 import ComfyBoxStdPrompt from "$lib/ComfyBoxStdPrompt";
 import A1111PromptDisplay from "./A1111PromptDisplay.svelte";
 import type { A1111ParsedInfotext } from "$lib/parseA1111";
	import { TabItem, Tabs } from "@gradio/tabs";

 export let app: ComfyApp = undefined;
 let alreadySetup: Writable<boolean> = writable(false);
 let a1111Prompt: Writable<A1111PromptAndInfo | null> = writable(null);
 let mainElem: HTMLDivElement;
 let props: ComfyProperties = undefined;
 let containerElem: HTMLDivElement;
 let resizeTimeout: NodeJS.Timeout | null;
 let hasShownUIHelpToast: boolean = false;
 let uiTheme: string = "gradio-dark";
 let fileInput: HTMLInputElement = undefined;

 let debugLayout: boolean = false;

 const toastOptions = {
     intro: { duration: 200 },
     theme: {
         '--toastBarHeight': 0
     }
 }

 $: if(app) {
     alreadySetup = app.alreadySetup;
     a1111Prompt = app.a1111Prompt;
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
         $selectionState.currentSelectionNodes = []
     }
 }

 $: if ($uiState.uiEditMode)
     $selectionState.currentSelection = []

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

 let propsSidebarSize = 0;

 function toggleProps() {
     if (propsSidebarSize == 0) {
         propsSidebarSize = 15;
         app.resizeCanvas();
     }
     else {
         propsSidebarSize = 0;
     }
 }

 let queueSidebarSize = 20;

 function toggleQueue() {
     if (queueSidebarSize == 0) {
         queueSidebarSize = 20;
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

     // await import('../../scss/ux.scss');

     refreshView();
 })

 async function doRefreshCombos() {
     await app.refreshComboInNodes(true)
 }

 $: if (uiTheme === "gradio-dark") {
     document.getElementById("app-root").classList.add("dark")
 }
 else {
     document.getElementById("app-root").classList.remove("dark")
 }

 let showModal: boolean = false;

 $: showModal = $a1111Prompt != null

 let selectedTab
</script>

<svelte:head>
    {#if uiTheme === "anapnoe"}
        <link rel="stylesheet" href="/src/scss/ux.scss">
    {/if}
</svelte:head>

<Modal bind:showModal on:close={() => ($a1111Prompt = null)}>
    <div slot="header" class="prompt-modal-header">
        <h1 style="padding-bottom: 1rem;">A1111 Prompt Details</h1>
    </div>
    <A1111PromptDisplay prompt={$a1111Prompt} />
    <div slot="buttons" let:closeDialog>
        <Button variant="secondary" on:click={closeDialog}>
            Close
        </Button>
    </div>
</Modal>

<div id="main" class:dark={uiTheme === "gradio-dark"}>
    <div id="container" bind:this={containerElem}>
        <Sidebar selected="generate">
            <SidebarItem id="generate" name="Generate" icon={Image}>
                <div id="comfy-content">
                    <Splitpanes theme="comfy" on:resize={refreshView}>
                        <Pane bind:size={propsSidebarSize}>
                            <div class="sidebar-wrapper pane-wrapper">
                                <ComfyProperties bind:this={props} />
                            </div>
                        </Pane>
                        <Pane>
                            <Splitpanes theme="comfy" on:resize={refreshView} horizontal="{true}">
                                <Pane>
                                    <ComfyUIPane {app} />
                                </Pane>
                                <Pane bind:size={graphSize}>
                                    <ComfyGraphView {app} transitioning={graphTransitioning} />
                                </Pane>
                            </Splitpanes>
                        </Pane>
                        <Pane bind:size={queueSidebarSize}>
                            <div class="sidebar-wrapper pane-wrapper">
                                <ComfyQueue {app} />
                            </div>
                        </Pane>
                    </Splitpanes>
                    <div id="workflow-tabs">
                        <div class="workflow-tab selected">
                            txt2img
                            <!-- <Image /> -->
                        </div>
                        <div class="workflow-tab">
                            img2img
                            <!-- <Image /> -->
                        </div>
                        <div class="workflow-tab">
                            asdflkj
                            <!-- <Image /> -->
                        </div>
                        <div class="workflow-tab">
                            asdkajw
                            <!-- <Image /> -->
                        </div>
                    </div>
                    <div id="bottombar">
                        <div class="bottombar-content">
                            <div class="left">
                                {#if $layoutState.attrs.queuePromptButtonName != ""}
                                    <Button variant="primary" disabled={!$alreadySetup} on:click={queuePrompt}>
                                        {$layoutState.attrs.queuePromptButtonName}
                                    </Button>
                                {/if}
                                <Button variant="secondary" disabled={!$alreadySetup} on:click={toggleGraph}>
                                    Toggle Graph
                                </Button>
                                <Button variant="secondary" disabled={!$alreadySetup} on:click={toggleProps}>
                                    Toggle Props
                                </Button>
                                <Button variant="secondary" disabled={!$alreadySetup} on:click={toggleQueue}>
                                    Toggle Queue
                                </Button>
                                <Button variant="secondary" disabled={!$alreadySetup} on:click={doSave}>
                                    Save
                                </Button>
                                <Button variant="secondary" disabled={!$alreadySetup} on:click={doSaveLocal}>
                                    Save Local
                                </Button>
                                <Button variant="secondary" disabled={!$alreadySetup} on:click={doLoad}>
                                    Load
                                </Button>
                                <Button variant="secondary" disabled={!$alreadySetup} on:click={doClear}>
                                    Clear
                                </Button>
                                <Button variant="secondary" disabled={!$alreadySetup} on:click={doLoadDefault}>
                                    Load Default
                                </Button>
                                <Button variant="secondary" disabled={!$alreadySetup} on:click={doRefreshCombos}>
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
                                        <option value="gradio-dark">Gradio Dark</option>
                                        <option value="gradio-light">Gradio Light</option>
                                        <option value="anapnoe">Anapnoe</option>
                                    </select>
                                </span>
                            </div>
                            <div class="right">
                                <ComfyUnlockUIButton bind:toggled={$uiState.uiUnlocked} />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarItem>
            <SidebarItem id="settings" name="Settings" icon={Settings}>
            </SidebarItem>
        </Sidebar>
    </div>
    <LightboxModal />
    <input bind:this={fileInput} id="comfy-file-input" type="file" accept=".json" on:change={loadWorkflow} />
</div>
<SvelteToast options={toastOptions} />

<style lang="scss">
 $top-bar-height: 3.5rem;
 $workflow-tabs-height: 2.5rem;
 $bottom-bar-height: 5rem;

 #container {
     height: 100vh;
     max-width: 100vw;
     display: relative;
     width: 100%;
 }

 #comfy-content {
     grid-area: content;
     height: calc(100vh - $bottom-bar-height - $workflow-tabs-height);
 }

 #workflow-tabs {
     display: flex;
     padding-right: 1em;
     margin-top: auto;
     overflow-x: auto;
 }
 /*
    #topbar {
    background: var(--neutral-900);
    height: 100%;
    flex-direction: column;
    float: left;
    position: sticky;
    top: 0px;
    padding: 0;
    width: 4rem;

    .topbar-button {
    background: var(--neutral-800);
    color: var(--neutral-500);
    padding: 0.5rem;
    border-right: 3px solid transparent;

    display: flex;
    flex-direction: column;
    justify-content: center;

    &:last-child {
    border-right: 1px solid var(--neutral-600);
    }

    &:hover {
    background: var(--neutral-700);
    color: var(--neutral-300);
    }

    &.selected {
    background: var(--neutral-700);
    color: var(--neutral-300);
    border-right-color: var(--primary-500);
    }
    }
    } */

 #workflow-tabs {
     background: var(--neutral-800);
     .workflow-tab {
         background: var(--neutral-800);
         color: var(--neutral-500);
         padding: 0.5rem 1rem;
         border-top: 3px solid transparent;
         border-left: 1px solid var(--neutral-600);

         display: flex;
         flex-direction: column;
         justify-content: center;

         &:last-child {
             border-right: 1px solid var(--neutral-600);
         }

         &:hover {
             background: var(--neutral-700);
             color: var(--neutral-300);
         }

         &.selected {
             background: var(--neutral-700);
             color: var(--neutral-300);
             border-top-color: var(--primary-500);
         }
     }
 }

 #bottombar {
     background: var(--neutral-900);
     border-left: 2px solid var(--neutral-700);
     display: flex;
     width: 100%;
     gap: var(--layout-gap);
     overflow-x: hidden;
     flex-wrap: nowrap;
     height: $bottom-bar-height;

     > .bottombar-content {
         display: flex;
         flex-wrap: nowrap;
         width: 100%;
         overflow-x: auto;
         margin: auto 0;
         padding-left: 1rem;

         > .left {
             flex-shrink: 0;
         }

         > .right {
             margin-left: auto;
             margin-right: 1rem;
             padding-left: 1rem;
         }
     }
 }

 .sidebar-wrapper {
     width: 100%;
     height: 100%;
 }

 :global(html, body) {
     width: 100%;
     height: 100%;
     margin: 0px;
     font-family: Arial;
 }

 :global(.splitpanes.comfy>.splitpanes__splitter) {
     background: var(--comfy-splitpanes-background-fill);

     &:hover:not([disabled]) {
         background: var(--comfy-splitpanes-background-fill-hover);
     }
     &:active:not([disabled]) {
         background: var(--comfy-splitpanes-background-fill-active);
     }
 }

 $splitter-size: 1rem;

 :global(.splitpanes.comfy.splitpanes--horizontal>.splitpanes__splitter) {
     min-height: $splitter-size;
     cursor: row-resize;
 }

 :global(.splitpanes.comfy.splitpanes--vertical>.splitpanes__splitter) {
     min-width: $splitter-size;
     cursor: col-resize;
 }

 :global(.splitpanes.comfy) {
     max-height: calc(100vh - $bottom-bar-height);
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
