<script lang="ts">
 import type { WidgetDrawState, WidgetUIState, WidgetUIStateStore } from "$lib/stores/nodeState";
 import { BlockTitle } from "@gradio/atoms";
 import { Dropdown } from "@gradio/form";
 import Select from 'svelte-select';
 import type { ComfyComboNode } from "$lib/nodes/index";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { get, type Writable } from "svelte/store";
 export let widget: WidgetLayout | null = null;
 let node: ComfyComboNode | null = null;
 let nodeValue: Writable<string> | null = null;
 let itemValue: WidgetUIStateStore | null = null;
 let option: any;

 $: if(widget) {
     node = widget.node as ComfyComboNode
     nodeValue = node.value;
     updateOption(); // don't react on option
 };

 function updateOption() {
     option = get(nodeValue);
 }

 $: if (option && itemValue) {
     $itemValue = option.value
 }
</script>

<div class="wrapper gr-combo">
    {#if node !== null && option !== undefined}
        <label>
            <BlockTitle show_label={true}>{widget.attrs.title}</BlockTitle>
            <Select
                bind:value={option}
                bind:items={node.properties.values}
                disabled={node.properties.values.length === 0}
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
     z-index: var(--layer-top) !important;
 }
</style>
