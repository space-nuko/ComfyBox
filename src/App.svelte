<script lang="ts">
 import ComfyApp from "$lib/components/ComfyApp.svelte"
 import { default as ComfyAppState } from "$lib/components/ComfyApp"
 import "@litegraph-ts/core/css/litegraph.css";
 import "./scss/global.scss";

 import { onMount } from 'svelte';

 export let app: ComfyAppState;
</script>

<ComfyApp {app}/>

<style>
</style>
