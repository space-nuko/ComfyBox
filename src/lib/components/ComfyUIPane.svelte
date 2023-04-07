<script lang="ts">
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
         dragItemss[0].push({ id: totalId++, node: node });
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

 .v-pane {
     border: 1px solid grey;
     float: left;
     height: 100%;
     overflow: auto;
     position: relative;
     width: 33%;
 }

 .handle {
     cursor: grab;
     position: absolute;
     right: 0;
     width: 1em;
     height: 1em;
     background-color: grey;
 }

 .wrapper {
     padding: 10px;
     width: 100%;
 }
</style>
