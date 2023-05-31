<script lang="ts">
 import { Page, Navbar, Link, BlockTitle, Block, List, ListItem, Toolbar } from "framework7-svelte"
 import WidgetContainer from "$lib/components/WidgetContainer.svelte";
 import type ComfyApp from "$lib/components/ComfyApp";
 import { writable, type Writable } from "svelte/store";
 import type { WritableLayoutStateStore } from "$lib/stores/layoutStates";
 import workflowState, { type ComfyBoxWorkflow, type WorkflowInstID } from "$lib/stores/workflowState";

 export let workflowID: WorkflowInstID;
 export let app: ComfyApp

 let workflow: ComfyBoxWorkflow;
 let root: IDragItem | null;
 let title = ""

 $: workflow = workflowState.getWorkflow(workflowID);
 $: layoutState = workflow?.layout;
 $: title = workflow?.attrs?.title || `Workflow: ${workflowID}`;

 $: if (layoutState && $layoutState.root) {
     root = $layoutState.root
 } else {
     root = null;
 }
</script>

<Page name="workflow">
    <Navbar title="{title}" backLink="Back" />

    {#if workflow}
        {#if root}
            <div class="container">
                <WidgetContainer bind:dragItem={root} isMobile={true} classes={["root-container"]} {layoutState} />
            </div>
        {/if}
    {:else}
        <div>
            Workflow not found.
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
