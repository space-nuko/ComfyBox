<script lang="ts">
 import { Block, BlockTitle } from "@gradio/atoms";
 import uiState from "$lib/stores/uiState";
 import WidgetContainer from "./WidgetContainer.svelte"

 import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';

 import {fade} from 'svelte/transition';
 // notice - fade in works fine but don't add svelte's fade-out (known issue)
 import {cubicIn} from 'svelte/easing';
 import { flip } from 'svelte/animate';
 import layoutState, { type ContainerLayout, type WidgetLayout, type IDragItem } from "$lib/stores/layoutState";
 import { startDrag, stopDrag } from "$lib/utils"

 export let container: ContainerLayout | null = null;
 export let zIndex: number = 0;
 export let classes: string[] = [];
 export let showHandles: boolean = false;
 let children: IDragItem[] | null = null;
 const flipDurationMs = 100;

 $: if (container) {
     children = $layoutState.allItems[container.id].children;
 }
 else {
     children = null;
 }

 function handleConsider(evt: any) {
     children = layoutState.updateChildren(container, evt.detail.items)
     // console.log(dragItems);
 };

 function handleFinalize(evt: any) {
     children = layoutState.updateChildren(container, evt.detail.items)
     // Ensure dragging is stopped on drag finish
 };
</script>

{#if container && children}
<div class="container {container.attrs.direction} {container.attrs.classes} {classes.join(' ')}"
     class:selected={$uiState.uiEditMode !== "disabled" && $layoutState.currentSelection.includes(container.id)}
     class:root-container={zIndex === 0}
     class:container-edit-outline={$uiState.uiEditMode === "widgets" && zIndex > 1}>
    <Block>
        {#if container.attrs.showTitle}
            <label for={String(container.id)} class={$uiState.uiEditMode === "widgets" ? "edit-title-label" : ""}>
                <BlockTitle>
                    {#if $uiState.uiEditMode === "widgets"}
                        <input class="edit-title" bind:value={container.attrs.title} type="text" minlength="1" />
                    {:else}
                        {container.attrs.title}
                    {/if}
                </BlockTitle>
            </label>
        {/if}
        <div class="v-pane"
             class:empty={children.length === 0}
             class:edit={$uiState.uiEditMode === "widgets" && zIndex > 1}
            use:dndzone="{{
                         items: children,
                         flipDurationMs,
                         centreDraggedOnCursor: true,
                         morphDisabled: true,
                         dropFromOthersDisabled: zIndex === 0,
                         dragDisabled: zIndex === 0 || $layoutState.currentSelection.length > 2 || $uiState.uiEditMode === "disabled"
                         }}"
            on:consider="{handleConsider}"
            on:finalize="{handleFinalize}"
            >
            {#each children.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item(item.id)}
                <div class="animation-wrapper"
                     class:is-executing={item.isNodeExecuting}
                     animate:flip={{duration:flipDurationMs}}>
                    <WidgetContainer dragItem={item} zIndex={zIndex+1} />
                    {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                        <div in:fade={{duration:200, easing: cubicIn}} class='drag-item-shadow'/>
                    {/if}
                </div>
            {/each}
        </div>
        {#if showHandles}
            <div class="handle handle-container" style="z-index: {zIndex+100}" data-drag-item-id={container.id} on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag} on:touchend={stopDrag}/>
        {/if}
    </Block>
</div>
{/if}

<style lang="scss">
 .v-pane {
     height: 100%;
     width: 100%;
     overflow: visible;
     display: flex;

     .edit {
         min-width: 200px;
     }

     &.empty {
         border-width: 3px;
         border-color: var(--color-grey-400);
         border-radius: var(--block-radius);
         background: var(--color-grey-300);
         min-height: 100px;
         border-style: dashed;
     }
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

 .container.selected > :global(.block) {
     background: var(--color-yellow-300);
 }

 .is-executing {
     border: 3px dashed var(--color-green-600) !important;
     margin: 0.2em;
     padding: 0.2em;
 }

 .animation-wrapper {
     position: relative;

     &:not(.edit) {
         flex-grow: 1;
     }
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
     z-index: 10000;
     position: relative;
 }

 .edit-title {
     z-index: 10000;
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

 .container-edit-outline > :global(.block) {
     border-color: var(--color-pink-500);
     border-width: 2px;
     border-style: dashed !important;
     margin: 0.2em;
     padding: 0.2em;
 }

 .widget-edit-outline {
     border: 2px dashed var(--color-blue-400);
     margin: 0.2em;
     padding: 0.2em;
 }

 .root-container > :global(.block) {
     padding: 0px;
 }
</style>
