import type { LGraph, LGraphNode } from "@litegraph-ts/core";
import type ComfyApp from "./components/ComfyApp";
import type { Unsubscriber, Writable } from "svelte/store";
import type { ComfyWidgetNode } from "./nodes";
import type ComfyGraph from "./ComfyGraph";

type WidgetSubStore = {
    store: WidgetUIStateStore,
    unsubscribe: Unsubscriber
}

/*
 * Responsible for watching for and synchronizing state changes from the
 * frontend to the litegraph instance.
 *
 * The other way around is unnecessary since the nodes in ComfyBox can't be
 * interacted with. If that were true the implementation would be way more
 * complex since litegraph doesn't (currently) expose a global
 * event-emitter-like thing for when nodes/widgets are changed.
 *
 * Assumptions:
 * - Widgets can't be added to a node after they're created (messes up the indices in WidgetSubStore[])
 * - Widgets can't be interacted with from the graph, only from the frontend
 * - Only one workflow/graph can ever be loaded into the program
 */
export default class GraphSync {
    graph: LGraph;

    // nodeId -> widgetSubStore
    private stores: Record<string, WidgetSubStore> = {}

    constructor(graph: ComfyGraph) {
        this.graph = graph;
    }

    onNodeAdded(node: LGraphNode) {
        // TODO assumes only a single graph's widget state.

        if ("svelteComponentType" in node) {
            this.addStore(node as ComfyWidgetNode);
        }

        this.graph.setDirtyCanvas(true, true);
    }

    onNodeRemoved(node: LGraphNode) {
        if ("svelteComponentType" in node) {
            this.removeStore(node as ComfyWidgetNode);
        }

        this.graph.setDirtyCanvas(true, true);
    }

    private addStore(node: ComfyWidgetNode) {
        if (this.stores[node.id]) {
            console.warn("[GraphSync] Stores already exist!", node.id, this.stores[node.id])
        }

        const unsub = node.value.subscribe((v) => this.onWidgetStateChanged(node, v))
        this.stores[node.id] = ({ store: node.value, unsubscribe: unsub });

        console.debug("[GraphSync] NEWSTORE", this.stores[node.id])
    }

    private removeStore(node: ComfyWidgetNode) {
        console.debug("[GraphSync] DELSTORE", this.stores[node.id])
        this.stores[node.id].unsubscribe()
        delete this.stores[node.id]
    }

    /*
     * Fired when a single widget's value changes.
     */
    private onWidgetStateChanged(node: ComfyWidgetNode, value: any) {
        this.graph.setDirtyCanvas(true, true);
    }
}
