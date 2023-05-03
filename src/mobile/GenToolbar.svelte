<script lang="ts">
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import uiState from "$lib/stores/uiState";

 import { Link, Toolbar } from "framework7-svelte"
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
