<script lang="ts">
 import { Block, BlockTitle } from "@gradio/atoms";
 import { Tabs, TabItem } from "@gradio/tabs";
 import uiState from "$lib/stores/uiState";
 import selectionState from "$lib/stores/selectionState";
 import WidgetContainer from "./WidgetContainer.svelte"

 import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';

 import {fade} from 'svelte/transition';
 // notice - fade in works fine but don't add svelte's fade-out (known issue)
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

 // let attrsChanged: Writable<number> = writable(0);
 let children: IDragItem[] = [];
 const flipDurationMs = 100;

 $: if (container) {
     children = $layoutState.allItems[container.id].children;
     // attrsChanged = container.attrsChanged
 }
 else {
     children = [];
     // attrsChanged = writable(0)
 }

 function handleConsider(evt: CustomEvent<DndEvent<IDragItem>>) {
     children = handleContainerConsider(layoutState, container, evt)
 };

 function handleFinalize(evt: CustomEvent<DndEvent<IDragItem>>) {
     children = handleContainerFinalize(layoutState, container, evt)
 };

 function getTabName(container: ContainerLayout, i: number): string {
     const title = container.attrs.title
     if (!title)
         return `Tab ${i+1}`

     const tabNames = title.split(",").map(s => s.trim());

     const tabName = tabNames[i]
     if (tabName == null || tabName === "")
         return `Tab ${i+1}`

     return tabName
 }

 function handleSelect() {
     navigator.vibrate(20)
 }

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
         class:edit={edit}>
        {#if edit}
            <Block>
                <div class="v-pane"
                     class:empty={children.length === 0}
                     class:edit={edit}
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
                    {#each children.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item, i(item.id)}
                        {@const hidden = isHidden(item)}
                        {@const tabName = getTabName(container, i)}
                        <div class="animation-wrapper"
                             class:hidden={hidden}
                             animate:flip={{duration:flipDurationMs}}
                             style={item?.attrs?.style || ""}>
                            <Block>
                                <label for={String(item.id)}>
                                    <BlockTitle><strong>Tab {i+1}:</strong> {tabName}</BlockTitle>
                                </label>
                                <WidgetContainer {layoutState} dragItem={item} zIndex={zIndex+1} {isMobile} />
                                {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                                    <div in:fade={{duration:200, easing: cubicIn}} class='drag-item-shadow'/>
                                {/if}
                            </Block>
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
        {:else}
            <Tabs elem_classes={["gradio-tabs"]} on:select={handleSelect}>
                {#each children.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item, i(item.id)}
                    {@const tabName = getTabName(container, i)}
                    <TabItem id={tabName} name={tabName}>
                        <WidgetContainer {layoutState} dragItem={item} zIndex={zIndex+1} {isMobile} />
                    </TabItem>
                {/each}
            </Tabs>
        {/if}
    </div>
{/if}

<style lang="scss">
 .container {
     display: flex;

     &.selected {
         background: var(--comfy-container-selected-background-fill) !important;
     }

     > :global(*) {
         border-radius: 0;
     }

     :global(.v-pane > .block) {
         height: fit-content;
     }

     .edit > :global(.v-pane > .block) {
         border-color: var(--color-pink-500);
         border-width: 2px;
         border-style: dashed !important;
         margin: 0.2em;
         padding: 1.4em;
     }

     /* :global(.hide-block > .v-pane > .block) {
        padding: 0.5em 0.25em;
        box-shadow: unset;
        border-width: 0;
        border-color: unset;
        border-radius: unset;
        background: var(--block-background-fill);
        width: 100%;
        line-height: var(--line-sm);
        } */

     &.horizontal {
         flex-wrap: wrap;
         gap: var(--layout-gap);
         width: var(--size-full);

         > :global(.block > .v-pane) {
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

         > :global(.block > .v-pane) {
             flex-direction: column;
         }

         > :global(*), > :global(.form > *), .v-pane {
             width: var(--size-full);
         }
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

 .animation-wrapper {
     position: relative;
     flex: 1 100 0%;
 }

 .handle-widget:hover {
     background-color: #add8e680;
 }

 .handle-container:hover {
     background-color: #d8ade680;
 }

 .container.selected > :global(.block) {
     background: var(--color-yellow-300);
 }
</style>
