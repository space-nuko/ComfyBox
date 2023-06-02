<script context="module" lang="ts">
 export const GRAPH_STATE = {};

 export type GraphContext = {
     getCyInstance: () => cytoscape.Core
 }
</script>

<script lang="ts">
 import cytoscape from "cytoscape"
 import dagre from "cytoscape-dagre"
 import GraphStyles from "./GraphStyles"
 import type { EdgeDataDefinition } from "cytoscape";
 import type { NodeDataDefinition } from "cytoscape";

 export let nodes: ReadonlyArray<NodeDataDefinition>;
 export let edges: ReadonlyArray<EdgeDataDefinition>;

 export let style: string = ""

 $: if (nodes != null && edges != null && refElement != null) {
     rebuildGraph()
 }
 else {
     cyInstance = null;
 }

 let _nodes: any[];
 let _edges: any[];

 function rebuildGraph() {
     cytoscape.use(dagre)

     cyInstance = cytoscape({
         container: refElement,
         style: GraphStyles,
         wheelSensitivity: 0.1,
     })

     cyInstance.on("add", () => {
         cyInstance
             .makeLayout({
                 name: "dagre",
                 rankDir: "TB",
                 nodeSep: 150
             })
             .run()
     })

     for (const node of nodes) {
         cyInstance.add({
             group: 'nodes',
             data: { ...node }
         })
     }

     for (const edge of edges) {
         cyInstance.add({
             group: 'edges',
             data: { ...edge }
         })
     }
 }

 let refElement = null
 let cyInstance: cytoscape.Core = null
</script>

<div class="cy-graph" {style} bind:this={refElement}>
</div>

<style lang="scss">
 .cy-graph {
     background: white;
     width: 100%;
     height: 100%;
 }
</style>
