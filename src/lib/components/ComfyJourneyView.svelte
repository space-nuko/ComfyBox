<!--
     A "journey" is like browser history for prompts, except organized in a
     tree-like graph. It lets you save incremental changes to your workflow and
     jump between past and present sets of parameters.
-->
<script lang="ts">
 import type ComfyApp from './ComfyApp';
 import type { ComfyBoxWorkflow } from '$lib/stores/workflowState';
 import workflowState from '$lib/stores/workflowState';
 import uiState from '$lib/stores/uiState';
 import { calculateWorkflowParamsPatch, resolvePatch, type JourneyPatchNode, type WritableJourneyStateStore, diffParams } from '$lib/stores/journeyStates';
 import JourneyRenderer from './JourneyRenderer.svelte';
 import { Plus } from "svelte-bootstrap-icons";
 import { getWorkflowRestoreParams, getWorkflowRestoreParamsFromWorkflow } from '$lib/restoreParameters';
 import notify from '$lib/notify';
 import selectionState from '$lib/stores/selectionState';
	import { Checkbox } from '@gradio/form';

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

     const workflowParams = getWorkflowRestoreParamsFromWorkflow(workflow)
     const activeNode = journey.getActiveNode();
     journey.pushPatchOntoActive(workflow, activeNode, true)
 }

 function onSelectNode(e: CustomEvent<{ cyto: cytoscape.Core, node: cytoscape.NodeSingular }>) {
     const { node } = e.detail;

     const id = node.id();
     const journeyNode = $journey.nodesByID[id];
     if (journeyNode == null) {
         console.error("[ComfyJourneyView] Missing journey node!", id)
         return;
     }

     const patch = resolvePatch(journeyNode);

     // ensure reactive state is updated
     workflow.applyParamsPatch(patch);
     $workflowState = $workflowState
 }

 function onHoverNode(e: CustomEvent<{ cyto: cytoscape.Core, node: cytoscape.NodeSingular }>) {
     const { node } = e.detail;

     const id = node.id();
     const journeyNode = $journey.nodesByID[id];
     if (journeyNode == null) {
         console.error("[ComfyJourneyView] Missing journey node!", id)
         return;
     }

     const patch = resolvePatch(journeyNode);
     const workflowParams = getWorkflowRestoreParamsFromWorkflow(workflow);
     const diff = diffParams(patch, workflowParams);

     $selectionState.currentPatchHoveredNodes = new Set(Object.keys(diff));
 }

 function onHoverNodeOut(e: CustomEvent<{ cyto: cytoscape.Core, node: cytoscape.NodeSingular }>) {
     $selectionState.currentPatchHoveredNodes = new Set();
 }
</script>

<div class="journey-view">
    <JourneyRenderer {workflow} {journey}
                     on:select_node={onSelectNode}
                     on:hover_node={onHoverNode}
                     on:hover_node_out={onHoverNodeOut}
    />
    <div class="bottom" style:border-top="1px solid var(--panel-border-color)">
        <Checkbox label="Auto-Push" disabled={$journey.root == null} bind:value={$uiState.autoPushJourney}/>
    </div>
    <div class="bottom">
        <button class="mode-button ternary"
                title={"Add new"}
                disabled={$journey.activeNodeID === null && $journey.root !== null}
                on:click={doAdd}>
            <Plus width="100%" height="100%" />
        </button>
    </div>
</div>

<style lang="scss">
 $button-height: 2.5rem;

 .journey-view {
     width: 100%;
     height: calc(100% - $button-height * 2);
 }

 .bottom {
     height: $button-height;
     display: flex;
     flex-direction: row;
     color: var(--comfy-accent-soft);
     justify-content: center;

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
