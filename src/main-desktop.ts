import { configureLitegraph } from '$lib/init';
import App from './App.svelte';

configureLitegraph()

const app = new App({
    target: document.getElementById('app'),
})

export default app;
