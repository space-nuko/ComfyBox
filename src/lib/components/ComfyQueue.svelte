<script lang="ts">
 import queueState, { type CompletedQueueEntry, type QueueEntry, type QueueEntryStatus } from "$lib/stores/queueState";
 import ProgressBar from "./ProgressBar.svelte";
 import Spinner from "./Spinner.svelte";
 import PromptDisplay from "./PromptDisplay.svelte";
 import { ListIcon as List } from "svelte-feather-icons";
 import { convertComfyOutputToComfyURL, convertFilenameToComfyURL, getNodeInfo } from "$lib/utils"
 import type { Writable } from "svelte/store";
 import type { QueueItemType } from "$lib/api";
 import { ImageViewer } from "$lib/ImageViewer";
 import { Button } from "@gradio/button";
 import type ComfyApp from "./ComfyApp";
 import { tick } from "svelte";
 import Modal from "./Modal.svelte";
 import DropZone from "./DropZone.svelte";
	import workflowState from "$lib/stores/workflowState";

 export let app: ComfyApp;

 let queuePending: Writable<QueueEntry[]> | null = null;
 let queueRunning: Writable<QueueEntry[]> | null = null;
 let queueCompleted: Writable<CompletedQueueEntry[]> | null = null;
 let queueList: HTMLDivElement | null = null;

 type QueueUIEntry = {
     entry: QueueEntry,
     message: string,
     submessage: string,
     date?: string,
     status: QueueEntryStatus | "pending" | "running",
     images?: string[], // URLs
     details?: string // shown in a tooltip on hover
 }

 $: if ($queueState) {
     queuePending = $queueState.queuePending
     queueRunning = $queueState.queueRunning
     queueCompleted = $queueState.queueCompleted
 }

 let mode: QueueItemType = "queue";

 function switchMode(newMode: QueueItemType) {
     const changed = mode !== newMode
     mode = newMode
     if (changed)
         _entries = []
 }

 let _entries: QueueUIEntry[] = []

 $: if (mode === "queue" && $queuePending && $queuePending.length != _entries.length) {
     updateFromQueue();
 }
 else if (mode === "history" && $queueCompleted && $queueCompleted.length != _entries.length) {
     updateFromHistory();
 }

 function formatDate(date: Date): string {
     const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
     const day = date.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(',', '');
     return [time, day].join(", ")
 }

 function convertEntry(entry: QueueEntry): QueueUIEntry {
     let date = entry.finishedAt || entry.queuedAt;
     let dateStr = null;
     if (date) {
         dateStr = formatDate(date);
     }

     const subgraphs: string[] | null = entry.extraData?.extra_pnginfo?.comfyBoxPrompt?.subgraphs;

     let message = "Prompt";
     if (entry.workflowID != null) {
         const workflow = workflowState.getWorkflow(entry.workflowID);
         if (workflow != null && workflow.attrs.title) {
             message = `Workflow: ${workflow.attrs.title}`
         }
         if (subgraphs?.length > 0)
             message += ` (${subgraphs.join(', ')})`
     }

     let submessage = `Nodes: ${Object.keys(entry.prompt).length}`

     if (Object.keys(entry.outputs).length > 0) {
         const imageCount = Object.values(entry.outputs).flatMap(o => o.images).length
         submessage = `Images: ${imageCount}`
     }

     return {
         entry,
         message,
         submessage,
         date: dateStr,
         status: "pending",
         images: []
     }
 }

 function convertPendingEntry(entry: QueueEntry): QueueUIEntry {
     const result = convertEntry(entry);

     const thumbnails = entry.extraData?.thumbnails
     if (thumbnails) {
         result.images = thumbnails.map(convertComfyOutputToComfyURL);
     }

     return result;
 }

 function convertCompletedEntry(entry: CompletedQueueEntry): QueueUIEntry {
     const result = convertEntry(entry.entry);
     result.status = entry.status;

     const images = Object.values(entry.entry.outputs).flatMap(o => o.images)
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
     _entries = $queuePending.map(convertPendingEntry).reverse(); // newest entries appear at the top
     if (queueList) {
         await tick(); // Wait for list size to be recalculated
         queueList.scroll({ top: queueList.scrollHeight })
     }
     console.warn("[ComfyQueue] BUILDQUEUE", _entries, $queuePending)
 }

 async function updateFromHistory() {
     _entries = $queueCompleted.map(convertCompletedEntry).reverse();
     if (queueList) {
         queueList.scrollTo(0, 0);
     }
     console.warn("[ComfyQueue] BUILDHISTORY", _entries, $queueCompleted)
 }

 function showLightbox(entry: QueueUIEntry, index: number, e: Event) {
     e.preventDefault()
     if (!entry.images)
         return

     ImageViewer.instance.showModal(entry.images, index);

     e.stopPropagation()
 }

 async function interrupt() {
     if ($queueState.isInterrupting)
         return

     const app = (window as any).app as ComfyApp;
     if (!app || !app.api)
         return;

     await app.api.interrupt()
              .then(() => {
                  queueState.update(s => { s.isInterrupting = true; return s })
              });
 }

 let showModal = false;
 let expandAll = false;
 let selectedPrompt = null;
 let selectedImages = [];
 function showPrompt(entry: QueueUIEntry, e: MouseEvent) {
     selectedPrompt = entry.entry.prompt;
     selectedImages = entry.images;
     showModal = true;
     expandAll = false
 }

 $: if(!showModal)
     selectedPrompt = null;

 let queued = false
 $: queued = Boolean($queueState.runningNodeID || $queueState.progress);

 let inProgress = false;
 $: inProgress = typeof $queueState.queueRemaining === "number" && $queueState.queueRemaining > 0;
</script>


