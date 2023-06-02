import { writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { DragItemID, IDragItem } from './layoutStates';
import type { LGraphNode, NodeID } from '@litegraph-ts/core';

/*
 * A "journey" is like browser history for prompts, except organized in a
 * tree-like graph. It lets you save incremental changes to your workflow and
 * jump between past and present sets of parameters.
 */
export type JourneyState = {
    /*
     * Selected drag items.
     * NOTE: Order is important, for node grouping actions.
     */
    currentJourney: DragItemID[],

    /*
     * Hovered drag items.
     */
    currentHovered: Set<DragItemID>,

    /*
     * Selected LGraphNodes inside the litegraph canvas.
     * NOTE: Order is important, for node grouping actions.
     */
    currentJourneyNodes: LGraphNode[],

    /*
     * Currently hovered nodes.
     */
    currentHoveredNodes: Set<NodeID>
}

type JourneyStateOps = {
    clear: () => void,
}

export type WritableJourneyStateStore = Writable<JourneyState> & JourneyStateOps;

function create() {
    const store: Writable<JourneyState> = writable(
        {
            currentJourney: [],
            currentJourneyNodes: [],
            currentHovered: new Set(),
            currentHoveredNodes: new Set(),
        })

    function clear() {
        store.set({
            currentJourney: [],
            currentJourneyNodes: [],
            currentHovered: new Set(),
            currentHoveredNodes: new Set(),
        })
    }

    return {
        ...store,
        clear
    }
}

export type JourneyStateStaticOps = {
    create: () => WritableJourneyStateStore
}

// These will be attached to workflows.
const ops: JourneyStateStaticOps = {
    create
}

export default ops
