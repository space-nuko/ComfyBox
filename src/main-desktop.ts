import { LiteGraph } from '@litegraph-ts/core';
import App from './App.svelte';

LiteGraph.use_uuids = true;

const app = new App({
    target: document.getElementById('app'),
})

export default app;
