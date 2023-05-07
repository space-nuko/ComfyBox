<script lang="ts">
 import type { ComfySliderNode } from "$lib/nodes/index";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { Range } from "$lib/components/gradio/form";
 import { get, type Writable } from "svelte/store";
 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfySliderNode | null = null;
 let nodeValue: Writable<number> | null = null;
 let propsChanged: Writable<number> | null = null;
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

 // I don't know why but this is necessary to watch for changes to node
 // properties from ComfyWidgetNode.
 $: if (nodeValue !== null && (!$propsChanged || $propsChanged)) {
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
         navigator.vibrate(100)
     }
 }

 let elem: HTMLDivElement = null;

 $: if (elem && node !== null && option !== null && (!$propsChanged || $propsChanged)) {
     const slider = elem.querySelector("input[type='range']") as any
     //const range_selectors = "[id$='_clone']:is(input[type='range'])";
     let spacing = ((slider.step / ( slider.max - slider.min )) * 100.0);
     let tsp = 'max(3px, calc('+spacing+'% - 2px))';
     let fsp = 'max(4px, calc('+spacing+'% + 0px))';
     const style = elem.style;
     style.setProperty('--ae-slider-bg-overlay', 'repeating-linear-gradient( 90deg, transparent, transparent '+tsp+', var(--ae-input-border-color) '+tsp+', var(--ae-input-border-color) '+fsp+' )');
 }
</script>

<div class="wrapper gradio-slider" class:mobile={isMobile} bind:this={elem}>
    {#if node !== null && option !== null}
        <Range
            bind:value={option}
            disabled={widget.attrs.disabled}
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

<style lang="scss">
 .wrapper {
     padding: 2px;
     width: 100%;

     // Prevent swiping on the slider track from accidentally changing the value
     &.mobile :global(input[type="range"]) {
         pointer-events: none;

         &::-webkit-slider-thumb {
             pointer-events: all;
         }
     }
 }
</style>
