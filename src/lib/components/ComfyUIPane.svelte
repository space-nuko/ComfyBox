<script lang="ts">
 import { get } from "svelte/store";
 import { LGraphNode, LGraph } from "@litegraph-ts/core";
 import type { IWidget } from "@litegraph-ts/core";
 import ComfyApp  from "./ComfyApp";
 import type { SerializedPanes } from "./ComfyApp"
 import WidgetContainer from "./WidgetContainer.svelte";
 import nodeState from "$lib/stores/nodeState";
 import layoutState, { type ContainerLayout, type DragItem } from "$lib/stores/layoutState";

 export let app: ComfyApp;
 let dragConfigured: boolean = false;
 export let dragItems: DragItem[][] = []

 export let totalId = 0;
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
     const a: ContainerLayout = {
         type: "container",
         id: "0",
         attrs: {
             title: "root!",
             direction: "horizontal"
         }
     }
     $layoutState.root = a;
     $layoutState.children[0] = [
         {
             type: "widget",
             id: "1",
             nodeId: 7,
             widgetName: "text",
             attrs: {

             }
         },
         {
             type: "widget",
             id: "2",
             nodeId: 6,
             widgetName: "text",
             attrs: {

             }
         },
     ]
     $layoutState.children[1] = []
     $layoutState.children[2] = []
 }
</script>

<div id="comfy-ui-panes" >
    <WidgetContainer bind:dragItem={$layoutState.root} />
</div>

<style>
 #comfy-ui-panes {
     width: 100%;
     height: 100%;
     overflow: scroll;
 }
</style>
