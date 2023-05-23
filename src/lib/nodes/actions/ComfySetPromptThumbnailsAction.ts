import { parseWhateverIntoComfyImageLocations, type ComfyImageLocation } from "$lib/utils";
import { LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "../ComfyGraphNode";

export interface ComfySetPromptThumbnailsActionProperties extends ComfyGraphNodeProperties {
    defaultFolderType: string | null
}

export default class ComfySetPromptThumbnailsAction extends ComfyGraphNode {
    override properties: ComfySetPromptThumbnailsActionProperties = {
        tags: [],
        defaultFolderType: "input",
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "filenames", type: "*" },
        ]
    }

    _value: any = null;

    override getPromptThumbnails(): ComfyImageLocation[] | null {
        const data = this.getInputData(0)
        return parseWhateverIntoComfyImageLocations(data);
    }
}

LiteGraph.registerNodeType({
    class: ComfySetPromptThumbnailsAction,
    title: "Comfy.SetPromptThumbnailsAction",
    desc: "When a subgraph containing this node is executed, sets the thumbnails in the queue sidebar to the input filename(s).",
    type: "actions/set_prompt_thumbnails"
})
