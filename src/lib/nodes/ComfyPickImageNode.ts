import { LiteGraph, type ITextWidget, type SlotLayout, type INumberWidget } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "./ComfyGraphNode";
import { comfyFileToAnnotatedFilepath, type ComfyBoxImageMetadata } from "$lib/utils";

export interface ComfyPickImageProperties extends ComfyGraphNodeProperties {
    imageTagFilter: string
}

export default class ComfyPickImageNode extends ComfyGraphNode {
    override properties: ComfyPickImageProperties = {
        tags: [],
        imageTagFilter: ""
    }

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
            { name: "children", type: "COMFYBOX_IMAGES" },
        ]
    }

    tagFilterWidget: ITextWidget;
    filepathWidget: ITextWidget;
    folderWidget: ITextWidget;
    widthWidget: INumberWidget;
    heightWidget: INumberWidget;
    tagsWidget: ITextWidget;
    childrenWidget: INumberWidget;

    constructor(title?: string) {
        super(title)
        this.tagFilterWidget = this.addWidget("text", "Tag Filter", this.properties.imageTagFilter, "imageTagFilter")

        this.filepathWidget = this.addWidget("text", "File", "")
        this.filepathWidget.disabled = true;
        this.folderWidget = this.addWidget("text", "Folder", "")
        this.folderWidget.disabled = true;
        this.widthWidget = this.addWidget("number", "Width", 0)
        this.widthWidget.disabled = true;
        this.heightWidget = this.addWidget("number", "Height", 0)
        this.heightWidget.disabled = true;
        this.tagsWidget = this.addWidget("text", "Tags", "")
        this.tagsWidget.disabled = true;
        this.childrenWidget = this.addWidget("number", "# of Children", 0)
        this.childrenWidget.disabled = true;
    }

    _value: ComfyBoxImageMetadata[] | null = null;
    _image: ComfyBoxImageMetadata | null = null;
    _path: string | null = null;
    _index: number | null = null;

    private setValue(value: ComfyBoxImageMetadata[] | ComfyBoxImageMetadata | null, index: number) {
        if (value != null && !Array.isArray(value)) {
            value = [value]
            index = 0;
        }
        this._value = value as ComfyBoxImageMetadata[];
        this._index = index;
        let image: ComfyBoxImageMetadata | null = null;
        if (value && this._index != null && value[this._index] != null) {
            image = value[this._index];
        }

        const changed = this._value != value || this._index != index || this._image != image;

        if (changed) {
            if (image) {
                this._image = image
                this._image.children ||= []
                this._image.tags ||= []

                this._path = comfyFileToAnnotatedFilepath(this._image.comfyUIFile);
                this.filepathWidget.value = this._image.comfyUIFile.filename
                this.folderWidget.value = this._image.comfyUIFile.type
                this.childrenWidget.value = this._image.children.length
                this.tagsWidget.value = this._image.tags.join(", ")
            }
            else {
                this._image = null;
                this._path = null;
                this.filepathWidget.value = "(None)"
                this.folderWidget.value = ""
                this.childrenWidget.value = 0
                this.tagsWidget.value = ""
            }

            console.log("SET", value, this._image, this._path, this.properties.imageTagFilter)
        }
    }

    override onExecute() {
        const data = this.getInputData(0)
        let index = this.getInputData(1);
        if (this.properties.imageTagFilter && Array.isArray(data))
            index = data.findIndex(i => i.tags?.includes(this.properties.imageTagFilter))
        else
            index = 0;
        this.setValue(data, index);

        if (this._image == null) {
            this.setOutputData(0, null)
            this.setOutputData(1, null)
            this.setOutputData(2, 0)
            this.setOutputData(3, 0)
            this.setOutputData(4, null)

            this.widthWidget.value = 0
            this.heightWidget.value = 0
        }
        else {
            this.setOutputData(0, this._image);
            this.setOutputData(1, this._path);
            this.setOutputData(2, this._image.width);
            this.setOutputData(3, this._image.height);
            this.setOutputData(4, this._image.children);

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
