<script lang="ts">
 import { get } from "svelte/store";
 import { LGraphNode, LGraph } from "@litegraph-ts/core";
 import type { IWidget } from "@litegraph-ts/core";
 import ComfyApp from "./ComfyApp";
 import ComfyPane from "./ComfyPane.svelte";
 import widgetState from "$lib/stores/widgetState";

 export let app: ComfyApp;
 let dragConfigured: boolean = false;
 export let dragItemss: any[][] = []

 export let totalId = 0;

 $: if(app && !dragConfigured) {
     dragConfigured = true;
     app.eventBus.on("nodeAdded", (node: LGraphNode) => {
         let minWidgetCount = 2 ** 64;
         let minIndex = 0;
         let state = get(widgetState);
         for (let i = 0; i < dragItemss.length; i++) {
             let widgetCount = 0;
             for (let j = 0; j < dragItemss[i].length; j++) {
                 const nodeID = dragItemss[i][j].node.id;
                 widgetCount += state[nodeID].length;
             }
             if (widgetCount < minWidgetCount) {
                 minWidgetCount = widgetCount
                 minIndex = i;
             }
         }
         dragItemss[minIndex].push({ id: totalId++, node: node });
     });
 }
</script>

<div id="comfy-ui-panes" >
    <ComfyPane bind:dragItems={dragItemss[0]} />
    <ComfyPane bind:dragItems={dragItemss[1]} />
    <ComfyPane bind:dragItems={dragItemss[2]} />
</div>

<style>
 #comfy-ui-panes {
     width: 100%;
     height: 100%;
 }
</style>
