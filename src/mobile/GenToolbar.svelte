<script lang="ts">
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
	import notify from "$lib/notify";
 import uiState from "$lib/stores/uiState";
 import queueState from "$lib/stores/queueState";
 import { getNodeInfo } from "$lib/utils"

 import { Link, Toolbar } from "framework7-svelte"
 import ProgressBar from "$lib/components/ProgressBar.svelte";
	import Indicator from "./Indicator.svelte";
	import interfaceState from "$lib/stores/interfaceState";
	import LightboxModal from "$lib/components/LightboxModal.svelte";

 export let subworkflowID: number = -1;
 export let app: ComfyApp = undefined;
 let fileInput: HTMLInputElement = undefined;

 function queuePrompt() {
     app.queuePrompt(0, 1);
     notify("Prompt was queued", "Queued");
 }

 function doLoad(): void {
     if (!app?.lGraph || !fileInput)
         return;

     fileInput.click();
 }

 function loadWorkflow(): void {
     app.handleFile(fileInput.files[0]);
     fileInput.files = null;
}
</script>

<div class="bottom">
    {#if $queueState.runningNodeId || $queueState.progress}
        <div class="node-name">
            <span>Node: {getNodeInfo($queueState.runningNodeId)}</span>
        </div>
        <div class="progress-bar">
            <ProgressBar value={$queueState.progress?.value} max={$queueState.progress?.max} />
        </div>
    {/if}
    {#if typeof $queueState.queueRemaining === "number" && $queueState.queueRemaining > 0}
        <div class="queue-remaining in-progress">
            <div>
                Queued prompts: {$queueState.queueRemaining}.
            </div>
        </div>
    {/if}
</div>
<Toolbar bottom>
    <Link on:click={() => app.refreshComboInNodes()}>🔄</Link>
    <Link on:click={doLoad}>Load</Link>
    <input bind:this={fileInput} id="comfy-file-input" type="file" accept=".json" on:change={loadWorkflow} />
</Toolbar>
{#if $interfaceState.showIndicator}
    <Indicator value={$interfaceState.indicatorValue} />
{/if}

<style lang="scss">
 #comfy-file-input {
     display: none;
 }

 .bottom {
     display: flex;
     flex-direction: row;
     position: absolute;
     text-align: center;
     width: 100%;
     height: 2rem;
     bottom: calc(var(--f7-toolbar-height) + var(--f7-safe-area-bottom));
     z-index: var(--layer-top);
     background-color: grey;

     .node-name {
         flex-grow: 1;
         background-color: var(--color-red-300);
         padding: 0.2em;
         display: flex;
         justify-content: center;
         align-items: center;
     }

     .progress-bar {
         flex-grow: 10;
         background-color: var(--color-red-300);
         display: flex;
         justify-content: center;
         align-items: center;
     }

     .queue-remaining {
         flex-grow: 1;
         padding: 0.2em;
         &.in-progress {
             background-color: var(--secondary-300);
         }
     }
 }
</style>
