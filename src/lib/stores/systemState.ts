import { debounce, isMobileBrowser } from '$lib/utils';
import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { WorkflowInstID, WorkflowReceiveOutputTargets } from './workflowState';
import modalState, { type ModalData } from './modalState';
import type { SlotType } from '@litegraph-ts/core';
import type ComfyApp from '$lib/components/ComfyApp';
import SendOutputModal, { type SendOutputModalResult } from "$lib/components/modal/SendOutputModal.svelte";
import workflowState from './workflowState';
import type { ComfyAPISystemStatsResponse, ComfyDevice } from '$lib/api';



export type SystemState = {
    devices: ComfyDevice[]
}

type SystemStateOps = {
    updateState: (resp: ComfyAPISystemStatsResponse) => void
}

export type WritableSystemStateStore = Writable<SystemState> & SystemStateOps;
const store: Writable<SystemState> = writable(
    {
        devices: []
    })

function updateState(resp: ComfyAPISystemStatsResponse) {
    store.set({
        devices: resp.devices
    })
}

const interfaceStateStore: WritableSystemStateStore =
{
    ...store,
    updateState
}
export default interfaceStateStore;
