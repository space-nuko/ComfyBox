<script lang="ts">
 import type { ComfySliderNode } from "$lib/nodes/index";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { Range } from "@gradio/form";
 import { get, type Writable } from "svelte/store";
 export let widget: WidgetLayout | null = null;
 let node: ComfySliderNode | null = null;
 let nodeValue: Writable<number> | null = null;
 let option: number | null = null;

 $: if(widget) {
     node = widget.node
     nodeValue = node.value;
     updateOption(); // don't react on option
 };

 function updateOption() {
     option = get(nodeValue);
 }

 function onRelease(e: Event) {
     if (nodeValue && option) {
         $nodeValue = option
     }
 }
</script>

<div class="wrapper gr-range">
    {#if node !== null && option !== null}
        <Range
            bind:value={option}
            minimum={node.properties.min}
            maximum={node.properties.max}
            step={node.properties.step}
            label={widget.attrs.title}
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
