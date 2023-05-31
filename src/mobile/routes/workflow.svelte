<script lang="ts">
 import { Page, Navbar, Tabs, Tab, NavLeft, NavTitle, NavRight, Link } from "framework7-svelte"
 import WidgetContainer from "$lib/components/WidgetContainer.svelte";
 import type ComfyApp from "$lib/components/ComfyApp";
 import { writable, type Writable } from "svelte/store";
 import type { IDragItem, WritableLayoutStateStore } from "$lib/stores/layoutStates";
 import workflowState, { type ComfyBoxWorkflow, type WorkflowInstID } from "$lib/stores/workflowState";
 import interfaceState from "$lib/stores/interfaceState";
 import { onMount } from "svelte";
 import GenToolbar from '../GenToolbar.svelte'

 export let workflowIndex: number;
 export let app: ComfyApp

 let workflow: ComfyBoxWorkflow;
 let root: IDragItem | null;
 let title = ""

 function onPageBeforeIn() {
     workflow = $workflowState.openedWorkflows[workflowIndex-1]
     if (workflow) {
         $interfaceState.selectedWorkflowID = workflow.id;
     }
     else {
         $interfaceState.selectedWorkflowID = null;
     }
     $interfaceState.showingWorkflow = true;
 }

 function onPageBeforeOut() {
     $interfaceState.showingWorkflow = false;
 }

 $: layoutState = workflow?.layout;
 $: title = workflow?.attrs?.title || `Workflow: ${workflow?.id || workflowIndex}`;

 $: if (layoutState && $layoutState.root) {
     root = $layoutState.root
 } else {
     root = null;
 }
</script>

<Page name="workflow" style="--f7-page-toolbar-bottom-offset: calc(var(--f7-toolbar-height) * 2)"
      on:pageBeforeIn={onPageBeforeIn}
      on:pageBeforeOut={onPageBeforeOut}
>
    <Navbar>
        <NavLeft backLink="Back" backLinkUrl="/workflows/" backLinkForce={true}></NavLeft>
        <NavTitle>{title}</NavTitle>
        <NavRight>
            <Link icon="icon-bars" panelOpen="right"></Link>
        </NavRight>
    </Navbar>

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
