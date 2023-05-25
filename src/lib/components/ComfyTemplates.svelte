<script lang="ts">
 import { embedTemplateInSvg, type SerializedComfyBoxTemplate } from "$lib/ComfyBoxTemplate";
 import templateState, { type TemplateState, type WritableTemplateStateStore } from "$lib/stores/templateState";
 import { BoxSeam, Hdd } from "svelte-bootstrap-icons";
 import uiState from "$lib/stores/uiState";
 import { download, getLocalStorageUsedMB, MAX_LOCAL_STORAGE_MB, truncateString } from "$lib/utils";
 import type ComfyApp from "./ComfyApp";
 import { flip } from 'svelte/animate';
 import {fade} from 'svelte/transition';
 import {cubicIn} from 'svelte/easing';
 import { dndzone, TRIGGERS, SHADOW_PLACEHOLDER_ITEM_ID, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
 import { defaultWidgetAttributes, type TemplateLayout } from "$lib/stores/layoutStates";
 import { v4 as uuidv4 } from "uuid"
 import { get, writable } from "svelte/store";
	import EditTemplateModal from "./modal/EditTemplateModal.svelte";
	import modalState, { type ModalData } from "$lib/stores/modalState";
	import notify from "$lib/notify";

 export let app: ComfyApp

 type DNDConsiderOrFinalizeEvent<T> = {
     items: T[],
     info: any,
     el: Node,
     id: string,
     trigger?: string,
     source?: string
 }

 let storageUsedPercent = 0;
 let storageUsedMB = 0;

 $: {
     if ($templateState) {
         storageUsedMB = getLocalStorageUsedMB()
         storageUsedPercent = (storageUsedMB / MAX_LOCAL_STORAGE_MB) * 100;
     }
     else {
         storageUsedPercent = 0;
         storageUsedMB = 0;
     }
 }

 let _sorted: TemplateLayout[] = []

 $: $templateState && rebuildTemplates(templateState.getAllTemplates());

 function rebuildTemplates(allTemplates: SerializedComfyBoxTemplate[]): void {
     _sorted = Array.from(allTemplates).map(t => {
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

 function handleClick(layout: TemplateLayout) {
     if ($uiState.uiUnlocked)
         return;

     const updateTemplate = (modal: ModalData) => {
         const state = get(modal.state);
         layout.template.metadata.title = state.name || layout.template.metadata.title
         layout.template.metadata.author = state.author || layout.template.metadata.author
         layout.template.metadata.description = state.description || layout.template.metadata.description
     }

     const saveTemplate = (modal: ModalData) => {
         updateTemplate(modal);
         try {
             templateState.updateTemplate(layout.template);
             notify("Saved template!", { type: "success" })
         }
         catch (error) {
             notify(`Failed to save template: ${error}`, { type: "error", timeout: 10000 })
         }
     }

     const deleteTemplate = (modal: ModalData) => {
         if (!confirm("Are you sure you want to delete this template?"))
             return false;

         try {
             if (templateState.removeTemplate(layout.template.id)) {
                 notify("Template deleted!", { type: "success" })
             }
             else {
                 notify("Failed to delete template: not saved to local storage.", { type: "warning" })
             }
         }
         catch (error) {
             notify(`Failed to delete template: ${error}`, { type: "error", timeout: 10000 })
         }
     }

     const downloadTemplate = (modal: ModalData) => {
         updateTemplate(modal);
         const svg = embedTemplateInSvg(layout.template);
         const title = layout.template.metadata.title || "template";
         download(`${title}.svg`, svg, "image/svg+xml");
     }

     modalState.pushModal({
         svelteComponent: EditTemplateModal,
         svelteProps: {
             templateAndSvg: layout.template
         },
         showCloseButton: false,
         closeOnClick: false,
         buttons: [
             {
                 name: "Save",
                 variant: "primary",
                 onClick: saveTemplate
             },
             {
                 name: "Download",
                 variant: "secondary",
                 onClick: downloadTemplate,
                 closeOnClick: false
             },
             {
                 name: "Delete",
                 variant: "secondary",
                 onClick: deleteTemplate,
                 disabled: layout.template.isBuiltIn
             },
             {
                 name: "Close",
                 variant: "secondary",
                 onClick: () => {}
             },
         ]
     })
 }
</script>

<div class="template-list">
    <div class="template-entries">
        {#if _sorted.length > 0}
            {@const draggable = $uiState.uiUnlocked}
            <div class="template-list">
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
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div class="template-entry" class:built-in={item.template.isBuiltIn} class:draggable on:click={() => handleClick(item)}>
                                <div class="template-name">{item.template.metadata.title}</div>
                                <div class="template-desc">{item.template.metadata.description}</div>
                            </div>
                            {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                                <div in:fade={{duration:200, easing: cubicIn}} class='template-drag-item-shadow'/>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>
            <div class="storage-used">
                <div class="storage-used-icon">
                    <Hdd width="100%" height="2rem" />
                </div>
                <div class="storage-used-bar-wrapper">
                    <div class="storage-used-bar" style="width: {storageUsedPercent}%;">
                        <span class="storage-used-label">{storageUsedMB.toFixed(2)} / {MAX_LOCAL_STORAGE_MB} MB</span>
                    </div>
                </div>
            </div>
        {:else}
            <div class="no-templates-container">
                <div class="no-templates-icon">
                    <BoxSeam width="100%" height="8rem" />
                </div>
                <div class="no-templates-message">
                    (No templates)
                </div>
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
     display: flex;
     flex-flow: column nowrap;
     margin: auto;
 }

 .template-list {
     overflow-y: auto;
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
     user-select: none;
     text-overflow: ellipsis;
     overflow: hidden;

     &.built-in {
         background: repeating-linear-gradient(
             45deg,
             var(--neutral-800),
             var(--neutral-800) 15px,
             #1f293780 15px,
             #1f293780 30px,
         );
     }

     font-size: 13pt;
     .template-desc {
         opacity: 65%;
         font-size: 11pt;
     }

     &.draggable {
         border: 5px dashed var(--secondary-500);
         margin: 0.2em;
     }

     &:hover:not(:has(img:hover)):not(:has(button:hover)) {
         cursor: pointer;
         background: var(--block-background-fill);

         &.draggable {
             cursor: grab;
             background: var(--secondary-700);
         }

         &.running {
             background: var(--comfy-accent-soft);
         }
     }
 }

 .no-templates-container {
     display: flex;
     color: var(--comfy-accent-soft);
     flex-direction: column;
     margin: auto;
     color: var(--comfy-accent-soft);

     .no-templates-icon {
         margin: auto;
         margin-bottom: 1rem;
     }

     .no-templates-message {
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

 .storage-used {
     height: 2.5rem;
     margin: 5px;
     text-align: center;
     position: relative;
     padding: 0.1rem 0.5rem;

     display: flex;
     flex-direction: row;
     gap: var(--spacing-lg);

     .storage-used-icon {
         color: var(--neutral-500);
         margin: auto;
     }

     .storage-used-bar-wrapper {
         width: 100%;
         background: var(--panel-background-fill);
         border: 1px solid var(--neutral-700);
         position: relative;

         .storage-used-bar {
             height: 100%;
             background: var(--neutral-700);

             .storage-used-label {
                 width: 100%;
                 color: var(--neutral-200);
                 font-size: 12pt;
                 position: absolute;
                 margin: 0;
                 left: 0;
                 right: 0;
                 top: 50%;
                 transform: translateY(-50%);
             }
         }
     }
 }
</style>
