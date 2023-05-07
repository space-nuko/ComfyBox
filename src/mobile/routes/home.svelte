<script lang="ts">
 import { onMount } from "svelte";
 import { get } from "svelte/store";
 import { Pane, Splitpanes } from 'svelte-splitpanes';
 import { Button } from "@gradio/button";
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import { Checkbox } from "@gradio/form"
 import uiState from "$lib/stores/uiState";
 import { ImageViewer } from "$lib/ImageViewer";
 import { download } from "$lib/utils"

 import { LGraph, LGraphNode } from "@litegraph-ts/core";
 import type { ComfyAPIStatus } from "$lib/api";
 import queueState from "$lib/stores/queueState";
 import { Page, Navbar, Link, BlockTitle, Block, List, ListItem } from "framework7-svelte"

 export let app: ComfyApp | null = null;

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
        <ListItem link="/hell/" title="🔥 HELL 🔥">
            <i class="icon icon-f7" slot="media" />
        </ListItem>
    </List>
</Page>
