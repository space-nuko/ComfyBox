<script lang="ts" context="module">
 export type SendOutputModalResult = {
     workflow?: ComfyWorkflow,
     targetNode?: ComfyReceiveOutputNode,
 }
</script>

<script lang="ts">
 import type { ModalData, ModalState } from "$lib/stores/modalState";
 import { Block, BlockTitle } from "@gradio/atoms";
 import type { SlotType } from "@litegraph-ts/core";
 import type { Writable } from "svelte/store";
 import { StaticImage } from "$lib/components/gradio/image";
	import type { ComfyWorkflow, WorkflowReceiveOutputTargets } from "$lib/stores/workflowState";
	import { comfyBoxImageToComfyURL } from "$lib/utils";
	import { Button } from "@gradio/button";
	import type { ComfyReceiveOutputNode } from "$lib/nodes/actions";
	import ReceiveOutputTargets from "./ReceiveOutputTargets.svelte";

 export let value: any;
 export let type: SlotType;
 export let receiveTargets: WorkflowReceiveOutputTargets[] = [];

 export let _modal: ModalData;

 let images = []

 if (type === "COMFYBOX_IMAGE") {
     images = [comfyBoxImageToComfyURL(value)];
 }

 function sendOutput(workflow: ComfyWorkflow, targetNode: ComfyReceiveOutputNode) {
     const result: SendOutputModalResult = {
         workflow,
         targetNode
     }
     _modal.state.set(result)
     _modal.close();
 }
</script>

<div class="send-output-modal">
    <div class="targets-container">
        <Block>
            <span>Type: {type}</span>
        </Block>
        <ReceiveOutputTargets {receiveTargets} on:select={(e) => sendOutput(e.detail.workflow, e.detail.targetNode)} />
    </div>
    <div class="output-display">
        <Block>
            {#if type === "COMFYBOX_IMAGE"}
                <StaticImage show_label={false} label="Image" value={images[0]} />
            {/if}
        </Block>
    </div>
</div>

<style lang="scss">
 .send-output-modal {
     width: 60vw;
     height: 70vh;
     color: none;

     display: flex;
     flex-wrap: nowrap;
     overflow-y: none;

     flex-direction: row;
 }

 .targets-container {
     width: 100%;
     flex-direction: column;
 }

 .output-display {
     width: 40vw;
 }
</style>
