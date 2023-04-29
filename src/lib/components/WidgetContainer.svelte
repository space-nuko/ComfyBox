<script lang="ts">
 import { Block, BlockTitle } from "@gradio/atoms";
 import queueState from "$lib/stores/queueState";
 import nodeState, { type WidgetUIState } from "$lib/stores/nodeState";
 import uiState from "$lib/stores/uiState";

 import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';

 import {fade} from 'svelte/transition';
 // notice - fade in works fine but don't add svelte's fade-out (known issue)
 import {cubicIn} from 'svelte/easing';
 import { flip } from 'svelte/animate';
 import layoutState, { type ContainerLayout, type WidgetLayout, type IDragItem } from "$lib/stores/layoutState";
 import { getComponentForWidgetState } from "$lib/utils"

 export let dragItem: IDragItem | null = null;
 export let zIndex: number = 100;
 export let classes: string[] = [];
 let container: ContainerLayout | null = null;
 let widget: WidgetLayout | null = null;
 let widgetState: WidgetUIState | null = null;
 let children: IDragItem[] | null = null;
 let dragDisabled = true;
 const flipDurationMs = 200;

 $: if (dragItem) {
     if (dragItem.type === "container") {
         container = dragItem as ContainerLayout;
         children = $layoutState.allItems[dragItem.id].children;
         widget = null;
     }
     else if (dragItem.type === "widget") {
         widget = dragItem as WidgetLayout;
         widgetState = nodeState.findWidgetByName(widget.nodeId, widget.widgetName)
         children = null;
         container = null;
     }
 }

 $: dragDisabled = !$uiState.unlocked;

 function handleConsider(evt: any) {
     children = layoutState.updateChildren(dragItem, evt.detail.items)
     // console.log(dragItems);
 };

 function handleFinalize(evt: any) {
     children = layoutState.updateChildren(dragItem, evt.detail.items)
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

 $: if ($queueState && widget) {
     widget.isNodeExecuting = $queueState.runningNodeId === widget.nodeId;
     children = $layoutState.allItems[widget.id].children;
 }
</script>


{#if container && children}
    {@const id = container.id}
    <div class="container {container.attrs.direction} {container.attrs.classes} {classes.join(' ')}">
        <Block>
            {#if container.attrs.showTitle}
                <label for={String(id)} class={$uiState.unlocked ? "edit-title-label" : ""}>
                    <BlockTitle>
                        {#if $uiState.unlocked}
                            <input class="edit-title" bind:value={container.attrs.title} type="text" minlength="1" />
                        {:else}
                            {container.attrs.title}
                        {/if}
                    </BlockTitle>
                </label>
            {/if}
            <div class="v-pane"
                 class:empty={children.length === 0}
                 use:dndzone="{{ items: children, dragDisabled, flipDurationMs }}"
                 on:consider="{handleConsider}"
                 on:finalize="{handleFinalize}"
            >
                {#each children.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item(item.id)}
                    <div class="animation-wrapper" class:is-executing={item.isNodeExecuting} animate:flip={{duration:flipDurationMs}}>
                        <svelte:self dragItem={item} zIndex={zIndex+1} />
                        {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                            <div in:fade={{duration:200, easing: cubicIn}} class='drag-item-shadow'/>
                        {/if}
                    </div>
                {/each}
            </div>
            {#if $uiState.unlocked}
                <div class="handle handle-container" style="z-index: {zIndex}" on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag} on:touchend={stopDrag}/>
            {/if}
        </Block>
    </div>
{:else if widget}
    <svelte:component this={getComponentForWidgetState(widgetState)} item={widgetState} />
    {#if $uiState.unlocked}
        <div class="handle handle-widget" style="z-index: {zIndex}" on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag} on:touchend={stopDrag}/>
    {/if}
{/if}

<style lang="scss">
 .v-pane {
     height: 100%;
     width: 100%;
     overflow: visible;
     display: flex;

     &.empty {
         border-width: 3px;
         border-color: var(--color-grey-400);
         border-radius: var(--block-radius);
         background: var(--color-grey-300);
         min-height: 50px;
         border-style: dashed;
     }
 }

 .container {
     display: flex;

     :global(.block) {
         height: fit-content;
     }

     &.horizontal {
         flex-wrap: wrap;
         gap: var(--layout-gap);
         width: var(--size-full);

         .v-pane {
             flex-direction: row;
         }

         > :global(*), > :global(.form > *) {
             flex: 1 1 0%;
             flex-wrap: wrap;
             min-width: min(160px, 100%);
         }
     }

     &.vertical {
         position: relative;

         .v-pane {
             flex-direction: column;
         }

         > :global(*), > :global(.form > *), .v-pane {
             width: var(--size-full);
         }
     }
 }

 .is-executing :global(.block) {
     border: 5px dashed var(--color-green-600) !important;
 }

 .animation-wrapper {
     position: relative;
     flex-grow: 1;
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

 .handle-widget:hover {
     background-color: #add8e680;
 }

 .handle-container:hover {
     background-color: #d8ade680;
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
