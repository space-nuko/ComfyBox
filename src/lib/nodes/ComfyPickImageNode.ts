import { LiteGraph, type ITextWidget, type SlotLayout, type INumberWidget } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import { comfyFileToAnnotatedFilepath, type ComfyBoxImageMetadata } from "$lib/utils";

export default class ComfyPickImageNode extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        inputs: [
            { name: "images", type: "COMFYBOX_IMAGES,COMFYBOX_IMAGE" },
            { name: "index", type: "number" },
        ],
        outputs: [
            { name: "image", type: "COMFYBOX_IMAGE" },
            { name: "filename", type: "string" },
            { name: "width", type: "number" },
            { name: "height", type: "number" },
        ]
    }

    filepathWidget: ITextWidget;
    folderWidget: ITextWidget;
    widthWidget: INumberWidget;
    heightWidget: INumberWidget;

    constructor(title?: string) {
        super(title)
        this.filepathWidget = this.addWidget("text", "File", "")
        this.folderWidget = this.addWidget("text", "Folder", "")
        this.widthWidget = this.addWidget("number", "Width", 0)
        this.heightWidget = this.addWidget("number", "Height", 0)
        for (const widget of this.widgets)
            widget.disabled = true;
    }

    _value: ComfyBoxImageMetadata[] | null = null;
    _image: ComfyBoxImageMetadata | null = null;
    _path: string | null = null;
    _index: number = 0;

    private setValue(value: ComfyBoxImageMetadata[] | ComfyBoxImageMetadata | null, index: number) {
        if (value != null && !Array.isArray(value)) {
            value = [value]
            index = 0;
        }
        const changed = this._value != value || this._index != index;
        this._value = value as ComfyBoxImageMetadata[];
        this._index = index;
        if (changed) {
            if (value && value[this._index] != null) {
                this._image = value[this._index]
                this._path = comfyFileToAnnotatedFilepath(this._image.comfyUIFile);
                this.filepathWidget.value = this._image.comfyUIFile.filename
                this.folderWidget.value = this._image.comfyUIFile.type
            }
            else {
                this._image = null;
                this._path = null;
                this.filepathWidget.value = "(None)"
                this.folderWidget.value = ""
            }
            console.log("SET", value, this._image, this._path)
        }
    }

    override onExecute() {
        const data = this.getInputData(0)
        const index = this.getInputData(1) || 0
        this.setValue(data, index);

        if (this._image == null) {
            this.setOutputData(0, null)
            this.setOutputData(1, null)
            this.setOutputData(2, 0)
            this.setOutputData(3, 0)

            this.widthWidget.value = 0
            this.heightWidget.value = 0
        }
        else {
            this.setOutputData(0, this._image);
            this.setOutputData(1, this._path);
            this.setOutputData(2, this._image.width);
            this.setOutputData(3, this._image.height);

            // XXX: image size doesn't load until the <img> element is ready on
            // the page so this can come after several frames' worth of
            // execution
            this.widthWidget.value = this._image.width
            this.heightWidget.value = this._image.height
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfyPickImageNode,
    title: "Comfy.PickImage",
    desc: "Selects an image from an array of ComfyBox images and returns its properties.",
    type: "image/pick_image"
})
