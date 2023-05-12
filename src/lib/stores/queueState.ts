import type { ComfyAPIHistoryItem, ComfyAPIQueueResponse, ComfyAPIStatusResponse, NodeID, PromptID } from "$lib/api";
import type { Progress, SerializedPrompt, SerializedPromptOutputs } from "$lib/components/ComfyApp";
import type { GalleryOutput } from "$lib/nodes/ComfyWidgetNodes";
import { writable, type Writable } from "svelte/store";

export type QueueItem = {
    name: string
}

type QueueStateOps = {
    queueUpdated: (queue: ComfyAPIQueueResponse) => void,
    statusUpdated: (status: ComfyAPIStatusResponse | null) => void,
    executingUpdated: (promptID: PromptID | null, runningNodeID: NodeID | null) => void,
    executionCached: (promptID: PromptID, nodes: NodeID[]) => void,
    executionError: (promptID: PromptID, message: string) => void,
    progressUpdated: (progress: Progress) => void
    afterQueued: (promptID: PromptID, number: number, prompt: SerializedPrompt, extraData: any) => void
    onExecuted: (promptID: PromptID, nodeID: NodeID, output: GalleryOutput) => void
}

export type QueueEntry = {
    number: number,
    promptID: PromptID,
    prompt: SerializedPrompt,
    extraData: any,
    goodOutputs: NodeID[],

    // Collected while the prompt is still executing
    outputs: SerializedPromptOutputs,
}

export type CompletedQueueEntry = {
    entry: QueueEntry,
    type: "success" | "error" | "all_cached",
    error?: string,
}

export type QueueState = {
    queueRunning: QueueEntry[],
    queuePending: QueueEntry[],
    queueCompleted: CompletedQueueEntry[],
    queueRemaining: number | "X" | null;
    runningNodeID: number | null;
    progress: Progress | null
}
type WritableQueueStateStore = Writable<QueueState> & QueueStateOps;

const store: Writable<QueueState> = writable({
    queueRunning: [],
    queuePending: [],
    queueCompleted: [],
    queueRemaining: null,
    runningNodeID: null,
    progress: null
})

function toQueueEntry(resp: ComfyAPIHistoryItem): QueueEntry {
    const [num, promptID, prompt, extraData, goodOutputs] = resp
    return {
        number: num,
        promptID,
        prompt,
        extraData,
        goodOutputs,
        outputs: {}
    }
}

function queueUpdated(queue: ComfyAPIQueueResponse) {
    store.update((s) => {
        s.queueRunning = queue.running.map(toQueueEntry);
        s.queuePending = queue.pending.map(toQueueEntry);
        s.queueRemaining = s.queuePending.length;
        return s
    })
}

function progressUpdated(progress: Progress) {
    store.update((s) => {
        s.progress = progress;
        return s
    })
}

function statusUpdated(status: ComfyAPIStatusResponse | null) {
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
            const index = s.queuePending.findIndex(e => e.promptID === promptID)
            if (index) {
                s.queuePending = s.queuePending.splice(index, 1);
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
        const index = s.queuePending.findIndex(e => e.promptID === promptID)
        if (index) {
            const entry = s.queuePending[index]

            if (nodes.length >= Object.keys(entry.prompt.output).length) {
                s.queuePending = s.queuePending.splice(index, 1);
                const completed: CompletedQueueEntry = {
                    entry,
                    type: "all_cached"
                }
                s.queueCompleted.push(completed)
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
        const index = s.queuePending.findIndex(e => e.promptID === promptID)
        if (index) {
            const entry = s.queuePending[index]
            s.queuePending = s.queuePending.splice(index, 1);
            const completed: CompletedQueueEntry = {
                entry,
                type: "error",
                error: message
            }
            s.queueCompleted.push(completed)
        }
        s.progress = null;
        s.runningNodeID = null;
        return s
    })
}

function afterQueued(promptID: PromptID, number: number, prompt: SerializedPrompt, extraData: any) {
    console.debug("[queueState] afterQueued", promptID, Object.keys(prompt.workflow.nodes))
    store.update(s => {
        const entry: QueueEntry = {
            number,
            promptID,
            prompt,
            extraData,
            goodOutputs: [],
            outputs: {}
        }
        s.queuePending.push(entry)
        return s
    })
}

function onExecuted(promptID: PromptID, nodeID: NodeID, output: GalleryOutput) {
    console.debug("[queueState] onExecuted", promptID, nodeID, output)
    store.update(s => {
        const entry = s.queuePending.find(e => e.promptID === promptID)
        if (entry) {
            entry.outputs[nodeID] = output;
            s.queuePending.push(entry)
        }
        return s
    })
}

const queueStateStore: WritableQueueStateStore =
{
    ...store,
    queueUpdated,
    statusUpdated,
    progressUpdated,
    executingUpdated,
    executionCached,
    executionError,
    afterQueued,
    onExecuted
}
export default queueStateStore;
