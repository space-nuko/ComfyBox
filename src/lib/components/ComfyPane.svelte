<script lang="ts">
 import { onDestroy } from "svelte";
 import { get } from "svelte/store"
 import { Block, BlockTitle } from "@gradio/atoms";
 import { Move } from 'radix-icons-svelte';
 import ComboWidget from "$lib/widgets/ComboWidget.svelte";
 import RangeWidget from "$lib/widgets/RangeWidget.svelte";
 import TextWidget from "$lib/widgets/TextWidget.svelte";
 import widgetState, { type WidgetDrawState, type WidgetUIState } from "$lib/stores/widgetState";
 import queueState from "$lib/stores/queueState";

 import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

 import {fade} from 'svelte/transition';
 // notice - fade in works fine but don't add svelte's fade-out (known issue)
 import {cubicIn} from 'svelte/easing';
 import { flip } from 'svelte/animate';
	import ComfyApp from "./ComfyApp";
	import type { LGraphNode } from "@litegraph-ts/core";
	import type { DragItem } from "./ComfyUIPane";

 export let dragItems: DragItem[] = [];
 let dragDisabled = true;
 const flipDurationMs = 200;

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
     dragDisabled = false;
 };
 const stopDrag = () => {
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

 function getComponentForWidgetState(item: WidgetUIState): any {
     let ctor: any = null;

     // custom widgets with TypeScript sources
     if (item.isVirtual) {
         let override = ComfyApp.widget_type_overrides[item.widget.type]
         if (override) {
             return override;
         }
     }

     // litegraph.ts built-in widgets
     switch (item.widget.type) {
             case "combo":
             return ComboWidget;
             case "number":
             return RangeWidget;
             case "text":
             return TextWidget;
     }

     return null;
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
                <div class="handle" on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag} on:touchend={stopDrag}>
                    <Move/>
                </div>
                <label for={String(id)}>
                    <BlockTitle>{node.title}</BlockTitle>
                </label>
                {#each $widgetState[id] as item}
                    <svelte:component this={getComponentForWidgetState(item)} {item} />
                    {#if dragItem[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                        <div in:fade={{duration:200, easing: cubicIn}} class='drag-item-shadow'/>
                    {/if}
                {/each}
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
     position: absolute;
     top: 0;
     right: 0;
     width: 32px;
     height: 32px;
     padding: 0.5em;
     margin-right: 0.5em;
     margin-top: 0.25em;
 }

 .handle:hover {
     background-color: lightblue;
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
</style>
