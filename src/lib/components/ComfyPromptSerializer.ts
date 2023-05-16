import type ComfyGraph from "$lib/ComfyGraph";
import type { ComfyBackendNode } from "$lib/nodes/ComfyBackendNode";
import type ComfyGraphNode from "$lib/nodes/ComfyGraphNode";
import { GraphInput, GraphOutput, LGraph, LGraphNode, LLink, NodeMode, Subgraph } from "@litegraph-ts/core";
import type { SerializedPrompt, SerializedPromptInput, SerializedPromptInputs, SerializedPromptInputsAll } from "./ComfyApp";
import type IComfyInputSlot from "$lib/IComfyInputSlot";

function hasTag(node: LGraphNode, tag: string): boolean {
    return "tags" in node.properties && node.properties.tags.indexOf(tag) !== -1
}

function isActiveBackendNode(node: ComfyGraphNode, tag: string | null): node is ComfyBackendNode {
    if (!node.isBackendNode)
        return false;

    if (tag && !hasTag(node, tag)) {
        console.debug("Skipping tagged node", tag, node.properties.tags, node)
        return false;
    }

    if (node.mode === NodeMode.NEVER) {
        // Don't serialize muted nodes
        return false;
    }

    return true;
}

function followSubgraph(subgraph: Subgraph, link: LLink): [LGraph | null, LLink | null] {
    if (link.origin_id != subgraph.id)
        throw new Error("A!")

    const innerGraphOutput = subgraph.getInnerGraphOutputByIndex(link.origin_slot)
    if (innerGraphOutput == null)
        throw new Error("No inner graph input!")

    const nextLink = innerGraphOutput.getInputLink(0)
    return [innerGraphOutput.graph, nextLink];
}

function followGraphInput(graphInput: GraphInput, link: LLink): [LGraph | null, LLink | null] {
    if (link.origin_id != graphInput.id)
        throw new Error("A!")

    const outerSubgraph = graphInput.getParentSubgraph();
    if (outerSubgraph == null)
        throw new Error("No outer subgraph!")

    const outerInputIndex = outerSubgraph.inputs.findIndex(i => i.name === graphInput.nameInGraph)
    if (outerInputIndex == null)
        throw new Error("No outer input slot!")

    const nextLink = outerSubgraph.getInputLink(outerInputIndex)
    return [outerSubgraph.graph, nextLink];
}

function getUpstreamLink(parent: LGraphNode, currentLink: LLink): [LGraph | null, LLink | null] {
    if (parent.is(Subgraph)) {
        console.warn("FollowSubgraph")
        return followSubgraph(parent, currentLink);
    }
    else if (parent.is(GraphInput)) {
        console.warn("FollowGraphInput")
        return followGraphInput(parent, currentLink);
    }
    else if ("getUpstreamLink" in parent) {
        return [parent.graph, (parent as ComfyGraphNode).getUpstreamLink()];
    }
    console.warn("[graphToPrompt] Node does not support getUpstreamLink", parent.type)
    return [null, null];
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

        // Store links between backend-only and hybrid nodes
        for (let i = 0; i < node.inputs.length; i++) {
            let parent = node.getInputNode(i);
            if (parent) {
                const seen = {}
                let currentLink = node.getInputLink(i);

                const isFrontendParent = (parent: LGraphNode) => {
                    if (!parent || (parent as any).isBackendNode)
                        return false;
                    if (tag && !hasTag(parent, tag))
                        return false;
                    return true;
                }

                // If there are frontend-only nodes between us and another
                // backend node, we have to traverse them first. This
                // behavior is dependent on the type of node. Reroute nodes
                // will simply follow their single input, while branching
                // nodes have conditional logic that determines which link
                // to follow backwards.
                while (isFrontendParent(parent)) {
                    const [nextGraph, nextLink] = getUpstreamLink(parent, currentLink);

                    if (nextLink == null) {
                        console.warn("[graphToPrompt] No upstream link found in frontend node", parent)
                        break;
                    }

                    if (nextLink && !seen[nextLink.id]) {
                        seen[nextLink.id] = true
                        const nextParent = nextGraph.getNodeById(nextLink.origin_id);
                        if (nextParent && tag && !hasTag(nextParent, tag)) {
                            console.debug("[graphToPrompt] Skipping tagged intermediate frontend node", tag, node.properties.tags)
                            parent = null;
                        }
                        else {
                            console.debug("[graphToPrompt] Traverse upstream link", parent.id, nextParent?.id, nextParent?.isBackendNode)
                            currentLink = nextLink;
                            parent = nextParent;
                        }
                    } else {
                        parent = null;
                    }
                }

                if (currentLink && parent && (parent as any).isBackendNode) {
                    if (tag && !hasTag(parent, tag))
                        continue;

                    console.debug("[graphToPrompt] final link", parent.id, node.id)
                    const input = node.inputs[i]
                    // TODO can null be a legitimate value in some cases?
                    // Nodes like CLIPLoader will never have a value in the frontend, hence "null".
                    if (!(input.name in inputs))
                        inputs[input.name] = [String(currentLink.origin_id), currentLink.origin_slot];
                }
                else {
                    console.warn("[graphToPrompt] Didn't find upstream link!", currentLink, parent?.id)
                }
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
