<script lang="ts">
 import { TextBox } from "@gradio/form";
 import type { SerializedPromptInput, SerializedPromptInputsAll } from "./ComfyApp";
 import { Block, BlockLabel, BlockTitle } from "@gradio/atoms";
 import { JSON as JSONComponent } from "@gradio/json";
 import { JSON as JSONIcon, Copy, Check } from "@gradio/icons";
 import Accordion from "$lib/components/gradio/app/Accordion.svelte";
 import Gallery from "$lib/components/gradio/gallery/Gallery.svelte";
 import { ImageViewer } from "$lib/ImageViewer";
 import type { Styles } from "@gradio/utils";
 import { comfyFileToComfyBoxMetadata, comfyURLToComfyFile, countNewLines } from "$lib/utils";
 import ReceiveOutputTargets from "./modal/ReceiveOutputTargets.svelte";
 import workflowState, { type ComfyWorkflow, type WorkflowReceiveOutputTargets } from "$lib/stores/workflowState";
 import type { ComfyReceiveOutputNode } from "$lib/nodes/actions";
 import type ComfyApp from "./ComfyApp";

 const splitLength = 50;

 export let prompt: SerializedPromptInputsAll;
 export let images: string[] = []; // list of image URLs to ComfyUI's /view? endpoint
 export let isMobile: boolean = false;
 export let expandAll: boolean = false;
 export let closeModal: () => void;
 export let app: ComfyApp;

 let selected_image: number | null = null;

 let galleryStyle: Styles = {
     grid_cols: [2],
     object_fit: "contain",
     height: "var(--size-96)"
 }

 let receiveTargets: WorkflowReceiveOutputTargets[] = [];
 let comfyBoxImages = []
 let litegraphType = "(none)"

 $: if (images.length > 0) {
     // since the image links come from gradio, have to parse the URL for the
     // ComfyImageLocation params
     comfyBoxImages = images.map(comfyURLToComfyFile)
                            .map(comfyFileToComfyBoxMetadata);
 }
 else {
     comfyBoxImages = []
 }

 $: if (comfyBoxImages.length > 0) {
     if (selected_image != null)
         litegraphType = "COMFYBOX_IMAGE"
     else
         litegraphType = "COMFYBOX_IMAGES"
     receiveTargets = workflowState.findReceiveOutputTargets(litegraphType)
 }
 else {
     litegraphType = "(none)"
     receiveTargets = []
 }

 function isInputLink(input: SerializedPromptInput): boolean {
     return Array.isArray(input)
         && input.length === 2
         && typeof input[0] === "string"
         && typeof input[1] === "number"
 }

 function isMultiline(input: any): boolean {
     return typeof input === "string" && (input.length > splitLength || countNewLines(input) > 1);
 }

 function formatInput(input: any): string {
     if (typeof input === "string")
         return input
     return JSON.stringify(input, null, 2);
 }

 let copiedNodeID: any | null = null;
 let copiedInputName: string | null = null;
 let timer: NodeJS.Timeout;

 function copyFeedback(nodeID: string, inputName: string) {
     copiedNodeID = nodeID;
     copiedInputName = inputName;
     if (timer) clearTimeout(timer);
     timer = setTimeout(() => {
         copiedNodeID = null;
         copiedInputName = null;
     }, 1000);
 }

 async function handleCopy(nodeID: string, inputName: string, input: any) {
     if ("clipboard" in navigator) {
         await navigator.clipboard.writeText(formatInput(input));
         copyFeedback(nodeID, inputName);
     }
 }

 function onGalleryImageClicked(e: CustomEvent<HTMLImageElement>) {
     // TODO dialog renders over it
     // ImageViewer.instance.showLightbox(e.detail)
 }

 function sendOutput(workflow: ComfyWorkflow, targetNode: ComfyReceiveOutputNode) {
     if (workflow == null || targetNode == null)
         return

     let value = null;
     if (targetNode.properties.type === "COMFYBOX_IMAGE") {
         if (selected_image != null)
             value = comfyBoxImages[selected_image]
         else
             value = comfyBoxImages[0]
     }
     else if (targetNode.properties.type === "COMFYBOX_IMAGES") {
         value = comfyBoxImages
     }

     if (value == null)
         return;

     targetNode.receiveOutput(value);
     workflowState.setActiveWorkflow(app.lCanvas, workflow.id)

     closeModal();
 }
</script>

