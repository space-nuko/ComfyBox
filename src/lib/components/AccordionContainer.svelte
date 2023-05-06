<script lang="ts">
 import { Block, BlockTitle } from "@gradio/atoms";
 import { Accordion } from "@gradio/accordion";
 import uiState from "$lib/stores/uiState";
 import WidgetContainer from "./WidgetContainer.svelte"

 import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';

 import {fade} from 'svelte/transition';
 // notice - fade in works fine but don't add svelte's fade-out (known issue)
 import {cubicIn} from 'svelte/easing';
 import { flip } from 'svelte/animate';
 import layoutState, { type ContainerLayout, type WidgetLayout, type IDragItem } from "$lib/stores/layoutState";
 import { startDrag, stopDrag } from "$lib/utils"
 import type { Writable } from "svelte/store";

 export let container: ContainerLayout | null = null;
 export let zIndex: number = 0;
 export let classes: string[] = [];
 export let showHandles: boolean = false;
 export let edit: boolean = false;
 export let dragDisabled: boolean = false;

 let attrsChanged: Writable<boolean> | null = null;
 let children: IDragItem[] | null = null;
 const flipDurationMs = 100;

 let selectedIndex: number = 0;

 $: if (container) {
     children = $layoutState.allItems[container.id].children;
     attrsChanged = container.attrsChanged
 }
 else {
     children = null;
     attrsChanged = null
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
    <div class="container {container.attrs.direction} {container.attrs.classes} {classes.join(' ')} z-index{zIndex}"
         class:hide-block={container.attrs.blockVariant === "hidden"}
         class:selected={$uiState.uiUnlocked && $layoutState.currentSelection.includes(container.id)}
         class:root-container={zIndex === 0}
         class:is-executing={container.isNodeExecuting}
         class:edit={edit}>
        {#if edit}
            <Block>
                <Accordion label={container.attrs.title} open={true}>
                    <div class="v-pane"
                         class:empty={children.length === 0}
                         class:edit={edit}
                         use:dndzone="{{
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
                            {@const hidden = item?.attrs?.hidden}
                            <div class="animation-wrapper"
                                 class:hidden={hidden}
                                 animate:flip={{duration:flipDurationMs}}
                                 style={item?.attrs?.flexGrow ? `flex-grow: ${item.attrs.flexGrow}` : ""}
                            >
                                <WidgetContainer dragItem={item} zIndex={zIndex+1} />
                                {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                                    <div in:fade={{duration:200, easing: cubicIn}} class='drag-item-shadow'/>
                                {/if}
                            </div>
                        {/each}
                    </div>
                    {#if container.attrs.hidden && edit}
                        <div class="handle handle-hidden" class:hidden={!edit} style="z-index: {zIndex+100}"/>
                    {/if}
                    {#if showHandles}
                        <div class="handle handle-container" style="z-index: {zIndex+100}" data-drag-item-id={container.id} on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag} on:touchend={stopDrag}/>
                    {/if}
                </Accordion>
            </Block>
        {:else}
            <Block>
                <Accordion label={container.attrs.title} open={container.attrs.openOnStartup}>
                    {#each children.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item(item.id)}
                        <WidgetContainer dragItem={item} zIndex={zIndex+1} />
                    {/each}
                </Accordion>
            </Block>
        {/if}
    </div>
{/if}

<style lang="scss">
 .container {
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
     flex-grow: 100;
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