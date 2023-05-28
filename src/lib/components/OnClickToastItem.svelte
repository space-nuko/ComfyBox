<script lang="ts">
 import type { NotifyOptions } from "$lib/notify";
 import { toast } from "@zerodevx/svelte-toast";

 export let message: string = ""
 export let notifyOptions: NotifyOptions
 export let toastID: string

 function onClick() {
     if (notifyOptions.onClick) {
         notifyOptions.onClick()
         toast.pop(toastID)
     }
 }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={onClick}>{message}</div>

<style lang="scss">
 div {
     cursor: pointer;
 }
</style>
