<script lang="ts">
 import { ComfyNodeErrorType, type ComfyGraphErrorLocation, type ComfyGraphErrors } from "$lib/apiErrors";
 import type ComfyApp from "./ComfyApp";
 import Accordion from "./gradio/app/Accordion.svelte";
 import uiState from '$lib/stores/uiState';
 import type { ComfyNodeDefInputType } from "$lib/ComfyNodeDef";
 import type { INodeInputSlot, LGraphNode, LLink, Subgraph } from "@litegraph-ts/core";
 import { UpstreamNodeLocator, getUpstreamLink, nodeHasTag } from "./ComfyPromptSerializer";
 import JsonView from "./JsonView.svelte";

 export let app: ComfyApp;
 export let errors: ComfyGraphErrors;

 let missingTag = null;
 let nodeToJumpTo = null;
 let inputSlotToHighlight = null;
 let _errors = null

 $: if (_errors != errors) {
     _errors = errors;
     if (errors.errors[0]) {
         jumpToError(errors.errors[0])
     }
 }

 function closeList() {
     app.lCanvas.clearErrors();
     $uiState.activeError = null;
     clearState()
 }

 function clearState() {
     _errors = null;
     missingTag = null;
     nodeToJumpTo = null;
     inputSlotToHighlight = null;
 }

 function getParentNode(error: ComfyGraphErrorLocation): Subgraph | null {
     const node = app.lCanvas.graph.getNodeByIdRecursive(error.nodeID);
     if (node == null || !node.graph._is_subgraph)
         return null;

     return node.graph._subgraph_node
 }

 function jumpToFoundNode() {
     if (nodeToJumpTo == null) {
         return
     }

     app.lCanvas.jumpToNodeAndInput(nodeToJumpTo, inputSlotToHighlight);
 }

 function detectDisconnected(error: ComfyGraphErrorLocation) {
     missingTag = null;
     nodeToJumpTo = null;
     inputSlotToHighlight = null;

     if (error.errorType !== ComfyNodeErrorType.RequiredInputMissing || error.input == null) {
         return
     }

     const node = app.lCanvas.graph.getNodeByIdRecursive(error.nodeID);

     const inputIndex = node.findInputSlotIndexByName(error.input.name);
     if (inputIndex === -1) {
         return
     }

     // TODO multiple tags?
     const tag: string | null = error.queueEntry.extraData.extra_pnginfo.comfyBoxPrompt.subgraphs[0];

     const test = (node: LGraphNode, currentLink: LLink) => {
         if (!nodeHasTag(node, tag, true))
             return true;

         const [nextGraph, nextLink, nextInputSlot, nextNode] = getUpstreamLink(node, currentLink)
         return nextLink == null;
     };
     const nodeLocator = new UpstreamNodeLocator(test)
     const [foundNode, foundLink, foundInputSlot, foundPrevNode] = nodeLocator.locateUpstream(node, inputIndex, null);

     if (foundInputSlot != null && foundPrevNode != null) {
         if (!nodeHasTag(foundNode, tag, true)) {
             nodeToJumpTo = foundNode
             missingTag = tag;
             inputSlotToHighlight = null;
         }
         else {
             nodeToJumpTo = foundPrevNode;
             inputSlotToHighlight = foundInputSlot;
         }
     }
 }

 function jumpToError(error: ComfyGraphErrorLocation) {
     app.lCanvas.jumpToError(error);

     detectDisconnected(error);
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
    <div class="error-list-scroll-container">
        {#each Object.entries(errors.errorsByID) as [nodeID, nodeErrors], i}
            {@const first = nodeErrors[0]}
            {@const parent = getParentNode(first)}
            {@const last = i === Object.keys(errors.errorsByID).length - 1}
            <div class="error-group">
                <div class="error-node-details">
                    <span class="error-node-type">{first.comfyNodeType}</span>
                    {#if parent}
                        <span class="error-node-parent">({parent.title})</span>
                    {/if}
                </div>
                <div class="error-entries" class:last>
                    {#each nodeErrors as error}
                        {@const isExecutionError = error.errorType === "execution"}
                        <div class="error-entry">
                            <div>
                                <div class="error-details">
                                    <button class="jump-to-error" class:execution-error={isExecutionError} on:click={() => jumpToError(error)}><span>⮎</span></button>
                                    <div class="error-details-wrapper">
                                        {#if missingTag && nodeToJumpTo}
                                            <div class="error-input">
                                                <div><span class="error-message">Node "{nodeToJumpTo.title}" was missing tag used in workflow:</span><span style:padding-left="0.2rem"><b>{missingTag}</b></span></div>
                                                <div>Tags on node: <b>{(nodeToJumpTo?.properties?.tags || []).join(", ")}</b></div>
                                            </div>
                                        {:else}
                                            <span class="error-message" class:execution-error={isExecutionError}>{error.message}</span>
                                        {/if}
                                        {#if error.exceptionType}
                                            <span>({error.exceptionType})</span>
                                        {/if}
                                        {#if error.exceptionMessage && !isExecutionError}
                                            <div style:text-decoration="underline">{error.exceptionMessage}</div>
                                        {/if}
                                        {#if nodeToJumpTo != null}
                                            <div style:display="flex" style:flex-direction="row">
                                                <button class="jump-to-error locate" on:click={jumpToFoundNode}><span>⮎</span></button>
                                                {#if missingTag}
                                                    <span>Jump to node: {nodeToJumpTo.title}</span>
                                                {:else}
                                                    <span>Find disconnected input</span>
                                                {/if}
                                            </div>
                                        {/if}
                                        {#if error.input && !missingTag}
                                            <div class="error-input">
                                                <span>Input: <b>{error.input.name}</b></span>
                                                {#if error.input.config}
                                                    <span>({getInputTypeName(error.input.config[0])})</span>
                                                {/if}
                                            </div>

                                            {#if error.input.receivedValue}
                                                <div>
                                                    <span>Received value: <b>{error.input.receivedValue}</b></span>
                                                </div>
                                            {/if}
                                            {#if error.input.receivedType}
                                                <div>
                                                    <span>Received type: <b>{error.input.receivedType}</b></span>
                                                </div>
                                            {/if}
                                            {#if error.input.config}
                                                <div class="error-traceback-wrapper">
                                                    <Accordion label="Input Config" open={true}>
                                                        <div class="error-traceback">
                                                            <div class="error-traceback-contents">
                                                                <JsonView json={error.input.config[1]} />
                                                            </div>
                                                        </div>
                                                    </Accordion>
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
                                                    <pre>{line}</pre>
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
</div>

<style lang="scss">

 .error-list {
     width: 30%;
     height: 70%;
     margin: 1.0rem;
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

 .error-list-scroll-container {
     height: calc(100% - 24px);
     overflow-y: auto;
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

 .error-entries:not(.last):last-child {
     border-bottom: 1px solid #ccc;
 }

 .error-entry {
     opacity: 100%;
     border-top: 1px solid #ccc;
     padding: 1rem;
 }

 .error-details {
     width: 100%;
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

 .error-details-wrapper {
     flex: 5 1 0%;
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
     width: 100%;
     margin-top: 1.0rem;
     padding: 0.5rem;
     border: 1px solid #888;

     .error-traceback {
         font-size: 10pt;
         overflow: auto;
         white-space: nowrap;
         background: #333;

         .error-traceback-contents {
             width: 100%;
             font-family: monospace !important;
             padding: 1.0rem;

             > div {
                 width: 100%;
             }
         }
     }
 }
</style>
