<script lang="ts">
 import { onDestroy } from "svelte";
 import { get } from "svelte/store"
 import { Block, BlockTitle } from "@gradio/atoms";
 import { Move } from 'radix-icons-svelte';
 import widgetState, { type WidgetDrawState, type WidgetUIState } from "$lib/stores/widgetState";
 import queueState from "$lib/stores/queueState";
 import nodeState from "$lib/stores/nodeState";
 import uiState from "$lib/stores/uiState";

 import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

 import {fade} from 'svelte/transition';
 // notice - fade in works fine but don't add svelte's fade-out (known issue)
 import {cubicIn} from 'svelte/easing';
 import { flip } from 'svelte/animate';
 import ComfyApp from "./ComfyApp";
 import type { LGraphNode } from "@litegraph-ts/core";
 import type { DragItem } from "./ComfyUIPane";
 import { getComponentForWidgetState } from "$lib/utils"

 export let dragItems: DragItem[] = [];
 let dragDisabled = true;
 let unlockUI = false;
 const flipDurationMs = 200;

 $: dragDisabled = !$uiState.unlocked;

 const handleConsider = evt => {
     dragItems = evt.detail.items;
     // console.log(dragItems);
 };
 const handleFinalize = evt => {
     dragItems = evt.detail.items;
     // Ensure dragging is stopped on drag finish
     dragDisabled = true;
 };

 const startDrag = () => {
     if (!$uiState.unlocked)
         return
     dragDisabled = false;
 };
 const stopDrag = () => {
     if (!$uiState.unlocked)
         return
     dragDisabled = true;
 };

 const unsubscribe = widgetState.subscribe(state => {
     dragItems = dragItems.filter(item => item.node.id in state);
 });

 onDestroy(unsubscribe);

 $: if ($queueState) {
     for (let dragItem of dragItems) {
         dragItem.isNodeExecuting = $queueState.runningNodeId === dragItem.node.id;
     }
     dragItems = dragItems;
 }

 function updateNodeName(node: LGraphNode, value: string) {
     nodeState.nodeStateChanged(node);
 }
</script>


<div class="v-pane"
     use:dndzone="{{ items: dragItems, dragDisabled, flipDurationMs }}"
     on:consider="{handleConsider}"
     on:finalize="{handleFinalize}"
>
    {#each dragItems as dragItem(dragItem.id)}
        {@const node = dragItem.node}
        {@const id = node.id}
        <div class="animation-wrapper" class:is-executing={dragItem.isNodeExecuting} animate:flip={{duration:flipDurationMs}}>
            <Block>
                    <label for={String(id)} class={$uiState.unlocked ? "edit-title-label" : ""}>
                        <BlockTitle>
                            {#if $uiState.unlocked}
                                <input class="edit-title" bind:value={dragItem.node.title} type="text" minlength="1" on:input="{(v) => { updateNodeName(node, v) }}"/>
                            {:else}
                                {node.title}
                            {/if}
                            {#if node.title !== node.type}
                                <span class="node-type">({node.type})</span>
                            {/if}
                        </BlockTitle>
                    </label>
                    {#each $widgetState[id] as item}
                        <svelte:component this={getComponentForWidgetState(item)} {item} />
                        {#if dragItem[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                            <div in:fade={{duration:200, easing: cubicIn}} class='drag-item-shadow'/>
                        {/if}
                    {/each}
                    {#if $uiState.unlocked}
                        <div class="handle" on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag} on:touchend={stopDrag}/>
                    {/if}
            </Block>
        </div>
    {/each}
</div>

<style>
 .v-pane {
     border: 1px solid grey;
     float: left;
     height: 100%;
     overflow: auto;
     position: relative;
     width: 33%;
 }

 .is-executing :global(.block) {
     border: 5px dashed var(--color-green-600) !important;
 }

 .handle {
     cursor: grab;
     z-index: 99999;
     position: absolute;
     right: 0;
     top: 0;
     width: 100%;
     height: 100%;
 }

 .handle:hover {
     background-color: #add8e680;
 }

 .drag-item-shadow {
     position: absolute;
     top: 0; left:0; right: 0; bottom: 0;
     visibility: visible;
     border: 1px dashed grey;
     background: lightblue;
     opacity: 0.5;
     margin: 0;
 }

 .node-type {
     font-size: smaller;
     color: var(--neutral-400);
 }

 .edit-title-label {
     position: relative;
     z-index: 100000;
 }

 .edit-title {
     z-index: 100000;
     display: block;
     position: relative;
     outline: none !important;
     box-shadow: var(--input-shadow);
     border: var(--input-border-width) solid var(--input-border-color);
     border-radius: var(--input-radius);
     background: var(--input-background-fill);
     padding: var(--input-padding);
     width: 100%;
     color: var(--body-text-color);
     font-weight: var(--input-text-weight);
     font-size: var(--input-text-size);
     line-height: var(--line-sm);
 }

 .edit-title:focus {
     box-shadow: var(--input-shadow-focus);
     border-color: var(--input-border-color-focus);
 }

 .edit-title::placeholder {
     color: var(--input-placeholder-color);
 }
</style>
