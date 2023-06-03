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
 import type { ElementDefinition } from "cytoscape";
 import { createEventDispatcher } from "svelte";

 export let nodes: ReadonlyArray<ElementDefinition>;
 export let edges: ReadonlyArray<ElementDefinition>;

 export let style: string = ""

 const dispatch = createEventDispatcher<{
     rebuilt: { cyto: cytoscape.Core };
 }>();

 $: if (nodes != null && edges != null && refElement != null) {
     rebuildGraph()
 }
 else {
     cyInstance = null;
 }

 function rebuildGraph() {
     cytoscape.use(dagre)
     cytoscape.warnings(false)

     cyInstance = cytoscape({
         container: refElement,
         style: GraphStyles,
         wheelSensitivity: 0.1,
         maxZoom: 3,
         minZoom: 0.5,
         selectionType: "single"
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

     // Prevents the unselection of nodes when clicking on the background
     cyInstance.on('click', (event) => {
         if (event.target === cyInstance) {
             // click on the background
             cyInstance.nodes(".historyNode").unselectify();
         } else {
             cyInstance.nodes(".historyNode").selectify();
         }
     });

     for (const node of nodes) {
         node.group = "nodes"
         cyInstance.add(node)
     }

     for (const edge of edges) {
         edge.group = "edges";
         console.warn(edge)
         cyInstance.add(edge)
     }

     dispatch("rebuilt", { cyto: cyInstance })
 }

 let refElement = null
 let cyInstance: cytoscape.Core = null
</script>

<div class="cy-graph" {style} bind:this={refElement} />

<style lang="scss">
 .cy-graph {
     background: white;
     width: 100%;
     height: 100%;
 }
</style>
