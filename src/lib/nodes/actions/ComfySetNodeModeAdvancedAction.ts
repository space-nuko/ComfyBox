import { type DragItemID } from "$lib/stores/layoutStates";
import { BuiltInSlotType, LiteGraph, NodeMode, type ITextWidget, type IToggleWidget, type PropertyLayout, type SlotLayout } from "@litegraph-ts/core";
import { get } from "svelte/store";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "../ComfyGraphNode";
import { nodeHasTag } from "$lib/components/ComfyPromptSerializer";

export type TagAction = {
    tag: string,
    enable: boolean
}

export interface ComfySetNodeModeAdvancedActionProperties extends ComfyGraphNodeProperties {
    targetTags: TagAction[],
    enable: boolean,
}

export default class ComfySetNodeModeAdvancedAction extends ComfyGraphNode {
    override properties: ComfySetNodeModeAdvancedActionProperties = {
        targetTags: [{ tag: "myTag", enable: true }, { tag: "anotherTag", enable: false }],
        enable: true,
        tags: []
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "enabled", type: "boolean" },
            { name: "set", type: BuiltInSlotType.ACTION },
        ],
    }

    static propertyLayout: PropertyLayout = [
        { name: "enable", defaultValue: true, type: "boolean", },
        { name: "targetTags", defaultValue: [{ tag: "myTag", enable: true }, { tag: "anotherTag", enable: false }], type: "array", options: { multiline: true, inputStyle: { fontFamily: "monospace" } } }
    ]

    displayWidget: ITextWidget;
    enableWidget: IToggleWidget;

    constructor(title?: string) {
        super(title)
        this.displayWidget = this.addWidget("text", "Tags", this.formatTags(), null);
        this.displayWidget.disabled = true;
        this.enableWidget = this.addWidget("toggle", "Enable", this.properties.enable, "enable");
    }

    override onPropertyChanged(property: any, value: any) {
        if (property === "enable") {
            this.enableWidget.value = value
        }
        else if (property === "targetTags") {
            this.displayWidget.value = this.formatTags()
        }
    }

    private formatTags(): string {
        if (!Array.isArray(this.properties.targetTags) || this.properties.targetTags.length === 0)
            return "(No tags)";
        return this.properties.targetTags.map(t => {
            let s = t.tag
            if (t.enable)
                s = "+" + s
            else
                s = "!" + s
            return s
        }).join(", ")
    }

    private getModeChanges(action: TagAction, enable: boolean, nodeChanges: Record<string, NodeMode>, widgetChanges: Record<DragItemID, boolean>) {
        for (const node of this.graph.iterateNodesInOrderRecursive()) {
            if ("tags" in node.properties) {
                const comfyNode = node as ComfyGraphNode;
                const hasTag = nodeHasTag(comfyNode, action.tag);

                if (hasTag) {
                    let newMode: NodeMode;
                    if (enable && action.enable) {
                        newMode = NodeMode.ALWAYS;
                    } else {
                        newMode = NodeMode.NEVER;
                    }
                    nodeChanges[node.id] = newMode
                }
            }
        }

        for (const entry of Object.values(get(this.layoutState).allItems)) {
            if (entry.dragItem.type === "container") {
                const container = entry.dragItem;
                const hasTag = container.attrs.tags.indexOf(action.tag) != -1;
                if (hasTag) {
                    const hidden = !(enable && action.enable)
                    widgetChanges[container.id] = hidden
                }
            }
        }
    }

    override onExecute() {
        this.boxcolor = LiteGraph.NODE_DEFAULT_BOXCOLOR;

        for (const action of this.properties.targetTags) {
            if (typeof action !== "object" || !("tag" in action) || !("enable" in action)) {
                this.boxcolor = "red";
                break;
            }
        }
    }

    override onAction(action: any, param: any) {
        let input = this.getInputData(0)
        if (input == null)
            input = this.properties.enable

        let enabled = Boolean(input)

        if (typeof param === "object" && "enabled" in param)
            enabled = param["enabled"]

        const nodeChanges: Record<string, NodeMode> = {}  // nodeID => newState
        const widgetChanges: Record<string, boolean> = {} // dragItemID => isHidden

        for (const action of this.properties.targetTags) {
            this.getModeChanges(action, enabled, nodeChanges, widgetChanges)
        }

        for (const [nodeId, newMode] of Object.entries(nodeChanges)) {
            this.graph.getNodeByIdRecursive(nodeId).changeMode(newMode);
        }

        const layout = get(this.layoutState);
        for (const [dragItemID, isHidden] of Object.entries(widgetChanges)) {
            const container = layout.allItems[dragItemID].dragItem
            container.attrs.hidden = isHidden;
            container.attrsChanged.set(get(container.attrsChanged) + 1)
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfySetNodeModeAdvancedAction,
    title: "Comfy.SetNodeModeAdvancedAction",
    desc: "Turns multiple groups of nodes on/off at once based on an array of rules [{ tag: string, enable: boolean }, ...]",
    type: "actions/set_node_mode_advanced"
})
