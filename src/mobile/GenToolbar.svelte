<script lang="ts">
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import workflowState, { ComfyBoxWorkflow } from "$lib/stores/workflowState";
 import { vibrateIfPossible } from "$lib/utils";

 import { Link, Toolbar } from "framework7-svelte"

 export let subworkflowID: number = -1;
 export let app: ComfyApp = undefined;
 let workflow: ComfyBoxWorkflow | null = null;

 $: workflow = $workflowState.activeWorkflow;

 function queuePrompt() {
     vibrateIfPossible(20) 
     app.runDefaultQueueAction()
 }
</script>

<Toolbar bottom color="red" style="bottom: calc(var(--f7-toolbar-height))">
    {#if workflow != null && workflow.attrs.queuePromptButtonName != ""}
        <div style:width="100%">
            <Link on:click={queuePrompt}>
                {workflow.attrs.queuePromptButtonName}
            </Link>
        </div>
    {/if}
</Toolbar>

<style lang="scss">
 #comfy-file-input {
     display: none;
 }

 :global(.toolbar) {
     --f7-toolbar-font-size: 13pt;
 }

 :global(.dark .toolbar.color-red) {
     background: var(--neutral-700) !important;
 }
</style>
