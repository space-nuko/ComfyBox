import { writable, get } from 'svelte/store';
import type { LGraph, LGraphNode, IWidget } from "@litegraph-ts/core";
import type { Readable, Writable } from 'svelte/store';

export type WidgetUIState = {
    node: LGraphNode,
    widget: IWidget,
    value: any
}

type NodeID = number;

type WidgetStateOps = {
    nodeAdded: (node: LGraphNode) => void,
    nodeRemoved: (node: LGraphNode) => void,
    configureFinished: (graph: LGraph) => void,
    clear: () => void,
}
type WidgetStateStore = Writable<Record<NodeID, WidgetUIState[]>> & WidgetStateOps;

const store: Writable<Record<NodeID, WidgetUIState[]>> = writable({})

function clear() {
    store.set({})
}

function nodeAdded(node: LGraphNode) {
    if (node.widgets) {
        let state = get(store)
        for (const widget of node.widgets) {
            if (!state[node.id])
                state[node.id] = []
            state[node.id].push({ node, widget, value: widget.value })
        }

        store.set(state);
    }
}

function nodeRemoved(node: LGraphNode) {
    let state = get(store)
    delete state[node.id]
    store.set(state)
}

function configureFinished(graph: LGraph) {
    let state = get(store);

    for (const node of graph.computeExecutionOrder(false, null)) {
        if (node.widgets_values) {
            for (const [i, value] of node.widgets_values.entries()) {
                if (i < state[node.id].length) {
                    state[node.id][i].value = value;
                }
                else {
                    console.error("Mismatch in widgets_values!", state[node.id].map(i => i.value), node.widgets_values)
                    break;
                }
            }
        }
    }

    store.set(state)
}

export default
    {
        ...store,
        nodeAdded,
        nodeRemoved,
        configureFinished,
        clear
    } as WidgetStateStore;
