<script context="module" lang="ts">
 export type ComfyPaneMode = "none" | "activeWorkflow" | "graph" | "properties" | "templates" | "queue"
</script>

<script lang="ts">
 /*
  * A panel/sidebar that can be switched between different modes.
  */
 import workflowState from "$lib/stores/workflowState";
 import type ComfyApp from "./ComfyApp";
 import { Sliders2, BoxSeam, LayoutTextSidebarReverse } from "svelte-bootstrap-icons";

 import ComfyBoxWorkflowView from "./ComfyBoxWorkflowView.svelte";
 import ComfyGraphView from "./ComfyGraphView.svelte";
 import ComfyProperties from "./ComfyProperties.svelte";
 import ComfyQueue from "./ComfyQueue.svelte";
 import ComfyTemplates from "./ComfyTemplates.svelte";
 import { SvelteComponent } from "svelte";
	import { capitalize } from "$lib/utils";

 export let app: ComfyApp
 export let mode: ComfyPaneMode = "none";
 export let showSwitcher: boolean = false;

 const MODES: [ComfyPaneMode, typeof SvelteComponent<any>][] = [
     ["properties", Sliders2],
     ["templates", BoxSeam],
     ["queue", LayoutTextSidebarReverse]
 ]

 function switchMode(newMode: ComfyPaneMode) {
     console.warn("switch", mode, newMode)
     mode = newMode;
 }
</script>

<div class="pane">
    <div class="pane-wrapper" class:has-switcher={showSwitcher}>
        {#if mode === "activeWorkflow"}
            <ComfyBoxWorkflowView {app} workflow={$workflowState.activeWorkflow} />
        {:else if mode === "graph"}
            <ComfyGraphView {app} />
        {:else if mode === "properties"}
            <ComfyProperties {app} workflow={$workflowState.activeWorkflow} />
        {:else if mode === "templates"}
            <ComfyTemplates {app} />
        {:else if mode === "queue"}
            <ComfyQueue {app} />
        {:else}
            <div class="blank-panel">(Blank)</div>
        {/if}
    </div>
    {#if showSwitcher}
        <div class="switcher">
            {#each MODES as [theMode, icon]}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <button class="mode-button ternary"
                        disabled={mode === theMode}
                        title={capitalize(theMode)}
                        class:selected={mode === theMode}
                        on:click={() => switchMode(theMode)}>
                    <svelte:component this={icon} width="100%" height="100%" />
                </button>
            {/each}
        </div>
    {/if}
</div>


<style lang="scss">
 $button-height: 2.5rem;

 .pane {
     width: 100%;
     height: 100%;

     .pane-wrapper {
         width: 100%;
         height: 100%;
         overflow-x: hidden;
         overflow-y: auto;
         &.has-switcher {
             height: calc(100% - $button-height);
         }
     }

     .switcher {
         height: $button-height;
         display: flex;
         flex-direction: row;
         color: var(--comfy-accent-soft);

         .mode-button {
             height: 100%;
             width: 100%;
             padding: 0.5rem;

             @include square-button;

             &:hover {
                 color: var(--body-text-color);
             }
             &.selected {
                 background-color: var(--panel-background-fill);
             }
         }
     }
 }
</style>
