<script lang="ts">
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { Block } from "@gradio/atoms";
 import ImageComparison from "$lib/components/ImageComparison.svelte";
 import { get, type Writable, writable } from "svelte/store";
 import { isDisabled } from "./utils"
 import type { SelectData } from "@gradio/utils";
	import type { ComfyImageCompareNode, ImageCompareData } from "$lib/nodes/ComfyWidgetNodes";
	import { convertFilenameToComfyURL } from "$lib/utils";
	import { TabItem, Tabs } from "@gradio/tabs";

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyImageCompareNode | null = null;
 let nodeValue: Writable<ImageCompareData> | null = null;
 let attrsChanged: Writable<number> | null = null;
 let leftUrl: string = ""
 let rightUrl: string = ""

 $: widget && setNodeValue(widget);

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyImageCompareNode
         nodeValue = node.value;
         attrsChanged = widget.attrsChanged;
     }
 };

 const urlPattern = /^((http|https|ftp):\/\/)/;

 $: updateUrls($nodeValue);

 function updateUrls(value: ImageCompareData) {
     leftUrl = ""
     rightUrl = ""
     console.warn("UPD", value)

     if (typeof value[0] === "string") {
         if (urlPattern.test(value[0]))
             leftUrl = value[0]
         else
             leftUrl = convertFilenameToComfyURL(value[0])
     }
     if (typeof value[1] === "string") {
         if (urlPattern.test(value[1]))
             rightUrl = value[1]
         else
             rightUrl = convertFilenameToComfyURL(value[1])
     }
 }
</script>

<div class="wrapper comfy-compare-widget">
    <Block>
        <Tabs elem_classes={["gradio-tabs"]}>
            <TabItem name="Slider">
                <ImageComparison>
                    {#if leftUrl && leftUrl != ""}
                        {@const props = { slot: "first" }}
                        <img {...props} alt="Left" src={leftUrl} />
                    {/if}
                    {#if rightUrl && leftUrl != ""}
                        {@const props = { slot: "second" }}
                        <img {...props} alt="Right" src={rightUrl} />
                    {/if}
                </ImageComparison>
            </TabItem>
        </Tabs>
    </Block>
</div>

<style lang="scss">
 .comfy-compare-widget {
     max-width: 40rem;
     img {
         width: 100%;
     }
 }
</style>
