<script lang="ts">
 import { ListIcon as List, ImageIcon as Image, SettingsIcon as Settings } from "svelte-feather-icons";
 import ComfyApp, { type A1111PromptAndInfo, type SerializedAppState } from "./ComfyApp";
 import uiState from "$lib/stores/uiState";
 import layoutState from "$lib/stores/layoutState";
 import { SvelteToast, toast } from '@zerodevx/svelte-toast'

 import LightboxModal from "./LightboxModal.svelte";
 import Sidebar from "./Sidebar.svelte";
 import SidebarItem from "./SidebarItem.svelte";
 // import Modal from "./Modal.svelte";
 // import A1111PromptDisplay from "./A1111PromptDisplay.svelte";
	import notify from "$lib/notify";
	import ComfyWorkflowsView from "./ComfyWorkflowsView.svelte";


 export let app: ComfyApp = undefined;
 let hasShownUIHelpToast: boolean = false;
 let uiTheme: string = "gradio-dark";

 let debugLayout: boolean = false;

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

 if (debugLayout) {
     layoutState.subscribe(s => {
         console.warn("UPDATESTATE", s)
     })
 }

 $: if (uiTheme === "gradio-dark") {
     document.getElementById("app-root").classList.add("dark")
 }
 else {
     document.getElementById("app-root").classList.remove("dark")
 }

 // let showModal: boolean = false;
 //
 // $: showModal = $a1111Prompt != null
 //
 // let selectedTab
</script>

<svelte:head>
    {#if uiTheme === "anapnoe"}
        <link rel="stylesheet" href="/src/scss/ux.scss">
    {/if}
</svelte:head>

<!--
     <Modal bind:showModal on:close={() => ($a1111Prompt = null)}>
     <div slot="header" class="prompt-modal-header">
     <h1 style="padding-bottom: 1rem;">A1111 Prompt Details</h1>
     </div>
     <A1111PromptDisplay prompt={$a1111Prompt} />
     <div slot="buttons" let:closeDialog>
     <Button variant="secondary" on:click={closeDialog}>
     Close
     </Button>
     </div>
     </Modal>
-->

<div id="main" class:dark={uiTheme === "gradio-dark"}>
    <div id="container">
        <Sidebar selected="generate">
            <SidebarItem id="generate" name="Generate" icon={Image}>
                <ComfyWorkflowsView {app} {uiTheme} />
            </SidebarItem>
            <SidebarItem id="settings" name="Settings" icon={Settings}>
            </SidebarItem>
        </Sidebar>
    </div>
    <LightboxModal />
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
