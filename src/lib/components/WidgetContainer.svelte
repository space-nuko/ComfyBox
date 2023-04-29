<script lang="ts">
 import { onDestroy } from "svelte";
 import { get } from "svelte/store"
 import { Block, BlockTitle } from "@gradio/atoms";
 import { Move } from 'radix-icons-svelte';
 import queueState from "$lib/stores/queueState";
 import nodeState, { type WidgetUIState } from "$lib/stores/nodeState";
 import uiState from "$lib/stores/uiState";

 import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';

 import {fade} from 'svelte/transition';
 // notice - fade in works fine but don't add svelte's fade-out (known issue)
 import {cubicIn} from 'svelte/easing';
 import { flip } from 'svelte/animate';
 import ComfyApp from "./ComfyApp";
 import type { LGraphNode } from "@litegraph-ts/core";
 import layoutState, { type ContainerLayout, type WidgetLayout, type IDragItem } from "$lib/stores/layoutState";
 import { getComponentForWidgetState } from "$lib/utils"

 export let dragItem: DragItem | null = null;
 let container: ContainerLayout | null = null;
 let widget: WidgetUIState | null = null;
 let children: IDragItem[] | null = null;
 let dragDisabled = true;
 const flipDurationMs = 200;

 $: if (dragItem) {
     if (dragItem.type === "container") {
         container = dragItem as ContainerLayout;
         children = $layoutState.children[dragItem.id];
         widget = null;
     }
     else if (dragItem.type === "widget") {
         const widgetLayout = dragItem as WidgetLayout;
         widget = nodeState.findWidgetByName(widgetLayout.nodeId, widgetLayout.widgetName)
         children = null;
         container = null;
     }
 }

 $: dragDisabled = !$uiState.unlocked;

 const handleConsider = evt => {
     $layoutState.children[dragItem.id] = evt.detail.items;
     children = $layoutState.children[dragItem.id];
     // console.log(dragItems);
 };
 const handleFinalize = evt => {
     $layoutState.children[dragItem.id] = evt.detail.items;
     children = $layoutState.children[dragItem.id];
     // Ensure dragging is stopped on drag finish
     // dragDisabled = true;
 };

 const startDrag = () => {
     if (!$uiState.unlocked)
         return
     // dragDisabled = false;
 };
 const stopDrag = () => {
     if (!$uiState.unlocked)
         return
     // dragDisabled = true;
 };

 const unsubscribe = nodeState.subscribe(state => {
     if (container) {
         $layoutState.children[container.id] = $layoutState.children[container.id].filter(item => item.node.id in state);
         children = $layoutState.children[container.id];
     }
 });

 onDestroy(unsubscribe);

 $: if ($queueState && widget) {
     widget.isNodeExecuting = $queueState.runningNodeId === widget.nodeId;
     children = $layoutState.children[widget.nodeId];
 }

 function updateNodeName(node: LGraphNode, value: string) {
     nodeState.nodeStateChanged(node);
 }
</script>


{#if container}
    {@const node = container.node}
    {@const id = container.id}
    <Block>
        <label for={String(id)} class={$uiState.unlocked ? "edit-title-label" : ""}>
            <BlockTitle>
                {#if $uiState.unlocked}
                    <input class="edit-title" bind:value={container.attrs.title} type="text" minlength="1" on:input="{(v) => { updateNodeName(node, v) }}"/>
                {:else}
                    {container.attrs.title}
                {/if}
            </BlockTitle>
        </label>
        <div class="v-pane"
             use:dndzone="{{ items: children, dragDisabled, flipDurationMs }}"
             on:consider="{handleConsider}"
             on:finalize="{handleFinalize}"
        >
			{#each children.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item(item.id)}
                <div class="animation-wrapper" class:is-executing={item.isNodeExecuting} animate:flip={{duration:flipDurationMs}}>
                    <svelte:self dragItem={item}/>
                    {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                        <div in:fade={{duration:200, easing: cubicIn}} class='drag-item-shadow'/>
                    {/if}
                </div>
            {/each}
        </div>
    </Block>
{:else if widget}
    <svelte:component this={getComponentForWidgetState(widget)} item={widget} />
    {#if $uiState.unlocked}
        <div class="handle" on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag} on:touchend={stopDrag}/>
    {/if}
{/if}

<style>
 .v-pane {
     height: 100%;
     width: 100%;
     overflow-y: auto ;
 }

 .is-executing :global(.block) {
     border: 5px dashed var(--color-green-600) !important;
 }

 .animation-wrapper {
     position: relative;
     width: 100%;
     height: 100%;
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
     z-index: var(--layer-1);
 }

 .edit-title {
     z-index: var(--layer-1);
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
