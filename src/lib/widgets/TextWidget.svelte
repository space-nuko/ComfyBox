<script lang="ts">
 import { TextBox } from "@gradio/form";
 import { type WidgetLayout } from "$lib/stores/layoutStates";
 import { type Writable } from "svelte/store";
 import { isDisabled } from "./utils"
 import type { ComfyTextNode } from "$lib/nodes/widgets";
 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;

 let node: ComfyTextNode | null = null;
 let nodeValue: Writable<string> | null = null;
 let propsChanged: Writable<number> | null = null;

 $: widget && setNodeValue(widget);

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyTextNode
         nodeValue = node.value;
         propsChanged = node.propsChanged;
     }
 };

 // I don't know why but this is necessary to watch for changes to node
 // properties from ComfyWidgetNode.
 $: if (nodeValue !== null && (!$propsChanged || $propsChanged)) {
     setNodeValue(widget)
     node.properties = node.properties
 }
</script>

<div class="wrapper gradio-textbox">
    {#if node !== null && nodeValue !== null}
        <TextBox
            bind:value={$nodeValue}
            label={widget.attrs.title}
            disabled={isDisabled(widget)}
            lines={node.properties.multiline ? 5 : 1}
            max_lines={node.properties.multiline ? 5 : 1}
            show_label={widget.attrs.title !== ""}
            on:change
            on:submit
            on:blur
            on:select
        />
    {/if}
</div>

<style lang="scss">
 .wrapper {
     padding: 2px;
     width: 100%;

     @include disable-inputs;
 }

 :global(span.hide) {
     display: none;
 }
</style>
