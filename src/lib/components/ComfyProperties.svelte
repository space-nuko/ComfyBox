<script lang="ts">
 import { Block, BlockTitle } from "@gradio/atoms";
 import { TextBox, Checkbox } from "@gradio/form";
 import layoutState, { ALL_ATTRIBUTES } from "$lib/stores/layoutState"
 import { get } from "svelte/store"

 let target: IDragItem | null = null;
 let node: LGraphNode | null = null;

 $: if ($layoutState.currentSelection.length > 0) {
     const targetId = $layoutState.currentSelection.slice(-1)
     target = $layoutState.allItems[targetId].dragItem
     if (target.type === "widget") {
         node = target.node
     }
     else {
         node = null;
     }
 }
 else {
     target = null
     node = null;
 }

 const _entries = [
     { name: "title" },
     { name: "showTitle" },
     { name: "direction" },
     { name: "classes" },
 ]

 function getTargetType(): string {
     if (node)
         return "Node"
     else if (target?.type === "container")
         "Group"
     return "???"
 }

 function updateAttribute(entry: any, value: any) {
     if (target) {
         const name = entry.name
         console.warn("updateAttribute", name, value)

         target.attrs[name] = value
         target.attrsChanged.set(!get(target.attrsChanged))

         if (node) {
             node.propsChanged.set(!get(node.propsChanged))
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
                    <span class="type">({getTargetType()})</span>
                </span>
            </div>
        </div>
        <div class="props-entries">
            {#each ALL_ATTRIBUTES as category(category.categoryName)}
                <div class="category-name">
                    <span>
                        <span class="title">{target.attrs.title}</span>
                    </span>
                </div>
                {#each category.specs as spec(spec.name)}
                    {@const has = spec.name in target.attrs}
                    {#if has}
                        <div class="props-entry">
                            {#if spec.type === "string"}
                                <TextBox
                                    value={target.attrs[spec.name]}
                                    on:change={(e) => updateAttribute(spec, e.detail)}
                                    label={spec.name}
                                    max_lines={1}
                                    />
                            {:else if spec.type === "boolean"}
                                <Checkbox
                                    value={target.attrs[spec.name]}
                                    on:change={(e) => updateAttribute(spec, e.detail)}
                                    label={spec.name}
                                    />
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
                    {/if}
                {/each}
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
 .props-entry {
     padding: 0.5rem 0.5rem 0 0.5rem;
     display: flex;
     flex-direction: row;
 }

 .target-name {
     border-color: var(--neutral-400);
     background: var(--neutral-300);

     .title {
         font-weight: bold;
     }
 }

 .category-name {
     border-color: var(--neutral-300);
     background: var(--neutral-200);
 }

 .target-name, .category-name {
     border-width: var(--block-border-width);
     padding: 0.4rem 1.0rem;

     .type {
         color: var(--neutral-500);
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
