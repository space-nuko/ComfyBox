<script lang="ts">
 import { ImageViewer } from "$lib/ImageViewer";
 import { Block, BlockLabel, Empty } from "@gradio/atoms";
 import { Gallery } from "$lib/components/gradio/gallery";
 import { Image } from "@gradio/icons";
 import { StaticImage } from "$lib/components/gradio/image";
 import type { Styles } from "@gradio/utils";
 import type { WidgetLayout } from "$lib/stores/layoutStates";
 import { writable, type Writable } from "svelte/store";
 import type { SelectData as GradioSelectData } from "@gradio/utils";
 import { clamp, comfyBoxImageToComfyURL, type ComfyBoxImageMetadata } from "$lib/utils";
 import { f7 } from "framework7-svelte";
 import type { ComfyGalleryNode } from "$lib/nodes/widgets";
 import { showMobileLightbox } from "$lib/components/utils";
 import queueState from "$lib/stores/queueState";
 import uiState from "$lib/stores/uiState";
 import { loadImage } from "./utils";
 import Spinner from "$lib/components/Spinner.svelte";

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyGalleryNode | null = null;
 let nodeValue: Writable<ComfyBoxImageMetadata[]> | null = null;
 let propsChanged: Writable<number> | null = null;
 let imageWidth: Writable<number> = writable(0);
 let imageHeight: Writable<number> = writable(0);
 let selected_image: Writable<number | null> = writable(null);
 let forceSelectImage: Writable<boolean | null> = writable(null);

 $: widget && setNodeValue(widget);

 function tagsMatch(tags: string[] | null): boolean {
     if(tags != null && tags.length > 0)
         return node.properties.tags.length > 0 && node.properties.tags.every(t => tags.includes(t));
     else
         return node.properties.tags.length === 0;
 }

 let previewURL: string | null;
 let previewImage: HTMLImageElement | null = null;
 let previewElem: HTMLImageElement | null = null
 $: {
     previewURL = $queueState.previewURL;

     if (previewURL && $queueState.runningPromptID && !$uiState.hidePreviews && node.properties.showPreviews) {
         const queueEntry = queueState.getQueueEntry($queueState.runningPromptID)
         if (queueEntry != null) {
             const tags = queueEntry.extraData?.extra_pnginfo?.comfyBoxPrompt?.subgraphs;
             if (tagsMatch(tags)) {
                 loadImage(previewURL).then((img) => {
                     previewImage = img;
                 })
             }
         }
     }
     else {
         previewImage = null;
     }
 }

 function showPreview() {
 }

 function hidePreview() {
 }

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyGalleryNode
         nodeValue = node.value;
         propsChanged = node.propsChanged;
         imageWidth = node.imageWidth
         imageHeight = node.imageHeight
         selected_image = node.selectedImage;
         forceSelectImage = node.forceSelectImage;
         previewURL = null;
         previewImage = null;

         if ($nodeValue != null) {
             if (node.properties.index < 0 || node.properties.index >= $nodeValue.length) {
                 node.setProperty("index", clamp(node.properties.index, 0, $nodeValue.length))
             }
         }
     }
 };

 let style: Styles = {
     grid_cols: [isMobile ? 2 : 3],
     object_fit: "cover",
     // preview: true
 }

 function showMobileLightbox_(source: HTMLImageElement, selectedImage: number) {
     const galleryElem = source.closest<HTMLDivElement>("div.block")
     console.debug("[ImageViewer] showModal", source, galleryElem);
     if (!galleryElem || ImageViewer.all_gallery_buttons(galleryElem).length === 0) {
         console.error("No buttons found on gallery element!", galleryElem)
         return;
     }

     const allGalleryButtons = ImageViewer.all_gallery_buttons(galleryElem);

     const images = allGalleryButtons.map(button => {
         return {
             url: (button.children[0] as HTMLImageElement).src,
             // caption: "Image"
         }
     })

     showMobileLightbox(images, selectedImage, { thumbs: images });
 }

 function onClickedSingle(e: CustomEvent<GradioSelectData>) {
     const images = $nodeValue.map(comfyBoxImageToComfyURL)
     if (isMobile) {
         showMobileLightbox(images, 0, { thumbs: images });
     }
     else {
         ImageViewer.instance.showModal(images, 0)
     }
 }

 function onClicked(e: CustomEvent<HTMLImageElement>) {
     if (isMobile) {
         showMobileLightbox_(e.detail, $selected_image)
     }
     else {
         ImageViewer.instance.showLightbox(e.detail)
     }
 }

 function onSelect(e: CustomEvent<GradioSelectData>) {
     // Update index
     node.setProperty("index", e.detail.index as number)
 }
</script>

{#if widget && node && nodeValue && $nodeValue}
    {#if widget.attrs.variant === "image"}
        <div class="wrapper comfy-image-widget" style={widget.attrs.style || ""}>
            <Block variant="solid" padding={false}>
                {#if $nodeValue && $nodeValue.length > 0}
                    {@const value = $nodeValue[$nodeValue.length-1]}
                    {@const url = comfyBoxImageToComfyURL(value)}
                    <StaticImage
                        value={url}
                        show_label={widget.attrs.title != ""}
                        label={widget.attrs.title}
                        on:select={onClickedSingle}
                        bind:imageWidth={$imageWidth}
                        bind:imageHeight={$imageHeight}
                    />
                {:else}
                    <Empty size="large" unpadded_box={true}><Image /></Empty>
                {/if}
            </Block>
        </div>
    {:else}
        {@const images = $nodeValue.map(comfyBoxImageToComfyURL)}
        <div class="wrapper comfy-gallery-widget gradio-gallery" style={widget.attrs.style || ""}>
            <Block variant="solid" padding={false}>
                <div class="padding">
                    {#if previewImage && $queueState.runningPromptID != null}
                        <div class="comfy-gallery-preview" on:mouseover={hidePreview} on:mouseout={showPreview} >
                            <img src={previewImage.src} bind:this={previewElem} on:mouseout={showPreview} />
                        </div>
                    {/if}
                    <Gallery
                        value={images}
                        label={widget.attrs.title}
                        show_label={widget.attrs.title !== ""}
                        {style}
                        root={""}
                        root_url={""}
                        on:select={onSelect}
                        on:clicked={onClicked}
                        bind:imageWidth={$imageWidth}
                        bind:imageHeight={$imageHeight}
                        bind:selected_image={$selected_image}
                        bind:forceSelectImage={$forceSelectImage}
                    />
                </div>
            </Block>
        </div>
    {/if}
{/if}

<style lang="scss">
 .wrapper {
     width: 100%;

     :global(> .block) {
         border-radius: 0px !important;
     }

     :global(button.thumbnail-lg) {
         width: var(--size-32);
     }

     &.comfy-image-widget {
         aspect-ratio: 1/1;

         :global(> .block) {
             height: 100%;

             :global(img) {
                 width: 100%;
                 height: 100%;
                 object-fit: contain;
             }
         }
     }

     &:hover .comfy-gallery-preview {
         opacity: 0%;
     }
 }

 .comfy-gallery-preview {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     z-index: var(--layer-top);
     pointer-events: none;
     transition: opacity 0.1s linear;
     opacity: 100%;

     > img {
         width: var(--size-full);
         height: var(--size-full);
         object-fit: contain;
         border: 5px dashed var(--secondary-400);
     }
 }

 .padding {
     height: 30rem;
 }

</style>
