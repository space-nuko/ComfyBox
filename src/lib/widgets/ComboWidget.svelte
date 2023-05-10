<script lang="ts">
 import { tick } from 'svelte'
 import { BlockTitle } from "@gradio/atoms";
 import Select from 'svelte-select';
 // import VirtualList from '$lib/components/VirtualList.svelte';
 import VirtualList from 'svelte-tiny-virtual-list';
 import type { ComfyComboNode } from "$lib/nodes/index";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { get, writable, type Writable } from "svelte/store";
 import { isDisabled } from "./utils"
 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyComboNode | null = null;
 let nodeValue: Writable<string> | null = null;
 let propsChanged: Writable<number> | null = null;
 let valuesForCombo: Writable<any[]> | null = null;
 let lastConfigured: any = null;
 let option: any = null;

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
         valuesForCombo = node.valuesForCombo;
     }
 }

 $: $valuesForCombo != null && updateActiveIndex($valuesForCombo)

 function updateActiveIndex(values: any) {
     const value = $nodeValue;
     activeIndex = values.findIndex(v => v.value === value);
 }

 $: $valuesForCombo != lastConfigured && flashOnRefreshed();
 let lightUp = false;

 function flashOnRefreshed() {
     lastConfigured = $valuesForCombo
     if (lastConfigured != null) {
         lightUp = true;
         setTimeout(() => (lightUp = false), 1000);
     }
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
     // console.warn("FOCUS")
     if (listOpen) {
         navigator.vibrate(20)
     }
 }

 function onSelect(e: CustomEvent<any>) {
     if (input)
         input.blur();
     navigator.vibrate(20)

     const item = e.detail

     console.debug("[ComboWidget] SELECT", item, item.index)
     $nodeValue = item.value;
     activeIndex = item.index;
     listOpen = false;
 }

 let activeIndex = null;
 let hoverItemIndex = null;
 let filterText = "";
 let listOpen = null;
 let scrollToIndex = null;
 let start = 0;
 let end = 0;

 function handleHover(index: number) {
     // console.warn("HOV", index)
     hoverItemIndex = index;
 }

 function handleSelect(index: number) {
     // console.warn("SEL", index)
     navigator.vibrate(20)
     const item = $valuesForCombo[index]
     activeIndex = index;
     $nodeValue = item.value
     listOpen = false;
     filterText = ""
     input?.blur()
 }

 function onFilter() {
     // if (scrollToIndex)
     //     scrollToIndex(0)
 }

 const activeScroll = scrollAction;
 const hoverScroll = scrollAction;

 function scrollAction(node) {
     return {
         update(args) {
             if (args.scroll) {
                 // handleListScroll();
                 node.scrollIntoView({ behavior: 'auto', block: 'nearest' });
             }
         },
     };
 }

</script>

<div class="wrapper comfy-combo" class:updated={lightUp}>
    {#key $valuesForCombo}
        {#if node !== null && nodeValue !== null}
            {#if $valuesForCombo == null}
                <span>Loading...</span>
            {:else}
                <label>
                    {#if widget.attrs.title !== ""}
                        <BlockTitle show_label={true}>
                            {widget.attrs.title}
                            <span class="count-text">({$valuesForCombo.length})</span>
                        </BlockTitle>
                    {/if}
                    <Select
                        value={$nodeValue}
                        bind:justValue={option}
                        bind:hoverItemIndex
                        bind:filterText
                        bind:listOpen
                        bind:input
                        items={$valuesForCombo}
                        disabled={isDisabled(widget)}
                        clearable={false}
                        showChevron={true}
                        listAutoWidth={true}
                        inputAttributes={{ autocomplete: 'off' }}
                        on:change
                        on:focus={onFocus}
                        on:hoverItem={(e) => handleHover(e.detail)}
                        on:select={(e) => handleSelect(e.detail.index)}
                        on:blur
                        on:filter={onFilter}>
                        <div class="comfy-select-list" slot="list" let:filteredItems>
                            {#if filteredItems.length > 0}
                                <VirtualList
                                    items={filteredItems}
                                    width="100%"
                                    height={300}
                                    itemCount={filteredItems?.length}
                                    itemSize={50}
                                    scrollToIndex={hoverItemIndex}>
                                    <div slot="item"
                                         class="comfy-select-item"
                                         let:index={i}
                                         let:style
                                         {style}
                                         class:active={activeIndex === filteredItems[i].index}
                                         class:hover={hoverItemIndex === i}
                                         on:click={() => handleSelect(filteredItems[i].index)}
                                        on:focus={() => handleHover(i)}
                                        on:mouseover={() => handleHover(i)}>
                                        {@const item = filteredItems[i]}
                                        <span class="comfy-select-label">
                                            {item.label}
                                        </span>
                                    </div>
                                </VirtualList>
                            {:else}
                                <div class="comfy-empty-list">
                                    <span>(No items)</span>
                                </div>
                            {/if}
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

     .count-text {
         font-size: smaller;
     }

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

 .comfy-select-list {
     height: 300px;
     width: 30rem;
     background-color: white;

     .comfy-empty-list {
         height: 100%;
         display: flex;
         justify-content: center;
         align-items: center;
         font-size: xx-large;
         color: var(--neutral-700)
     }

     .comfy-select-item {
         font-size: 16px;
         padding: 1.2rem;
         border: 1px solid var(--neutral-300);
         border-top: none;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         display: flex;
         align-items: center;

         &.hover {
             color: white;
             background: var(--neutral-400);
             cursor: pointer;
         }
         &.active {
             color: white;
             background: var(--color-blue-500);
         }

         .comfy-select-label {

         }
     }

     .details {
         background: white;
         border: 1px solid grey;
     }

     :global(svelte-virtual-list-row) {
         white-space: nowrap;
     }
 }
</style>
