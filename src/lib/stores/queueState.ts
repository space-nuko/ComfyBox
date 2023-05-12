import type { ComfyAPIHistoryEntry, ComfyAPIHistoryItem, ComfyAPIHistoryResponse, ComfyAPIQueueResponse, ComfyAPIStatusResponse, ComfyPromptExtraData, NodeID, PromptID } from "$lib/api";
import type { Progress, SerializedPrompt, SerializedPromptInputsAll, SerializedPromptOutputs } from "$lib/components/ComfyApp";
import type { GalleryOutput } from "$lib/nodes/ComfyWidgetNodes";
import { get, writable, type Writable } from "svelte/store";

export type QueueItem = {
    name: string
}

export type QueueEntryStatus = "success" | "error" | "all_cached" | "unknown";

type QueueStateOps = {
    queueUpdated: (resp: ComfyAPIQueueResponse) => void,
    historyUpdated: (resp: ComfyAPIHistoryResponse) => void,
    statusUpdated: (status: ComfyAPIStatusResponse | null) => void,
    executingUpdated: (promptID: PromptID | null, runningNodeID: NodeID | null) => void,
    executionCached: (promptID: PromptID, nodes: NodeID[]) => void,
    executionError: (promptID: PromptID, message: string) => void,
    progressUpdated: (progress: Progress) => void
    afterQueued: (promptID: PromptID, number: number, prompt: SerializedPromptInputsAll, extraData: any) => void
    onExecuted: (promptID: PromptID, nodeID: NodeID, output: GalleryOutput) => void
}

export type QueueEntry = {
    /* Data preserved on page refresh */
    number: number,
    queuedAt?: Date,
    finishedAt?: Date,
    promptID: PromptID,
    prompt: SerializedPromptInputsAll,
    extraData: ComfyPromptExtraData,
    goodOutputs: NodeID[],

    /* Data not sent by Comfy's API, lost on page refresh */
    /* Prompt outputs, collected while the prompt is still executing */
    outputs: SerializedPromptOutputs,

}

export type CompletedQueueEntry = {
    entry: QueueEntry,
    status: QueueEntryStatus,
    error?: string,
}

export type QueueState = {
    queueRunning: Writable<QueueEntry[]>,
    queuePending: Writable<QueueEntry[]>,
    queueCompleted: Writable<CompletedQueueEntry[]>,
    queueRemaining: number | "X" | null;
    runningNodeID: number | null;
    progress: Progress | null
}
type WritableQueueStateStore = Writable<QueueState> & QueueStateOps;

const store: Writable<QueueState> = writable({
    queueRunning: writable([]),
    queuePending: writable([]),
    queueCompleted: writable([]),
    queueRemaining: null,
    runningNodeID: null,
    progress: null
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
        outputs: {}
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

function executingUpdated(promptID: PromptID | null, runningNodeID: NodeID | null) {
    console.debug("[queueState] executingUpdated", promptID, runningNodeID)
    store.update((s) => {
        s.progress = null;
        if (runningNodeID != null) {
            s.runningNodeID = parseInt(runningNodeID);
        }
        else if (promptID != null) {
            // Prompt finished executing.
            const queuePending = get(s.queuePending)
            const index = queuePending.findIndex(e => e.promptID === promptID)
            if (index) {
                const entry = queuePending[index]
                entry.finishedAt = new Date() // Now
                s.queuePending.update(qp => { qp.splice(index, 1); return qp });
                s.queueCompleted.update(qc => {
                    const completed: CompletedQueueEntry = {
                        entry,
                        status: "success",
                    }
                    qc.push(completed)
                    return qc
                })
            }
            s.progress = null;
            s.runningNodeID = null;
        }
        return s
    })
}

function executionCached(promptID: PromptID, nodes: NodeID[]) {
    console.debug("[queueState] executionCached", promptID, nodes)
    store.update(s => {
        const queuePending = get(s.queuePending)
        const index = queuePending.findIndex(e => e.promptID === promptID)
        if (index) {
            const entry = queuePending[index]

            if (nodes.length >= Object.keys(entry.prompt.output).length) {
                entry.finishedAt = new Date() // Now
                s.queuePending.update(qp => { qp.splice(index, 1); return qp });
                s.queueCompleted.update(qc => {
                    const completed: CompletedQueueEntry = {
                        entry,
                        status: "all_cached",
                    }
                    qc.push(completed)
                    return qc
                })
            }
        }
        s.progress = null;
        s.runningNodeID = null;
        return s
    })
}

function executionError(promptID: PromptID, message: string) {
    console.debug("[queueState] executionError", promptID, message)
    store.update(s => {
        const queuePending = get(s.queuePending)
        const index = queuePending.findIndex(e => e.promptID === promptID)
        if (index) {
            const entry = s.queuePending[index]
            entry.finishedAt = new Date() // Now
            s.queuePending.update(qp => { qp.splice(index, 1); return qp });
            s.queueCompleted.update(qc => {
                const completed: CompletedQueueEntry = {
                    entry,
                    status: "error",
                    error: message
                }
                qc.push(completed)
                return qc
            })
        }
        s.progress = null;
        s.runningNodeID = null;
        return s
    })
}

function afterQueued(promptID: PromptID, number: number, prompt: SerializedPromptInputsAll, extraData: any) {
    console.debug("[queueState] afterQueued", promptID, Object.keys(prompt.nodes))
    store.update(s => {
        const entry: QueueEntry = {
            number,
            queuedAt: new Date(), // Now
            finishedAt: null,
            promptID,
            prompt,
            extraData,
            goodOutputs: [],
            outputs: {}
        }
        s.queuePending.update(qp => { qp.push(entry); return qp })
        return s
    })
}

function onExecuted(promptID: PromptID, nodeID: NodeID, output: GalleryOutput) {
    console.debug("[queueState] onExecuted", promptID, nodeID, output)
    store.update(s => {
        const queuePending = get(s.queuePending)
        const entry = queuePending.find(e => e.promptID === promptID)
        if (entry) {
            entry.outputs[nodeID] = output;
            s.queuePending.update(qp => { qp.push(entry); return qp; })
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
