import modalState, { type ModalData, type ModalState } from "$lib/stores/modalState";
import { getLitegraphType } from "$lib/utils";
import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "../ComfyGraphNode";

import SendOutputModal, { type SendOutputModalResult } from "$lib/components/modal/SendOutputModal.svelte";
import notify from "$lib/notify";
import workflowState from "$lib/stores/workflowState";
import { get } from "svelte/store";
import type ComfyApp from "$lib/components/ComfyApp";
import interfaceState from "$lib/stores/interfaceState";

export interface ComfySendOutputActionProperties extends ComfyGraphNodeProperties {
}

export default class ComfySendOutputAction extends ComfyGraphNode {
    override properties: ComfySendOutputActionProperties = {
        tags: [],
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "value", type: "*" },
            { name: "trigger", type: BuiltInSlotType.ACTION }
        ],
    }

    isActive: boolean = false;

    override onAction(action: any, param: any) {
        const value = this.getInputData(0);
        if (value == null) {
            notify("No workflow data to send!", { type: "error" })
            return;
        }

        if (this.isActive)
            return;

        let type = getLitegraphType(value);
        const receiveTargets = workflowState.findReceiveOutputTargets(type);

        this.isActive = true;

        interfaceState.querySendOutput(value, type, receiveTargets, () => {
            this.isActive = false;
        })
    };
}

LiteGraph.registerNodeType({
    class: ComfySendOutputAction,
    title: "Comfy.SendOutputAction",
    desc: "Sends a workflow output elsewhere",
    type: "actions/send_output"
})
