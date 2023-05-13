import { BuiltInSlotType, LiteGraph, type ITextWidget, type SlotLayout, clamp, type PropertyLayout, type IComboWidget, type SerializedLGraphNode } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "./ComfyGraphNode";
import type { GalleryOutput, GalleryOutputEntry } from "./ComfyWidgetNodes";
import { reuploadImageToComfyUI, type ComfyUploadImageAPIResponse } from "$lib/utils";

export interface ComfyImageCacheNodeProperties extends ComfyGraphNodeProperties {
    images: GalleryOutput | null,
    index: number,
    filenames: Record<number, { filename: string | null, status: ImageCacheState }>,
    genNumber: number,
    updateMode: "replace" | "append"
}

type ImageCacheState = "none" | "uploading" | "failed" | "cached"

/*
 * A node that can act as both an input and output image node by uploading
 * the output file into ComfyUI's input folder.
 */
export default class ComfyImageCacheNode extends ComfyGraphNode {
    override properties: ComfyImageCacheNodeProperties = {
        tags: [],
        images: null,
        index: 0,
        filenames: {},
        genNumber: 0,
        updateMode: "replace"
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "images", type: "OUTPUT" },
            { name: "index", type: "number" },
            { name: "store", type: BuiltInSlotType.ACTION, options: { color_off: "rebeccapurple", color_on: "rebeccapurple" } },
            { name: "clear", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "filename", type: "string" },
            { name: "state", type: "string" },
        ]
    }

    static propertyLayout: PropertyLayout = [
        { name: "updateMode", defaultValue: "replace", type: "enum", options: { values: ["replace", "append"] } }
    ]

    override saveUserState = false;

    private _uploadPromise: Promise<void> | null = null;

    stateWidget: ITextWidget;
    filenameWidget: ITextWidget;
    modeWidget: IComboWidget;

    constructor(name?: string) {
        super(name)
        this.stateWidget = this.addWidget<ITextWidget>(
            "text",
            "State",
            "none"
        );
        this.stateWidget.disabled = true;

        this.filenameWidget = this.addWidget<ITextWidget>(
            "text",
            "File",
            ""
        );
        this.filenameWidget.disabled = true;

        this.modeWidget = this.addWidget<IComboWidget>(
            "combo",
            "Mode",
            this.properties.updateMode,
            null,
            { property: "updateMode", values: ["replace", "append"] }
        );
    }

    override onPropertyChanged(property: string, value: any, prevValue?: any) {
        if (property === "images") {
            if (value != null)
                this.properties.index = clamp(this.properties.index, 0, value.length)
            else
                this.properties.index = 0
        }
        else if (property === "updateMode") {
            this.modeWidget.value = value;
        }

        this.updateWidgets()
    }

    private updateWidgets() {
        if (this.properties.filenames && this.properties.images) {
            const fileCount = this.properties.images.images.length;
            const cachedCount = Object.keys(this.properties.filenames).length
            console.warn(cachedCount, this.properties.filenames)
            this.filenameWidget.value = `${fileCount} files, ${cachedCount} cached`
        }
        else {
            this.filenameWidget.value = `No files cached`
        }
    }

    override onExecute() {
        const index = this.getInputData(1)
        if (typeof index === "number")
            this.setIndex(index)

        const existing = this.properties.filenames[this.properties.index]
        let state = "none"
        if (existing)
            state = existing.status

        this.stateWidget.value = state

        let filename = null
        if (this.properties.index in this.properties.filenames)
            filename = this.properties.filenames[this.properties.index].filename

        this.setOutputData(0, filename)
        this.setOutputData(1, state)
    }

    override stripUserState(o: SerializedLGraphNode) {
        super.stripUserState(o);
        o.properties.images = null
        o.properties.index = 0
        o.properties.filenames = {}
        o.properties.genNumber = 0
    }

    private setIndex(newIndex: number, force: boolean = false) {
        if (newIndex === this.properties.index && !force)
            return;

        if (!this.properties.images || newIndex < 0 || newIndex >= this.properties.images.images.length) {
            return
        }

        this.setProperty("index", newIndex)

        const data = this.properties.images.images[newIndex]

        if (data == null) {
            return;
        }

        this.properties.filenames ||= {}
        const existing = this.properties.filenames[newIndex]

        if (existing != null && existing.status === "cached") {
            return
        }

        const lastGenNumber = this.properties.genNumber

        // ComfyUI's LoadImage node only operates on files in its input
        // folder. Usually we're dealing with an image in either the output
        // folder (SaveImage) or the temp folder (PreviewImage). So we have
        // to copy the image into ComfyUI's input folder first by using
        // their upload API.

        if (data.subfolder === "input") {
            // Already in the correct folder for use by LoadImage
            this.properties.filenames[newIndex] = { filename: data.filename, status: "cached" }
            this.onPropertyChanged("filenames", this.properties.filenames)
        }
        else {
            this.properties.filenames[newIndex] = { filename: null, status: "uploading" }
            this.onPropertyChanged("filenames", this.properties.filenames)

            const promise = reuploadImageToComfyUI(data, "input")
                .then((entry: GalleryOutputEntry) => {
                    console.debug("Gottem", entry)
                    if (lastGenNumber === this.properties.genNumber) {
                        this.properties.filenames[newIndex] = { filename: entry.filename, status: "cached" }
                        this.onPropertyChanged("filenames", this.properties.filenames)
                    }
                    else {
                        console.warn("[ComfyImageCacheNode] New generation since index switched!")
                    }
                    this._uploadPromise = null;
                })
                .catch((e) => {
                    console.error("Error uploading:", e)
                    if (lastGenNumber === this.properties.genNumber) {
                        this.properties.filenames[newIndex] = { filename: null, status: "failed" }
                        this.onPropertyChanged("filenames", this.properties.filenames)
                    }
                    else {
                        console.warn("[ComfyImageCacheNode] New generation since index switched!")
                    }
                })

            if (this._uploadPromise)
                this._uploadPromise.then(() => promise)
            else
                this._uploadPromise = promise
        }
    }

    override onAction(action: any, param: any) {
        if (action === "clear") {
            this.setProperty("images", null)
            this.setProperty("filenames", {})
            this.setProperty("index", 0)
            this.updateWidgets();
            return
        }

        if (param && "images" in param) {
            this.setProperty("genNumber", this.properties.genNumber + 1)

            const output = param as GalleryOutput;

            if (this.properties.updateMode === "append" && this.properties.images != null) {
                const newImages = this.properties.images.images.concat(output.images)
                this.properties.images.images = newImages
                this.setProperty("images", this.properties.images)
            }
            else {
                this.setProperty("images", param as GalleryOutput)
                this.setProperty("filenames", {})
            }

            console.debug("[ComfyImageCacheNode] Received output!", output, this.properties.updateMode, this.properties.images)
            this.setIndex(0, true)
        }

        this.updateWidgets();
    }
}

LiteGraph.registerNodeType({
    class: ComfyImageCacheNode,
    title: "Comfy.ImageCache",
    desc: "Allows reusing a previously output image by uploading it into ComfyUI's input folder.",
    type: "image/cache"
})
