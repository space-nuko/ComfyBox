import LGraphCanvas from "@litegraph-ts/core/src/LGraphCanvas";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "./ComfyGraphNode";
import ComfyWidgets from "$lib/widgets"
import type { ComfyWidgetNode } from "$lib/nodes/widgets";
import { BuiltInSlotShape, BuiltInSlotType, LiteGraph, type SerializedLGraphNode } from "@litegraph-ts/core";
import type IComfyInputSlot from "$lib/IComfyInputSlot";
import type { ComfyInputConfig } from "$lib/IComfyInputSlot";
import { iterateNodeDefOutputs, type ComfyNodeDef, iterateNodeDefInputs } from "$lib/ComfyNodeDef";
import type { SerializedPromptOutput } from "$lib/utils";

export interface ComfyBackendNodeProperties extends ComfyGraphNodeProperties {
    noOutputDisplay: boolean
}

/*
 * Base class for any node with configuration sent by the backend.
 */
export class ComfyBackendNode extends ComfyGraphNode {
    override properties: ComfyBackendNodeProperties = {
        tags: [],
        noOutputDisplay: false
    }

    comfyClass: string;
    comfyNodeDef: ComfyNodeDef;
    displayName: string | null;

    constructor(title: string, comfyClass: string, nodeDef: ComfyNodeDef) {
        super(title)
        this.type = comfyClass; // XXX: workaround dependency in LGraphNode.addInput()
        this.displayName = nodeDef.display_name;
        this.comfyNodeDef = nodeDef;
        this.comfyClass = comfyClass;
        this.isBackendNode = true;

        const color = LGraphCanvas.node_colors["yellow"];
        if (this.color == null)
            this.color = color.color
        if (this.bgColor == null)
            this.bgColor = color.bgColor

        this.setup(nodeDef)

        if (nodeDef.output_node) {
            this.addOutput("OUTPUT", BuiltInSlotType.EVENT, { color_off: "rebeccapurple", color_on: "rebeccapurple" });
        }
    }

    get isOutputNode(): boolean {
        return this.comfyNodeDef.output_node;
    }

    // comfy class -> input name -> input config
    private static defaultInputConfigs: Record<string, Record<string, ComfyInputConfig>> = {}

    private setup(nodeDef: ComfyNodeDef) {
        ComfyBackendNode.defaultInputConfigs[this.type] = {}

        for (const [inputName, inputData] of iterateNodeDefInputs(nodeDef)) {
            const config: Partial<IComfyInputSlot> = {};

            const [type, opts] = inputData;

            if (opts?.forceInput) {
                if (Array.isArray(type)) {
                    throw new Error(`Can't have forceInput set to true for an enum type! ${type}`)
                }
                this.addInput(inputName, type as string);
            } else {
                if (Array.isArray(type)) {
                    // Enums
                    Object.assign(config, ComfyWidgets.COMBO.callback(this, inputName, inputData) || {});
                } else if (`${type}:${inputName}` in ComfyWidgets) {
                    // Support custom ComfyWidgets by Type:Name
                    Object.assign(config, ComfyWidgets[`${type}:${inputName}`].callback(this, inputName, inputData) || {});
                } else if (type in ComfyWidgets) {
                    // Standard type ComfyWidgets
                    Object.assign(config, ComfyWidgets[type].callback(this, inputName, inputData) || {});
                } else {
                    // Node connection inputs (backend)
                    this.addInput(inputName, type);
                }
            }

            if ("widgetNodeType" in config)
                ComfyBackendNode.defaultInputConfigs[this.type][inputName] = (config as IComfyInputSlot).config
        }

        for (const output of iterateNodeDefOutputs(nodeDef)) {
            const outputShape = output.is_list ? BuiltInSlotShape.GRID_SHAPE : BuiltInSlotShape.CIRCLE_SHAPE;
            this.addOutput(output.name, output.type, { shape: outputShape });
        }

        this.serialize_widgets = false;
        // app.#invokeExtensionsAsync("nodeCreated", this);
    }

    override onSerialize(o: SerializedLGraphNode) {
        super.onSerialize(o);
        for (const input of o.inputs) {
            // strip user-identifying data, it will be reinstantiated later
            if ((input as any).config != null) {
                (input as any).config = {};
            }
        }
    }

    override onConfigure(o: SerializedLGraphNode) {
        super.onConfigure(o);

        const configs = ComfyBackendNode.defaultInputConfigs[o.type]
        for (let index = 0; index < this.inputs.length; index++) {
            const input = this.inputs[index] as IComfyInputSlot
            const config = configs[input.name]
            if (config != null && index >= 0 && index < this.inputs.length) {
                if (input.config == null || Object.keys(input.config).length !== Object.keys(config).length) {
                    console.debug("[ComfyBackendNode] restore input config", input, config)
                    input.config = config
                }
            }
            else {
                console.debug("[ComfyBackendNode] Missing input config in onConfigure()", input, configs)
                input.config = {}
            }
        }
    }

    override onExecuted(outputData: SerializedPromptOutput) {
        console.warn("onExecuted outputs", outputData)
        this.triggerSlot(0, outputData)
    }
}
