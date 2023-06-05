import type IComfyInputSlot from "$lib/IComfyInputSlot";
import { BuiltInSlotType, LiteGraph, type INodeInputSlot, type LGraphNode, type SerializedLGraphNode, type SlotLayout } from "@litegraph-ts/core";
import { get, writable, type Writable } from "svelte/store";

import ComboWidget from "$lib/widgets/ComboWidget.svelte";
import type { ComfyWidgetProperties } from "./ComfyWidgetNode";
import ComfyWidgetNode from "./ComfyWidgetNode";


export interface ComfyComboProperties extends ComfyWidgetProperties {
    values: string[]

    /* JS Function body that takes a parameter named "value" as a parameter and returns the label for each combo entry */
    convertValueToLabelCode: string
}

export default class ComfyComboNode extends ComfyWidgetNode<string> {
    override properties: ComfyComboProperties = {
        tags: [],
        defaultValue: "A",
        values: ["A", "B", "C", "D"],
        convertValueToLabelCode: "",
        excludeFromJourney: false,
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "store", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "value", type: "string" },
            { name: "changed", type: BuiltInSlotType.EVENT }
        ]
    }

    override svelteComponentType = ComboWidget
    override defaultValue = "A";
    override saveUserState = false;

    // True if at least one combo box refresh has taken place
    // Wait until the initial graph load for combo to be valid.
    firstLoad: Writable<boolean>;
    lightUp: Writable<boolean>;
    valuesForCombo: Writable<any[]>; // Changed when the combo box has values.
    maxLabelWidthChars: number = 0;

    constructor(name?: string) {
        super(name, "A")
        this.firstLoad = writable(false)
        this.lightUp = writable(true)
        this.valuesForCombo = writable([])
    }

    override onPropertyChanged(property: any, value: any) {
        if (property === "values" || property === "convertValueToLabelCode") {
            // this.formatValues(this.properties.values)
        }
    }

    formatValues(values: string[], defaultValue?: string, lightUp: boolean = false) {
        if (values == null)
            return;

        let changed = this.properties.values != values;
        this.properties.values = values;

        const oldValue = get(this.value)
        if (this.properties.values.indexOf(oldValue) === -1) {
            changed = true;
            this.value.set(defaultValue || this.properties.values[0])
        }

        if (lightUp && get(this.firstLoad) && changed)
            this.lightUp.set(true)

        let formatter: any;
        if (this.properties.convertValueToLabelCode)
            formatter = new Function("value", this.properties.convertValueToLabelCode) as (v: string) => string;
        else
            formatter = (value: any) => `${value}`;

        this.maxLabelWidthChars = 0;

        let valuesForCombo = []

        try {
            valuesForCombo = this.properties.values.map((value, index) => {
                const label = formatter(value);
                this.maxLabelWidthChars = Math.max(this.maxLabelWidthChars, label.length)
                return {
                    value,
                    label,
                    index
                }
            })
        }
        catch (err) {
            console.error("Failed formatting!", err)
            valuesForCombo = this.properties.values.map((value, index) => {
                const label = `${value}`
                this.maxLabelWidthChars = Math.max(this.maxLabelWidthChars, label.length)
                return {
                    value,
                    label,
                    index
                }
            })
        }

        this.firstLoad.set(true)
        this.valuesForCombo.set(valuesForCombo);
    }

    onConnectOutput(
        outputIndex: number,
        inputType: INodeInputSlot["type"],
        input: INodeInputSlot,
        inputNode: LGraphNode,
        inputIndex: number
    ): boolean {
        if (!super.onConnectOutput(outputIndex, inputType, input, inputNode, inputIndex))
            return false;

        const thisProps = this.properties;
        if (!("config" in input))
            return true;

        const comfyInput = input as IComfyInputSlot;
        const otherProps = comfyInput.config;

        console.warn("CHECK COMBO CONNECTION", otherProps, thisProps)

        // Ensure combo options match
        if (!(otherProps.values instanceof Array) || otherProps.values.length === 0)
            return false;

        thisProps.values = Array.from(otherProps.values);
        const value = get(this.value)
        if (thisProps.values.indexOf(value) === -1)
            this.setValue(otherProps.defaultValue || thisProps.values[0])

        console.warn("PASSED")

        return true;
    }

    override parseValue(value: any): string {
        if (typeof value !== "string" || this.properties.values.indexOf(value) === -1)
            return this.properties.values[0]
        return value
    }

    override clampOneConfig(input: IComfyInputSlot) {
        if (!input.config.values)
            this.setValue("")
        else if (input.config.values.indexOf(this.properties.value) === -1) {
            if (input.config.values.length === 0)
                this.setValue("")
            else
                this.setValue(input.config.defaultValue || input.config.values[0])
        }
    }

    override onSerialize(o: SerializedLGraphNode) {
        super.onSerialize(o);
        // TODO fix saving combo nodes with huge values lists
        o.properties.values = []
    }

    override stripUserState(o: SerializedLGraphNode) {
        super.stripUserState(o);
        o.properties.values = []
        o.properties.defaultValue = null;
        (o as any).comfyValue = null
    }
}

LiteGraph.registerNodeType({
    class: ComfyComboNode,
    title: "UI.Combo",
    desc: "Combo box outputting a string value",
    type: "ui/combo"
})
