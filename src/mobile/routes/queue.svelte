<script lang="ts">
 import { Page, Navbar, Block, Tabs, Tab, NavLeft, NavTitle, NavRight, Link, List, ListItem, Card, CardHeader, CardContent, CardFooter, f7 } from "framework7-svelte"
 import WidgetContainer from "$lib/components/WidgetContainer.svelte";
 import type ComfyApp from "$lib/components/ComfyApp";
 import { writable, type Writable } from "svelte/store";
 import type { IDragItem, WritableLayoutStateStore } from "$lib/stores/layoutStates";
 import workflowState, { type ComfyBoxWorkflow, type WorkflowInstID } from "$lib/stores/workflowState";
 import interfaceState from "$lib/stores/interfaceState";
 import { onMount } from "svelte";
 import GenToolbar from '../GenToolbar.svelte'
 import { convertComfyOutputToComfyURL, partition, showLightbox, truncateString } from "$lib/utils";
	import uiQueueState, { type QueueUIEntry } from "$lib/stores/uiQueueState";
	import { showMobileLightbox } from "$lib/components/utils";
	import queueState from "$lib/stores/queueState";
	import notify from "$lib/notify";

 export let app: ComfyApp

 let _entries: ReadonlyArray<QueueUIEntry> = []
 $: _entries = $uiQueueState.queueUIEntries;

 function onPageBeforeIn() {
     $interfaceState.selectedTab = 0;
 }

 async function interrupt() {
     await app.interrupt();
 }

 async function clearQueue() {
     f7.dialog.confirm("Are you sure you want to clear the current queue?", async () => {
         await app.clearQueue("queue");
         uiQueueState.updateEntries(true)
         notify("Queue cleared!")
     })
 }

 function findPrompt(entry: QueueUIEntry): string {
     let s = ""
     for (const inputs of Object.values(entry.entry.prompt)) {
         if (inputs.class_type === "CLIPTextEncode") {
             for (const [key, value] of Object.entries(inputs.inputs)) {
                 if (key === "text") {
                     s += value + "\n"
                 }
             }
         }
     }
     return truncateString(s, 240);
 }

 async function doCancel(entry: QueueUIEntry) {
     if ($queueState.isInterrupting) {
         return;
     }

     // TODO support interrupting from multiple running items!
     if (entry.status === "running") {
         await app.interrupt();
     }
     else {
         await app.deleteQueueItem("queue", entry.entry.promptID);
     }

     notify("Queue item canceled.")
     uiQueueState.updateEntries(true)
 }

 function getCardImage(entry: QueueUIEntry): string {
     if (entry.images.length > 0)
         return convertComfyOutputToComfyURL(entry.images[0])
     return "https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg"
 }
</script>

<Page name="queue" on:pageBeforeIn={onPageBeforeIn}>
    <Navbar>
        <NavLeft></NavLeft>
        <NavTitle>Queue</NavTitle>
        <NavRight>
            <Link on:click={interrupt}>🛑️</Link>
            <Link on:click={clearQueue}>🗑️</Link>
        </NavRight>
    </Navbar>

    <Block>
        <List>
            {#each _entries as entry, i}
                {@const prompt = findPrompt(entry)}
                <ListItem>
                    <Card outlineMd class="demo-card-header-pic">
                        <CardHeader valign="bottom"
                                    style="background-image: url({getCardImage(entry)})">
                            {entry.message}
                        </CardHeader>
                        <CardContent>
                            <p class="list-entry-message">{entry.submessage}</p>
                            <p>
                                {prompt}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Link on:click={() => doCancel(entry)}>Cancel</Link>
                            {#if entry.date}
                                <p>{entry.date}</p>
                            {/if}
                        </CardFooter>
                    </Card>
                </ListItem>
            {/each}
        </List>
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

 .list-entry-message {
     font-size: 15pt;
 }
</style>
