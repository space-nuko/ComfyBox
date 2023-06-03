<!--
     A "journey" is like browser history for prompts, except organized in a
     tree-like graph. It lets you save incremental changes to your workflow and
     jump between past and present sets of parameters.
-->
<script lang="ts">
 import type ComfyApp from './ComfyApp';
 import type { ComfyBoxWorkflow } from '$lib/stores/workflowState';
 import workflowState from '$lib/stores/workflowState';
 import type { WritableJourneyStateStore } from '$lib/stores/journeyStates';
 import JourneyRenderer from './JourneyRenderer.svelte';
 import { Plus } from "svelte-bootstrap-icons";
	import { getWorkflowRestoreParams, getWorkflowRestoreParamsFromWorkflow } from '$lib/restoreParameters';
	import notify from '$lib/notify';

 export let app: ComfyApp;

 let workflow: ComfyBoxWorkflow;
 let journey: WritableJourneyStateStore

 $: workflow = $workflowState.activeWorkflow
 $: journey = workflow?.journey

 function doAdd() {
     if (!workflow) {
         notify("No active workflow!", { type: "error" })
         return;
     }

     const nodes = Array.from(journey.iterateBreadthFirst());
     let parent = null;
     if (nodes.length > 0)
         parent = nodes[nodes.length - 1]
     const workflowParams = getWorkflowRestoreParamsFromWorkflow(workflow)
     journey.addNode(workflowParams, parent?.id);
 }
</script>

<div class="journey-view">
    <JourneyRenderer {workflow} {journey} />
    <div class="bottom">
        <button class="mode-button ternary"
                title={"Add new"}
                on:click={doAdd}>
            <Plus width="100%" height="100%" />
        </button>
    </div>
</div>

<style lang="scss">
 $button-height: 2.5rem;

 .journey-view {
     width: 100%;
     height: calc(100% - $button-height);
 }

 .bottom {
     height: $button-height;
     display: flex;
     flex-direction: row;
     color: var(--comfy-accent-soft);

     .mode-button {
         height: 100%;
         width: 100%;
         padding: 0.5rem;

         @include square-button;

         &:hover {
             color: var(--body-text-color);
         }
         &.selected {
             background-color: var(--panel-background-fill);
         }
     }
 }
</style>
