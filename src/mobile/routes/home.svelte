<script lang="ts">
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import workflowState, { ComfyBoxWorkflow, type WorkflowInstID } from "$lib/stores/workflowState";
 import { f7 } from 'framework7-svelte';
 import { XCircle } from 'svelte-bootstrap-icons';

 import { Page, Navbar, Button, BlockTitle, Block, List, ListItem } from "framework7-svelte"

 export let app: ComfyApp | null = null;

 async function doLoadDefault() {
     f7.dialog.confirm("Would you like to load the default workflow in a new tab?", async () => {
         await app.initDefaultWorkflow();
     })
 }

 function onClickDelete(workflow: ComfyBoxWorkflow, e: Event) {
     e.preventDefault();
     e.stopImmediatePropagation();
     f7.dialog.confirm("Are you sure you want to delete this workflow?", workflow.attrs.title || `Workflow: ${workflow.id}`,
                       () => { app.closeWorkflow(workflow.id); })}
</script>

<Page name="home">
    <Navbar title="Home Page" />

    {#if $workflowState.openedWorkflows}
        <List strong inset dividersIos class="components-list searchbar-found">
            {#each $workflowState.openedWorkflows as workflow}
                <ListItem link="/workflows/{workflow.id}/" title={workflow.attrs.title || `Workflow: ${workflow.id}`}>
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
        <Button fill={true} onClick={doLoadDefault}>Load Default Graph</Button>
    </Block>
</Page>
