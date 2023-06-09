<script lang="ts">
 import { Block, BlockTitle } from "@gradio/atoms";
 import { TextBox, Checkbox } from "@gradio/form";
 import { LGraphNode } from "@litegraph-ts/core"
 import { type IDragItem, type WidgetLayout, ALL_ATTRIBUTES, type AttributesSpec, type WritableLayoutStateStore } from "$lib/stores/layoutStates"
 import uiState from "$lib/stores/uiState"
 import interfaceState from "$lib/stores/interfaceState"
 import workflowState from "$lib/stores/workflowState"
 import layoutStates from "$lib/stores/layoutStates"
 import selectionState from "$lib/stores/selectionState"
 import { get, type Writable, writable } from "svelte/store"
 import ComfyNumberProperty from "./ComfyNumberProperty.svelte";
 import ComfyComboProperty from "./ComfyComboProperty.svelte";
 import type { ComfyWidgetNode } from "$lib/nodes/widgets";
 import type { ComfyBoxWorkflow } from "$lib/stores/workflowState";
 import { Diagram3 } from "svelte-bootstrap-icons";
	import { getContext } from "svelte";
	import { WORKFLOWS_VIEW } from "./ComfyBoxWorkflowsView.svelte";

 export let app: ComfyApp
 export let workflow: ComfyBoxWorkflow | null;

 let layoutState: WritableLayoutStateStore | null = null

 $: layoutState = workflow?.layout

 let target: IDragItem | null = null;
 let node: LGraphNode | null = null;

 $: {
     if ($interfaceState.isJumpingToNode) {
         $interfaceState.isJumpingToNode = false;
     }
     {
         if (layoutState) {
             if ($selectionState.currentSelection.length > 0) {
                 node = null;
                 const targetId = $selectionState.currentSelection.slice(-1)[0]
                 const entry = $layoutState.allItems[targetId]
                 if (entry != null) {
                     target = entry.dragItem
                     if (target.type === "widget") {
                         node = (target as WidgetLayout).node
                     }
                 }
             }
             else if ($selectionState.currentSelectionNodes.length > 0) {
                 target = null;
                 node = $selectionState.currentSelectionNodes[0]

                 if (node != null && layoutState != null) {
                     const dragItem = layoutState.findLayoutForNode(node.id);
                     if (dragItem != null) {
                         target = dragItem;
                     }
                 }
             }
             else {
                 target = null
                 node = null;
             }
         }
         else {
             target = null;
             node = null;
         }
     }
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
                     doRefreshPanel();
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

     if (spec.validNodeTypes) {
         if (widget.type === "widget") {
             const node = (widget as WidgetLayout).node
             if (!node)
                 return false;
             return spec.validNodeTypes.indexOf(node.type) !== -1;
         }
         else if (widget.type === "container") {
             return false;
         }
     }

     return spec.name in widget.attrs
 }

 function validWorkflowAttribute(spec: AttributesSpec): boolean {
     if (spec.location !== "workflow")
         return false;

     if (workflow == null)
         return false;

     return spec.name in workflow.attrs
 }

 function getAttribute(target: IDragItem, spec: AttributesSpec): any {
     let value = target.attrs[spec.name]
     if (value == null)
         value = spec.defaultValue
     else if (spec.serialize)
         value = spec.serialize(value)
     // console.debug("[ComfyProperties] getAttribute", spec.name, value, target, spec)
     return value
 }

 function updateAttribute(spec: AttributesSpec, target: IDragItem | null, value: any) {
     if (target == null || !spec.editable)
         return;

     const name = spec.name

     // console.debug("[ComfyProperties] updateAttribute", spec, value, name, node)
     if (spec.deserialize)
         value = spec.deserialize(value)

     const prevValue = target.attrs[name]
     target.attrs[name] = value
     target.attrsChanged.set(get(target.attrsChanged) + 1)

     if (spec.onChanged)
         spec.onChanged(target, value, prevValue)

     if (node && "propsChanged" in node) {
         const comfyNode = node as ComfyWidgetNode
         comfyNode.propsChanged.set(get(comfyNode.propsChanged) + 1)
     }

     console.warn(spec)
     if (spec.refreshPanelOnChange) {
         doRefreshPanel()
     }

     workflow.notifyModified()
 }

 function getProperty(node: LGraphNode, spec: AttributesSpec) {
     let value = node.properties[spec.name]
     if (value == null)
         value = spec.defaultValue
     else if (spec.serialize)
         value = spec.serialize(value)
     // console.debug("[ComfyProperties] getProperty", spec, value, node)
     return value
 }

 function updateProperty(spec: AttributesSpec, value: any) {
     if (node == null || !spec.editable)
         return

     const name = spec.name
     // console.warn("[ComfyProperties] updateProperty", name, value)

     if (spec.deserialize)
         value = spec.deserialize(value)

     const prevValue = node.properties[name]
     node.properties[name] = value;

     if (spec.onChanged)
         spec.onChanged(node, value, prevValue)

     if ("propsChanged" in node) {
         const comfyNode = node as ComfyWidgetNode
         comfyNode.notifyPropsChanged();
     }

     if (spec.refreshPanelOnChange)
         doRefreshPanel()

     workflow.notifyModified()
 }

 function getVar(node: LGraphNode, spec: AttributesSpec) {
     let value = node[spec.name]
     if (value == null)
         value = spec.defaultValue
     else if (spec.serialize)
         value = spec.serialize(value)
     // console.debug("[ComfyProperties] getVar", spec, value, node)
     return value
 }

 function updateVar(spec: AttributesSpec, value: any) {
     if (node == null || !spec.editable)
         return;

     const name = spec.name

     // console.debug("[ComfyProperties] updateVar", spec, value, name, node)
     if (spec.deserialize)
         value = spec.deserialize(value)

     const prevValue = node[name]
     node[name] = value;

     if (spec.onChanged)
         spec.onChanged(node, value, prevValue)

     if ("propsChanged" in node) {
         const comfyNode = node as ComfyWidgetNode
         comfyNode.propsChanged.set(get(comfyNode.propsChanged) + 1)
     }

     if (spec.refreshPanelOnChange) {
         doRefreshPanel()
     }

     workflow.notifyModified();
 }

 function getWorkflowAttribute(spec: AttributesSpec): any {
     if (workflow == null)
         throw new Error("Active workflow is null!");

     let value = workflow.attrs[spec.name]
     if (value == null)
         value = spec.defaultValue
     else if (spec.serialize)
         value = spec.serialize(value)
     // console.debug("[ComfyProperties] getWorkflowAttribute", spec.name, value, spec, $layoutState.attrs[spec.name])
     return value
 }

 function updateWorkflowAttribute(spec: AttributesSpec, value: any) {
     if (!spec.editable)
         return;

     if (workflow == null)
         throw new Error("Active workflow is null!");

     const name = spec.name
     // console.warn("[ComfyProperties] updateWorkflowAttribute", name, value)

     const prevValue = value
     workflow.attrs[name] = value
     $workflowState = $workflowState;

     if (spec.onChanged)
         spec.onChanged($layoutState, value, prevValue)

     if (spec.refreshPanelOnChange)
         doRefreshPanel()

     workflow.notifyModified();
 }

 function doRefreshPanel() {
     console.warn("[ComfyProperties] doRefreshPanel")
     $layoutStates.refreshPropsPanel += 1;
 }

 const workflowsViewContext = getContext(WORKFLOWS_VIEW) as any;

 async function jumpToNode() {
     if (!workflowsViewContext) {
         // strange svelte bug caused by HMR
         // https://github.com/sveltejs/svelte/issues/8655
         console.error("[ComfyProperties] No workflows view context!")
         return;
     }

     if (app?.lCanvas == null || workflow == null || node == null)
         return;

     const activeWorkflow = workflowState.setActiveWorkflow(app.lCanvas, workflow.id);

     if (activeWorkflow == null || !activeWorkflow.graph.getNodeByIdRecursive(node.id))
         return;

     await workflowsViewContext.openGraph(() => {
         app.lCanvas.jumpToNode(node);
     })
 }
