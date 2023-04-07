<script lang="ts">
 import type { WidgetUIState } from "$lib/stores/widgetState";
 import { BlockTitle } from "@gradio/atoms";
 import { Dropdown } from "@gradio/form";
 import Select from 'svelte-select';
 export let item: WidgetUIState | null = null;

 let option: any = null;

 $: if(item && !option) option = item.value;
</script>

<div class="wrapper">
    {#if item}
        <label>
            <BlockTitle show_label={true}>{item.widget.name}</BlockTitle>
            <Select
                bind:value={option}
                bind:justValue={item.value}
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
