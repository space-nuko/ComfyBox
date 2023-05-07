<script lang="ts">
 import layoutState, { type IDragItem } from "$lib/stores/layoutState";

 import { Page, Navbar, Link, BlockTitle, Block, List, ListItem, Toolbar } from "framework7-svelte"
 import WidgetContainer from "$lib/components/WidgetContainer.svelte";

 export let subworkflowID: number = -1;

</script>

<Page name="subworkflow">
    <Navbar title="Workflow {subworkflowID}" backLink="Back" />

    <WidgetContainer bind:dragItem={$layoutState.root} classes={["root-container", "mobile"]} />
</Page>

<style lang="scss">
 // TODO generalize this to all properties!
 :global(.root-container.mobile > .block > .v-pane) {
     flex-direction: column !important;
 }
</style>
