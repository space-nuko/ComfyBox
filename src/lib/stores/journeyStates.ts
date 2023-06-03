import { writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { DragItemID, IDragItem } from './layoutStates';
import type { LGraphNode, NodeID, UUID } from '@litegraph-ts/core';
import type { SerializedAppState } from '$lib/components/ComfyApp';
import type { RestoreParamTargets, RestoreParamWorkflowNodeTargets } from '$lib/restoreParameters';

export type JourneyNodeType = "root" | "patch";

export type JourneyNodeID = UUID;

export interface JourneyNode {
    id: JourneyNodeID,
    type: JourneyNodeType,
    children: JourneyPatchNode[]
}

export interface JourneyRootNode extends JourneyNode {
    type: "root"

    /*
     * This contains all the values of the workflow to set
     */
    base: RestoreParamWorkflowNodeTargets
}

export interface JourneyPatchNode extends JourneyNode {
    type: "patch"

    parent: JourneyNode,

    /*
     * This contains only the subset of parameters that were changed from the
     * parent
     */
    patch: RestoreParamWorkflowNodeTargets
}

export function resolvePatch(node: JourneyNode): RestoreParamWorkflowNodeTargets {
    if (node.type === "root") {
        return { ...(node as JourneyRootNode).base }
    }

    const patchNode = (node as JourneyPatchNode);
    const patch = { ...patchNode.patch };
    const base = resolvePatch(patchNode.parent);
    for (const [k, v] of Object.entries(patch)) {
        base[k] = v;
    }
    return base;
}

function diffParams(base: RestoreParamWorkflowNodeTargets, updated: RestoreParamWorkflowNodeTargets): RestoreParamWorkflowNodeTargets {
    const result = {}

    for (const [k, v] of Object.entries(updated)) {
        if (!(k in base) || base[k].finalValue !== v) {
            result[k] = v
        }
    }

    return result;
}

/*
 * A "journey" is like browser history for prompts, except organized in a
 * tree-like graph. It lets you save incremental changes to your workflow and
 * jump between past and present sets of parameters.
 */
export type JourneyState = {
    tree: JourneyNode,
    nodesByID: Record<JourneyNodeID, JourneyNode>
}

type JourneyStateOps = {
    clear: () => void,
}

export type WritableJourneyStateStore = Writable<JourneyState> & JourneyStateOps;

function create() {
    const store: Writable<JourneyState> = writable(
        {
        })

    function clear() {
        store.set({
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
