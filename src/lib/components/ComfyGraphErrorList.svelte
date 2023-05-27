<script lang="ts">
 import { ComfyNodeErrorType, type ComfyGraphErrorLocation, type ComfyGraphErrors } from "$lib/apiErrors";
 import type ComfyApp from "./ComfyApp";
 import Accordion from "./gradio/app/Accordion.svelte";
 import uiState from '$lib/stores/uiState';
 import type { ComfyNodeDefInputType } from "$lib/ComfyNodeDef";
	import type { INodeInputSlot, LGraphNode, Subgraph } from "@litegraph-ts/core";
	import { UpstreamNodeLocator } from "./ComfyPromptSerializer";

 export let app: ComfyApp;
 export let errors: ComfyGraphErrors;

 function closeList() {
     app.lCanvas.clearErrors();
     $uiState.activeError = null;
 }

 function getParentNode(error: ComfyGraphErrorLocation): Subgraph | null {
     const node = app.lCanvas.graph.getNodeByIdRecursive(error.nodeID);
     if (node == null || !node.graph._is_subgraph)
         return null;

     return node.graph._subgraph_node
 }

 function canJumpToDisconnectedInput(error: ComfyGraphErrorLocation): boolean {
     return error.errorType === ComfyNodeErrorType.RequiredInputMissing && error.input != null;
 }

 function jumpToDisconnectedInput(error: ComfyGraphErrorLocation) {
     if (error.errorType !== ComfyNodeErrorType.RequiredInputMissing || error.input == null) {
         return
     }

     const node = app.lCanvas.graph.getNodeByIdRecursive(error.nodeID);

     const inputIndex =node.findInputSlotIndexByName(error.input.name);
     if (inputIndex === -1) {
         return
     }

     // TODO multiple tags?
     const tag: string | null = error.queueEntry.extraData.extra_pnginfo.comfyBoxPrompt.subgraphs[0];

     const test = (node: LGraphNode) => (node as any).isBackendNode
     const nodeLocator = new UpstreamNodeLocator(test)
     const [_, foundLink, foundInputSlot, foundPrevNode] = nodeLocator.locateUpstream(node, inputIndex, tag);

     if (foundInputSlot != null && foundPrevNode != null) {
         app.lCanvas.jumpToNodeAndInput(foundPrevNode, foundInputSlot);
     }
 }

 function jumpToError(error: ComfyGraphErrorLocation) {
     app.lCanvas.jumpToError(error);
 }

 function getInputTypeName(type: ComfyNodeDefInputType) {
     if (Array.isArray(type)) {
         return `List (${type.length})`
     }
     return type;
 }
</script>

<div class="error-list">
    <div class="error-list-header">
        <button class="error-list-close" on:click={closeList}>✕</button>
    </div>
    {#each Object.entries(errors.errorsByID) as [nodeID, nodeErrors]}
        {@const first = nodeErrors[0]}
        {@const parent = getParentNode(first)}
        <div class="error-group">
            <div class="error-node-details">
                <span class="error-node-type">{first.comfyNodeType}</span>
                {#if parent}
                    <span class="error-node-parent">({parent.title})</span>
                {/if}
            </div>
            <div class="error-entries">
                {#each nodeErrors as error}
                    {@const isExecutionError = error.errorType === "execution"}
                    <div class="error-entry">
                        <div>
                            <div class="error-details">
                                <button class="jump-to-error" class:execution-error={isExecutionError} on:click={() => jumpToError(error)}><span>⮎</span></button>
                                <div>
                                    <span class="error-message" class:execution-error={isExecutionError}>{error.message}</span>
                                    {#if error.exceptionType}
                                        <span>({error.exceptionType})</span>
                                    {/if}
                                    {#if error.exceptionMessage}
                                        <div style:text-decoration="underline">{error.exceptionMessage}</div>
                                    {/if}
                                    {#if error.input}
                                        <div class="error-input">
                                            <span>Input: `{error.input.name}`</span>
                                            {#if error.input.config}
                                                <span>({getInputTypeName(error.input.config[0])})</span>
                                            {/if}
                                        </div>
                                        {#if canJumpToDisconnectedInput(error)}
                                            <div style:display="flex" style:flex-direction="row">
                                                <button class="jump-to-error locate" on:click={() => jumpToDisconnectedInput(error)}><span>⮎</span></button>
                                                <span>Find disconnected input</span>
                                            </div>
                                        {/if}
                                    {/if}
                                </div>
                            </div>
                        </div>
                        {#if error.traceback}
                            <div class="error-traceback-wrapper">
                                <Accordion label="Traceback" open={false}>
                                    <div class="error-traceback">
                                        <div class="error-traceback-contents">
                                            {#each error.traceback as line}
                                                <div>{line}</div>
                                            {/each}
                                        </div>
                                    </div>
                                </Accordion>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style lang="scss">

 .error-list {
     width: 30%;
     height: 70%;
     margin: 1.0rem;
     overflow-y: auto;
     position: absolute;
     right: 0;
     bottom: 0;
     border: 1px solid #aaa;
     color: #ddd;
     background: #444;
     font-size: 12pt;
 }

 .error-list-header {
     width: 100%;
     height: 24px;
     margin: auto;
     border-bottom: 1px solid #ccc;
     background: #282828;
     justify-content: center;
     text-align: center;

     .error-list-close {
         margin: auto;
         padding-right: 6px;
         position: absolute;
         top: 0;
         right: 0;
     }
 }

 .error-node-details {
     font-size: 14pt;
     color: #ddd;
     font-weight: bold;
     padding: 0.7rem 1.0rem;
     background: #333;
 }

 .error-node-parent {
     color: #aaa;
     font-size: 12pt;
     font-weight: initial;
 }

 .error-entries:last-child {
     border-bottom: 1px solid #ccc;
 }

 .error-entry {
     opacity: 100%;
     border-top: 1px solid #ccc;
     padding: 1rem;
 }

 .error-details {
     display: flex;
     flex-direction: row;
     gap: var(--spacing-md);
     vertical-align: bottom;
     position: relative;

     > span {
         bottom: 0;
         display: flex;
         flex-direction: column;
         justify-content: center;
     }
 }

 .error-message {
     color: #F66;
     &.execution-error {
         color: #E6E;
     }
     text-decoration: underline;
 }

 .error-input {
     font-size: 12pt;
 }

 .jump-to-error {
     border: 1px solid #ccc;
     background: #844;
     &.execution-error {
         background: #848;
     }
     &.locate {
         background: #488;
     }
     width: 32px;
     height: 32px;
     font-size: 14pt;
     text-align: center;
     display: flex;
     position: relative;
     justify-content: center;
     margin-right: 0.3rem;

     > span {
         margin: auto;
     }

     &:hover {
         filter: brightness(120%);
     }

     &:active {
         filter: brightness(80%);
     }
 }

 .error-traceback-wrapper {
     margin-top: 1.0rem;
     padding: 0.5rem;
     border: 1px solid #888;

     .error-traceback {
         font-size: 11pt;
         overflow: auto;
         white-space: nowrap;
         background: #333;

         .error-traceback-contents {
             width: 100%;
             font-family: monospace;
             padding: 1.0rem;

             > div {
                 width: 100%;
             }
         }
     }
 }
</style>
