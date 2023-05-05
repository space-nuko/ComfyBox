<script lang="ts">
 import { onMount } from "svelte";
 import { get } from "svelte/store";
 import { Button } from "@gradio/button";
 import ComfyApp, { type SerializedAppState } from "$lib/components/ComfyApp";
 import { Checkbox } from "@gradio/form"
 import uiState from "$lib/stores/uiState";
 import { ImageViewer } from "$lib/ImageViewer";
 import { download } from "$lib/utils"

 import { LGraph, LGraphNode } from "@litegraph-ts/core";
 import type { ComfyAPIStatus } from "$lib/api";
 import queueState from "$lib/stores/queueState";
 import { App, View, Toolbar, Page, Navbar, Link, BlockTitle, Block, List, ListItem } from "framework7-svelte"

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
     window.addEventListener("backbutton", onBackKeyDown, false);
     window.addEventListener("popstate", onBackKeyDown, false);
 });

 /*
    Now we need to map components to routes.
    We need to pass them along with the F7 app parameters to <App> component
  */

 let f7params = {
     routes: [
         {
             path: '/',
             component: HomePage,
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
         },
         {
             path: '/subworkflows/',
             component: ListSubWorkflowsPage,
         },
         {
             path: '/subworkflows/:subworkflowID/',
             component: SubWorkflowPage,
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
        <GenToolbar/>
    </View>
</App>
{/if}
