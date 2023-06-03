import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";

import CheckboxWidget from "$lib/widgets/CheckboxWidget.svelte";
import type { ComfyWidgetProperties } from "./ComfyWidgetNode";
import ComfyWidgetNode from "./ComfyWidgetNode";

export interface ComfyCheckboxProperties extends ComfyWidgetProperties {
}

export default class ComfyCheckboxNode extends ComfyWidgetNode<boolean> {
    override properties: ComfyCheckboxProperties = {
        tags: [],
        defaultValue: false,
        excludeFromJourney: false,
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "store", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "value", type: "boolean" },
            { name: "changed", type: BuiltInSlotType.EVENT },
        ]
    }

    override svelteComponentType = CheckboxWidget;
    override defaultValue = false;

    constructor(name?: string) {
        super(name, false)
    }

    override parseValue(param: any) {
        return Boolean(param);
    }
}

LiteGraph.registerNodeType({
    class: ComfyCheckboxNode,
    title: "UI.Checkbox",
    desc: "Checkbox that stores a boolean value",
    type: "ui/checkbox"
})
