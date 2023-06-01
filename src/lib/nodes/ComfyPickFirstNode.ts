import { BuiltInSlotType, LiteGraph, NodeMode, type INodeInputSlot, type SlotLayout, type INodeOutputSlot, LLink, LConnectionKind, type ITextWidget, type SerializedLGraphNode, type IComboWidget } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "./ComfyGraphNode";
import { Watch } from "@litegraph-ts/nodes-basic";
import { nextLetter } from "$lib/utils";

export type PickFirstMode = "anyActiveLink" | "dataTruthy" | "dataNonNull"

export interface ComfyPickFirstNodeProperties extends ComfyGraphNodeProperties {
    mode: PickFirstMode
}

export default class ComfyPickFirstNode extends ComfyGraphNode {
    override properties: ComfyPickFirstNodeProperties = {
        tags: [],
        mode: "anyActiveLink"
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "A", type: "*" },
            { name: "B", type: "*" },
        ],
        outputs: [
            { name: "out", type: "*" }
        ],
    }

    override canInheritSlotTypes = true;

    private selected: number = -1;

    displayWidget: ITextWidget;
    modeWidget: IComboWidget;

    constructor(title?: string) {
        super(title);
        this.displayWidget = this.addWidget("text", "Value", "")
        this.displayWidget.disabled = true;
        this.modeWidget = this.addWidget("combo", "Mode", this.properties.mode, null, { property: "mode", values: ["anyActiveLink", "dataTruthy", "dataNonNull"] })
    }

    override onDrawBackground(ctx: CanvasRenderingContext2D) {
        if (this.flags.collapsed) {
            return;
        }

        if (this.selected === -1) {
            // Draw an X indicating nothing matched the selection criteria
            const y = LiteGraph.NODE_SLOT_HEIGHT + 6;
            ctx.lineWidth = 5;
            ctx.strokeStyle = "red";
            ctx.beginPath();

            ctx.moveTo(50 - 15, y - 15);
            ctx.lineTo(50 + 15, y + 15);
            ctx.stroke();

            ctx.moveTo(50 + 15, y - 15);
            ctx.lineTo(50 - 15, y + 15);
            ctx.stroke();
        }
        else {
            // Draw an arrow pointing to the selected input
            ctx.fillStyle = "#AFB";
            const y = (this.selected) * LiteGraph.NODE_SLOT_HEIGHT + 6;
            ctx.beginPath();
            ctx.moveTo(50, y);
            ctx.lineTo(50, y + LiteGraph.NODE_SLOT_HEIGHT);
            ctx.lineTo(34, y + LiteGraph.NODE_SLOT_HEIGHT * 0.5);
            ctx.fill();
        }
    };

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

        if (isConnected) {
            if (link != null && slotIndex === this.inputs.length - 1) {
                // Add a new input
                const lastInputName = this.inputs[this.inputs.length - 1].name
                const inputName = nextLetter(lastInputName);
                this.addInput(inputName, this.inputs[0].type)
            }
        }
        else {
            if (this.getInputLink(this.inputs.length - 1) != null)
                return;

            // Remove empty inputs
            for (let i = this.inputs.length - 2; i > 0; i--) {
                if (i <= 0)
                    break;

                if (this.getInputLink(i) == null)
                    this.removeInput(i)
                else
                    break;
            }

            let name = "A"
            for (let i = 0; i < this.inputs.length; i++) {
                this.inputs[i].name = name;
                name = nextLetter(name);
            }
        }
    }

    private isValidLink(link: LLink | null): boolean {
        if (!link)
            return false;

        const node = this.graph.getNodeById(link.origin_id);

        // Links to deactivated nodes won't count.
        if (!node || node.mode !== NodeMode.ALWAYS)
            return false;

        if ((node as ComfyGraphNode).isBackendNode) {
            // Backend nodes won't set data, we can safely assume they're valid.
            return true;
        }
        else {
            if (this.properties.mode === "dataNonNull")
                return link.data != null;
            else if (this.properties.mode === "dataTruthy")
                return Boolean(link.data)
            else // anyActiveLink
                return true;
        }
    }

    override getUpstreamLink(): LLink | null {
        for (let index = 0; index < this.inputs.length; index++) {
            const link = this.getInputLink(index);
            if (this.isValidLink(link)) {
                return link;
            }
        }
        return null;
    }

    override onExecute() {
        for (let index = 0; index < this.inputs.length; index++) {
            const link = this.getInputLink(index);
            if (this.isValidLink(link)) {
                // Copy frontend-only inputs.
                const node = this.getInputNode(index);
                if (node != null) {
                    this.selected = index;
                    if (!(node as any).isBackendNode) {
                        this.displayWidget.value = Watch.toString(link.data)
                        this.setOutputData(0, link.data)
                    }
                    return
                }
            }
        }

        this.selected = -1;
        this.setOutputData(0, null)
    }
}

LiteGraph.registerNodeType({
    class: ComfyPickFirstNode,
    title: "Comfy.PickFirst",
    desc: "Picks the first active input connected to this node (top to bottom)",
    type: "utils/pick_first"
})
