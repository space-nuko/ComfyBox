import { LGraph, type INodeInputSlot, type SerializedLGraph, type LinkID, type UUID, type NodeID, LiteGraph, BuiltInSlotType, type SerializedLGraphNode, type Vector2, BuiltInSlotShape, type INodeOutputSlot } from "@litegraph-ts/core";
import type { SerializedAppState } from "./components/ComfyApp";
import layoutStates, { defaultWorkflowAttributes, type ContainerLayout, type DragItemID, type SerializedDragEntry, type SerializedLayoutState, type WritableLayoutStateStore } from "./stores/layoutStates";
import { ComfyWorkflow, type WorkflowAttributes } from "./stores/workflowState";
import type { SerializedGraphCanvasState } from "./ComfyGraphCanvas";
import ComfyApp from "./components/ComfyApp";
import { iterateNodeDefInputs } from "./ComfyNodeDef";
import type { ComfyNodeDefInput } from "./ComfyNodeDef";
import type IComfyInputSlot from "./IComfyInputSlot";
import ComfyWidgets from "./widgets"
import type { SerializedComfyWidgetNode } from "./nodes/widgets/ComfyWidgetNode";
import { v4 as uuidv4 } from "uuid"
import type ComfyWidgetNode from "./nodes/widgets/ComfyWidgetNode";
import { ComfyGalleryNode } from "./nodes/widgets";
import { countNewLines } from "./utils";

/*
 * The workflow type used by base ComfyUI
 */
export type ComfyVanillaWorkflow = SerializedLGraph;

/*
 * The settings for a widget converted to an input slot via the widgetInputs.js
 * frontend extension.
 */
type ComfyUIConvertedWidget = {
    name: string,
    config: ComfyNodeDefInput
}

interface IComfyUINodeInputSlot extends INodeInputSlot {
    widget?: ComfyUIConvertedWidget
}

/*
 * ComfyUI frontend nodes that should be converted directly to another type.
 */
const vanillaToComfyBoxNodeMapping: Record<string, string> = {
    "Reroute": "utils/reroute"
}

/*
 * Version of LGraphNode.getConnectionPos but for serialized nodes.
 * TODO handle other node types! (horizontal, hardcoded slot pos, collapsed...)
 */
function getConnectionPos(node: SerializedLGraphNode, is_input: boolean, slotNumber: number, out: Vector2 = [0, 0]): Vector2 {
    var offset = LiteGraph.NODE_SLOT_HEIGHT * 0.5;

    if (is_input) {
        out[0] = node.pos[0] + offset;
    } else {
        out[0] = node.pos[0] + node.size[0] + 1 - offset;
    }
    out[1] =
        node.pos[1] +
        (slotNumber + 0.7) * LiteGraph.NODE_SLOT_HEIGHT +
        ((node.constructor as any).slot_start_y || 0);
    return out;
}

function createSerializedWidgetNode(vanillaWorkflow: ComfyVanillaWorkflow, node: SerializedLGraphNode, slotIndex: number, isInput: boolean, widgetNodeType: string, value: any): [ComfyWidgetNode, SerializedComfyWidgetNode] {
    const comfyWidgetNode = LiteGraph.createNode<ComfyWidgetNode>(widgetNodeType);
    comfyWidgetNode.flags.collapsed = true;
    const size: Vector2 = [0, 0];

    // Compute collapsed size, since computeSize() ignores the collapsed flag
    // LiteGraph only computes it if the node is rendered
    const fontSize = LiteGraph.NODE_TEXT_SIZE;
    size[0] = Math.min(
        comfyWidgetNode.size[0],
        comfyWidgetNode.title.length * fontSize +
        LiteGraph.NODE_TITLE_HEIGHT * 2
    );

    const serWidgetNode = comfyWidgetNode.serialize() as SerializedComfyWidgetNode;
    serWidgetNode.comfyValue = value;
    serWidgetNode.shownOutputProperties = {};
    getConnectionPos(node, isInput, slotIndex, serWidgetNode.pos);
    if (isInput)
        serWidgetNode.pos[0] -= size[0] - 20;
    else
        serWidgetNode.pos[0] += 20;
    serWidgetNode.pos[1] += LiteGraph.NODE_TITLE_HEIGHT / 2;

    if (widgetNodeType === "ui/text" && typeof value === "string" && value.indexOf("\n") != -1) {
        const lineCount = countNewLines(value);
        serWidgetNode.properties.multiline = true;
        serWidgetNode.properties.lines = lineCount + 2
        serWidgetNode.properties.maxLines = lineCount + 2
    }

    vanillaWorkflow.nodes.push(serWidgetNode)

    return [comfyWidgetNode, serWidgetNode];
}

