<script lang="ts">
 import type { ComfyCheckboxNode } from "$lib/nodes/ComfyWidgetNodes";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { Block } from "@gradio/atoms";
 import { Checkbox } from "@gradio/form";
 import { get, type Writable, writable } from "svelte/store";
 import { isDisabled } from "./utils"

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyCheckboxNode | null = null;
 let nodeValue: Writable<boolean> | null = null;
 let attrsChanged: Writable<boolean> | null = null;

 $: widget && setNodeValue(widget);

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyCheckboxNode
         nodeValue = node.value;
         attrsChanged = widget.attrsChanged;
     }
 };

 function onSelect() {
     navigator.vibrate(20)
 }
</script>

<div class="wrapper gradio-checkbox">
    <div class="inner">
        {#key $attrsChanged}
            {#if node !== null}
                <Block>
                    <Checkbox
                        disabled={isDisabled(widget)}
                        label={widget.attrs.title}
                        bind:value={$nodeValue}
                        on:select={onSelect}
                    />
                </Block>
            {/if}
        {/key}
    </div>
</div>

<style lang="scss">
 .wrapper {
     display: flex;
     flex-direction: row;
     align-items: flex-end;
     height: 100%;

     > .inner {
         padding: 2px;
         width: 100%;
         display: flex;
         flex-direction: row;
         height: min-content;

         :global(> label) {
             height: 100%;
         }
     }
 }
</style>
