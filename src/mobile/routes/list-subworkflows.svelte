<script lang="ts">
 import ComfyApp from "$lib/components/ComfyApp";
 import { Page, Navbar, Link, BlockTitle, Block, List, ListItem } from "framework7-svelte"

 export let app: ComfyApp;
</script>

<Page name="subworkflows">
  <Navbar title="Workflows" backLink="Back" />

    <List strong inset dividersIos class="components-list searchbar-found">
        <ListItem link="/subworkflows/{1}/" title="Workflow 1">
            <i class="icon icon-f7" slot="media" />
        </ListItem>
    </List>
</Page>
