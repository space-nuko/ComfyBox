<script lang="ts">
 import { onMount } from "svelte";
 import { get } from "svelte/store";
 import { Pane, Splitpanes } from 'svelte-splitpanes';
 import { Button } from "@gradio/button";
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import { Checkbox } from "@gradio/form"
 import widgetState from "$lib/stores/widgetState";
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

 function queuePrompt() {
     app.queuePrompt(0, 1);
     showNotification();
 }

 let notification;
 const showNotification = () => {
     if (!notification) {
         notification = f7.notification.create({
             title: 'Queued',
             titleRightText: 'now',
             // subtitle: 'Notification with close on click',
             text: 'Prompt was queued',
             closeOnClick: true,
             closeTimeout: 3000,
         });
     }
     // Open it
     notification.open();
 }
</script>

<Toolbar bottom>
    <Link on:click={queuePrompt}>Queue Prompt</Link>
</Toolbar>
