<script lang="ts">
 import type { JourneyPatchNode, WritableJourneyStateStore } from '$lib/stores/journeyStates';
 import { ComfyBoxWorkflow } from '$lib/stores/workflowState';
	import { get } from 'svelte/store';
 import Graph from './graph/Graph.svelte'
 import type { NodeDataDefinition, EdgeDataDefinition } from 'cytoscape';

 export let workflow: ComfyBoxWorkflow | null = null
 export let journey: WritableJourneyStateStore | null = null
 //
 //  const nodes: NodeDataDefinition[] = [
 //      //{ id: 'N1', label: 'Start' },
 //      //{ id: 'N2', label: '4' },
 //      //{ id: 'N4', label: '8' },
 //      //{ id: 'N5', label: '15' },
 //      //{ id: 'N3', label: '16' },
 //      //{ id: 'N6', label: '23' },
 //      //{ id: 'N7', label: '42' },
 //      //{ id: 'N8', label: 'End' }
 //  ]
 //
 //  const edges: EdgeDataDefinition[] = [
 //      //{ id: 'E1', source: 'N1', target: 'N2' },
 //      //{ id: 'E2', source: 'N2', target: 'N3' },
 //      //{ id: 'E3', source: 'N3', target: 'N6' },
 //      //{ id: 'E4', source: 'N2', target: 'N4' },
 //      //{ id: 'E5', source: 'N4', target: 'N5' },
 //      //{ id: 'E6', source: 'N5', target: 'N4', label: '2' },
 //      //{ id: 'E7', source: 'N5', target: 'N6' },
 //      //{ id: 'E8', source: 'N6', target: 'N7' },
 //      //{ id: 'E9', source: 'N7', target: 'N7', label: '3' },
 //      //{ id: 'E10', source: 'N7', target: 'N8' }
 //  ]


 let lastVersion = -1;

 let nodes = []
 let edges = []
 $: if ($journey.version !== lastVersion){
     [nodes, edges] = buildGraph(journey)
     lastVersion = $journey.version
 }

 function buildGraph(journey: WritableJourneyStateStore | null): [NodeDataDefinition[], EdgeDataDefinition[]] {
     if (!journey) {
         return [[], []]
     }

     const journeyState = get(journey);

     const nodes: NodeDataDefinition[] = []
     const edges: EdgeDataDefinition[] = []

     for (const node of journey.iterateBreadthFirst()) {
         if (node.type === "root") {
             nodes.push({
                 id: node.id,
                 label: "Start",
                 selected: node.id === journeyState.activeNodeID,
                 locked: true
             })
             continue;
         }
         else {
             const patchNode = node as JourneyPatchNode;
             nodes.push({
                 id: patchNode.id,
                 label: "N",
                 selected: node.id === journeyState.activeNodeID,
                 locked: true

             })
             edges.push({
                 id: `${patchNode.parent.id}_${patchNode.id}`,
                 source: patchNode.parent.id,
                 target: patchNode.id,
                 selectable: false,
                 locked: true
             })
         }
     }

     return [nodes, edges]
 }

 function onNodeSelected(e: cytoscape.InputEventObject) {
     console.warn("SELECT", e)
     const node = e.target;
     journey.selectNode(node.id());
     e.cy.center(node)
 }

 function onRebuilt(e: CustomEvent<{cyto: cytoscape.Core}>) {
     const { cyto } = e.detail;

     cyto.nodes()
         .lock()
         .on("select", onNodeSelected)

     const nodes = Array.from(journey.iterateBreadthFirst());
     if (nodes.length > 0) {
         const lastNode = nodes[nodes.length - 1]
         const start = cyto.$(`#${lastNode.id}`)
         cyto.center(start)
     }
 }
</script>

{#if workflow && journey}
    <Graph {nodes} {edges}
           style="background: var(--neutral-900)"
           on:rebuilt={onRebuilt}
    />
{/if}
