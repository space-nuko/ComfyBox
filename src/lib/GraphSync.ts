import type { LGraph } from "@litegraph-ts/core";
import widgetState, { type WidgetStateStore, type WidgetUIState, type WidgetUIStateStore } from "./stores/widgetState";
import nodeState, { type NodeStateStore, type NodeUIState, type NodeUIStateStore } from "./stores/nodeState";
import type ComfyApp from "./components/ComfyApp";
import type { Unsubscriber } from "svelte/store";

type WidgetSubStore = {
    store: WidgetUIStateStore,
    unsubscribe: Unsubscriber
}

type NodeSubStore = {
    store: NodeUIStateStore,
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
    private _unsubscribe: Unsubscriber;
    private _finalizer: FinalizationRegistry<number>;

    // nodeId -> widgetSubStores[]
    private stores: Record<string, WidgetSubStore[]> = {}

    constructor(app: ComfyApp) {
        this.graph = app.lGraph;
        this._unsubscribeWidget = widgetState.subscribe(this.onAllWidgetStateChanged.bind(this));
        this._unsubscribeNode = nodeState.subscribe(this.onAllNodeStateChanged.bind(this));
        this._finalizer = new FinalizationRegistry((id: number) => {
            console.log(`${this} has been garbage collected`);
            this._unsubscribeWidget();
            this._unsubscribeNode();
        });
    }

    /*
     * Fired when the entire widget graph changes.
     */
    private onAllWidgetStateChanged(state: WidgetStateStore) {
        // TODO assumes only a single graph's widget state.

        for (let nodeId in state) {
            if (!this.stores[nodeId]) {
                this.addStores(state, nodeId);
            }
        }

        for (let nodeId in this.stores) {
            if (!state[nodeId]) {
                this.removeStores(nodeId);
            }
        }
    }

    private onAllNodeStateChanged(state: NodeStateStore) {
        // TODO assumes only a single graph's widget state.

        for (let nodeId in state) {
            state[nodeId].node.name = state[nodeId].name;
        }

        this.graph.setDirtyCanvas(true, true);
    }

    private addStores(state: WidgetStateStore, nodeId: string) {
        if (this.stores[nodeId]) {
            console.warn("Stores already exist!", nodeId, this.stores[nodeId])
        }

        this.stores[nodeId] = []

        for (const wuis of state[nodeId]) {
            const unsub = wuis.value.subscribe((v) => this.onWidgetStateChanged(wuis, v))
            this.stores[nodeId].push({ store: wuis.value, unsubscribe: unsub });
        }

        console.log("NEWSTORES", this.stores[nodeId])
    }

    private removeStores(nodeId: string) {
        console.log("DELSTORES", this.stores[nodeId])
        for (const ss of this.stores[nodeId]) {
            ss.unsubscribe();
        }
        delete this.stores[nodeId]
    }

    /*
     * Fired when a single widget's value changes.
     */
    private onWidgetStateChanged(wuis: WidgetUIState, value: any) {
        wuis.widget.value = value;
        this.graph.setDirtyCanvas(true, true);
    }
}
