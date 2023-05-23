import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";

import MultiRegionWidget from "$lib/widgets/MultiRegionWidget.svelte";
import ComfyWidgetNode, { type ComfyWidgetProperties } from "./ComfyWidgetNode";
import { clamp } from "$lib/utils";
import { writable, type Writable } from "svelte/store";

/* x, y, width, height, all in range 0.0 - 1.0 */
export type BoundingBox = [number, number, number, number]

function isBoundingBox(param: any): param is BoundingBox {
    return Array.isArray(param) && param.length === 4 && param.every(i => typeof i === "number")
}

export interface ComfyMultiRegionProperties extends ComfyWidgetProperties {
    regionCount: number,
    totalWidth: number,
    totalHeight: number,
    inputType: "size" | "image"
}

export default class ComfyMultiRegionNode extends ComfyWidgetNode<BoundingBox[]> {
    override properties: ComfyMultiRegionProperties = {
        tags: [],
        defaultValue: false,
        regionCount: 1,
        totalWidth: 512,
        totalHeight: 512,
        inputType: "size"
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "store", type: BuiltInSlotType.ACTION },

            // dynamic inputs, may be removed later
            { name: "width", type: "number" },
            { name: "height", type: "number" },
        ],
        outputs: [
            { name: "changed", type: BuiltInSlotType.EVENT },

            // dynamic outputs, may be removed later
            { name: "x1", type: "number" },
            { name: "y1", type: "number" },
            { name: "w1", type: "number" },
            { name: "h1", type: "number" },
        ]
    }

    override svelteComponentType = MultiRegionWidget;
    override defaultValue: BoundingBox[] = [[0.4, 0.4, 0.8, 0.2]];
    override outputSlotName = null;
    override storeActionName = "store";
    override changedEventName = "changed";

    sizeChanged: Writable<boolean> = writable(true);

    override onPropertyChanged(property: any, value: any) {
        if (property === "regionCount") {
            this.updateRegions()
        }
        else if (property === "width" || property === "height") {
            this.updateSize();
        }
    }

    constructor(name?: string) {
        super(name, [[0.4, 0.4, 0.8, 0.2]])
    }

    override onExecute() {
        let width = this.getInputData(1)
        let height = this.getInputData(2)

        if (width != null && height != null && width != this.properties.width && height != this.properties.height) {
            this.properties.width = width;
            this.properties.height = height;
            this.updateSize();
        }

        const value = this.getValue();

        for (let index = 0; index < this.properties.regionCount * 2; index += 2) {
            const bbox = value[index]
            if (bbox != null) {
                const xOutput = this.outputs[index + 1]
                if (xOutput != null) {
                    this.setOutputData(index + 1, bbox[0] * this.properties.width)
                    this.setOutputData(index + 2, bbox[1] * this.properties.height)
                    this.setOutputData(index + 3, bbox[2] * this.properties.width)
                    this.setOutputData(index + 4, bbox[3] * this.properties.height)
                }
            }
        }
    }

    private updateRegions() {
        this.properties.regionCount = Math.max(this.properties.regionCount, 0);

        for (let index = this.outputs.length - 1; index >= 0; index--) {
            if (this.outputs[index].type !== BuiltInSlotType.EVENT) {
                this.removeOutput(index);
            }
        }

        for (let index = 0; index < this.properties.regionCount; index++) {
            this.addOutput(`x${index + 1}`, "number")
            this.addOutput(`y${index + 1}`, "number")
            this.addOutput(`w${index + 1}`, "number")
            this.addOutput(`h${index + 1}`, "number")
        }

        this.setValue(this.getValue())
    }

    private updateSize(value?: BoundingBox[]): BoundingBox[] {
        this.properties.width = Math.max(this.properties.width, 1);
        this.properties.height = Math.max(this.properties.height, 1);

        value ||= this.getValue();

        for (const bbox of value) {
            bbox[0] = clamp(bbox[0], 0, 1 - bbox[2]);
            bbox[1] = clamp(bbox[1], 0, 1 - bbox[3]);
            bbox[2] = clamp(bbox[2], 0, 1 - bbox[1])
            bbox[3] = clamp(bbox[3], 0, 1 - bbox[2])
        }

        this.sizeChanged.set(true);

        return value
    }

    override parseValue(param: any): BoundingBox[] {
        if (param == null || this.properties.regionCount <= 0)
            return []

        if (isBoundingBox(param))
            return this.updateSize([param])

        if (Array.isArray(param) && param.every(isBoundingBox))
            return this.updateSize(param.splice(0, this.properties.regionCount))

        return null;
    }
}

LiteGraph.registerNodeType({
    class: ComfyMultiRegionNode,
    title: "UI.MultiRegion",
    desc: "Overlays one or more regions over a canvas of the given width/height",
    type: "ui/multi_region"
})
