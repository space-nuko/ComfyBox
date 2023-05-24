// Run node registration before anthing else, in the proper order
import "$lib/nodeImports";

import ComfyApp from '$lib/components/ComfyApp';
import init from '$lib/init';
import App from './App.svelte';

await init();

const comfyApp = new ComfyApp();
(window as any).app = comfyApp;

const app = new App({
    target: document.getElementById("app-root"),
    props: { app: comfyApp }
})

export default app;
