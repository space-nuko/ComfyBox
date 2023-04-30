import { LiteGraph, type ContextMenuItem, type LGraphNode, type Vector2, LConnectionKind, LLink, LGraphCanvas, type SlotType, TitleMode, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";

export interface ComfyRerouteProperties extends Record<any, any> {
    showOutputText: boolean;
    horizontal: boolean;
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
        showOutputText: ComfyReroute.defaultVisibility,
        horizontal: false
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

    override onConnectionsChange(type: LConnectionKind, slotIndex: number, isConnected: boolean, _link: LLink) {
        this.applyOrientation();

        // Prevent multiple connections to different types when we have no input
        if (isConnected && type === LConnectionKind.OUTPUT) {
            // Ignore wildcard nodes as these will be updated to real types
            const types = new Set(this.outputs[0].links.map((l) => this.graph.links[l].type).filter((t) => t !== "*"));
            if (types.size > 1) {
                for (let i = 0; i < this.outputs[0].links.length - 1; i++) {
                    const linkId = this.outputs[0].links[i];
                    const link = this.graph.links[linkId];
                    const node = this.graph.getNodeById(link.target_id);
                    node.disconnectInput(link.target_slot);
                }
            }
        }

        // Find root input
        let currentNode: ComfyReroute = this;
        let updateNodes: ComfyReroute[] = [];
        let inputType: SlotType | null = null;
        let inputNode = null;
        while (currentNode) {
            updateNodes.unshift(currentNode);
            const linkId = currentNode.inputs[0].link;
            if (linkId !== null) {
                const link = this.graph.links[linkId];
                const node = this.graph.getNodeById(link.origin_id);
                console.warn(node.type)
                if (node.class === ComfyReroute) {
                    console.log("REROUTE2")
                    if (node === this) {
                        // We've found a circle
                        currentNode.disconnectInput(link.target_slot);
                        currentNode = null;
                    }
                    else {
                        // Move the previous node
                        currentNode = node as ComfyReroute;
                    }
                } else {
                    // We've found the end
                    inputNode = currentNode;
                    inputType = node.outputs[link.origin_slot]?.type ?? null;
                    break;
                }
            } else {
                // This path has no input node
                currentNode = null;
                break;
            }
        }

        // Find all outputs
        const nodes: ComfyReroute[] = [this];
        let outputType: SlotType | null = null;
        while (nodes.length) {
            currentNode = nodes.pop();
            const outputs = (currentNode.outputs ? currentNode.outputs[0].links : []) || [];
            if (outputs.length) {
                for (const linkId of outputs) {
                    const link = this.graph.links[linkId];

                    // When disconnecting sometimes the link is still registered
                    if (!link) continue;

                    const node = this.graph.getNodeById(link.target_id);

                    if (node.class === ComfyReroute) {
                        console.log("REROUTE")
                        // Follow reroute nodes
                        nodes.push(node as ComfyReroute);
                        updateNodes.push(node as ComfyReroute);
                    } else {
                        // We've found an output
                        const nodeOutType = node.inputs && node.inputs[link?.target_slot] && node.inputs[link.target_slot].type ? node.inputs[link.target_slot].type : null;
                        if (inputType && nodeOutType !== inputType) {
                            // The output doesnt match our input so disconnect it
                            node.disconnectInput(link.target_slot);
                        } else {
                            outputType = nodeOutType;
                        }
                    }
                }
            } else {
                // No more outputs for this path
            }
        }

        const displayType = inputType || outputType || "*";
        const color = LGraphCanvas.link_type_colors[displayType];

        // Update the types of each node
        for (const node of updateNodes) {
            // If we dont have an input type we are always wildcard but we'll show the output type
            // This lets you change the output link to a different type and all nodes will update
            node.outputs[0].type = inputType || "*";
            (node as any).__outputType = displayType;
            node.outputs[0].name = node.properties.showOutputText ? String(displayType) : "";
            node.size = node.computeSize();

            if ("applyOrientation" in node && typeof node.applyOrientation === "function")
                node.applyOrientation();

            for (const l of node.outputs[0].links || []) {
                const link = this.graph.links[l];
                if (link) {
                    link.color = color;
                }
            }
        }

        if (inputNode) {
            const link = this.graph.links[inputNode.inputs[0].link];
            if (link) {
                link.color = color;
            }
        }
    };

    override clone(): LGraphNode {
        const cloned = super.clone.apply(this) as ComfyReroute;
        cloned.removeOutput(0);
        cloned.addOutput(this.properties.showOutputText ? "*" : "", "*");
        cloned.size = cloned.computeSize();
        return cloned;
    };

    override getExtraMenuOptions(_, options: ContextMenuItem[]): ContextMenuItem[] | null {
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
