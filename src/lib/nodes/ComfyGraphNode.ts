import type ComfyWidget from "$lib/components/widgets/ComfyWidget";
import { LGraphNode } from "@litegraph-ts/core";

export default class ComfyGraphNode extends LGraphNode {
    isVirtualNode: boolean = false;

    afterQueued?(): void;
    onExecuted?(output: any): void;
}
