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
         const item = $layoutState.allItems[$selectionState.currentSelection[0]].dragItem;
         canUngroup = item.type === "container"
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

     const item = $layoutState.allItems[$selectionState.currentSelection[0]].dragItem;
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
    <WidgetContainer bind:dragItem={root} classes={["root-container"]} />
</div>

{#if showMenu}
    <Menu {...menuPos} on:click={closeMenu} on:clickoutside={closeMenu}>
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
