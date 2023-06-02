<script lang="ts">
 import { onMount, getContext } from 'svelte'
 import { GRAPH_STATE, type GraphContext } from './Graph.svelte';
 import type { EdgeDataDefinition } from 'cytoscape';

 export let edge: EdgeDataDefinition

 const { getCyInstance } = getContext(GRAPH_STATE) as GraphContext;
 const cyInstance = getCyInstance()

 cyInstance.add({
     group: 'edges',
     data: { ...edge }
 })
</script>
