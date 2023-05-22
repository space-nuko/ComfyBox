import type { ComfyWidgetNode } from "$lib/nodes/widgets";
import { BuiltInSlotType, LiteGraph, NodeMode, type ITextWidget, type IToggleWidget, type SlotLayout } from "@litegraph-ts/core";
import { get } from "svelte/store";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "../ComfyGraphNode";

export interface ComfySetNodeModeActionProperties extends ComfyGraphNodeProperties {
    targetTags: string,
    enable: boolean,
}

export default class ComfySetNodeModeAction extends ComfyGraphNode {
    override properties: ComfySetNodeModeActionProperties = {
        targetTags: "",
        enable: false,
        tags: []
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "enabled", type: "boolean" },
            { name: "set", type: BuiltInSlotType.ACTION },
        ],
    }

    displayWidget: ITextWidget;
    enableWidget: IToggleWidget;

    constructor(title?: string) {
        super(title)
        this.displayWidget = this.addWidget("text", "Tags", this.properties.targetTags, "targetTags")
        this.enableWidget = this.addWidget("toggle", "Enable", this.properties.enable, "enable");
    }

    override onPropertyChanged(property: any, value: any) {
        if (property === "enable") {
            this.enableWidget.value = value
        }
    }

    override onAction(action: any, param: any) {
        let input = this.getInputData(0)
        if (input == null)
            input = this.properties.enable

        let enabled = Boolean(input)

        if (typeof param === "object" && "enabled" in param)
            enabled = param["enabled"]

        const tags = this.properties.targetTags.split(",").map(s => s.trim());

        for (const node of this.graph._nodes) {
            if ("tags" in node.properties) {
                const comfyNode = node as ComfyGraphNode;
                const hasTag = tags.some(t => comfyNode.properties.tags.indexOf(t) != -1);
                if (hasTag) {
                    let newMode: NodeMode;
                    if (enabled) {
                        newMode = NodeMode.ALWAYS;
                    } else {
                        newMode = NodeMode.NEVER;
                    }
                    node.changeMode(newMode);
                    if ("notifyPropsChanged" in node)
                        (node as ComfyWidgetNode).notifyPropsChanged();
                }
            }
        }

        for (const entry of Object.values(get(this.layoutState).allItems)) {
            if (entry.dragItem.type === "container") {
                const container = entry.dragItem;
                const hasTag = tags.some(t => container.attrs.tags.indexOf(t) != -1);
                if (hasTag) {
                    container.attrs.hidden = !enabled;
                }
                container.attrsChanged.set(get(container.attrsChanged) + 1)
            }
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfySetNodeModeAction,
    title: "Comfy.SetNodeModeAction",
    desc: "Sets a group of nodes/UI containers as enabled/disabled based on their tags (comma-separated)",
    type: "actions/set_node_mode"
})
