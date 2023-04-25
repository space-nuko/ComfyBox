import { writable, get } from 'svelte/store';
import type { LGraph, LGraphNode } from "@litegraph-ts/core";
import type { Readable, Writable } from 'svelte/store';
import type ComfyGraphNode from '$lib/nodes/ComfyGraphNode';

/** store for one node's state */
export type NodeUIStateStore = Writable<any>

export type NodeUIState = {
    name: string,
    node: LGraphNode
}

type NodeID = number;

type NodeStateOps = {
    nodeAdded: (node: LGraphNode) => void,
    nodeRemoved: (node: LGraphNode) => void,
    configureFinished: (graph: LGraph) => void,
    nodeStateChanged: (node: LGraphNode) => void,
    clear: () => void,
}

export type NodeStateStore = Record<NodeID, NodeUIState>;
type WritableNodeStateStore = Writable<NodeStateStore> & NodeStateOps;

const store: Writable<NodeStateStore> = writable({})

function clear() {
    store.set({})
}

function nodeAdded(node: LGraphNode) {
    let state = get(store)
    state[node.id] = { node: node, name: node.name }
    store.set(state);
}

function nodeRemoved(node: LGraphNode) {
    const state = get(store)
    delete state[node.id]
    store.set(state)
}

function nodeStateChanged(node: LGraphNode) {
    const state = get(store)
    const nodeState = state[node.id]
    nodeState.name = node.name
    store.set(state);
}

function configureFinished(graph: LGraph) {
    let state = get(store);

    for (const node of graph.computeExecutionOrder(false, null)) {
        state[node.id].name = name;
    }

    store.set(state)
}

const nodeStateStore: WritableNodeStateStore =
{
    ...store,
    nodeAdded,
    nodeRemoved,
    nodeStateChanged,
    configureFinished,
    clear
}
export default nodeStateStore;
