<script lang="ts">
 import { Page, Navbar, Tabs, Tab, NavLeft, NavTitle, NavRight, Link } from "framework7-svelte"
 import WidgetContainer from "$lib/components/WidgetContainer.svelte";
 import type ComfyApp from "$lib/components/ComfyApp";
 import { writable, type Writable } from "svelte/store";
 import type { IDragItem, WritableLayoutStateStore } from "$lib/stores/layoutStates";
 import workflowState, { type ComfyBoxWorkflow, type WorkflowInstID } from "$lib/stores/workflowState";
 import interfaceState from "$lib/stores/interfaceState";
 import { onMount } from "svelte";
 import GenToolbar from '../GenToolbar.svelte'
</script>

<Page name="queue">
    <Navbar title="Queue" />
</Page>

<style lang="scss">
 .container {
     overflow-x: hidden;

     // Disable pull to refresh
     overscroll-behavior-y: contain;

     // framework7's css conflicts with gradio's
     :global(.block) {
         z-index: unset; // f7 sets it to 1
     }
 }

 // TODO generalize this to all properties!
 :global(.root-container.mobile > .block > .v-pane) {
     flex-direction: column !important;
 }
</style>
