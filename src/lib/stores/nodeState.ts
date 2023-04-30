import { writable, get } from 'svelte/store';
import type { LGraph, LGraphNode, IWidget } from "@litegraph-ts/core";
import type { Readable, Writable } from 'svelte/store';
import type ComfyGraphNode from '$lib/nodes/ComfyGraphNode';
import type ComfyWidget from '$lib/widgets/ComfyWidget';

/** store for one node's state */
export type NodeUIStateStore = Writable<any>

export type NodeUIState = {
    name: string,
    node: LGraphNode,
    widgetStates: WidgetUIState[]
}

export type WidgetDrawState = {
    isNodeExecuting: boolean
}

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

export type NodeID = number;

type NodeStateOps = {
    nodeAdded: (node: LGraphNode) => void,
    nodeRemoved: (node: LGraphNode) => void,
    configureFinished: (graph: LGraph) => void,
    nodeStateChanged: (node: LGraphNode) => void,
    widgetStateChanged: (nodeId: number, widget: IWidget<any, any>) => void,
    findWidgetByName: (nodeId: number, name: string) => WidgetUIState | null,
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

    const widgets = [];

    // if (node.widgets) {
    //     for (const [index, widget] of node.widgets.entries()) {
    //         let isVirtual = false;
    //         if ("isVirtual" in widget)
    //             isVirtual = (widget as ComfyWidget<any, any>).isVirtual;
    //         widgets.push({ index, widget, value: writable(widget.value), isVirtual: isVirtual })
    //     }
    // }

    state[node.id] = { node: node, name: node.title, widgetStates: widgets }
    store.set(state);

    console.debug("call nodeAdded", state[node.id])
}

function nodeRemoved(node: LGraphNode) {
    const state = get(store)
    delete state[node.id]
    store.set(state)
}

function nodeStateChanged(node: LGraphNode) {
    const state = get(store)
    const nodeState = state[node.id]
    nodeState.name = node.title
    store.set(state);
}

function configureFinished(graph: LGraph) {
    let state = get(store);

    for (const node of graph.computeExecutionOrder(false, null)) {
        state[node.id].name = node.title;

        // const widgetStates = state[node.id].widgetStates;
        // if (node.widgets_values) {
        //     for (const [i, value] of node.widgets_values.entries()) {
        //         if (i < widgetStates.length && !widgetStates[i].isVirtual) {
        //             widgetStates[i].value.set(value);
        //         }
        //         else {
        //             console.log("Skip virtual widget", node.id, node.type, widgetStates[i].widget)
        //         }
        //     }
        // }
    }

    store.set(state)
}

function widgetStateChanged(nodeId: number, widget: IWidget<any, any>) {
    const state = get(store)
    const entries = state[nodeId].widgetStates
    if (entries) {
        let widgetState = entries.find(e => e.widget === widget);
        if (widgetState) {
            widgetState.value.set(widget.value);
            store.set(state);
        }
        else {
            console.error("Widget state changed and node was found, but widget was not found in state!", widget, state[nodeId].node, entries)
        }
    }
    else {
        console.error("Widget state changed but node was not found in state!", widget, state[nodeId].node)
    }
}

function findWidgetByName(nodeId: NodeID, name: string): WidgetUIState | null {
    let state = get(store);

    if (!(nodeId in state))
        return null;

    return state[nodeId].widgetStates.find((v) => v.widget.name === name);
}

const nodeStateStore: WritableNodeStateStore =
{
    ...store,
    nodeAdded,
    nodeRemoved,
    nodeStateChanged,
    configureFinished,
    widgetStateChanged,
    findWidgetByName,
    clear
}
export default nodeStateStore;
