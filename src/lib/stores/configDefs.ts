/*
 * Supported config option types.
 */
type ConfigDefType = "boolean" | "number" | "string" | "string[]";

// A simple parameter description interface
export interface ConfigDef<IdType extends string, TypeType extends ConfigDefType, ValueType, OptionsType = any> {
    // This generic `IdType` is what makes the "array of keys and values to new
    // interface definition" thing work
    name: IdType;

    type: TypeType,

    description?: string,

    category: string,

    defaultValue: ValueType,

    options: OptionsType
}

export type ConfigDefAny = ConfigDef<string, any, any>
type ConfigDefBoolean<IdType extends string> = ConfigDef<IdType, "boolean", boolean>;

type NumberOptions = {
    min?: number,
    max?: number,
    step: number
}
type ConfigDefNumber<IdType extends string> = ConfigDef<IdType, "number", number, NumberOptions>;

type ConfigDefString<IdType extends string> = ConfigDef<IdType, "string", string>;
type ConfigDefStringArray<IdType extends string> = ConfigDef<IdType, "string[]", string[]>;

// Configuration parameters ------------------------------------

const defComfyUIHostname: ConfigDefString<"comfyUIHostname"> = {
    name: "comfyUIHostname",
    type: "string",
    defaultValue: "localhost",
    category: "backend",
    description: "Backend domain for ComfyUI",
    options: {}
};

const defComfyUIPort: ConfigDefNumber<"comfyUIPort"> = {
    name: "comfyUIPort",
    type: "number",
    defaultValue: 8188,
    category: "backend",
    description: "Backend port for ComfyUI",
    options: {
        min: 1,
        max: 65535,
        step: 1
    }
};

const defAlwaysStripUserState: ConfigDefBoolean<"alwaysStripUserState"> = {
    name: "alwaysStripUserState",
    type: "boolean",
    defaultValue: false,
    category: "behavior",
    description: "Strip user state even if saving to local storage",
    options: {}
};

const defPromptForWorkflowName: ConfigDefBoolean<"promptForWorkflowName"> = {
    name: "promptForWorkflowName",
    type: "boolean",
    defaultValue: false,
    category: "behavior",
    description: "When saving, always prompt for a name to save the workflow as",
    options: {}
};

const defConfirmWhenUnloadingUnsavedChanges: ConfigDefBoolean<"confirmWhenUnloadingUnsavedChanges"> = {
    name: "confirmWhenUnloadingUnsavedChanges",
    type: "boolean",
    defaultValue: true,
    category: "behavior",
    description: "When closing the tab, open the confirmation window if there's unsaved changes",
    options: {}
};

const defCacheBuiltInResources: ConfigDefBoolean<"cacheBuiltInResources"> = {
    name: "cacheBuiltInResources",
    type: "boolean",
    defaultValue: true,
    category: "behavior",
    description: "Cache loading of built-in resources to save network use",
    options: {}
};

const defBuiltInTemplates: ConfigDefStringArray<"builtInTemplates"> = {
    name: "builtInTemplates",
    type: "string[]",
    defaultValue: ["ControlNet", "LoRA x5", "Model Loader", "Positive_Negative", "Seed Randomizer"],
    category: "templates",
    description: "Basenames of templates that can be loaded from public/templates. Saves LocalStorage space.",
    options: {}
};

// Configuration exports ------------------------------------

export const CONFIG_DEFS = [
    defComfyUIHostname,
    defComfyUIPort,
    defAlwaysStripUserState,
    defPromptForWorkflowName,
    defConfirmWhenUnloadingUnsavedChanges,
    defCacheBuiltInResources,
    defBuiltInTemplates,
] as const;

export const CONFIG_DEFS_BY_NAME: Record<string, ConfigDefAny>
    = CONFIG_DEFS.reduce((dict, def) => {
        if (def.name in dict)
            throw new Error(`Duplicate named config definition: ${def.name}`)
        dict[def.name] = def;
        return dict
    }, {})

export const CONFIG_DEFS_BY_CATEGORY: Record<string, ConfigDefAny[]>
    = CONFIG_DEFS.reduce((dict, def) => {
        dict[def.category] ||= []
        dict[def.category].push(def)
        return dict
    }, {})

export const CONFIG_CATEGORIES: string[]
    = CONFIG_DEFS.reduce((arr, def) => {
        if (!arr.includes(def.category))
            arr.push(def.category)
        return arr
    }, [])

type Config<T extends ReadonlyArray<Readonly<ConfigDef<string, ConfigDefType, any>>>> = {
    [K in T[number]["name"]]: Extract<T[number], { name: K }>["defaultValue"]
} extends infer O
    ? { [P in keyof O]: O[P] }
    : never;

export type ConfigState = Config<typeof CONFIG_DEFS>

const pairs: [string, any][] = CONFIG_DEFS.map(item => { return [item.name, structuredClone(item.defaultValue)] })
export const defaultConfig: ConfigState = pairs.reduce((dict, v) => { dict[v[0]] = v[1]; return dict; }, {}) as any;
