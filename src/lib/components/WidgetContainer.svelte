<script lang="ts">
 import queueState from "$lib/stores/queueState";
 import uiState from "$lib/stores/uiState";

 import layoutState, { type ContainerLayout, type WidgetLayout, type IDragItem } from "$lib/stores/layoutState";
 import { startDrag, stopDrag } from "$lib/utils"
 import Container from "./Container.svelte"
 import { type Writable } from "svelte/store"
 import type { ComfyWidgetNode } from "$lib/nodes";

 export let dragItem: IDragItem | null = null;
 export let zIndex: number = 0;
 export let classes: string[] = [];
 let container: ContainerLayout | null = null;
 let attrsChanged: Writable<boolean> | null = null;
 let propsChanged: Writable<number> | null = null;
 let widget: WidgetLayout | null = null;
 let showHandles: boolean = false;

 $: if (!dragItem || !$layoutState.allItems[dragItem.id]) {
     dragItem = null;
     container = null;
     widget = null;
     attrsChanged = null;
     propsChanged = null;
 }
 else if (dragItem.type === "container") {
     container = dragItem as ContainerLayout;
     attrsChanged = container.attrsChanged;
     widget = null;
     propsChanged = null;
 }
 else if (dragItem.type === "widget") {
     widget = dragItem as WidgetLayout;
     attrsChanged = widget.attrsChanged;
     container = null;
     if (widget.node && "propsChanged" in widget.node)
         propsChanged = (widget.node as ComfyWidgetNode).propsChanged
     else
         propsChanged = null;
 }

 $: showHandles = $uiState.uiUnlocked
               && $uiState.uiEditMode === "widgets" // TODO
               && zIndex > 1
               && !$layoutState.isMenuOpen


 $: if ($queueState && widget && widget.node) {
     dragItem.isNodeExecuting = $queueState.runningNodeId === widget.node.id;
 }

 function getWidgetClass() {
     const title = widget.node.type.replace("/", "-").replace(".", "-")
     return `widget--${title}`
 }
</script>


{#if container}
    {#key $attrsChanged}
        <Container {container} {classes} {zIndex} {showHandles} />
    {/key}
{:else if widget && widget.node}
    {@const edit = $uiState.uiUnlocked && $uiState.uiEditMode === "widgets" && zIndex > 1}
    {#key $attrsChanged}
        {#key $propsChanged}
            <div class="widget {widget.attrs.classes} {getWidgetClass()}"
                 class:edit={edit}
                class:selected={$uiState.uiUnlocked && $layoutState.currentSelection.includes(widget.id)}
                class:is-executing={$queueState.runningNodeId && $queueState.runningNodeId == widget.node.id}
                class:hidden={widget.attrs.hidden}
                >
                <svelte:component this={widget.node.svelteComponentType} {widget} />
            </div>
            {#if widget.attrs.hidden && edit}
                <div class="handle handle-hidden" class:hidden={!edit} style="z-index: {zIndex+100}"/>
            {/if}
            {#if showHandles}
                <div class="handle handle-widget" style="z-index: {zIndex+100}" data-drag-item-id={widget.id} on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag} on:touchend={stopDrag}/>
            {/if}
        {/key}
    {/key}
{/if}

<style lang="scss">
 .widget.selected {
     background: var(--color-yellow-200);
 }
 .container.selected {
     background: var(--color-yellow-400);
 }

 .is-executing {
     border: 3px dashed var(--color-green-600) !important;
     margin: 0.2em;
     padding: 0.2em;
 }

 .hidden:not(.edit) {
     display: none;
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

 .handle-hidden {
     background-color: #40404080;
 }

 .handle-widget:hover {
     background-color: #add8e680;
 }

 .node-type {
     font-size: smaller;
     color: var(--neutral-400);
 }

 .edit {
     border: 2px dashed var(--color-blue-400);
     margin: 0.2em;
     padding: 0.2em;
 }
</style>
