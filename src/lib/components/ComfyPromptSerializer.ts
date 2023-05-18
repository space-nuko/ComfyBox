import type ComfyGraph from "$lib/ComfyGraph";
import type { ComfyBackendNode } from "$lib/nodes/ComfyBackendNode";
import type ComfyGraphNode from "$lib/nodes/ComfyGraphNode";
import { GraphInput, GraphOutput, LGraph, LGraphNode, LLink, NodeMode, Subgraph, type SlotIndex } from "@litegraph-ts/core";
import type { SerializedPrompt, SerializedPromptInput, SerializedPromptInputs, SerializedPromptInputsAll } from "./ComfyApp";
import type IComfyInputSlot from "$lib/IComfyInputSlot";

function hasTag(node: LGraphNode, tag: string): boolean {
    return "tags" in node.properties && node.properties.tags.indexOf(tag) !== -1
}

function isGraphInputOutput(node: LGraphNode): boolean {
    return node.is(GraphInput) || node.is(GraphOutput)
}

export function isActiveNode(node: LGraphNode, tag: string | null = null): boolean {
    if (!node)
        return false;

    // Check tags but not on graph inputs/outputs
    if (!isGraphInputOutput(node) && (tag && !hasTag(node, tag))) {
        console.debug("Skipping tagged node", tag, node.properties.tags, node)
        return false;
    }

    if (node.mode !== NodeMode.ALWAYS) {
        // Don't serialize muted nodes
        return false;
    }

    return true;
}

export function isActiveBackendNode(node: LGraphNode, tag: string | null = null): node is ComfyBackendNode {
    if (!(node as any).isBackendNode)
        return false;

    return isActiveNode(node, tag);
}

export class UpstreamNodeLocator {
    constructor(private isTheTargetNode: (node: LGraphNode) => boolean) {
    }

    private followSubgraph(subgraph: Subgraph, link: LLink): [LGraph | null, LLink | null] {
        if (link.origin_id != subgraph.id)
            throw new Error("Invalid link and graph output!")

        const innerGraphOutput = subgraph.getInnerGraphOutputByIndex(link.origin_slot)
        if (innerGraphOutput == null)
            throw new Error("No inner graph input!")

        const nextLink = innerGraphOutput.getInputLink(0)
        return [innerGraphOutput.graph, nextLink];
    }

    private followGraphInput(graphInput: GraphInput, link: LLink): [LGraph | null, LLink | null] {
        if (link.origin_id != graphInput.id)
            throw new Error("Invalid link and graph input!")

        const outerSubgraph = graphInput.getParentSubgraph();
        if (outerSubgraph == null)
            throw new Error("No outer subgraph!")

        const outerInputIndex = outerSubgraph.inputs.findIndex(i => i.name === graphInput.nameInGraph)
        if (outerInputIndex == null)
            throw new Error("No outer input slot!")

        const nextLink = outerSubgraph.getInputLink(outerInputIndex)
        return [outerSubgraph.graph, nextLink];
    }

    private getUpstreamLink(parent: LGraphNode, currentLink: LLink): [LGraph | null, LLink | null] {
        if (parent.is(Subgraph)) {
            console.debug("FollowSubgraph")
            return this.followSubgraph(parent, currentLink);
        }
        else if (parent.is(GraphInput)) {
            console.debug("FollowGraphInput")
            return this.followGraphInput(parent, currentLink);
        }
        else if ("getUpstreamLink" in parent) {
            return [parent.graph, (parent as ComfyGraphNode).getUpstreamLink()];
        }
        else if (parent.inputs.length === 1) {
            // Only one input, so assume we can follow it backwards.
            const link = parent.getInputLink(0);
            if (link) {
                return [parent.graph, link]
            }
        }
        console.warn("[graphToPrompt] Frontend node does not support getUpstreamLink", parent.type)
        return [null, null];
    }

    /*
     * Traverses the graph upstream from outputs towards inputs across
     * a sequence of nodes dependent on a condition.
     *
     * Returns the node and the output link attached to it that leads to the
     * starting node if any.
     */
    locateUpstream(fromNode: LGraphNode, inputIndex: SlotIndex, tag: string | null): [LGraphNode | null, LLink | null] {
        let parent = fromNode.getInputNode(inputIndex);
        if (!parent)
            return [null, null];

        const seen = {}
        let currentLink = fromNode.getInputLink(inputIndex);

        const shouldFollowParent = (parent: LGraphNode) => {
            return isActiveNode(parent, tag) && !this.isTheTargetNode(parent);
        }

        // If there are non-target nodes between us and another
        // target node, we have to traverse them first. This
        // behavior is dependent on the type of node. Reroute nodes
        // will simply follow their single input, while branching
        // nodes have conditional logic that determines which link
        // to follow backwards.
        while (shouldFollowParent(parent)) {
            const [nextGraph, nextLink] = this.getUpstreamLink(parent, currentLink);

            if (nextLink == null) {
                console.warn("[graphToPrompt] No upstream link found in frontend node", parent)
                break;
            }

            if (nextLink && !seen[nextLink.id]) {
                seen[nextLink.id] = true
                const nextParent = nextGraph.getNodeById(nextLink.origin_id);
                if (!isActiveNode(parent, tag)) {
                    parent = null;
                }
                else {
                    console.debug("[graphToPrompt] Traverse upstream link", parent.id, nextParent?.id, (nextParent as any)?.isBackendNode)
                    currentLink = nextLink;
                    parent = nextParent;
                }
            } else {
                parent = null;
            }
        }

        if (!isActiveNode(parent, tag) || !this.isTheTargetNode(parent) || currentLink == null)
            return [null, null];

        return [parent, currentLink]
    }
}

