<script lang="ts">
 import type { WidgetDrawState, WidgetUIState, WidgetUIStateStore } from "$lib/stores/nodeState";
 import { BlockTitle } from "@gradio/atoms";
 import { Dropdown } from "@gradio/form";
 import { get } from "svelte/store";
 import Select from 'svelte-select';
 export let item: WidgetUIState | null = null;
 let itemValue: WidgetUIStateStore | null = null;
 let option: any;

 $: if(item) {
     if (!itemValue)
         itemValue = item.value;
     if (!option)
         option = get(item.value);
 };

 $: if (option && itemValue) {
     $itemValue = option.value
 }
</script>

<div class="wrapper gr-combo">
    {#if item !== null && option !== undefined}
        <label>
            <BlockTitle show_label={true}>{item.widget.name}</BlockTitle>
            <Select
                bind:value={option}
                bind:items={item.widget.options.values}
                disabled={item.widget.options.values.length === 0}
                clearable={false}
                on:change
                on:select
                on:filter
                on:blur
            />
        </label>
    {/if}
</div>

<style>
 .wrapper {
     padding: 2px;
     width: 100%;
 }

 :global(.svelte-select-list) {
     z-index: var(--layer-5) !important;
 }
</style>
