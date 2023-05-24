import { range } from "./utils"
import ComfyWidgets from "./widgets"

export type ComfyNodeDef = {
    name: string
    display_name?: string
    category: string
    output_node?: boolean,
    input: ComfyNodeDefInputs
    /** Output type like "LATENT" or "IMAGE" */
    output: string[]
    output_name: string[]
    output_is_list: boolean[]
}

export type ComfyNodeDefInputs = {
    required: Record<string, ComfyNodeDefInput>,
    optional?: Record<string, ComfyNodeDefInput>
}
export type ComfyNodeDefInput = [ComfyNodeDefInputType, ComfyNodeDefInputOptions | null]


/**
 * - Array: Combo widget. Usually the values are strings but they can also be other stuff like booleans.
 * - "INT"/"FLOAT"/etc.: Non-combo type widgets. See ComfyWidgets type.
 * - other string: Must be a backend input type, usually something lke "IMAGE" or "LATENT".
 */
export type ComfyNodeDefInputType = any[] | keyof typeof ComfyWidgets | string

export type ComfyNodeDefInputOptions = {
    forceInput?: boolean;

    // NOTE: For COMBO type inputs, the default value is always the first entry in the list.
    default?: any,

    // INT/FLOAT options
    min?: number,
    max?: number,
    step?: number,

    // STRING options
    multiline?: boolean,
}

// TODO if/when comfy refactors
export type ComfyNodeDefOutput = {
    type: string,
    name: string,
    is_list?: boolean
}

export function isBackendNodeDefInputType(inputName: string, type: ComfyNodeDefInputType): type is string {
    return !Array.isArray(type) && !(type in ComfyWidgets) && !(`${type}:${inputName}` in ComfyWidgets);
}

export function iterateNodeDefInputs(def: ComfyNodeDef): Iterable<[string, ComfyNodeDefInput]> {
    var inputs = def.input.required || {}
    if (def.input.optional != null) {
        inputs = Object.assign({}, def.input.required, def.input.optional)
    }
    return Object.entries(inputs);
}

export function iterateNodeDefOutputs(def: ComfyNodeDef): Iterable<ComfyNodeDefOutput> {
    const outputCount = def.output ? def.output.length : 0;
    return range(outputCount).map(i => {
        return {
            type: def.output[i],
            name: def.output_name[i] || def.output[i],
            is_list: def.output_is_list[i],
        }
    })
}
