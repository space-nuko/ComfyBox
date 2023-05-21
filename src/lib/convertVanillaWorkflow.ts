import { LGraph, type INodeInputSlot, type SerializedLGraph, type LinkID, type UUID, type NodeID, LiteGraph, BuiltInSlotType, type SerializedLGraphNode, type Vector2, BuiltInSlotShape, type INodeOutputSlot } from "@litegraph-ts/core";
import type { SerializedAppState } from "./components/ComfyApp";
import layoutStates, { defaultWorkflowAttributes, type DragItemID, type SerializedDragEntry, type SerializedLayoutState } from "./stores/layoutStates";
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
 *
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

    // Compute collapsed size, sinze computeSize() ignores the collapsed flag
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

export default function convertVanillaWorkflow(vanillaWorkflow: ComfyVanillaWorkflow, attrs: WorkflowAttributes): ComfyWorkflow {
    const [comfyBoxWorkflow, layoutState] = ComfyWorkflow.create();
    const { root, left, right } = layoutState.initDefaultLayout();

    // TODO will need to convert IDs to UUIDs
    const idToUUID: Record<NodeID | LinkID, UUID> = {}

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

                if (group == null)
                    group = layoutState.addContainer(isOutputNode ? right : left, { title: node.title || node.type })

                layoutState.addWidget(group, comfyWidgetNode)

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

            layoutState.addWidget(group, comfyGalleryNode)

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

    for (const node of comfyBoxWorkflow.graph.iterateNodesInOrder()) {
        if ((node as any).isBackendNode) {
            console.warn("BENDNODE", node)
        }
    }

    return comfyBoxWorkflow
}
