import { LGraphNode } from "@litegraph-ts/core";

export default class ComfyGraphNode extends LGraphNode {
    onExecuted?(output: any): void;
}
