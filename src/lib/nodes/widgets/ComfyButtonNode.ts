import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";

import ButtonWidget from "$lib/widgets/ButtonWidget.svelte";
import ComfyWidgetNode, { type ComfyWidgetProperties } from "./ComfyWidgetNode";

export interface ComfyButtonProperties extends ComfyWidgetProperties {
    param: string
}

export default class ComfyButtonNode extends ComfyWidgetNode<boolean> {
    override properties: ComfyButtonProperties = {
        tags: [],
        defaultValue: false,
        excludeFromJourney: true,
        param: "bang"
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "clicked", type: BuiltInSlotType.EVENT },
        ]
    }

    override svelteComponentType = ButtonWidget;
    override defaultValue = false;
    override outputSlotName = null;
    override changedEventName = null;

    constructor(name?: string) {
        super(name, false)
    }

    override parseValue(param: any): boolean {
        return Boolean(param);
    }

    onClick() {
        this.setValue(true)
        this.triggerSlot(0, this.properties.param);
        this.setValue(false) // TODO onRelease
    }
}

LiteGraph.registerNodeType({
    class: ComfyButtonNode,
    title: "UI.Button",
    desc: "Button that triggers an event when clicked",
    type: "ui/button"
})
