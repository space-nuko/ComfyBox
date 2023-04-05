<script lang="ts">
 import { Button } from "@gradio/button";
 import { Block, BlockTitle } from "@gradio/atoms";
 import { Dropdown, Range, TextBox } from "@gradio/form";
 import { LGraphNode, LGraph } from "litegraph.js";
 import type { IWidget } from "litegraph.js";
 import ComfyApp from "./ComfyApp";

 export let app: ComfyApp;

 export function clear() {
     nodes = {};
     items = {};
     state = {};
 }

 export function addNodeUI(node: LGraphNode) {
     if (node.widgets) {
         for (const [i, widget] of node.widgets.entries()) {
             nodes[node.id] = node;

             node.onPropertyChanged = (k, v) => {
                 console.log("PROPCHANGE", k, v)
             };

             if (!items[node.id]) {
                 items[node.id] = []
             }
             items[node.id].push({ node, widget })

             if (!state[node.id]) {
                 state[node.id] = []
             }
             state[node.id].push(widget.value);
         }
     }

     nodes = nodes;
     items = items;
     state = state;
 }

 export function removeNodeUI(node: LGraphNode) {
     delete nodes[node.id]
     delete state[node.id]
     delete items[node.id]

     nodes = nodes;
     items = items;
     state = state;
 }

 export function configureFinished(graph: LGraph) {
     for (const node of graph.computeExecutionOrder(false, null)) {
         if (node.widgets_values) {
             for (const [j, value] of node.widgets_values.entries()) {
                 state[node.id][j] = value;
             }
         }
     }

     nodes = nodes;
     state = state;
 }

 function getState() {

 }

 function queuePrompt() {
     console.log("Queuing!", state);
     app.queuePrompt(0, 1, state);
 }

 let nodes: Record<number, LGraphNode> = {};
 let items: Record<number, { node: LGraphNode, widget: IWidget }[]> = {};
 let state: Record<number, any[]> = {};
</script>

<div id="comfy-ui-panes">
    <div class="v-pane">
        {#each Object.keys(items) as id}
            {@const node = nodes[id]}
            <Block>
                <label for={id}>
                    <BlockTitle>{node.title}</BlockTitle>
                </label>
                {#each items[id] as item, i}
                    {#if item.widget.type == "combo"}
                        <div class="wrapper">
                            <Dropdown
                                bind:value={state[id][i]}
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
                                bind:value={state[id][i]}
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
                                bind:value={state[id][i]}
                                label={item.widget.name}
                                lines={item.widget.options.multiline ? 5 : 1}
                                show_label={true}
                                on:change
                                on:submit
                                on:blur
                                on:select
                            />
                        </div>
                    {/if}
                {/each}
            </Block>
        {/each}
    </div>
    <div class="v-pane">
    </div>
    <div class="v-pane">
        <div class="wrapper">
            <Button variant="primary" on:click={queuePrompt}>
                Run
            </Button>
        </div>
    </div>
</div>

<style>
 #comfy-ui-panes {
     width: 100%;
     height: 100%;
 }

 .v-pane {
     border: 1px solid grey;
     float: left;
     height: 100%;
     overflow: auto;
     position: relative;
     width: 33%;
 }

 .wrapper {
     padding: 10px;
     width: 100%;
 }
</style>
