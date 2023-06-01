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
</script>

<Toolbar bottom color="red" style="bottom: calc(var(--f7-toolbar-height))">
    {#if workflow != null && workflow.attrs.queuePromptButtonName != ""}
        <Link on:click={queuePrompt}>
        {workflow.attrs.queuePromptButtonName}
    </Link>
    {/if}
    <Link on:click={refreshCombos}>🔄</Link>
    <Link on:click={doSaveLocal}>Save Local</Link>
    <Link on:click={doLoad}>Load</Link>
    <input bind:this={fileInput} id="comfy-file-input" type="file" accept=".json" on:change={loadWorkflow} />
</Toolbar>

<style lang="scss">
 #comfy-file-input {
     display: none;
 }

 :global(.dark .toolbar.color-red) {
     background: var(--neutral-700) !important;
 }
</style>
