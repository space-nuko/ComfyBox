import AppMobile from './AppMobile.svelte';
import Framework7 from 'framework7/lite-bundle';
import Framework7Svelte from 'framework7-svelte';
import { f7 } from 'framework7-svelte';
import ComfyApp from '$lib/components/ComfyApp';
import uiState from '$lib/stores/uiState';
import { LiteGraph } from '@litegraph-ts/core';
import ComfyGraph from '$lib/ComfyGraph';

Framework7.use(Framework7Svelte);

LiteGraph.dialog_close_on_mouse_leave = false;
LiteGraph.search_hide_on_mouse_leave = false;
LiteGraph.pointerevents_method = "pointer";

const comfyApp = new ComfyApp();

uiState.update(s => { s.app = comfyApp; return s; })

const app = new AppMobile({
    target: document.getElementById('app'),
    props: { app: comfyApp }
})

export default app;
