<script lang="ts">
 import type { ComfyButtonNode } from "$lib/nodes/ComfyWidgetNodes";
 import type { ComfySliderNode } from "$lib/nodes/index";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { Button } from "@gradio/button";
 import { get, type Writable, writable } from "svelte/store";
 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyButtonNode | null = null;
 let nodeValue: Writable<boolean> | null = null;
 let attrsChanged: Writable<boolean> | null = null;

 $: widget && setNodeValue(widget);

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyButtonNode
         nodeValue = node.value;
         attrsChanged = widget.attrsChanged;
     }
 };

 function onClick(e: MouseEvent) {
     node.onClick();
     navigator.vibrate(20)
 }

 const style = {
     full_width: "100%",
 }
</script>

<div class="wrapper gradio-button">
    {#key $attrsChanged}
        {#if node !== null}
            <Button
                disabled={widget.attrs.disabled}
                on:click={onClick}
                variant={widget.attrs.buttonVariant || "primary"}
                size={widget.attrs.buttonSize === "small" ? "sm" : "lg"}
                {style}>
                {widget.attrs.title}
            </Button>
        {/if}
    {/key}
</div>

<style lang="scss">
 .wrapper {
     padding: 2px;
     width: 100%;
     height: 100%;

     :global(> button) {
         height: 100%;
     }
 }
</style>
