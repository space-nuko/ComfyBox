import { BuiltInSlotType, LConnectionKind, LLink, LiteGraph, NodeMode, type INodeInputSlot, type SlotLayout, type INodeOutputSlot } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "./ComfyGraphNode";

export interface ComfySelectorProperties extends ComfyGraphNodeProperties {
    value: any
}

export default class ComfySelector extends ComfyGraphNode {
    override properties: ComfySelectorProperties = {
        tags: [],
        value: null
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "select", type: "number" },
            { name: "A", type: "*" },
            { name: "B", type: "*" },
            { name: "C", type: "*" },
            { name: "D", type: "*" },
        ],
        outputs: [
            { name: "out", type: "*" }
        ],
    }

    override canInheritSlotTypes = true;

    private selected: number = 0;

    constructor(title?: string) {
        super(title);
    }

    override getUpstreamLink(): LLink | null {
        var sel = this.getInputData(0);
        if (sel == null || sel.constructor !== Number)
            sel = 0;

        this.selected = sel = Math.round(sel) % (this.inputs.length - 1);

        var link = this.getInputLink(sel + 1);
        var node = this.getInputNode(sel + 1);
        if (link != null && node != null && node.mode === NodeMode.ALWAYS)
            return link;

        return null
    }

    override onDrawBackground(ctx: CanvasRenderingContext2D) {
        if (this.flags.collapsed) {
            return;
        }
        ctx.fillStyle = "#AFB";
        var y = (this.selected + 1) * LiteGraph.NODE_SLOT_HEIGHT + 6;
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(50, y + LiteGraph.NODE_SLOT_HEIGHT);
        ctx.lineTo(34, y + LiteGraph.NODE_SLOT_HEIGHT * 0.5);
        ctx.fill();
    };

    override onExecute() {
        var sel = this.getInputData(0);
        if (sel == null || sel.constructor !== Number)
            sel = 0;
        this.selected = sel = Math.round(sel) % (this.inputs.length - 1);
        var v = this.getInputData(sel + 1);
        if (v !== undefined) {
            this.setOutputData(0, v);
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfySelector,
    title: "Comfy.Selector",
    desc: "Selects an output from two or more inputs",
    type: "utils/selector"
})

export interface ComfySelectorTwoProperties extends ComfyGraphNodeProperties {
    value: any
}

export class ComfySelectorTwo extends ComfyGraphNode {
    override properties: ComfySelectorTwoProperties = {
        tags: [],
        value: null
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "select", type: "boolean" },
            { name: "true", type: "*" },
            { name: "false", type: "*" },
        ],
        outputs: [
            { name: "out", type: "*" }
        ],
    }

    override canInheritSlotTypes = true;

    private selected: number = 0;

    constructor(title?: string) {
        super(title);
    }

    override getUpstreamLink(): LLink | null {
        var sel = this.getInputData(0);
        if (sel == null || sel.constructor !== Boolean)
            sel = 0;

        this.selected = sel ? 0 : 1;

        var link = this.getInputLink(this.selected + 1);
        var node = this.getInputNode(this.selected + 1);
        if (link != null && node != null && node.mode === NodeMode.ALWAYS)
            return link

        return null;
    }

    override onConnectionsChange(
        type: LConnectionKind,
        slotIndex: number,
        isConnected: boolean,
        link: LLink,
        ioSlot: (INodeInputSlot | INodeOutputSlot)
    ) {
        if (type === LConnectionKind.INPUT) {

        }
    }

    override onDrawBackground(ctx: CanvasRenderingContext2D) {
        if (this.flags.collapsed) {
            return;
        }
        ctx.fillStyle = "#AFB";
        var y = (this.selected + 1) * LiteGraph.NODE_SLOT_HEIGHT + 6;
        ctx.beginPath();
        ctx.moveTo(65, y);
        ctx.lineTo(65, y + LiteGraph.NODE_SLOT_HEIGHT);
        ctx.lineTo(49, y + LiteGraph.NODE_SLOT_HEIGHT * 0.5);
        ctx.fill();
    };

    override onExecute() {
        var sel = this.getInputData(0);
        if (sel == null || sel.constructor !== Boolean)
            sel = 0;
        this.selected = sel ? 0 : 1;
        var v = this.getInputData(this.selected + 1);
        if (v !== undefined) {
            const link = this.getInputLink(this.selected + 1);
            const node = this.getInputNode(this.selected + 1);
            this.setOutputData(0, v);
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfySelectorTwo,
    title: "Comfy.Selector2",
    desc: "Selects an output from two inputs with a boolean",
    type: "utils/selector2"
})
