import { LiteGraph, type ITextWidget, type SlotLayout, type INumberWidget } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";
import { comfyFileToAnnotatedFilepath, type ComfyBoxImageMetadata } from "$lib/utils";

export default class ComfyPickImageNode extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        inputs: [
            { name: "images", type: "COMFYBOX_IMAGES" },
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

    private setValue(value: ComfyBoxImageMetadata[] | null) {
        const changed = this._value != value;
        this._value = value;
        if (changed) {
            if (value && value[this._index] != null) {
                this._image = value[this._index]
                this._path = comfyFileToAnnotatedFilepath(this._image.comfyUIFile);
                this.filepathWidget.value = this._image.comfyUIFile.filename
                this.folderWidget.value = this._image.comfyUIFile.type
                this.widthWidget.value = this._image.width
                this.heightWidget.value = this._image.height
            }
            else {
                this._image = null;
                this._path = null;
                this.filepathWidget.value = "(None)"
                this.folderWidget.value = ""
                this.widthWidget.value = 0
                this.heightWidget.value = 0
            }
        }
    }

    override onExecute() {
        const data = this.getInputData(0)
        this.setValue(data);

        if (this._image == null) {
            this.setOutputData(0, null)
            this.setOutputData(1, null)
            this.setOutputData(2, 0)
            this.setOutputData(3, 0)
        }
        else {
            this.setOutputData(0, this._image);
            this.setOutputData(1, this._path);
            this.setOutputData(2, this._image.width);
            this.setOutputData(3, this._image.height);
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfyPickImageNode,
    title: "Comfy.PickImage",
    desc: "Selects an image from an array of ComfyBox images and returns its properties.",
    type: "image/pick_image"
})
