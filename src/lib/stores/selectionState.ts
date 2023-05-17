import { writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { DragItemID, IDragItem } from './layoutState';
import type { LGraphNode, NodeID } from '@litegraph-ts/core';

export type SelectionState = {
    /*
     * Selected drag items.
     * NOTE: Order is important, for node grouping actions.
     */
    currentSelection: DragItemID[],

    /*
     * Hovered drag items.
     */
    currentHovered: Set<DragItemID>,

    /*
     * Selected LGraphNodes inside the litegraph canvas.
     * NOTE: Order is important, for node grouping actions.
     */
    currentSelectionNodes: LGraphNode[],

    /*
     * Currently hovered nodes.
     */
    currentHoveredNodes: Set<NodeID>
}

type SelectionStateOps = {
    clear: () => void,
}

export type WritableSelectionStateStore = Writable<SelectionState> & SelectionStateOps;
const store: Writable<SelectionState> = writable(
    {
        currentSelection: [],
        currentSelectionNodes: [],
        currentHovered: new Set(),
        currentHoveredNodes: new Set(),
    })

function clear() {
    store.set({
        currentSelection: [],
        currentSelectionNodes: [],
        currentHovered: new Set(),
        currentHoveredNodes: new Set(),
    })
}

const uiStateStore: WritableSelectionStateStore =
{
    ...store,
    clear
}
export default uiStateStore;
