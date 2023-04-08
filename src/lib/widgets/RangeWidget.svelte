<script lang="ts">
 import type { WidgetUIState, WidgetUIStateStore } from "$lib/stores/widgetState";
 import { Range } from "@gradio/form";
 import { get } from "svelte/store";
 export let item: WidgetUIState | null = null;
 let itemValue: WidgetUIStateStore | null = null;
 let option: number | null = null;

 $: if (item && !option) {
     if (!itemValue)
         itemValue = item.value;
     option = get(item.value)
 }

 function onRelease(e: Event) {
     if (itemValue && option) {
         $itemValue = option
     }
 }
</script>

<div class="wrapper">
    {#if item && option}
        <Range
            bind:value={option}
            minimum={item.widget.options.min}
            maximum={item.widget.options.max}
            step={item.widget.options.step}
            label={item.widget.name}
            show_label={true}
            on:release={onRelease}
            on:change
        />
    {/if}
</div>

<style>
 .wrapper {
     padding: 2px;
     width: 100%;
 }
</style>
