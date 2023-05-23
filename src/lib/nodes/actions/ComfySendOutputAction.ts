import modalState, { type ModalData, type ModalState } from "$lib/stores/modalState";
import { getLitegraphType } from "$lib/utils";
import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "../ComfyGraphNode";

import SendOutputModal, { type SendOutputModalResult } from "$lib/components/modal/SendOutputModal.svelte";
import notify from "$lib/notify";
import workflowState from "$lib/stores/workflowState";
import { get } from "svelte/store";
import type ComfyApp from "$lib/components/ComfyApp";

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

        const doSend = (modal: ModalData) => {
            this.isActive = false;

            const { workflow, targetNode } = get(modal.state) as SendOutputModalResult;
            console.warn("send", workflow, targetNode);

            if (workflow == null || targetNode == null)
                return

            const app = (window as any).app as ComfyApp;
            if (app == null) {
                console.error("Couldn't get app!")
                return
            }

            targetNode.receiveOutput(value);
            workflowState.setActiveWorkflow(app.lCanvas, workflow.id)
        }

        modalState.pushModal({
            title: "Send Output",
            closeOnClick: true,
            showCloseButton: true,
            svelteComponent: SendOutputModal,
            svelteProps: {
                value,
                type,
                receiveTargets
            },
            onClose: doSend
        })
    };
}

LiteGraph.registerNodeType({
    class: ComfySendOutputAction,
    title: "Comfy.SendOutputAction",
    desc: "Sends a workflow output elsewhere",
    type: "actions/send_output"
})
