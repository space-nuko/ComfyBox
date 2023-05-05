import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";

export interface ComfySelectorProperties extends Record<any, any> {
    value: any
}

export default class ComfySelector extends ComfyGraphNode {
    override properties: ComfySelectorProperties = {
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

    private selected: number = 0;

    constructor(title?: string) {
        super(title);
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

export interface ComfySelectorTwoProperties extends Record<any, any> {
    value: any
}

export class ComfySelectorTwo extends ComfyGraphNode {
    override properties: ComfySelectorTwoProperties = {
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

    private selected: number = 0;

    constructor(title?: string) {
        super(title);
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
        if (sel == null || sel.constructor !== Boolean)
            sel = 0;
        this.selected = sel ? 0 : 1;
        var v = this.getInputData(this.selected + 1);
        if (v !== undefined) {
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
