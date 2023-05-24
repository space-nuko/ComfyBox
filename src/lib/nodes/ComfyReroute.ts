import { LiteGraph, type ContextMenuItem, type LGraphNode, type Vector2, LConnectionKind, LLink, LGraphCanvas, type SlotType, TitleMode, type SlotLayout, NodeMode } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "./ComfyGraphNode";

export interface ComfyRerouteProperties extends ComfyGraphNodeProperties {
    showOutputText: boolean;
    horizontal: boolean;
    ignoreTypes: boolean;
}

export default class ComfyReroute extends ComfyGraphNode {
    static defaultVisibility: boolean = true;

    static setDefaultTextVisibility(visible: boolean) {
        ComfyReroute.defaultVisibility = visible;
        if (visible) {
            localStorage["Comfy.ComfyReroute.DefaultVisibility"] = "true";
        } else {
            delete localStorage["Comfy.ComfyReroute.DefaultVisibility"];
        }
    }

    override titleMode: TitleMode = TitleMode.NO_TITLE;
    override collapsable: boolean = false;

    override properties: ComfyRerouteProperties = {
        tags: [],
        showOutputText: ComfyReroute.defaultVisibility,
        horizontal: false,
        ignoreTypes: false
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "", type: "*" }
        ],
        outputs: [
            { name: "", type: "*" }
        ],
    }

    constructor(title?: string) {
        super(title);

        this.properties ||= {} as any;
        this.properties.showOutputText = ComfyReroute.defaultVisibility;
        this.properties.horizontal = false;

        if (this.properties.showOutputText) {
            this.outputs[0].name = "*"
        }
    }

    override onExecute() {
        this.setOutputData(0, this.getInputData(0));
    }

    override getUpstreamLink(): LLink | null {
        const link = this.getInputLink(0)
        const node = this.getInputNode(0)
        if (link && node && node.mode === NodeMode.ALWAYS)
            return link;
        return null;
    }

    override canInheritSlotTypes = true;

    override onConnectionsChange(type: LConnectionKind, slotIndex: number, isConnected: boolean, link: LLink, ioSlot: (INodeInputSlot | INodeOutputSlot)) {
        this.applyOrientation();

        this.canInheritSlotTypes = !this.properties.ignoreTypes;
        super.onConnectionsChange(type, slotIndex, isConnected, link, ioSlot);
    };

    override clone(): LGraphNode {
        const cloned = super.clone.apply(this) as ComfyReroute;
        cloned.removeOutput(0);
        cloned.addOutput(this.properties.showOutputText ? "*" : "", "*");
        cloned.size = cloned.computeSize();
        return cloned;
    };

    override getExtraMenuOptions(_, options: ContextMenuItem[]): ContextMenuItem[] | null {
        const canSplice = this.getInputLink(0) != null && this.getOutputLinks(0).length > 0;

        options.push({
            content: "Splice & Remove",
            disabled: !canSplice,
            callback: () => {
                const inputLink = this.getInputLink(0);
                const outputLinks = this.getOutputLinks(0);
                if (!inputLink || !outputLinks)
                    return;

                const inputNode = this.graph.getNodeById(inputLink.origin_id)
                this.graph.removeLink(inputLink.id);

                for (const outputLink of outputLinks) {
                    const outputNode = this.graph.getNodeById(outputLink.target_id)
                    this.graph.removeLink(outputLink.id);

                    inputNode.connect(inputLink.origin_slot, outputNode, outputLink.target_slot);
                }

                this.graph.remove(this);
            }
        })

        options.unshift(
            {
                content: (this.properties.showOutputText ? "Hide" : "Show") + " Type",
                callback: () => {
                    this.properties.showOutputText = !this.properties.showOutputText;
                    if (this.properties.showOutputText) {
                        this.outputs[0].name = (this as any).__outputType || this.outputs[0].type;
                    } else {
                        this.outputs[0].name = "";
                    }
                    this.size = this.computeSize();
                    this.applyOrientation();
                    this.graph.setDirtyCanvas(true, true);
                },
            },
            {
                content: (ComfyReroute.defaultVisibility ? "Hide" : "Show") + " Type By Default",
                callback: () => {
                    ComfyReroute.setDefaultTextVisibility(!ComfyReroute.defaultVisibility);
                },
            },
            {
                // naming is inverted with respect to LiteGraphNode.horizontal
                // LiteGraphNode.horizontal == true means that
                // each slot in the inputs and outputs are layed out horizontally,
                // which is the opposite of the visual orientation of the inputs and outputs as a node
                content: "Set " + (this.properties.horizontal ? "Horizontal" : "Vertical"),
                callback: () => {
                    this.properties.horizontal = !this.properties.horizontal;
                    this.applyOrientation();
                },
            }
        );

        return null
    }

    applyOrientation() {
        this.horizontal = this.properties.horizontal;
        if (this.horizontal) {
            // we correct the input position, because LiteGraphNode.horizontal
            // doesn't account for title presence
            // which reroute nodes don't have
            this.inputs[0].pos = [this.size[0] / 2, 0];
        } else {
            delete this.inputs[0].pos;
        }
        this.graph.setDirtyCanvas(true, true);
    }

    override computeSize(): Vector2 {
        return [
            this.properties.showOutputText && this.outputs && this.outputs.length
                ? Math.max(75, LiteGraph.NODE_TEXT_SIZE * this.outputs[0].name.length * 0.6 + 40)
                : 75,
            26,
        ];
    }
}

LiteGraph.registerNodeType({
    class: ComfyReroute,
    title: "Comfy.Reroute",
    desc: "Reroutes nodes preserving input/output types",
    type: "utils/reroute"
})
