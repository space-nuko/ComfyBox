import ComfyGalleryWidget, { type ComfyGalleryEntry } from "$lib/widgets/ComfyGalleryWidget";
import ComfyGraphNode from "./ComfyGraphNode";

export type ComfyImageResult = {
    filename: string,
    subfolder: string,
    type: "output" | "temp"
}
export type ComfyImageExecOutput = {
    images: ComfyImageResult[]
}

export default class ComfySaveImageNode extends ComfyGraphNode {
    private _imageResults: Array<ComfyImageResult> = [];
    private _galleryWidget: ComfyGalleryWidget;

    constructor(title?: any) {
        super(title)
        this._galleryWidget = new ComfyGalleryWidget("Images", this._imageResults, this);
        this.virtualWidgets.push(this._galleryWidget)
    }

    override onExecuted(output: ComfyImageExecOutput) {
        this._imageResults = Array.from(output.images); // TODO append?
        const galleryItems = this._imageResults.map(r => {
            // TODO
            let entry: ComfyGalleryEntry = ["http://localhost:8188/" + r.type + "/" + r.filename, null]
            return entry
        });
        this._galleryWidget.setValue(galleryItems)
    }
}
