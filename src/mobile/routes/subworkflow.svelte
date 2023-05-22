<script lang="ts">
 import { Page, Navbar, Link, BlockTitle, Block, List, ListItem, Toolbar } from "framework7-svelte"
 import WidgetContainer from "$lib/components/WidgetContainer.svelte";
 import type ComfyApp from "$lib/components/ComfyApp";
 import { writable, type Writable } from "svelte/store";
 import type { WritableLayoutStateStore } from "$lib/stores/layoutStates";
 import workflowState, { type ComfyWorkflow } from "$lib/stores/workflowState";

 export let subworkflowID: number = -1;
 export let app: ComfyApp

 // TODO move
 let workflow: ComfyWorkflow | null = null
 let layoutState: WritableLayoutStateStore | null = null;

 $: workflow = $workflowState.activeWorkflow;
 $: layoutState = workflow ? workflow.layout : null;
</script>

<Page name="subworkflow">
    <Navbar title="Workflow {subworkflowID}" backLink="Back" />

    {#if layoutState}
        <div class="container">
            <WidgetContainer bind:dragItem={$layoutState.root} {layoutState} isMobile={true} classes={["root-container", "mobile"]} />
        </div>
    {/if}
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
</style>
