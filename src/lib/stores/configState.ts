import { debounce } from '$lib/utils';
import { toHashMap } from '@litegraph-ts/core';
import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { defaultConfig, type ConfigState, type ConfigDefAny, CONFIG_DEFS_BY_NAME, validateConfigOption, NotificationState } from './configDefs';

type ConfigStateOps = {
    getBackendURL: () => string,
    canShowNotificationText: () => boolean,
    canPlayNotificationSound: () => boolean,

    load: (data: any, runOnChanged?: boolean) => ConfigState
    loadDefault: (runOnChanged?: boolean) => ConfigState
    setConfigOption: (def: ConfigDefAny, v: any, runOnChanged: boolean) => boolean
    validateConfigOption: (def: ConfigDefAny, v: any) => boolean
    onChange: <K extends keyof ConfigState>(optionName: K, callback: ConfigOnChangeCallback<ConfigState[K]>) => void
    runOnChangedEvents: () => void,
}

export type WritableConfigStateStore = Writable<ConfigState> & ConfigStateOps;
const store: Writable<ConfigState> = writable({ ...defaultConfig })
const callbacks: Record<string, ConfigOnChangeCallback<any>[]> = {}
let changedOptions: Partial<Record<keyof ConfigState, [any, any]>> = {}

function getBackendURL(): string {
    const state = get(store);
    return `${window.location.protocol}//${state.comfyUIHostname}:${state.comfyUIPort}`
}

function canShowNotificationText(): boolean {
    const state = get(store).notifications;
    return state === NotificationState.MessageAndSound || state === NotificationState.MessageOnly;
}

function canPlayNotificationSound(): boolean {
    const state = get(store).notifications;
    return state === NotificationState.MessageAndSound || state === NotificationState.SoundOnly;
}


function setConfigOption(def: ConfigDefAny, v: any, runOnChanged: boolean): boolean {
    let valid = false;
    store.update(state => {
        const oldValue = state[def.name]

        valid = validateConfigOption(def, v);

        if (!valid) {
            console.warn(`[configState] Invalid value for option ${def.name} (${v}), setting to default (${def.defaultValue})`);
            state[def.name] = structuredClone(def.defaultValue);
        }
        else {
            state[def.name] = v
        }

        const changed = oldValue != state[def.name];
        if (changed) {
            if (runOnChanged) {
                if (callbacks[def.name]) {
                    for (const callback of callbacks[def.name]) {
                        callback(state[def.name], oldValue)
                    }
                }
            }
            else {
                if (changedOptions[def.name] == null) {
                    changedOptions[def.name] = [oldValue, state[def.name]];
                }
                else {
                    changedOptions[def.name][1] = state[def.name]
                }
            }
        }

        return state;
    })
    return valid;
}

function load(data: any, runOnChanged: boolean = false): ConfigState {
    changedOptions = {}

    store.set({ ...defaultConfig })
    if (data != null && typeof data === "object") {
        for (const [k, v] of Object.entries(data)) {
            const def = CONFIG_DEFS_BY_NAME[k]
            if (def == null) {
                delete data[k]
                continue;
            }

            setConfigOption(def, v, runOnChanged);
        }
    }

    return get(store);
}

function loadDefault(runOnChanged: boolean = false) {
    return load(null, runOnChanged);
}

export type ConfigOnChangeCallback<V> = (value: V, oldValue?: V) => void;

function onChange<K extends keyof ConfigState>(optionName: K, callback: ConfigOnChangeCallback<ConfigState[K]>) {
    callbacks[optionName] ||= []
    callbacks[optionName].push(callback)
}

function runOnChangedEvents() {
    console.debug("Running changed events for config...")
    for (const [optionName, [oldValue, newValue]] of Object.entries(changedOptions)) {
        const def = CONFIG_DEFS_BY_NAME[optionName]
        if (callbacks[optionName]) {
            console.debug("Running callback!", optionName, oldValue, newValue)
            for (const callback of callbacks[def.name]) {
                callback(newValue, oldValue)
            }
        }
    }
    changedOptions = {}
}

const configStateStore: WritableConfigStateStore =
{
    ...store,
    getBackendURL,
    canShowNotificationText,
    canPlayNotificationSound,

    validateConfigOption,
    setConfigOption,
    load,
    loadDefault,
    onChange,
    runOnChangedEvents
}
export default configStateStore;
