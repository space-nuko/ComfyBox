import type { ComfyInputConfig } from "$lib/IComfyInputSlot";
import type { SerializedPrompt } from "$lib/components/ComfyApp";
import { LGraph, LGraphNode, LLink, LiteGraph, NodeMode, type INodeInputSlot, type SerializedLGraphNode, type Vector2, type INodeOutputSlot, LConnectionKind, type SlotType, LGraphCanvas, getStaticPropertyOnInstance, type PropertyLayout, type SlotLayout } from "@litegraph-ts/core";
import type { SvelteComponentDev } from "svelte/internal";
import type { ComfyWidgetNode } from "$lib/nodes/widgets";
import type { SerializedPromptOutput, ComfyImageLocation } from "$lib/utils"
import type IComfyInputSlot from "$lib/IComfyInputSlot";
import uiState from "$lib/stores/uiState";
import { get } from "svelte/store";
import configState from "$lib/stores/configState";
import type { WritableLayoutStateStore } from "$lib/stores/layoutStates";
import layoutStates from "$lib/stores/layoutStates";
import workflowStateStore, { ComfyWorkflow } from "$lib/stores/workflowState";

export type DefaultWidgetSpec = {
    defaultWidgetNode: new (name?: string) => ComfyWidgetNode,
    config?: ComfyInputConfig
}

export type DefaultWidgetLayout = {
    inputs?: Record<number, DefaultWidgetSpec>,
}

export interface ComfyGraphNodeProperties extends Record<string, any> {
    tags: string[]
}

export default class ComfyGraphNode extends LGraphNode {
    override properties: ComfyGraphNodeProperties = {
        tags: []
    }

    isBackendNode?: boolean;

    /*
     * Triggered when the user presses the global "Queue Prompt" button in the fixed toolbar.
     */
    onDefaultQueueAction?(): void;

    /*
     * Triggered before a prompt containing this node is passed to the backend.
     */
    beforeQueued?(subgraph: string | null): void;

    /*
     * Triggered after a prompt containing this node is passed to the backend.
     */
    afterQueued?(prompt: SerializedPrompt, subgraph: string | null): void;

    /*
     * Triggered when the backend sends a finished output back with this node's ID.
     * Valid for output nodes like SaveImage and PreviewImage.
     */
    onExecuted?(output: SerializedPromptOutput): void;

    /*
     * When a prompt is queued, this will be called on the node if it can
     * provide any thumbnails for use with the prompt queue. Useful for HR Fix
     * or img2img workloads.
     */
    getPromptThumbnails?(): ComfyImageLocation[] | null

    /*
     * Allows you to manually specify an auto-config for certain input slot
     * indices, so that when a ComfyWidgetNode is connected to the input slot it
     * receives the specified min/max/values/etc.
     * Otherwise the config passed from the backend is used.
     *
     * Use this if you're creating a frontend-only node and want some input
     * slots to have auto-configs, like for connected combo box widgets.
     */
    defaultWidgets?: DefaultWidgetLayout

    /*
     * If true, attempt to reconcile wildcard types in slots ("*")
     * when a new input/output is connected
     *
     * Only set this to true if all output slots are wildcard typed in the
     * static slotLayout property by default!
     */
    canInheritSlotTypes: boolean = false;

    /*
     * If false, don't serialize user-set properties into the workflow.
     * Useful for removing personal information from shared workflows.
     */
    saveUserState: boolean = true;

    /*
     * Called to remove user-set properties from this node.
     */
    stripUserState(o: SerializedLGraphNode) {
        o.widgets_values = []
    }

    /*
     * Traverses this node backwards in the graph in order to reach a connecting
     * backend node, if any. For example, reroute nodes will simply follow their
     * single input, while branching nodes have conditional logic that
     * determines which link to follow backwards.
     */
    getUpstreamLink(): LLink | null {
        return null;
    }

    get layoutState(): WritableLayoutStateStore | null {
        return layoutStates.getLayoutByNode(this);
    }

    get workflow(): ComfyWorkflow | null {
        return workflowStateStore.getWorkflowByNode(this);
    }

    constructor(title?: string) {
        super(title)
        this.addProperty("tags", [], "array")
    }

