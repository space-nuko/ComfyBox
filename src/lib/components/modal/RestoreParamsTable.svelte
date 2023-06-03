<script lang="ts">
 import type { ComfyReceiveOutputNode } from "$lib/nodes/actions";
	import type { ComfyWidgetNode } from "$lib/nodes/widgets";
	import type { RestoreParamTargets } from "$lib/restoreParameters";
	import { isComfyWidgetNode } from "$lib/stores/layoutStates";
 import type { ComfyBoxWorkflow, WorkflowReceiveOutputTargets } from "$lib/stores/workflowState";
	import workflowState from "$lib/stores/workflowState";
 import { Block, BlockTitle } from "@gradio/atoms";
 import { Button } from "@gradio/button";
 import { createEventDispatcher } from "svelte";

 type UIRestoreParam = {
     node: ComfyWidgetNode,
     widget: WidgetLayout,
     sources: RestoreParamSource[]
 }

 const dispatch = createEventDispatcher<{
     restore: {};
 }>();

 export let restoreParams: RestoreParamTargets = {};
 let uiRestoreParams: UIRestoreParam[] = []

 $: uiRestoreParams = buildForUI(restoreParams);

 function buildForUI(restoreParams: RestoreParamTargets): UIRestoreParam[] {
     const result = []

     for (const [nodeID, sources] of Object.entries(restoreParams)) {
         const node = workflow.graph.getNodeByIdRecursive(nodeID);
         if (node == null || !isComfyWidgetNode(node))
             continue;

         const widget = node.dragItem;
         if (widget == null) {
             console.error("[RestoreParamsTable] Node missing layoutState widget!!!", node)
         }

         result.push({ node, widget, sources })
     }

     return result
 }

 let workflow: ComfyBoxWorkflow;
 $: workflow = workflowState.getActiveWorkflow();

 function doRestore(e: MouseEvent) {
     dispatch("restore", {})
}
</script>

<div class="scroll-container">
    {#if workflow == null}
        <div>No workflow is active.</div>
    {:else if Object.keys(uiRestoreParams).length === 0}
        <div>
            <p>No parameters to restore found in this workflow.</p>
            <p>(TODO: Only parameters compatible with the currently active workflow can be restored right now)</p>
        </div>
    {:else}
        <Block>
            <BlockTitle>Parameters</BlockTitle>
            <Block>
                <Button variant="primary" on:click={doRestore}>
                    Restore
                </Button>
            </Block>
            {#each uiRestoreParams as { node, widget, sources }}
                <Block>
                    <BlockTitle>{widget.attrs.title || node.title}</BlockTitle>
                    {#each sources as source}
                        <div class="target">
                            <div class="target-name-and-desc">
                                <div class="target-name">➤ {source.type}</div>
                            </div>
                        </div>
                    {/each}
                </Block>
            {/each}
        </Block>
    {/if}
</div>

<style lang="scss">
 .scroll-container {
     overflow: auto;
     position: relative;
     flex: 1 1 0%;
     height: 100%;

     > :global(.block) {
         background: var(--panel-background-fill);
     }
 }

 .target {
     display: flex;
     flex-direction: row;
     justify-content: center;
     text-align: left;

     .target-name-and-desc {
         margin: auto auto auto 0;
         left: 0px;

         .target-desc {
             opacity: 65%;
             font-size: 11pt;
         }
     }
 }
</style>
