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

/*
 * Node with a single extra image output widget
 */
class ComfyImageNode extends ComfyGraphNode {
    private _imageResults: Array<ComfyImageResult> = [];
    private _galleryWidget: ComfyGalleryWidget;

    constructor(title?: any) {
        super(title)
        this._galleryWidget = new ComfyGalleryWidget("Images", [], this);
        this.addCustomWidget(this._galleryWidget);
    }

    override onExecuted(output: ComfyImageExecOutput) {
        this._imageResults = Array.from(output.images); // TODO append?
        const galleryItems = this._imageResults.map(r => {
            // TODO
            const url = "http://localhost:8188/view?"
            const params = new URLSearchParams(r)
            let entry: ComfyGalleryEntry = [url + params, null]
            return entry
        });
        this._galleryWidget.addImages(galleryItems);
    }
}

export class ComfySaveImageNode extends ComfyImageNode {
}

export class ComfyPreviewImageNode extends ComfyImageNode {
}
