import { LinkRenderMode } from "@litegraph-ts/core";

/*
 * Supported config option types.
 */
type ConfigDefType = "boolean" | "number" | "string" | "string[]" | "enum";

// A simple parameter description interface
export interface ConfigDef<IdType extends string, TypeType extends ConfigDefType, ValueType, OptionsType = any> {
    // This generic `IdType` is what makes the "array of keys and values to new
    // interface definition" thing work
    name: IdType;

    type: TypeType,

    description?: string,

    category: string,

    defaultValue: ValueType,

    options: OptionsType,
}

export type ConfigDefAny = ConfigDef<string, any, any>
export type ConfigDefBoolean<IdType extends string> = ConfigDef<IdType, "boolean", boolean>;

export type NumberOptions = {
    min?: number,
    max?: number,
    step: number
}
export type ConfigDefNumber<IdType extends string> = ConfigDef<IdType, "number", number, NumberOptions>;

export type ConfigDefString<IdType extends string> = ConfigDef<IdType, "string", string>;
export type ConfigDefStringArray<IdType extends string> = ConfigDef<IdType, "string[]", string[]>;

export interface EnumValue<T> {
    label: string,
    value: T
}
export interface EnumOptions<T> {
    values: EnumValue<T>[]
}
export type ConfigDefEnum<IdType extends string, T> = ConfigDef<IdType, "enum", T, EnumOptions<T>>;

export function validateConfigOption(def: ConfigDefAny, v: any): boolean {
    switch (def.type) {
        case "boolean":
            return typeof v === "boolean";
        case "number":
            return typeof v === "number";
        case "string":
            return typeof v === "string";
        case "string[]":
            return Array.isArray(v) && v.every(vs => typeof vs === "string");
        case "enum":
            return Boolean(def.options.values.find((o: EnumValue<any>) => o.value === v));
    }
    return false;
}

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

export enum NotificationState {
    MessageAndSound,
    MessageOnly,
    SoundOnly,
    None
}

const defNotifications: ConfigDefEnum<"notifications", NotificationState> = {
    name: "notifications",
    type: "enum",
    defaultValue: NotificationState.MessageAndSound,
    category: "ui",
    description: "Controls how notifications are shown",
    options: {
        values: [
            {
                value: NotificationState.MessageAndSound,
                label: "Message & sound"
            },
            {
                value: NotificationState.MessageOnly,
                label: "Message only"
            },
            {
                value: NotificationState.SoundOnly,
                label: "Sound only"
            },
            {
                value: NotificationState.None,
                label: "None"
            },
        ]
    }
};

export enum OutputThumbnailsMode {
    Auto,
    AlwaysThumbnail,
    AlwaysFullSize
}

const defOutputThumbnails: ConfigDefEnum<"outputThumbnails", OutputThumbnailsMode> = {
    name: "outputThumbnails",
    type: "enum",
    defaultValue: OutputThumbnailsMode.Auto,
    category: "ui",
    description: "If enabled, send back smaller sized output image thumbnails for gallery/queue/history. Enable if you have slow network or are using Colab.",
    options: {
        values: [
            {
                value: OutputThumbnailsMode.Auto,
                label: "Autodetect"
            },
            {
                value: OutputThumbnailsMode.AlwaysThumbnail,
                label: "Always use thumbnails"
            },
            {
                value: OutputThumbnailsMode.AlwaysFullSize,
                label: "Always use full size"
            },
        ]
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

const defPollSystemStatsInterval: ConfigDefNumber<"pollSystemStatsInterval"> = {
    name: "pollSystemStatsInterval",
    type: "number",
    defaultValue: 1000,
    category: "behavior",
    description: "Interval in milliseconds to refresh system stats (total/free VRAM). Set to 0 to disable",
    options: {
        min: 0,
        max: 60000,
        step: 100
    }
};

const defBuiltInTemplates: ConfigDefStringArray<"builtInTemplates"> = {
    name: "builtInTemplates",
    type: "string[]",
    defaultValue: ["ControlNet", "LoRA x5", "Model Loader", "Positive_Negative", "Seed Randomizer"],
    category: "templates",
    description: "Basenames of templates that can be loaded from public/templates. Saves LocalStorage space.",
    options: {}
};

// const defLinkDisplayType: ConfigDefEnum<"linkDisplayType", LinkRenderMode> = {
//     name: "linkDisplayType",
//     type: "enum",
//     defaultValue: LinkRenderMode.SPLINE_LINK,
//     category: "graph",
//     description: "How to display links in the graph",
//     options: {
//         values: [
//             {
//                 value: LinkRenderMode.STRAIGHT_LINK,
//                 label: "Straight"
//             },
//             {
//                 value: LinkRenderMode.LINEAR_LINK,
//                 label: "Linear"
//             },
//             {
//                 value: LinkRenderMode.SPLINE_LINK,
//                 label: "Spline"
//             }
//         ]
//     },
// };

// Configuration exports ------------------------------------

export const CONFIG_DEFS = [
    defComfyUIHostname,
    defComfyUIPort,
    defNotifications,
    defOutputThumbnails,
    defAlwaysStripUserState,
    defPromptForWorkflowName,
    defConfirmWhenUnloadingUnsavedChanges,
    defCacheBuiltInResources,
    defPollSystemStatsInterval,
    defBuiltInTemplates,
    // defLinkDisplayType
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
