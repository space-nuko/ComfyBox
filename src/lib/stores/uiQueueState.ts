import type { PromptID, QueueItemType } from '$lib/api';
import type { ComfyImageLocation } from "$lib/utils";
import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import queueState, { QueueEntryStatus, type CompletedQueueEntry, type QueueEntry } from './queueState';
import type { WorkflowError } from './workflowState';
import { convertComfyOutputToComfyURL } from '$lib/utils';

export type QueueUIEntryStatus = QueueEntryStatus | "pending" | "running";

export type QueueUIEntry = {
    entry: QueueEntry,
    message: string,
    submessage: string,
    date?: string,
    status: QueueUIEntryStatus,
    images?: ComfyImageLocation[], // URLs
    details?: string, // shown in a tooltip on hover
    error?: WorkflowError
}

export type UIQueueState = {
    mode: QueueItemType,

    queuedEntries: QueueUIEntry[],
    runningEntries: QueueUIEntry[],

    queueUIEntries: QueueUIEntry[],
    historyUIEntries: QueueUIEntry[],
}

type UIQueueStateOps = {
    updateEntries: (force?: boolean) => void
    clearAll: () => void
    clearQueue: () => void
    clearHistory: () => void
}

export type WritableUIQueueStateStore = Writable<UIQueueState> & UIQueueStateOps;
const store: Writable<UIQueueState> = writable(
    {
        mode: "queue",
        queuedEntries: [],
        runningEntries: [],
        completedEntries: [],

        queueUIEntries: [],
        historyUIEntries: [],
    })

function formatDate(date: Date): string {
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const day = date.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(',', '');
    return [time, day].join(", ")
}

function convertEntry(entry: QueueEntry, status: QueueUIEntryStatus): QueueUIEntry {
    let date = entry.finishedAt || entry.queuedAt;
    let dateStr = null;
    if (date) {
        dateStr = formatDate(date);
    }

    const subgraphs: string[] | null = entry.extraData?.extra_pnginfo?.comfyBoxPrompt?.subgraphs;

    let message = "Prompt";
    if (entry.extraData?.workflowTitle != null) {
        message = `${entry.extraData.workflowTitle}`
    }

    if (subgraphs && subgraphs.length > 0) {
        const subgraphsString = subgraphs.join(', ')
        message += ` (${subgraphsString})`
    }

    let submessage = `#: ${entry.number}, Nodes: ${Object.keys(entry.prompt).length}`

    if (Object.keys(entry.outputs).length > 0) {
        const imageCount = Object.values(entry.outputs).filter(o => o.images).flatMap(o => o.images).length
        submessage = `Images: ${imageCount}`
    }

    return {
        entry,
        message,
        submessage,
        date: dateStr,
        status,
        images: []
    }
}

function convertPendingEntry(entry: QueueEntry, status: QueueUIEntryStatus): QueueUIEntry {
    const result = convertEntry(entry, status);

    const thumbnails = entry.extraData?.thumbnails
    if (thumbnails) {
        result.images = [...thumbnails]
    }

    const outputs = Object.values(entry.outputs)
        .filter(o => o.images)
        .flatMap(o => o.images)
    if (outputs) {
        result.images = result.images.concat(outputs)
    }

    return result;
}

function convertCompletedEntry(entry: CompletedQueueEntry): QueueUIEntry {
    const result = convertEntry(entry.entry, entry.status);

    const images = Object.values(entry.entry.outputs)
        .filter(o => o.images)
        .flatMap(o => o.images)
    result.images = images

    if (entry.message)
        result.submessage = entry.message
    else if (entry.status === "interrupted" || entry.status === "all_cached")
        result.submessage = "Prompt was interrupted."
    if (entry.error)
        result.error = entry.error

    return result;
}

function updateFromQueue(queuePending: QueueEntry[], queueRunning: QueueEntry[]) {
    store.update(s => {
        // newest entries appear at the top
        s.queuedEntries = queuePending.map((e) => convertPendingEntry(e, "pending")).reverse();
        s.runningEntries = queueRunning.map((e) => convertPendingEntry(e, "running")).reverse();
        s.queuedEntries.sort((a, b) => a.entry.number - b.entry.number)
        s.runningEntries.sort((a, b) => a.entry.number - b.entry.number)
        s.queueUIEntries = s.queuedEntries.concat(s.runningEntries);
        console.warn("[ComfyQueue] BUILDQUEUE", s.queuedEntries.length, s.runningEntries.length)
        return s;
    })
}

function updateFromHistory(queueCompleted: CompletedQueueEntry[]) {
    store.update(s => {
        s.historyUIEntries = queueCompleted.map(convertCompletedEntry).reverse();
        console.warn("[ComfyQueue] BUILDHISTORY", s.historyUIEntries.length)
        return s
    })
}

function updateEntries(force: boolean = false) {
    const state = get(store)
    const qs = get(queueState)
    const queuePending = qs.queuePending
    const queueRunning = qs.queueRunning
    const queueCompleted = qs.queueCompleted

    const queueChanged = get(queuePending).length != state.queuedEntries.length
        || get(queueRunning).length != state.runningEntries.length;
    const historyChanged = get(queueCompleted).length != state.historyUIEntries.length;

    if (queueChanged || force) {
        updateFromQueue(get(queuePending), get(queueRunning));
    }
    if (historyChanged || force) {
        updateFromHistory(get(queueCompleted));
    }
}

function clearAll() {
    store.update(s => {
        s.queuedEntries = []
        s.runningEntries = []
        s.historyUIEntries = []
        return s
    })
    updateEntries(true);
}

function clearQueue() {
    store.update(s => {
        s.queuedEntries = []
        s.runningEntries = []
        return s
    })
    updateEntries(true);
}

function clearHistory() {
    store.update(s => {
        s.historyUIEntries = []
        return s
    })
    updateEntries(true);
}

queueState.subscribe(s => {
    updateEntries();
})

const uiStateStore: WritableUIQueueStateStore =
{
    ...store,
    updateEntries,
    clearAll,
    clearQueue,
    clearHistory,
}
export default uiStateStore;
