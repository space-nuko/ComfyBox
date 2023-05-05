import { LiteGraph, type ContextMenuItem, type LGraphNode, type Vector2, LConnectionKind, LLink, LGraphCanvas, type SlotType, TitleMode, type SlotLayout, BuiltInSlotType, type ITextWidget, type SerializedLGraphNode } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import { Watch } from "@litegraph-ts/nodes-basic";
import type { SerializedPrompt } from "$lib/components/ComfyApp";
import { toast } from '@zerodevx/svelte-toast'

export interface ComfyAfterQueuedEventProperties extends Record<any, any> {
    prompt: SerializedPrompt
}

export class ComfyAfterQueuedEvent extends ComfyGraphNode {
    override properties: ComfyAfterQueuedEventProperties = {
        prompt: null
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "afterQueued", type: BuiltInSlotType.EVENT },
            { name: "prompt", type: "*" }
        ],
    }

    override onPropertyChanged(property: string, value: any, prevValue?: any) {
        if (property === "value") {
            this.setOutputData(0, this.properties.prompt)
        }
    }

    override onExecute() {
        this.setOutputData(0, this.properties.prompt)
    }

    override afterQueued(p: SerializedPrompt) {
        this.setProperty("value", p)
        this.triggerSlot(0, "bang")
    }

    override onSerialize(o: SerializedLGraphNode) {
        super.onSerialize(o)
        o.properties = { prompt: null }
    }
}

LiteGraph.registerNodeType({
    class: ComfyAfterQueuedEvent,
    title: "Comfy.AfterQueuedEvent",
    desc: "Triggers a 'bang' event when a prompt is queued.",
    type: "actions/after_queued"
})

export interface ComfyOnExecutedEventProperties extends Record<any, any> {
}

export class ComfyOnExecutedEvent extends ComfyGraphNode {
    override properties: ComfyOnExecutedEventProperties = {
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "images", type: "IMAGE" }
        ],
        outputs: [
            { name: "onExecuted", type: BuiltInSlotType.EVENT },
        ],
    }

    private _output: any = null;

    override receiveOutput(output: any) {
        if (this._output !== output) {
            console.error(output)
            this.triggerSlot(0, "bang")
            this._output = output
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfyOnExecutedEvent,
    title: "Comfy.OnExecutedEvent",
    desc: "Triggers a 'bang' event when a prompt output is received.",
    type: "actions/on_executed"
})

export interface ComfyCopyActionProperties extends Record<any, any> {
    value: any
}

export class ComfyCopyAction extends ComfyGraphNode {
    override properties: ComfyCopyActionProperties = {
        value: null
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "in", type: "*" },
            { name: "copy", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "out", type: "*" }
        ],
    }

    displayWidget: ITextWidget;

    constructor(title?: string) {
        super(title);
        this.displayWidget = this.addWidget<ITextWidget>(
            "text",
            "Value",
            "",
            "value"
        );
        this.displayWidget.disabled = true;
    }

    override onExecute() {
        this.setProperty("value", this.getInputData(0))
    }

    override onAction(action: any, param: any) {
        this.setProperty("value", this.getInputData(0))
        this.setOutputData(0, this.properties.value)
        console.log("setData", this.properties.value)
    };
}

LiteGraph.registerNodeType({
    class: ComfyCopyAction,
    title: "Comfy.CopyAction",
    desc: "Copies its input to its output when an event is received",
    type: "actions/copy"
})

export interface ComfySwapActionProperties extends Record<any, any> {
}

export class ComfySwapAction extends ComfyGraphNode {
    override properties: ComfySwapActionProperties = {
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "A", type: "*" },
            { name: "B", type: "*" },
            { name: "swap", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "B", type: "*" },
            { name: "A", type: "*" }
        ],
    }

    override onAction(action: any, param: any) {
        const a = this.getInputData(0)
        const b = this.getInputData(1)
        this.setOutputData(0, a)
        this.setOutputData(1, b)
    };
}

LiteGraph.registerNodeType({
    class: ComfySwapAction,
    title: "Comfy.SwapAction",
    desc: "Swaps two inputs when triggered",
    type: "actions/swap"
})

export interface ComfyNotifyActionProperties extends Record<any, any> {
    message: string
}

export class ComfyNotifyAction extends ComfyGraphNode {
    override properties: ComfyNotifyActionProperties = {
        message: "Nya."
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "message", type: "string" },
            { name: "trigger", type: BuiltInSlotType.ACTION }
        ],
    }

    override onAction(action: any, param: any) {
        const message = this.getInputData(0);
        if (message) {
            toast.push(message);
        }
    };
}

LiteGraph.registerNodeType({
    class: ComfyNotifyAction,
    title: "Comfy.NotifyAction",
    desc: "Displays a message.",
    type: "actions/notify"
})
