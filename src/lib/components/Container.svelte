<script lang="ts">
 import uiState from "$lib/stores/uiState";
 import selectionState from "$lib/stores/selectionState";
 import BlockContainer from "./BlockContainer.svelte"
 import AccordionContainer from "./AccordionContainer.svelte"
 import TabsContainer from "./TabsContainer.svelte"

 // notice - fade in works fine but don't add svelte's fade-out (known issue)
 import { type ContainerLayout } from "$lib/stores/layoutState";
 import type { Writable } from "svelte/store";
 import { isHidden } from "$lib/widgets/utils";

 export let container: ContainerLayout | null = null;
 export let zIndex: number = 0;
 export let classes: string[] = [];
 export let showHandles: boolean = false;
 export let isMobile: boolean = false
 let attrsChanged: Writable<number> | null = null;

 $: if (container) {
     attrsChanged = container.attrsChanged
 }
 else {
     attrsChanged = null
 }
</script>

{#if container}
    {@const edit = $uiState.uiUnlocked && $uiState.uiEditMode === "widgets"}
    {@const dragDisabled = zIndex === 0 || $selectionState.currentSelection.length > 2 || !$uiState.uiUnlocked}
    {#key $attrsChanged}
        {#if edit || !isHidden(container)}
            {#if container.attrs.variant === "tabs"}
                <TabsContainer {container} {zIndex} {classes} {showHandles} {edit} {dragDisabled} {isMobile} />
            {:else if container.attrs.variant === "accordion"}
                <AccordionContainer {container} {zIndex} {classes} {showHandles} {edit} {dragDisabled} {isMobile} />
            {:else}
                <BlockContainer {container} {zIndex} {classes} {showHandles} {edit} {dragDisabled} {isMobile} />
            {/if}
        {/if}
    {/key}
{/if}
