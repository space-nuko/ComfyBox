import type IComfyInputSlot from "$lib/IComfyInputSlot";
import { clamp } from "$lib/utils";
import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";

import NumberWidget from "$lib/widgets/NumberWidget.svelte";
import type { ComfyWidgetProperties } from "./ComfyWidgetNode";
import ComfyWidgetNode from "./ComfyWidgetNode";

export interface ComfyNumberProperties extends ComfyWidgetProperties {
    min: number,
    max: number,
    step: number,
    precision: number
}

export default class ComfyNumberNode extends ComfyWidgetNode<number> {
    override properties: ComfyNumberProperties = {
        tags: [],
        defaultValue: 0,
        min: 0,
        max: 10,
        step: 1,
        precision: 1,
        excludeFromJourney: false,
    }

    override svelteComponentType = NumberWidget
    override defaultValue = 0;

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "store", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "value", type: "number" },
            { name: "changed", type: BuiltInSlotType.EVENT },
        ]
    }

    override outputProperties = [
        { name: "min", type: "number" },
        { name: "max", type: "number" },
        { name: "step", type: "number" },
        { name: "precision", type: "number" },
    ]

    constructor(name?: string) {
        super(name, 0)
    }

    override parseValue(value: any): number {
        if (typeof value !== "number")
            return this.properties.min;
        return clamp(value, this.properties.min, this.properties.max)
    }

    override clampOneConfig(input: IComfyInputSlot) {
        // this.setProperty("min", clamp(this.properties.min, input.config.min, input.config.max))
        // this.setProperty("max", clamp(this.properties.max, input.config.max, input.config.min))
        // this.setProperty("step", Math.min(this.properties.step, input.config.step))
        this.setValue(this.properties.defaultValue)
    }
}

LiteGraph.registerNodeType({
    class: ComfyNumberNode,
    title: "UI.Number",
    desc: "Displays a number, by default in a slider format.",
    type: "ui/number"
})
