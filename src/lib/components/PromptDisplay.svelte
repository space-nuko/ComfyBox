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

 const splitLength = 50;

 export let prompt: SerializedPromptInputsAll;
 export let images: string[] = [];
 export let isMobile: boolean = false;
 export let expandAll: boolean = false;

 let galleryStyle: Styles = {
     grid_cols: [2],
     object_fit: "cover",
     height: "var(--size-96)"
 }

 function isInputLink(input: SerializedPromptInput): boolean {
     return Array.isArray(input)
         && input.length === 2
         && typeof input[0] === "string"
         && typeof input[1] === "number"
 }

 function countNewLines(str: string): number {
     return str.split(/\r\n|\r|\n/).length
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
</script>

<div class="prompt-display">
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

     .scroll-container {
         position: relative;
         /* overflow-y: auto; */
         flex: 1 1 0%;
     }

     .image-container {
         position: relative;
         flex: 1 1 0%;
         max-width: 30vw;
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
</style>
