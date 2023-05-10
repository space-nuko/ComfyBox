<script lang="ts">
 import { BlockTitle } from "@gradio/atoms";
 import Select from 'svelte-select';
 import VirtualList from '@sveltejs/svelte-virtual-list';
 import ListItem from "./ListItem.svelte"
 import type { ComfyComboNode } from "$lib/nodes/index";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { get, writable, type Writable } from "svelte/store";
 import { isDisabled } from "./utils"
 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyComboNode | null = null;
 let nodeValue: Writable<string> | null = null;
 let propsChanged: Writable<number> | null = null;
 let comboRefreshed: Writable<boolean> | null = null;
 let wasComboRefreshed: boolean = false;

 export let debug: boolean = false;
 let input: HTMLInputElement | null = null

 $: widget && setNodeValue(widget);

 $: if (nodeValue !== null) {
     // if (option == null || node.properties.values.indexOf(option.value) === -1) {
     //     setOption($nodeValue)
     //     $nodeValue = option
     // }
     // else {
     //     $nodeValue = option
     //     setOption($nodeValue)
     // }
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
         // setOption($nodeValue) // don't react on option
     }
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

 let start = 0;
 let end = 0;
 let listOpen: boolean = false

 function selectItem(item: any) {
     $nodeValue = item.value;
     listOpen = false;
     document.activeElement?.blur();
 }

 let option: any = null;
 let rebuild = writable(0);
 let virtualList = null;

 function onFilter() {
     // $rebuild += 1
     if (virtualList) {
         // force refresh virtual list
         const viewport = virtualList.querySelector("svelte-virtual-list-viewport")
         viewport.scrollTo(0, 1)
         viewport.scrollTo(0, 0)
     }
     else {
         console.log("no")
     }
 }
</script>

<div class="wrapper comfy-combo" class:updated={$comboRefreshed}>
    {#key $comboRefreshed}
        {#if node !== null && nodeValue !== null}
            {#if node.valuesForCombo == null}
                <span>Loading...</span>
            {:else}
                <span>Count {node.valuesForCombo.length}</span>
                <label>
                    {#if widget.attrs.title !== ""}
                        <BlockTitle show_label={true}>{widget.attrs.title}</BlockTitle>
                    {/if}
                    <Select
                        value={$nodeValue}
                        bind:justValue={option}
                        bind:listOpen
                        items={node.valuesForCombo}
                        disabled={isDisabled(widget)}
                        clearable={false}
                        showChevron={true}
                        listAutoWidth={true}
                        inputAttributes={{ autocomplete: 'off' }}
                        bind:input
                        on:change
                        on:focus={onFocus}
                        on:select={onSelect}
                        on:filter={onFilter}
                        on:blur
                    >
                        <div slot="list" class="list" let:filteredItems>
                            {#key $rebuild}
                                <div class="container" bind:this={virtualList}>
                                    <VirtualList items={filteredItems} bind:start bind:end let:item>
                                        <div class="item"
                                              class:selected={option === item.value}
                                              on:click={() => selectItem(item)}>
                                            {item.label}
                                        </div>
                                    </VirtualList>
                                    <p class="details">showing items {start}-{end}</p>
                                </div>
                            {/key}
                        </div>
                    </Select>
                </label>
            {/if}
        {/if}
    {/key}
</div>

<style lang="scss">
 .wrapper {
     padding: 2px;
     width: 100%;

     :global(.selected-item) {
         // no idea how to get the select box to shrink in the flexbox otherwise...
         position: absolute !important;
         width: -webkit-fill-available !important;
     }
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
     overflow-y: initial !important;
     width: auto !important; // seems floating-ui overrides listAutoWidth
 }

 .container {
     border-top: 1px solid #333;
     border-bottom: 1px solid #333;

     height: 100%
 }

 .list {
     height: 30rem;
     width: 30rem;
     background-color: white;

     .item {
         font-size: 16px;
         &.selected {
             color: white;
             background: var(--color-yellow-500);
         }
     }

     .details {
         background: white;
         border: 1px solid grey;
     }

     :global(svelte-virtual-list-row) {
         white-space: nowrap;
     }

     :global(svelte-virtual-list-row:hover) {
         color: white;
         background: var(--color-blue-500);
         cursor: pointer;
     }
 }
</style>
