import type { ComfyAPIHistoryEntry, ComfyAPIHistoryItem, ComfyAPIHistoryResponse, ComfyAPIQueueResponse, ComfyAPIStatusResponse, ComfyBoxPromptExtraData, ComfyExecutionError, ComfyNodeID, PromptID, QueueItemType } from "$lib/api";
import type { ComfyAPIPromptErrorResponse } from "$lib/apiErrors";
import type { Progress, SerializedPrompt, SerializedPromptInputsAll, SerializedPromptOutputs, } from "$lib/components/ComfyApp";
import type { ComfyExecutionResult } from "$lib/nodes/ComfyWidgetNodes";
import notify from "$lib/notify";
import { playSound } from "$lib/utils";
import { get, writable, type Writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";
import workflowState, { type WorkflowError, type WorkflowExecutionError, type WorkflowInstID, type WorkflowValidationError } from "./workflowState";
import configState from "./configState";
import uiQueueState from "./uiQueueState";
import type { NodeID } from "@litegraph-ts/core";

export type QueueEntryStatus = "success" | "validation_failed" | "error" | "interrupted" | "all_cached" | "unknown";

type QueueStateOps = {
    queueUpdated: (resp: ComfyAPIQueueResponse) => void,
    historyUpdated: (resp: ComfyAPIHistoryResponse) => void,
    statusUpdated: (status: ComfyAPIStatusResponse | null) => void,
    executionStart: (promptID: PromptID) => void,
    executingUpdated: (promptID: PromptID | null, runningNodeID: ComfyNodeID | null) => QueueEntry | null;
    executionCached: (promptID: PromptID, nodes: ComfyNodeID[]) => void,
    executionError: (error: ComfyExecutionError) => CompletedQueueEntry | null,
    progressUpdated: (progress: Progress) => void
    previewUpdated: (imageBlob: Blob) => void
    getQueueEntry: (promptID: PromptID) => QueueEntry | null;
    afterQueued: (workflowID: WorkflowInstID, promptID: PromptID, number: number, prompt: SerializedPromptInputsAll, extraData: any) => void
    queueItemDeleted: (type: QueueItemType, id: PromptID) => void;
    queueCleared: (type: QueueItemType) => void;
    onExecuted: (promptID: PromptID, nodeID: ComfyNodeID, output: ComfyExecutionResult) => QueueEntry | null
    promptError: (id: WorkflowInstID, error: ComfyAPIPromptErrorResponse, prompt: SerializedPrompt, extraData: ComfyBoxPromptExtraData) => PromptID
}

/*
 * Single job that the backend keeps track of.
 */
export type QueueEntry = {
    /*** Data preserved on page refresh ***/

    /** Priority of the prompt. -1 means to queue at the front. */
    number: number,
    queuedAt?: Date,
    finishedAt?: Date,
    /*
     * Can also be generated by the frontend if prompt validation fails
     * (the backend won't send back a prompt ID in that case)
     */
    promptID: PromptID,
    prompt: SerializedPromptInputsAll,
    extraData: ComfyBoxPromptExtraData,
    goodOutputs: ComfyNodeID[],

    /*** Data not sent by ComfyUI's API, lost on page refresh ***/

    /* Prompt outputs, collected while the prompt is still executing */
    outputs: SerializedPromptOutputs,
    /* Nodes of the workflow that have finished running so far. */
    nodesRan: Set<ComfyNodeID>,
    /* Nodes of the workflow the backend reported as cached. */
    cachedNodes: Set<ComfyNodeID>,
}

/*
 * Represents a queue entry that has finished executing (suceeded or failed) and
 * has been moved to the history.
 */
export type CompletedQueueEntry = {
    /** Corresponding entry in the queue, for the prompt/extra data */
    entry: QueueEntry,
    /** The result of this prompt, success/failed/cached */
    status: QueueEntryStatus,
    /** Message to display in the frontend */
    message?: string,
    /** Detailed error/stacktrace, perhaps inspectible with a popup */
    error?: WorkflowError
}

/*
 * Keeps track of queued and completed (history) prompts.
 */
export type QueueState = {
    queueRunning: Writable<QueueEntry[]>,
    queuePending: Writable<QueueEntry[]>,
    queueCompleted: Writable<CompletedQueueEntry[]>,
    queueRemaining: number | "X" | null;

    /*
     * Currently executing node if any
     */
    runningNodeID: ComfyNodeID | null;

    /*
     * Currently executing prompt if any
     */
    runningPromptID: PromptID | null;

    /*
     * Nodes which should be rendered as "executing" in the frontend (green border).
     * This includes the running node and all its parent subgraphs
     */
    executingNodes: Set<NodeID>;

    /*
     * Progress for the current node reported by the frontend
     */
    progress: Progress | null,

    /*
     * Image preview URL
     */
    previewURL: string | null,

    /**
     * If true, user pressed the "Interrupt" button in the frontend. Disable the
     * button and wait until the next prompt starts running to re-enable it
     * again
     */
    isInterrupting: boolean
}
type WritableQueueStateStore = Writable<QueueState> & QueueStateOps;

const store: Writable<QueueState> = writable({
    queueRunning: writable([]),
    queuePending: writable([]),
    queueCompleted: writable([]),
    queueRemaining: null,
    runningNodeID: null,
    executingNodes: new Set(),
    progress: null,
    preview: null,
    isInterrupting: false
})

function toQueueEntry(resp: ComfyAPIHistoryItem): QueueEntry {
    const [num, promptID, prompt, extraData, goodOutputs] = resp
    return {
        number: num,
        queuedAt: null, // TODO when ComfyUI passes the date
        finishedAt: null,
        promptID,
        prompt,
        extraData,
        goodOutputs,
        outputs: {},
        nodesRan: new Set(), // TODO can ComfyUI send this too?
        cachedNodes: new Set()
    }
}

function toCompletedQueueEntry(resp: ComfyAPIHistoryEntry): CompletedQueueEntry {
    const entry = toQueueEntry(resp.prompt)
    entry.outputs = resp.outputs;
    return {
        entry,
        status: Object.values(entry.outputs).length > 0 ? "success" : "all_cached",
        error: null
    }
}

function queueUpdated(resp: ComfyAPIQueueResponse) {
    console.debug("[queueState] queueUpdated", resp.running.length, resp.pending.length)
    store.update((s) => {
        s.queueRunning.set(resp.running.map(toQueueEntry));
        s.queuePending.set(resp.pending.map(toQueueEntry));
        s.queueRemaining = resp.pending.length;
        return s
    })
}

function historyUpdated(resp: ComfyAPIHistoryResponse) {
    console.debug("[queueState] historyUpdated", Object.values(resp.history).length)
    store.update((s) => {
        const values = Object.values(resp.history) // TODO Order by prompt finished date!
        s.queueCompleted.set(values.map(toCompletedQueueEntry));
        return s
    })
}

function progressUpdated(progress: Progress) {
    // console.debug("[queueState] progressUpdated", progress)
    store.update((s) => {
        s.progress = progress;
        return s
    })
}

function previewUpdated(imageBlob: Blob) {
    console.debug("[queueState] previewUpdated", imageBlob?.type)
    store.update(s => {
        if (s.runningNodeID == null) {
            s.previewURL = null;
            return s;
        }

        s.previewURL = URL.createObjectURL(imageBlob);
        return s;
    })
}

function statusUpdated(status: ComfyAPIStatusResponse | null) {
    console.debug("[queueState] statusUpdated", status)
    store.update((s) => {
        if (status !== null)
            s.queueRemaining = status.execInfo.queueRemaining;
        return s
    })
}

function getQueueEntry(promptID: PromptID): QueueEntry | null {
    const state = get(store);

    let found = get(state.queuePending).find(e => e.promptID === promptID)
    if (found != null) return found;

    found = get(state.queueRunning).find(e => e.promptID === promptID)
    if (found != null) return found;

    let foundCompleted = get(state.queueCompleted).find(e => e.entry.promptID === promptID)
    if (foundCompleted != null) return foundCompleted.entry;

    return null;
}

function findEntryInPending(promptID: PromptID): [number, QueueEntry | null, Writable<QueueEntry[]> | null] {
    const state = get(store);
    let index = get(state.queuePending).findIndex(e => e.promptID === promptID)
    if (index !== -1)
        return [index, get(state.queuePending)[index], state.queuePending]

    index = get(state.queueRunning).findIndex(e => e.promptID === promptID)
    if (index !== -1)
        return [index, get(state.queueRunning)[index], state.queueRunning]

    return [-1, null, null]
}

function deleteEntry(promptID: PromptID): boolean {
    const state = get(store);
    let index = get(state.queuePending).findIndex(e => e.promptID === promptID)
    let found = false;
    if (index !== -1) {
        state.queuePending.update(qp => {
            qp.splice(index, 1)
            return qp;
        })
        found = true;
    }

    index = get(state.queueRunning).findIndex(e => e.promptID === promptID)
    if (index !== -1) {
        state.queueRunning.update(qr => {
            qr.splice(index, 1)
            return qr;
        })
        found = true;
    }

    index = get(state.queueCompleted).findIndex(e => e.entry.promptID === promptID)
    if (index !== -1) {
        state.queueCompleted.update(qc => {
            qc.splice(index, 1)
            return qc;
        })
        found = true;
    }

    return found;
}

function moveToRunning(index: number, queue: Writable<QueueEntry[]>) {
    const state = get(store)

    const entry = get(queue)[index];
    console.debug("[queueState] Move to running", entry.promptID, index)
    // entry.startedAt = new Date() // Now
    queue.update(qp => { qp.splice(index, 1); return qp });
    state.queueRunning.update(qr => { qr.push(entry); return qr })

    state.isInterrupting = false;
    store.set(state)
}

function moveToCompleted(index: number, queue: Writable<QueueEntry[]>, status: QueueEntryStatus, message?: string, error?: ComfyExecutionError): CompletedQueueEntry {
    const state = get(store)
    const entry = get(queue)[index];

    let workflowError: WorkflowExecutionError | null = null;
    if (error) {
        workflowError = {
            type: "execution",
            error
        }
        entry.nodesRan = new Set(error.executed);
    }

    console.debug("[queueState] Move to completed", entry.promptID, index, status, message, error)
    entry.finishedAt = new Date() // Now
    queue.update(qp => { qp.splice(index, 1); return qp });
    const completed: CompletedQueueEntry = { entry, status, message, error: workflowError }
    state.queueCompleted.update(qc => {
        qc.push(completed)
        return qc
    })

    state.isInterrupting = false;
    store.set(state)

    return completed;
}

function executingUpdated(promptID: PromptID, runningNodeID: ComfyNodeID | null): QueueEntry | null {
    console.debug("[queueState] executingUpdated", promptID, runningNodeID)
    let entry_ = null;

    store.update((s) => {
        s.progress = null;
        s.executingNodes.clear();

        const [index, entry, queue] = findEntryInPending(promptID);
        if (runningNodeID != null) {
            if (entry != null) {
                entry.nodesRan.add(runningNodeID)
            }
            s.runningNodeID = runningNodeID;
            s.runningPromptID = promptID;

            if (entry?.extraData?.workflowID) {
                const workflow = workflowState.getWorkflow(entry.extraData.workflowID);
                if (workflow != null) {
                    let node = workflow.graph.getNodeByIdRecursive(s.runningNodeID);
                    while (node != null) {
                        s.executingNodes.add(node.id);
                        node = node.graph?._subgraph_node;
                    }
                }
            }
        }
        else {
            // Prompt finished executing.
            if (entry != null) {
                const totalNodesInPrompt = Object.keys(entry.prompt).length
                if (entry.cachedNodes.size >= Object.keys(entry.prompt).length) {
                    notify("Prompt was cached, nothing to run.", { type: "warning", showOn: "web" })
                    moveToCompleted(index, queue, "all_cached", "(Execution was cached)");
                }
                else if (entry.nodesRan.size >= totalNodesInPrompt) {
                    const workflow = workflowState.getWorkflow(entry.extraData.workflowID);
                    if (workflow?.attrs.showDefaultNotifications) {
                        if (configState.canShowNotificationText()) {
                            notify("Prompt finished!", { type: "success" });
                        }
                        if (configState.canPlayNotificationSound()) {
                            playSound("notification.mp3")
                        }
                    }
                    moveToCompleted(index, queue, "success")
                }
                else {
                    notify("Interrupted prompt.")
                    moveToCompleted(index, queue, "interrupted", `Interrupted after ${entry.nodesRan.size}/${totalNodesInPrompt} nodes`)
                }
            }
            else {
                console.debug("[queueState] Could not find in pending! (executingUpdated)", promptID)
            }
            s.progress = null;
            s.previewURL = null;
            s.runningNodeID = null;
            s.runningPromptID = null;
            s.executingNodes.clear();
        }
        entry_ = entry;
        return s
    })

    return entry_;
}

function executionCached(promptID: PromptID, nodes: ComfyNodeID[]) {
    console.debug("[queueState] executionCached", promptID, nodes)
    store.update(s => {
        const [index, entry, queue] = findEntryInPending(promptID);
        if (entry != null) {
            for (const nodeID of nodes) {
                entry.nodesRan.add(nodeID);
                entry.cachedNodes.add(nodeID);
            }
        }
        else {
            console.error("[queueState] Could not find in pending! (executionCached)", promptID, "pending", JSON.stringify(get(get(store).queuePending).map(p => p.promptID)), "running", JSON.stringify(get(get(store).queueRunning).map(p => p.promptID)))
        }
        s.isInterrupting = false; // TODO move to start
        s.progress = null;
        s.previewURL = null;
        s.runningNodeID = null;
        s.runningPromptID = null;
        s.executingNodes.clear();
        return s
    })
}

function executionError(error: ComfyExecutionError): CompletedQueueEntry | null {
    console.debug("[queueState] executionError", error)
    let entry_ = null;
    store.update(s => {
        const [index, entry, queue] = findEntryInPending(error.prompt_id);
        if (entry != null) {
            entry_ = moveToCompleted(index, queue, "error", "Error executing", error)
        }
        else {
            console.error("[queueState] Could not find in pending! (executionError)", error.prompt_id)
        }
        s.progress = null;
        s.previewURL = null;
        s.runningNodeID = null;
        s.runningPromptID = null;
        s.executingNodes.clear();
        return s
    })
    return entry_;
}

function createNewQueueEntry(promptID: PromptID, number: number = -1, prompt: SerializedPromptInputsAll = {}, extraData: any = {}): QueueEntry {
    return {
        number,
        queuedAt: new Date(), // Now
        finishedAt: undefined,
        promptID,
        prompt,
        extraData,
        goodOutputs: [],
        outputs: {},
        nodesRan: new Set(),
        cachedNodes: new Set()
    }
}

function executionStart(promptID: PromptID) {
    console.debug("[queueState] executionStart", promptID)
    store.update(s => {
        const [index, entry, queue] = findEntryInPending(promptID);
        if (entry == null) {
            const entry = createNewQueueEntry(promptID);
            s.queueRunning.update(qr => { qr.push(entry); return qr })
            console.debug("[queueState] ADD PROMPT", promptID)
        }
        else {
            moveToRunning(index, queue)
        }
        s.isInterrupting = false;
        s.runningNodeID = null;
        s.runningPromptID = promptID;
        s.executingNodes.clear();
        return s
    })
}

function afterQueued(workflowID: WorkflowInstID, promptID: PromptID, number: number, prompt: SerializedPromptInputsAll, extraData: any) {
    console.debug("[queueState] afterQueued", promptID, Object.keys(prompt))
    store.update(s => {
        const [index, entry, queue] = findEntryInPending(promptID);
        if (entry == null) {
            const entry = createNewQueueEntry(promptID, number, prompt, extraData);
            s.queuePending.update(qp => { qp.push(entry); return qp })
            console.debug("[queueState] ADD PROMPT", promptID)
        }
        else {
            entry.number = number;
            entry.prompt = prompt
            entry.extraData = extraData
            queue.set(get(queue))
            console.warn("[queueState] UPDATE PROMPT", promptID)
        }
        s.isInterrupting = false;
        return s
    })
}

function onExecuted(promptID: PromptID, nodeID: ComfyNodeID, outputs: ComfyExecutionResult): QueueEntry | null {
    console.debug("[queueState] onExecuted", promptID, nodeID, outputs)
    let entry_ = null;
    store.update(s => {
        const [index, entry, queue] = findEntryInPending(promptID)
        if (entry != null) {
            entry.outputs[nodeID] = outputs;
            queue.set(get(queue))
        }
        else {
            console.error("[queueState] Could not find in pending! (onExecuted)", promptID)
        }
        entry_ = entry;
        return s
    })
    return entry_;
}

function queueItemDeleted(type: QueueItemType, id: PromptID) {
    console.debug("[queueState] queueItemDeleted", type, id)

    store.update(s => {
        if (!deleteEntry(id)) {
            console.error("[queueState] Queue item to delete not found!", type, id);
        }
        s.isInterrupting = false;
        return s;
    })
}

function queueCleared(type: QueueItemType) {
    console.debug("[queueState] queueCleared", type)

    store.update(s => {
        if (type === "queue") {
            s.queuePending.set([]);
            s.queueRemaining = 0;
            s.runningNodeID = null;
            s.runningPromptID = null;
            s.progress = null;
            s.previewURL = null;
            s.executingNodes.clear();
        }
        else {
            s.queueCompleted.set([])
        }
        s.isInterrupting = false;
        return s;
    })
}

function promptError(workflowID: WorkflowInstID, error: ComfyAPIPromptErrorResponse, prompt: SerializedPrompt, extraData: ComfyBoxPromptExtraData): PromptID {
    const workflowError: WorkflowValidationError = {
        type: "validation",
        workflowID,
        error,
        prompt,
        extraData
    }

    const entry: QueueEntry = {
        number: 0,
        queuedAt: new Date(), // Now
        finishedAt: new Date(),
        promptID: uuidv4(), // Just for keeping track
        prompt: prompt.output,
        extraData,
        goodOutputs: [],
        outputs: {},
        nodesRan: new Set(),
        cachedNodes: new Set(),
    }

    const completedEntry: CompletedQueueEntry = {
        entry,
        status: "validation_failed",
        message: "Validation failed",
        error: workflowError
    }

    store.update(s => {
        s.queueCompleted.update(qc => { qc.push(completedEntry); return qc })
        return s;
    })

    return entry.promptID;
}

const queueStateStore: WritableQueueStateStore =
{
    ...store,
    queueUpdated,
    historyUpdated,
    statusUpdated,
    progressUpdated,
    previewUpdated,
    executionStart,
    executingUpdated,
    executionCached,
    executionError,
    afterQueued,
    queueItemDeleted,
    queueCleared,
    getQueueEntry,
    onExecuted,
    promptError,
}
export default queueStateStore;
