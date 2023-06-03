<script lang="ts">
 import queueState from "$lib/stores/queueState";
 import uiState from "$lib/stores/uiState";

 import { type ContainerLayout, type WidgetLayout, type IDragItem, type WritableLayoutStateStore } from "$lib/stores/layoutStates";
 import selectionState from "$lib/stores/selectionState";
 import { startDrag, stopDrag } from "$lib/utils"
 import Container from "./Container.svelte"
 import { writable, type Writable } from "svelte/store"
 import type { ComfyWidgetNode } from "$lib/nodes/widgets";
 import { isHidden } from "$lib/widgets/utils";

 export let layoutState: WritableLayoutStateStore;
 export let dragItem: IDragItem | null = null;
 export let zIndex: number = 0;
 export let classes: string[] = [];
 export let isMobile: boolean = false;
 let container: ContainerLayout | null = null;
 let attrsChanged: Writable<number> = writable(0);
 let propsChanged: Writable<number> = writable(0);
 let widget: WidgetLayout | null = null;
 let showHandles: boolean = false;

 $: if (!dragItem || !$layoutState.allItems[dragItem.id]) {
     dragItem = null;
     container = null;
     widget = null;
     attrsChanged = writable(0);
     propsChanged = writable(0);
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
         propsChanged = writable(0);
 }

 $: showHandles = $uiState.uiUnlocked
               && $uiState.uiEditMode === "widgets" // TODO
               && zIndex > 1
               && !$layoutState.isMenuOpen


 $: if ($queueState && widget && widget.node) {
     dragItem.isNodeExecuting = $queueState.runningNodeID === widget.node.id;
 }

 function getWidgetClass() {
     const title = widget.node.type.replace("/", "-").replace(".", "-")
     return `widget--${title}`
 }

 function _startDrag(e: MouseEvent | TouchEvent) {
     startDrag(e, layoutState)
 }

 function _stopDrag(e: MouseEvent | TouchEvent) {
     stopDrag(e, layoutState)
 }
</script>


{#if container}
    <Container {layoutState} {container} {classes} {zIndex} {showHandles} {isMobile} />
{:else if widget && widget.node}
    {@const edit = $uiState.uiUnlocked && $uiState.uiEditMode === "widgets"}
    {@const hidden = isHidden(widget)}
    {@const hovered = $uiState.uiUnlocked && $selectionState.currentHovered.has(widget.id)}
    {@const selected = $uiState.uiUnlocked && $selectionState.currentSelection.includes(widget.id)}
    <div class="widget {widget.attrs.classes} {getWidgetClass()}"
         class:edit={edit}
         class:hovered
         class:selected
         class:patch-affected={$selectionState.currentPatchHoveredNodes.has(widget.node.id)}
         class:is-executing={$queueState.runningNodeID && $queueState.runningNodeID == widget.node.id}
         class:hidden={hidden}
    >
        <svelte:component this={widget.node.svelteComponentType} {widget} {isMobile} />
    </div>
    {#if hidden && edit}
        <div class="handle handle-hidden" class:hidden={!edit} />
    {/if}
    {#if showHandles || hovered}
        <div class="handle handle-widget"
             class:hovered
             data-drag-item-id={widget.id}
             on:mousedown={_startDrag}
             on:touchstart={_startDrag}
             on:mouseup={_stopDrag}
             on:touchend={_stopDrag}/>
    {/if}
{/if}

<style lang="scss">
 .widget {
     height: 100%;

     &.selected {
         background: var(--comfy-widget-selected-background-fill);
     }

     &.patch-affected {
         background: var(--secondary-500);
     }
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

 .handle-widget {
     &:hover, &.hovered {
         background-color: #add8e680;
     }
 }

 .node-type {
     font-size: smaller;
     color: var(--neutral-400);
 }

 .edit {
     border: 2px dashed var(--color-blue-400);
     pointer-events: none;
     user-select: none;
 }
</style>
