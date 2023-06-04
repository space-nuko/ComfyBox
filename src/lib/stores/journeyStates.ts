import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import { isComfyWidgetNode, type DragItemID, type IDragItem } from './layoutStates';
import { LiteGraph, type LGraphNode, type NodeID, type UUID } from '@litegraph-ts/core';
import type { SerializedAppState } from '$lib/components/ComfyApp';
import { getWorkflowRestoreParamsFromWorkflow, type RestoreParamSourceWorkflowNode, type RestoreParamTargets, type RestoreParamWorkflowNodeTargets } from '$lib/restoreParameters';
import { v4 as uuidv4 } from "uuid";
import deepEqual from "deep-equal";
import notify from '$lib/notify';
import type { ComfyBoxWorkflow } from './workflowState';
import type { ComfyNodeID, PromptID } from '$lib/api';
import type { SerializedPromptOutput } from '$lib/utils';
import type { QueueEntry } from './queueState';

export type JourneyNodeType = "root" | "patch";

export type JourneyNodeID = UUID;

export interface JourneyNode {
    id: JourneyNodeID,
    type: JourneyNodeType,
    children: JourneyPatchNode[],
    promptIDs: Set<PromptID>,
    images?: string[]
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

function isRoot(node: JourneyNode): node is JourneyRootNode {
    return node.type === "root";
}

function isPatch(node: JourneyNode): node is JourneyPatchNode {
    return node.type === "patch";
}

export function resolvePatch(node: JourneyNode, memoize?: Record<JourneyNodeID, RestoreParamWorkflowNodeTargets>): RestoreParamWorkflowNodeTargets {
    if (node.type === "root") {
        return { ...(node as JourneyRootNode).base }
    }

    if (memoize && memoize[node.id] != null)
        return { ...memoize[node.id] }

    const patchNode = (node as JourneyPatchNode);
    const patch = { ...patchNode.patch };
    const base = resolvePatch(patchNode.parent);
    for (const [k, v] of Object.entries(patch)) {
        base[k] = v;
    }

    if (memoize) {
        memoize[node.id] = base;
    }

    return base;
}

export function diffParams(base: RestoreParamWorkflowNodeTargets, updated: RestoreParamWorkflowNodeTargets): RestoreParamWorkflowNodeTargets {
    const result = {}

    for (const [k, v] of Object.entries(updated)) {
        if (!(k in base) || !deepEqual(base[k].finalValue, v.finalValue, { strict: true })) {
            result[k] = v
        }
    }

    return result;
}

export function calculateWorkflowParamsPatch(parent: JourneyNode, newParams: RestoreParamWorkflowNodeTargets): RestoreParamWorkflowNodeTargets {
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
    nodesByPromptID: Record<PromptID, JourneyNode>,
    activeNodeID: JourneyNodeID | null,

    /*
     * Incremented when graph structure is updated
     */
    version: number
}

type JourneyStateOps = {
    clear: () => void,
    getActiveNode: () => JourneyNode | null,
    // addNode: (params: RestoreParamWorkflowNodeTargets, parent?: JourneyNodeID | JourneyNode) => JourneyNode,
    selectNode: (id?: JourneyNodeID | JourneyNode) => void,
    iterateBreadthFirst: (id?: JourneyNodeID | null) => Iterable<JourneyNode>,
    iterateLinearPath: (id: JourneyNodeID) => Iterable<JourneyNode>,
    pushPatchOntoActive: (workflow: ComfyBoxWorkflow, activeNode?: JourneyNode, showNotification?: boolean) => JourneyNode | null
    afterQueued: (journeyNode: JourneyNode, promptID: PromptID) => void,
    onExecuted: (promptID: PromptID, nodeID: ComfyNodeID, output: SerializedPromptOutput, queueEntry: QueueEntry) => void
}

export type WritableJourneyStateStore = Writable<JourneyState> & JourneyStateOps;

function create() {
    const store: Writable<JourneyState> = writable(
        {
            root: null,
            nodesByID: {},
            nodesByPromptID: {},
            activeNodeID: null,
            version: 0
        })

    function clear() {
        store.set({
            root: null,
            nodesByID: {},
            nodesByPromptID: {},
            activeNodeID: null,
            version: 0
        })
    }

    function getActiveNode(): JourneyNode | null {
        const state = get(store)
        if (state.activeNodeID === null)
            return null;
        const active = state.nodesByID[state.activeNodeID]
        if (active == null) {
            console.error("[journeyStates] Active node not found in graph!", state.activeNodeID);
        }
        return active;
    }

    /*
     * params: full state or state patch of widgets in the UI
     * parent: parent node to patch against
     */
    function addNode(params: RestoreParamWorkflowNodeTargets, parent?: JourneyNodeID | JourneyNode): JourneyNode {
        let _node: JourneyRootNode | JourneyPatchNode;

        store.update(s => {
            let parentNode: JourneyNode | null = null
            if (parent != null) {
                if (typeof parent === "object")
                    parent = parent.id;
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
                    promptIDs: new Set(),
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
                    promptIDs: new Set(),
                    patch: params,
                }
                parentNode.children.push(_node);
            }
            s.nodesByID[_node.id] = _node;
            s.version += 1;
            return s;
        });
        return _node;
    }

