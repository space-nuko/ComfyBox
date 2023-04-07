<script lang="ts">
 import type { WidgetUIState } from "$lib/stores/widgetState";
 import { Range } from "@gradio/form";
 export let item: WidgetUIState | null = null;
</script>

<div class="wrapper">
    {#if item}
        <Range
            bind:value={item.value}
            minimum={item.widget.options.min}
            maximum={item.widget.options.max}
            step={item.widget.options.step}
            label={item.widget.name}
            show_label={true}
            on:change
            on:release
        />
    {/if}
</div>

<style>
 .wrapper {
     padding: 2px;
     width: 100%;
 }
</style>
