<script lang="ts">
 import type { WidgetUIState } from "$lib/stores/widgetState";
 import { TextBox } from "@gradio/form";
 export let item: WidgetUIState | null = null;
</script>

<div class="wrapper">
    {#if item}
        <TextBox
            bind:value={item.value}
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
