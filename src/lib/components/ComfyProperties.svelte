<script lang="ts">
 import { Block, BlockTitle } from "@gradio/atoms";
 import { TextBox, Checkbox } from "@gradio/form";
 import { LGraphNode } from "@litegraph-ts/core"
 import layoutState, { type IDragItem, type WidgetLayout, ALL_ATTRIBUTES } from "$lib/stores/layoutState"
 import { get } from "svelte/store"
	import type ComfyGraphNode from "$lib/nodes/ComfyGraphNode";
	import type { ComfyWidgetNode } from "$lib/nodes";

 let target: IDragItem | null = null;
 let node: LGraphNode | null = null;

 $: if ($layoutState.currentSelection.length > 0) {
     const targetId = $layoutState.currentSelection.slice(-1)[0]
     target = $layoutState.allItems[targetId].dragItem
     if (target.type === "widget") {
         node = (target as WidgetLayout).node
     }
     else {
         node = null;
     }
 }
 else {
     target = null
     node = null;
 }

 let targetType: string = "???"

 $: {
     if (node != null)
         targetType = node.type || "Widget"
     else if (target)
         targetType = "group"
     else
         targetType = "???"
 }

 function updateAttribute(entry: any, value: any) {
     if (target) {
         const name = entry.name
         console.warn("updateAttribute", name, value)

         target.attrs[name] = value
         target.attrsChanged.set(!get(target.attrsChanged))

         if (node && "propsChanged" in node) {
             const comfyNode = node as ComfyWidgetNode
             comfyNode.propsChanged.set(get(comfyNode.propsChanged) + 1)
         }
     }
 }

 function updateProperty(entry: any, value: any) {
     if (node) {
         const name = entry.name
         console.warn("updateProperty", name, value)

         node.properties[name] = value;

         if ("propsChanged" in node) {
             const comfyNode = node as ComfyWidgetNode
             comfyNode.propsChanged.set(get(comfyNode.propsChanged) + 1)
         }
     }
 }
</script>

<div class="props">
    {#if target}
        <div class="top">
            <div class="target-name">
                <span>
                    <span class="title">{target.attrs.title}</span>
                    <span class="type">({targetType})</span>
                </span>
            </div>
        </div>
        <div class="props-entries">
            {#each ALL_ATTRIBUTES as category(category.categoryName)}
                <div class="category-name">
                    <span>
                        <span class="title">{category.categoryName}</span>
                    </span>
                </div>
                {#each category.specs as spec(spec.name)}
                    {#if spec.location === "widget" && spec.name in target.attrs}
                        <div class="props-entry">
                            {#if spec.type === "string"}
                                <TextBox
                                    value={target.attrs[spec.name]}
                                    on:change={(e) => updateAttribute(spec, e.detail)}
                                    on:input={(e) => updateAttribute(spec, e.detail)}
                                    label={spec.name}
                                    max_lines={1}
                                    />
                            {:else if spec.type === "boolean"}
                                <Checkbox
                                    value={target.attrs[spec.name]}
                                    on:change={(e) => updateAttribute(spec, e.detail)}
                                    label={spec.name}
                                    />
                            {:else if spec.type === "number"}
                                <label class="number-wrapper">
                                    <BlockTitle>{spec.name}</BlockTitle>
                                    <div class="number">
                                        <input
                                            type="number"
                                            value={target.attrs[spec.name]}
                                            step={1}
                                            on:change={(e) => updateAttribute(spec, e.currentTarget.valueAsNumber)}
                                            on:input={(e) => updateAttribute(spec, e.currentTarget.valueAsNumber)}
                                        />
                                    </div>
                                </label>
                            {:else if spec.type === "enum"}
                                <label class="select-wrapper">
                                    <BlockTitle>{spec.name}</BlockTitle>
                                    <div class="select">
                                        <select
                                            value={target.attrs[spec.name]}
                                            on:change={(e) => updateAttribute(spec, e.currentTarget.options[e.currentTarget.selectedIndex].value)}>
                                            {#each spec.values as value}
                                                <option value={value}>
                                                    {value}
                                                </option>
                                            {/each}
                                        </select>
                                    </div>
                                </label>
                            {/if}
                        </div>
                    {:else if node}
                        {#if spec.location === "nodeProps" && spec.name in node.properties}
                            <div class="props-entry">
                                {#if spec.type === "string"}
                                    <TextBox
                                        value={node.properties[spec.name]}
                                        on:change={(e) => updateProperty(spec, e.detail)}
                                        on:input={(e) => updateProperty(spec, e.detail)}
                                        label={spec.name}
                                        max_lines={1}
                                        />
                                {:else if spec.type === "boolean"}
                                    <Checkbox
                                        value={node.properties[spec.name]}
                                        on:change={(e) => updateProperty(spec, e.detail)}
                                        label={spec.name}
                                        />
                                {:else if spec.type === "number"}
                                    <label class="number-wrapper">
                                        <BlockTitle>{spec.name}</BlockTitle>
                                        <div class="number">
                                            <input
                                                type="number"
                                                value={node.properties[spec.name]}
                                                step={1}
                                                on:change={(e) => updateProperty(spec, e.currentTarget.valueAsNumber)}
                                                on:input={(e) => updateProperty(spec, e.currentTarget.valueAsNumber)}
                                            />
                                        </div>
                                    </label>
                                {:else if spec.type === "enum"}
                                    <label class="select-wrapper">
                                        <BlockTitle>{spec.name}</BlockTitle>
                                        <div class="select">
                                            <select
                                                value={node.properties[spec.name]}
                                                on:change={(e) => updateProperty(spec, e.currentTarget.options[e.currentTarget.selectedIndex].value)}>
                                                {#each spec.values as value}
                                                    <option value={value}>
                                                        {value}
                                                    </option>
                                                {/each}
                                            </select>
                                        </div>
                                    </label>
                                {/if}
                            </div>
                        {/if}
                    {/if}
                {/each}
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
 .props-entry {
     padding-bottom: 0.5rem;
     padding-left: 0.5rem;
     padding-right: 0.5rem;
     display: flex;
     flex-direction: row;
 }

 .target-name {
     border-color: var(--neutral-400);
     background: var(--neutral-300);
     padding: 0.8rem 1.0rem;

     .title {
         font-weight: bold;
     }
 }

 .category-name {
     padding: 0.4rem 1.0rem;
     border-color: var(--neutral-300);
     background: var(--neutral-200);
 }

 .target-name, .category-name {
     border-width: var(--block-border-width);

     .type {
         color: var(--neutral-500);
     }
 }

 .number-wrapper {
     width: 100%;

     .number {
         width: 100%;

         input {
             width: 100%
         }
     }
 }

 .select-wrapper {
     width: 100%;

     .select {
         width: 100%;

         select {
             width: 100%
         }
     }
 }

 .select-title {
     padding: 0.2rem;
 }

 .bottom {
     /* width: 100%;
        height: auto;
        position: absolute;
        bottom: 0;
        padding: 0.5em; */
 }
</style>
