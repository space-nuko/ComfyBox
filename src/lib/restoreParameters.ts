import type { INodeInputSlot, NodeID, SerializedLGraph, SerializedLGraphNode } from "@litegraph-ts/core";
import type { SerializedPrompt } from "./components/ComfyApp";
import type { ComfyWidgetNode } from "./nodes/widgets";
import type { SerializedComfyWidgetNode } from "./nodes/widgets/ComfyWidgetNode";
import { isComfyWidgetNode, type SerializedLayoutState } from "./stores/layoutStates";
import type { ComfyBoxWorkflow } from "./stores/workflowState";
import { isSerializedPromptInputLink } from "./utils";
import ComfyBoxStdPromptSerializer from "./ComfyBoxStdPromptSerializer";

export type RestoreParamType = "workflow" | "backend" | "stdPrompt";

/*
 * Data of a parameter that can be restored. Paired with a parameter name.
 */
export interface RestoreParamSource<T extends RestoreParamType = any> {
    type: T,

    /*
     * A human-readable name for this parameter
     */
    name?: string,

    /*
     * LiteGraph type of the widget node
     */
    nodeType: string,

    /*
     * The actual value to copy to the widget after all conversions have been
     * applied.
     */
    finalValue: any
}

/*
 * A serialized ComfyWidgetNode from the saved workflow that corresponds
 * *exactly* to a node with the same ID in the current workflow. Easiest case
 * since the parameter value can just be copied without much fuss.
 */
export interface RestoreParamSourceWorkflowNode extends RestoreParamSource<"workflow"> {
    type: "workflow",

    prevValue?: any
}

export type RestoreParamWorkflowNodeTargets = Record<NodeID, RestoreParamSourceWorkflowNode>

/*
 * A value received by the ComfyUI *backend* that corresponds to a value that
 * was held in a ComfyWidgetNode. These may not necessarily be one-to-one
 * because there can be extra frontend-only processing nodes between the two.
 *
 * (Example: a node that converts a random prompt template into a final prompt
 * string, then passes *that* prompt string to the backend. The backend will not
 * see the template string, so it will be missing in the arguments to ComfyUI's
 * prompt endpoint. Hence this parameter source won't account for those kinds of
 * values.)
 */
export interface RestoreParamSourceBackendNodeInput extends RestoreParamSource<"backend"> {
    type: "backend",

    backendNode: SerializedComfyWidgetNode,

    /*
     * If false, this node was connected to the backend node across one or more
     * additional frontend nodes, so the value in the source may not correspond
     * exactly to the widget's original value
     */
    isDirectAttachment: boolean
}

/*
 * A value contained in the standard prompt extracted from the saved workflow.
 *
 * This should only be necessary to fall back on if one workflow's parameters
 * are to be used in a completely separate workflow's.
 */
export interface RestoreParamSourceStdPrompt<T, K extends keyof T> extends RestoreParamSource<"stdPrompt"> {
    type: "stdPrompt",

    /*
     * Name of the group containing the value to pass
     *
     * "lora"
     */
    groupName: string,

    /*
     * The standard prompt group containing the value and metadata like
     * "positive"/"negative" for identification use
     *
     * { "$meta": { ... }, model_name: "...", model_hashes: [...], ... }
     */
    group: T,

    /*
     * Key of the group parameter holding the actual value

     * "model_name"
     */
    key: K,

    /*
     * The raw value as saved to the prompt, not accounting for stuff like hashes
     *
     * "contrastFix"
     */
    rawValue: T[K]

    /*
     * The *actual* value that will be copied into the ComfyWidgetNode, after
     * conversion to account for filepaths/etc. from prompt adapters has been
     * completed
     *
     * "models/lora/contrastFix.safetensors"
     */
    finalValue: any
}

export type RestoreParamTargets = Record<NodeID, RestoreParamSource[]>

function isSerializedComfyWidgetNode(param: any): param is SerializedComfyWidgetNode {
    return param != null && typeof param === "object" && "id" in param && "comfyValue" in param
}

function findUpstreamSerializedWidgetNode(prompt: SerializedPrompt, input: INodeInputSlot): [SerializedComfyWidgetNode | null, boolean | null] {
    let linkID = input.link;
    let isDirectAttachment = true;

    while (linkID) {
        const link = prompt.workflow.links[linkID]
        if (link == null)
            return [null, null];

        const originNode = prompt.workflow.nodes.find(n => n.id === link[1])
        if (isSerializedComfyWidgetNode(originNode))
            return [originNode, isDirectAttachment]

        isDirectAttachment = false;

        // TODO: getUpstreamLink() for serialized nodes?
        if (originNode.inputs && originNode.inputs.length === 1)
            linkID = originNode.inputs[0].link
        else
            linkID = null;
    }

    return [null, null];
}

const addSource = (result: RestoreParamTargets, targetNode: ComfyWidgetNode, source: RestoreParamSource) => {
    result[targetNode.id] ||= []
    result[targetNode.id].push(source);
}

export function concatRestoreParams(a: RestoreParamTargets, b: Record<NodeID, RestoreParamSource>): RestoreParamTargets {
    for (const [targetNodeID, source] of Object.entries(b)) {
        a[targetNodeID] ||= []
        a[targetNodeID].push(source);
    }
    return a;
}

export function concatRestoreParams2(a: RestoreParamTargets, b: RestoreParamTargets): RestoreParamTargets {
    for (const [targetNodeID, vs] of Object.entries(b)) {
        a[targetNodeID] ||= []
        for (const source of vs) {
            a[targetNodeID].push(source);
        }
    }
    return a;
}

/*
 * Like getWorkflowRestoreParams but applies to an instanced (non-serialized) workflow
 */
