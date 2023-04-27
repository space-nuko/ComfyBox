<script lang="ts">
 import type { WidgetUIState, WidgetUIStateStore } from "$lib/stores/widgetState";
 import { Range } from "framework7-svelte";
 import { BlockTitle } from "@gradio/atoms";
 import { createEventDispatcher } from "svelte"
 import { get } from "svelte/store";
 export let item: WidgetUIState | null = null;
 let itemValue: WidgetUIStateStore | null = null;
 let option: number | null = null;

 const dispatch = createEventDispatcher();

 $: if (item) {
     itemValue = item.value;
     updateOption(); // don't react on option
 }

 function updateOption() {
     option = get(itemValue);
 }

 function onMouseup(value: number) {
     $itemValue = option
 }

 function onChange(e: Event) {
     option = e.detail[0]
 }

 function onRelease(e: Event) {
     option = e.detail[0]
     $itemValue = option
 }

 const clamp = () => {
     if (itemValue && option) {
         onMouseup();
         option = Math.min(Math.max(option, item.widget.options.min), item.widget.options.max);
     }
 };

</script>

<div class="wrapper">
    {#if item !== null && option !== undefined}
        <div class="wrap">
            <div class="head">
                <BlockTitle>{item.widget.name}</BlockTitle>
                <input
                    type="number"
                    bind:value={option}
                    min={item.widget.options.min}
                    max={item.widget.options.max}
                    step={item.widget.options.step}
                    on:blur={clamp}
                    on:mouseup={onMouseup}
                />
            </div>
        </div>
        <Range
            bind:value={option}
            min={item.widget.options.min}
            max={item.widget.options.max}
            step={item.widget.options.step}
            label={false}
            on:rangeChanged={onRelease}
            on:rangeChange={onChange}
        />
    {/if}
</div>

<style>
 .wrap {
     display: flex;
     flex-direction: column;
     width: 100%;
 }
 .head {
     display: flex;
     justify-content: space-between;
 }
 input[type="number"] {
     display: block;
     position: relative;
     outline: none !important;
     box-shadow: var(--input-shadow);
     border: var(--input-border-width) solid var(--input-border-color);
     border-radius: var(--input-radius);
     background: var(--input-background-fill);
     padding: var(--size-2) var(--size-2);
     height: var(--size-6);
     color: var(--body-text-color);
     font-size: var(--input-text-size);
     line-height: var(--line-sm);
     text-align: center;
 }
 input::placeholder {
     color: var(--input-placeholder-color);
 }

 input[type="number"]:focus {
     box-shadow: var(--input-shadow-focus);
     border-color: var(--input-border-color-focus);
 }
 .wrapper {
     padding: 2px;
     width: 100%;
 }
</style>