<Modal bind:showModal>
    <div slot="header" class="prompt-modal-header">
        <h1 style="padding-bottom: 1rem;">Prompt Details</h1>
    </div>
    {#if selectedPrompt}
        <PromptDisplay prompt={selectedPrompt} images={selectedImages} {expandAll} />
    {/if}
    <div slot="buttons" let:closeDialog>
        <Button variant="secondary" on:click={closeDialog}>
            Close
        </Button>
        <Button variant="secondary" on:click={() => (expandAll = !expandAll)}>
            Expand All
        </Button>
    </div>
</Modal>

<div class="queue">
    <!-- <DropZone {app} /> -->
    <div class="queue-entries {mode}-mode" bind:this={queueList}>
        {#if _entries.length > 0}
            {#each _entries as entry}
                <div class="queue-entry {entry.status}" on:click={(e) => showPrompt(entry, e)}>
                    {#if entry.images.length > 0}
                         <div class="queue-entry-images"
                              style="--cols: {Math.ceil(Math.sqrt(Math.min(entry.images.length, 4)))}" >
                            {#each entry.images.slice(0, 4) as image, i}
                                <div>
                                    <img class="queue-entry-image"
                                         on:click={(e) => showLightbox(entry, i, e)}
                                         src={image}
                                         alt="thumbnail" />
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <!-- <div class="queue-entry-image-placeholder" /> -->
                    {/if}
                    <div class="queue-entry-details">
                        <div class="queue-entry-message">
                            {entry.message}
                        </div>
                        <div class="queue-entry-submessage">
                            {entry.submessage}
                        </div>
                    </div>
                </div>
                <div class="queue-entry-rest {entry.status}">
                    {#if entry.date != null}
                        <span class="queue-entry-queued-at">
                            {entry.date}
                        </span>
                    {/if}
                </div>
            {/each}
        {:else}
            <div class="queue-empty">
                <div class="queue-empty-container">
                    <div class="queue-empty-icon">
                        <List size="120rem" />
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
            class:mode-selected={mode === "queue"}>
            Queue
        </div>
        <div class="mode-button secondary"
             on:click={() => switchMode("history")}
            class:mode-selected={mode === "history"}>
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
 $bottom-bar-height: 70px;
 $workflow-tabs-height: 2.5rem;
 $mode-buttons-height: 30px;
 $queue-height: calc(100vh - #{$pending-height} - #{$mode-buttons-height} - #{$bottom-bar-height} - #{$workflow-tabs-height} - 0.9rem);

 .prompt-modal-header {
     padding-left: 0.2rem;

     h1 {
         font-size: large;
     }
}
 .queue {
     color: var(--body-text-color);
 }

 .queue-entries {
     height: $queue-height;
     max-height: $queue-height;
     display: flex;
     overflow-y: auto;
     flex-flow: column nowrap;

     &.queue-mode > :first-child {
         // elements stick to bottom in queue mode only
         // next element in queue is on the bottom
         margin-top: auto !important;
     }

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

 .queue-entry {
     padding: 1.0rem;
     display: flex;
     flex-direction: row;
     border-bottom: 1px solid var(--block-border-color);
     border-top: 1px solid var(--table-border-color);
     background: var(--panel-background-fill);
     max-height: 14rem;

     &:hover:not(:has(img:hover)) {
         cursor: pointer;
         background: var(--block-background-fill);
     }

     &.success {
         /* background: green; */
     }
     &.error {
         background: red;
     }
     &.all_cached, &.interrupted {
         filter: brightness(80%);
         background: var(--comfy-disabled-textbox-background-fill);
         color: var(--comfy-disable-textbox-text-color);
     }
     &.running {
         /* background: lightblue; */
     }
     &.pending, &.unknown {
         /* background: orange; */
     }
 }

 .queue-entry-rest {
     width: 100%;
     position: relative;

     &.all_cached, &.interrupted {
         filter: brightness(80%);
         color: var(--comfy-accent-soft);
     }
 }

 $thumbnails-size: 12rem;

 .queue-entry-images {
     --cols: 1;
     margin: auto;
     width: calc($thumbnails-size * 2);
     display: grid;
     display: inline-grid;
     grid-template-columns: repeat(var(--cols), 1fr);
     grid-template-rows: repeat(var(--cols), 1fr);
     column-gap: 1px;
     row-gap: 1px;
     vertical-align: top;
     flex: 1 1 40%;

     img {
         aspect-ratio: 1 / 1;
         object-fit: cover;

         &:hover {
             cursor: pointer;
             filter: brightness(120%) contrast(120%);
         }
     }
 }

 .queue-entry-details {
     position: relative;
     padding: 1rem;
     width: 100%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     white-space: nowrap;
 }

 .queue-entry-message {
     font-size: 15px;
 }

 .queue-entry-submessage {
     font-size: 12px;
 }

 .queue-entry-queued-at {
     width: auto;
     font-size: 12px;
     position:absolute;
     right: 0px;
     bottom: 0px;
     padding: 0.4rem 0.6rem;
     color: var(--body-text-color);
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
     border: 1px solid var(--panel-border-color);
     font-weight: bold;
     text-align: center;
     margin: auto;

     &.primary {
         background: var(--button-primary-background-fill);
         &:hover {
             background: var(--button-primary-background-fill-hover);
         }
     }

     &.secondary {
         background: var(--button-secondary-background-fill);
         &:hover {
             background: var(--button-secondary-background-fill-hover);
         }
     }

     &:hover {
         filter: brightness(85%);
     }
     &:active {
         filter: brightness(50%)
     }
     &.mode-selected {
         filter: brightness(80%)
     }
 }

 :global(.dark) .mode-button {
     filter: none;
     &:hover {
         filter: brightness(120%);
     }
     &:active {
         filter: brightness(50%)
     }
     &.mode-selected {
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
