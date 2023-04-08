import type { LGraph } from "@litegraph-ts/core";
import widgetState, { type WidgetStateStore, type WidgetUIStateStore } from "./stores/widgetState";
import type ComfyApp from "./components/ComfyApp";
import type { Unsubscriber } from "svelte/store";

type WidgetSubStore = {
    store: WidgetUIStateStore,
    unsubscribe: Unsubscriber
}

/*
 * Responsible for watching and synchronizing state changes from the frontend to the litegraph instance.
 * The other way around is unnecessary since the nodes in ComfyBox can't be interacted with.
 *
 * Assumptions:
 * - Widgets can't be added to a node after they're created
 * - Widgets can't be interacted with from the graph, only from the frontend
 */
export default class GraphSync {
    graph: LGraph;
    private _unsubscribe: Unsubscriber;
    private _finalizer: FinalizationRegistry<number>;

    // nodeId -> widgetSubStores[]
    private stores: Record<string, WidgetSubStore[]> = {}

    constructor(app: ComfyApp) {
        this.graph = app.lGraph;
        this._unsubscribe = widgetState.subscribe(this.onWidgetStateChanged.bind(this));
        this._finalizer = new FinalizationRegistry((id: number) => {
            console.log(`${this} has been garbage collected`);
            this._unsubscribe();
        });
    }

    private onWidgetStateChanged(state: WidgetStateStore) {
        // TODO assumes only a single graph's widget state.

        console.warn("ONWIDGETSTATECHANGE")

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

    private addStores(state: WidgetStateStore, nodeId: string) {
        if (this.stores[nodeId]) {
            console.warn("Stores already exist!", nodeId, this.stores[nodeId])
        }

        this.stores[nodeId] = []

        for (const wuis of state[nodeId]) {
            const unsub = wuis.value.subscribe((v) => {
                console.log("CHANGE", v)
            })
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
}
