<!--
     A "journey" is like browser history for prompts, except organized in a
     tree-like graph. It lets you save incremental changes to your workflow and
     jump between past and present sets of parameters.
-->
<script context="module" lang="ts">
 export type JourneyMode = "linear" | "tree";
</script>

<script lang="ts">
 import type ComfyApp from './ComfyApp';
 import type { ComfyBoxWorkflow } from '$lib/stores/workflowState';
 import workflowState from '$lib/stores/workflowState';
 import uiState from '$lib/stores/uiState';
 import { resolvePatch, type JourneyPatchNode, type WritableJourneyStateStore, diffParams, type JourneyNode } from '$lib/stores/journeyStates';
 import JourneyRenderer, { type JourneyNodeEvent } from './JourneyRenderer.svelte';
 import { Trash, ClockHistory, Diagram3, GeoAlt } from "svelte-bootstrap-icons";
 import { getWorkflowRestoreParamsFromWorkflow } from '$lib/restoreParameters';
 import notify from '$lib/notify';
 import selectionState from '$lib/stores/selectionState';
 import { Checkbox } from '@gradio/form';
 import modalState from '$lib/stores/modalState';
 import queueState, { type QueueEntry } from '$lib/stores/queueState';
 import PromptDisplay from "$lib/components/PromptDisplay.svelte"
 import { getQueueEntryImages } from '$lib/stores/uiQueueState';
 import { SvelteComponent } from 'svelte';
 import { capitalize } from '$lib/utils';

 export let app: ComfyApp;

 let workflow: ComfyBoxWorkflow | null = null;
 let journey: WritableJourneyStateStore | null = null;
 let activeNode: JourneyNode | null = null;
 let mode: JourneyMode = "linear";
 let cyto: cytoscape.Core | null = null;

 const MODES: [JourneyMode, typeof SvelteComponent][] = [
     ["linear", ClockHistory],
     ["tree", Diagram3],
 ]

 $: workflow = $workflowState.activeWorkflow
 $: {
     journey = workflow?.journey
     activeNode = journey?.getActiveNode()
 }

 // function doAdd() {
 //     if (!workflow) {
 //         notify("No active workflow!", { type: "error" })
 //         return;
 //     }
 //
 //     const activeNode = journey.getActiveNode();
 //     journey.pushPatchOntoActive(workflow, activeNode, true)
 // }

 function doClearHistory() {
     if (!confirm("Clear history?"))
         return;

     journey.clear();
     notify("History cleared.", { type: "info" })
 }

 function doCenter() {
     if (cyto == null)
         return;

     const activeNode = journey.getActiveNode();
     if (activeNode == null)
         return;

     const node = cyto.$(`#${activeNode.id}`);
     if (node.isNode()) {
         cyto.zoom(1.25);
         cyto.center(node)
     }
 }

 function onSelectNode(e: CustomEvent<JourneyNodeEvent>) {
     const { node } = e.detail;

     const id = node.id();
     const journeyNode = $journey.nodesByID[id];
     if (journeyNode == null) {
         console.error("[ComfyJourneyView] Missing journey node!", id)
         return;
     }

     console.debug("[ComfyJourneyView] Journey node", journeyNode)

     const patch = resolvePatch(journeyNode);

     // ensure reactive state is updated
     workflow.applyParamsPatch(patch);
     $workflowState = $workflowState
 }

 function onRightClickNode(e: CustomEvent<JourneyNodeEvent>) {
     const { node } = e.detail;

     const id = node.id();
     const journeyNode = $journey.nodesByID[id];
     if (journeyNode == null) {
         console.error("[ComfyJourneyView] Missing journey node!", id)
         return;
     }

     // pick first resolved prompt
     const queueEntry: QueueEntry | null =
         Array.from(journeyNode.promptIDs)
              .map(id => queueState.getQueueEntry(id))
              .find(qe => qe?.prompt != null);

     if (queueEntry) {
         modalState.pushModal({
             title: "Prompt Details",
             svelteComponent: PromptDisplay,
             svelteProps: {
                 prompt: queueEntry.prompt,
                 workflow: queueEntry.extraData?.extra_pnginfo?.comfyBoxWorkflow,
                 images: getQueueEntryImages(queueEntry),
                 closeModal: () => modalState.closeAllModals(),
                 expandAll: false,
                 app
             },
         })
     }
     else {
         notify("This journey entry has no prompts yet.", { type: "warning" })
     }
 }

 function onHoverNode(e: CustomEvent<JourneyNodeEvent>) {
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

 function onHoverNodeOut(e: CustomEvent<JourneyNodeEvent>) {
     $selectionState.currentPatchHoveredNodes = new Set();
 }
</script>

<div class="journey-view">
    <div class="top">
        <button class="mode-button ternary"
                title="Center Active"
                disabled={$journey.root == null || $journey.activeNodeID == null}
                on:click={doCenter}>
            <GeoAlt width="100%" height="100%" />
        </button>
        <button class="mode-button ternary"
                title="Clear"
                disabled={$journey.root == null}
                on:click={doClearHistory}>
            <Trash width="100%" height="100%" />
        </button>
    </div>
    {#key $journey.version}
        <JourneyRenderer {workflow} {journey} {mode}
                         bind:cyto
                         on:select_node={onSelectNode}
                         on:right_click_node={onRightClickNode}
                         on:hover_node={onHoverNode}
                         on:hover_node_out={onHoverNodeOut}
        />
    {/key}
    <div class="bottom" style:border-top="1px solid var(--panel-border-color)">
        <Checkbox label="Save History" bind:value={$uiState.saveHistory}/>
    </div>
    <div class="bottom">
        {#each MODES as [theMode, icon]}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <button class="mode-button ternary"
                    disabled={mode === theMode}
                    title={capitalize(theMode)}
                    class:selected={mode === theMode}
                    on:click={() => { mode = theMode; }}>
                <svelte:component this={icon} width="100%" height="100%" />
            </button>
        {/each}
    </div>
</div>

<style lang="scss">
 $button-height: 2.5rem;

 .journey-view {
     width: 100%;
     height: calc(100% - $button-height * 3);
 }

 .top, .bottom {
     height: $button-height;
     display: flex;
     flex-direction: row;
     color: var(--comfy-accent-soft);
     justify-content: center;
 }

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
</style>
