<script lang="ts">
 import { Block, BlockTitle } from "@gradio/atoms";
 import { TextBox, Checkbox } from "@gradio/form";
 import { LGraphNode } from "@litegraph-ts/core"
 import layoutState, { type IDragItem, type WidgetLayout, ALL_ATTRIBUTES, type AttributesSpec } from "$lib/stores/layoutState"
 import { get } from "svelte/store"
 import type { ComfyWidgetNode } from "$lib/nodes";
 import ComfyNumberProperty from "./ComfyNumberProperty.svelte";
 import ComfyComboProperty from "./ComfyComboProperty.svelte";

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
 else if ($layoutState.currentSelectionNodes.length > 0) {
     target = null;
     node = $layoutState.currentSelectionNodes[0]
 }
 else {
     target = null
     node = null;
 }

 let targetType: string = "???"

 $: {
     if (node != null)
         targetType = node.type || "Node"
     else if (target)
         targetType = "Group"
     else
         targetType = ""
 }

 function validNodeProperty(spec: AttributesSpec, node: LGraphNode): boolean {
     if (spec.validNodeTypes) {
         return spec.validNodeTypes.indexOf(node.type) !== -1;
     }
     return spec.name in node.properties
 }

 function updateAttribute(entry: AttributesSpec, target: IDragItem, value: any) {
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

 function updateProperty(entry: AttributesSpec, value: any) {
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

 function getVar(node: LGraphNode, entry: AttributesSpec) {
     let value = node[entry.name]
     if (entry.serialize)
         value = entry.serialize(value)
     console.debug("[ComfyProperties] getVar", entry, value, node)
     return value
 }

 function updateVar(entry: any, value: any) {
     if (node) {
         const name = entry.name
         console.warn("updateProperty", name, value)

         if (entry.deserialize)
             value = entry.deserialize(value)

         console.debug("[ComfyProperties] updateVar", entry, value, name, node)
         node[name] = value;

         if ("propsChanged" in node) {
             const comfyNode = node as ComfyWidgetNode
             comfyNode.propsChanged.set(get(comfyNode.propsChanged) + 1)
         }
     }
 }

 function updateWorkflowAttribute(entry: AttributesSpec, value: any) {
    const name = entry.name
    console.warn("updateWorkflowAttribute", name, value)

    $layoutState.attrs[name] = value
    $layoutState = $layoutState
 }
</script>

<div class="props">
    <div class="top">
        <div class="target-name">
            <span>
                <span class="title">{target?.attrs?.title || node?.title || "Workflow"}<span>
                {#if targetType !== ""}
                    <span class="type">({targetType})</span>
                {/if}
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
                {#if spec.location === "widget" && target && spec.name in target.attrs}
                    <div class="props-entry">
                        {#if spec.type === "string"}
                            <TextBox
                                value={target.attrs[spec.name]}
                                on:change={(e) => updateAttribute(spec, target, e.detail)}
                                on:input={(e) => updateAttribute(spec, target, e.detail)}
                                label={spec.name}
                                max_lines={1}
                                />
                        {:else if spec.type === "boolean"}
                            <Checkbox
                                value={target.attrs[spec.name]}
                                on:change={(e) => updateAttribute(spec, target, e.detail)}
                                label={spec.name}
                                />
                        {:else if spec.type === "number"}
                            <ComfyNumberProperty
                                name={spec.name}
                                value={target.attrs[spec.name]}
                                step={1}
                                on:change={(e) => updateAttribute(spec, target, e.detail)}
                            />
                        {:else if spec.type === "enum"}
                            <ComfyComboProperty
                                name={spec.name}
                                value={target.attrs[spec.name]}
                                values={spec.values}
                                on:change={(e) => updateAttribute(spec, target, e.detail)}
                            />
                        {/if}
                    </div>
                {:else if node}
                    {#if spec.location === "nodeProps" && validNodeProperty(spec, node)}
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
                                    label={spec.name}
                                    on:change={(e) => updateProperty(spec, e.detail)}
                                    />
                            {:else if spec.type === "number"}
                                <ComfyNumberProperty
                                    name={spec.name}
                                    value={node.properties[spec.name]}
                                    step={1}
                                    on:change={(e) => updateProperty(spec, e.detail)}
                                />
                            {:else if spec.type === "enum"}
                                <ComfyComboProperty
                                    name={spec.name}
                                    value={node.properties[spec.name]}
                                    values={spec.values}
                                    on:change={(e) => updateProperty(spec, e.detail)}
                                />
                            {/if}
                        </div>
                    {:else if spec.location === "nodeVars" && spec.name in node}
                        <div class="props-entry">
                            {#if spec.type === "string"}
                                <TextBox
                                    value={getVar(node, spec)}
                                    on:change={(e) => updateVar(spec, e.detail)}
                                    on:input={(e) => updateVar(spec, e.detail)}
                                    label={spec.name}
                                    max_lines={1}
                                    />
                            {:else if spec.type === "boolean"}
                                <Checkbox
                                    value={getVar(node, spec)}
                                    on:change={(e) => updateVar(spec, e.detail)}
                                    label={spec.name}
                                    />
                            {:else if spec.type === "number"}
                                <ComfyNumberProperty
                                    name={spec.name}
                                    value={getVar(node, spec)}
                                    step={1}
                                    on:change={(e) => updateVar(spec, e.detail)}
                                />
                            {:else if spec.type === "enum"}
                                <ComfyComboProperty
                                    name={spec.name}
                                    value={getVar(node, spec)}
                                    values={spec.values}
                                    on:change={(e) => updateVar(spec, e.detail)}
                                />
                            {/if}
                        </div>
                    {/if}
                {:else if spec.location === "workflow" && spec.name in $layoutState.attrs}
                    <div class="props-entry">
                        {#if spec.type === "string"}
                            <TextBox
                                value={$layoutState.attrs[spec.name]}
                                on:change={(e) => updateWorkflowAttribute(spec, e.detail)}
                                on:input={(e) => updateWorkflowAttribute(spec, e.detail)}
                                label={spec.name}
                                max_lines={1}
                                />
                        {:else if spec.type === "boolean"}
                            <Checkbox
                                value={$layoutState.attrs[spec.name]}
                                on:change={(e) => updateWorkflowAttribute(spec, e.detail)}
                                label={spec.name}
                                />
                        {:else if spec.type === "number"}
                            <ComfyNumberProperty
                                name={spec.name}
                                value={$layoutState.attrs[spec.name]}
                                step={1}
                                on:change={(e) => updateWorkflowAttribute(spec, e.detail)}
                            />
                        {:else if spec.type === "enum"}
                            <ComfyComboProperty
                                name={spec.name}
                                value={$layoutState.attrs[spec.name]}
                                values={spec.values}
                                on:change={(e) => updateWorkflowAttribute(spec, e.detail)}
                            />
                        {/if}
                    </div>
                {/if}
            {/each}
        {/each}
    </div>
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

 .bottom {
     /* width: 100%;
        height: auto;
        position: absolute;
        bottom: 0;
        padding: 0.5em; */
 }
</style>
