import { LGraphNode, LiteGraph } from "@litegraph-ts/core";
import type IComfyInputSlot from "./IComfyInputSlot";
import type { ComfyInputConfig } from "./IComfyInputSlot";
import { ComfyComboNode, ComfyNumberNode, ComfyTextNode } from "./nodes/widgets";
import type { ComfyNodeDefInput } from "./ComfyNodeDef";

type WidgetFactoryCallback = (node: LGraphNode, inputName: string, inputData: ComfyNodeDefInput) => IComfyInputSlot;

type WidgetFactory = {
    /* Creates the input */
    callback: WidgetFactoryCallback,
    /* Input type as used by litegraph */
    inputType: string,
    /* Node type to instantiate */
    nodeType: string
}

function getNumberDefaults(inputData: ComfyNodeDefInput, defaultStep: number): ComfyInputConfig {
    let defaultValue = inputData[1].default;
    let { min, max, step } = inputData[1];

    if (defaultValue == undefined) defaultValue = 0;
    if (min == undefined) min = 0;
    if (max == undefined) max = 2048;
    if (step == undefined) step = defaultStep;

    return { min, max, step: step, precision: 0, defaultValue };
}

function addComfyInput(node: LGraphNode, inputName: string, extraInfo: Partial<IComfyInputSlot> = {}): IComfyInputSlot {
    const input = node.addInput(inputName) as IComfyInputSlot
    for (const [k, v] of Object.entries(extraInfo))
        input[k] = v

    if (input.defaultWidgetNode) {
        const ty = Object.values(LiteGraph.registered_node_types)
            .find(v => v.class === input.defaultWidgetNode)
        if (ty)
            input.widgetNodeType = ty.type
    }

    input.serialize = true;
    return input;
}

const FLOAT: WidgetFactory = {
    callback: (node: LGraphNode, inputName: string, inputData: ComfyNodeDefInput): IComfyInputSlot => {
        const config = getNumberDefaults(inputData, 0.5);
        return addComfyInput(node, inputName, { type: "number", config, defaultWidgetNode: ComfyNumberNode })
    },
    inputType: "number",
    nodeType: "ui/number"
}

const INT: WidgetFactory = {
    callback: (node: LGraphNode, inputName: string, inputData: ComfyNodeDefInput): IComfyInputSlot => {
        const config = getNumberDefaults(inputData, 1);
        return addComfyInput(node, inputName, { type: "number", config, defaultWidgetNode: ComfyNumberNode })
    },
    nodeType: "ui/number",
    inputType: "number"
}

const STRING: WidgetFactory = {
    callback: (node: LGraphNode, inputName: string, inputData: ComfyNodeDefInput): IComfyInputSlot => {
        const defaultValue = inputData[1].default || "";
        const multiline = !!inputData[1].multiline;

        return addComfyInput(node, inputName, { type: "string", config: { defaultValue, multiline }, defaultWidgetNode: ComfyTextNode })
    },
    inputType: "number",
    nodeType: "ui/text"
}

const COMBO: WidgetFactory = {
    callback: (node: LGraphNode, inputName: string, inputData: ComfyNodeDefInput): IComfyInputSlot => {
        const type = inputData[0] as string[];
        let defaultValue = type[0];
        if (inputData[1] && inputData[1].default) {
            defaultValue = inputData[1].default;
        }
        return addComfyInput(node, inputName, { type: "string", config: { values: type, defaultValue }, defaultWidgetNode: ComfyComboNode })
    },
    inputType: "number",
    nodeType: "ui/combo"
}

const IMAGEUPLOAD: WidgetFactory = {
    callback: (node: LGraphNode, inputName: string, inputData: ComfyNodeDefInput): IComfyInputSlot => {
        return addComfyInput(node, inputName, { type: "number", config: {} })
    },
    inputType: "COMFY_IMAGES",
    nodeType: "ui/image_upload"
}

export type WidgetRepository = Record<string, WidgetFactory>

const ComfyWidgets: WidgetRepository = {
    "INT:seed": INT,
    "INT:noise_seed": INT,
    FLOAT,
    INT,
    STRING,
    COMBO,
    IMAGEUPLOAD,
}

export default ComfyWidgets
