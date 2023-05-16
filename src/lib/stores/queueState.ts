import type { ComfyAPIHistoryEntry, ComfyAPIHistoryItem, ComfyAPIHistoryResponse, ComfyAPIQueueResponse, ComfyAPIStatusResponse, ComfyBoxPromptExtraData, ComfyNodeID, PromptID } from "$lib/api";
import type { Progress, SerializedPromptInputsAll, SerializedPromptOutputs } from "$lib/components/ComfyApp";
import type { ComfyExecutionResult } from "$lib/nodes/ComfyWidgetNodes";
import notify from "$lib/notify";
import { get, writable, type Writable } from "svelte/store";

export type QueueItem = {
    name: string
}

export type QueueEntryStatus = "success" | "error" | "interrupted" | "all_cached" | "unknown";

type QueueStateOps = {
    queueUpdated: (resp: ComfyAPIQueueResponse) => void,
    historyUpdated: (resp: ComfyAPIHistoryResponse) => void,
    statusUpdated: (status: ComfyAPIStatusResponse | null) => void,
    executingUpdated: (promptID: PromptID | null, runningNodeID: ComfyNodeID | null) => void,
    executionCached: (promptID: PromptID, nodes: ComfyNodeID[]) => void,
    executionError: (promptID: PromptID, message: string) => void,
    progressUpdated: (progress: Progress) => void
    afterQueued: (promptID: PromptID, number: number, prompt: SerializedPromptInputsAll, extraData: any) => void
    onExecuted: (promptID: PromptID, nodeID: ComfyNodeID, output: ComfyExecutionResult) => void
}

export type QueueEntry = {
    /* Data preserved on page refresh */
    number: number,
    queuedAt?: Date,
    finishedAt?: Date,
    promptID: PromptID,
    prompt: SerializedPromptInputsAll,
    extraData: ComfyBoxPromptExtraData,
    goodOutputs: ComfyNodeID[],

    /* Data not sent by ComfyUI's API, lost on page refresh */

    /* Prompt outputs, collected while the prompt is still executing */
    outputs: SerializedPromptOutputs,

    /* Nodes in of the workflow that have finished running so far. */
    nodesRan: Set<ComfyNodeID>,
    cachedNodes: Set<ComfyNodeID>
}

export type CompletedQueueEntry = {
    entry: QueueEntry,
    status: QueueEntryStatus,
    message?: string,
    error?: string,
}

export type QueueState = {
    queueRunning: Writable<QueueEntry[]>,
    queuePending: Writable<QueueEntry[]>,
    queueCompleted: Writable<CompletedQueueEntry[]>,
    queueRemaining: number | "X" | null;
    runningNodeID: ComfyNodeID | null;
    progress: Progress | null,
    isInterrupting: boolean
}
type WritableQueueStateStore = Writable<QueueState> & QueueStateOps;

const store: Writable<QueueState> = writable({
    queueRunning: writable([]),
    queuePending: writable([]),
    queueCompleted: writable([]),
    queueRemaining: null,
    runningNodeID: null,
    progress: null,
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

function statusUpdated(status: ComfyAPIStatusResponse | null) {
    console.debug("[queueState] statusUpdated", status)
    store.update((s) => {
        if (status !== null)
            s.queueRemaining = status.execInfo.queueRemaining;
        return s
    })
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

function moveToCompleted(index: number, queue: Writable<QueueEntry[]>, status: QueueEntryStatus, message?: string, error?: string) {
    const state = get(store)

    const entry = get(queue)[index];
    console.debug("[queueState] Move to completed", entry.promptID, index, status, message, error)
    entry.finishedAt = new Date() // Now
    queue.update(qp => { qp.splice(index, 1); return qp });
    state.queueCompleted.update(qc => {
        const completed: CompletedQueueEntry = { entry, status, message, error }
        qc.push(completed)
        return qc
    })

    store.set(state)
}

function executingUpdated(promptID: PromptID, runningNodeID: ComfyNodeID | null) {
    console.debug("[queueState] executingUpdated", promptID, runningNodeID)
    store.update((s) => {
        s.progress = null;

        const [index, entry, queue] = findEntryInPending(promptID);
        if (runningNodeID != null) {
            if (entry != null) {
                entry.nodesRan.add(runningNodeID)
            }
            s.runningNodeID = runningNodeID;
        }
        else {
            // Prompt finished executing.
            if (entry != null) {
                const totalNodesInPrompt = Object.keys(entry.prompt).length
                if (entry.cachedNodes.size >= Object.keys(entry.prompt).length) {
                    notify("Prompt was cached, nothing to run.", { type: "warning" })
                    moveToCompleted(index, queue, "all_cached", "(Execution was cached)");
                }
                else if (entry.nodesRan.size >= totalNodesInPrompt) {
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
            s.runningNodeID = null;
        }
        return s
    })
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
        s.runningNodeID = null;
        return s
    })
}

function executionError(promptID: PromptID, message: string) {
    console.debug("[queueState] executionError", promptID, message)
    store.update(s => {
        const [index, entry, queue] = findEntryInPending(promptID);
        if (entry != null) {
            moveToCompleted(index, queue, "error", "Error executing", message)
        }
        else {
            console.error("[queueState] Could not find in pending! (executionError)", promptID)
        }
        s.progress = null;
        s.runningNodeID = null;
        return s
    })
}

function afterQueued(promptID: PromptID, number: number, prompt: SerializedPromptInputsAll, extraData: any) {
    console.debug("[queueState] afterQueued", promptID, Object.keys(prompt))
    store.update(s => {
        const entry: QueueEntry = {
            number,
            queuedAt: new Date(), // Now
            finishedAt: null,
            promptID,
            prompt,
            extraData,
            goodOutputs: [],
            outputs: {},
            nodesRan: new Set(),
            cachedNodes: new Set()
        }
        s.queuePending.update(qp => { qp.push(entry); return qp })
        console.debug("[queueState] ADD PROMPT", promptID)
        s.isInterrupting = false;
        return s
    })
}

function onExecuted(promptID: PromptID, nodeID: ComfyNodeID, output: ComfyExecutionResult) {
    console.debug("[queueState] onExecuted", promptID, nodeID, output)
    store.update(s => {
        const [index, entry, queue] = findEntryInPending(promptID)
        if (entry != null) {
            entry.outputs[nodeID] = output;
            queue.set(get(queue))
        }
        else {
            console.error("[queueState] Could not find in pending! (onExecuted)", promptID)
        }
        return s
    })
}

const queueStateStore: WritableQueueStateStore =
{
    ...store,
    queueUpdated,
    historyUpdated,
    statusUpdated,
    progressUpdated,
    executingUpdated,
    executionCached,
    executionError,
    afterQueued,
    onExecuted
}
export default queueStateStore;
