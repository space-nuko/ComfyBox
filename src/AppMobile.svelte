<script lang="ts">
 import { onMount } from "svelte";
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";

 import { App, View, Preloader } from "framework7-svelte"

 import { f7, f7ready } from 'framework7-svelte';

 import "framework7/css/bundle"
 import "./scss/global.scss";

 import MainToolbar from './mobile/MainToolbar.svelte'
 import GenToolbar from './mobile/GenToolbar.svelte'

 import WorkflowsPage from './mobile/routes/workflows.svelte';
 import AboutPage from './mobile/routes/about.svelte';
 import LoginPage from './mobile/routes/login.svelte';
 import GraphPage from './mobile/routes/graph.svelte';
 import WorkflowPage from './mobile/routes/workflow.svelte';
 import type { Framework7Parameters, Modal } from "framework7/types";
 import interfaceState from "$lib/stores/interfaceState";

 export let app: ComfyApp;

 function onBackKeyDown(e) {
     if(f7.view.current.router.currentRoute.path == '/'){
         // exitApp();
         e.preventDefault();
     } else {
         const $ = f7.$
         const modalIn = $('.modal-in');
         if (modalIn.length && "f7Modal" in modalIn[0]) {
             (modalIn[0].f7Modal as Modal.Modal).close(true);
             e.preventDefault();
             return;
         }
         if ($('.panel-active').length) {
             f7.panel.close();
             e.preventDefault();
             return;
         }
         const photoBrowserClose = $('.photo-browser-page a.link.popup-close')
         if (photoBrowserClose.length > 0) {
             (photoBrowserClose[0] as HTMLElement).click();
             e.preventDefault();
             return;
         }

         f7.dialog.close()
         f7.view.main.router.back()
         return false;
     }
 }

 let appSetupPromise: Promise<void> = null;
 let loading = true;
 let lastSize = Number.POSITIVE_INFINITY;

 $: f7 && f7.setDarkMode($interfaceState.isDarkMode)

 onMount(async () => {
     let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
     $interfaceState.isDarkMode = isDarkMode;

     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
         $interfaceState.isDarkMode = event.matches;
     });

     appSetupPromise = app.setup().then(() => {
         loading = false
     });
     window.addEventListener("backbutton", onBackKeyDown, false);
     window.addEventListener("popstate", onBackKeyDown, false);

     // Blur any input elements when the virtual keyboard closes
     // Otherwise tapping on other input events can refocus the input from way
     // off the screen
     window.visualViewport.addEventListener("resize", function(e) {
         if (e.target.height > lastSize) {
             // Assume keyboard was hidden
             (document.activeElement as HTMLElement)?.blur();
         }
         lastSize = e.target.height
     })
 })

 /*
    Now we need to map components to routes.
    We need to pass them along with the F7 app parameters to <App> component
  */

 let f7params: Framework7Parameters = {
     routes: [
         {
             path: '/',
             component: WorkflowsPage,
             options: {
                 props: { app }
             }
         },
         {
             path: '/workflows',
             component: WorkflowsPage,
             options: {
                 props: { app }
             }
         },
         {
             path: '/about/',
             component: AboutPage,
         },
         {
             path: '/login/',
             component: LoginPage,
         },
         // {
         //     path: '/graph/',
         //     component: GraphPage,
         //     options: {
         //         props: { app }
         //     }
         // },
         {
             path: '/workflows/:workflowIndex/',
             component: WorkflowPage,
             options: {
                 props: { app }
             }
         },
     ],
     popup: {
         closeOnEscape: true,
     },
     sheet: {
         closeOnEscape: true,
     },
     popover: {
         closeOnEscape: true,
     },
     actions: {
         closeOnEscape: true,
     },
     touch: {
         tapHold: true
     }
 }

 let body;
 const bindBody = (node) => (body = node);
 function setDarkClass(isDark: boolean) {
     if (!body)
         return;
     if (isDark) {
         body.classList.add("dark");
     } else {
         body.classList.remove("dark");
     }
 };
 $: setDarkClass($interfaceState.isDarkMode);
</script>

<svelte:body use:bindBody />

<App theme="auto" name="ComfyBox" {...f7params}>
    {#if appSetupPromise}
        {#await appSetupPromise}
            <div class="comfy-app-loading">
                <div>
                    <Preloader color="blue" size={100} />
                </div>
            </div>
        {:then}
            <View
                url="/workflows/"
                main={true}
                class="safe-areas"
                masterDetailBreakpoint={768},
                browserHistory=true,
                browserHistoryRoot="/mobile/"
            >
                <MainToolbar {app} />
                {#if $interfaceState.selectedWorkflowID && $interfaceState.showingWorkflow}
                    <GenToolbar {app} />
                {/if}
            </View>
    {:catch error}
            <div class="comfy-loading-error">
                <div>
                    Error loading app
                </div>
                <div>{error}</div>
                {#if error != null && error.stack}
                    {@const lines = error.stack.split("\n")}
                    {#each lines as line}
                        <div style:font-size="16px">{line}</div>
                    {/each}
                {/if}
            </div>
        {/await}
    {/if}
</App>
<div class="canvas-wrapper pane-wrapper" style="display: none">
    <canvas id="graph-canvas" />
</div>

<style lang="scss">
 .comfy-app-loading, .comfy-loading-error {
     font-size: 40px;
     color: var(--body-text-color);
     justify-content: center;
     margin: auto;
     width: 100%;
     height: 100%;
     text-align: center;
     flex-direction: column;
     display: flex;
     position: absolute;
     z-index: 100000000;
     pointer-events: none;
     user-select: none;
     top: 0px;
 }

 .comfy-app-loading > span {
     display: flex;
     flex-direction: row;
     justify-content: center;
 }
</style>
