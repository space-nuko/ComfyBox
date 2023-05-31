<script lang="ts">
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import queueState from "$lib/stores/queueState";
 import workflowState, { ComfyBoxWorkflow } from "$lib/stores/workflowState";
 import { getNodeInfo } from "$lib/utils"
 import { Image, LayoutTextSidebarReverse } from "svelte-bootstrap-icons";

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
     navigator.vibrate(20)
     app.runDefaultQueueAction()
 }

 async function refreshCombos() {
     navigator.vibrate(20)
     await app.refreshComboInNodes()
 }

 function doSave(): void {
     if (!fileInput)
         return;

     navigator.vibrate(20)
     app.querySave()
 }

 function doLoad(): void {
     if (!fileInput)
         return;

     navigator.vibrate(20)
     fileInput.value = null;
     fileInput.click();
 }

 function loadWorkflow(): void {
     app.handleFile(fileInput.files[0]);
}

 function doSaveLocal(): void {
     navigator.vibrate(20)
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
 $: if ($interfaceState.selectedWorkflowID) {
     centerHref = `/workflows/${$interfaceState.selectedWorkflowID}/`
 }
 else {
     centerHref = "/workflows/";
 }

 let toolbarCount = 0;
 $: toolbarCount = $interfaceState.showingWorkflow ? 2 : 1;

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
<Toolbar bottom>
    <Link transition="f7-dive" href="/about/">Tab 1</Link>
    <Link transition="f7-dive" href={centerHref} tabLinkActive><Image /></Link>
    <Link transition="f7-dive" href="/login/"><LayoutTextSidebarReverse /></Link>
</Toolbar>
{#if $interfaceState.showIndicator}
    <Indicator value={$interfaceState.indicatorValue} />
{/if}

<style lang="scss">
 #comfy-file-input {
     display: none;
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
         background-color: var(--secondary-300);
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
