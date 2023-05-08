import { BuiltInSlotType, LiteGraph, NodeMode, type INodeInputSlot, type SlotLayout, type INodeOutputSlot, LLink, LConnectionKind, type ITextWidget } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "./ComfyGraphNode";
import { Watch } from "@litegraph-ts/nodes-basic";

export interface ComfyPickFirstNodeProperties extends ComfyGraphNodeProperties {
    acceptNullLinkData: boolean
}

function nextLetter(s: string): string {
    return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a) {
        var c = a.charCodeAt(0);
        switch (c) {
            case 90: return 'A';
            case 122: return 'a';
            default: return String.fromCharCode(++c);
        }
    });
}

export default class ComfyPickFirstNode extends ComfyGraphNode {
    override properties: ComfyPickFirstNodeProperties = {
        tags: [],
        acceptNullLinkData: false
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

    constructor(title?: string) {
        super(title);
        this.displayWidget = this.addWidget("text", "Value", "")
        this.displayWidget.disabled = true;
    }

    override onDrawBackground(ctx: CanvasRenderingContext2D) {
        if (this.flags.collapsed || this.selected === -1) {
            return;
        }

        ctx.fillStyle = "#AFB";
        var y = (this.selected) * LiteGraph.NODE_SLOT_HEIGHT + 6;
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(50, y + LiteGraph.NODE_SLOT_HEIGHT);
        ctx.lineTo(34, y + LiteGraph.NODE_SLOT_HEIGHT * 0.5);
        ctx.fill();
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
            return link.data != null || this.properties.acceptNullLinkData;
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
