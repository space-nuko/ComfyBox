import type ComfyWidget from "$lib/components/widgets/ComfyWidget";
import { LGraphNode } from "@litegraph-ts/core";

export default class ComfyGraphNode extends LGraphNode {
    isVirtualNode: boolean = false;

    /*
     * Widgets that aren't a part of the graph, but are used for rendering
     * purposes only.
     */
    virtualWidgets: ComfyWidget[] = [];

    onExecuted?(output: any): void;
}
