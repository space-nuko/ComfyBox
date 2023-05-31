<script lang="ts">
 import ComfyApp from "$lib/components/ComfyApp.svelte"
 import { default as ComfyAppState } from "$lib/components/ComfyApp"
 import "@litegraph-ts/core/css/litegraph.css";
 import "./scss/global.scss";

 export let app: ComfyAppState;
 export let isMobile: boolean
</script>

{#if isMobile}
    <div>Redirecting...</div>
{:else}
    <ComfyApp {app}/>
{/if}
