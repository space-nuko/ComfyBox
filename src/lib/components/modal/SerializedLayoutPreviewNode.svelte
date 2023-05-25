<script lang="ts">
 import { type DragItemID, type SerializedDragEntry, type SerializedLayoutState } from "$lib/stores/layoutStates";
 import { Block, BlockTitle } from "@gradio/atoms";
	import Accordion from "../gradio/app/Accordion.svelte";

 export let layout: SerializedLayoutState
 export let entryID: DragItemID
 export let entry: SerializedDragEntry
</script>

{#if entry}
    {#if entry.dragItem.type === "container"}
        <div class="layout-container">
            <Block>
                <Accordion label={entry.dragItem.attrs.title || "(Container)"} open={false}>
                    {#each entry.children as childID}
                        {@const child = layout.allItems[childID]}
                        <svelte:self {layout} entry={child} entryID={childID} />
                    {/each}
                </Accordion>
            </Block>
        </div>
{:else}
        <div class="layout-widget">
        <Block>
            <BlockTitle>{entry.dragItem.attrs.title}</BlockTitle>
        </Block>
        </div>
    {/if}
{:else}
    <Block>
        Missing drag entry! {entryID}
    </Block>
{/if}

<style lang="scss">
 .layout-container {
     :global(> .block) {
         background: var(--panel-background-fill);
     }
 }

 .layout-widget {
     :global(> .block) {
         background: var(--block-background-fill);
     }
 }
</style>
