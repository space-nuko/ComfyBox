<script lang="ts">
 import { BlockTitle } from "@gradio/atoms";
 import Select from 'svelte-select';
 import type { ComfyComboNode } from "$lib/nodes/index";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { get, type Writable } from "svelte/store";
 export let widget: WidgetLayout | null = null;
 let node: ComfyComboNode | null = null;
 let nodeValue: Writable<string> | null = null;
 let propsChanged: Writable<number> | null = null;
 let option: any

 export let debug: boolean = false;

 $: widget && setNodeValue(widget);

 $: if (nodeValue !== null && (!$propsChanged || $propsChanged)) {
     if (node.properties.values.indexOf(option.value) === -1) {
         setOption($nodeValue)
         $nodeValue = option
     }
     else {
         $nodeValue = option
         setOption($nodeValue)
     }
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

 function getLinkValue() {
     if (!node)
         return "???";
     const links = node.getOutputLinks(0)
     if (links.length === 0)
         return "???";
     return links[0].data
 }

 let lastPropsChanged: number = 0;
 let werePropsChanged: boolean = false;

 $: if ($propsChanged !== lastPropsChanged) {
     werePropsChanged = true;
     lastPropsChanged = $propsChanged;
     setTimeout(() => (werePropsChanged = false), 2000);
 }
</script>

<div class="wrapper gr-combo" class:updated={werePropsChanged}>
    {#key $propsChanged}
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
                {#if debug}
                    <div>Value: {option?.value}</div>
                    <div>Items: {node.properties.values}</div>
                    <div>NodeValue: {$nodeValue}</div>
                    <div>LinkValue: {getLinkValue()}</div>
                {/if}
            </label>
        {/if}
    {/key}
</div>

<style lang="scss">
 .wrapper {
     padding: 2px;
     width: 100%;
 }

 @keyframes -global-light-up {
     from {
         background-color: var(--color-yellow-400);
     }
     to {
         background-color: none;
     }
 }

 .updated {
     animation: light-up 1s ease-out;
     :global(.svelte-select) {
         animation: light-up 1s ease-out;
     }
 }

 :global(.svelte-select-list) {
     z-index: var(--layer-top) !important;
 }
</style>