export function getWorkflowRestoreParamsFromWorkflow(workflow: ComfyBoxWorkflow, noExclude: boolean = false): RestoreParamWorkflowNodeTargets {
    const result = {}

    for (const node of workflow.graph.iterateNodesInOrderRecursive()) {
        if (!isComfyWidgetNode(node))
            continue;

        if (!noExclude && node.properties.excludeFromJourney)
            continue;

        let name = null;
        const realNode = workflow.graph.getNodeByIdRecursive(node.id);
        if (realNode != null && isComfyWidgetNode(realNode)) {
            name = realNode.title || name;
            const widget = realNode.dragItem;
            if (widget != null) {
                name = widget.attrs.title || name;
            }
        }

        const finalValue = node.getValue();
        if (finalValue != null) {
            const source: RestoreParamSourceWorkflowNode = {
                type: "workflow",
                nodeType: node.type,
                name,
                finalValue,
            }
            result[node.id] = source;
        }
    }

    return result
}

export function getWorkflowRestoreParams(serGraph: SerializedLGraph, workflow?: ComfyBoxWorkflow, noExclude: boolean = false): RestoreParamWorkflowNodeTargets {
    const result = {}

    for (const node of serGraph.nodes) {
        if (!isSerializedComfyWidgetNode(node))
            continue;

        if (!noExclude && node.properties.excludeFromJourney)
            continue;

        let name = null;
        const realNode = workflow.graph.getNodeByIdRecursive(node.id);
        if (realNode != null && isComfyWidgetNode(realNode)) {
            name = realNode.title || name;
            const widget = realNode.dragItem;
            if (widget != null) {
                name = widget.attrs.title || name;
            }
        }

        const finalValue = node.comfyValue
        if (finalValue != null) {
            const source: RestoreParamSourceWorkflowNode = {
                type: "workflow",
                nodeType: node.type,
                name,
                prevValue: finalValue,
                finalValue,
            }
            result[node.id] = source;
        }
    }

    return result
}

function* iterateSerializedNodesRecursive(serGraph: SerializedLGraph): Iterable<SerializedLGraphNode> {
    for (const serNode of serGraph.nodes) {
        yield serNode;

        if (serNode.type === "graph/subgraph") {
            for (const childNode of iterateSerializedNodesRecursive((serNode as any).subgraph)) {
                yield childNode;
            }
        }
    }
}

export function getWorkflowRestoreParamsUsingLayout(serGraph: SerializedLGraph, layout?: SerializedLayoutState, noExclude: boolean = false): RestoreParamWorkflowNodeTargets {
    const result = {}

    for (const serNode of iterateSerializedNodesRecursive(serGraph)) {
        if (!isSerializedComfyWidgetNode(serNode)) {
            continue;
        }

        if (!noExclude && serNode.properties.excludeFromJourney) {
            continue;
        }

        let name = null;
        const serWidget = Array.from(Object.values(layout?.allItems || {})).find(di => di.dragItem.type === "widget" && di.dragItem.nodeId === serNode.id)
        if (serWidget) {
            name = serWidget.dragItem.attrs.title;
        }

        const finalValue = serNode.comfyValue
        if (finalValue != null) {
            const source: RestoreParamSourceWorkflowNode = {
                type: "workflow",
                nodeType: serNode.type,
                name,
                finalValue,
            }
            result[serNode.id] = source;
        }
    }

    return result
}

export function getBackendRestoreParams(workflow: ComfyBoxWorkflow, prompt: SerializedPrompt): Record<NodeID, RestoreParamSourceBackendNodeInput[]> {
    const result = {}

    const graph = workflow.graph;

    // Figure out what parameters the backend received. If there was a widget
    // node attached to a backend node's input upstream, then we can use that
    // value.
    for (const [serNodeID, inputs] of Object.entries(prompt.output)) {
        const serNode = prompt.workflow.nodes.find(sn => sn.id === serNodeID)
        if (serNode == null)
            continue;

        for (const [inputName, inputValue] of Object.entries(inputs)) {
            const input = serNode.inputs.find(i => i.name === inputName);
            if (input == null)
                continue;

            if (isSerializedPromptInputLink(inputValue))
                continue;

            const [originNode, isDirectAttachment] = findUpstreamSerializedWidgetNode(prompt, input)

            if (originNode) {
                const foundNode = graph.getNodeByIdRecursive(serNode.id);
                if (isComfyWidgetNode(foundNode) && foundNode.type === serNode.type) {
                    const source: RestoreParamSourceBackendNodeInput = {
                        type: "backend",
                        nodeType: foundNode.type,
                        finalValue: inputValue,
                        backendNode: serNode,
                        isDirectAttachment
                    }
                    addSource(result, foundNode, source)
                }
            }
        }
    }

    return result
}

export default function getRestoreParameters(workflow: ComfyBoxWorkflow, prompt: SerializedPrompt): RestoreParamTargets {
    const result = {}

    const workflowParams = getWorkflowRestoreParams(prompt.workflow, workflow);
    concatRestoreParams(result, workflowParams);

    const backendParams = getBackendRestoreParams(workflow, prompt);
    concatRestoreParams2(result, backendParams);

    // Step 3: Extract the standard prompt from the workflow and use that to
    // infer parameter types

    // TODO

    // const serializer = new ComfyBoxStdPromptSerializer();
    // const stdPrompt = serializer.serialize(prompt);

    // const allWidgetNodes = Array.from(graph.iterateNodesInOrderRecursive()).filter(isComfyWidgetNode);

    // for (const widgetNode of allWidgetNodes) {

    // }

    // for (const [groupName, groups] of Object.entries(stdPrompt)) {
    // }

    return result;
}
