import { writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type ComfyApp from "$lib/components/ComfyApp"

export type UIEditMode = "disabled" | "widgets" | "containers" | "layout";

export type UIState = {
    app: ComfyApp,
    nodesLocked: boolean,
    graphLocked: boolean,
    uiEditMode: UIEditMode
}

export type WritableUIStateStore = Writable<UIState>;
const store: WritableUIStateStore = writable(
    {
        graphLocked: true,
        nodesLocked: false,
        uiEditMode: "disabled",
    })

const uiStateStore: WritableUIStateStore =
{
    ...store
}
export default uiStateStore;
