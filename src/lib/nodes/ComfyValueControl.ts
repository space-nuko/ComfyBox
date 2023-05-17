import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties, type DefaultWidgetLayout } from "./ComfyGraphNode";
import { clamp } from "$lib/utils";
import ComboWidget from "$lib/widgets/ComboWidget.svelte";
import { ComfyComboNode } from "./widgets";

export interface ComfyValueControlProperties extends ComfyGraphNodeProperties {
    value: any,
    action: "fixed" | "increment" | "decrement" | "randomize",
    min: number,
    max: number,
    step: number
}

const INT_MAX = 1125899906842624;

export default class ComfyValueControl extends ComfyGraphNode {
    override properties: ComfyValueControlProperties = {
        tags: [],
        value: null,
        action: "fixed",
        min: -INT_MAX,
        max: INT_MAX,
        step: 1
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "value", type: "number" },
            { name: "trigger", type: BuiltInSlotType.ACTION },
            { name: "action", type: "string" },
            { name: "min", type: "number" },
            { name: "max", type: "number" },
            { name: "step", type: "number" }
        ],
        outputs: [
            { name: "value", type: "*" },
            { name: "changed", type: BuiltInSlotType.EVENT }
        ],
    }

    override defaultWidgets: DefaultWidgetLayout = {
        inputs: {
            2: {
                defaultWidgetNode: ComfyComboNode,
                config: {
                    defaultValue: "randomize",
                    values: ["fixed", "increment", "decrement", "randomize"]
                }
            }
        }
    }

    delayChangeEvent: boolean = true;

    private _aboutToChange: number = 0;
    private _aboutToChangeValue: any = null;

    constructor(title?: string) {
        super(title);
    }

    override onExecute() {
        this.setProperty("action", this.getInputData(2) || "fixed")
        this.setProperty("min", this.getInputData(3))
        this.setProperty("max", this.getInputData(4))
        this.setProperty("step", this.getInputData(5) || 1)

        if (this._aboutToChange > 0) {
            this._aboutToChange -= 1;
            if (this._aboutToChange <= 0) {
                const value = this._aboutToChangeValue;
                this._aboutToChange = 0;
                this._aboutToChangeValue = null;
                this.triggerSlot(1, value)
            }
        }
    }

    override onAction(action: any, param: any) {
        var v = this.getInputData(0)
        if (typeof v !== "number")
            return

        let min = this.properties.min
        let max = this.properties.max
        if (min == null) min = -INT_MAX
        if (max == null) max = INT_MAX

        // limit to something that javascript can handle
        min = Math.max(-INT_MAX, this.properties.min);
        max = Math.min(INT_MAX, this.properties.max);
        let range = (max - min) / (this.properties.step);

        //adjust values based on valueControl Behaviour
        switch (this.properties.action) {
            case "fixed":
                break;
            case "increment":
                v += this.properties.step;
                break;
            case "decrement":
                v -= this.properties.step;
                break;
            case "randomize":
                v = Math.floor(Math.random() * range) * (this.properties.step) + min;
            default:
                break;
        }

        v = clamp(v, min, max)
        this.setProperty("value", v)
        this.setOutputData(0, v)

        if (this.delayChangeEvent) {
            this._aboutToChange = 2;
            this._aboutToChangeValue = v;
        }
        else {
            this.triggerSlot(1, v)
        }

        console.debug("ValueControl", v, this.properties)
    };
}

LiteGraph.registerNodeType({
    class: ComfyValueControl,
    title: "Comfy.ValueControl",
    desc: "Adjusts an incoming value based on behavior",
    type: "utils/value_control"
})
