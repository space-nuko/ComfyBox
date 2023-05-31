const params = new URLSearchParams(window.location.search)

const MOBILE_USER_AGENTS = ["iPhone", "iPad", "Android", "BlackBerry", "WebOs"].map(a => new RegExp(a, "i"))

function isMobileBrowser(userAgent: string): boolean {
    return MOBILE_USER_AGENTS.some(a => userAgent.match(a))
}

const isMobile = isMobileBrowser(navigator.userAgent);

if (params.get("desktop") !== "true") {
    if (isMobile) {
        window.location.href = "/mobile/"
    }
}


// Run node registration before anthing else, in the proper order
import "$lib/nodeImports";

import ComfyApp from '$lib/components/ComfyApp';
import init from '$lib/init';
import App from './App.svelte';

init();

const comfyApp = new ComfyApp();
(window as any).app = comfyApp;

const app = new App({
    target: document.getElementById("app-root"),
    props: { app: comfyApp, isMobile }
})

export default app;
