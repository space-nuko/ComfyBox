import { BuiltInSlotType, LiteGraph, type ITextWidget, type SlotLayout, clamp } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import type { GalleryOutput } from "./ComfyWidgetNodes";

export interface ComfyImageCacheNodeProperties extends Record<any, any> {
    images: GalleryOutput | null,
    index: number,
    filenames: Record<number, { filename: string | null, status: ImageCacheState }>,
    genNumber: number
}

type ImageCacheState = "none" | "uploading" | "failed" | "cached"

/*
 * A node that can act as both an input and output image node by uploading
 * the output file into ComfyUI's input folder.
 */
export default class ComfyImageCacheNode extends ComfyGraphNode {
    override properties: ComfyImageCacheNodeProperties = {
        images: null,
        index: 0,
        filenames: {},
        genNumber: 0
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "images", type: "OUTPUT" },
            { name: "index", type: "number" },
            { name: "store", type: BuiltInSlotType.ACTION },
            { name: "clear", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "filename", type: "string" },
            { name: "state", type: "string" },
        ]
    }

    private _uploadPromise: Promise<void> | null = null;
    private _state: ImageCacheState = "none"

    stateWidget: ITextWidget;
    filenameWidget: ITextWidget;

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
    }

    override onPropertyChanged(property: string, value: any, prevValue?: any) {
        if (property === "images") {
            if (value != null)
                this.properties.index = clamp(this.properties.index, 0, value.length)
            else
                this.properties.index = 0
        }

        if (this.properties.filenames && this.properties.images) {
            const fileCount = this.properties.images.images.length;
            const cachedCount = Object.keys(this.properties.filenames).length
            console.warn(cachedCount, this.properties.filenames)
            this.filenameWidget.value = `${fileCount} files, ${cachedCount} cached`
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

    private setIndex(newIndex: number, force: boolean = false) {
        console.debug("[ComfyImageCacheNode] setIndex", newIndex, force)

        if (newIndex === this.properties.index && !force)
            return;

        if (!this.properties.images || newIndex < 0 || newIndex >= this.properties.images.images.length) {
            console.debug("[ComfyImageCacheNode] invalid indexes", newIndex, this.properties.images)
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
            const url = "http://localhost:8188" // TODO make configurable
            const params = new URLSearchParams(data)

            const promise = fetch(url + "/view?" + params)
                .then((r) => r.blob())
                .then((blob) => {
                    console.debug("Fetchin", url, params)
                    const formData = new FormData();
                    formData.append("image", blob, data.filename);
                    return fetch(
                        new Request(url + "/upload/image", {
                            body: formData,
                            method: 'POST'
                        })
                    )
                })
                .then((r) => r.json())
                .then((json) => {
                    console.debug("Gottem", json)
                    if (lastGenNumber === this.properties.genNumber) {
                        this.properties.filenames[newIndex] = { filename: data.filename, status: "cached" }
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

    override onAction(action: any) {
        if (action === "clear") {
            this.setProperty("images", null)
            this.setProperty("filenames", {})
            this.setProperty("index", 0)
            return
        }

        const link = this.getInputLink(0)

        if (link.data && "images" in link.data) {
            this.setProperty("genNumber", this.properties.genNumber + 1)
            this.setProperty("images", link.data as GalleryOutput)
            this.setProperty("filenames", {})
            console.debug("[ComfyImageCacheNode] Received output!", link.data)
            this.setIndex(0, true)
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfyImageCacheNode,
    title: "Comfy.ImageCache",
    desc: "Allows reusing a previously output image by uploading it into ComfyUI's input folder.",
    type: "image/cache"
})
