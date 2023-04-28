<script lang="ts">
  import { App, View, Page, Navbar, Toolbar, Link } from 'framework7-svelte';
  import "framework7/css/bundle"

  import { onMount } from 'svelte';
  import { f7, f7ready } from 'framework7-svelte';

  // Import pages components
  import HomePage from './home.svelte';
  import AboutPage from './about.svelte';
  import LoginPage from './login.svelte';

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

 onMount(() => {
     window.addEventListener("backbutton", onBackKeyDown, false);
     window.addEventListener("popstate", onBackKeyDown, false);
 })

  /*
    Now we need to map components to routes.
    We need to pass them along with the F7 app parameters to <App> component
  */

  const f7params = {
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

<!-- Main Framework7 App component where we pass Framework7 params -->
<App theme="ios" name="ComfyBox" {...f7params}>

  <!-- Your main view, should have "main" prop -->
  <View
    url="/"
    main={true}
    class="safe-areas"
    masterDetailBreakpoint={768},
    browserHistory=true,
    browserHistoryRoot="/mobile/"
  />
</App>
