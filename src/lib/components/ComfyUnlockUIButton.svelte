<script lang="ts">
 import { Button } from "@gradio/button"
 import { LockOpen2, LockClosed } from "radix-icons-svelte"

 export let toggled: boolean = false;

 function toggle() {
     toggled = !toggled;
 }
</script>

<div class="comfy-toggle-button" class:toggled>
    <Button on:click={toggle} variant={toggled ? "primary" : "secondary"}>
        {#if toggled}
            <LockOpen2 />
        {:else}
            <LockClosed />
        {/if}
    </Button>
</div>

<style lang="scss">
 .comfy-toggle-button {
     display: inline-flex;
     width: var(--size-12);
     height: var(--size-12);

     > :global(.secondary.lg) {
         border: var(--button-border-width) solid var(--neutral-400);
     }

     > :global(.primary.lg) {
         border: var(--button-border-width) solid var(--primary-400);
     }

     &.toggled {
         :global(svg) {
             color: var(--button-primary-text-color);
         }
     }

     :global(svg) {
         color: var(--button-secondary-text-color);
     }
 }
</style>
