<script lang="ts">
 import layoutState, { type IDragItem } from "$lib/stores/layoutState";

 import { Page, Navbar, Link, BlockTitle, Block, List, ListItem, Toolbar } from "framework7-svelte"
 import WidgetContainer from "$lib/components/WidgetContainer.svelte";
 import type ComfyApp from "$lib/components/ComfyApp";

 export let subworkflowID: number = -1;
 export let app: ComfyApp

</script>

<Page name="subworkflow">
    <Navbar title="Workflow {subworkflowID}" backLink="Back" />

    <div class="container">
        <WidgetContainer bind:dragItem={$layoutState.root} isMobile={true} classes={["root-container", "mobile"]} />
    </div>
</Page>

<style lang="scss">
 .container {
     overflow-x: hidden;
 }

 // TODO generalize this to all properties!
 :global(.root-container.mobile > .block > .v-pane) {
     flex-direction: column !important;
 }
</style>
