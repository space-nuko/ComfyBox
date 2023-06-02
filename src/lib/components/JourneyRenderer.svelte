<script lang="ts">
 import type { WritableJourneyStateStore } from '$lib/stores/journeyStates';
 import { ComfyBoxWorkflow } from '$lib/stores/workflowState';
 import Graph from './graph/Graph.svelte'
 import type { NodeDataDefinition, EdgeDataDefinition } from 'cytoscape';
 import { NodeDataDefinition } from 'cytoscape';

 export let workflow: ComfyBoxWorkflow | null = null
 export let journey: WritableJourneyStateStore | null = ull

 const nodes: NodeDataDefinition[] = [
     { id: 'N1', label: 'Start' },
     { id: 'N2', label: '4' },
     { id: 'N4', label: '8' },
     { id: 'N5', label: '15' },
     { id: 'N3', label: '16' },
     { id: 'N6', label: '23' },
     { id: 'N7', label: '42' },
     { id: 'N8', label: 'End' }
 ]

 const edges: EdgeDataDefinition[] = [
     { id: 'E1', source: 'N1', target: 'N2' },
     { id: 'E2', source: 'N2', target: 'N3' },
     { id: 'E3', source: 'N3', target: 'N6' },
     { id: 'E4', source: 'N2', target: 'N4' },
     { id: 'E5', source: 'N4', target: 'N5' },
     { id: 'E6', source: 'N5', target: 'N4', label: '2' },
     { id: 'E7', source: 'N5', target: 'N6' },
     { id: 'E8', source: 'N6', target: 'N7' },
     { id: 'E9', source: 'N7', target: 'N7', label: '3' },
     { id: 'E10', source: 'N7', target: 'N8' }
 ]
</script>

{#if workflow && journey}
    <Graph {nodes} {edges} style="background: var(--neutral-900)" />
{/if}
