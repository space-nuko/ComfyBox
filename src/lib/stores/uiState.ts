import { writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';

export type UIState = {
    unlocked: boolean,
}

const store: Writable<UIState> = writable({ unlocked: false })

const uiStateStore: WritableUIStateStore =
{
    ...store
}
export default uiStateStore;
