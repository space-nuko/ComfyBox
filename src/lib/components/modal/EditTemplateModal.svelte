<script lang="ts">
 import type { ComfyBoxTemplate, SerializedComfyBoxTemplate } from "$lib/ComfyBoxTemplate";
 import type { SerializedDragEntry, SerializedLayoutState } from "$lib/stores/layoutStates";
 import { Block, BlockTitle } from "@gradio/atoms";
 import { Tabs, TabItem } from "@gradio/tabs";
 import { JSON as JSONIcon } from "@gradio/icons";
 import JsonView from '$lib/components/JsonView.svelte'
 import SerializedLayoutPreviewNode from "./SerializedLayoutPreviewNode.svelte";
 import Row from "../gradio/app/Row.svelte";
 import createDOMPurify from "dompurify"
 import Column from "../gradio/app/Column.svelte";
 import Accordion from "../gradio/app/Accordion.svelte";
 import Textbox from "@gradio/form/src/Textbox.svelte";
 import type { ModalData } from "$lib/stores/modalState";
 import { writable, type Writable } from "svelte/store";
	import { negmod } from "$lib/utils";
 const DOMPurify = createDOMPurify(window);

 export let templateAndSvg: SerializedComfyBoxTemplate;
 export let editable: boolean = true;
 export let _modal: ModalData;
 let layout: SerializedLayoutState | null
 let root: SerializedDragEntry | null
 let state: Writable<any> = writable({})
 let rawTemplate: SerializedComfyBoxTemplate | null
 let showJSON = false;
 let showAllJSON: number = 0;
 let createdAt = "";

 let isEditable = true;

 $: isEditable = editable && templateAndSvg && !templateAndSvg.isBuiltIn;

 $: {
     rawTemplate = { ...templateAndSvg };
     rawTemplate.svg = undefined;
 }

 function collapseByDefault(json: any): boolean {
     switch (showAllJSON) {
             case 0:
             return typeof json["id"] === "string";
             case 1:
             return typeof json["nodes"] === "object"
             case 2:
             default:
             return false;
     }
 }

 function expandJSON() {
     showAllJSON = negmod(showAllJSON + 1, 3)
 }

 $: {
     let options: Intl.DateTimeFormatOptions = {
         weekday: 'short',
         year: 'numeric',
         month: 'short',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric'
     };
     const date = new Date(templateAndSvg.metadata.createdAt);
     createdAt = date.toLocaleString('en-US', options);
 }

 $: {
     state = _modal.state;
     if (!("name" in $state)) {
         $state.name = templateAndSvg.metadata.title;
         $state.author = templateAndSvg.metadata.author;
         $state.description = templateAndSvg.metadata.description;
     }
 }

 let saneSvg: string = "";

 $: saneSvg = templateAndSvg
            ? DOMPurify.sanitize(templateAndSvg.svg, { USE_PROFILES: { svg: true, svgFilters: true } })
                       .replace("<svg", "<svg style='background: url(\"image/graph-bg.png\")'")
            : "";

 $: if (templateAndSvg) {
     layout = templateAndSvg.layout;
     if (layout) {
         root = layout.allItems[layout.root];
     }
     else {
         root = null;
     }
 }
 else {
     layout = null;
     root = null;
 }
</script>

<div class="template-preview">
    <Row>
        <Column>
            <div class="template-metadata">
                <Block>
                    <BlockTitle>Metadata</BlockTitle>
                    <div>
                        <Textbox label="Name" disabled={!isEditable} bind:value={$state.name} lines={1} max_lines={1} />
                        <Textbox label="Author" disabled={!isEditable} bind:value={$state.author} lines={1} max_lines={1} />
                        <Textbox label="Description" disabled={!isEditable} bind:value={$state.description} lines={5} max_lines={5} />
                        <Row>
                            <Textbox label="Created At" disabled={true} bind:value={createdAt} lines={1} max_lines={1} />
                            <Textbox label="Size" disabled={true} value="{(templateAndSvg.svg.length/1024).toFixed(2)} KB" lines={1} max_lines={1} />
                        </Row>
                    </div>
                </Block>
            </div>
        </Column>
        {#if root}
            <Column>
                <div class="template-layout-preview">
                    <Block>
                        <BlockTitle>Layout</BlockTitle>
                        <SerializedLayoutPreviewNode {layout} entry={root} entryID={root.dragItem.id} />
                    </Block>
                </div>
            </Column>
        {/if}
    </Row>
    <div class="template-graph-preview">
        <Tabs selected="graph">
            <TabItem name="Graph" id="graph">
                <Block>
                    <Accordion label="Graph">
                        <Block>
                            <div class="template-graph-wrapper">
                                {@html saneSvg}
                            </div>
                        </Block>
                    </Accordion>
                </Block>
            </TabItem>
            <TabItem name="Raw JSON" id="json" on:select={() => (showJSON = true)}>
                {#key showAllJSON}
                    {#if showJSON}
                    <button class="json-button" on:click={expandJSON}>
                        <JSONIcon />
                    </button>
                    <div class="json">
                        <JsonView json={rawTemplate} {collapseByDefault} />
                    </div>
                    {/if}
                {/key}
            </TabItem>
        </Tabs>
    </div>
</div>

<style lang="scss">
 .template-preview {
     width: 70vw;
     height: 70vh;
     display: flex;

     flex-direction: column;

     gap: var(--layout-gap);
 }

 .template-metadata {
     position: relative;
     flex: 1 1 0%;
     :global(> .block) {
         background: var(--panel-background-fill);
     }
 }

 .template-layout-preview {
     flex-grow: 1;
     overflow: auto;
     :global(> .block) {
         background: var(--panel-background-fill);
     }
 }

 .template-graph-preview {
     min-width: 0;
     :global(> .block) {
         background: var(--panel-background-fill);
     }

     .json {
         @include json-view;
     }
 }

 .template-graph-wrapper {
     overflow: auto;
     margin: auto;
 }


 .json-button {
     display: flex;
     position: absolute;
     top: var(--block-label-margin);
     right: var(--block-label-margin);
     align-items: center;
     box-shadow: var(--shadow-drop);
     border: 1px solid var(--border-color-primary);
     border-radius: var(--block-label-right-radius);
     background: var(--block-label-background-fill);
     padding: 5px;
     width: 30px;
     height: 30px;
     overflow: hidden;
     color: var(--block-label-text-color);
     font: var(--font);
     font-size: var(--button-small-text-size);
 }
</style>
