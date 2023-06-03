<script lang="ts">
 import type { JourneyPatchNode, WritableJourneyStateStore } from '$lib/stores/journeyStates';
 import { ComfyBoxWorkflow } from '$lib/stores/workflowState';
	import { get } from 'svelte/store';
 import Graph from './graph/Graph.svelte'
 import type { NodeDataDefinition, EdgeDataDefinition } from 'cytoscape';
 import { createEventDispatcher } from "svelte";
	import selectionState from '$lib/stores/selectionState';
	import uiQueueState from '$lib/stores/uiQueueState';

 export let workflow: ComfyBoxWorkflow | null = null
 export let journey: WritableJourneyStateStore | null = null

 const dispatch = createEventDispatcher<{
     select_node: { cyto: cytoscape.Core, node: cytoscape.NodeSingular };
     hover_node: { cyto: cytoscape.Core, node: cytoscape.NodeSingular };
     hover_node_out: { cyto: cytoscape.Core, node: cytoscape.NodeSingular };
 }>();

 let lastSelected = null;

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
     lastSelected = journeyState.activeNodeID;

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
                 label: "P",
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
     const node = e.target as cytoscape.NodeSingular;
     journey.selectNode(node.id());

     e.cy.animate({
         center: { eles: node }
     }, {
         duration: 400,
         easing: "ease-in-out-quad"
     });

     e.cy.center(node)

     dispatch("select_node", { cyto: e.cy, node })
 }

 function onNodeHovered(e: cytoscape.InputEventObject) {
     const node = e.target as cytoscape.NodeSingular;
     dispatch("hover_node", { cyto: e.cy, node })
 }

 function onNodeHoveredOut(e: cytoscape.InputEventObject) {
     const node = e.target as cytoscape.NodeSingular;
     dispatch("hover_node_out", { cyto: e.cy, node })
 }

 function onRebuilt(e: CustomEvent<{cyto: cytoscape.Core}>) {
     const { cyto } = e.detail;

     for (const node of cyto.nodes().components()) {
         const nodeID = node.id()
         if (nodeID === lastSelected) {
             // why doesn't passing `selected` work in the ctor?
             node.select();
             cyto.zoom(1.25);
             cyto.center(node)
         }

         const journeyNode = $journey.nodesByID[nodeID]
         if (journeyNode) {
             if (journeyNode.promptID != null) {
                 const queueEntry = $uiQueueState.historyUIEntries.find(e => e.entry.promptID === journeyNode.promptID)
                 if (queueEntry != null && queueEntry.images) {
                     node.data("bgImage", queueEntry.images[0]);
                 }
             }
         }
     }

     $selectionState.currentPatchHoveredNodes = new Set()

     cyto.nodes()
         .lock()
         .on("select", onNodeSelected)
         .on("mouseover", onNodeHovered)
         .on("mouseout", onNodeHoveredOut)
 }
</script>

{#if workflow && journey}
    <Graph {nodes} {edges}
           style="background: var(--neutral-900)"
           on:rebuilt={onRebuilt}
    />
{/if}
