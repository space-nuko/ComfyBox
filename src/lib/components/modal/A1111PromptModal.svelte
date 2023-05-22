<script lang="ts">
 import type { A1111ParsedInfotext } from "$lib/parseA1111";
 import { Block, BlockTitle } from "@gradio/atoms";
 import { TextBox } from "@gradio/form";
 import { JsonView } from '@zerodevx/svelte-json-view'
 import type { A1111PromptAndInfo } from "$lib/components/ComfyApp";
 import { StaticImage } from "$lib/components/gradio/image";

 export let prompt: A1111PromptAndInfo | null = null;

 let json: any = {}
 let a1111: A1111ParsedInfotext | null = null
 let infotext: string = ""
 let image: string | null = null;

 $: if (prompt) {
     infotext = prompt.infotext;
     a1111 = prompt.parsedInfotext;
     json = prompt.stdPrompt;
     image = URL.createObjectURL(prompt.imageFile);
 }
 else {
     infotext = ""
     a1111 = null;
     json = {}
     image = null;
 }

</script>

{#if prompt != null}
    <div class="a1111-prompt-display">
        <div class="prompt-container">
            <Block>
                <TextBox label="Infotext" show_label={true} value={infotext} lines={5} max_lines={20}/>
            </Block>
            <div class="scroll-container">
                {#if a1111}
                    {#if Object.keys(a1111.extraParams).length > 0}
                        <Block>
                            <BlockTitle>Unused Parameters</BlockTitle>
                            <div class="json">
                                <JsonView json={a1111.extraParams} />
                            </div>
                        </Block>
                    {/if}
                {/if}
                <Block>
                    <BlockTitle>Converted Prompt</BlockTitle>
                    <div class="json">
                        <JsonView {json} />
                    </div>
                </Block>
            </div>
        </div>
        <Block>
            <StaticImage show_label={false} label="Image" value={image} />
        </Block>
    </div>
{/if}

<style lang="scss">
 .a1111-prompt-display {
     width: 70vw;
     height: 70vh;
     color: none;

     --jsonPaddingLeft: 1rem;
     --jsonBorderLeft: 1px dotted var(--neutral-600);
     --jsonBracketColor: currentcolor;
     --jsonBracketHoverBackground: var(--neutral-100);
     --jsonSeparatorColor: currentcolor;
     --jsonKeyColor: var(--body-text-color);
     --jsonValColor: var(--body-text-color-subdued);
     --jsonValStringColor: var(--color-green-500);
     --jsonValNumberColor: var(--color-blue-500);
     --jsonValBooleanColor: var(--color-red-500);

     display: flex;
     flex-wrap: nowrap;
     overflow-y: none;

     flex-direction: row;

     .prompt-container {
         flex-direction: column;
         overflow: auto;

         .json {
             font-family: monospace;
         }

         .scroll-container {
             position: relative;
             flex: 1 1 0%;
             height: 100%;
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
