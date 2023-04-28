import AppMobile from './AppMobile.svelte';
import Framework7 from 'framework7/lite-bundle';
import Framework7Svelte from 'framework7-svelte';
import { f7 } from 'framework7-svelte';


Framework7.use(Framework7Svelte);

const app = new AppMobile({
  target: document.getElementById('app'),
})

function onBackKeyDown(e: Event) {
    console.log(f7.view.current.router.currentRoute.name)
		e.preventDefault();
	// Handle the back button
	if(f7.view.current.router.currentRoute.name == 'index'){
		// exitApp();
		e.preventDefault();
	} else {
        f7.dialog.close()
        f7.view.main.router.back()
		return false;
	}
}

document.addEventListener("backbutton", onBackKeyDown, false);
document.addEventListener("popstate", onBackKeyDown, false);

export default app;
