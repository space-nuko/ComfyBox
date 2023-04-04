<script lang="ts">
 import { onMount } from "svelte";
 import { Pane, Splitpanes } from 'svelte-splitpanes';
 import { Tabs } from '@svelteuidev/core';
 import { Backpack, Gear } from 'radix-icons-svelte';
 import ComfyApp from "./ComfyApp";

 let app: ComfyApp = undefined;

 function refreshView(event) {
     app.resizeCanvas();
 }

 onMount(async () => {
     app = new ComfyApp();
     await app.setup();
     refreshView();

     (window as any).app = app;
 })
</script>

<Tabs>
    <Tabs.Tab label="Workspace" icon={Backpack}>
        <div id="container">
            <Splitpanes on:resize={refreshView}>
                <Pane class="sidebar" size={20} minSize={20}>I have a min width of 20%</Pane>
                <Pane>
                    <Splitpanes on:resize={refreshView} horizontal="{true}">
                        <Pane minSize={15}>I have a min height of 15%</Pane>
                        <Pane minSize={10}>
                            <canvas id="graph-canvas" />
                        </Pane>
                    </Splitpanes>
                </Pane>
            </Splitpanes>
        </div>
    </Tabs.Tab>
    <Tabs.Tab label="Settings" icon={Gear}>
    </Tabs.Tab>
</Tabs>

<style>
 #container {
     height: calc(100vh - 60px);
     display: grid;
     width: 100%;
 }

 .panel {
     overflow: auto;
     position: relative;
 }

 .resizer[data-direction='horizontal'] {
     background-color: #cbd5e0;
     cursor: ew-resize;
     height: 100%;
     width: 2px;
 }
 .resizer[data-direction='vertical'] {
     background-color: #cbd5e0;
     cursor: ns-resize;
     height: 2px;
     width: 100%;
 }

 #comfy-content {
     grid-area: content;
     height: 100vh;
 }

 #comfy-ui {
 }

 #comfy-graph {
 }

 #graph-canvas {
     width: 100%;
     height: 100%;
 }

 :global(html, body) {
     width: 100%;
     height: 100%;
     margin: 0px;
     font-family: Arial;
 }

 :global(.splitpanes__pane) {
     box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
     justify-content: center;
     align-items: center;
     display: flex;
     position: relative;
 }
</style>
