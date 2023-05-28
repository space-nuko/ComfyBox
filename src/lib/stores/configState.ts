import { debounce } from '$lib/utils';
import { toHashMap } from '@litegraph-ts/core';
import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { defaultConfig, type ConfigState, type ConfigDefAny, CONFIG_DEFS_BY_NAME } from './configDefs';

type ConfigStateOps = {
    getBackendURL: () => string,
    load: (data: any) => ConfigState
    loadDefault: () => ConfigState
    setConfigOption: (def: ConfigDefAny, v: any) => boolean
    validateConfigOption: (def: ConfigDefAny, v: any) => boolean
}

export type WritableConfigStateStore = Writable<ConfigState> & ConfigStateOps;
const store: Writable<ConfigState> = writable({ ...defaultConfig })

function getBackendURL(): string {
    const state = get(store);
    return `${window.location.protocol}//${state.comfyUIHostname}:${state.comfyUIPort}`
}

function validateConfigOption(def: ConfigDefAny, v: any): boolean {
    switch (def.type) {
        case "boolean":
            return typeof v === "boolean";
        case "number":
            return typeof v === "number";
        case "string":
            return typeof v === "string";
        case "string[]":
            return Array.isArray(v) && v.every(vs => typeof vs === "string");
    }
    return false;
}

function setConfigOption(def: ConfigDefAny, v: any): boolean {
    let valid = false;
    store.update(state => {
        valid = validateConfigOption(def, v);

        if (!valid) {
            console.warn(`[configState] Invalid value for option ${def.name} (${v}), setting to default (${def.defaultValue})`);
            state[def.name] = structuredClone(def.defaultValue);
        }
        else {
            state[def.name] = v
        }

        return state;
    })
    return valid;
}

function load(data: any): ConfigState {
    store.set({ ...defaultConfig })
    if (data != null && typeof data === "object") {
        for (const [k, v] of Object.entries(data)) {
            const def = CONFIG_DEFS_BY_NAME[k]
            if (def == null) {
                delete data[k]
                continue;
            }

            setConfigOption(def, v);
        }
    }

    return get(store);
}

function loadDefault() {
    return load(null);
}

const configStateStore: WritableConfigStateStore =
{
    ...store,
    getBackendURL,
    validateConfigOption,
    setConfigOption,
    load,
    loadDefault
}
export default configStateStore;
