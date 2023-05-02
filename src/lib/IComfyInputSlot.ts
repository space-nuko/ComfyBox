import type { INodeInputSlot } from "@litegraph-ts/core";

// TODO generalize
export type ComfyInputConfig = {
    min?: number,
    max?: number,
    step?: number,
    precision?: number,
    defaultValue?: any,
    values?: any[],
    multiline?: boolean
}

export default interface IComfyInputSlot extends INodeInputSlot {
    serialize: boolean
    config: ComfyInputConfig // stores range min/max/step, etc.
}