    /*
     * Adjusts output slot types to have the same type as the first connected
     * input. Used for frontend-only nodes with inputs and outputs that act as
     * wildcards, so that they can be connected to ComfyBackendNodes without
     * rejection.
     */
    private inheritSlotTypes(type: LConnectionKind, isConnected: boolean) {
        // Prevent multiple connections to different types when we have no input
        if (isConnected && type === LConnectionKind.OUTPUT) {
            // Ignore wildcard nodes as these will be updated to real types
            const types = new Set(this.outputs.flatMap(o => o.links.map((l) => this.graph.links[l].type).filter((t) => t !== "*")));
            if (types.size > 1) {
                for (let j = 0; j < this.outputs.length; j++) {
                    for (let i = 0; i < this.outputs[j].links.length - 1; i++) {
                        const linkId = this.outputs[j].links[i];
                        const link = this.graph.links[linkId];
                        const node = this.graph.getNodeById(link.target_id);
                        node.disconnectInput(link.target_slot);
                    }
                }
            }
        }

        // Find root input
        let currentNode: ComfyGraphNode = this;
        let updateNodes: ComfyGraphNode[] = [];
        let inputType: SlotType | null = null;
        let inputNode = null;

        while (currentNode) {
            updateNodes.unshift(currentNode);
            const link = currentNode.getUpstreamLink();
            if (link !== null) {
                const node = this.graph.getNodeById(link.origin_id) as ComfyGraphNode;
                console.warn(node.type)
                if (node.canInheritSlotTypes) {
                    console.log("REROUTE2", node)
                    if (node === this) {
                        // We've found a circle
                        currentNode.disconnectInput(link.target_slot);
                        currentNode = null;
                    }
                    else {
                        // Move the previous node
                        currentNode = node;
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
        const nodes: ComfyGraphNode[] = [this];
        let outputType: SlotType | null = null;
        while (nodes.length) {
            currentNode = nodes.pop();
            if (currentNode.outputs) {
                for (let i = 0; i < currentNode.outputs.length; i++) {
                    const outputs = currentNode.outputs[i].links || [];
                    if (outputs.length) {
                        for (const linkId of outputs) {
                            const link = this.graph.links[linkId];

                            // When disconnecting sometimes the link is still registered
                            if (!link) continue;

                            const node = this.graph.getNodeById(link.target_id) as ComfyGraphNode;

                            if (node.canInheritSlotTypes) {
                                console.log("REROUTE", node)
                                // Follow reroute nodes
                                nodes.push(node);
                                updateNodes.push(node);
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
            }
        }

        const displayType = inputType || outputType || "*";
        const color = LGraphCanvas.DEFAULT_LINK_TYPE_COLORS[displayType];

        // Update the types of each node
        for (const node of updateNodes) {
            // in lieu of static abstract properties
            const slotLayout = getStaticPropertyOnInstance<SlotLayout>(node, "slotLayout");
            if (!slotLayout)
                continue

            const layoutOutputs = slotLayout.outputs || []

            for (let i = 0; i < node.outputs.length; i++) {
                // Check if this output was defined as starting off as a
                // wildcard. If for example it was something else like a string,
                // it wouldn't make sense to change its type dynamically.
                const isWildcardOutput = layoutOutputs.length > i && layoutOutputs[i].type === "*";
                if (!isWildcardOutput) {
                    console.error("not wildcard", node.outputs[i], layoutOutputs[i])
                    continue;
                }

                // If we dont have an input type we are always wildcard but we'll show the output type
                // This lets you change the output link to a different type and all nodes will update
                node.outputs[i].type = inputType || "*";
                (node as any).__outputType = displayType;
                node.outputs[i].name = node.properties.showOutputText ? String(displayType) : "";
                node.size = node.computeSize();

                // TODO from ComfyReroute
                if ("applyOrientation" in node && typeof node.applyOrientation === "function")
                    node.applyOrientation();

                for (const l of node.outputs[i].links || []) {
                    const link = this.graph.links[l];
                    if (link) {
                        link.color = color;
                    }
                }
            }
        }

        if (inputNode) {
            for (let i = 0; i < inputNode.inputs.length; i++) {
                const link = this.graph.links[inputNode.inputs[i].link];
                if (link) {
                    link.color = color;
                }
            }
        }
    }

    override onConnectionsChange(
        type: LConnectionKind,
        slotIndex: number,
        isConnected: boolean,
        link: LLink,
        ioSlot: (INodeInputSlot | INodeOutputSlot)
    ) {
        if (this.canInheritSlotTypes) {
            this.inheritSlotTypes(type, isConnected);
        }
    }

    override onResize(size: Vector2) {
        // Snap to grid if shift is held down.
        if ((window as any)?.app?.shiftDown) {
            const w = LiteGraph.CANVAS_GRID_SIZE * Math.round(this.size[0] / LiteGraph.CANVAS_GRID_SIZE);
            const h = LiteGraph.CANVAS_GRID_SIZE * Math.round(this.size[1] / LiteGraph.CANVAS_GRID_SIZE);
            this.size[0] = w;
            this.size[1] = h;
        }

        if (super.onResize)
            super.onResize(size)
    }

    override onSerialize(o: SerializedLGraphNode) {
        // Resync the widget node types for each input.
        // This is so combo widget nodes will be correctly detected by ComfyApp.refreshComboInNodes().
        for (let index = 0; index < this.inputs.length; index++) {
            const input = this.inputs[index]
            const serInput = o.inputs[index]
            if ("defaultWidgetNode" in input) {
                const comfyInput = input as IComfyInputSlot
                const widgetNode = comfyInput.defaultWidgetNode
                const ty = Object.values(LiteGraph.registered_node_types)
                    .find(v => v.class === widgetNode)
                if (ty)
                    (serInput as any).widgetNodeType = ty.type;
                (serInput as any).defaultWidgetNode = null
            }
        }

        (o as any).saveUserState = this.saveUserState
        if (!this.saveUserState && (!get(uiState).isSavingToLocalStorage || get(configState).alwaysStripUserState)) {
            this.stripUserState(o)
            console.warn("[ComfyGraphNode] stripUserState", this, o)
        }
    }

    override onConfigure(o: SerializedLGraphNode) {
        if (this.inputs.length != (o.inputs || []).length || this.outputs.length != (o.outputs || []).length) {
            console.error("Expected node slot size mismatch when deserializing!", o.type, "ours", this.inputs, this.outputs, "theirs", o.inputs, o.outputs)
            return;
        }

        // Save the litegraph type of the default ComfyWidgetNode for each input.
        for (let index = 0; index < this.inputs.length; index++) {
            const input = this.inputs[index]
            const serInput = o.inputs[index]
            if (serInput && "widgetNodeType" in serInput) {
                const comfyInput = input as IComfyInputSlot
                const ty: string = serInput.widgetNodeType as any
                const widgetNode = Object.values(LiteGraph.registered_node_types)
                    .find(v => v.type === ty)
                if (widgetNode)
                    comfyInput.defaultWidgetNode = widgetNode.class as any
            }
        }

        this.saveUserState = (o as any).saveUserState;
        if (this.saveUserState == null)
            this.saveUserState = true
    }
}
