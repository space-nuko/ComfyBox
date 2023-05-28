import { debounce } from '$lib/utils';
import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

type ConfigDefType = "boolean" | "number" | "string" | "string[]";

// A simple parameter description interface
interface ConfigDef<IdType, TypeType extends ConfigDefType, ValueType> {
    // The `IdType` is necessary to get a stricter type
    // parameter instead of a generic `id: string;`. This will be needed
    // later when we infer the type of the `config` object.
    name: IdType;

    type: TypeType,

    description?: string,

    defaultValue: ValueType,
}

type ConfigDefBoolean<IdType> = ConfigDef<IdType, "boolean", boolean>;
type ConfigDefNumber<IdType> = ConfigDef<IdType, "number", number>;
type ConfigDefString<IdType> = ConfigDef<IdType, "string", string>;
type ConfigDefStringArray<IdType> = ConfigDef<IdType, "string[]", string[]>;

// Configuration parameters ------------------------------------

const defComfyUIHostname: ConfigDefString<"comfyUIHostname"> = {
    name: "comfyUIHostname",
    type: "string",
    defaultValue: "localhost",
    description: "Backend domain for ComfyUI",
};

const defComfyUIPort: ConfigDefNumber<"comfyUIPort"> = {
    name: "comfyUIPort",
    type: "number",
    defaultValue: 8188,
    description: "Backend port for ComfyUI",
};

const defAlwaysStripUserState: ConfigDefBoolean<"alwaysStripUserState"> = {
    name: "alwaysStripUserState",
    type: "boolean",
    defaultValue: false,
    description: "Strip user state even if saving to local storage"
};

const defPromptForWorkflowName: ConfigDefBoolean<"promptForWorkflowName"> = {
    name: "promptForWorkflowName",
    type: "boolean",
    defaultValue: false,
    description: "When saving, always prompt for a name to save the workflow as",
};

const defConfirmWhenUnloadingUnsavedChanges: ConfigDefBoolean<"confirmWhenUnloadingUnsavedChanges"> = {
    name: "confirmWhenUnloadingUnsavedChanges",
    type: "boolean",
    defaultValue: true,
    description: "When closing the tab, open the confirmation window if there's unsaved changes"
};

const defBuiltInTemplates: ConfigDefStringArray<"builtInTemplates"> = {
    name: "builtInTemplates",
    type: "string[]",
    defaultValue: [],
    description: "Basenames of templates that can be loaded from public/templates. Saves LocalStorage space.",
};

const defCacheBuiltInResources: ConfigDefBoolean<"cacheBuiltInResources"> = {
    name: "cacheBuiltInResources",
    type: "boolean",
    defaultValue: true,
    description: "Cache loading of built-in resources to save network use"
};

export const CONFIG_DEFS = [
    defComfyUIHostname,
    defComfyUIPort,
    defAlwaysStripUserState,
    defPromptForWorkflowName,
    defConfirmWhenUnloadingUnsavedChanges,
    defBuiltInTemplates,
    defCacheBuiltInResources,
] as const;

type Config<T extends ReadonlyArray<Readonly<ConfigDef<string, ConfigDefType, any>>>> = {
    [K in T[number]["name"]]: Extract<T[number], { name: K }>["defaultValue"]
} extends infer O
    ? { [P in keyof O]: O[P] }
    : never;

type ConfigState = Config<typeof CONFIG_DEFS>

type ConfigStateOps = {
    getBackendURL: () => string,
    save: () => void,
    load: () => ConfigState
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

function save() {

}

function load(): ConfigState {

}

const configStateStore: WritableConfigStateStore =
{
    ...store,
    getBackendURL,
    save,
    load
}
export default configStateStore;