export default class ComfyPromptSerializer {
    serializeInputValues(node: ComfyBackendNode): Record<string, SerializedPromptInput> {
        // Store input values passed by frontend-only nodes
        if (!node.inputs) {
            return {}
        }

        const inputs = {}

        for (let i = 0; i < node.inputs.length; i++) {
            const inp = node.inputs[i];
            const inputLink = node.getInputLink(i)
            const inputNode = node.getInputNode(i)

            // We don't check tags for non-backend nodes.
            // Just check for node inactivity (so you can toggle groups of
            // tagged frontend nodes on/off)
            if (inputNode && inputNode.mode === NodeMode.NEVER) {
                console.debug("Skipping inactive node", inputNode)
                continue;
            }

            if (!inputLink || !inputNode) {
                if ("config" in inp) {
                    const defaultValue = (inp as IComfyInputSlot).config?.defaultValue
                    if (defaultValue !== null && defaultValue !== undefined)
                        inputs[inp.name] = defaultValue
                }
                continue;
            }

            let serialize = true;
            if ("config" in inp)
                serialize = (inp as IComfyInputSlot).serialize

            let isBackendNode = node.isBackendNode;
            let isInputBackendNode = false;
            if ("isBackendNode" in inputNode)
                isInputBackendNode = (inputNode as ComfyGraphNode).isBackendNode;

            // The reasoning behind this check:
            // We only want to serialize inputs to nodes with backend equivalents.
            // And in ComfyBox, the backend nodes in litegraph *never* have widgets, instead they're all inputs.
            // All values are passed by separate frontend-only nodes,
            // either UI-bound or something like ConstantInteger.
            // So we know that any value passed into a backend node *must* come from
            // a frontend node.
            // The rest (links between backend nodes) will be serialized after this bit runs.
            if (serialize && isBackendNode && !isInputBackendNode) {
                inputs[inp.name] = inputLink.data
            }
        }

        return inputs
    }

    serializeBackendLinks(node: ComfyBackendNode, tag: string | null): Record<string, SerializedPromptInput> {
        const inputs = {}

        // Find a backend node upstream following before any number of frontend nodes
        const test = (node: LGraphNode) => (node as any).isBackendNode
        const nodeLocator = new UpstreamNodeLocator(test)

        // Store links between backend-only and hybrid nodes
        for (let i = 0; i < node.inputs.length; i++) {
            const [backendNode, linkLeadingTo] = nodeLocator.locateUpstream(node, i, tag)
            if (backendNode) {
                console.debug("[graphToPrompt] final link", backendNode.id, "-->", node.id)
                const input = node.inputs[i]
                if (!(input.name in inputs))
                    inputs[input.name] = [String(linkLeadingTo.origin_id), linkLeadingTo.origin_slot];
            }
            else {
                console.warn("[graphToPrompt] Didn't find upstream link!", node.id, node.type, node.title)
            }
        }

        return inputs
    }

    serialize(graph: ComfyGraph, tag: string | null = null): SerializedPrompt {
        // Run frontend-only logic
        graph.runStep(1)

        const workflow = graph.serialize();

        const output: SerializedPromptInputsAll = {};

        // Process nodes in order of execution
        for (const node of graph.computeExecutionOrderRecursive<ComfyGraphNode>(false, null)) {
            const n = workflow.nodes.find((n) => n.id === node.id);

            if (!isActiveBackendNode(node, tag)) {
                continue;
            }

            const inputs = this.serializeInputValues(node);
            const links = this.serializeBackendLinks(node, tag);

            output[String(node.id)] = {
                inputs: { ...inputs, ...links },
                class_type: node.comfyClass,
            };
        }

        // Remove inputs connected to removed nodes
        for (const nodeId in output) {
            for (const inputName in output[nodeId].inputs) {
                if (Array.isArray(output[nodeId].inputs[inputName])
                    && output[nodeId].inputs[inputName].length === 2
                    && !output[output[nodeId].inputs[inputName][0]]) {
                    console.debug("Prune removed node link", nodeId, inputName, output[nodeId].inputs[inputName])
                    delete output[nodeId].inputs[inputName];
                }
            }
        }

        // console.debug({ workflow, output })
        // console.debug(promptToGraphVis({ workflow, output }))

        return { workflow, output };
    }
}
