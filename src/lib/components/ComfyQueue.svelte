<script lang="ts">
 import queueState from "$lib/stores/queueState";
 import ProgressBar from "./ProgressBar.svelte";
 import { getNodeInfo } from "$lib/utils"

 const entries = [
     {
         "outputs": {
             44: {
                 "images": [
                     {
                         "filename": "ComfyUI_00052_.png",
                         "subfolder": "",
                         "type": "output"
                     }
                 ]
             }
         }
     },
     {
         "outputs": {
             44: {
                 "images": [
                     {
                         "filename": "ComfyUI_00052_.png",
                         "subfolder": "",
                         "type": "output"
                     }
                 ]
             }
         }
     },
     {
         "outputs": {
             44: {
                 "images": [
                     {
                         "filename": "ComfyUI_00052_.png",
                         "subfolder": "",
                         "type": "output"
                     }
                 ]
             }
         }
     }
 ]

 let _entries: any[] = []

 $: if (entries) {
     _entries = []
     for (const entry of entries) {
         for (const outputs of Object.values(entry.outputs)) {
             const allImages = outputs.images.map(r => {
                 // TODO configure backend URL
                 const url = "http://localhost:8188/view?"
                 const params = new URLSearchParams(r)
                 return url + params
             });

             _entries.push({ allImages, name: "Output" })
         }
     }
 }
</script>

<div class="queue">
    <div class="queue-entries">
        {#each _entries as entry}
            <div class="queue-entry">
                <img class="queue-entry-image" src={entry.allImages[0]} alt="thumbnail" />
                <div class="queue-entry-details">
                    {entry.name}
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

 .queue-entry {
     padding: 0.5rem 0.5rem 0 0.5rem;
     display: flex;
     flex-direction: row;
 }

 .queue-entry-image {
     width: var(--size-20)
 }

 .queue-entry-details {
     width: var(--size-20)
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
     height: auto;
     position: absolute;
     bottom: 0;
     padding: 0.5em;
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
