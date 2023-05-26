import { debounce } from '$lib/utils';
import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export type ConfigState = {
    /** Backend domain for ComfyUI */
    comfyUIHostname: string,

    /** Backend port for ComfyUI */
    comfyUIPort: number,

    /** Strip user state even if saving to local storage */
    alwaysStripUserState: boolean,

    /** When saving, always prompt for a name to save the workflow as */
    promptForWorkflowName: boolean,

    /** When closing the tab, open the confirmation window if there's unsaved changes */
    confirmWhenUnloadingUnsavedChanges: boolean,

    /** Basenames of templates that can be loaded from public/templates. Saves LocalStorage space. */
    builtInTemplates: string[],

    /** Cache loading of built-in resources to save network use */
    cacheBuiltInResources: boolean
}

type ConfigStateOps = {
    getBackendURL: () => string
}

export type WritableConfigStateStore = Writable<ConfigState> & ConfigStateOps;
const store: Writable<ConfigState> = writable(
    {
        comfyUIHostname: "localhost",
        comfyUIPort: 8188,
        alwaysStripUserState: false,
        promptForWorkflowName: false,
        confirmWhenUnloadingUnsavedChanges: true,
        builtInTemplates: [],
        cacheBuiltInResources: true,
    })

function getBackendURL(): string {
    const state = get(store);
    return `${window.location.protocol}//${state.comfyUIHostname}:${state.comfyUIPort}`
}

const configStateStore: WritableConfigStateStore =
{
    ...store,
    getBackendURL
}
export default configStateStore;
