<script lang="ts">
 import { Pane, Splitpanes } from 'svelte-splitpanes';
 import { PlusSquareIcon as PlusSquare } from 'svelte-feather-icons';
 import { Button } from "@gradio/button";
 import { BlockTitle } from "@gradio/atoms";
 import ComfyWorkflowView from "./ComfyWorkflowView.svelte";
 import { Checkbox, TextBox } from "@gradio/form"
 import ComfyQueue from "./ComfyQueue.svelte";
 import ComfyUnlockUIButton from "./ComfyUnlockUIButton.svelte";
 import ComfyGraphView from "./ComfyGraphView.svelte";
 import { get, writable, type Writable } from "svelte/store";
 import ComfyProperties from "./ComfyProperties.svelte";
 import uiState from "$lib/stores/uiState";
 import workflowState, { ComfyWorkflow } from "$lib/stores/workflowState";
 import selectionState from "$lib/stores/selectionState";
 import type ComfyApp from './ComfyApp';
 import { onMount } from "svelte";
 import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';
 import { fade } from 'svelte/transition';
 import { cubicIn } from 'svelte/easing';
	import { truncateString } from '$lib/utils';

 export let app: ComfyApp;
 export let uiTheme: string = "gradio-dark" // TODO config

 let workflow: ComfyWorkflow | null = null;
 let openedWorkflows = []

 let containerElem: HTMLDivElement;
 let resizeTimeout: NodeJS.Timeout | null;
 let alreadySetup: Writable<boolean> = writable(false);
 let fileInput: HTMLInputElement = undefined;
 let loading = true;

 let appSetupPromise: Promise<void> = null;

 $: workflow = $workflowState.activeWorkflow;
 $: openedWorkflows = $workflowState.openedWorkflows.map(w => { return { id: w.id } })

 onMount(async () => {
     appSetupPromise = app.setup().then(() => {
         loading = false;
         refreshView();
     }
     );
     refreshView();
 })

 $: if (app) {
     alreadySetup = app.alreadySetup;
 }

 async function doRefreshCombos() {
     await app.refreshComboInNodes(undefined, true)
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
     app.querySave()
 }

 function doLoad(): void {
     if (!fileInput)
         return;

     fileInput.click();
 }

 function loadWorkflow(): void {
     app.handleFile(fileInput.files[0]);
     fileInput.files = null;
 }

 function doSaveLocal(): void {
     app.saveStateToLocalStorage();
 }

 async function doLoadDefault() {
     var confirmed = confirm("Would you like to load the default workflow in a new tab?");
     if (confirmed) {
         await app.initDefaultWorkflow();
     }
 }

 function createNewWorkflow() {
     app.createNewWorkflow();
 }

 function closeWorkflow(event: Event, workflow: ComfyWorkflow) {
     event.preventDefault();
     event.stopImmediatePropagation()

     if (workflow.isModified) {
         if (!confirm("This workflow has unsaved changes. Are you sure you want to close it?"))
             return;
     }

     app.closeWorkflow(workflow.id);
 }

 function handleConsider(evt: any) {
     console.warn(openedWorkflows.length, openedWorkflows, evt.detail.items.length, evt.detail.items)
     openedWorkflows = evt.detail.items;
     // openedWorkflows = evt.detail.items.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID);
     // workflowState.update(s => {
     //     s.openedWorkflows = openedWorkflows.map(w => workflowState.getWorkflow(w.id));
     //     return s;
     // })
 };

 function handleFinalize(evt: any) {
     openedWorkflows = evt.detail.items;
     workflowState.update(s => {
         s.openedWorkflows = openedWorkflows.filter(w => w.id !== SHADOW_PLACEHOLDER_ITEM_ID).map(w => workflowState.getWorkflow(w.id));
         return s;
     })
 };
</script>

