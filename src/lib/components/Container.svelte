<script lang="ts">
 import { Block, BlockTitle } from "@gradio/atoms";
 import uiState from "$lib/stores/uiState";
 import selectionState from "$lib/stores/selectionState";
 import WidgetContainer from "./WidgetContainer.svelte"
 import BlockContainer from "./BlockContainer.svelte"
 import AccordionContainer from "./AccordionContainer.svelte"
 import TabsContainer from "./TabsContainer.svelte"

 import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';

 import {fade} from 'svelte/transition';
 // notice - fade in works fine but don't add svelte's fade-out (known issue)
 import {cubicIn} from 'svelte/easing';
 import { flip } from 'svelte/animate';
 import layoutState, { type ContainerLayout, type WidgetLayout, type IDragItem } from "$lib/stores/layoutState";
 import { startDrag, stopDrag } from "$lib/utils"
	import type { Writable } from "svelte/store";
	import { isHidden } from "$lib/widgets/utils";

 export let container: ContainerLayout | null = null;
 export let zIndex: number = 0;
 export let classes: string[] = [];
 export let showHandles: boolean = false;
 export let isMobile: boolean = false
 let attrsChanged: Writable<boolean> | null = null;

 $: if (container) {
     attrsChanged = container.attrsChanged
 }
 else {
     attrsChanged = null
 }
</script>

{#if container}
    {@const edit = $uiState.uiUnlocked && $uiState.uiEditMode === "widgets" && zIndex > 1}
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
