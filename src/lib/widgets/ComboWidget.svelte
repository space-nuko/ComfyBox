<script lang="ts">
 import { BlockTitle } from "@gradio/atoms";
 import Select from 'svelte-select';
 import type { ComfyComboNode } from "$lib/nodes/index";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { get, type Writable } from "svelte/store";
 export let widget: WidgetLayout | null = null;
 let node: ComfyComboNode | null = null;
 let nodeValue: Writable<string> | null = null;
 let propsChanged: Writable<boolean> | null = null;
 let option: any

 $: widget && setNodeValue(widget);

 $: if (nodeValue !== null && (!$propsChanged || $propsChanged)) {
     $nodeValue = option
     setOption($nodeValue)
     setNodeValue(widget)
     node.properties = node.properties
 }

 function setNodeValue(widget: WidgetLayout) {
     if(widget) {
         node = widget.node as ComfyComboNode
         nodeValue = node.value;
         propsChanged = node.propsChanged;
         setOption($nodeValue) // don't react on option
     }
 }

 function setOption(value: any) {
     option = value;
 }

 $: if (nodeValue && option && option.value) {
     $nodeValue = option.value;
 }
</script>

<div class="wrapper gr-combo">
    {#if node !== null && nodeValue !== null}
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