function connectSerializedNodes(vanillaWorkflow: ComfyVanillaWorkflow, originNode: SerializedLGraphNode, originSlot: number, targetNode: SerializedLGraphNode, targetSlot: number) {
    const connInput = targetNode.inputs[targetSlot]
    const connOutput = originNode.outputs[originSlot]
    const newLinkID = uuidv4();
    connInput.link = newLinkID
    connOutput.links ||= []
    connOutput.links.push(newLinkID);
    vanillaWorkflow.links ||= []
    vanillaWorkflow.links.push([newLinkID, originNode.id, originSlot, targetNode.id, targetSlot, connInput.type])
}

/*
 * Converts all the IDs in the serialized graph into UUID format
 */
function rewriteIDsInGraph(vanillaWorkflow: ComfyVanillaWorkflow) {
    const nodeIDs: Record<NodeID, UUID> = {};
    const linkIDs: Record<LinkID, UUID> = {};

    const getNodeID = (id: NodeID): UUID => {
        if (typeof id === "string")
            return id
        nodeIDs[id] ||= uuidv4();
        return nodeIDs[id];
    }

    const getLinkID = (id: LinkID): UUID => {
        if (typeof id === "string")
            return id
        linkIDs[id] ||= uuidv4();
        return linkIDs[id];
    }

    for (const node of vanillaWorkflow.nodes) {
        node.id = getNodeID(node.id);
        if (node.inputs != null) {
            for (const input of node.inputs) {
                if (input.link != null) {
                    input.link = getLinkID(input.link)
                }
            }
        }
        if (node.outputs != null) {
            for (const output of node.outputs) {
                if (output.links != null)
                    output.links = output.links.map(getLinkID);
            }
        }
    }

    for (const link of vanillaWorkflow.links) {
        link[0] = getLinkID(link[0])
        link[1] = getNodeID(link[1])
        link[3] = getNodeID(link[3])
    }


    // Recurse!
    for (const node of vanillaWorkflow.nodes) {
        if (node.type === "graph/subgraph") {
            rewriteIDsInGraph((node as any).subgraph as SerializedLGraph)
        }
    }
}

