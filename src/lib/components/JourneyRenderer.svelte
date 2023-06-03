<script context="module" lang="ts">
 export type JourneyNodeEvent = {
     cyto: cytoscape.Core,
     node: cytoscape.NodeSingular
 }
</script>

<script lang="ts">
 import { resolvePatch, type JourneyNode, type JourneyPatchNode, type WritableJourneyStateStore } from '$lib/stores/journeyStates';
 import { ComfyBoxWorkflow } from '$lib/stores/workflowState';
 import { get } from 'svelte/store';
 import Graph from './graph/Graph.svelte'
 import type { NodeDataDefinition, EdgeDataDefinition } from 'cytoscape';
 import { createEventDispatcher } from "svelte";
 import selectionState from '$lib/stores/selectionState';
 import uiQueueState, { getQueueEntryImages } from '$lib/stores/uiQueueState';
 import queueState from '$lib/stores/queueState';
 import { convertComfyOutputToComfyURL, countNewLines } from '$lib/utils';
	import type { ElementDefinition } from 'cytoscape';
	import type { JourneyMode } from './ComfyJourneyView.svelte';
	import type { RestoreParamWorkflowNodeTargets } from '$lib/restoreParameters';

 export let workflow: ComfyBoxWorkflow | null = null
 export let journey: WritableJourneyStateStore | null = null
 export let mode: JourneyMode = "linear";

 const dispatch = createEventDispatcher<{
     select_node: JourneyNodeEvent;
     right_click_node: JourneyNodeEvent;
     hover_node: JourneyNodeEvent;
     hover_node_out: JourneyNodeEvent;
 }>();

 let lastMode = null;
 let lastVersion = -1;

 let nodes = []
 let edges = []
 $: if ($journey.version !== lastVersion || lastMode !== mode){
     [nodes, edges] = buildGraph(journey)
     lastVersion = $journey.version
     lastMode = mode;
 }

 function makePatchText(patch: RestoreParamWorkflowNodeTargets, prev: RestoreParamWorkflowNodeTargets): string {
     const lines = []

     let sorted = Array.from(Object.entries(patch))
     sorted.sort((a, b) => {
         return a[1].name > b[1].name ? 1 : -1
     })

     for (const [nodeID, source] of sorted) {
         let line = ""
         switch (source.nodeType) {
             case "ui/text":
                 line = `${source.name} (changed)`
                 break;
             default:
                 const prevValue = prev[nodeID];
                 let prevValueStr = "???"
                 if (prevValue)
                     prevValueStr = prevValue.finalValue
                 line = `${source.name}: ${prevValueStr} -> ${source.finalValue}`
                 break;
         }
         lines.push(line)
     }

     return lines.join("\n")
 }

 /*
  * Converts the journey tree into the renderable graph format Cytoscape expects
  */
 function buildGraph(journey: WritableJourneyStateStore | null): [ElementDefinition[], ElementDefinition[]] {
     if (!journey) {
         return [[], []]
     }

     let activeNode = journey.getActiveNode()

     const nodes: ElementDefinition[] = []
     const edges: ElementDefinition[] = []

     let iter: Iterable<JourneyNode> = [];
     if (mode === "linear") {
         if (activeNode != null)
             iter = journey.iterateLinearPath(activeNode.id);
     }
     else {
         iter = journey.iterateBreadthFirst();
     }

     const showPatches = mode === "linear";

     const memoize = {}

     for (const node of iter) {
         if (node.type === "root") {
             nodes.push({
                 data: {
                     id: node.id,
                     label: "Start",
                 },
                 classes: "historyNode"
             })
             continue;
         }
         else {
             const patchNode = node as JourneyPatchNode;
             nodes.push({
                 data: {
                     id: patchNode.id,
                     label: "P",
                 },
                 classes: "historyNode"
             })

             // Display a small node between with the patch details
             const midNodeID = `${patchNode.id}_patch`;

             console.debug("get", patchNode);

             if (showPatches) {
                 // show a node with the changes between gens
                 const prev = resolvePatch(patchNode.parent, memoize);
                 const patchText = makePatchText(patchNode.patch, prev);
                 const patchNodeHeight = countNewLines(patchText) * 11 + 22;

                 console.debug("[JourneyRenderer] Patch text", prev, patchText);

                 nodes.push({
                     data: {
                         id: midNodeID,
                         label: patchText,
                         patchNodeHeight
                     },
                     selectable: false,
                     classes: "patchNode"
                 })

                 edges.push({
                     data: {
                         id: `${patchNode.parent.id}_${midNodeID}`,
                         source: patchNode.parent.id,
                         target: midNodeID,
                     },
                     selectable: false,
                 })

                 edges.push({
                     data: {
                         id: `${midNodeID}_${patchNode.id}`,
                         source: midNodeID,
                         target: patchNode.id,
                     },
                     selectable: false,
                     locked: true
                 })
             }
             else {
                 edges.push({
                     data: {
                         id: `${patchNode.parent.id}_${patchNode.id}`,
                         source: patchNode.parent.id,
                         target: patchNode.id,
                     },
                     selectable: false,
                     locked: true
                 })
             }
         }
     }

     return [nodes, edges]
 }

 function onNodeSelected(e: cytoscape.InputEventObject) {
     console.warn("[JourneyNode] onNodeSelected", e)
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

 function onNodeRightClicked(e: cytoscape.InputEventObject) {
     const node = e.target as cytoscape.NodeSingular;
     dispatch("right_click_node", { cyto: e.cy, node })
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

     const activeNode = journey.getActiveNode();

     for (const node of cyto.nodes(".historyNode").components()) {
         const nodeID = node.id()
         if (nodeID === activeNode?.id) {
             node.select();
             cyto.zoom(1.25);
             cyto.center(node)
         }

         const journeyNode = $journey.nodesByID[nodeID]
         if (journeyNode) {
             if (journeyNode.promptID != null) {
                 const queueEntry = queueState.getQueueEntry(journeyNode.promptID)
                 if (queueEntry) {
                     const outputs = getQueueEntryImages(queueEntry);

                     if (outputs) {
                         node.data("bgImage", outputs[0]);
                     }
                 }
             }
         }
     }

     $selectionState.currentPatchHoveredNodes = new Set()

     cyto.nodes().lock()

     cyto.nodes(".historyNode")
         .on("select", onNodeSelected)
         .on("cxttapend ", onNodeRightClicked)
         .on("mouseout", onNodeHoveredOut)
         .on("mouseover", onNodeHovered)
 }
</script>

{#if workflow && journey}
    <Graph {nodes} {edges}
           style="background: var(--neutral-900)"
           on:rebuilt={onRebuilt}
    />
{/if}
