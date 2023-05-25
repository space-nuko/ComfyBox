import { LConnectionKind, LGraph, LGraphNode, type INodeSlot, type SlotIndex, LiteGraph, getStaticProperty, type LGraphAddNodeOptions, LGraphCanvas, type LGraphRemoveNodeOptions, Subgraph, type LGraphAddNodeMode, type SerializedLGraphNode, type Vector2, type NodeID, reassignGraphIDs, type GraphIDMapping, type SerializedLGraph } from "@litegraph-ts/core";
import GraphSync from "./GraphSync";
import EventEmitter from "events";
import type TypedEmitter from "typed-emitter";
import uiState from "./stores/uiState";
import { get } from "svelte/store";
import type ComfyGraphNode from "./nodes/ComfyGraphNode";
import type IComfyInputSlot from "./IComfyInputSlot";
import type { ComfyBackendNode } from "./nodes/ComfyBackendNode";
import type { ComfyComboNode, ComfyWidgetNode } from "./nodes/widgets";
import selectionState from "./stores/selectionState";
import type { WritableLayoutStateStore } from "./stores/layoutStates";
import layoutStates from "./stores/layoutStates";
import type { ComfyBoxWorkflow, WorkflowInstID } from "./stores/workflowState";
import workflowState from "./stores/workflowState";
import type { SerializedComfyBoxTemplate } from "./ComfyBoxTemplate";
import { v4 as uuidv4 } from "uuid"

function calculateMinPosOfNodes(nodes: SerializedLGraphNode[]): Vector2 {
    var posMin: Vector2 = [0, 0]
    var posMinIndexes: [number, number] | null = null;

    for (var i = 0; i < nodes.length; ++i) {
        if (posMin) {
            if (posMin[0] > nodes[i].pos[0]) {
                posMin[0] = nodes[i].pos[0];
                posMinIndexes[0] = i;
            }
            if (posMin[1] > nodes[i].pos[1]) {
                posMin[1] = nodes[i].pos[1];
                posMinIndexes[1] = i;
            }
        }
        else {
            posMin = [nodes[i].pos[0], nodes[i].pos[1]];
            posMinIndexes = [i, i];
        }
    }

    return posMin;
}

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

    workflowID: WorkflowInstID | null = null;

    get workflow(): ComfyBoxWorkflow | null {
        const workflowID = (this.getRootGraph() as ComfyGraph)?.workflowID;
        if (workflowID == null)
            return null;
        return workflowState.getWorkflow(workflowID)
    }

    get layout(): WritableLayoutStateStore | null {
        return this.workflow?.layout;
    }

    constructor(workflowID?: WorkflowInstID) {
        super();
        this.workflowID = workflowID;
    }

    override onConfigure() {
        console.debug("Configured");
    }

    override onBeforeChange(graph: LGraph, info: any) {
        if (this.workflow != null)
            this.workflow.notifyModified()

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
        // Only root graphs will have a workflow ID, so we don't mind subgraphs
        // missing it
        if (node.getRootGraph() != null && !this._is_subgraph && this.workflowID != null) {
            const layoutState = get(layoutStates).all[this.workflowID]
            if (layoutState === null) {
                throw new Error(`LGraph with workflow missing layout! ${this.workflowID}`)
            }

            this.doAddNode(node, layoutState, options);
        }

        if (this.workflow != null)
            this.workflow.notifyModified()

        this.eventBus.emit("nodeAdded", node);
    }

    /*
     * Add widget UI/groups for newly added nodes.
     */
    private doAddNode(node: LGraphNode, layoutState: WritableLayoutStateStore, options: LGraphAddNodeOptions) {
        layoutState.nodeAdded(node, options)

        // All nodes whether they come from base litegraph or ComfyBox should
        // have tags added to them. Can't override serialization for litegraph's
        // base node types to add `tags` as a new field so putting it in
        // properties is better.
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
                            node.graph.add(widgetNode)
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

                layoutState.groupItems(dragItemIDs, { title: reg.title, variant: "accordion", openOnStartup: true })
            }
        }

        // Handle nodes in subgraphs being attached to this graph indirectly
        // ************** RECURSION ALERT ! **************
        if (node.is(Subgraph)) {
            for (const child of node.subgraph.iterateNodesInOrder()) {
                this.doAddNode(child, layoutState, options)
            }
        }
        // ************** RECURSION ALERT ! **************

        if (this.workflow != null)
            this.workflow.notifyModified()
    }

    override onNodeRemoved(node: LGraphNode, options: LGraphRemoveNodeOptions) {
        selectionState.clear(); // safest option

        if (!this._is_subgraph && this.workflowID != null) {
            const layoutState = get(layoutStates).all[this.workflowID]
            if (layoutState === null) {
                throw new Error(`ComfyGraph with workflow missing layout! ${this.workflowID}`)
            }

            layoutState.nodeRemoved(node, options);

            // Handle subgraphs being removed
            if (node.is(Subgraph)) {
                for (const child of node.subgraph.iterateNodesInOrder()) {
                    this.onNodeRemoved(child, options)
                }
            }
        }

        if (this.workflow != null)
            this.workflow.notifyModified()

        this.eventBus.emit("nodeRemoved", node);
    }

    override onInputsOutputsChange() {
        if (this.workflow != null)
            this.workflow.notifyModified()
    }

    override onNodeConnectionChange(kind: LConnectionKind, node: LGraphNode, slot: SlotIndex, targetNode: LGraphNode, targetSlot: SlotIndex) {
        if (this.workflow != null)
            this.workflow.notifyModified()

        // console.debug("ConnectionChange", node);
        this.eventBus.emit("nodeConnectionChanged", kind, node, slot, targetNode, targetSlot);
    }

    /*
     * Inserts a template.
     * Layout deserialization must be handled afterwards!
     */
    insertTemplate(template: SerializedComfyBoxTemplate, pos: Vector2): Record<NodeID, LGraphNode> {
        const minPos = calculateMinPosOfNodes(template.nodes);

        const templateNodeIDToNewNode: Record<NodeID, LGraphNode> = {}

        var nodes = [];
        for (var i = 0; i < template.nodes.length; ++i) {
            var node_data = template.nodes[i];
            var node = LiteGraph.createNode(node_data.type);

            let mapping: GraphIDMapping = null;
            if (node_data.type === "graph/subgraph") {
                mapping = reassignGraphIDs((node_data as any).subgraph as SerializedLGraph);
            }

            if (node) {
                const prevNodeId = node_data.id;
                node_data.id = uuidv4();
                templateNodeIDToNewNode[prevNodeId] = node

                node.configure(node_data);

                if (mapping) {
                    for (const subnode of (node as Subgraph).subgraph.iterateNodesInOrderRecursive()) {
                        const oldNodeID = mapping.nodeIDs[subnode.id];
                        templateNodeIDToNewNode[oldNodeID] = subnode;
                    }
                }

                node.pos[0] += pos[0] - minPos[0]; //+= 5;
                node.pos[1] += pos[1] - minPos[1]; //+= 5;

                this.add(node, { doProcessChange: false, addedBy: "template" as any });

                nodes.push(node);
            }
        }

        //create links
        for (var i = 0; i < template.links.length; ++i) {
            var link_info = template.links[i];
            var origin_node = templateNodeIDToNewNode[link_info[0]];
            var target_node = templateNodeIDToNewNode[link_info[2]];
            if (origin_node && target_node)
                origin_node.connect(link_info[1], target_node, link_info[3]);
            else
                console.error("[ComfyGraphCanvas] nodes missing on template insertion!", link_info);
        }

        this.afterChange();

        return templateNodeIDToNewNode;
    }
}
