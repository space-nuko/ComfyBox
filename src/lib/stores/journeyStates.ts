import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { DragItemID, IDragItem } from './layoutStates';
import type { LGraphNode, NodeID, UUID } from '@litegraph-ts/core';
import type { SerializedAppState } from '$lib/components/ComfyApp';
import type { RestoreParamTargets, RestoreParamWorkflowNodeTargets } from '$lib/restoreParameters';
import { v4 as uuidv4 } from "uuid";

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

function calculatePatch(parent: JourneyNode, newParams: RestoreParamWorkflowNodeTargets): RestoreParamWorkflowNodeTargets {
    const patch = resolvePatch(parent);
    const diff = diffParams(patch, newParams)
    return diff;
}

/*
 * A "journey" is like browser history for prompts, except organized in a
 * tree-like graph. It lets you save incremental changes to your workflow and
 * jump between past and present sets of parameters.
 */
export type JourneyState = {
    root: JourneyRootNode | null,
    nodesByID: Record<JourneyNodeID, JourneyNode>,
    activeNodeID: JourneyNodeID | null,

    /*
     * Incremented when graph structure is updated
     */
    version: number
}

type JourneyStateOps = {
    clear: () => void,
    addNode: (params: RestoreParamWorkflowNodeTargets, parent?: JourneyNodeID) => JourneyNode,
    selectNode: (id?: JourneyNodeID) => void,
    iterateBreadthFirst: (id?: JourneyNodeID | null) => Iterable<JourneyNode>
}

export type WritableJourneyStateStore = Writable<JourneyState> & JourneyStateOps;

function create() {
    const store: Writable<JourneyState> = writable(
        {
            root: null,
            nodesByID: {},
            activeNodeID: null,
            version: 0
        })

    function clear() {
        store.set({
            root: null,
            nodesByID: {},
            activeNodeID: null,
            version: 0
        })
    }

    /*
     * params: full state of widgets in the UI
     * parent: parent node to patch against
     */
    function addNode(params: RestoreParamWorkflowNodeTargets, parent?: JourneyNodeID): JourneyNode {
        let _node: JourneyRootNode | JourneyPatchNode;
        store.update(s => {
            let parentNode: JourneyNode | null = null
            if (parent != null) {
                parentNode = s.nodesByID[parent];
                if (parentNode == null) {
                    throw new Error(`Could not find parent node ${parent} to insert into!`)
                }
            }
            if (parentNode == null) {
                _node = {
                    id: uuidv4(),
                    type: "root",
                    children: [],
                    base: { ...params }
                }
                s.root = _node
            }
            else {
                _node = {
                    id: uuidv4(),
                    type: "patch",
                    parent: parentNode,
                    children: [],
                    patch: calculatePatch(parentNode, params)
                }
                parentNode.children.push(_node);
            }
            s.nodesByID[_node.id] = _node;
            s.version += 1;
            return s;
        });
        return _node;
    }

    function selectNode(id?: JourneyNodeID) {
        store.update(s => {
            s.activeNodeID = id;
            return s;
        })
    }

    // function removeNode(id: JourneyNodeID) {
    //     store.update(s => {
    //         const node = s.nodesByID[id];
    //         if (node == null) {
    //             throw new Error(`Journey node not found: ${id}`)
    //         }

    //         if (node.type === "patch") {

    //         }
    //         else {
    //             s.root = null;
    //         }

    //         delete s.nodesByID[id];
    //         s.version += 1;

    //         return s;
    //     });
    // }

    function* iterateBreadthFirst(id?: JourneyNodeID | null): Iterable<JourneyNode> {
        const state = get(store);

        id ||= state.root?.id;
        if (id == null)
            return;

        const queue = [state.nodesByID[id]];
        while (queue.length > 0) {
            const node = queue.shift();
            yield node;
            if (node.children) {
                for (const child of node.children) {
                    queue.push(state.nodesByID[child.id]);
                }
            }
        }
    }

    return {
        ...store,
        clear,
        addNode,
        selectNode,
        iterateBreadthFirst
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
