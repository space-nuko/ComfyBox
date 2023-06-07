<script lang="ts">
 import type { QueueItemType } from "$lib/api";
 import { convertComfyOutputToComfyURL, showLightbox, truncateString } from "$lib/utils";
 import queueState from "$lib/stores/queueState";
 import type { QueueUIEntry } from "$lib/stores/uiQueueState";

 export let entries: QueueUIEntry[] = [];
 export let showPrompt: (entry: QueueUIEntry) => void;
 export let clearQueue: () => void;
 export let deleteEntry: (entry: QueueUIEntry, event: MouseEvent) => void;
 export let mode: QueueItemType = "queue";
 export let imageSize: number = 40;
</script>

<div class="list-wrapper {mode}-mode">
    {#if mode === "history"}
        <div class="list-controls">
            <div>
                <input type="range" bind:value={imageSize} min={10} max={100} step={0.1} />
                <div class="button-wrapper">
                    <button class="clear-queue-button secondary"
                            on:click={clearQueue}
                            disabled={$queueState.isInterrupting}>
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    {/if}
    <div class="list-entries {mode}-mode" style:--imageSize={imageSize}>
        {#each entries as entry}
            <div class="list-entry {entry.status}" on:click={(e) => showPrompt(entry, e)}>
            <button class="list-entry-delete-button secondary"
                    on:click={(e) => deleteEntry(entry, e)}
                    disabled={$queueState.isInterrupting}>
                <span>✕</span>
            </button>
                {#if entry.images.length > 0}
                    <div class="list-entry-images"
                         style="--cols: {Math.ceil(Math.sqrt(Math.min(entry.images.length, 4)))}" >
                        {#each entry.images.slice(0, 4) as image, i}
                            {@const imageURL = convertComfyOutputToComfyURL(image, true)}
                            <div>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <img class="list-entry-image"
                                     on:click={(e) => showLightbox(entry.images, i, e)}
                                src={imageURL}
                                loading="lazy"
                                alt="thumbnail" />
                            </div>
                        {/each}
                    </div>
                {/if}
                <div class="list-entry-details">
                    <div class="list-entry-message">
                        {truncateString(entry.message, 20)}
                    </div>
                    <div class="list-entry-submessage">
                        {entry.submessage}
                    </div>
                </div>
            </div>
            <div class="list-entry-rest {entry.status}">
                {#if entry.date != null}
                    <span class="list-entry-queued-at">
                        {entry.date}
                    </span>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
 $list-controls-height: 3rem;
 $list-controls-margin: 0.25rem;

 .list-wrapper {
     height: 100%;

     &.queue-mode .list-entries > :global(:first-child) {
         // elements stick to bottom in queue mode only
         // next element in queue is on the bottom
         margin-top: auto !important;
     }
 }

 .list-entries {
     --imageSize: 40;
     height: 100%;
     &.history-mode {
         height: calc(100% - #{$list-controls-height} - #{$list-controls-margin} * 2);
     }
     overflow-y: auto;
     display: flex;
     flex-flow: column nowrap;
 }

 .list-controls {
     height: $list-controls-height;
     position: relative;
     display: flex;
     flex-direction: column;
     margin: $list-controls-margin 1rem;

     > div {
         width: 100%;
         height: 100%;
         display: flex;
         flex-direction: row;
         justify-content: center;

         input {
             width: 100%;
             margin: auto;
         }

         .button-wrapper {
             padding: $list-controls-margin;
             .clear-queue-button {
                 @include square-button;

                 aspect-ratio: 1/1;
                 height: 100%;
                 padding: 0.25rem;
             }
         }
     }
 }

 .list-entry {
     padding: 1.0rem;
     display: flex;
     flex-direction: row;
     border-bottom: 1px solid var(--block-border-color);
     border-top: 1px solid var(--table-border-color);
     background: var(--panel-background-fill);
     max-height: 14rem;
     position: relative;

     &:hover:not(:has(img:hover)):not(:has(button:hover)) {
         cursor: pointer;
         background: var(--block-background-fill);

         &.running {
             background: var(--comfy-accent-soft);
         }
     }

     &.success {
         /* background: green; */
     }
     &.validation_failed {
         background: #551a1a;
     }
     &.error {
         background: #401a40;
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

 .list-entry-delete-button {
     @include square-button;

     display: flex;
     position: absolute;
     width: 1.4rem;
     height: 1.4rem;
     text-align: center;
     align-items: center;
     font-size: 10pt;
     justify-content: center;
     text-align: center;
     top:0;
     right:0.5rem;
     margin: 0.5rem;
     z-index: var(--layer-1);

     opacity: 70%;
     background: var(--neutral-700);
     color: var(--neutral-300);

     &:hover {
         opacity: 100%;
         color: var(--neutral-100);
     }

 }

 .list-entry-rest {
     width: 100%;
     position: relative;

     &.all_cached, &.interrupted {
         filter: brightness(80%);
         color: var(--comfy-accent-soft);
     }
 }

 $thumbnails-size: 12rem;

 .list-entry-images {
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
     flex-grow: 1;
     flex-shrink: 1;
     flex-basis: calc(var(--imageSize) * 1%);

     img {
         aspect-ratio: 1 / 1;
         object-fit: cover;

         &:hover {
             cursor: pointer;
             filter: brightness(120%) contrast(120%);
         }
     }
 }

 .list-entry-details {
     position: relative;
     padding: 1rem;
     width: 100%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     white-space: nowrap;
 }

 .list-entry-message {
     font-size: 15px;
 }

 .list-entry-submessage {
     font-size: 12px;
 }

 .list-entry-queued-at {
     width: auto;
     font-size: 12px;
     position:absolute;
     right: 0px;
     bottom: 0px;
     padding: 0.4rem 0.6rem;
     color: var(--body-text-color);
 }
</style>
