<script lang="ts">
 import { Image, Gear } from "svelte-bootstrap-icons";
 import ComfyApp from "./ComfyApp";
 import uiState from "$lib/stores/uiState";
 import configState from "$lib/stores/configState";
 import workflowState from "$lib/stores/workflowState";
 import { SvelteToast, toast } from '@zerodevx/svelte-toast'

 import LightboxModal from "./LightboxModal.svelte";
 import Sidebar from "./Sidebar.svelte";
 import SidebarItem from "./SidebarItem.svelte";
 import notify from "$lib/notify";
 import ComfyWorkflowsView from "./ComfyWorkflowsView.svelte";
 import GlobalModal from "./GlobalModal.svelte";

 export let app: ComfyApp = undefined;
 let hasShownUIHelpToast: boolean = false;
 let uiTheme: string = "gradio-dark";

 const toastOptions = {
     intro: { duration: 200 },
     theme: {
         '--toastBarHeight': 0
     }
 }

 $: if ($uiState.uiUnlocked && !hasShownUIHelpToast) {
     hasShownUIHelpToast = true;
     notify("Right-click to open context menu.")
 }

 $: if (uiTheme === "gradio-dark") {
     document.getElementById("app-root").classList.add("dark")
 }
 else {
     document.getElementById("app-root").classList.remove("dark")
 }

 function handleBeforeUnload(event: BeforeUnloadEvent) {
     if (!$configState.confirmWhenUnloadingUnsavedChanges)
         return;

     const unsavedChanges = $workflowState.openedWorkflows.some(w => w.isModified);
     if (unsavedChanges) {
         event.preventDefault();
         event.returnValue = '';
     }
 }
</script>

<svelte:head>
    {#if uiTheme === "anapnoe"}
        <link rel="stylesheet" href="/src/scss/ux.scss">
    {/if}
</svelte:head>

<svelte:window on:beforeunload={handleBeforeUnload} />

<div id="main" class:dark={uiTheme === "gradio-dark"}>
    <div id="container">
        <Sidebar selected="generate">
            <SidebarItem id="generate" name="Generate" icon={Image}>
                <ComfyWorkflowsView {app} {uiTheme} />
            </SidebarItem>
            <SidebarItem id="settings" name="Settings" icon={Gear}>
            </SidebarItem>
        </Sidebar>
    </div>
    <LightboxModal />
    <GlobalModal/>
</div>
<SvelteToast options={toastOptions} />

<style lang="scss">
 #container {
     height: 100vh;
     max-width: 100vw;
     display: relative;
     width: 100%;
 }
</style>
