import ComfyGraph from "$lib/ComfyGraph";
import { ComfyNumberNode } from "$lib/nodes/widgets";
import { ComfyBoxWorkflow } from "$lib/stores/workflowState";
import { LiteGraph, Subgraph } from "@litegraph-ts/core";
import { get } from "svelte/store";
import { expect } from 'vitest';
import UnitTest from "./UnitTest";
import { Watch } from "@litegraph-ts/nodes-basic";

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

    test__serialize__stripsLinkData() {
        const [{ graph }, layoutState] = ComfyBoxWorkflow.create()
        layoutState.initDefaultLayout()

        const widget = LiteGraph.createNode(ComfyNumberNode);
        const watch = LiteGraph.createNode(Watch);
        graph.add(widget)
        graph.add(watch)

        widget.connect(0, watch, 0)
        const link = widget.getOutputLinks(0)[0]
        widget.setOutputData(0, 42);

        const result = graph.serialize();

        const serNode = result.nodes.find(n => n.id === widget.id);

        expect(serNode.outputs[0]._data).toBeUndefined()
    }
}
