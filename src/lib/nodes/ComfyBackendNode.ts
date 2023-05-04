import LGraphCanvas from "@litegraph-ts/core/src/LGraphCanvas";
import ComfyGraphNode from "./ComfyGraphNode";
import ComfyWidgets from "$lib/widgets"
import type { ComfyWidgetNode } from "./ComfyWidgetNodes";

/*
 * Base class for any node with configuration sent by the backend.
 */
export class ComfyBackendNode extends ComfyGraphNode {
    comfyClass: string;

    constructor(title: string, comfyClass: string, nodeData: any) {
        super(title)
        this.type = comfyClass; // XXX: workaround dependency in LGraphNode.addInput()
        this.comfyClass = comfyClass;
        this.isBackendNode = true;

        const color = LGraphCanvas.node_colors["yellow"];
        this.color = color.color
        this.bgColor = color.bgColor

        this.setup(nodeData)

        // ComfyUI has no obvious way to identify if a node will return outputs back to the frontend based on its properties.
        // It just returns a hash like { "ui": { "images": results } } internally.
        // So this will need to be hardcoded for now.
        if (["PreviewImage", "SaveImage"].indexOf(comfyClass) !== -1) {
            this.addOutput("output", "OUTPUT");
        }
    }

    private setup(nodeData: any) {
        var inputs = nodeData["input"]["required"];
        if (nodeData["input"]["optional"] != undefined) {
            inputs = Object.assign({}, nodeData["input"]["required"], nodeData["input"]["optional"])
        }

        const config = { minWidth: 1, minHeight: 1 };
        for (const inputName in inputs) {
            const inputData = inputs[inputName];
            const type = inputData[0];

            if (inputData[1]?.forceInput) {
                this.addInput(inputName, type);
            } else {
                if (Array.isArray(type)) {
                    // Enums
                    Object.assign(config, ComfyWidgets.COMBO(this, inputName, inputData) || {});
                } else if (`${type}:${inputName}` in ComfyWidgets) {
                    // Support custom ComfyWidgets by Type:Name
                    Object.assign(config, ComfyWidgets[`${type}:${inputName}`](this, inputName, inputData) || {});
                } else if (type in ComfyWidgets) {
                    // Standard type ComfyWidgets
                    Object.assign(config, ComfyWidgets[type](this, inputName, inputData) || {});
                } else {
                    // Node connection inputs (backend)
                    this.addInput(inputName, type);
                }
            }
        }

        for (const o in nodeData["output"]) {
            const output = nodeData["output"][o];
            const outputName = nodeData["output_name"][o] || output;
            this.addOutput(outputName, output);
        }

        const s = this.computeSize();
        s[0] = Math.max(config.minWidth, s[0] * 1.5);
        s[1] = Math.max(config.minHeight, s[1]);
        this.size = s;
        this.serialize_widgets = false;

        // app.#invokeExtensionsAsync("nodeCreated", this);
    }

    override onExecuted(outputData: any) {
        console.warn("onExecuted outputs", outputData)
        for (let index = 0; index < this.outputs.length; index++) {
            const output = this.outputs[index]
            if (output.type === "OUTPUT") {
                this.setOutputData(index, outputData)
                for (const node of this.getOutputNodes(index)) {
                    if ("receiveOutput" in node) {
                        const widgetNode = node as ComfyWidgetNode;
                        widgetNode.receiveOutput();
                    }
                }
            }
        }
    }
}
