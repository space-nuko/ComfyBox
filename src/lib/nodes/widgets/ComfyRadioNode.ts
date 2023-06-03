import { clamp } from "$lib/utils";
import { BuiltInSlotType, LiteGraph, type INumberWidget, type SlotLayout } from "@litegraph-ts/core";
import { get } from "svelte/store";

import RadioWidget from "$lib/widgets/RadioWidget.svelte";
import type { ComfyWidgetProperties } from "./ComfyWidgetNode";
import ComfyWidgetNode from "./ComfyWidgetNode";


export interface ComfyRadioProperties extends ComfyWidgetProperties {
    choices: string[]
}

export default class ComfyRadioNode extends ComfyWidgetNode<string> {
    override properties: ComfyRadioProperties = {
        tags: [],
        choices: ["Choice A", "Choice B", "Choice C"],
        defaultValue: "Choice A",
        excludeFromJourney: false,
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "store", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "value", type: "string" },
            { name: "index", type: "number" },
            { name: "changed", type: BuiltInSlotType.EVENT },
        ]
    }

    override svelteComponentType = RadioWidget;
    override defaultValue = "";

    indexWidget: INumberWidget;

    index = 0;

    constructor(name?: string) {
        super(name, "Choice A")
        this.indexWidget = this.addWidget("number", "Index", this.index)
        this.indexWidget.disabled = true;
    }

    override onExecute(param: any, options: object) {
        super.onExecute(param, options);
        this.setOutputData(1, this.index)
    }

    override setValue(value: string, noChangedEvent: boolean = false) {
        super.setValue(value, noChangedEvent)

        value = get(this.value);

        const index = this.properties.choices.indexOf(value)
        if (index === -1)
            return;

        this.index = index;
        this.indexWidget.value = index;
        this.setOutputData(1, this.index)
    }

    override parseValue(param: any): string {
        if (typeof param === "string") {
            if (this.properties.choices.indexOf(param) === -1)
                return this.properties.choices[0]
            return param
        }
        else {
            const index = clamp(parseInt(param), 0, this.properties.choices.length - 1)
            return this.properties.choices[index] || this.properties.defaultValue
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfyRadioNode,
    title: "UI.Radio",
    desc: "Radio that outputs a string and index",
    type: "ui/radio"
})
