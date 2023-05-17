import { LConnectionKind, LGraph, LGraphNode, type INodeSlot, type SlotIndex, LiteGraph, getStaticProperty, type LGraphAddNodeOptions, LGraphCanvas, type LGraphRemoveNodeOptions, Subgraph, type LGraphAddNodeMode } from "@litegraph-ts/core";
import GraphSync from "./GraphSync";
import EventEmitter from "events";
import type TypedEmitter from "typed-emitter";
import layoutState from "./stores/layoutState";
import uiState from "./stores/uiState";
import { get } from "svelte/store";
import type ComfyGraphNode from "./nodes/ComfyGraphNode";
import type IComfyInputSlot from "./IComfyInputSlot";
import type { ComfyBackendNode } from "./nodes/ComfyBackendNode";
import type { ComfyComboNode, ComfyWidgetNode } from "./nodes/widgets";

type ComfyGraphEvents = {
    configured: (graph: LGraph) => void
    nodeAdded: (node: LGraphNode) => void
    nodeRemoved: (node: LGraphNode) => void
    nodeConnectionChanged: (kind: LConnectionKind, node: LGraphNode, slot: SlotIndex, targetNode: LGraphNode, targetSlot: SlotIndex) => void
    cleared: () => void
    beforeChange: (graph: LGraph, param: any) => void
    afterChange: (graph: LGraph, param: any) => void
    afterExecute: () => void
}

export default class ComfyGraph extends LGraph {
    eventBus: TypedEmitter<ComfyGraphEvents> = new EventEmitter() as TypedEmitter<ComfyGraphEvents>;

    override onConfigure() {
        console.debug("Configured");
    }

    override onBeforeChange(graph: LGraph, info: any) {
        console.debug("BeforeChange", info);
    }

    override onAfterChange(graph: LGraph, info: any) {
        console.debug("AfterChange", info);
    }

    override onAfterExecute() {
        this.eventBus.emit("afterExecute");
    }

    /*
     * NOTE: This function will also be called by child subgraphs on their
     * parent graphs. So we have to be sure the node that receives the callback
     * is a root graph (this._is_subgraph is false). If a subgraph calls this
     * then options.subgraphsh will have the list of subgraphs down the chain.
     */
    override onNodeAdded(node: LGraphNode, options: LGraphAddNodeOptions) {
        // Don't add nodes in subgraphs until this callback reaches the root
        // graph
        if (node.getRootGraph() == null || this._is_subgraph)
            return;

        this.doAddNode(node, options);

        // console.debug("Added", node);
        this.eventBus.emit("nodeAdded", node);
    }

    /*
     * Add widget UI/groups for newly added nodes.
     */
    private doAddNode(node: LGraphNode, options: LGraphAddNodeOptions) {
        layoutState.nodeAdded(node, options)

        // All nodes whether they come from base litegraph or ComfyBox should
        // have tags added to them. Can't override serialization for existing
        // node types to add `tags` as a new field so putting it in properties
        // is better.
        if (node.properties.tags == null)
            node.properties.tags = []

        if ((node as any).canInheritSlotTypes && node.inputs.length > 1) {
            node.color ||= LGraphCanvas.node_colors["green"].color;
            node.bgColor ||= LGraphCanvas.node_colors["green"].bgColor;
        }

        if ("outputProperties" in node) {
            const widgetNode = node as ComfyWidgetNode;
            for (const propName of widgetNode.outputProperties) {
                widgetNode.addPropertyAsOutput(propName.name, propName.type)
            }
        }

        // Check if the class declared a default widget layout
        if ("defaultWidgets" in node && !("svelteComponentType" in node)) {
            const comfyNode = node as ComfyGraphNode;
            const widgets = comfyNode.defaultWidgets;

            if (widgets) {
                if (widgets.inputs) {
                    for (const pair of Object.entries(comfyNode.defaultWidgets.inputs)) {
                        const [index, spec] = pair
                        const input = comfyNode.inputs[index] as IComfyInputSlot;
                        input.defaultWidgetNode = spec.defaultWidgetNode;
                        if (spec.config) {
                            input.config = spec.config
                        }
                    }
                }
            }
        }

        if (get(uiState).autoAddUI) {
            console.warn("ADD", node.type, options)
            if (!("svelteComponentType" in node) && options.addedBy == null) {
                console.debug("[ComfyGraph] AutoAdd UI")
                const comfyNode = node as ComfyGraphNode;
                const widgetNodesAdded: ComfyWidgetNode[] = []
                for (let index = 0; index < comfyNode.inputs.length; index++) {
                    const input = comfyNode.inputs[index];
                    if ("config" in input) {
                        const comfyInput = input as IComfyInputSlot;
                        if (comfyInput.defaultWidgetNode) {
                            const widgetNode = LiteGraph.createNode(comfyInput.defaultWidgetNode)
                            const inputPos = comfyNode.getConnectionPos(true, index);
                            this.add(widgetNode)
                            widgetNode.connect(0, comfyNode, index);
                            widgetNode.collapse();
                            widgetNode.pos = [inputPos[0] - 140, inputPos[1] + LiteGraph.NODE_SLOT_HEIGHT / 2];
                            widgetNodesAdded.push(widgetNode)

                            // Set combo box as loaded
                            if (widgetNode.type === "ui/combo" && widgetNode.properties.values != null) {
                                (widgetNode as ComfyComboNode).formatValues(widgetNode.properties.values);
                            }
                        }
                    }
                }
                const dragItemIDs = widgetNodesAdded.map(wn => get(layoutState).allItemsByNode[wn.id]?.dragItem?.id).filter(Boolean)
                console.debug("[ComfyGraph] Group new widgets", dragItemIDs)

                // Use the default node title instead of custom node title, in
                // case node was cloned
                const reg = LiteGraph.registered_node_types[node.type]

                layoutState.groupItems(dragItemIDs, { title: reg.title })
            }
        }

        // Handle nodes in subgraphs being attached to this graph indirectly
        // ************** RECURSION ALERT ! **************
        if (node.is(Subgraph)) {
            for (const child of node.subgraph.iterateNodesInOrder()) {
                this.doAddNode(child, options)
            }
        }
        // ************** RECURSION ALERT ! **************
    }

    override onNodeRemoved(node: LGraphNode, options: LGraphRemoveNodeOptions) {
        layoutState.nodeRemoved(node, options);

        // Handle subgraphs being removed
        if (node.is(Subgraph)) {
            for (const child of node.subgraph.iterateNodesInOrder()) {
                this.onNodeRemoved(child, options)
            }
        }

        // console.debug("Removed", node);
        this.eventBus.emit("nodeRemoved", node);
    }

    override onNodeConnectionChange(kind: LConnectionKind, node: LGraphNode, slot: SlotIndex, targetNode: LGraphNode, targetSlot: SlotIndex) {
        // console.debug("ConnectionChange", node);
        this.eventBus.emit("nodeConnectionChanged", kind, node, slot, targetNode, targetSlot);
    }
}
