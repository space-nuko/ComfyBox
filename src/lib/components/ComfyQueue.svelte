<script lang="ts">
 import queueState, { type QueueEntry } from "$lib/stores/queueState";
 import ProgressBar from "./ProgressBar.svelte";
 import { getNodeInfo } from "$lib/utils"
	import type { Writable } from "svelte/store";

 let queuePending: Writable<QueueEntry[]> | null = null;
 let queueRunning: Writable<QueueEntry[]> | null = null;

 type QueueUIEntry = {
     message: string,
     submessage: string,
     date?: string,
     status: "success" | "error" | "pending" | "running" | "all_cached",
     images?: string[] // URLs
 }

 $: if ($queueState) {
     queuePending = $queueState.queuePending
     queueRunning = $queueState.queueRunning
 }

 let _entries: QueueUIEntry[] = []

 $: if ($queuePending && $queuePending.length != _entries.length) {
     _entries = []
     for (const entry of $queuePending) {
         // for (const outputs of Object.values(entry.outputs)) {
         //     const allImages = outputs.images.map(r => {
         //         // TODO configure backend URL
         //         const url = "http://localhost:8188/view?"
         //         const params = new URLSearchParams(r)
         //         return url + params
         //     });
         //
         //     _entries.push({ allImages, name: "Output" })
         // }

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

         _entries.push({
             message: "Prompt",
             submessage: ".......",
             date,
             status: "pending",
             images: null
         })
     }
     console.error("BUILDENTRIES", _entries, $queuePending)
 }
</script>

<div class="queue">
    <div class="queue-entries">
        {#each _entries as entry}
            <div class="queue-entry {entry.status}">
                {#if entry.images}
                    <img class="queue-entry-image" src={entry.images[0]} alt="thumbnail" />
                {:else}
                    <div class="queue-entry-image-placeholder" />
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
    <div class="bottom">
        {#if $queueState.runningNodeID || $queueState.progress}
            <div class="node-name">
                <span>Node: {getNodeInfo($queueState.runningNodeID)}</span>
            </div>
            <div>
                <ProgressBar value={$queueState.progress?.value} max={$queueState.progress?.max} styles="height: 30px;" />
            </div>
        {/if}
        {#if typeof $queueState.queueRemaining === "number" && $queueState.queueRemaining > 0}
            <div class="queue-remaining in-progress">
                <div>
                    Queued prompts: {$queueState.queueRemaining}.
                </div>
            </div>
        {:else}
            <div class="queue-remaining done">
                <div>
                    Nothing queued.
                </div>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
 $pending-height: 300px;

 .queue {
 }

 .queue-remaining {
     height: 5em;
     width: 100%;
     text-align: center;
     border: 5px solid #CCC;
     position: relative;
     display: flex;
     justify-content: center;
     align-items: center;
 }

 .queue-entries {
     overflow-y: scroll;
     max-height: calc(100vh - $pending-height);
 }

 .queue-entry {
     padding: 0.5rem;
     display: flex;
     flex-direction: row;
     border-top: 2px solid var(--neutral-200);
     border-bottom: 1px solid var(--neutral-400);

     &.success {
         background: green
     }
     &.error {
         background: red
     }
     &.cached {
         background: grey
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
 }

 .queue-entry-message {
     width: var(--size-20);
     font-size: large;
 }

 .queue-entry-submessage {
     width: var(--size-20);
 }

 .queue-entry-queued-at {
     width: auto;
     font-size: 14px;
     position:absolute;
     right: 0px;
     bottom:0px;
     padding: 0.0rem 0.4rem;
     /* color: var(--neutral-600) */
     color: var(--neutral-600);
 }

 .node-name {
     border: 5px solid #CCC;
     background-color: var(--color-red-300);
     padding: 0.2em;
     display: flex;
     justify-content: center;
     align-items: center;
 }

 .bottom {
     width: 100%;
     height: $pending-height;
     position: absolute;
 }

 .in-progress {
     background-color: var(--secondary-300);
 }
 .done {
     background-color: var(--color-grey-200);
 }

 .queue-item {
     height: 1.5em;
     width: 10em;
     text-align: center;
     border: 1px solid black;
 }
</style>
