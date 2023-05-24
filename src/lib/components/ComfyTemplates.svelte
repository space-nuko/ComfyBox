<script lang="ts">
 import type { SerializedComfyBoxTemplate } from "$lib/ComfyBoxTemplate";
 import templateState from "$lib/stores/templateState";
 import uiState from "$lib/stores/uiState";
 import { truncateString } from "$lib/utils";
 import type ComfyApp from "./ComfyApp";
 import { flip } from 'svelte/animate';
 import {fade} from 'svelte/transition';
 import {cubicIn} from 'svelte/easing';
 import { dndzone, TRIGGERS, SHADOW_PLACEHOLDER_ITEM_ID, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
 import { defaultWidgetAttributes, type TemplateLayout } from "$lib/stores/layoutStates";
 import { v4 as uuidv4 } from "uuid"
 import { writable } from "svelte/store";

 export let app: ComfyApp

 type DNDConsiderOrFinalizeEvent<T> = {
     items: T[],
     info: any,
     el: Node,
     id: string,
     trigger?: string,
     source?: string
 }

 let _sorted: TemplateLayout[] = []

 $: rebuildTemplates($templateState.templates);

 function rebuildTemplates(templates: SerializedComfyBoxTemplate[]) {
     console.error("recreate");
     _sorted = Array.from(templates).map(t => {
         return {
             type: "template", id: uuidv4(), template: t, attrs: {...defaultWidgetAttributes}, attrsChanged: writable(0)
         }
     });
     _sorted.sort(t => t.template.metadata.createdAt || 0);
 }

 const flipDurationMs = 200;
 let shouldIgnoreDndEvents = false;

 function handleDndConsider(e: CustomEvent<DNDConsiderOrFinalizeEvent<TemplateLayout>>) {
     // console.warn(`got consider ${JSON.stringify(e.detail, null, 2)}`);
     const {trigger, id} = e.detail.info;
     if (trigger === TRIGGERS.DRAG_STARTED) {
         // console.warn(`copying ${id}`);
         const idx = _sorted.findIndex(item => item.id === id);
         const newId = `${id}_copy_${Math.round(Math.random()*1000000)}`;

         e.detail.items = e.detail.items.filter(item => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
         e.detail.items.splice(idx, 0, {..._sorted[idx], id: newId});

         _sorted = e.detail.items;
         shouldIgnoreDndEvents = true;
     }
     else if (!shouldIgnoreDndEvents) {
         _sorted = e.detail.items;
     }
     else {
         _sorted = _sorted;
     }
 }

 function handleDndFinalize(e: CustomEvent<DNDConsiderOrFinalizeEvent<TemplateLayout>>) {
     if (!shouldIgnoreDndEvents) {
         _sorted = e.detail.items;
     }
     else {
         _sorted = _sorted;
         shouldIgnoreDndEvents = false;
     }
 }
</script>

<div class="template-list">
    <div class="template-entries">
        {#if _sorted.length > 0}
            {@const draggable = $uiState.uiUnlocked}
            <div class="template-category-group">
                <div class="template-category-header">
                    General
                </div>
                <div class="template-entries-wrapper"
                     use:dndzone={{
                                 type: "layout",
                                 items: _sorted,
                                 flipDurationMs,
                                 dragDisabled: !draggable,
                                 dropFromOthersDisabled: true
                                 }}
                     on:consider={handleDndConsider}
                     on:finalize={handleDndFinalize}>
                    {#each _sorted.filter(i => i.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item(item.id)}
                        <div class="template-entry" class:draggable>
                            <div class="template-name">{truncateString(item.template.metadata.title, 16)}</div>
                            <div class="template-desc">{truncateString(item.template.metadata.description, 24)}</div>
                        </div>
                        {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                            <div in:fade={{duration:200, easing: cubicIn}} class='template-drag-item-shadow'/>
                        {/if}
                    {/each}
                </div>
            </div>
        {:else}
            <div class="no-templates">
                <span>(No templates)</span>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
 .template-list {
     height: 100%;
 }

 .template-entries {
     height: 100%;
     overflow-y: auto;
     display: flex;
     flex-flow: column nowrap;
 }

 .template-category-header {
     color: var(--body-text-color);
     background: var(--block-background-fill);
     border-color: var(--panel-border-color);
     padding: 0.8rem 1.0rem;
     font-weight: bold;
 }

 .template-entry {
     padding: 1.0rem;
     display: flex;
     flex-direction: column;
     border-bottom: 1px solid var(--block-border-color);
     border-top: 1px solid var(--table-border-color);
     color: var(--body-text-color);
     background: var(--panel-background-fill);
     max-height: 14rem;
     position: relative;

     font-size: 13pt;
     .template-desc {
         opacity: 65%;
         font-size: 11pt;
     }

     &:hover:not(:has(img:hover)):not(:has(button:hover)) {
         &.draggable {
             cursor: grab;
         }
         background: var(--block-background-fill);

         &.running {
             background: var(--comfy-accent-soft);
         }
     }
 }

 .no-templates {
     display: flex;
     color: var(--comfy-accent-soft);
     flex-direction: row;
     margin: auto;
     height: 100%;
     color: var(--comfy-accent-soft);

     span {
         margin: auto;
         font-size: 32px;
         font-weight: bolder;
     }
 }

 .template-drag-item-shadow {
     position: absolute;
     top: 0; left:0; right: 0; bottom: 0;
     visibility: visible;
     border: 1px dashed grey;
     background: lightblue;
     opacity: 0.5;
     margin: 0;
 }
</style>
