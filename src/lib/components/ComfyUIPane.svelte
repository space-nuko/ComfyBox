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

 function groupWidgets() {
     const items = layoutState.getCurrentSelection()
     $layoutState.currentSelection = []
     layoutState.groupItems(items)
 }

 let canUngroup = false;
 let isDeleteGroup = false;
 $: canUngroup = $layoutState.currentSelection.length === 1
            && layoutState.getCurrentSelection()[0].type === "container"
 $: if (canUngroup) {
     const dragItem = layoutState.getCurrentSelection()[0];
     const entry = $layoutState.allItems[dragItem.id];
     isDeleteGroup = entry.children.length === 0
 }
 else {
     isDeleteGroup = false
 }

 function ungroup() {
     const item = layoutState.getCurrentSelection()[0]
     if (item.type !== "container")
         return;

     $layoutState.currentSelection = []
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
     if ($uiState.uiEditMode === "disabled")
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
            isDisabled={$layoutState.currentSelection.length === 0}
            on:click={groupWidgets}
            text="Group" />
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
