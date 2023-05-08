<script lang="ts">
 import { onMount } from "svelte";
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";

 import { App, View } from "framework7-svelte"

 import { f7, f7ready } from 'framework7-svelte';

 import "framework7/css/bundle"
 import "./scss/global.scss";

 import GenToolbar from './mobile/GenToolbar.svelte'

 import HomePage from './mobile/routes/home.svelte';
 import AboutPage from './mobile/routes/about.svelte';
 import LoginPage from './mobile/routes/login.svelte';
 import GraphPage from './mobile/routes/graph.svelte';
 import ListSubWorkflowsPage from './mobile/routes/list-subworkflows.svelte';
 import SubWorkflowPage from './mobile/routes/subworkflow.svelte';
 import type { Framework7Parameters } from "framework7/types";

 export let app: ComfyApp;

 function onBackKeyDown(e) {
     if(f7.view.current.router.currentRoute.path == '/'){
         // exitApp();
         e.preventDefault();
     } else {
         f7.dialog.close()
         f7.view.main.router.back()
         return false;
     }
 }

 onMount(async () => {
     await app.setup();
     (window as any).app = app;
     window.addEventListener("backbutton", onBackKeyDown, false);
     window.addEventListener("popstate", onBackKeyDown, false);
 });

 /*
    Now we need to map components to routes.
    We need to pass them along with the F7 app parameters to <App> component
  */

 let f7params: Framework7Parameters = {
     routes: [
         {
             path: '/',
             component: HomePage,
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
         {
             path: '/graph/',
             component: GraphPage,
             options: {
                 props: { app }
             }
         },
         {
             path: '/subworkflows/',
             component: ListSubWorkflowsPage,
             options: {
                 props: { app }
             }
         },
         {
             path: '/subworkflows/:subworkflowID/',
             component: SubWorkflowPage,
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
 }
</script>

{#if app}
    <App theme="auto" name="ComfyBox" {...f7params}>
        <View
            url="/"
            main={true}
            class="safe-areas"
            masterDetailBreakpoint={768},
            browserHistory=true,
            browserHistoryRoot="/mobile/"
        >
            <GenToolbar {app} />
        </View>
    </App>
    <div class="canvas-wrapper pane-wrapper" style="display: none">
        <canvas id="graph-canvas" />
    </div>
{/if}
