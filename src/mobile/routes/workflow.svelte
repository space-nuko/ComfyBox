<script lang="ts">
 import { Page, Navbar, Tabs, Tab, NavLeft, NavTitle, NavRight, Link, Actions, ActionsGroup, ActionsButton, ActionsLabel, Sheet, Toolbar, PageContent, Block } from "framework7-svelte"
 import WidgetContainer from "$lib/components/WidgetContainer.svelte";
 import type ComfyApp from "$lib/components/ComfyApp";
 import { writable, type Writable } from "svelte/store";
 import { MenuUp } from 'svelte-bootstrap-icons';
 import type { IDragItem, WritableLayoutStateStore } from "$lib/stores/layoutStates";
 import workflowState, { type ComfyBoxWorkflow, type WorkflowInstID } from "$lib/stores/workflowState";
 import interfaceState from "$lib/stores/interfaceState";
 import { onMount } from "svelte";
 import GenToolbar from '../GenToolbar.svelte'
	import { onDestroy } from "svelte";

 export let workflowIndex: number;
 export let app: ComfyApp

 let workflow: ComfyBoxWorkflow;
 let root: IDragItem | null;
 let title = ""
 let actionsOpened = false;

 function onPageBeforeIn() {
     workflow = $workflowState.openedWorkflows[workflowIndex-1]
     if (workflow) {
         workflowState.setActiveWorkflow(app.lCanvas, workflow.id)
     }
     $interfaceState.selectedWorkflowIndex = workflowIndex
     $interfaceState.showingWorkflow = true;
     $interfaceState.selectedTab = 1;
 }

 function onPageBeforeOut() {
     $interfaceState.showingWorkflow = false;
 }

 async function refreshCombos() {
     navigator.vibrate(20)
     await app.refreshComboInNodes()
 }

 function doSaveLocal(): void {
     navigator.vibrate(20)
     app.saveStateToLocalStorage();
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
            <Link icon="icon-bars" on:click={() => {actionsOpened = true;}}>
            <MenuUp />
            </Link>
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

  <Actions bind:opened={actionsOpened}>
    <ActionsGroup>
      <ActionsLabel>Actions</ActionsLabel>
      <ActionsButton strong on:click={refreshCombos}>Refresh Dropdowns</ActionsButton>
      <ActionsButton strong on:click={doSaveLocal}>Save to Local Storage</ActionsButton>
      <!-- <ActionsButton>Button 2</ActionsButton> -->
      <ActionsButton color="red">Cancel</ActionsButton>
    </ActionsGroup>
  </Actions>
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

 .demo-sheet-push {
     bottom: calc(var(--f7-toolbar-height) * 3);
 }
</style>
