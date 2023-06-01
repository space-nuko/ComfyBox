import { debounce, isMobileBrowser } from '$lib/utils';
import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { WorkflowInstID, WorkflowReceiveOutputTargets } from './workflowState';
import modalState, { type ModalData } from './modalState';
import type { SlotType } from '@litegraph-ts/core';
import type ComfyApp from '$lib/components/ComfyApp';
import SendOutputModal, { type SendOutputModalResult } from "$lib/components/modal/SendOutputModal.svelte";
import workflowState from './workflowState';

export type InterfaceState = {
    // Show a large indicator of the currently editing number value for mobile
    // use (sliders).
    pointerNearTop: boolean,
    pointerNearLeft: boolean,
    showIndicator: boolean,
    indicatorValue: any,

    graphTransitioning: boolean,
    isJumpingToNode: boolean,

    selectedWorkflowIndex: number | null
    showingWorkflow: boolean,
    selectedTab: number,
    showSheet: boolean,

    isDarkMode: boolean
}

type InterfaceStateOps = {
    showIndicator: (pointerX: number, pointerY: number, value: any) => void,
    querySendOutput: (value: any, type: SlotType, receiveTargets: WorkflowReceiveOutputTargets[], cb: (modal: ModalData) => void) => void,
}

export type WritableInterfaceStateStore = Writable<InterfaceState> & InterfaceStateOps;
const store: Writable<InterfaceState> = writable(
    {
        pointerNearTop: false,
        pointerNearLeft: false,
        showIndicator: false,
        indicatorValue: null,

        graphTransitioning: false,
        isJumpingToNode: false,
        selectedTab: 1,
        showSheet: false,

        selectedWorkflowIndex: null,
        showingWorkflow: false,

        isDarkMode: false,
    })

const debounceDrag = debounce(() => { store.update(s => { s.showIndicator = false; return s }) }, 1000)

function showIndicator(pointerX: number, pointerY: number, value: any) {
    if (!window)
        return;

    const state = get(store)

    let middleWidth = window.innerWidth / 2;
    let middleHeight = window.innerHeight / 2;
    const pointerNearLeft = pointerX < middleWidth;
    const pointerNearTop = pointerY < middleHeight;
    store.update(s => { return { ...s, pointerNearTop, pointerNearLeft, showIndicator: true, indicatorValue: value } });
    debounceDrag();
}

function querySendOutput(value: any, type: SlotType, receiveTargets: WorkflowReceiveOutputTargets[], cb: (modal: ModalData) => void) {
    if (isMobileBrowser(navigator.userAgent)) {
        store.update(s => { s.showSheet = true; return s; })
    }
    else {
        const doSend = (modal: ModalData) => {
            cb(modal)

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
    }
}

const interfaceStateStore: WritableInterfaceStateStore =
{
    ...store,
    showIndicator,
    querySendOutput
}
export default interfaceStateStore;
