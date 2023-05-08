<script lang="ts">
 import type { ComfyRadioNode } from "$lib/nodes/ComfyWidgetNodes";
 import { type WidgetLayout } from "$lib/stores/layoutState";
 import { Block } from "@gradio/atoms";
 import { Radio } from "@gradio/form";
 import { get, type Writable, writable } from "svelte/store";
 import { isDisabled } from "./utils"
 import type { SelectData } from "@gradio/utils";
	import { clamp } from "$lib/utils";

 export let widget: WidgetLayout | null = null;
 export let isMobile: boolean = false;
 let node: ComfyRadioNode | null = null;
 let nodeValue: Writable<string> | null = null;
 let propsChanged: Writable<number> | null = null;
 let attrsChanged: Writable<number> | null = null;

 $: widget && setNodeValue(widget);

 function setNodeValue(widget: WidgetLayout) {
     if (widget) {
         node = widget.node as ComfyRadioNode
         nodeValue = node.value;
         attrsChanged = widget.attrsChanged;
     }
 };

 $: node && $propsChanged && clampIndex();

 function clampIndex() {
     node.index = clamp(node.index, 0, node.properties.choices?.length || 0)
 }

 function onSelect(e: CustomEvent<SelectData>) {
     $nodeValue = e.detail.value
     node.setValue($nodeValue)
     node.index = e.detail.index as number
     navigator.vibrate(20)
 }
</script>

<div class="wrapper gradio-checkbox">
    <div class="inner">
        {#key $propsChanged}
            {#key $attrsChanged}
                {#if node !== null && node.properties.choices}
                    <Block>
                        <Radio
                            elem_id="radio"
                            choices={node.properties.choices}
                            disabled={isDisabled(widget)}
                            label={widget.attrs.title}
                            value={$nodeValue}
                            on:select={onSelect}
                        />
                    </Block>
                {/if}
            {/key}
        {/key}
    </div>
</div>

<style lang="scss">
</style>