</script>

<div class="props">
    <div class="props-scroller">
        <div class="top">
            <div class="target-name">
                <div class="target-title-wrapper">
                    <span class="title">{target?.attrs?.title || node?.title || "Workflow"}</span>
                    {#if targetType !== ""}
                        <span class="type">({targetType})</span>
                    {/if}
                </div>
                {#if node != null}
                    <div class="target-name-button">
                        <button class="mode-button ternary"
                                disabled={node == null}
                                title="View in Graph"
                                on:click={jumpToNode}
                        >
                            <Diagram3 width="100%" height="100%" />
                        </button>
                    </div>
                {/if}
            </div>
        </div>
        <div class="props-entries">
            {#if workflow != null && layoutState != null}
                {#key workflow.id}
                    {#key $layoutStates.refreshPropsPanel}
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
                                                max_lines={spec.multiline ? 5 : 1}
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
                                                        step={spec.step || 1}
                                                        min={spec.min || -1024}
                                                        max={spec.max || 1024}
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
                                                    value={getProperty(node, spec)}
                                                    on:change={(e) => updateProperty(spec, e.detail)}
                                                    on:input={(e) => updateProperty(spec, e.detail)}
                                                    label={spec.name}
                                                    disabled={!$uiState.uiUnlocked || !spec.editable}
                                                    max_lines={spec.multiline ? 5 : 1}
                                                    />
                                            {:else if spec.type === "boolean"}
                                                    <Checkbox
                                                        value={getProperty(node, spec)}
                                                        label={spec.name}
                                                        disabled={!$uiState.uiUnlocked || !spec.editable}
                                                        on:change={(e) => updateProperty(spec, e.detail)}
                                                        />
                                            {:else if spec.type === "number"}
                                                        <ComfyNumberProperty
                                                            name={spec.name}
                                                            value={getProperty(node, spec)}
                                                            step={spec.step || 1}
                                                            min={spec.min || -1024}
                                                            max={spec.max || 1024}
                                                            disabled={!$uiState.uiUnlocked || !spec.editable}
                                                            on:change={(e) => updateProperty(spec, e.detail)}
                                                            />
                                            {:else if spec.type === "enum"}
                                                            <ComfyComboProperty
                                                                name={spec.name}
                                                                value={getProperty(node, spec)}
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
                                                    max_lines={spec.multiline ? 5 : 1}
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
                                                            step={spec.step || 1}
                                                            min={spec.min || -1024}
                                                            max={spec.max || 1024}
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
                                                value={getWorkflowAttribute(spec)}
                                                on:change={(e) => updateWorkflowAttribute(spec, e.detail)}
                                                on:input={(e) => updateWorkflowAttribute(spec, e.detail)}
                                                label={spec.name}
                                                disabled={!$uiState.uiUnlocked || !spec.editable}
                                                max_lines={spec.multiline ? 5 : 1}
                                                />
                                        {:else if spec.type === "boolean"}
                                                <Checkbox
                                                    value={getWorkflowAttribute(spec)}
                                                    on:change={(e) => updateWorkflowAttribute(spec, e.detail)}
                                                    disabled={!$uiState.uiUnlocked || !spec.editable}
                                                    label={spec.name}
                                                    />
                                        {:else if spec.type === "number"}
                                                    <ComfyNumberProperty
                                                        name={spec.name}
                                                        value={getWorkflowAttribute(spec)}
                                                        step={spec.step || 1}
                                                        min={spec.min || -1024}
                                                        max={spec.max || 1024}
                                                        disabled={!$uiState.uiUnlocked || !spec.editable}
                                                        on:change={(e) => updateWorkflowAttribute(spec, e.detail)}
                                                        />
                                        {:else if spec.type === "enum"}
                                                        <ComfyComboProperty
                                                            name={spec.name}
                                                            value={getWorkflowAttribute(spec)}
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
                {/key}
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
 $bottom-bar-height: 2.5rem;

 .props {
     width: 100%;
     height: 100%;
 }

 .props-scroller {
     width: 100%;
     height: calc(100% - $bottom-bar-height);
     overflow-x: hidden;
     overflow-y: auto;
 }

 .props-entry {
     padding-bottom: 0.5rem;
     padding-left: 0.5rem;
     padding-right: 0.5rem;
     display: flex;
     flex-direction: row;
 }

 .target-name {
     background: var(--input-background-fill);
     border-color: var(--input-border-color);
     white-space: nowrap;

     .title {
         font-weight: bold;

         .type {
             padding-left: 0.25rem;
             font-weight: normal;
         }
     }

     width: 100%;
     display: flex;
     flex-direction: row;

     > .target-title-wrapper {
         padding: 0.8rem 0 0.8rem 1.0rem;
         display: flex;
         flex-direction: row;
         width: 100%;
         text-align: center;

         > span {
             display: flex;
             flex-direction: column;
             justify-content: center;
         }
     }

     > .target-name-button {
         padding: 0.5rem;
         .mode-button {
             color: var(--comfy-accent-soft);
             height: $bottom-bar-height;
             width: 2.5rem;
             height: 2.5rem;
             margin: 1.0rem;
             padding: 0.5rem;
             margin-left: auto;

             @include square-button;

             color: var(--neutral-300);

             &:hover:not(:disabled) {
                 filter: brightness(120%) !important;
             }
             &:active:not(:disabled) {
                 filter: brightness(50%) !important;
             }
         }
     }
 }

 .category-name {
     background: var(--panel-background-fill);
     border-color: var(--panel-border-color);
     padding: 0.4rem 1.0rem;
 }

 .target-name, .category-name {
     border-width: var(--block-border-width);
     color: var(--body-text-color);

     .type {
         color: var(--neutral-500);
     }
 }

 @include disable-inputs;
</style>
