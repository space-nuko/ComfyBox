<script lang="ts">
 import type { WidgetUIState } from "$lib/stores/widgetState";
	import { Block } from "@gradio/atoms";
 import { Gallery } from "@gradio/gallery";
 export let item: WidgetUIState | null = null;
</script>

<div class="wrapper comfy-gallery-widget">
    {#if item}
        <Block variant="solid" padding={false}>
            <Gallery
                bind:value={item.value}
                label={item.widget.name}
                show_label={true}
                root={""}
                root_url={""}
                on:select
            />
        </Block>
    {/if}
</div>

<style>
 .wrapper {
     padding: 2px;
     width: 100%;
 }
</style>
