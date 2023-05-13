import { writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';

export type UIEditMode = "widgets" | "containers" | "layout";

export type UIState = {
    nodesLocked: boolean,
    graphLocked: boolean,
    autoAddUI: boolean,
    uiUnlocked: boolean,
    uiEditMode: UIEditMode,

    reconnecting: boolean,
    isSavingToLocalStorage: boolean
}

type UIStateOps = {
    reconnecting: () => void,
    reconnected: () => void,
}

export type WritableUIStateStore = Writable<UIState> & UIStateOps;
const store: Writable<UIState> = writable(
    {
        graphLocked: false,
        nodesLocked: false,
        autoAddUI: true,
        uiUnlocked: false,
        uiEditMode: "widgets",

        reconnecting: false,
        isSavingToLocalStorage: false
    })

function reconnecting() {
    store.update(s => { s.reconnecting = true; return s; })
}

function reconnected() {
    store.update(s => { s.reconnecting = false; return s; })
}

const uiStateStore: WritableUIStateStore =
{
    ...store,
    reconnecting,
    reconnected
}
export default uiStateStore;
