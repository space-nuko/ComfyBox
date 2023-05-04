<script lang="ts">
 import type { ComfySliderNode } from "$lib/nodes/index";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { Range } from "@gradio/form";
 import { get, type Writable } from "svelte/store";
 export let widget: WidgetLayout | null = null;
 let node: ComfySliderNode | null = null;
 let nodeValue: Writable<number> | null = null;
 let propsChanged: Writable<boolean> | null = null;
 let option: number | null = null;

 $: widget && setNodeValue(widget);

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfySliderNode
         nodeValue = node.value;
         propsChanged = node.propsChanged;
         setOption($nodeValue); // don't react on option
     }
 };

 $: if ($propsChanged && nodeValue !== null) {
     setOption($nodeValue)
     setNodeValue(widget)
     node.properties = node.properties
 }

 function setOption(value: any) {
     option = value;
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
