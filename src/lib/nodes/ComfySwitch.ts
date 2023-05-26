import { nextLetter } from "$lib/utils";
import { LConnectionKind, LLink, LiteGraph, type INodeInputSlot, type INodeOutputSlot, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";

export default class ComfySwitch extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        inputs: [
            { name: "A_value", type: "*" },
            { name: "A_cond", type: "boolean" },
        ],
        outputs: [
            { name: "out", type: "*" }
        ],
    }

    override canInheritSlotTypes = true;

    private _selected: number | null = null;

    constructor(title?: string) {
        super(title);
    }

    override getUpstreamLinkForInheritedType(): LLink | null {
        for (let index = 0; index < this.inputs.length / 2; index++) {
            const link = this.getInputLink(index * 2);
            if (link != null)
                return link
        }
        return null;
    }

    override getUpstreamLink(): LLink | null {
        const selected = this.getSelected();
        if (selected == null)
            return null;

        return this.getInputLink(selected * 2);
    }

    getSelected(): number | null {
        for (let i = 0; i < this.inputs.length / 2; i++) {
            if (this.getInputData(i * 2 + 1) == true)
                return i
        }
        return null;
    }

    override onDrawBackground(ctx: CanvasRenderingContext2D) {
        if (this.flags.collapsed || this._selected == null) {
            return;
        }
        ctx.fillStyle = "#AFB";
        var y = this._selected * 2 * LiteGraph.NODE_SLOT_HEIGHT + 6;
        ctx.beginPath();
        ctx.moveTo(30 + 50, y);
        ctx.lineTo(30 + 50, y + LiteGraph.NODE_SLOT_HEIGHT);
        ctx.lineTo(30 + 34, y + LiteGraph.NODE_SLOT_HEIGHT * 0.5);
        ctx.fill();
    };

    override onExecute() {
        this._selected = this.getSelected();
        var sel = this._selected

        if (sel == null || sel.constructor !== Number) {
            this.setOutputData(0, null)
            return
        }

        var v = this.getInputData(sel * 2);
        if (v !== undefined) {
            this.setOutputData(0, v);
        }
    }

    private hasActiveSlots(pairIndex: number): boolean {
        const slotValue = this.inputs[pairIndex * 2]
        const slotCond = this.inputs[pairIndex * 2 + 1];
        return slotValue && slotCond && (slotValue.link != null || slotCond.link != null);
    }

    override onConnectionsChange(
        type: LConnectionKind,
        slotIndex: number,
        isConnected: boolean,
        link: LLink,
        ioSlot: (INodeInputSlot | INodeOutputSlot)
    ) {
        super.onConnectionsChange(type, slotIndex, isConnected, link, ioSlot);

        if (type !== LConnectionKind.INPUT)
            return;

        const lastPairIdx = Math.floor((this.inputs.length / 2) - 1);

        let newlyConnected = false;
        if (isConnected) {
            newlyConnected = this.hasActiveSlots(lastPairIdx)
        }
        let newlyDisconnected = false;
        if (!isConnected) {
            newlyDisconnected = !this.hasActiveSlots(lastPairIdx) && !this.hasActiveSlots(lastPairIdx - 1)
        }

        console.error("CONNCHANGE", lastPairIdx, this.hasActiveSlots(lastPairIdx), isConnected, slotIndex, this.inputs.length, newlyConnected, newlyDisconnected);

        if (newlyConnected) {
            if (link != null) {
                // Add new inputs
                const lastInputName = this.inputs[this.inputs.length - 1].name
                const inputName = nextLetter(lastInputName.split("_")[0]);
                this.addInput(`${inputName}_value`, this.inputs[0].type)
                this.addInput(`${inputName}_cond`, "boolean")
            }
        }
        else if (newlyDisconnected) {
            // Remove empty inputs
            for (let i = this.inputs.length / 2; i > 0; i -= 1) {
                if (i <= 0)
                    break;

                if (!this.hasActiveSlots(i - 1)) {
                    this.removeInput(i * 2)
                    this.removeInput(i * 2)
                }
                else {
                    break;
                }
            }

            let name = "A"
            for (let i = 0; i < this.inputs.length; i += 2) {
                this.inputs[i].name = `${name}_value`;
                this.inputs[i + 1].name = `${name}_cond`
                name = nextLetter(name);
            }
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfySwitch,
    title: "Comfy.Switch",
    desc: "Selects an output if its condition is true, if none match returns null",
    type: "utils/switch"
})
