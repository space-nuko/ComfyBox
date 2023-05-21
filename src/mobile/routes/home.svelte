<script lang="ts">
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";

 import { Page, Navbar, Button, BlockTitle, Block, List, ListItem } from "framework7-svelte"

 export let app: ComfyApp | null = null;

 async function doLoadDefault() {
     var confirmed = confirm("Would you like to load the default workflow in a new tab?");
     if (confirmed) {
         await app.initDefaultWorkflow();
     }
 }
</script>

<Page name="home">
    <Navbar title="Home Page" />

    <BlockTitle>Yo</BlockTitle>
    <Block>
        <div>{app} Nodes</div>
    </Block>

    <List strong inset dividersIos class="components-list searchbar-found">
        <ListItem link="/subworkflows/" title="Workflows">
            <i class="icon icon-f7" slot="media" />
        </ListItem>
        <ListItem link="/graph/" title="Show Node Graph">
            <i class="icon icon-f7" slot="media" />
        </ListItem>
    </List>
    <Block strong outlineIos>
        <Button fill={true} onClick={doLoadDefault}>Load Default Graph</Button>
    </Block>
</Page>
