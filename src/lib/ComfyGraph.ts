import { LConnectionKind, LGraph, LGraphNode, type INodeSlot, type SlotIndex, LiteGraph, getStaticProperty, type LGraphAddNodeOptions } from "@litegraph-ts/core";
import GraphSync from "./GraphSync";
import EventEmitter from "events";
import type TypedEmitter from "typed-emitter";
import layoutState from "./stores/layoutState";
import uiState from "./stores/uiState";
import { get } from "svelte/store";
import type ComfyGraphNode from "./nodes/ComfyGraphNode";
import type IComfyInputSlot from "./IComfyInputSlot";
import type { ComfyBackendNode } from "./nodes/ComfyBackendNode";

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
    graphSync: GraphSync;
    eventBus: TypedEmitter<ComfyGraphEvents> = new EventEmitter() as TypedEmitter<ComfyGraphEvents>;

    constructor() {
        super();
        this.graphSync = new GraphSync(this)
    }

    override onConfigure() {
        console.debug("Configured");
        this.eventBus.emit("configured", this);
    }

    override onBeforeChange(graph: LGraph, info: any) {
        console.debug("BeforeChange", info);
        this.eventBus.emit("beforeChange", graph, info);
    }

    override onAfterChange(graph: LGraph, info: any) {
        console.debug("AfterChange", info);
        this.eventBus.emit("afterChange", graph, info);
    }

    override onAfterExecute() {
        this.eventBus.emit("afterExecute");
    }

    override onNodeAdded(node: LGraphNode, options: LGraphAddNodeOptions) {
        layoutState.nodeAdded(node)
        this.graphSync.onNodeAdded(node);

        if ("comfyClass" in node                // Is this a comfy node
            && !("svelteComponentType" in node) // ...and not also a ComfyWidgetNode
            && !options.addedByDeserialize      // ...and we're not trying to deserialize an existing workflow
            && get(uiState).autoAddUI) {
            console.debug("[ComfyGraph] AutoAdd UI")
            const comfyNode = node as ComfyBackendNode;
            const widgetNodesAdded = []
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
                    }
                }
            }
            const dragItems = widgetNodesAdded.map(wn => get(layoutState).allItemsByNode[wn.id]?.dragItem).filter(di => di)
            console.debug("[ComfyGraph] Group new widgets", dragItems)
            layoutState.groupItems(dragItems, { title: comfyNode.comfyClass })
        }

        console.debug("Added", node);
        this.eventBus.emit("nodeAdded", node);
    }

    override onNodeRemoved(node: LGraphNode) {
        layoutState.nodeRemoved(node);
        this.graphSync.onNodeRemoved(node);

        console.debug("Removed", node);
        this.eventBus.emit("nodeRemoved", node);
    }

    override onNodeConnectionChange(kind: LConnectionKind, node: LGraphNode, slot: SlotIndex, targetNode: LGraphNode, targetSlot: SlotIndex) {
        console.debug("ConnectionChange", node);
        this.eventBus.emit("nodeConnectionChanged", kind, node, slot, targetNode, targetSlot);
    }
}
