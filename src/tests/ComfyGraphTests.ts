import { LGraph, LiteGraph, Subgraph, type SlotLayout } from "@litegraph-ts/core"
import { Watch } from "@litegraph-ts/nodes-basic"
import { expect } from 'vitest'
import UnitTest from "./UnitTest"
import ComfyGraph from "$lib/ComfyGraph";
import ComfyPromptSerializer from "$lib/components/ComfyPromptSerializer";
import { ComfyBackendNode } from "$lib/nodes/ComfyBackendNode";
import ComfyGraphNode from "$lib/nodes/ComfyGraphNode";
import { graphToGraphVis } from "$lib/utils";
import { ComfyNumberNode } from "$lib/nodes/widgets";
import { get } from "svelte/store";
import layoutStates from "$lib/stores/layoutStates";
import { ComfyBoxWorkflow } from "$lib/stores/workflowState";

export default class ComfyGraphTests extends UnitTest {
    test__onNodeAdded__updatesLayoutState() {
        const [{ graph }, layoutState] = ComfyBoxWorkflow.create()
        layoutState.initDefaultLayout() // adds 3 containers

        const state = get(layoutState)
        expect(Object.keys(state.allItems)).toHaveLength(3)
        expect(Object.keys(state.allItemsByNode)).toHaveLength(0)

        const widget = LiteGraph.createNode(ComfyNumberNode);
        graph.add(widget)

        expect(Object.keys(state.allItems)).toHaveLength(4)
        expect(Object.keys(state.allItemsByNode)).toHaveLength(1)
        expect(state.allItemsByNode[widget.id]).toBeTruthy();

        graph.add(widget)
    }

    test__correctSubgraphFactory() {
        const graph = new ComfyGraph();
        const subgraph = LiteGraph.createNode(Subgraph);
        graph.add(subgraph)
        expect(subgraph.graph).toBeInstanceOf(ComfyGraph)
    }

    test__onNodeAdded__handlesNodesAddedInSubgraphs() {
        const [{ graph }, layoutState] = ComfyBoxWorkflow.create()
        layoutState.initDefaultLayout()

        const subgraph = LiteGraph.createNode(Subgraph);
        graph.add(subgraph)

        const state = get(layoutState)
        expect(Object.keys(state.allItems)).toHaveLength(3)
        expect(Object.keys(state.allItemsByNode)).toHaveLength(0)

        const widget = LiteGraph.createNode(ComfyNumberNode);
        subgraph.subgraph.add(widget)

        expect(Object.keys(state.allItems)).toHaveLength(4)
        expect(Object.keys(state.allItemsByNode)).toHaveLength(1)
        expect(state.allItemsByNode[widget.id]).toBeTruthy();
    }

    test__onNodeAdded__handlesSubgraphsWithNodes() {
        const [{ graph }, layoutState] = ComfyBoxWorkflow.create()
        layoutState.initDefaultLayout()

        const state = get(layoutState)
        expect(Object.keys(state.allItems)).toHaveLength(3)
        expect(Object.keys(state.allItemsByNode)).toHaveLength(0)

        const subgraph = LiteGraph.createNode(Subgraph);
        const widget = LiteGraph.createNode(ComfyNumberNode);
        subgraph.subgraph.add(widget)
        graph.add(subgraph)

        expect(Object.keys(state.allItems)).toHaveLength(4)
        expect(Object.keys(state.allItemsByNode)).toHaveLength(1)
        expect(state.allItemsByNode[widget.id]).toBeTruthy();
    }

    test__onNodeRemoved__updatesLayoutState() {
        const [{ graph }, layoutState] = ComfyBoxWorkflow.create()
        layoutState.initDefaultLayout()

        const widget = LiteGraph.createNode(ComfyNumberNode);
        graph.add(widget)

        const state = get(layoutState)
        expect(Object.keys(state.allItems)).toHaveLength(4)
        expect(Object.keys(state.allItemsByNode)).toHaveLength(1)
        expect(state.allItemsByNode[widget.id]).toBeTruthy();

        graph.remove(widget)

        expect(Object.keys(state.allItems)).toHaveLength(3)
        expect(Object.keys(state.allItemsByNode)).toHaveLength(0)
    }
}
