<script lang="ts">
 import { onMount, getContext } from 'svelte'
 import { GRAPH_STATE, type GraphContext } from './Graph.svelte';
 import type { NodeDataDefinition } from 'cytoscape';

 export let node: NodeDataDefinition

 const { getCyInstance } = getContext(GRAPH_STATE) as GraphContext
 const cyInstance = getCyInstance()

 cyInstance.add({
     group: 'nodes',
     data: { ...node }
 })
</script>
