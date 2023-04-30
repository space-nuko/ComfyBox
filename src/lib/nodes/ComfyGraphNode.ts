import type ComfyWidget from "$lib/components/widgets/ComfyWidget";
import { LGraph, LGraphNode } from "@litegraph-ts/core";

export default class ComfyGraphNode extends LGraphNode {
    comfyClass: string | null
    isBackendNode?: boolean;

    afterQueued?(): void;
    onExecuted?(output: any): void;
}
