<script lang="ts">
 import { onMount, getContext } from 'svelte'
 import { GRAPH_STATE, type GraphContext } from './Graph.svelte';

 export let edge

 const { getCyInstance } = getContext(GRAPH_STATE) as GraphContext;
 const cyInstance = getCyInstance()

 cyInstance.add({
     group: 'edges',
     id: edge.id,
     data: { ...edge }
 })
</script>
