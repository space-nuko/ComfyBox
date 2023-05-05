import type { ComfyInputConfig } from "$lib/IComfyInputSlot";
import type { SerializedPrompt } from "$lib/components/ComfyApp";
import type ComfyWidget from "$lib/components/widgets/ComfyWidget";
import { LGraph, LGraphNode } from "@litegraph-ts/core";
import type { SvelteComponentDev } from "svelte/internal";
import type { ComfyWidgetNode } from "./ComfyWidgetNodes";

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
}
