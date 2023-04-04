<script lang="ts">
 import { SvelteUIProvider } from '@svelteuidev/core';
 import ComfyApp from "$lib/components/ComfyApp.svelte"
</script>

<SvelteUIProvider themeObserver="light">
    <ComfyApp/>
</SvelteUIProvider>
