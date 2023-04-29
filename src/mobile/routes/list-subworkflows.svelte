<script lang="ts">
 import { onMount } from "svelte";
 import { get } from "svelte/store";
 import { Pane, Splitpanes } from 'svelte-splitpanes';
 import { Button } from "@gradio/button";
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import { Checkbox } from "@gradio/form"
 import nodeState from "$lib/stores/nodeState";
 import uiState from "$lib/stores/uiState";
 import { ImageViewer } from "$lib/ImageViewer";
 import { download } from "$lib/utils"

 import { LGraph, LGraphNode } from "@litegraph-ts/core";
 import type { ComfyAPIStatus } from "$lib/api";
 import queueState from "$lib/stores/queueState";
 import { Page, Navbar, Link, BlockTitle, Block, List, ListItem } from "framework7-svelte"

</script>

<Page name="subworkflows">
  <Navbar title="Workflows" backLink="Back" />

    <List strong inset dividersIos class="components-list searchbar-found">
        <ListItem link="/subworkflows/{1}/" title="Workflow 1">
            <i class="icon icon-f7" slot="media" />
        </ListItem>
    </List>
</Page>
