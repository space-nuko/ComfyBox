<script lang="ts">
 import { Page, Navbar, Block, Tabs, Tab, NavLeft, NavTitle, NavRight, Link, f7 } from "framework7-svelte"
 import type ComfyApp from "$lib/components/ComfyApp";
 import interfaceState from "$lib/stores/interfaceState";
 import { convertComfyOutputToComfyURL, partition, showLightbox } from "$lib/utils";
 import uiQueueState, { type QueueUIEntry } from "$lib/stores/uiQueueState";
 import { showMobileLightbox } from "$lib/components/utils";
 import notify from "$lib/notify";

 export let app: ComfyApp

 let _entries: ReadonlyArray<QueueUIEntry> = []
 $: _entries = $uiQueueState.historyUIEntries;

 let allEntries: [QueueUIEntry, string][][] = []
 let allImages: string[] = []

 let gridCols = 3;

 function onPageBeforeIn() {
     $interfaceState.selectedTab = 2;
 }

 $: buildImageList(_entries);

 function buildImageList(entries: ReadonlyArray<QueueUIEntry>) {
     const _allEntries = []
     for (const entry of entries) {
         for (const image of entry.images) {
             _allEntries.push([entry, convertComfyOutputToComfyURL(image, true)]);
         }
     }
     allEntries = partition(_allEntries, gridCols);
     allImages = _allEntries.map(p => p[1]);
 }

 function handleClick(e: MouseEvent, entry: QueueUIEntry, index: number) {
     showMobileLightbox(allImages, index)
 }

 async function clearHistory() {
     f7.dialog.confirm("Are you sure you want to clear the current history?", async () => {
         await app.clearQueue("history");
         uiQueueState.updateEntries(true)
         notify("History cleared!")
     })
 }
</script>

<Page name="gallery" on:pageBeforeIn={onPageBeforeIn}>
    <Navbar>
        <NavLeft></NavLeft>
        <NavTitle>Gallery</NavTitle>
        <NavRight>
            <Link on:click={clearHistory}>🗑️</Link>
        </NavRight>
    </Navbar>

    <Block>
        {#each allEntries as group, i}
            <div class="grid grid-cols-{gridCols} grid-gap">
                {#each group as [entry, image], j}
                    {@const index = i * gridCols + j}
                    <div class="grid-entry">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <img class="grid-entry-image"
                             on:click={(e) => handleClick(e, entry, index)}
                        src={image}
                        loading="lazy"
                        alt="thumbnail" />
                    </div>
                {/each}
            </div>
        {/each}
    </Block>
</Page>

<style lang="scss">
 .container {
     overflow-x: hidden;

     // Disable pull to refresh
     overscroll-behavior-y: contain;

     // framework7's css conflicts with gradio's
     :global(.block) {
         z-index: unset; // f7 sets it to 1
     }
 }

 // TODO generalize this to all properties!
 :global(.root-container.mobile > .block > .v-pane) {
     flex-direction: column !important;
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
     margin-bottom: var(--f7-grid-gap);

     &:hover {
         cursor: pointer;
         filter: brightness(120%) contrast(120%);
     }
 }
</style>
