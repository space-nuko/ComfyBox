import { writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';

export type UIEditMode = "widgets" | "containers" | "layout";

export type UIState = {
    nodesLocked: boolean,
    graphLocked: boolean,
    autoAddUI: boolean,
    uiUnlocked: boolean,
    uiEditMode: UIEditMode,

    isSavingToLocalStorage: boolean
}

export type WritableUIStateStore = Writable<UIState>;
const store: WritableUIStateStore = writable(
    {
        graphLocked: false,
        nodesLocked: false,
        autoAddUI: true,
        uiUnlocked: false,
        uiEditMode: "widgets",

        isSavingToLocalStorage: false
    })

const uiStateStore: WritableUIStateStore =
{
    ...store
}
export default uiStateStore;