    function pushPatchOntoActive(workflow: ComfyBoxWorkflow, activeNode?: JourneyNode, showNotification: boolean = false): JourneyNode | null {
        const workflowParams = getWorkflowRestoreParamsFromWorkflow(workflow)

        let journeyNode

        if (activeNode == null) {
            // add root node
            if (get(store).root != null) {
                console.debug("[journeyStates] Root already exists")
                return null;
            }
            journeyNode = addNode(workflowParams, null);
            if (showNotification)
                notify("Pushed a new base workflow state.", { type: "info" })
        }
        else {
            // add patch node
            const patch = calculateWorkflowParamsPatch(activeNode, workflowParams);
            const patchedCount = Object.keys(patch).length;
            if (patchedCount === 0) {
                console.debug("[journeyStates] Patch had no diff")
                if (showNotification)
                    notify("No changes were made to active parameters yet.", { type: "warning" })
                return null;
            }
            journeyNode = addNode(patch, activeNode);
            if (showNotification)
                notify(`Pushed new state with ${patchedCount} changes.`, { type: "info" })
        }

        if (journeyNode != null) {
            selectNode(journeyNode);
        }

        console.debug("[journeyStates] added node", journeyNode)
        return journeyNode;
    }

    function selectNode(obj?: JourneyNodeID | JourneyNode) {
        store.update(s => {
            if (typeof obj === "string")
                s.activeNodeID = obj;
            else
                s.activeNodeID = obj.id;
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

    function* iterateNodeParents(node: JourneyNode): Iterable<JourneyNode> {
        while (isPatch(node)) {
            yield node.parent;
            node = node.parent;
        }
    }

    function iterateLinearPath(id: JourneyNodeID): Iterable<JourneyNode> {
        const state = get(store);

        const node = state.nodesByID[id];
        if (node == null) {
            console.error("[journeyStates] Journey node not found!", id);
            return
        }

        let path = Array.from(iterateNodeParents(node)).reverse()
        path.push(node)

        // pick first child for nodes downstream
        let child = node.children[0]
        while (child != null) {
            path.push(child);
            child = child.children[0];
        }

        return path;
    }

    function afterQueued(journeyNode: JourneyNode, promptID: PromptID) {
        journeyNode.promptIDs.add(promptID);
        store.update(s => {
            s.nodesByPromptID[promptID] = journeyNode;
            return s;
        })
    }

    function onExecuted(promptID: PromptID, nodeID: ComfyNodeID, output: SerializedPromptOutput, queueEntry: QueueEntry) {
        const journeyNode = get(store).nodesByPromptID[promptID];
        if (journeyNode == null)
            return;

        // TODO
        store.update(s => {
            s.version += 1;
            s.activeNodeID = journeyNode.id;
            return s;
        })
    }

    return {
        ...store,
        getActiveNode,
        clear,
        // addNode,
        pushPatchOntoActive,
        selectNode,
        iterateBreadthFirst,
        iterateLinearPath,
        afterQueued,
        onExecuted,
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
