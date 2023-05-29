import type { INodeInputSlot, NodeID } from "@litegraph-ts/core";
import type { SerializedPrompt } from "./components/ComfyApp";
import type { ComfyWidgetNode } from "./nodes/widgets";
import type { SerializedComfyWidgetNode } from "./nodes/widgets/ComfyWidgetNode";
import { isComfyWidgetNode } from "./stores/layoutStates";
import type { ComfyBoxWorkflow } from "./stores/workflowState";
import { isSerializedPromptInputLink } from "./utils";
import ComfyBoxStdPromptSerializer from "./ComfyBoxStdPromptSerializer";

interface RestoreParamSource {
    finalValue: any
}

/*
 * A serialized ComfyWidgetNode from the saved workflow that corresponds
 * *exactly* to a node with the same ID in the current workflow. Easiest case
 * since the parameter value can just be copied without much fuss.
 */
interface RestoreParamSourceWorkflowNode extends RestoreParamSource {
    sourceNode: SerializedComfyWidgetNode
}

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
interface RestoreParamSourceBackendNodeInput extends RestoreParamSource {
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
 */
interface RestoreParamSourceStdPrompt<T, K extends keyof T> extends RestoreParamSource {
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

export type RestoreParamTarget = {
    /*
     * Node that will receive the parameter from the prompt
     */
    targetNode: ComfyWidgetNode;

    /*
     * Possible sources of values to insert into the target node
     */
    sources: RestoreParamSource[]
}

export type RestoreParamTargets = Record<NodeID, RestoreParamTarget>

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

export default function restoreParameters(workflow: ComfyBoxWorkflow, prompt: SerializedPrompt): RestoreParamTargets {
    const result = {}

    const addSource = (targetNode: ComfyWidgetNode, source: RestoreParamSource) => {
        result[targetNode.id] ||= { targetNode, sources: [] }
        result[targetNode.id].sources.push(source);
    }

    const graph = workflow.graph;

    // Step 1: Find nodes that correspond to *this* workflow exactly, since we
    // can easily match up the nodes between each (their IDs will be the same)
    for (const serNode of prompt.workflow.nodes) {
        const foundNode = graph.getNodeByIdRecursive(serNode.id);
        if (isComfyWidgetNode(foundNode) && foundNode.type === serNode.type) {
            const finalValue = (serNode as SerializedComfyWidgetNode).comfyValue;
            if (finalValue != null) {
                const source: RestoreParamSourceWorkflowNode = {
                    finalValue,
                    sourceNode: serNode
                }
                addSource(foundNode, source)
            }
        }
    }

    // Step 2: Figure out what parameters the backend received. If there was a
    // widget node attached to a backend node's input upstream, then we can
    // use that value.
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
                        finalValue: inputValue,
                        backendNode: serNode,
                        isDirectAttachment
                    }
                    addSource(foundNode, source)
                }
            }
        }
    }

    // Step 3: Extract the standard prompt from the workflow and use that to
    // infer parameter types

    const serializer = new ComfyBoxStdPromptSerializer();
    const stdPrompt = serializer.serialize(prompt);

    const allWidgetNodes = Array.from(graph.iterateNodesInOrderRecursive()).filter(isComfyWidgetNode);

    for (const widgetNode of allWidgetNodes) {

    }

    // for (const [groupName, groups] of Object.entries(stdPrompt)) {
    // }

    return result;
}
