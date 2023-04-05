<script lang="ts">
 import { LGraphNode, LGraph } from "litegraph.js";
 import type { IWidget } from "litegraph.js";
 import ComfyApp from "./ComfyApp";
 import ComfyPane from "./ComfyPane.svelte";

 export let app: ComfyApp;

 let dragItems = [];

 export function clear() {
     nodes = {};
     items = {};
     state = {};
     dragItems = []
 }

 export function addNodeUI(node: LGraphNode) {
     if (node.widgets) {
         for (const [i, widget] of node.widgets.entries()) {
             if (!nodes[node.id]) {
                 dragItems.push({ id: node.id, node: node })
             }
             nodes[node.id] = node;

             node.onPropertyChanged = (k, v) => {
                 console.log("PROPCHANGE", k, v)
             };

             if (!items[node.id]) {
                 items[node.id] = []
             }
             items[node.id].push({ node, widget })

             if (!state[node.id]) {
                 state[node.id] = []
             }
             state[node.id].push(widget.value);
         }
     }

     nodes = nodes;
     items = items;
     state = state;
 }

 export function removeNodeUI(node: LGraphNode) {
     delete nodes[node.id]
     delete state[node.id]
     delete items[node.id]

     dragItems = Array.from(dragItems.filter(e => e.id != node.id));
     console.log("REM", node.id, dragItems)

     nodes = nodes;
     items = items;
     state = state;
 }

 export function configureFinished(graph: LGraph) {
     for (const node of graph.computeExecutionOrder(false, null)) {
         if (node.widgets_values) {
             for (const [j, value] of node.widgets_values.entries()) {
                 state[node.id][j] = value;
             }
         }
     }

     nodes = nodes;
     state = state;
 }

 export function getState() {
     return state;
 }

 let nodes: Record<number, LGraphNode> = {};
 let items: Record<number, { node: LGraphNode, widget: IWidget }[]> = {};
 let state: Record<number, any[]> = {};
</script>

<div id="comfy-ui-panes" >
    <ComfyPane {dragItems} {items} {state} />
    <ComfyPane {items} {state} />
    <ComfyPane {items} {state} />
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
     height: 0.5em;
     background-color: grey;
 }

 .wrapper {
     padding: 10px;
     width: 100%;
 }
</style>
