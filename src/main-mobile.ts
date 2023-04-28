import AppMobile from './AppMobile.svelte';
import Framework7 from 'framework7/lite-bundle';
import Framework7Svelte from 'framework7-svelte';
import { f7 } from 'framework7-svelte';


Framework7.use(Framework7Svelte);

const app = new AppMobile({
  target: document.getElementById('app'),
})

export default app;
