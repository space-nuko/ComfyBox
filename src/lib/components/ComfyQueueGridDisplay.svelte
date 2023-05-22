<script lang="ts">
 import type { QueueItemType } from "$lib/api";
 import { showLightbox } from "$lib/utils";
 import type { QueueUIEntry } from "./ComfyQueue.svelte";
 import queueState from "$lib/stores/queueState";

 export let entries: QueueUIEntry[] = [];
 export let showPrompt: (entry: QueueUIEntry) => void;
 export let clearQueue: () => Promise<void>;
 export let mode: QueueItemType = "queue";
 export let gridColumns: number = 3;

 let allEntries: [QueueUIEntry, string][] = []
 let allImages: string[] = []

 $: buildImageList(entries);

 function buildImageList(entries: QueueUIEntry[]) {
     allEntries = []
     for (const entry of entries) {
         for (const image of entry.images) {
             allEntries.push([entry, image]);
         }
     }
     allImages = allEntries.map(p => p[1]);
 }

 function handleClick(e: MouseEvent, entry: QueueUIEntry, index: number) {
     if (e.ctrlKey) {
         showPrompt(entry);
     }
     else {
         showLightbox(allImages, index, e)
     }
 }
</script>

<div class="grid-wrapper {mode}-mode">
    <div class="grid-controls">
        <div>
            <input type="range" bind:value={gridColumns} min={1} max={8} step={1} />
            <div class="button-wrapper">
                <button class="clear-queue-button secondary"
                        on:click={clearQueue}
                        disabled={$queueState.isInterrupting}>
                    🗑️
                </button>
            </div>
        </div>
    </div>
    <div class="grid-entries">
        <div class="grid" style:--cols={gridColumns}>
            {#each allEntries as [entry, image], i}
                <div class="grid-entry">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <img class="grid-entry-image"
                         on:click={(e) => handleClick(e, entry, i)}
                    src={image}
                    alt="thumbnail" />
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
 $grid-controls-height: 3rem;
 $grid-controls-margin: 0.25rem;

 .grid-wrapper {
     height: 100%;
 }

 .grid-controls {
     height: $grid-controls-height;
     position: relative;
     display: flex;
     flex-direction: column;
     margin: $grid-controls-margin 1rem;

     > div {
         width: 100%;
         height: 100%;
         display: flex;
         flex-direction: row;

         input {
             width: 100%;
             margin: auto;
         }

         .button-wrapper {
             padding: $grid-controls-margin;
             .clear-queue-button {
                 @include square-button;

                 aspect-ratio: 1/1;
                 height: 100%;
                 padding: 0.25rem;
             }
         }
     }
 }

 .grid-entries {
     height: calc(100% - #{$grid-controls-height} - #{$grid-controls-margin} * 2);
     padding: 0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
     overflow-y: auto;
 }

 .grid {
     --cols: 3;
     width: 100%;
     display: grid;
     position: relative;
     top: 0px;
     grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
     grid-auto-rows: 1fr;
     gap: var(--spacing-lg);
 }

 .grid-entry {
     display: flex;
     justify-content: center;
     align-items: center;
     aspect-ratio: 1 / 1;
     object-fit: cover;
 }

 .grid-entry-image {
     aspect-ratio: 1 / 1;
     object-fit: cover;

     &:hover {
         cursor: pointer;
         filter: brightness(120%) contrast(120%);
     }
 }
</style>
