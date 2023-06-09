<script lang="ts">
 import { Block, BlockTitle } from "@gradio/atoms";
 import uiState from "$lib/stores/uiState";
 import selectionState from "$lib/stores/selectionState";
 import WidgetContainer from "./WidgetContainer.svelte"

 import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';

 import {fade} from 'svelte/transition';
 import {cubicIn} from 'svelte/easing';
 import { flip } from 'svelte/animate';
 import { type ContainerLayout, type WidgetLayout, type IDragItem, type WritableLayoutStateStore } from "$lib/stores/layoutStates";
 import { startDrag, stopDrag } from "$lib/utils"
 import type { Writable } from "svelte/store";
 import { isHidden } from "$lib/widgets/utils";
	import { handleContainerConsider, handleContainerFinalize } from "./utils";

 export let layoutState: WritableLayoutStateStore;
 export let container: ContainerLayout | null = null;
 export let zIndex: number = 0;
 export let classes: string[] = [];
 export let showHandles: boolean = false;
 export let edit: boolean = false;
 export let dragDisabled: boolean = false;
 export let isMobile: boolean = false;

 let attrsChanged: Writable<number> | null = null;
 let children: IDragItem[] = [];
 const flipDurationMs = 100;

 $: if (container) {
     const entry = $layoutState.allItems[container.id]
     if (entry) {
         children = $layoutState.allItems[container.id].children;
         attrsChanged = container.attrsChanged
     }
     else {
         container = null;
         children = [];
         attrsChanged = null;
     }
 }
 else {
     children = [];
     attrsChanged = null
 }

 function handleConsider(evt: CustomEvent<DndEvent<IDragItem>>) {
     children = handleContainerConsider(layoutState, container, evt);
 };

 function handleFinalize(evt: CustomEvent<DndEvent<IDragItem>>) {
     children = handleContainerFinalize(layoutState, container, evt);
 };

 function _startDrag(e: MouseEvent | TouchEvent) {
     startDrag(e, layoutState)
 }

 function _stopDrag(e: MouseEvent | TouchEvent) {
     stopDrag(e, layoutState)
 }
</script>

{#if container}
    {@const selected = $uiState.uiUnlocked && $selectionState.currentSelection.includes(container.id)}
    <div class="container {container.attrs.direction} {container.attrs.classes} {classes.join(' ')} z-index{zIndex}"
         class:hide-block={container.attrs.containerVariant === "hidden"}
         class:selected
         class:root-container={zIndex === 0}
         class:is-executing={container.isNodeExecuting}
         class:mobile={isMobile}
         class:edit>
        <Block>
            {#if container.attrs.title && container.attrs.title !== ""}
                <label for={String(container.id)} class={($uiState.uiUnlocked && $uiState.uiEditMode === "widgets") ? "edit-title-label" : ""}>
                    <BlockTitle>{container.attrs.title}</BlockTitle>
                </label>
            {/if}
            <div class="v-pane"
                 class:empty={children.length === 0}
                 class:edit
                 use:dndzone="{{
                      type: "layout",
                     items: children,
                     flipDurationMs,
                     centreDraggedOnCursor: true,
                     morphDisabled: true,
                     dropFromOthersDisabled: zIndex === 0,
                     dragDisabled
                              }}"
                 on:consider="{handleConsider}"
                 on:finalize="{handleFinalize}"
            >
                {#each children.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item(item.id)}
                    {@const hidden = isHidden(item) && !edit}
                    <div class="animation-wrapper"
                         class:edit
                         class:hidden={hidden}
                         animate:flip={{duration:flipDurationMs}}
                         style={item?.attrs?.style || ""}
                    >
                        <WidgetContainer {layoutState} dragItem={item} zIndex={zIndex+1} {isMobile} />
                        {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                            <div in:fade|global={{duration:200, easing: cubicIn}} class='drag-item-shadow'/>
                        {/if}
                    </div>
                {/each}
            </div>
            {#if isHidden(container) && edit}
                <div class="handle handle-hidden"
                     style:z-index={zIndex+100}
                     class:hidden={!edit} />
            {/if}
            {#if showHandles}
                <div class="handle handle-container"
                     style:z-index={zIndex+100}
                     data-drag-item-id={container.id}
                     on:mousedown={_startDrag}
                     on:touchstart={_startDrag}
                     on:mouseup={_stopDrag}
                     on:touchend={_stopDrag}/>
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
     flex: 1 1 0%;
     flex-wrap: wrap;

     .edit {
         min-width: 200px;
         margin: 0.2rem 0;
     }

     .animation-wrapper.hidden:not(.edit) {
         display: none;
     }

     &.empty {
         border-width: 3px;
         border-color: var(--comfy-container-empty-border-color);
         border-radius: 0;
         background: var(--comfy-container-empty-background-fill);
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

     &.selected {
         background: var(--comfy-container-selected-background-fill) !important;
     }

     > :global(*) {
         border-radius: 0;
     }

     > :global(.padded) {
         padding: 10px 12px 0px 10px;

         &:last-child {
             padding-bottom: 12px;
         }
     }

     > :global(.block) {
         height: fit-content;
     }

     .edit > :global(.block) {
         border-color: var(--color-pink-500);
         border-width: 2px;
         border-style: dashed !important;
         margin: 0.2em;
         padding: 1.4em;
     }

     > :global(.hide-block > .block) {
         padding: 0.5em 0.25em;
         box-shadow: unset;
         border-width: 0;
         border-color: unset;
         border-radius: unset;
         background: var(--block-background-fill);
         width: 100%;
         line-height: var(--line-sm);
     }

     &.horizontal {
         flex-wrap: wrap;
         gap: var(--layout-gap);
         width: var(--size-full);

         > :global(.block > .v-pane) {
             flex-direction: row;
         }
     }

     &.vertical {
         position: relative;

         > :global(.block > .v-pane) {
             flex-direction: column;
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

 .handle {
     cursor: grab;
     z-index: 99999;
     position: absolute;
     right: 0;
     top: 0;
     width: 100%;
     height: 100%;
 }

 .animation-wrapper {
     position: relative;
     flex-basis: 0%;
     flex-grow: 100;
     flex-shrink: 100;
 }

 .handle-hidden {
     background-color: #303030A0;
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

 .root-container > :global(.block) {
     padding: 0px;
 }
</style>
