<script lang="ts">
 import queueState from "$lib/stores/queueState";
 import nodeState, { type WidgetUIState } from "$lib/stores/nodeState";
 import uiState from "$lib/stores/uiState";

 import layoutState, { type ContainerLayout, type WidgetLayout, type IDragItem } from "$lib/stores/layoutState";
 import { startDrag, stopDrag, getComponentForWidgetState } from "$lib/utils"
 import BlockContainer from "./BlockContainer.svelte"

 export let dragItem: IDragItem | null = null;
 export let zIndex: number = 0;
 export let classes: string[] = [];
 let container: ContainerLayout | null = null;
 let widget: WidgetLayout | null = null;
 let widgetState: WidgetUIState | null = null;
 let showHandles: boolean = false;

 $: if (!dragItem || !$layoutState.allItems[dragItem.id]) {
     dragItem = null;
     container = null;
     widget = null;
     widgetState = null;
 }
 else if (dragItem.type === "container") {
     container = dragItem as ContainerLayout;
     widget = null;
 }
 else if (dragItem.type === "widget") {
     widget = dragItem as WidgetLayout;
     widgetState = nodeState.findWidgetByName(widget.nodeId, widget.widgetName)
     container = null;
 }

 $: showHandles = $uiState.uiEditMode === "widgets" // TODO
               && zIndex > 1
               && !$layoutState.isMenuOpen


 $: if ($queueState && dragItem) {
     dragItem.isNodeExecuting = $queueState.runningNodeId === dragItem.nodeId;
 }
</script>


{#if container}
    <BlockContainer {container} {classes} {zIndex} {showHandles} />
{:else if widget}
    <div class="widget" class:widget-edit-outline={$uiState.uiEditMode === "widgets" && zIndex > 1}
        class:selected={$uiState.uiEditMode !== "disabled" && $layoutState.currentSelection.includes(widget.id)}
        class:is-executing={$queueState.runningNodeId && $queueState.runningNodeId == widget.attrs.associatedNode}
        >
        <svelte:component this={getComponentForWidgetState(widgetState)} item={widgetState} />
    </div>
    {#if showHandles}
        <div class="handle handle-widget" style="z-index: {zIndex+100}" data-drag-item-id={widget.id} on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag} on:touchend={stopDrag}/>
    {/if}
{/if}

<style lang="scss">
 .widget.selected {
     background: var(--color-yellow-200);
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

 .handle-widget:hover {
     background-color: #add8e680;
 }

 .node-type {
     font-size: smaller;
     color: var(--neutral-400);
 }

 .widget-edit-outline {
     border: 2px dashed var(--color-blue-400);
     margin: 0.2em;
     padding: 0.2em;
 }
</style>
