<script lang="ts">
 import { Block, BlockTitle } from "@gradio/atoms";
 import { TextBox, Checkbox } from "@gradio/form";
 import { LGraphNode } from "@litegraph-ts/core"
 import layoutState, { type IDragItem, type WidgetLayout, ALL_ATTRIBUTES, type AttributesSpec } from "$lib/stores/layoutState"
 import uiState from "$lib/stores/uiState"
 import { get, type Writable, writable } from "svelte/store"
 import type { ComfyWidgetNode } from "$lib/nodes";
 import ComfyNumberProperty from "./ComfyNumberProperty.svelte";
 import ComfyComboProperty from "./ComfyComboProperty.svelte";

 let target: IDragItem | null = null;
 let node: LGraphNode | null = null;
 let attrsChanged: Writable<boolean> | null = null;
 let refreshPanel: Writable<number> = writable(0);

 $: if ($layoutState.currentSelection.length > 0) {
     const targetId = $layoutState.currentSelection.slice(-1)[0]
     target = $layoutState.allItems[targetId].dragItem
     attrsChanged = target.attrsChanged;
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
     attrsChanged = null;
 }
 else {
     target = null
     node = null;
     attrsChanged = null;
 }

 $: if (target) {
     for (const cat of Object.values(ALL_ATTRIBUTES)) {
         for (const spec of Object.values(cat.specs)) {
             if (spec.location === "widget" && target.attrs[spec.name] == null) {
                 if (!spec.editable)
                     continue;

                 if (spec.canShow && !spec.canShow(target))
                     continue;

                 console.warn("Set default widget attr", spec.name, spec.defaultValue, target)
                 let value = spec.defaultValue;
                 target.attrs[spec.name] = value;
                 if (spec.refreshPanelOnChange)
                     $refreshPanel += 1;
             }
         }
     }
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

 function validNodeProperty(spec: AttributesSpec, node: LGraphNode | null): boolean {
     if (node == null || spec.location !== "nodeProps")
         return false;

     if (spec.canShow && !spec.canShow(node))
         return false;

     if (spec.validNodeTypes) {
         return spec.validNodeTypes.indexOf(node.type) !== -1;
     }
     return spec.name in node.properties
 }

 function validNodeVar(spec: AttributesSpec, node: LGraphNode | null): boolean {
     if (node == null || spec.location !== "nodeVars")
         return false;

     if (spec.canShow && !spec.canShow(node))
         return false;

     if (spec.validNodeTypes) {
         return spec.validNodeTypes.indexOf(node.type) !== -1;
     }
     return spec.name in node
 }

 function validWidgetAttribute(spec: AttributesSpec, widget: IDragItem | null): boolean {
     if (widget == null || spec.location !== "widget")
         return false;
     if (spec.canShow)
         return spec.canShow(widget);

     return spec.name in widget.attrs
 }

 function validWorkflowAttribute(spec: AttributesSpec): boolean {
     if (spec.location !== "workflow")
         return false;

     return spec.name in $layoutState.attrs
 }

 function getAttribute(target: IDragItem, spec: AttributesSpec): any {
     let value = target.attrs[spec.name]
     if (value == null)
         value = spec.defaultValue
     else if (spec.serialize)
         value = spec.serialize(value)
     console.debug("[ComfyProperties] getAttribute", spec.name, value, target, spec)
     return value
 }

 function updateAttribute(spec: AttributesSpec, target: IDragItem | null, value: any) {
     if (target == null || !spec.editable)
         return;

     const name = spec.name

     console.debug("[ComfyProperties] updateAttribute", spec, value, name, node)
     if (spec.deserialize)
         value = spec.deserialize(value)

     target.attrs[name] = value
     target.attrsChanged.set(!get(target.attrsChanged))

     if (node && "propsChanged" in node) {
         const comfyNode = node as ComfyWidgetNode
         comfyNode.propsChanged.set(get(comfyNode.propsChanged) + 1)
     }

     console.warn(spec)
     if (spec.refreshPanelOnChange) {
         console.error("A! refresh")
         $refreshPanel += 1;
     }
 }

 function updateProperty(spec: AttributesSpec, value: any) {
     if (node == null || !spec.editable)
         return

     const name = spec.name
     console.warn("updateProperty", name, value)

     node.properties[name] = value;

     if ("propsChanged" in node) {
         const comfyNode = node as ComfyWidgetNode
         comfyNode.propsChanged.set(get(comfyNode.propsChanged) + 1)
     }

     if (spec.refreshPanelOnChange)
         $refreshPanel += 1;
 }

 function getVar(node: LGraphNode, spec: AttributesSpec) {
     let value = node[spec.name]
     if (value == null)
         value = spec.defaultValue
     else if (spec.serialize)
         value = spec.serialize(value)
     console.debug("[ComfyProperties] getVar", spec, value, node)
     return value
 }

 function updateVar(spec: AttributesSpec, value: any) {
     if (node == null || !spec.editable)
         return;

     const name = spec.name

     console.debug("[ComfyProperties] updateVar", spec, value, name, node)
     if (spec.deserialize)
         value = spec.deserialize(value)

     node[name] = value;

     if ("propsChanged" in node) {
         const comfyNode = node as ComfyWidgetNode
         comfyNode.propsChanged.set(get(comfyNode.propsChanged) + 1)
     }

     if (spec.refreshPanelOnChange)
         $refreshPanel += 1;
 }

 function updateWorkflowAttribute(spec: AttributesSpec, value: any) {
     if (!spec.editable)
         return;

     const name = spec.name
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
            </span>
        </div>
    </div>
    <div class="props-entries">
        {#key $refreshPanel}
            {#each ALL_ATTRIBUTES as category(category.categoryName)}
                <div class="category-name">
                    <span>
                        <span class="title">{category.categoryName}</span>
                    </span>
                </div>
                {#each category.specs as spec(spec.id)}
                    {#if validWidgetAttribute(spec, target)}
                        <div class="props-entry">
                            {#if spec.type === "string"}
                                <TextBox
                                    value={getAttribute(target, spec)}
                                    on:change={(e) => updateAttribute(spec, target, e.detail)}
                                    on:input={(e) => updateAttribute(spec, target, e.detail)}
                                    disabled={!$uiState.uiUnlocked || !spec.editable}
                                    label={spec.name}
                                    max_lines={1}
                                    />
                            {:else if spec.type === "boolean"}
                                    <Checkbox
                                        value={getAttribute(target, spec)}
                                        on:change={(e) => updateAttribute(spec, target, e.detail)}
                                        disabled={!$uiState.uiUnlocked || !spec.editable}
                                        label={spec.name}
                                        />
                            {:else if spec.type === "number"}
                                        <ComfyNumberProperty
                                            name={spec.name}
                                            value={getAttribute(target, spec)}
                                            step={1}
                                            disabled={!$uiState.uiUnlocked || !spec.editable}
                                            on:change={(e) => updateAttribute(spec, target, e.detail)}
                                            />
                            {:else if spec.type === "enum"}
                                            <ComfyComboProperty
                                                name={spec.name}
                                                value={getAttribute(target, spec)}
                                                values={spec.values}
                                                disabled={!$uiState.uiUnlocked || !spec.editable}
                                                on:change={(e) => updateAttribute(spec, target, e.detail)}
                                                />
                            {/if}
                        </div>
                    {:else if node}
                        {#if validNodeProperty(spec, node)}
                            <div class="props-entry">
                                {#if spec.type === "string"}
                                    <TextBox
                                        value={node.properties[spec.name] || spec.defaultValue}
                                        on:change={(e) => updateProperty(spec, e.detail)}
                                        on:input={(e) => updateProperty(spec, e.detail)}
                                        label={spec.name}
                                        disabled={!$uiState.uiUnlocked || !spec.editable}
                                        max_lines={1}
                                        />
                                {:else if spec.type === "boolean"}
                                        <Checkbox
                                            value={node.properties[spec.name] || spec.defaultValue}
                                            label={spec.name}
                                            disabled={!$uiState.uiUnlocked || !spec.editable}
                                            on:change={(e) => updateProperty(spec, e.detail)}
                                            />
                                {:else if spec.type === "number"}
                                            <ComfyNumberProperty
                                                name={spec.name}
                                                value={node.properties[spec.name] || spec.defaultValue}
                                                step={1}
                                                disabled={!$uiState.uiUnlocked || !spec.editable}
                                                on:change={(e) => updateProperty(spec, e.detail)}
                                                />
                                {:else if spec.type === "enum"}
                                                <ComfyComboProperty
                                                    name={spec.name}
                                                    value={node.properties[spec.name] || spec.defaultValue}
                                                    values={spec.values}
                                                    disabled={!$uiState.uiUnlocked || !spec.editable}
                                                    on:change={(e) => updateProperty(spec, e.detail)}
                                                    />
                                {/if}
                            </div>
                        {:else if validNodeVar(spec, node)}
                            <div class="props-entry">
                                {#if spec.type === "string"}
                                    <TextBox
                                        value={getVar(node, spec)}
                                        on:change={(e) => updateVar(spec, e.detail)}
                                        on:input={(e) => updateVar(spec, e.detail)}
                                        label={spec.name}
                                        disabled={!$uiState.uiUnlocked || !spec.editable}
                                        max_lines={1}
                                        />
                                {:else if spec.type === "boolean"}
                                        <Checkbox
                                            value={getVar(node, spec)}
                                            on:change={(e) => updateVar(spec, e.detail)}
                                            disabled={!$uiState.uiUnlocked || !spec.editable}
                                            label={spec.name}
                                            />
                                {:else if spec.type === "number"}
                                            <ComfyNumberProperty
                                                name={spec.name}
                                                value={getVar(node, spec)}
                                                step={1}
                                                disabled={!$uiState.uiUnlocked || !spec.editable}
                                                on:change={(e) => updateVar(spec, e.detail)}
                                                />
                                {:else if spec.type === "enum"}
                                                <ComfyComboProperty
                                                    name={spec.name}
                                                    value={getVar(node, spec)}
                                                    values={spec.values}
                                                    disabled={!$uiState.uiUnlocked || !spec.editable}
                                                    on:change={(e) => updateVar(spec, e.detail)}
                                                    />
                                {/if}
                            </div>
                        {/if}
                    {:else if !node && !target && validWorkflowAttribute(spec)}
                        <div class="props-entry">
                            {#if spec.type === "string"}
                                <TextBox
                                    value={$layoutState.attrs[spec.name] || spec.defaultValue}
                                    on:change={(e) => updateWorkflowAttribute(spec, e.detail)}
                                    on:input={(e) => updateWorkflowAttribute(spec, e.detail)}
                                    label={spec.name}
                                    disabled={!$uiState.uiUnlocked || !spec.editable}
                                    max_lines={1}
                                    />
                            {:else if spec.type === "boolean"}
                                    <Checkbox
                                        value={$layoutState.attrs[spec.name] || spec.defaultValue}
                                        on:change={(e) => updateWorkflowAttribute(spec, e.detail)}
                                        disabled={!$uiState.uiUnlocked || !spec.editable}
                                        label={spec.name}
                                        />
                            {:else if spec.type === "number"}
                                        <ComfyNumberProperty
                                            name={spec.name}
                                            value={$layoutState.attrs[spec.name] || spec.defaultValue}
                                            step={1}
                                            disabled={!$uiState.uiUnlocked || !spec.editable}
                                            on:change={(e) => updateWorkflowAttribute(spec, e.detail)}
                                            />
                            {:else if spec.type === "enum"}
                                            <ComfyComboProperty
                                                name={spec.name}
                                                value={$layoutState.attrs[spec.name] || spec.defaultValue}
                                                values={spec.values}
                                                disabled={!$uiState.uiUnlocked || !spec.editable}
                                                on:change={(e) => updateWorkflowAttribute(spec, e.detail)}
                                                />
                            {/if}
                        </div>
                    {/if}
                {/each}
            {/each}
        {/key}
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

         .type {
             padding-left: 0.25rem;
             font-weight: normal;
         }
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
