<script context="module" lang="ts">
 export type ComfyPaneMode = "none" | "activeWorkflow" | "graph" | "properties" | "queue"
</script>

<script lang="ts">
 /*
  * A panel/sidebar that can be switched between different modes.
  */
 import workflowState from "$lib/stores/workflowState";
 import type ComfyApp from "./ComfyApp";

 import ComfyBoxWorkflowView from "./ComfyBoxWorkflowView.svelte";
 import ComfyGraphView from "./ComfyGraphView.svelte";
 import ComfyProperties from "./ComfyProperties.svelte";
 import ComfyQueue from "./ComfyQueue.svelte";

 export let app: ComfyApp
 export let mode: ComfyPaneMode = "none";

</script>

<div class="pane-wrapper">
    {#if mode === "activeWorkflow"}
        <ComfyBoxWorkflowView {app} workflow={$workflowState.activeWorkflow} />
    {:else if mode === "graph"}
        <ComfyGraphView {app} />
    {:else if mode === "properties"}
        <ComfyProperties workflow={$workflowState.activeWorkflow} />
    {:else if mode === "queue"}
        <ComfyQueue {app} />
    {:else}
        <div class="blank-panel">(Blank)</div>
    {/if}
</div>


<style lang="scss">
 .pane-wrapper {
     width: 100%;
     height: 100%;
     overflow: auto;
 }
</style>
