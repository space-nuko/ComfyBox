import { writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';

export type UIState = {
    nodesLocked: boolean,
    graphLocked: boolean,
    unlocked: boolean,
}

export type WritableUIStateStore = Writable<UIState>;
const store: WritableUIStateStore = writable({ unlocked: false, graphLocked: true, nodesLocked:false })

const uiStateStore: WritableUIStateStore =
{
    ...store
}
export default uiStateStore;
