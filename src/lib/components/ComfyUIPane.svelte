<script lang="ts">
 import { get } from "svelte/store";
 import { LGraphNode, LGraph } from "@litegraph-ts/core";
 import type { IWidget } from "@litegraph-ts/core";
 import ComfyApp  from "./ComfyApp";
 import type { SerializedPanes } from "./ComfyApp"
 import ComfyPane from "./ComfyPane.svelte";
 import widgetState, { type WidgetUIState } from "$lib/stores/widgetState";
	import type { DragItem } from "./ComfyUIPane";

 export let app: ComfyApp;
 let dragConfigured: boolean = false;
 export let dragItems: DragItem[][] = []

 export let totalId = 0;

 function findLeastPopulatedPaneIndex(): number {
     let minWidgetCount = 2 ** 64;
     let minIndex = 0;
     let state = get(widgetState);
     for (let i = 0; i < dragItems.length; i++) {
         let widgetCount = 0;
         for (let j = 0; j < dragItems[i].length; j++) {
             const nodeID = dragItems[i][j].node.id;
             widgetCount += state[nodeID].length;
         }
         if (widgetCount < minWidgetCount) {
             minWidgetCount = widgetCount
             minIndex = i;
         }
     }
     return minIndex
 }

 function addUIForNewNode(node: LGraphNode, paneIndex?: number) {
     if (!paneIndex)
         paneIndex = findLeastPopulatedPaneIndex();
     dragItems[paneIndex].push({ id: totalId++, node: node });
 }

 $: if(app && !dragConfigured) {
     dragConfigured = true;
     app.eventBus.on("nodeAdded", addUIForNewNode);
 }

 /*
  * Serialize UI panel order so it can be restored when workflow is loaded
  */
 export function serialize(): any {
     let panels = []
     for (let i = 0; i < dragItems.length; i++) {
         panels[i] = [];
         for (let j = 0; j < dragItems[i].length; j++) {
             panels[i].push({ nodeId: dragItems[i][j].node.id });
         }
     }
     return {
         panels
     }
 }

 export function restore(panels: SerializedPanes) {
     let nodeIdToDragItem: Record<number, DragItem> = {};
     for (let i = 0; i < dragItems.length; i++) {
         for (const dragItem of dragItems[i]) {
             nodeIdToDragItem[dragItem.node.id] = dragItem
         }
     }

     for (let i = 0; i < panels.panels.length; i++) {
         dragItems[i].length = 0;
         for (const panel of panels.panels[i]) {
             const dragItem = nodeIdToDragItem[panel.nodeId];
             if (dragItem) {
                 delete nodeIdToDragItem[panel.nodeId];
                 dragItems[i].push(dragItem)
             }
         }
     }

     // Put everything left over into other columns
     if (Object.keys(nodeIdToDragItem).length > 0) {
         console.warn("Extra panels without ordering found", nodeIdToDragItem, panels)
         for (const nodeId in nodeIdToDragItem) {
             const dragItem = nodeIdToDragItem[nodeId];
             const paneIndex = findLeastPopulatedPaneIndex();
             dragItems[paneIndex].push(dragItem);
         }
     }
 }
</script>

<div id="comfy-ui-panes" >
    <ComfyPane bind:dragItems={dragItems[0]} />
    <ComfyPane bind:dragItems={dragItems[1]} />
    <ComfyPane bind:dragItems={dragItems[2]} />
</div>

<style>
 #comfy-ui-panes {
     width: 100%;
     height: 100%;
 }
</style>
