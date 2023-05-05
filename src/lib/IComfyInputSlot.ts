import type { INodeInputSlot } from "@litegraph-ts/core";
import type { ComfyWidgetNode } from "./nodes";

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
    serialize: boolean,
    defaultWidgetNode: new (name?: string) => ComfyWidgetNode
    widgetNodeType?: string,
    config: ComfyInputConfig, // stores range min/max/step, etc.
}
