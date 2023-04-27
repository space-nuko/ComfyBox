<script lang="ts">
 import type { WidgetUIState, WidgetUIStateStore } from "$lib/stores/widgetState";
 import { TextBox } from "@gradio/form";
 export let item: WidgetUIState | null = null;
 let itemValue: WidgetUIStateStore | null = null;
 $: if (item) { itemValue = item.value; }
</script>

<div class="wrapper">
    {#if item !== null && itemValue !== null}
        <TextBox
            bind:value={$itemValue}
            label={item.widget.name}
            lines={item.widget.options.multiline ? 5 : 1}
            max_lines={item.widget.options.multiline ? 5 : 1}
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
