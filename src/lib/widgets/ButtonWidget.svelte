<script lang="ts">
 import { type WidgetLayout } from "$lib/stores/layoutStates";
 import { Button } from "@gradio/button";
 import { get, type Writable, writable } from "svelte/store";
 import { isDisabled } from "./utils"
 import { vibrateIfPossible } from "$lib/utils";
 import type { ComfyButtonNode } from "$lib/nodes/widgets";

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;

 let node: ComfyButtonNode | null = null;
 // let nodeValue: Writable<boolean> = writable(false);
 let attrsChanged: Writable<number> = writable(0);

 $: widget && setNodeValue(widget);

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyButtonNode
         // nodeValue = node.value;
         attrsChanged = widget.attrsChanged;
     }
 };

 function onClick(e: MouseEvent) {
     node.onClick();
     vibrateIfPossible(20)
 }

 const style = {
     full_width: true
 }
</script>

<div class="wrapper gradio-button">
    {#key $attrsChanged}
        {#if widget !== null && node !== null}
            <Button
                disabled={isDisabled(widget)}
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
