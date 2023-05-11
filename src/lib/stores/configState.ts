import { debounce } from '$lib/utils';
import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export type ConfigState = {
    /** Strip user state even if saving to local storage */
    alwaysStripUserState: boolean,

    /** When saving, always prompt for a name to save the workflow as */
    promptForWorkflowName: boolean,
}

type ConfigStateOps = {
}

export type WritableConfigStateStore = Writable<ConfigState> & ConfigStateOps;
const store: Writable<ConfigState> = writable(
    {
        alwaysStripUserState: false,
        promptForWorkflowName: false
    })

const configStateStore: WritableConfigStateStore =
{
    ...store
}
export default configStateStore;
