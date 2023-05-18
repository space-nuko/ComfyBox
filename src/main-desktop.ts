import ComfyApp from '$lib/components/ComfyApp';
import { configureLitegraph } from '$lib/init';
import App from './App.svelte';

configureLitegraph()

const comfyApp = new ComfyApp();
(window as any).app = comfyApp;

const app = new App({
    target: document.getElementById("app-root"),
    props: { app: comfyApp }
})

export default app;
