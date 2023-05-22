// Run node registration before anthing else, in the proper order
import "$lib/nodeImports";

import AppMobile from './AppMobile.svelte';
import Framework7 from 'framework7/lite-bundle';
import Framework7Svelte from 'framework7-svelte';
import { f7 } from 'framework7-svelte';
import ComfyApp from '$lib/components/ComfyApp';
import uiState from '$lib/stores/uiState';
import { LiteGraph } from '@litegraph-ts/core';
import ComfyGraph from '$lib/ComfyGraph';
import { configureLitegraph } from '$lib/init';

Framework7.use(Framework7Svelte);

configureLitegraph(true);

const comfyApp = new ComfyApp();
(window as any).app = comfyApp;

const app = new AppMobile({
    target: document.getElementById("app-root"),
    props: { app: comfyApp }
})

export default app;
