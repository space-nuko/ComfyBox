import { BuiltInSlotType, LiteGraph, type IComboWidget, type SlotLayout, type INumberWidget } from "@litegraph-ts/core";

import MultiRegionWidget from "$lib/widgets/MultiRegionWidget.svelte";
import ComfyWidgetNode, { type ComfyWidgetProperties } from "./ComfyWidgetNode";
import { clamp, isComfyBoxImageMetadata, type ComfyBoxImageMetadata, comfyBoxImageToComfyURL } from "$lib/utils";
import { writable, type Writable } from "svelte/store";

/* x, y, width, height, all in range 0.0 - 1.0 */
export type BoundingBox = [number, number, number, number]

function isBoundingBox(param: any): param is BoundingBox {
    return Array.isArray(param) && param.length === 4 && param.every(i => typeof i === "number")
}

export interface ComfyMultiRegionProperties extends ComfyWidgetProperties {
    regionCount: number,
    canvasWidth: number,
    canvasHeight: number,
    canvasImageURL: string | null,
    inputType: "size" | "image"
}

const DEFAULT_BBOX: BoundingBox = [0.4, 0.4, 0.2, 0.2];

export default class ComfyMultiRegionNode extends ComfyWidgetNode<BoundingBox[]> {
    override properties: ComfyMultiRegionProperties = {
        tags: [],
        defaultValue: false,
        regionCount: 1,
        canvasWidth: 512,
        canvasHeight: 512,
        canvasImageURL: null,
        inputType: "size"
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "store", type: BuiltInSlotType.ACTION },
        ],
        outputs: [
            { name: "changed", type: BuiltInSlotType.EVENT },

            // dynamic outputs, may be removed later
            { name: "region1", type: "COMFYBOX_REGION" },
        ]
    }

    override svelteComponentType = MultiRegionWidget;
    override defaultValue: BoundingBox[] = [[...DEFAULT_BBOX]];
    override outputSlotName = null;
    override storeActionName = "store";
    override changedEventName = "changed";

    sizeChanged: Writable<boolean> = writable(true);
    regionsChanged: Writable<boolean> = writable(true);

    inputTypeWidget: IComboWidget
    regionCountWidget: INumberWidget

    constructor(name?: string) {
        super(name, [[...DEFAULT_BBOX]])

        this.inputTypeWidget = this.addWidget("combo", "Input Type", this.properties.inputType, "inputType", { values: ["size", "image"] })
        this.regionCountWidget = this.addWidget(
            "number",
            "# of Regions",
            this.properties.regionCount,
            (v: number) => {
                this.setProperty("regionCount", clamp(v, 1, 16));
            },
            { min: 1, max: 16, step: 1, precision: 0 }
        )
    }

    override onPropertyChanged(property: any, value: any) {
        if (property === "regionCount") {
            this.updateRegions()
        }
        else if (property === "width" || property === "height") {
            this.updateSize();
        }
        else if (property === "inputType") {
            this.updateInputType();
        }
    }

    override onExecute() {
        let width = 0;
        let height = 0;
        let imageURL: string | null = null;

        this.updateInputType();

        if (this.properties.inputType === "image") {
            let comfyBoxImage = this.getInputData(1);
            if (isComfyBoxImageMetadata(comfyBoxImage)) {
                imageURL = comfyBoxImageToComfyURL(comfyBoxImage)
                width = comfyBoxImage.width;
                height = comfyBoxImage.height;
            }
            else {
                imageURL = null;
            }
        }
        else if (this.properties.inputType === "size") {
            width = this.getInputData(1) || 0
            height = this.getInputData(2) || 0
        }

        if (width != this.properties.canvasWidth || height != this.properties.canvasHeight || imageURL != this.properties.canvasImageURL) {
            this.properties.canvasWidth = width;
            this.properties.canvasHeight = height;
            this.properties.canvasImageURL = imageURL
            this.updateSize();
        }

        const value = this.getValue();

        for (let index = 0; index < this.properties.regionCount; index++) {
            const bbox = value[index]
            if (bbox != null) {
                const output = this.outputs[index + 1] // + changed slot
                if (output != null) {
                    let data = this.getOutputData(index + 1) || [0, 0, 0, 0]
                    data[0] = bbox[0] * this.properties.canvasWidth
                    data[1] = bbox[1] * this.properties.canvasHeight
                    data[2] = bbox[2] * this.properties.canvasWidth
                    data[3] = bbox[3] * this.properties.canvasHeight
                    this.setOutputData(index + 1, data)
                }
            }
        }
    }

    private updateRegions() {
        this.properties.regionCount = Math.max(this.properties.regionCount, 0);

        if (this.outputs.length === this.properties.regionCount + 1)
            return

        for (let index = this.outputs.length - 1; index > this.properties.regionCount; index--) {
            if (this.outputs[index].type !== BuiltInSlotType.EVENT) {
                this.removeOutput(index);
            }
        }

        for (let index = this.outputs.length - 1; index < this.properties.regionCount; index++) {
            this.addOutput(`region${index + 1}`, "COMFYBOX_REGION")
        }

        this.regionsChanged.set(true);
        // this.notifyPropsChanged();

        this.setValue(this.getValue())
    }

    private _prevWidth = null
    private _prevHeight = null
    private _prevImageURL = null

    private updateSize(value?: BoundingBox[]): BoundingBox[] {
        this.properties.canvasWidth = Math.max(this.properties.canvasWidth, 0);
        this.properties.canvasHeight = Math.max(this.properties.canvasHeight, 0);

        value ||= this.getValue();

        for (const bbox of value) {
            bbox[0] = clamp(bbox[0], 0, 1 - bbox[2]);
            bbox[1] = clamp(bbox[1], 0, 1 - bbox[3]);
            bbox[2] = clamp(bbox[2], 0, 1 - bbox[1])
            bbox[3] = clamp(bbox[3], 0, 1 - bbox[2])
        }

        const sizeChanged = this.properties.canvasWidth != this._prevWidth
            || this.properties.canvasHeight != this._prevHeight
            || this.properties.canvasImageURL != this._prevImageURL

        this.sizeChanged.set(sizeChanged);

        this._prevWidth = this.properties.canvasWidth;
        this._prevHeight = this.properties.canvasHeight;
        this._prevImageURL = this.properties.canvasImageURL;

        // this.notifyPropsChanged();

        return value
    }

    private updateInputType() {
        const inputType = this.properties.inputType;
        if (inputType === "image" && this.inputs[1]?.name === "image")
            return
        else if (inputType === "size" && this.inputs[1]?.name === "width")
            return

        for (let index = this.inputs.length - 1; index >= 1; index--) {
            if (this.inputs[index].type !== BuiltInSlotType.ACTION) {
                this.removeInput(index);
            }
        }

        if (inputType === "image") {
            this.addInput("image", "COMFYBOX_IMAGE");
        }
        else if (inputType === "size") {
            this.addInput("width", "number")
            this.addInput("height", "number")
        }
    }

    override parseValue(param: any): BoundingBox[] {
        if (param == null || this.properties.regionCount <= 0)
            return []

        let val = []

        if (isBoundingBox(param))
            val = this.updateSize([param])

        if (Array.isArray(param) && param.every(isBoundingBox))
            val = this.updateSize(param.splice(0, this.properties.regionCount))

        // Fill the array with missing regions
        for (let index = val.length; index < this.properties.regionCount; index++)
            val.push([...DEFAULT_BBOX])

        return val;
    }
}

LiteGraph.registerNodeType({
    class: ComfyMultiRegionNode,
    title: "UI.MultiRegion",
    desc: "Overlays one or more regions over a canvas of the given width/height",
    type: "ui/multi_region"
})
