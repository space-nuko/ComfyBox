<script lang="ts">
 import queueState, { type CompletedQueueEntry, type QueueEntry, type QueueEntryStatus } from "$lib/stores/queueState";
 import ProgressBar from "./ProgressBar.svelte";
 import Spinner from "./Spinner.svelte";
 import { ListIcon as List } from "svelte-feather-icons";
 import { convertComfyOutputToComfyURL, convertFilenameToComfyURL, getNodeInfo } from "$lib/utils"
 import type { Writable } from "svelte/store";
 import type { QueueItemType } from "$lib/api";
	import { ImageViewer } from "$lib/ImageViewer";
	import { Button } from "@gradio/button";
	import type ComfyApp from "./ComfyApp";
	import { tick } from "svelte";

 let queuePending: Writable<QueueEntry[]> | null = null;
 let queueRunning: Writable<QueueEntry[]> | null = null;
 let queueCompleted: Writable<CompletedQueueEntry[]> | null = null;
 let queueList: HTMLDivElement | null = null;

 type QueueUIEntry = {
     message: string,
     submessage: string,
     date?: string,
     status: QueueEntryStatus | "pending" | "running",
     images?: string[], // URLs
     error?: string
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

 function convertEntry(entry: QueueEntry): QueueUIEntry {
     const images = Object.values(entry.outputs).flatMap(o => o.images)
         .map(convertComfyOutputToComfyURL);

     let date = null;
     if (entry.queuedAt) {
         const options: Intl.DateTimeFormatOptions = {
             year: 'numeric',
             month: '2-digit',
             day: '2-digit',
             hour: 'numeric',
             minute: 'numeric'
         };
         const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
         date = dateTimeFormat.format(entry.queuedAt);
     }

     let message = "Prompt";
     if (entry.extraData.subgraphs)
         message = `Prompt: ${entry.extraData.subgraphs.join(', ')}`

     let submessage = `Nodes: ${Object.keys(entry.prompt).length}`
     if (Object.keys(entry.outputs).length > 0) {
         submessage = `Images: ${Object.keys(entry.outputs).length}`
     }

     return {
         message,
         submessage,
         date,
         status: "pending",
         images
     }
 }

 function convertCompletedEntry(entry: CompletedQueueEntry): QueueUIEntry {
     const result = convertEntry(entry.entry);
     result.status = entry.status;
     result.error = entry.error;

     if (result.status === "all_cached")
         result.submessage = "(Execution was cached)"

     return result;
 }

 async function updateFromQueue() {
     _entries = $queuePending.map(convertEntry).reverse(); // newest entries appear at the top
     if (queueList) {
         await tick(); // Wait for list size to be recalculated
         queueList.scroll({ top: queueList.scrollHeight })
     }
     console.warn("[ComfyQueue] BUILDQUEUE", _entries, $queuePending)
 }

 async function updateFromHistory() {
     _entries = $queueCompleted.map(convertCompletedEntry);
     if (queueList) {
         await tick(); // Wait for list size to be recalculated
         queueList.scroll({ top: queueList.scrollHeight })
     }
     console.warn("[ComfyQueue] BUILDHISTORY", _entries, $queueCompleted)
 }

 function showLightbox(entry: QueueUIEntry, e: Event) {
     e.preventDefault()
     if (!entry.images)
         return

     ImageViewer.instance.showModal(entry.images, 0)
 }

 async function interrupt() {
     const app = (window as any).app as ComfyApp;
     if (!app || !app.api)
         return;

     await app.api.interrupt();
 }

 let queued = false
 $: queued = Boolean($queueState.runningNodeID || $queueState.progress);

 let inProgress = false;
 $: inProgress = typeof $queueState.queueRemaining === "number" && $queueState.queueRemaining > 0;
</script>

<div class="queue">
    <div class="queue-entries" bind:this={queueList}>
        {#if _entries.length > 0}
            {#each _entries as entry}
                <div class="queue-entry {entry.status}">
                    {#if entry.images.length > 0}
                        <div class="queue-entry-images" on:click={(e) => showLightbox(entry, e)}>
                            <img class="queue-entry-image" src={entry.images[0]} alt="thumbnail" />
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
                    <div class="queue-entry-rest">
                        {#if entry.date != null}
                            <span class="queue-entry-queued-at">
                                {entry.date}
                            </span>
                        {/if}
                    </div>
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
                <Button variant="secondary" on:click={interrupt} style={{ full_width: true }}>
                    Interrupt
                </Button>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
 $pending-height: 200px;
 $bottom-bar-height: 70px;
 $mode-buttons-height: 30px;
 $queue-height: calc(100vh - #{$pending-height} - #{$mode-buttons-height} - #{$bottom-bar-height});

 .queue {
     color: var(--body-text-color);
 }

 .queue-entries {
     overflow-y: scroll;
     height: $queue-height;
     max-height: $queue-height;

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

     &.success {
         /* background: green; */
     }
     &.error {
         background: red;
     }
     &.all_cached {
         filter: brightness(80%);
         background: var(--neutral-600);
         color: var(--neutral-300);
     }
     &.running {
         /* background: lightblue; */
     }
     &.pending, &.unknown {
         /* background: orange; */
     }
 }

 .queue-entry-images {
     height: 100%;
     aspect-ratio: 1/1;
     margin: auto;

     > .queue-entry-image {
         filter: none;
         &:hover {
             filter: brightness(120%) contrast(120%);
         }
     }
 }

 .queue-entry-image-placeholder {
     width: var(--size-20);
     background: grey;
 }

 .queue-entry-rest {
     width: 100%;
     position: relative;
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
     font-size: 10px;
     position:absolute;
     right: 0px;
     bottom: 0px;
     padding: 0.0rem 0.4rem;
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
