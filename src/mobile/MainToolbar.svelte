<script lang="ts">
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import queueState from "$lib/stores/queueState";
 import workflowState, { ComfyBoxWorkflow } from "$lib/stores/workflowState";
 import { getNodeInfo, vibrateIfPossible } from "$lib/utils"
 import { LayoutTextSidebarReverse, Image, Grid } from "svelte-bootstrap-icons";

 import { Link, Toolbar } from "framework7-svelte"
 import ProgressBar from "$lib/components/ProgressBar.svelte";
 import Progressbar from "$lib/components/f7/progressbar.svelte";
 import Indicator from "./Indicator.svelte";
 import interfaceState from "$lib/stores/interfaceState";
 import type { WritableLayoutStateStore } from "$lib/stores/layoutStates";

 export let subworkflowID: number = -1;
 export let app: ComfyApp = undefined;
 let layoutState: WritableLayoutStateStore = null;
 let fileInput: HTMLInputElement = undefined;
 let workflow: ComfyBoxWorkflow | null = null;

 $: workflow = $workflowState.activeWorkflow;

 function queuePrompt() {
     vibrateIfPossible(20)
     app.runDefaultQueueAction()
 }

 async function refreshCombos() {
     vibrateIfPossible(20)
     await app.refreshComboInNodes()
 }

 function doSave(): void {
     if (!fileInput)
         return;

     vibrateIfPossible(20)
     app.querySave()
 }

 function doLoad(): void {
     if (!fileInput)
         return;

     vibrateIfPossible(20)
     fileInput.value = null;
     fileInput.click();
 }

 function loadWorkflow(): void {
     app.handleFile(fileInput.files[0]);
}

 function doSaveLocal(): void {
     vibrateIfPossible(20)
     app.saveStateToLocalStorage();
 }

 let queued: false;
 $: queued = Boolean($queueState.runningNodeID || $queueState.progress)

 let running = false;
 $: running = typeof $queueState.queueRemaining === "number" && $queueState.queueRemaining > 0;

 let progress;
 $: progress = $queueState.progress

 let progressPercent = 0
 let progressText = ""
 $: if (progress) {
     progressPercent = (progress.value / progress.max) * 100;
     progressText = progressPercent.toFixed(1) + "%";
 } else {
     progressPercent = 0
     progressText = "??.?%"
 }

 let centerHref = "/workflows/"
 $: if ($interfaceState.selectedWorkflowIndex && !$interfaceState.showingWorkflow) {
     centerHref = `/workflows/${$interfaceState.selectedWorkflowIndex}/`
 }
 else {
     centerHref = "/workflows/";
 }

 let toolbarCount = 0;
 $: toolbarCount = $interfaceState.showingWorkflow ? 2 : 1;

 const ICON_SIZE = "1.5rem";

 let selectedTab = 1;
</script>

<div class="bottom" style:--toolbarCount={toolbarCount}>
    <div class="bars">
        {#if queued}
            <div class="node-name">
                <span>Node: {getNodeInfo($queueState.runningNodeID)} ({progressText})</span>
            </div>
        {/if}
    </div>
    <div class="wrapper">
        {#if queued}
            {#if progress}
                <Progressbar color="blue" progress={progressPercent} />
            {:else if running}
                <Progressbar color="blue" infinite />
            {/if}
        {/if}
    </div>
</div>
<Toolbar bottom tabbar color="blue" class={toolbarCount > 1 ? "hasGenToolbar" : ""}>
    <Link transition="f7-dive" href="/queue/" tabLinkActive={$interfaceState.selectedTab === 0}>
        <LayoutTextSidebarReverse width={ICON_SIZE} height={ICON_SIZE} />
    </Link>
    <Link transition="f7-dive" href={centerHref} tabLinkActive={$interfaceState.selectedTab === 1}>
        <Image width={ICON_SIZE} height={ICON_SIZE} />
    </Link>
    <Link transition="f7-dive" href="/gallery/" tabLinkActive={$interfaceState.selectedTab === 2}>
        <Grid width={ICON_SIZE} height={ICON_SIZE} />
    </Link>
</Toolbar>
{#if $interfaceState.showIndicator}
    <Indicator value={$interfaceState.indicatorValue} />
{/if}

<style lang="scss">
 #comfy-file-input {
     display: none;
 }

 :global(.progressbar.color-blue) {
     background: var(--neutral-400) !important;
 }

 :global(.dark .progressbar.color-blue) {
     background: var(--neutral-500) !important;
 }

 :global(.dark .toolbar.color-blue) {
     background: var(--neutral-800) !important;
 }

 :global(.dark .toolbar.color-blue.hasGenToolbar) {
     border-top: 2px solid var(--neutral-600);
 }

 :global(.dark .tab-link-active) {
     --f7-tabbar-link-active-color: var(--secondary-500);
     --f7-tabbar-link-active-bg-color: #283547;
 }

 .bottom {
     --toolbarCount: 1;
     position: absolute;
     text-align: center;
     width: 100%;
     font-size: 13pt;
     bottom: calc(var(--f7-toolbar-height) * var(--toolbarCount));
     z-index: var(--layer-top);
 }

 .bars {
     display: flex;
     flex-direction: row;

     .bars {
         display: flex;
         flex-direction: row;
     }

     .node-name {
         flex-grow: 1;
         background-color: var(--comfy-node-name-background);
         color: var(--comfy-node-name-foreground);
         padding: 0.2em;
         display: flex;
         justify-content: center;
         align-items: center;
     }

     .progress-bar {
         flex-grow: 10;
         background-color: var(--color-red-300);
         display: flex;
         justify-content: center;
         align-items: center;
     }

     .queue-remaining {
         flex-grow: 1;
         padding: 0.2em;
         &.in-progress {
             background-color: var(--secondary-300);
         }
     }
 }
</style>
