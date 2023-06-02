<script context="module" lang="ts">
 export const GRAPH_STATE = {};

 export type GraphContext = {
     getCyInstance: () => cytoscape.Core
 }
</script>

<script lang="ts">
  import { onMount, setContext } from "svelte"
  import cytoscape from "cytoscape"
  import dagre from "cytoscape-dagre"
  import GraphStyles from "./GraphStyles"

 const graphContext: GraphContext = {
     getCyInstance: () => cyInstance
 }
 setContext(GRAPH_STATE, graphContext)

  let refElement = null
  let cyInstance: cytoscape.Core = null

  onMount(() => {
    cytoscape.use(dagre)

    cyInstance = cytoscape({
      container: refElement,
      style: GraphStyles,

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
  })

</script>

<div class="graph" bind:this={refElement}>
  {#if cyInstance}
    <slot></slot>
  {/if}
</div>

<style lang="scss">
 .graph {
     background: white;
     width: 100%;
     height: 100%;
 }
</style>
