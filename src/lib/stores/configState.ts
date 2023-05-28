import { debounce } from '$lib/utils';
import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { z, type ZodTypeAny } from "zod"

type ConfigDefType = "boolean" | "number" | "string" | "string[]";

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

type Conf2 = {
    name: string;
    type: ZodTypeAny;
    defaultValue: any;
    description: string;
};

const def2ComfyUIHostname: Conf2 = {
    name: 'backend.comfyUIHostname',
    type: z.string(),
    defaultValue: 'localhost',
    description: 'Backend domain for ComfyUI',
};

const def2ComfyUIPort: Conf2 = {
    name: 'backend.comfyUIPort',
    type: z.number(),
    defaultValue: 8188,
    description: 'Backend port for ComfyUI',
};

const def2AlwaysStripUserState: Conf2 = {
    name: 'behavior.alwaysStripUserState',
    type: z.boolean(),
    defaultValue: false,
    description: 'Strip user state even if saving to local storage',
};

export const allconfs: ReadonlyArray<Conf2> = [
    def2ComfyUIHostname,
    def2ComfyUIPort,
    def2AlwaysStripUserState,
] as const;

const confItems: any = {};
const confDefaults: any = {}

for (const item of allconfs) {
    const trail = item.name.split('.');
    let theI = confItems;
    let theDef = confDefaults;
    for (const category of trail.slice(0, -1)) {
        theI[category] ||= { __category__: true };
        theI = theI[category];

        theDef[category] ||= {};
        theDef = theDef[category];
    }
    const optionName = trail[trail.length - 1];
    theI[optionName] = item;
    theDef[optionName] = item.defaultValue;
}

function recurse(item: Record<string, any>, trail: string[] = []): ZodTypeAny {
    let defaultValue = confDefaults
    for (const name of trail) {
        defaultValue = defaultValue[name];
    }

    for (const [key, value] of Object.entries(item)) {
        if (value.__category__) {
            delete value['__category__'];
            item[key] = recurse(value, trail.concat(key));
        } else {
            const result = value.type.safeParse(value.defaultValue);
            if (!result.success) {
                throw new Error(
                    `Default value for config item ${value.name} did not pass type matcher: ${result.error}`
                );
            }
            item[key] = value.type.catch(value.defaultValue);
        }
    }
    return z.object(item).catch({ ...defaultValue });
}

export const Config2 = recurse(confItems);
export type ConfigStore = z.infer<typeof Config2>;

const stor: ConfigStore = {
    backend: {},
    a: "foo"
}

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
