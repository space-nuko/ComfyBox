<script lang="ts" context="module">
 export type QueueUIEntryStatus = QueueEntryStatus | "pending" | "running";

 export type QueueUIEntry = {
     entry: QueueEntry,
     message: string,
     submessage: string,
     date?: string,
     status: QueueUIEntryStatus,
     images?: string[], // URLs
     details?: string // shown in a tooltip on hover
 }
</script>

<script lang="ts">
 import queueState, { type CompletedQueueEntry, type QueueEntry, type QueueEntryStatus } from "$lib/stores/queueState";
 import ProgressBar from "./ProgressBar.svelte";
 import Spinner from "./Spinner.svelte";
 import PromptDisplay from "./PromptDisplay.svelte";
 import { List, ListUl, Grid } from "svelte-bootstrap-icons";
 import { convertComfyOutputToComfyURL, convertFilenameToComfyURL, getNodeInfo, truncateString } from "$lib/utils"
 import type { Writable } from "svelte/store";
 import type { QueueItemType } from "$lib/api";
 import { ImageViewer } from "$lib/ImageViewer";
 import { Button } from "@gradio/button";
 import type ComfyApp from "./ComfyApp";
 import { tick } from "svelte";
 import Modal from "./Modal.svelte";
 import DropZone from "./DropZone.svelte";
	import workflowState from "$lib/stores/workflowState";
 import ComfyQueueListDisplay from "./ComfyQueueListDisplay.svelte";
 import ComfyQueueGridDisplay from "./ComfyQueueGridDisplay.svelte";

 export let app: ComfyApp;

 let queuePending: Writable<QueueEntry[]> | null = null;
 let queueRunning: Writable<QueueEntry[]> | null = null;
 let queueCompleted: Writable<CompletedQueueEntry[]> | null = null;
 let queueList: HTMLDivElement | null = null;

 $: if ($queueState) {
     queuePending = $queueState.queuePending
     queueRunning = $queueState.queueRunning
     queueCompleted = $queueState.queueCompleted
 }

 type DisplayModeType = "list" | "grid";

 let mode: QueueItemType = "queue";
 let displayMode: DisplayModeType = "list";
 let imageSize: number = 40;
 let gridColumns: number = 3;
 let changed = true;

 function switchMode(newMode: QueueItemType) {
     changed = mode !== newMode
     mode = newMode
     if (changed) {
         _queuedEntries = []
         _runningEntries = []
         _entries = []
     }
 }

 function switchDisplayMode(newDisplayMode: DisplayModeType) {
     // changed = displayMode !== newDisplayMode
     displayMode = newDisplayMode
     // if (changed) {
     //     _queuedEntries = []
     //     _runningEntries = []
     //     _entries = []
     // }
 }

 let _queuedEntries: QueueUIEntry[] = []
 let _runningEntries: QueueUIEntry[] = []
 let _entries: QueueUIEntry[] = []

 $: if (mode === "queue" && (changed || $queuePending.length != _queuedEntries.length || $queueRunning.length != _runningEntries.length)) {
     updateFromQueue();
     changed = false;
 }
 else if (mode === "history" && (changed || $queueCompleted.length != _entries.length)) {
     updateFromHistory();
     changed = false;
 }

 $: if (mode === "queue" && !$queuePending && !$queueRunning) {
     _queuedEntries = []
     _runningEntries = []
     _entries = [];
     changed = true
 }

 async function deleteEntry(entry: QueueUIEntry, event: MouseEvent) {
     event.preventDefault();
     event.stopImmediatePropagation()

     // TODO support interrupting from multiple running items!
     if (entry.status === "running") {
         await app.interrupt();
     }
     else {
         await app.deleteQueueItem(mode, entry.entry.promptID);
     }

     if (mode === "queue") {
         _queuedEntries = []
         _runningEntries = []
     }

     _entries = [];
     changed = true;
 }

 async function clearQueue() {
     await app.clearQueue(mode);

     if (mode === "queue") {
         _queuedEntries = []
         _runningEntries = []
     }

     _entries = [];
     changed = true;
 }

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
     if (subgraphs?.length > 0)
         message += ` (${subgraphs.join(', ')})`

     let submessage = `Nodes: ${Object.keys(entry.prompt).length}`

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
         result.images = thumbnails.map(convertComfyOutputToComfyURL);
     }

     const outputs = Object.values(entry.outputs)
                           .filter(o => o.images)
                           .flatMap(o => o.images)
                           .map(convertComfyOutputToComfyURL);
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
                          .map(convertComfyOutputToComfyURL);
     result.images = images

     if (entry.message)
         result.submessage = entry.message
     else if (entry.status === "interrupted" || entry.status === "all_cached")
         result.submessage = "Prompt was interrupted."
     if (entry.error)
         result.details = entry.error

     return result;
 }

 async function updateFromQueue() {
     // newest entries appear at the top
     _queuedEntries = $queuePending.map((e) => convertPendingEntry(e, "pending")).reverse();
     _runningEntries = $queueRunning.map((e) => convertPendingEntry(e, "running")).reverse();
     _entries = [..._queuedEntries, ..._runningEntries]
     if (queueList) {
         await tick(); // Wait for list size to be recalculated
         queueList.scroll({ top: queueList.scrollHeight })
     }
     console.warn("[ComfyQueue] BUILDQUEUE", _entries.length, $queuePending.length, $queueRunning.length)
 }

 async function updateFromHistory() {
     _entries = $queueCompleted.map(convertCompletedEntry).reverse();
     if (queueList) {
         queueList.scrollTo(0, 0);
     }
     console.warn("[ComfyQueue] BUILDHISTORY", _entries.length, $queueCompleted.length)
 }

 async function interrupt() {
     await app.interrupt();
 }

 let showModal = false;
 let expandAll = false;
 let selectedPrompt = null;
 let selectedImages = [];
 function showPrompt(entry: QueueUIEntry) {
     selectedPrompt = entry.entry.prompt;
     selectedImages = entry.images;
     showModal = true;
     expandAll = false
 }

 function closeModal() {
     selectedPrompt = null
     selectedImages = []
     showModal = false;
     expandAll = false;
     console.warn("CLOSEMODAL")
 }

 let queued = false
 $: queued = Boolean($queueState.runningNodeID || $queueState.progress);

 let inProgress = false;
 $: inProgress = typeof $queueState.queueRemaining === "number" && $queueState.queueRemaining > 0;
