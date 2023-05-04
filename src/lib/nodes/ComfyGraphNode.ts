import type { SerializedPrompt } from "$lib/components/ComfyApp";
import type ComfyWidget from "$lib/components/widgets/ComfyWidget";
import { LGraph, LGraphNode } from "@litegraph-ts/core";

export default class ComfyGraphNode extends LGraphNode {
    isBackendNode?: boolean;

    afterQueued?(prompt: SerializedPrompt): void;
    onExecuted?(output: any): void;
}
