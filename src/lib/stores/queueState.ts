import type { ComfyAPIQueueStatus } from "$lib/api";
import type { Progress } from "$lib/components/ComfyApp";
import { writable, type Writable } from "svelte/store";

export type QueueItem = {
    name: string
}

type QueueStateOps = {
    statusUpdated: (status: ComfyAPIQueueStatus) => void,
    executingUpdated: (runningNodeId: string | null) => void,
    progressUpdated: (progress: Progress | null) => void
}

export type QueueState = {
    queueRemaining: number | "X" | null;
    runningNodeId: number | null;
    progress: Progress | null
}
type WritableQueueStateStore = Writable<QueueState> & QueueStateOps;

const store: Writable<QueueState> = writable({ queueRemaining: null, runningNodeId: null, progress: null })

function statusUpdated(status: ComfyAPIQueueStatus) {
    store.update((s) => {
        s.queueRemaining = status.exec_info.queue_remaining;
        return s
    })
}

function executingUpdated(runningNodeId: string | null) {
    store.update((s) => {
        s.progress = null;
        s.runningNodeId = parseInt(runningNodeId);
        return s
    })
}

function progressUpdated(progress: Progress | null) {
    store.update((s) => {
        s.progress = progress;
        return s
    })
}

const queueStateStore: WritableQueueStateStore =
{
    ...store,
    statusUpdated,
    executingUpdated,
    progressUpdated
}
export default queueStateStore;
