import type { LGraph } from "@litegraph-ts/core";
import nodeState, { type WidgetUIState, type WidgetUIStateStore,  type NodeStateStore, type NodeUIState, type NodeUIStateStore } from "./stores/nodeState";
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
        this._unsubscribe = nodeState.subscribe(this.onAllNodeStateChanged.bind(this));
        this._finalizer = new FinalizationRegistry((id: number) => {
            console.log(`${this} has been garbage collected`);
            this._unsubscribe();
        });
    }

    private onAllNodeStateChanged(state: NodeStateStore) {
        // TODO assumes only a single graph's widget state.

        for (let nodeId in state) {
            state[nodeId].node.title = state[nodeId].name;
            if (!this.stores[nodeId]) {
                this.addStores(state[nodeId].widgetStates, nodeId);
            }
        }

        for (let nodeId in this.stores) {
            if (!state[nodeId]) {
                this.removeStores(nodeId);
            }
        }

        this.graph.setDirtyCanvas(true, true);
    }

    private addStores(widgetStates: WidgetUIState[], nodeId: string) {
        if (this.stores[nodeId]) {
            console.warn("Stores already exist!", nodeId, this.stores[nodeId])
        }

        this.stores[nodeId] = []

        for (const wuis of widgetStates) {
            const unsub = wuis.value.subscribe((v) => this.onWidgetStateChanged(wuis, v))
            this.stores[nodeId].push({ store: wuis.value, unsubscribe: unsub });
        }

        console.debug("NEWSTORES", this.stores[nodeId])
    }

    private removeStores(nodeId: string) {
        console.debug("DELSTORES", this.stores[nodeId])
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
