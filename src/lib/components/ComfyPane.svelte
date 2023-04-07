<script lang="ts">
 import { onDestroy } from "svelte";
 import { Block, BlockTitle } from "@gradio/atoms";
 import { Dropdown, Range, TextBox } from "@gradio/form";
 import { Move } from 'radix-icons-svelte';
 import widgetState from "$lib/stores/widgetState";

 import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

 import {fade} from 'svelte/transition';
 // notice - fade in works fine but don't add svelte's fade-out (known issue)
 import {cubicIn} from 'svelte/easing';
 import { flip } from 'svelte/animate';

 export let dragItems = [];
 let dragDisabled = true;
 const flipDurationMs = 200;

 const handleConsider = evt => {
     dragItems = evt.detail.items;
     // console.log(dragItems);
 };
 const handleFinalize = evt => {
     dragItems = evt.detail.items;
     // Ensure dragging is stopped on drag finish
     dragDisabled = true;
 };

 const startDrag = () => {
     dragDisabled = false;
 };
 const stopDrag = () => {
     dragDisabled = true;
 };

 const unsubscribe = widgetState.subscribe(state => {
     dragItems = dragItems.filter(item => item.node.id in state);
 });

 onDestroy(unsubscribe);
</script>


<div class="v-pane"
     use:dndzone="{{ items: dragItems, dragDisabled, flipDurationMs }}"
     on:consider="{handleConsider}"
     on:finalize="{handleFinalize}"
>
    {#each dragItems as dragItem(dragItem.id)}
        {@const node = dragItem.node}
        {@const id = node.id}
        <div class="animation-wrapper" animate:flip={{duration:flipDurationMs}}>
            <Block>
                <div class="handle" on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag} on:touchend={stopDrag}>
                    <Move/>
                </div>
                <label for={id}>
                    <BlockTitle>{node.title}</BlockTitle>
                </label>
                {#each $widgetState[id] as item, i}
                    {#if item.widget.type == "combo"}
                        <div class="wrapper">
                            <Dropdown
                                bind:value={item.value}
                                choices={item.widget.options.values}
                                multiselect={false}
                                max_choices={1},
                                label={item.widget.name}
                                show_label={true}
                                disabled={item.widget.options.values.length === 0}
                                on:change
                                on:select
                                on:blur
                            />
                        </div>
                    {:else if item.widget.type == "number"}
                        <div class="wrapper">
                            <Range
                                bind:value={item.value}
                                minimum={item.widget.options.min}
                                maximum={item.widget.options.max}
                                step={item.widget.options.step}
                                label={item.widget.name}
                                show_label={true}
                                on:change
                                on:release
                            />
                        </div>
                    {:else if item.widget.type == "text"}
                        <div class="wrapper">
                            <TextBox
                                bind:value={item.value}
                                label={item.widget.name}
                                lines={item.widget.options.multiline ? 5 : 1}
                                max_lines={item.widget.options.multiline ? 5 : 1}
                                show_label={true}
                                on:change
                                on:submit
                                on:blur
                                on:select
                            />
                        </div>
                    {/if}
                    {#if dragItem[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                        <div in:fade={{duration:200, easing: cubicIn}} class='drag-item-shadow'/>
                    {/if}
                {/each}
            </Block>
        </div>
    {/each}
</div>

<style>
 .v-pane {
     border: 1px solid grey;
     float: left;
     height: 100%;
     overflow: auto;
     position: relative;
     width: 33%;
 }

 .handle {
     cursor: grab;
     position: absolute;
     top: 0;
     right: 0;
     width: 32px;
     height: 32px;
     padding: 0.5em;
     margin-right: 0.5em;
     margin-top: 0.25em;
 }

 .handle:hover {
     background-color: lightblue;
 }

 .drag-item-shadow {
     position: absolute;
     top: 0; left:0; right: 0; bottom: 0;
     visibility: visible;
     border: 1px dashed grey;
     background: lightblue;
     opacity: 0.5;
     margin: 0;
 }

 .wrapper {
     padding: 2px;
     width: 100%;
 }
</style>
