<script lang="ts">
 import type { ComfyReceiveOutputNode } from "$lib/nodes/actions";
 import type { ComfyBoxWorkflow, WorkflowReceiveOutputTargets } from "$lib/stores/workflowState";
 import { Block, BlockTitle } from "@gradio/atoms";
 import { Button } from "@gradio/button";
 import { createEventDispatcher } from "svelte";

 const dispatch = createEventDispatcher<{
     select: { workflow: ComfyBoxWorkflow, targetNode: ComfyReceiveOutputNode };
 }>();

 export let receiveTargets: WorkflowReceiveOutputTargets[] = [];

 function onSelected( workflow: ComfyBoxWorkflow, targetNode: ComfyReceiveOutputNode ) {
     dispatch("select", {
         workflow,
         targetNode
     })
}
</script>

<div class="scroll-container">
    {#if receiveTargets.length > 0}
        {#each receiveTargets as { workflow, targetNodes }}
            <Block>
                <BlockTitle>Workflow: <b>{workflow.attrs.title}</b></BlockTitle>
                {#each targetNodes as targetNode}
                    <Block>
                        <div class="target">
                            <div class="target-name-and-desc">
                                <div class="target-name">➤ {targetNode.properties.name}</div>
                                {#if targetNode.properties.description}
                                    <div class="target-desc">{targetNode.properties.description}</div>
                                {/if}
                            </div>
                            <div class="send-button">
                                <Button variant="primary" on:click={() => onSelected(workflow, targetNode)}>
                                    Send
                                </Button>
                            </div>
                        </div>
                    </Block>
                {/each}
            </Block>
        {/each}
            {:else}
        <div>(No receive targets found.)</div>
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
