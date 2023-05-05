<script lang="ts">
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import uiState from "$lib/stores/uiState";

 import queueState from "$lib/stores/queueState";
 import { Page, Navbar, Link, BlockTitle, Block, List, ListItem, Toolbar } from "framework7-svelte"

 export let subworkflowID: number = -1;
 let app: ComfyApp = undefined;

 $: if (!app)
     app = $uiState.app

</script>

<Page name="subworkflow">
    <Navbar title="Workflow {subworkflowID}" backLink="Back" />

    <div>Workflow!</div>
</Page>

<style>
 .is-executing {
     border: 5px dashed var(--color-green-600) !important;
 }
</style>
