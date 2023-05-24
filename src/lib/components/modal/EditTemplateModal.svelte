<script lang="ts">
 import type { ComfyBoxTemplate, SerializedComfyBoxTemplate } from "$lib/ComfyBoxTemplate";
 import type { SerializedDragEntry, SerializedLayoutState } from "$lib/stores/layoutStates";
 import { Block, BlockTitle } from "@gradio/atoms";
 import SerializedLayoutPreviewNode from "./SerializedLayoutPreviewNode.svelte";
 import Row from "../gradio/app/Row.svelte";
 import createDOMPurify from "dompurify"
	import Column from "../gradio/app/Column.svelte";
	import Accordion from "../gradio/app/Accordion.svelte";
	import Textbox from "@gradio/form/src/Textbox.svelte";
 const DOMPurify = createDOMPurify(window);

 export let templateAndSvg: SerializedComfyBoxTemplate;
 let layout: SerializedLayoutState | null
 let root: SerializedDragEntry | null

 let saneSvg: string = "";

 $: saneSvg = templateAndSvg
              ? DOMPurify.sanitize(templateAndSvg.svg, { USE_PROFILES: { svg: true, svgFilters: true } })
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
                        <Textbox label="Name" value="Text" lines={1} max_lines={1} />
                        <Textbox label="Author" value="Text" lines={1} max_lines={1} />
                        <Textbox label="Description" value="Text" lines={5} max_lines={5} />
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
        <Block>
            <Accordion label="Graph">
                <Block>
                    <div class="template-graph-wrapper">
                        {@html saneSvg}
                    </div>
                </Block>
            </Accordion>
        </Block>
    </div>
</div>

<style lang="scss">
 .template-preview {
     width: 60vw;
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

 .template-rows {
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
 }

 .template-graph-wrapper {
     overflow: auto;
     margin: auto;
 }
</style>
