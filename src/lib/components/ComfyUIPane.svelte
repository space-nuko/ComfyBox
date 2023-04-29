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
</script>

<div id="comfy-ui-panes" >
    <WidgetContainer bind:dragItem={$layoutState.root} classes={["root-container"]} />
</div>

<style lang="scss">
 #comfy-ui-panes {
     width: 100%;
     height: 100%;
     overflow: scroll;

 }

</style>
