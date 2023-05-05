<script lang="ts">
 import type { ComfyButtonNode } from "$lib/nodes/ComfyWidgetNodes";
 import type { ComfySliderNode } from "$lib/nodes/index";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { Button } from "@gradio/button";
 import { get, type Writable } from "svelte/store";
 export let widget: WidgetLayout | null = null;
 let node: ComfyButtonNode | null = null;
 let nodeValue: Writable<boolean> | null = null;
 let propsChanged: Writable<number> | null = null;

 $: widget && setNodeValue(widget);

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyButtonNode
         nodeValue = node.value;
         propsChanged = node.propsChanged;
     }
 };

 function onClick(e: MouseEvent) {
     node.onClick();
 }

 const style = {
     full_width: "100%"
 }
</script>

<div class="wrapper gr-button">
    {#if node !== null}
        <Button on:click={onClick} variant="primary" {style}>
            {widget.attrs.title}
        </Button>
    {/if}
</div>

<style>
 .wrapper {
     padding: 2px;
     width: 100%;
 }
</style>
