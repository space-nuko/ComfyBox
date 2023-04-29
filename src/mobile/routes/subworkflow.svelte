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
 import { Page, Navbar, Link, BlockTitle, Block, List, ListItem, Toolbar } from "framework7-svelte"
 import { getComponentForWidgetState } from "$lib/utils"
 import { f7 } from "framework7-svelte"

 export let subworkflowID: number = -1;
 let app: ComfyApp = undefined;

 $: if (!app)
     app = $uiState.app

</script>

<Page name="subworkflow">
    <Navbar title="Workflow {subworkflowID}" backLink="Back" />

    {#each Object.entries($nodeState) as [id, ws]}
        {@const node = app.lGraph.getNodeById(id)}
        <div class:is-executing={$queueState.runningNodeId === node.id}>
            <Block>
                <label for={String(id)}>
                    <BlockTitle>
                        {node.title}
                    </BlockTitle>
                </label>
                {#each $nodeState[id].widgetStates as item}
                    <svelte:component this={getComponentForWidgetState(item)} {item} />
                {/each}
            </Block>
        </div>
    {/each}
</Page>

<style>
 .is-executing {
     border: 5px dashed var(--color-green-600) !important;
 }
</style>
