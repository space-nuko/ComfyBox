<script lang="ts">
 import { onMount } from "svelte";
 import ComfyApp from "./ComfyApp";

 let app: ComfyApp = undefined;

 onMount(async () => {
     app = new ComfyApp();
     await app.setup();

     (window as any).app = app;
 })
</script>

<div class="container">
    <canvas id="graph-canvas" tabIndex="1" />
</div>

<style>
 .container {
     width: 100%;
     height: 100%;
 }
</style>
