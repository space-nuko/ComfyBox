<script lang="ts">
 import type { WidgetUIStateStore } from "$lib/stores/nodeState";
 import { TextBox } from "@gradio/form";
 import type { ComfyComboNode } from "$lib/nodes/index";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { get, type Writable } from "svelte/store";
 export let widget: WidgetLayout | null = null;
 let node: ComfyComboNode | null = null;
 let nodeValue: Writable<string> | null = null;
 let itemValue: WidgetUIStateStore | null = null;

 $: if(widget) {
     node = widget.node as ComfyComboNode
     nodeValue = node.value;
 };
</script>

<div class="wrapper gr-textbox">
    {#if node !== null && nodeValue !== null}
        <TextBox
            bind:value={$itemValue}
            label={widget.attrs.title}
            lines={node.properties.multiline ? 5 : 1}
            max_lines={node.properties.multiline ? 5 : 1}
            show_label={true}
            on:change
            on:submit
            on:blur
            on:select
        />
    {/if}
</div>

<style>
 .wrapper {
     padding: 2px;
     width: 100%;
 }
</style>
