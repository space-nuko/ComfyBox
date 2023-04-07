<script lang="ts">
 import type { WidgetUIState } from "$lib/stores/widgetState";
 import { Dropdown } from "@gradio/form";
 export let item: WidgetUIState | null = null;
</script>

<div class="wrapper">
    {#if item}
        <Dropdown
            bind:value={item.value}
            choices={item.widget.options.values}
            multiselect={false}
            max_choices={1}
            label={item.widget.name}
            show_label={true}
            disabled={item.widget.options.values.length === 0}
            on:change
            on:select
            on:blur
        />
    {/if}
</div>

<style>
 .wrapper {
     padding: 2px;
     width: 100%;
 }
</style>
