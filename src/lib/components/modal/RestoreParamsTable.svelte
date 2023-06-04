<script lang="ts">
 import type { ComfyReceiveOutputNode } from "$lib/nodes/actions";
 import type { ComfyWidgetNode } from "$lib/nodes/widgets";
 import type { RestoreParamSource, RestoreParamTargets } from "$lib/restoreParameters";
 import { isComfyWidgetNode, type WidgetLayout } from "$lib/stores/layoutStates";
 import type { ComfyBoxWorkflow, WorkflowReceiveOutputTargets } from "$lib/stores/workflowState";
 import workflowState from "$lib/stores/workflowState";
 import { Block, BlockTitle } from "@gradio/atoms";
 import { Button } from "@gradio/button";
 import { createEventDispatcher } from "svelte";
 import deepEqual from "deep-equal";
 import { capitalize, countNewLines, isMultiline } from "$lib/utils";
 import { TextBox } from "@gradio/form";

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

         const nodeValue = node.getValue();
         const foundSources = sources.filter(s => !deepEqual(nodeValue, s.finalValue));
         if (foundSources.length === 0)
             continue;

         const widget = node.dragItem;
         if (widget == null) {
             console.error("[RestoreParamsTable] Node missing layoutState widget!!!", node)
         }

         result.push({ node, widget, sources: foundSources })
     }

     console.warn("RESTORE PARAMS", restoreParams, "->", result)

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
            <p>(Either prompt is unchanged from active workflow, or the workflow the parameters were saved from was different)</p>
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
                    <div class="target-name">➤ {widget.attrs.title || node.title}</div>
                    {#each sources as source}
                        {@const value = String(source.finalValue)}
                        <div class="target">
                            <div class="target-name-and-desc">
                                <Block>
                                    <BlockTitle>{capitalize(source.type)}</BlockTitle>
                                    <div>
                                        {#if isMultiline(value, 20)}
                                            {@const lines = Math.max(countNewLines(value), value.length / 20)}
                                            <TextBox show_label={false} label={''} {value} {lines} max_lines={lines} />
                                        {:else}
                                            <TextBox show_label={false} label={''} {value} lines={1} max_lines={1} />
                                        {/if}
                                    </div>
                                </Block>
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

 .target-name {
     padding-bottom: 0.5rem;
 }

 .target {

     .target-name-and-desc {
         :global(.block) {
             background: var(--panel-background-fill);
         }

         .target-desc {
             opacity: 65%;
             font-size: 11pt;
         }
     }

     pre {
         @include json-view;
     }
 }
</style>
