<script lang="ts">
 import { onMount } from "svelte";
 import { ImageViewer } from "$lib/ImageViewer";
 import type { WidgetUIState, WidgetUIStateStore } from "$lib/stores/widgetState";
 import { Block } from "@gradio/atoms";
 import { Gallery } from "@gradio/gallery";
 import type { Styles } from "@gradio/utils";

 export let item: WidgetUIState | null = null;
 let itemValue: WidgetUIStateStore | null = null; // stores must be declared at top level

 $: if(item) {
     itemValue = item.value;
 }

 let style: Styles = {
     // grid_cols: [2],
     grid: [3],
     // object_fit: "cover",
 }
 let element: HTMLDivElement;

 function updateForLightbox() {
     // Wait for gradio gallery to show the large preview image, if no timeout then
     // the event might fire too early
     setTimeout(() => {
         const images = element.querySelectorAll<HTMLImageElement>('div.block div > img')
         if (images != null) {
             images.forEach(ImageViewer.instance.setupImageForLightbox.bind(ImageViewer.instance));
         }
         ImageViewer.instance.updateOnBackgroundChange();
     }, 200)
 }

</script>
<div class="wrapper comfy-gallery-widget" bind:this={element}>
    {#if item && itemValue}
        <Block variant="solid" padding={false}>
            <Gallery
                bind:value={$itemValue}
                label={item.widget.name}
                show_label={true}
                {style}
                root={""}
                root_url={""}
                on:select={updateForLightbox}
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
