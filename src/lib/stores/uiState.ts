import { writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type ComfyApp from "$lib/components/ComfyApp"

export type UIEditMode = "disabled" | "widgets" | "containers" | "layout";

export type UIState = {
    app: ComfyApp,
    nodesLocked: boolean,
    graphLocked: boolean,
    autoAddUI: boolean,
    uiEditMode: UIEditMode,
    subWorkflow: string
}

export type WritableUIStateStore = Writable<UIState>;
const store: WritableUIStateStore = writable(
    {
        app: null,
        graphLocked: false,
        nodesLocked: false,
        autoAddUI: true,
        uiEditMode: "disabled",
        subWorkflow: "default"
    })

const uiStateStore: WritableUIStateStore =
{
    ...store
}
export default uiStateStore;
