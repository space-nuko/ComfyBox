<script lang="ts">
 import queueState, { type CompletedQueueEntry, type QueueEntry, type QueueEntryStatus } from "$lib/stores/queueState";
 import ProgressBar from "./ProgressBar.svelte";
 import Spinner from "./Spinner.svelte";
 import { convertComfyOutputToComfyURL, convertFilenameToComfyURL, getNodeInfo } from "$lib/utils"
 import type { Writable } from "svelte/store";
 import type { QueueItemType } from "$lib/api";

 let queuePending: Writable<QueueEntry[]> | null = null;
 let queueRunning: Writable<QueueEntry[]> | null = null;
 let queueCompleted: Writable<CompletedQueueEntry[]> | null = null;

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
     console.warn("SwitchMode", newMode)
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
     return result;
 }

 function updateFromQueue() {
     _entries = $queuePending.map(convertEntry);
     console.warn("[ComfyQueue] BUILDQUEUE", _entries, $queuePending)
 }

 function updateFromHistory() {
     _entries = $queueCompleted.map(convertCompletedEntry);
     console.warn("[ComfyQueue] BUILDHISTORY", _entries, $queueCompleted)
 }

 let queued = false
 $: queued = Boolean($queueState.runningNodeID || $queueState.progress);

 let inProgress = false;
 $: inProgress = typeof $queueState.queueRemaining === "number" && $queueState.queueRemaining > 0;
</script>

<div class="queue">
    <div class="queue-entries">
        {#each _entries as entry}
            <div class="queue-entry {entry.status}">
                {#if entry.images.length > 0}
                    <img class="queue-entry-image" src={entry.images[0]} alt="thumbnail" />
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
    </div>
    <div class="mode-buttons">
        <div class="mode-button"
             on:click={() => switchMode("queue")}
            class:mode-selected={mode === "queue"}>
            Queue
        </div>
        <div class="mode-button"
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
 }

 .queue-entry {
     padding: 1.0rem;
     display: flex;
     flex-direction: row;
     border-bottom: 1px solid var(--panel-border-color);
     background: var(--panel-background-fill);

     &.success {
         /* background: green; */
     }
     &.error {
         background: red;
     }
     &.all_cached {
         background: grey;
     }
     &.running {
         /* background: lightblue; */
     }
     &.pending, &.unknown {
         /* background: orange; */
     }
 }

 .queue-entry-image {
     width: var(--size-20);
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
     bottom:0px;
     padding: 0.0rem 0.4rem;
     color: var(--body-text-color);
 }

 .mode-buttons {
     height: calc($mode-buttons-height);
     display: flex;
     flex-direction: row;
     text-align: center;
     justify-content: center;

     .mode-button {
         padding: 0.2rem;
         width: 100%;
         height: 100%;
         border: 1px solid var(--panel-border-color);
         font-weight: bold;
         background: var(--button-secondary-background-fill);

         &:hover {
             background: var(--button-secondary-background-fill-hover);
             filter: brightness(120%);
         }
         &:active {
             filter: brightness(50%)
         }
         &.mode-selected {
             filter: brightness(150%)
         }
     }
 }

 .bottom {
     width: 100%;
     height: calc($pending-height);
     position: absolute;
     border: 2px solid var(--panel-border-color);

     .node-name {
         background-color: var(--comfy-node-name-background);
         color: var(--comfy-node-name-foreground);
         padding: 0.2em;
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
             height: calc($pending-height - $bottom-bar-height);
         }
     }
 }
</style>