export default function convertVanillaWorkflow(vanillaWorkflow: ComfyVanillaWorkflow, attrs: WorkflowAttributes): [ComfyWorkflow, WritableLayoutStateStore] {
    const [comfyBoxWorkflow, layoutState] = ComfyWorkflow.create();
    const { root, left, right } = layoutState.initDefaultLayout();

    // TODO will need to convert IDs to UUIDs
    const idToUUID: Record<NodeID | LinkID, UUID> = {}

    rewriteIDsInGraph(vanillaWorkflow);

    for (const [id, node] of Object.entries(vanillaWorkflow.nodes)) {
        const newType = vanillaToComfyBoxNodeMapping[node.type];
        if (newType != null) {
            node.type = newType;
        }

        // renamed field
        const bgcolor = (node as any).bgcolor
        if (bgcolor != null)
            node.bgColor ||= bgcolor

        node.color ||= LiteGraph.NODE_DEFAULT_COLOR;
        node.bgColor ||= LiteGraph.NODE_DEFAULT_BGCOLOR;

        // ComfyUI uses widgets on the node itself to change values. These are
        // all made into input/output slots in ComfyBox. So we must convert
        // serialized widgets into ComfyWidgetNodes, add new inputs/outputs,
        // then attach the new nodes to the slots

        const def = ComfyApp.knownBackendNodes[node.type];
        if (def == null) {
            console.error("Unknown backend node", node.type)
            continue;
        }

        // Lazily create group in case there are no inputs
        let group: ContainerLayout | null = null;

        // TODO needs to be generalized!
        let isOutputNode = ["PreviewImage", "SaveImage"].indexOf(node.type) !== -1

        for (const [inputName, [inputType, inputOpts]] of iterateNodeDefInputs(def.nodeDef)) {
            // Detect if this input was a widget converted to an input
            const convertedWidget = node.inputs?.find((i: IComfyUINodeInputSlot) => {
                return i.widget?.name === inputName;
            })

            if (convertedWidget != null) {
                // This input is an extra input slot on the node that should be
                // accounted for.
                const [value] = node.widgets_values.splice(0, 1);
            }
            else {
                // This input is a widget, it should be converted to an input
                // connected to a ComfyWidgetNode.

                let widgetNodeType = null;
                let widgetInputType = null;

                if (Array.isArray(inputType)) {
                    // Combo options of string[]
                    widgetInputType = "string"
                    widgetNodeType = "ui/combo";
                }
                else if (inputType in ComfyWidgets) {
                    // Widget type
                    const widgetFactory = ComfyWidgets[inputType]
                    widgetInputType = widgetFactory.inputType
                    widgetNodeType = widgetFactory.nodeType;
                }
                else if ("${inputType}:{inputName}" in ComfyWidgets) {
                    // Widget type override for input of type with given name ("seed", "noise_seed")
                    const widgetFactory = ComfyWidgets["${inputType}:{inputName}"]
                    widgetInputType = widgetFactory.inputType
                    widgetNodeType = widgetFactory.nodeType;
                }
                else {
                    // Backend type, we can safely ignore this
                    continue
                }

                const newInput: IComfyInputSlot = {
                    name: inputName,
                    link: null,
                    type: widgetInputType,
                    config: inputOpts,
                    defaultWidgetNode: null,
                    widgetNodeType,
                    serialize: true,
                    properties: {}
                }

                node.inputs ||= []
                node.inputs.push(newInput);
                const connInputIndex = node.inputs.length - 1;

                // Now get the widget value.
                const [value] = node.widgets_values.splice(0, 1);

                const [comfyWidgetNode, serWidgetNode] = createSerializedWidgetNode(
                    vanillaWorkflow,
                    node,
                    connInputIndex,
                    true,
                    widgetNodeType,
                    value);

                switch (widgetNodeType) {
                    case "ui/number":
                        serWidgetNode.properties.min = inputOpts?.min || 0;
                        serWidgetNode.properties.max = inputOpts?.max || 100;
                        serWidgetNode.properties.step = inputOpts?.step || 1;
                        break;
                    case "ui/text":
                        serWidgetNode.properties.multiline = inputOpts?.multiline || false;
                        break;
                }

                if (group == null)
                    group = layoutState.addContainer(isOutputNode ? right : left, { title: node.title || node.type })

                const widget = layoutState.addWidget(group, comfyWidgetNode)
                widget.attrs.title = inputName;

                const connOutputIndex = serWidgetNode.outputs?.findIndex(o => o.name === comfyWidgetNode.outputSlotName)
                if (connOutputIndex != null) {
                    connectSerializedNodes(vanillaWorkflow, serWidgetNode, connOutputIndex, node, connInputIndex)
                }
                else {
                    console.error("[convertVanillaWorkflow] No output to connect converted widget into!", comfyWidgetNode.outputSlotName, node)
                }
            }
        }

        // Add OUTPUT event slot to output nodes
        // TODO needs to be generalized!
        if (isOutputNode) {
            const newOutput: INodeOutputSlot = {
                name: "OUTPUT",
                type: BuiltInSlotType.EVENT,
                color_off: "rebeccapurple",
                color_on: "rebeccapurple",
                shape: BuiltInSlotShape.BOX_SHAPE,
                links: [],
                properties: {},
            }
            node.outputs ||= []
            node.outputs.push(newOutput)
            const connOutputIndex = node.outputs.length - 1;

            // Let's create a gallery for this output node and hook it up
            const [comfyGalleryNode, serGalleryNode] = createSerializedWidgetNode(
                vanillaWorkflow,
                node,
                connOutputIndex,
                false,
                "ui/gallery",
                []);

            if (group == null)
                group = layoutState.addContainer(isOutputNode ? right : left, { title: node.title || node.type })

            const widget = layoutState.addWidget(group, comfyGalleryNode)
            widget.attrs.title = "Output"

            const connInputIndex = serGalleryNode.inputs?.findIndex(o => o.name === comfyGalleryNode.storeActionName)
            if (connInputIndex != null) {
                connectSerializedNodes(vanillaWorkflow, node, connOutputIndex, serGalleryNode, connInputIndex)
            }
            else {
                console.error("[convertVanillaWorkflow] No input to connect gallery widget into!", comfyGalleryNode.storeActionName, node)
            }
        }
    }

    const layout = layoutState.serialize();
    comfyBoxWorkflow.deserialize(layoutState, { graph: vanillaWorkflow, attrs, layout })

    return [comfyBoxWorkflow, layoutState]
}
