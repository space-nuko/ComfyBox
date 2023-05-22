<script lang="ts">
 import type { QueueItemType } from "$lib/api";
 import { truncateString } from "$lib/utils";
 import type { QueueUIEntry } from "./ComfyQueue.svelte";

 export let entries: QueueUIEntry[] = [];
 export let showPrompt: (entry: QueueUIEntry) => void;
 export let showLightbox: (images: string[], index: number, e: Event) => void;
 export let mode: QueueItemType = "queue";
</script>

<div class="queue-wrapper {mode}-mode">
    {#each entries as entry}
        <div class="queue-entry {entry.status}" on:click={(e) => showPrompt(entry, e)}>
            {#if entry.images.length > 0}
                <div class="queue-entry-images"
                     style="--cols: {Math.ceil(Math.sqrt(Math.min(entry.images.length, 4)))}" >
                    {#each entry.images.slice(0, 4) as image, i}
                        <div>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <img class="queue-entry-image"
                                 on:click={(e) => showLightbox(entry.images, i, e)}
                            src={image}
                            alt="thumbnail" />
                        </div>
                    {/each}
                </div>
            {/if}
            <div class="queue-entry-details">
                <div class="queue-entry-message">
                    {truncateString(entry.message, 20)}
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
</div>

<style lang="scss">
 .queue-wrapper {
     height: 100%;
     display: flex;
     overflow-y: auto;
     flex-flow: column nowrap;

     &.queue-mode > :global(:first-child) {
         // elements stick to bottom in queue mode only
         // next element in queue is on the bottom
         margin-top: auto !important;
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

         &.running {
             background: var(--comfy-accent-soft);
         }
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
         background: var(--block-background-fill);
         border: 3px dashed var(--neutral-500);
     }
     &.pending, &.unknown {
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
</style>
