import type { ComfyInputConfig } from "$lib/IComfyInputSlot";
import type { SerializedPrompt } from "$lib/components/ComfyApp";
import type ComfyWidget from "$lib/components/widgets/ComfyWidget";
import { LGraph, LGraphNode, LiteGraph, type SerializedLGraphNode, type Vector2 } from "@litegraph-ts/core";
import type { SvelteComponentDev } from "svelte/internal";
import type { ComfyWidgetNode } from "./ComfyWidgetNodes";
import type IComfyInputSlot from "$lib/IComfyInputSlot";
import uiState from "$lib/stores/uiState";
import { get } from "svelte/store";

export type DefaultWidgetSpec = {
    defaultWidgetNode: new (name?: string) => ComfyWidgetNode,
    config?: ComfyInputConfig
}

export type DefaultWidgetLayout = {
    inputs?: Record<number, DefaultWidgetSpec>,
}

export default class ComfyGraphNode extends LGraphNode {
    isBackendNode?: boolean;

    afterQueued?(prompt: SerializedPrompt): void;
    onExecuted?(output: any): void;

    defaultWidgets?: DefaultWidgetLayout

    /** Called when a backend node sends a ComfyUI output over a link */
    receiveOutput(output: any) {
    }

    override onResize(size: Vector2) {
        if ((window as any)?.app?.shiftDown) {
            const w = LiteGraph.CANVAS_GRID_SIZE * Math.round(this.size[0] / LiteGraph.CANVAS_GRID_SIZE);
            const h = LiteGraph.CANVAS_GRID_SIZE * Math.round(this.size[1] / LiteGraph.CANVAS_GRID_SIZE);
            this.size[0] = w;
            this.size[1] = h;
        }

        if (super.onResize)
            super.onResize(size)
    }

    override onSerialize(o: SerializedLGraphNode) {
        for (let index = 0; index < this.inputs.length; index++) {
            const input = this.inputs[index]
            const serInput = o.inputs[index]
            if ("defaultWidgetNode" in input) {
                const comfyInput = input as IComfyInputSlot
                const widgetNode = comfyInput.defaultWidgetNode
                const ty = Object.values(LiteGraph.registered_node_types)
                    .find(v => v.class === widgetNode)
                if (ty)
                    (serInput as any).widgetNodeType = ty.type;
                (serInput as any).defaultWidgetNode = null
            }
        }
    }

    override onConfigure(o: SerializedLGraphNode) {
        for (let index = 0; index < this.inputs.length; index++) {
            const input = this.inputs[index]
            const serInput = o.inputs[index]
            if ("widgetNodeType" in serInput) {
                const comfyInput = input as IComfyInputSlot
                const ty: string = serInput.widgetNodeType as any
                const widgetNode = Object.values(LiteGraph.registered_node_types)
                    .find(v => v.type === ty)
                if (widgetNode)
                    comfyInput.defaultWidgetNode = widgetNode.class as any
            }
        }
    }
}
