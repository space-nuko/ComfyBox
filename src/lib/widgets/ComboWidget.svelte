<script lang="ts">
 import { BlockTitle } from "@gradio/atoms";
 import Select from 'svelte-select';
 import type { ComfyComboNode } from "$lib/nodes/index";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { get, type Writable } from "svelte/store";
 import { isDisabled } from "./utils"
 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyComboNode | null = null;
 let nodeValue: Writable<string> | null = null;
 let propsChanged: Writable<number> | null = null;
 let comboRefreshed: Writable<boolean> | null = null;
 let wasComboRefreshed: boolean = false;
 let option: any

 export let debug: boolean = false;
 let input: HTMLInputElement | null = null

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
         comboRefreshed = node.comboRefreshed;
         if ($comboRefreshed)
             flashOnRefreshed();
         setOption($nodeValue) // don't react on option
     }
 }

 function setOption(value: any) {
     option = value;
 }

 $: if (nodeValue && option && option.value) {
     $nodeValue = option.value;
 }

 $: $comboRefreshed && flashOnRefreshed();

 function flashOnRefreshed() {
     setTimeout(() => ($comboRefreshed = false), 1000);
 }

 function getLinkValue() {
     if (!node)
         return "???";
     const links = node.getOutputLinks(0)
     if (links.length === 0)
         return "???";
     return links[0].data
 }

 function onFocus() {
     navigator.vibrate(20)
 }

 function onSelect() {
     if (input)
         input.blur();
     navigator.vibrate(20)
 }
</script>

<div class="wrapper comfy-combo" class:updated={$comboRefreshed}>
    {#key $propsChanged}
        {#key $comboRefreshed}
            {#if node !== null && nodeValue !== null}
                <label>
                    {#if widget.attrs.title !== ""}
                        <BlockTitle show_label={true}>{widget.attrs.title}</BlockTitle>
                    {/if}
                    <Select
                        bind:value={option}
                        items={node.properties.values}
                        disabled={isDisabled(widget) || node.properties.values.length === 0}
                        clearable={false}
                        showChevron={true}
                        inputAttributes={{ autocomplete: 'off' }}
                        bind:input
                        on:change
                        on:focus={onFocus}
                        on:select={onSelect}
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

 :global(.svelte-select) {
     width: auto;
     --font-size: 13px;
     --height: 32px;
 }

 :global(.svelte-select-list) {
     z-index: var(--layer-top) !important;
 }
</style>
