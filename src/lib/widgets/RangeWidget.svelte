<script lang="ts">
 import type { WidgetUIState, WidgetUIStateStore } from "$lib/stores/widgetState";
 import { Range } from "@gradio/form";
 export let item: WidgetUIState | null = null;
 let itemValue: WidgetUIStateStore | null = null;
 $: if (item) { itemValue = item.value; }
</script>

<div class="wrapper">
    {#if item && itemValue}
        <Range
            bind:value={$itemValue}
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
