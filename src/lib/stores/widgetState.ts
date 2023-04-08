import { writable, get } from 'svelte/store';
import type { LGraph, LGraphNode, IWidget } from "@litegraph-ts/core";
import type { Readable, Writable } from 'svelte/store';
import type ComfyGraphNode from '$lib/nodes/ComfyGraphNode';
import type ComfyWidget from '$lib/widgets/ComfyWidget';

import { subStore } from "immer-loves-svelte"

/** store for one widget's state */
export type WidgetUIStateStore = Writable<any>

export type WidgetUIState = {
    /** position in the node's list of widgets */
    index: number,
    /** parent node containing the widget */
    node: LGraphNode,
    /** actual widget instance */
    widget: IWidget,
    /** widget value as a store, to react to changes */
    value: WidgetUIStateStore,
    /**
     * true if this widget was added purely from the frontend. what this means:
     * - this widget's state will not be saved to the workflow
     * - the widget was added on startup by some subclass of ComfyGraphNode
     */
    isVirtual: boolean
}

export type WidgetDrawState = {
    isNodeExecuting: boolean
}

type NodeID = number;

type WidgetStateOps = {
    nodeAdded: (node: LGraphNode) => void,
    nodeRemoved: (node: LGraphNode) => void,
    configureFinished: (graph: LGraph) => void,
    widgetStateChanged: (widget: ComfyWidget<any, any>) => void,
    clear: () => void,
}

export type WidgetStateStore = Record<NodeID, WidgetUIState[]>;
type WritableWidgetStateStore = Writable<WidgetStateStore> & WidgetStateOps;

const store: Writable<WidgetStateStore> = writable({})

function clear() {
    store.set({})
}

function nodeAdded(node: LGraphNode) {
    let state = get(store)

    if (node.widgets) {
        for (const widget of node.widgets) {
            if (!state[node.id])
                state[node.id] = []
            state[node.id].push({ node, widget, value: writable(widget.value), isVirtual: false })
        }
    }

    if ("virtualWidgets" in node) {
        const comfyNode = node as ComfyGraphNode;
        for (const widget of comfyNode.virtualWidgets) {
            if (!state[comfyNode.id])
                state[comfyNode.id] = []
            state[comfyNode.id].push({ node, widget, value: writable(widget.value), isVirtual: true })
        }
    }

    console.log("NODEADDED", state)

    store.set(state);
}

function nodeRemoved(node: LGraphNode) {
    const state = get(store)
    delete state[node.id]
    store.set(state)
}

function widgetStateChanged(widget: ComfyWidget<any, any>) {
    const state = get(store)
    const entries = state[widget.node.id]
    if (entries) {
        let widgetState = entries.find(e => e.widget === widget);
        if (widgetState) {
            widgetState.value.set(widget.value);
            store.set(state);
        }
        else {
            console.error("Widget state changed and node was found, but widget was not found in state!", widget, widget.node, entries)
        }
    }
    else {
        console.error("Widget state changed but node was not found in state!", widget, widget.node)
    }
}

function configureFinished(graph: LGraph) {
    let state = get(store);

    for (const node of graph.computeExecutionOrder(false, null)) {
        if (node.widgets_values) {
            for (const [i, value] of node.widgets_values.entries()) {
                if (i < state[node.id].length && !state[node.id][i].isVirtual) { // Virtual widgets always come after real widgets
                    state[node.id][i].value.set(value);
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

const widgetStateStore: WritableWidgetStateStore =
{
    ...store,
    nodeAdded,
    nodeRemoved,
    widgetStateChanged,
    configureFinished,
    clear
}
export default widgetStateStore;
