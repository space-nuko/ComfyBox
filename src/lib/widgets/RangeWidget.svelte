<script lang="ts">
 import type { WidgetUIState, WidgetUIStateStore } from "$lib/stores/widgetState";
 import { Range } from "@gradio/form";
 import { get } from "svelte/store";
 export let item: WidgetUIState | null = null;
 let itemValue: WidgetUIStateStore | null = null;
 let option: number | null = null;

 $: if (item) {
     itemValue = item.value;
     updateOption(); // don't react on option
 }

 function updateOption() {
     option = get(itemValue);
 }

 function onRelease(e: Event) {
     if (itemValue && option) {
         $itemValue = option
     }
 }
</script>

<div class="wrapper gr-range">
    {#if item !== null && option !== null}
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