<div id="comfy-content" bind:this={containerElem} class:loading>
    <Splitpanes theme="comfy" on:resize={refreshView}>
        <Pane bind:size={propsSidebarSize}>
            <div class="sidebar-wrapper pane-wrapper">
                <ComfyProperties workflow={$workflowState.activeWorkflow} />
            </div>
        </Pane>
        <Pane>
            <Splitpanes theme="comfy" on:resize={refreshView} horizontal="{true}">
                <Pane>
                    {#if $workflowState.activeWorkflow != null}
                        <ComfyWorkflowView {app} workflow={$workflowState.activeWorkflow} />
                    {:else}
                        <span style:color="var(--body-text-color)">No workflow loaded</span>
                    {/if}
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
        <div class="workflow-tab-items"
             use:dndzone="{{
                  items: openedWorkflows,
                  flipDurationMs: 200,
                  type: "workflow-tab",
                  morphDisabled: true,
                  dropFromOthersDisabled: true,
                  dropTargetStyle: {outline: "none"},
                          }}"
             on:consider={handleConsider}
             on:finalize={handleFinalize}>
            {#each openedWorkflows.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item(item.id)}
                {@const workflow = workflowState.getWorkflow(item.id)}
                <button class="workflow-tab"
                        class:selected={item.id === $workflowState.activeWorkflowID}
                        on:click={() => app.setActiveWorkflow(item.id)}>
                    <span class="workflow-tab-title">
                        {truncateString(workflow.attrs.title, 32)}
                        {#if workflow.isModified}
                            *
                        {/if}
                    </span>
                    <button class="workflow-close-button"
                            on:click={(e) => closeWorkflow(e, workflow)}>
                        ✕
                    </button>
                    {#if workflow[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                        <div in:fade={{duration:200, easing: cubicIn}} class='drag-item-shadow'/>
                    {/if}
                </button>
            {/each}
        </div>
        <button class="workflow-add-new-button"
                on:click={createNewWorkflow}>
            <PlusSquare size="100%" strokeWidth={1.5} />
        </button>
    </div>
    <div id="bottombar">
        <div class="bottombar-content">
            <div class="left">
                {#if workflow != null && workflow.attrs.queuePromptButtonName != ""}
                    <Button variant="primary" disabled={!$alreadySetup} on:click={queuePrompt}>
                        {workflow.attrs.queuePromptButtonName}
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
<input bind:this={fileInput} id="comfy-file-input" type="file" accept="application/json,image/png" on:change={loadWorkflow} />

{#if appSetupPromise}
    {#await appSetupPromise}
        <div class="comfy-app-loading">
            <span>Loading...</span>
        </div>
    {:catch error}
        <div class="comfy-loading-error">
            <div>
                Error loading app
            </div>
            <div>{error}</div>
            {#if error.stack}
                {@const lines = error.stack.split("\n")}
                {#each lines as line}
                    <div style:font-size="16px">{line}</div>
                {/each}
            {/if}
        </div>
    {/await}
{/if}

<style lang="scss">
 $top-bar-height: 3.5rem;
 $workflow-tabs-height: 2.5rem;
 $bottom-bar-height: 5rem;

 .comfy-app-loading, .comfy-loading-error {
     font-size: 40px;
     color: var(--body-text-color);
     justify-content: center;
     margin: auto;
     width: 100%;
     height: 100%;
     text-align: center;
     flex-direction: column;
     display: flex;
     position: absolute;
     z-index: 100000000;
     background: rgba(0, 0, 0, 0.5);
     pointer-events: none;
     user-select: none;
     top: 0px;
 }

 .comfy-app-loading > span {
     display: flex;
     flex-direction: row;
     justify-content: center;
 }

 #comfy-content {
     grid-area: content;
     height: calc(100vh - $bottom-bar-height - $workflow-tabs-height);

     &.loading {
         pointer-events: none;
         user-select: none;
     }
 }

 #workflow-tabs, .workflow-tab-items {
     display: flex;
     overflow-x: auto;
 }

 #workflow-tabs {
     background: var(--neutral-800);
     padding-right: 1em;
     height: 3rem;
     .workflow-tab {
         background: var(--neutral-800);
         color: var(--neutral-500);
         padding: 0.5rem 1rem;
         border-top: 3px solid var(--neutral-600);
         border-left: 1px solid var(--neutral-600);
         height: 100%;

         display: flex;
         flex-direction: row;
         justify-content: center;
         text-align: center;
         gap: var(--size-4);
         cursor: pointer !important;

         > span {
             margin: auto;
         }

         &:hover:not(:has(.workflow-close-button:hover)) {
             background: var(--neutral-700);
             color: var(--neutral-300);
         }

         &.selected {
             background: var(--neutral-700);
             color: var(--neutral-300);
             border-top-color: var(--primary-500);
             font-weight: bold;
         }

         > .workflow-close-button {
             display:block;
             width: 1.2rem;
             height: 1.2rem;
             font-size: 13px;
             margin: auto;
             border-radius: 50%;
             opacity: 50%;
             background: var(--neutral-500);
             color: var(--neutral-300);

             &:hover {
                 opacity: 100%;
                 color: var(--neutral-100);
             }
         }
     }

     .workflow-add-new-button {
         background: var(--neutral-700);
         color: var(--neutral-400);
         opacity: 50%;
         padding: 0.5rem;
         border-top: 3px solid var(--neutral-600);
         aspect-ratio: 1/1;
         height: 100%;

         display: flex;
         flex-direction: row;
         justify-content: center;
         gap: var(--size-4);

         &:hover {
             filter: brightness(100%);
             opacity: 100%;
             border-top-color: var(--neutral-600);
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

 .drag-item-shadow {
     visibility: visible;
     border: 1px dashed grey;
     background: lightblue;
     opacity: 0.5;
     margin: 0;
 }
</style>
