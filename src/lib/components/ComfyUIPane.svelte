<script lang="ts">
 import { tick } from 'svelte'
 import { get } from "svelte/store";
 import { LGraphNode, LGraph } from "@litegraph-ts/core";
 import type { IWidget } from "@litegraph-ts/core";
 import ComfyApp  from "./ComfyApp";
 import type { SerializedPanes } from "./ComfyApp"
 import WidgetContainer from "./WidgetContainer.svelte";
 import layoutState, { type ContainerLayout, type DragItem, type IDragItem } from "$lib/stores/layoutState";
 import uiState from "$lib/stores/uiState";
 import selectionState from "$lib/stores/selectionState";
 import DropZone from "./DropZone.svelte";

 import Menu from './menu/Menu.svelte';
 import MenuOption from './menu/MenuOption.svelte';
 import MenuDivider from './menu/MenuDivider.svelte';
 import Icon from './menu/Icon.svelte'

 export let app: ComfyApp;
 let root: IDragItem | null;
 let dragConfigured: boolean = false;

 /*
  * Serialize UI panel order so it can be restored when workflow is loaded
  */
 export function serialize(): any {
     // TODO
 }

 export function restore(panels: SerializedPanes) {
     // TODO
 }

 function moveTo(delta: number | ((cur: number, total: number) => number)) {
     const dragItemID = $selectionState.currentSelection[0];
     const entry = $layoutState.allItems[dragItemID];
     if (!entry) {
         return
     }

     const dragItem = entry.dragItem;
     const containing = entry.parent
     if (containing == null || containing.type !== "container") {
         return
     }

     const containingEntry = $layoutState.allItems[containing.id];
     const oldIndex = containingEntry.children.findIndex(c => c.id === dragItem.id)
     if (oldIndex === -1) {
         return;
     }

     let newIndex: number;
     if (typeof delta === "number")
         newIndex = oldIndex + delta;
     else
         newIndex = delta(oldIndex, containingEntry.children.length);

     layoutState.moveItem(dragItem, containing as ContainerLayout, newIndex)
     $layoutState = $layoutState
 }

 function moveUp() {
     moveTo(-1)
 }

 function moveDown() {
     moveTo(1)
 }

 function sendToTop() {
     moveTo(() => 0)
 }

 function sendToBottom() {
     moveTo((cur: number, total: number) => total - 1)
 }

 function groupWidgets(horizontal: boolean) {
     const items = $selectionState.currentSelection
     $selectionState.currentSelection = []
     layoutState.groupItems(items, { direction: horizontal ? "horizontal" : "vertical" })
 }

 let canUngroup = false;
 let isDeleteGroup = false;
 $: {
     canUngroup = false;
     if ($selectionState.currentSelection.length === 1) {
         const entry = $layoutState.allItems[$selectionState.currentSelection[0]]
         if (entry != null) {
             const item = entry.dragItem;
             canUngroup = item.type === "container"
         }
     }
 }
 $: if (canUngroup) {
     const dragItemID = $selectionState.currentSelection[0];
     const entry = $layoutState.allItems[dragItemID];
     isDeleteGroup = entry.children.length === 0
 }
 else {
     isDeleteGroup = false
 }

 function ungroup() {
     const itemID = $selectionState.currentSelection[0]
     if (itemID == null)
         return;

     const entry = $layoutState.allItems[$selectionState.currentSelection[0]]
     if (entry == null)
         return

     const item = entry.dragItem;
     if(item.type !== "container")
         return

     $selectionState.currentSelection = []
     layoutState.ungroup(item as ContainerLayout)
 }

 let menuPos = { x: 0, y: 0 };
 let showMenu = false;

 $: $layoutState.isMenuOpen = showMenu;

 $: if ($layoutState.root) {
     root = $layoutState.root
 } else {
     root = null;
 }

 async function onRightClick(e) {
     if (!$uiState.uiUnlocked)
         return;

     e.preventDefault();
     if (showMenu) {
         showMenu = false;
         await new Promise(res => setTimeout(res, 100));
     }

     menuPos = { x: e.clientX, y: e.clientY };
     showMenu = true;
 }

 function closeMenu() {
     showMenu = false;
 }
</script>

<div id="comfy-ui-panes" on:contextmenu={onRightClick}>
    <DropZone {app} />
    <WidgetContainer bind:dragItem={root} classes={["root-container"]} />
</div>

{#if showMenu}
    <Menu {...menuPos} on:click={closeMenu} on:clickoutside={closeMenu}>
        <MenuOption
            isDisabled={$selectionState.currentSelection.length !== 1}
            on:click={() => moveUp()}
            text="Move Up" />
        <MenuOption
            isDisabled={$selectionState.currentSelection.length !== 1}
            on:click={() => moveDown()}
            text="Move Down" />
        <MenuOption
            isDisabled={$selectionState.currentSelection.length !== 1}
            on:click={() => sendToTop()}
            text="Send to Top" />
        <MenuOption
            isDisabled={$selectionState.currentSelection.length !== 1}
            on:click={() => sendToBottom()}
            text="Send to Bottom" />
        <MenuDivider/>
        <MenuOption
            isDisabled={$selectionState.currentSelection.length === 0}
            on:click={() => groupWidgets(false)}
            text="Group" />
        <MenuOption
            isDisabled={$selectionState.currentSelection.length === 0}
            on:click={() => groupWidgets(true)}
            text="Group Horizontally" />
        <MenuOption
            isDisabled={!canUngroup}
            on:click={ungroup}
            text={isDeleteGroup ? "Delete Group" : "Ungroup"} />
    </Menu>
{/if}

<style lang="scss">
 #comfy-ui-panes {
     width: 100%;
     height: 100%;
     overflow: auto;
 }

</style>
