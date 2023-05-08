<script lang="ts">
 import { ImageViewer } from "$lib/ImageViewer";
 import { Block, BlockLabel, Empty } from "@gradio/atoms";
 import { Gallery } from "@gradio/gallery";
 import { Image } from "@gradio/icons";
 import type { Styles } from "@gradio/utils";
 import type { WidgetLayout } from "$lib/stores/layoutState";
 import type { Writable } from "svelte/store";
 import type { ComfyGalleryNode } from "$lib/nodes/ComfyWidgetNodes";
 import type { FileData as GradioFileData } from "@gradio/upload";
 import type { SelectData as GradioSelectData } from "@gradio/utils";
	import { clamp } from "$lib/utils";
	import { f7 } from "framework7-svelte";

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyGalleryNode | null = null;
 let nodeValue: Writable<GradioFileData[]> | null = null;
 let propsChanged: Writable<number> | null = null;
 let option: number | null = null;

 $: widget && setNodeValue(widget);

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyGalleryNode
         nodeValue = node.value;
         propsChanged = node.propsChanged;

         if ($nodeValue != null) {
             if (node.properties.index < 0 || node.properties.index >= $nodeValue.length) {
                 node.setProperty("index", clamp(node.properties.index, 0, $nodeValue))
             }
         }
     }
 };

 let style: Styles = {
     // grid_cols: [2],
     grid: [3],
     // object_fit: "cover",
 }
 let element: HTMLDivElement;

 let mobileLightbox = null;

 function showMobileLightbox(event: Event) {
     if (!f7)
         return

     if (mobileLightbox) {
         mobileLightbox.destroy();
         mobileLightbox = null;
     }

     const source = (event.target || event.srcElement) as HTMLImageElement;
     const galleryElem = source.closest<HTMLDivElement>("div.block")
     console.debug("[ImageViewer] showModal", event, source, galleryElem);
     if (!galleryElem || ImageViewer.all_gallery_buttons(galleryElem).length === 0) {
         console.error("No buttons found on gallery element!", galleryElem)
         return;
     }

     const allGalleryButtons = ImageViewer.all_gallery_buttons(galleryElem);
     const selectedSource = source.src

     const images = allGalleryButtons.map(button => {
         return {
             url: (button.children[0] as HTMLImageElement).src,
             caption: "Image"
         }
     })


     mobileLightbox = f7.photoBrowser.create({
         photos: images,
         thumbs: images.map(i => i.url),
         type: 'popup',
     });
     mobileLightbox.open()

     event.stopPropagation()
 }

 function setupImageForMobileLightbox(e: HTMLImageElement) {
     if (e.dataset.modded === "true")
         return;

     e.dataset.modded = "true";
     e.style.cursor = "pointer";
     e.style.userSelect = "none";

     var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

     // For Firefox, listening on click first switched to next image then shows the lightbox.
     // If you know how to fix this without switching to mousedown event, please.
     // For other browsers the event is click to make it possiblr to drag picture.
     var event = isFirefox ? 'mousedown' : 'click'

     e.addEventListener(event, (evt) => {
         evt.preventDefault()
         showMobileLightbox(evt)
     }, true);
 }

 function onSelect(e: CustomEvent<GradioSelectData>) {
     // Setup lightbox
     // Wait for gradio gallery to show the large preview image, if no timeout then
     // the event might fire too early

     const callback = isMobile ? setupImageForMobileLightbox
                    : ImageViewer.instance.setupImageForLightbox.bind(ImageViewer.instance)

     setTimeout(() => {
         const images = element.querySelectorAll<HTMLImageElement>('div.block div > img')
         if (images != null) {
             images.forEach(callback);
         }
         ImageViewer.instance.updateOnBackgroundChange();
     }, 200)

     // Update index
     node.setProperty("index", e.detail.index as number)
 }
</script>

{#if widget && node && nodeValue && $nodeValue != null}
    {#if widget.attrs.variant === "image"}
        <div class="wrapper comfy-image-widget" bind:this={element}>
            <Block variant="solid" padding={false}>
                {#if widget.attrs.title}
                    <BlockLabel
                        show_label={true}
                        Icon={Image}
                        label={widget.attrs.title || "Image"}
                    />
                {/if}
                {#if $nodeValue.length > 0}
                    <img src={$nodeValue[$nodeValue.length-1].data}/>
                {:else}
                    <Empty size="large" unpadded_box={true}><Image /></Empty>
                {/if}
            </Block>
        </div>
    {:else}
        <div class="wrapper comfy-gallery-widget gradio-gallery" bind:this={element}>
            <Block variant="solid" padding={false}>
                <div class="padding">
                    <Gallery
                        bind:value={$nodeValue}
                        label={widget.attrs.title}
                        show_label={widget.attrs.title !== ""}
                        {style}
                        root={""}
                        root_url={""}
                        on:select={onSelect}
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
 }

 .padding {
     height: 30rem;
 }

</style>
