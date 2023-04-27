import { writable, get } from 'svelte/store';
import type { LGraph, LGraphNode, IWidget } from "@litegraph-ts/core";
import type { Readable, Writable } from 'svelte/store';
import type ComfyGraphNode from '$lib/nodes/ComfyGraphNode';
import type ComfyWidget from '$lib/widgets/ComfyWidget';

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
    widgetStateChanged: (nodeId: number, widget: IWidget<any, any>) => void,
    findWidgetByName: (nodeId: number, name: string) => WidgetUIState | null,
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
        for (const [index, widget] of node.widgets.entries()) {
            if (!state[node.id])
                state[node.id] = []
            let isVirtual = false;
            if ("isVirtual" in widget)
                isVirtual = (widget as ComfyWidget<any, any>).isVirtual;
            state[node.id].push({ index, node, widget, value: writable(widget.value), isVirtual: isVirtual })
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

function widgetStateChanged(nodeId: number, widget: IWidget<any, any>) {
    const state = get(store)
    const entries = state[nodeId]
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
                if (i < state[node.id].length && !state[node.id][i].isVirtual) {
                    state[node.id][i].value.set(value);
                }
                else {
                    console.log("Skip virtual widget", node.id, node.type, state[node.id][i].widget)
                }
            }
        }
    }

    store.set(state)
}

function findWidgetByName(nodeId: number, name: string): WidgetUIState | null {
    let state = get(store);

    if (!(nodeId in state))
        return null;

    return state[nodeId].find((v) => v.widget.name === name);
}

const widgetStateStore: WritableWidgetStateStore =
{
    ...store,
    nodeAdded,
    nodeRemoved,
    widgetStateChanged,
    configureFinished,
    findWidgetByName,
    clear
}
export default widgetStateStore;
