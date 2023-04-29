import { writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type ComfyApp from "$lib/components/ComfyApp"

export type UIState = {
    app: ComfyApp,
    nodesLocked: boolean,
    graphLocked: boolean,
    unlocked: boolean,
}

export type WritableUIStateStore = Writable<UIState>;
const store: WritableUIStateStore = writable(
    {
        graphLocked: true,
        nodesLocked: false,
        unlocked: true,
    })

const uiStateStore: WritableUIStateStore =
{
    ...store
}
export default uiStateStore;
