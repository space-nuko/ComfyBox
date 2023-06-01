<script lang="ts">
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import workflowState, { ComfyBoxWorkflow, type WorkflowInstID } from "$lib/stores/workflowState";
 import { onMount } from "svelte";
 import interfaceState from "$lib/stores/interfaceState";
 import { f7 } from 'framework7-svelte';
 import { XCircle } from 'svelte-bootstrap-icons';

 import { Page, Navbar, Button, BlockTitle, Block, List, ListItem } from "framework7-svelte"

 export let app: ComfyApp | null = null;
 let fileInput: HTMLInputElement = undefined;

 async function doLoadDefault() {
     f7.dialog.confirm("Would you like to load the default workflow in a new tab?", async () => {
         await app.initDefaultWorkflow();
         app.saveStateToLocalStorage(false);
     })
 }

 function onClickDelete(workflow: ComfyBoxWorkflow, e: Event) {
     e.preventDefault();
     e.stopImmediatePropagation();
     f7.dialog.confirm("Are you sure you want to delete this workflow?", workflow.attrs.title || `Workflow: ${workflow.id}`,
                       () => {
                           app.closeWorkflow(workflow.id);
                           app.saveStateToLocalStorage(false);
                       })}

 function doLoad(): void {
     if (!fileInput)
         return;

     navigator.vibrate(20)
     fileInput.value = null;
     fileInput.click();
 }

 function loadWorkflow(): void {
     app.handleFile(fileInput.files[0]);
}

 function onPageBeforeIn() {
     $interfaceState.selectedWorkflowIndex = null;
     $interfaceState.selectedTab = 1;
 }
</script>

<Page name="home" on:pageBeforeIn={onPageBeforeIn}>
    <Navbar title="Home Page" />

    {#if $workflowState.openedWorkflows}
        <List strong inset dividersIos class="components-list searchbar-found">
            {#each $workflowState.openedWorkflows as workflow, i}
                <ListItem link="/workflows/{i+1}/" transition="f7-cover" title={workflow.attrs.title || `Workflow: ${workflow.id}`}>
                    <svelte:fragment slot="media">
                        <div on:pointerdown={(e) => onClickDelete(workflow, e)}>
                            <XCircle width="1.5em" height="1.5em" />
                        </div>
                    </svelte:fragment>
                </ListItem>
            {/each}
        </List>
    {:else}
        (No workflows opened.)
    {/if}
    <Block strong outlineIos>
        <p class="grid grid-cols-2 grid-gap">
            <Button outline onClick={doLoadDefault}>Load default graph</Button>
            <Button outline onClick={doLoad}>Load from file...</Button>
        </p>
    </Block>
    <input bind:this={fileInput} id="comfy-file-input" style:display="none" type="file" accept=".json" on:change={loadWorkflow} />
</Page>