</script>


<Modal bind:showModal>
    <div slot="header" class="prompt-modal-header">
        <h1 style="padding-bottom: 1rem;">Prompt Details</h1>
    </div>
    <svelte:fragment let:closeDialog>
        {#if selectedPrompt}
            <PromptDisplay closeModal={() => { closeModal(); closeDialog(); }} {app} prompt={selectedPrompt} images={selectedImages} {expandAll} />
        {/if}
    </svelte:fragment>
    <div slot="buttons" let:closeDialog>
        <Button variant="secondary" on:click={closeDialog}>
            Close
        </Button>
        <Button variant="secondary" on:click={() => (expandAll = !expandAll)}>
            Expand All
        </Button>
    </div>
</Modal>

<div class="queue {mode}-mode">
    {#if mode === "history"}
        <div class="display-mode-buttons">
            <div class="mode-button image-display-button ternary"
                 on:click={() => switchDisplayMode("list")}
                class:selected={displayMode === "list"}>
                <List width="100%" height="100%" />
            </div>
            <div class="mode-button image-display-button ternary"
                 on:click={() => switchDisplayMode("grid")}
                class:selected={displayMode === "grid"}>
                <Grid width="100%" height="100%" />
            </div>
        </div>
    {/if}
    <div class="queue-entries" bind:this={queueList}>
        {#if _entries.length > 0}
            {#if mode === "history" && displayMode === "grid"}
                <ComfyQueueGridDisplay entries={_entries} {showPrompt} {clearQueue} {mode} bind:gridColumns />
            {:else}
                <ComfyQueueListDisplay entries={_entries} {showPrompt} {clearQueue} {mode} {deleteEntry} bind:imageSize />
            {/if}
        {:else}
            <div class="queue-empty">
                <div class="queue-empty-container">
                    <div class="queue-empty-icon">
                        <ListUl width="100%" height="10rem" />
                    </div>
                    <div class="queue-empty-message">
                        (No entries)
                    </div>
                </div>
            </div>
        {/if}
    </div>
    <div class="mode-buttons">
        <div class="mode-button secondary"
             on:click={() => switchMode("queue")}
            class:selected={mode === "queue"}>
            Queue
        </div>
        <div class="mode-button secondary"
             on:click={() => switchMode("history")}
            class:selected={mode === "history"}>
            History
        </div>
    </div>
    <div class="bottom">
        <div class="queue-remaining" class:queued class:in-progress={inProgress}>
            {#if inProgress}
                <Spinner />
                <div class="status">
                    Queued prompts: {$queueState.queueRemaining}
                </div>
            {:else}
                <div>
                    Nothing queued.
                </div>
            {/if}
        </div>
        {#if queued}
            <div class="node-name">
                <span>Node: {getNodeInfo($queueState.runningNodeID)}</span>
            </div>
            <div>
                <ProgressBar value={$queueState.progress?.value} max={$queueState.progress?.max} />
            </div>
            <div class="queue-action-buttons">
                <Button variant="secondary"
                        disabled={$queueState.isInterrupting}
                        on:click={interrupt}
                        style={{ full_width: true }}>
                    Interrupt
                </Button>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
 $pending-height: 200px;
 $display-mode-buttons-height: 2rem;
 $bottom-bar-height: 70px;
 $workflow-tabs-height: 2.5rem;
 $mode-buttons-height: 30px;
 $queue-height: calc(100vh - #{$pending-height} - #{$mode-buttons-height} - #{$bottom-bar-height} - #{$workflow-tabs-height} - 0.9rem);
 $queue-height-history: calc(#{$queue-height} - #{$display-mode-buttons-height});

 .prompt-modal-header {
     padding-left: 0.2rem;

     h1 {
         font-size: large;
     }
}
 .queue {
     color: var(--body-text-color);

     &.queue-mode > .queue-entries {
         height: $queue-height;
         max-height: $queue-height;
     }

     &.history-mode > .queue-entries {
         height: $queue-height-history;
         max-height: $queue-height-history;
     }
 }

 .queue-entries {
     display: flex;
     flex-flow: column nowrap;
     height: $queue-height;

     > .queue-empty {
         display: flex;
         color: var(--comfy-accent-soft);
         flex-direction: row;
         margin: auto;
         height: 100%;

         > .queue-empty-container {
             margin: auto;
             display: flex;
             flex-direction: column;

             > .queue-empty-icon {
                 margin: auto;
             }
             > .queue-empty-message {
                 margin: auto;
                 font-size: 32px;
                 font-weight: bolder;
             }
         }
     }
 }

 .display-mode-buttons {
     display: flex;
     flex-direction: row;
     top: 0px;
     height: $display-mode-buttons-height;
     margin-bottom: auto;

     > .mode-button {
         width: 100%;
         color: var(--neutral-500);

         &.selected {
             color: var(--body-text-color);
         }
     }
 }

 .mode-buttons {
     display: flex;
     flex-direction: row;
     justify-content: center;
     height: 100%;

     > .mode-button {
         width: 100%;
     }
 }

 .mode-button {
     height: calc($mode-buttons-height);
     padding: 0.2rem;

     @include square-button;
 }

 :global(.dark) .mode-button {
     filter: none;
     &:hover {
         filter: brightness(120%);
     }
     &:active {
         filter: brightness(50%)
     }
     &.selected {
         filter: brightness(150%)
     }
 }

 .bottom {
     width: 100%;
     height: calc($pending-height);
     position: absolute;

     .node-name {
         background-color: var(--comfy-node-name-background);
         color: var(--comfy-node-name-foreground);
         padding: 0.2em;
         margin: 5px;
         display: flex;
         justify-content: center;
         align-items: center;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
     }

     .queue-remaining {
         height: calc($pending-height - $bottom-bar-height - 50px);
         width: 100%;
         text-align: center;
         position: relative;
         display: flex;
         justify-content: space-evenly;
         align-items: center;
         background: var(--panel-background-fill);

         > .status {
         }

         &.queued {
             height: calc($pending-height - $mode-buttons-height - $bottom-bar-height - 16px);
         }
     }

     .queue-action-buttons {
         margin: 5px;
         height: 20px;

         :global(button) {
             border-radius: 0px !important;
         }
     }
 }
</style>