<div class="prompt-display">
    <div class="prompt-and-sends">
        <Block>
            <Accordion label="Prompt" open={expandAll || comfyBoxImages.length === 0}>
                <div class="scroll-container">
                    <Block>
                        {#each Object.entries(prompt) as [nodeID, inputs], i}
                            {@const classType = inputs.class_type}
                            {@const filtered = Object.entries(inputs.inputs).filter((i) => !isInputLink(i[1]))}
                            {#if filtered.length > 0}
                                <div class="accordion">
                                    <Block padding={true}>
                                        <Accordion label="Node {i+1}: {classType}" open={expandAll}>
                                            {#each filtered as [inputName, input]}
                                                <Block>
                                                    <button class="copy-button" on:click={() => handleCopy(nodeID, inputName, input)}>
                                                        {#if copiedNodeID === nodeID && copiedInputName === inputName}
                                                            <span class="copied-icon">
                                                                <Check />
                                                            </span>
                                                        {:else}
                                                            <span class="copy-text"><Copy /></span>
                                                        {/if}
                                                    </button>
                                                    <div>
                                                        {#if isInputLink(input)}
                                                            Link {input[0]} -> {input[1]}
                                                        {:else if typeof input === "object"}
                                                            <Block>
                                                                <BlockLabel
                                                                    Icon={JSONIcon}
                                                                    show_label={true}
                                                                    label={inputName}
                                                                    float={true}
                                                                />
                                                                <JSONComponent value={input} />
                                                            </Block>
                                                        {:else if isMultiline(input)}
                                                            {@const lines = Math.max(countNewLines(input), input.length / splitLength)}
                                                            <TextBox label={inputName} value={formatInput(input)} {lines} max_lines={lines} />
                                                        {:else}
                                                            <TextBox label={inputName} value={formatInput(input)} lines={1} max_lines={1} />
                                                        {/if}
                                                    </div>
                                                </Block>
                                            {/each}
                                        </Accordion>
                                    </Block>
                                </div>
                            {/if}
                        {/each}
                    </Block>
                </div>
            </Accordion>
        </Block>
        {#if comfyBoxImages.length > 0}
            <Block>
                <Accordion label="Send Outputs To..." open={true}>
                    <Block>
                        <BlockTitle>Output type: {litegraphType}</BlockTitle>
                        {#if receiveTargets.length > 0}
                            <ReceiveOutputTargets {receiveTargets} on:select={(e) => sendOutput(e.detail.workflow, e.detail.targetNode)} />
                        {:else}
                                <div class="outputs-message">No receive output targets found across all workflows.</div>
                        {/if}
                    </Block>
                </Accordion>
            </Block>
        {/if}
    </div>
    {#if images.length > 0}
        <div class="image-container">
            <Block>
                <Gallery
                    value={images}
                    label=""
                    show_label={false}
                    style={galleryStyle}
                    root={""}
                    root_url={""}
                    on:clicked={onGalleryImageClicked}
                    bind:selected_image
                />
            </Block>
        </div>
    {/if}
</div>

<style lang="scss">
 .prompt-display {
     width: 70vw;
     height: 60vh;
     color: none;

     display: flex;
     flex-wrap: nowrap;
     overflow-y: auto;

     flex-direction: column;
     @media (min-width: 1600px) {
         flex-direction: row;
     }
 }

 .prompt-and-sends {
     width: 50%;

     .scroll-container {
         position: relative;
         /* overflow-y: auto; */
         flex: 1 1 0%;
     }

     .copy-button {
         display: flex;
         position: absolute;
         top: var(--block-label-margin);
         right: var(--block-label-margin);
         align-items: center;
         box-shadow: var(--shadow-drop);
         border: 1px solid var(--border-color-primary);
         border-top: none;
         border-right: none;
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

     @keyframes -light-up {
         from {
             color: var(--color-yellow-400);
         }
         to {
             color: none;
         }
     }

     .copied-icon {
         animation: light-up 1s ease-out;
         :global(.svelte-select) {
             animation: light-up 1s ease-out;
         }
     }

     :global(> .block) {
         background: var(--panel-background-fill);
     }

     .accordion {
         background: var(--panel-background-fill);


         :global(> .block .block) {
             background: var(--panel-background-fill);
         }
     }
 }

 .outputs-message {
     padding: 0.5rem;
 }

 .image-container {
     position: relative;
     flex: 1 1 0%;
     width: 50%;

     > :global(.block) {
         height: 100%;

         :global(> .preview) {
             height: 100%;
             max-height: none !important;
         }
     }
 }
</style>
