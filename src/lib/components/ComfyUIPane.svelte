<script lang="ts">
 import { tick } from 'svelte'
 import { get } from "svelte/store";
 import { LGraphNode, LGraph } from "@litegraph-ts/core";
 import type { IWidget } from "@litegraph-ts/core";
 import ComfyApp  from "./ComfyApp";
 import type { SerializedPanes } from "./ComfyApp"
 import WidgetContainer from "./WidgetContainer.svelte";
 import nodeState from "$lib/stores/nodeState";
 import layoutState, { type ContainerLayout, type DragItem } from "$lib/stores/layoutState";
 import uiState from "$lib/stores/uiState";

 import Menu from './menu/Menu.svelte';
 import MenuOption from './menu/MenuOption.svelte';
 import MenuDivider from './menu/MenuDivider.svelte';
 import Icon from './menu/Icon.svelte'

 export let app: ComfyApp;
 let dragConfigured: boolean = false;
 //
 //  function addUIForNewNode(node: LGraphNode, paneIndex?: number) {
 //      if (!paneIndex)
 //          paneIndex = findLeastPopulatedPaneIndex();
 //      dragItems[paneIndex].push({ id: totalId++, node: node });
 //  }
 //
 //  $: if(app && !dragConfigured) {
 //      dragConfigured = true;
 //      app.eventBus.on("nodeAdded", addUIForNewNode);
 //  }

 /*
  * Serialize UI panel order so it can be restored when workflow is loaded
  */
 export function serialize(): any {
 }

 export function restore(panels: SerializedPanes) {
     const id = 0;
     $layoutState.root = layoutState.addContainer(null, { direction: "horizontal", showTitle: false });
     const left = layoutState.addContainer($layoutState.root.id, { direction: "vertical", showTitle: false });
     const right = layoutState.addContainer($layoutState.root.id, { direction: "vertical", showTitle: false });

     for (const node of app.lGraph.computeExecutionOrder(false, null)) {
         layoutState.nodeAdded(node)
     }
     console.warn($layoutState)
 }

 let menuPos = { x: 0, y: 0 };
 let showMenu = false;

 $: $layoutState.isMenuOpen = showMenu;

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
    <WidgetContainer bind:dragItem={$layoutState.root} classes={["root-container"]} />
</div>

{#if showMenu}
    <Menu {...menuPos} on:click={closeMenu} on:clickoutside={closeMenu}>
        <MenuOption
            on:click={console.log}
                     text="Do nothing" />
        <MenuOption
            on:click={console.log}
                     text="Do nothing, but twice" />
        <MenuDivider />
        <MenuOption
            isDisabled={true}
                       on:click={console.log}
                       text="Whoops, disabled!" />
        <MenuOption on:click={console.log}>
            <Icon />
            <span>Look! An icon!</span>
        </MenuOption>
    </Menu>
{/if}

<style lang="scss">
 #comfy-ui-panes {
     width: 100%;
     height: 100%;
     overflow: auto;
 }

</style>
