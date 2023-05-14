import ComfyApp, { type SerializedPrompt } from "./components/ComfyApp";
import ComboWidget from "$lib/widgets/ComboWidget.svelte";
import RangeWidget from "$lib/widgets/RangeWidget.svelte";
import TextWidget from "$lib/widgets/TextWidget.svelte";
import { get } from "svelte/store"
import layoutState from "$lib/stores/layoutState"
import type { SvelteComponentDev } from "svelte/internal";
import type { SerializedLGraph } from "@litegraph-ts/core";
import type { FileNameOrGalleryData, ComfyExecutionResult, ComfyImageLocation } from "./nodes/ComfyWidgetNodes";
import type { FileData as GradioFileData } from "@gradio/upload";

export function clamp(n: number, min: number, max: number): number {
    return Math.min(Math.max(n, min), max)
}

export function negmod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

export function range(size: number, startAt: number = 0): ReadonlyArray<number> {
    return [...Array(size).keys()].map(i => i + startAt);
}

export function download(filename: string, text: string, type: string = "text/plain") {
    const blob = new Blob([text], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(function() {
        a.remove();
        window.URL.revokeObjectURL(url);
    }, 0);
}

export function startDrag(evt: MouseEvent) {
    const dragItemId: string = evt.target.dataset["dragItemId"];
    const ls = get(layoutState)

    if (evt.button !== 0) {
        if (ls.currentSelection.length <= 1 && !ls.isMenuOpen)
            ls.currentSelection = [dragItemId]
        return;
    }

    const item = ls.allItems[dragItemId].dragItem

    console.debug("startDrag", item)

    if (evt.ctrlKey) {
        const index = ls.currentSelection.indexOf(item.id)
        if (index === -1)
            ls.currentSelection.push(item.id);
        else
            ls.currentSelection.splice(index, 1);
        ls.currentSelection = ls.currentSelection;
    }
    else {
        ls.currentSelection = [item.id]
    }
    ls.currentSelectionNodes = [];

    layoutState.set(ls)
};

export function stopDrag(evt: MouseEvent) {
};

export function workflowToGraphVis(workflow: SerializedLGraph): string {
    let out = "digraph {\n"

    for (const link of workflow.links) {
        const nodeA = workflow.nodes.find(n => n.id === link[1])
        const nodeB = workflow.nodes.find(n => n.id === link[3])
        out += `"${link[1]}_${nodeA.title}" -> "${link[3]}_${nodeB.title}"\n`;
    }

    out += "}"
    return out
}

export function promptToGraphVis(prompt: SerializedPrompt): string {
    let out = "digraph {\n"

    for (const pair of Object.entries(prompt.output)) {
        const [id, o] = pair;
        const outNode = prompt.workflow.nodes.find(n => n.id == id)
        for (const pair2 of Object.entries(o.inputs)) {
            const [inpName, i] = pair2;

            if (Array.isArray(i) && i.length === 2 && typeof i[0] === "string" && typeof i[1] === "number") {
                // Link
                const inpNode = prompt.workflow.nodes.find(n => n.id == i[0])
                out += `"${inpNode.title}" -> "${outNode.title}"\n`
            }
            else {
                // Value
                out += `"${id}-${inpName}-${i}" -> "${outNode.title}"\n`
            }
        }
    }

    out += "}"
    return out
}

export function getNodeInfo(nodeId: NodeID): string {
    let app = (window as any).app;
    if (!app || !app.lGraph)
        return String(nodeId);

    const title = app.lGraph.getNodeById(nodeId)?.title || String(nodeId);
    return title + " (" + nodeId + ")"
}

export const debounce = (callback: Function, wait = 250) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Array<unknown>) => {
        const next = () => callback(...args);
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(next, wait);
    };
};

export function convertComfyOutputToGradio(output: ComfyExecutionResult): GradioFileData[] {
    return output.images.map(convertComfyOutputEntryToGradio);
}

export function convertComfyOutputEntryToGradio(r: ComfyImageLocation): GradioFileData {
    const url = `http://${location.hostname}:8188` // TODO make configurable
    const params = new URLSearchParams(r)
    const fileData: GradioFileData = {
        name: r.filename,
        orig_name: r.filename,
        is_file: false,
        data: url + "/view?" + params
    }
    return fileData
}

export function convertComfyOutputToComfyURL(output: FileNameOrGalleryData): string {
    if (typeof output === "string")
        return output;

    const params = new URLSearchParams(output)
    const url = `http://${location.hostname}:8188` // TODO make configurable
    return url + "/view?" + params
}

export function convertGradioFileDataToComfyURL(image: GradioFileData, type: ComfyUploadImageType = "input"): string {
    const baseUrl = `http://${location.hostname}:8188` // TODO make configurable
    const params = new URLSearchParams({ filename: image.name, subfolder: "", type })
    return `${baseUrl}/view?${params}`
}

export function convertGradioFileDataToComfyOutput(fileData: GradioFileData, type: ComfyUploadImageType = "input"): ComfyImageLocation {
    if (!fileData.is_file)
        throw "Can't convert blob data to comfy output!"

    return {
        filename: fileData.name,
        subfolder: "",
        type
    }
}

export function convertFilenameToComfyURL(filename: string,
    subfolder: string = "",
    type: "input" | "output" | "temp" = "output"): string {
    const params = new URLSearchParams({
        filename,
        subfolder,
        type
    })
    const url = `http://${location.hostname}:8188` // TODO make configurable
    return url + "/view?" + params
}

export function jsonToJsObject(json: string): string {
    // Try to parse, to see if it's real JSON
    JSON.parse(json);

    const regex = /\"([^"]+)\":/g;
    const hyphenRegex = /-([a-z])/g;

    return json.replace(regex, match => {
        return match
            .replace(hyphenRegex, g => g[1].toUpperCase())
            .replace(regex, "$1:");
    });
}

export type ComfyUploadImageType = "output" | "input" | "temp"

export interface ComfyUploadImageAPIResponse {
    name: string, // Yes this is different from the "executed" event args
    subfolder: string,
    type: ComfyUploadImageType
}

/*
 * Uploads an image into ComfyUI's `input` folder.
 */
export async function uploadImageToComfyUI(blob: Blob, filename: string, type: ComfyUploadImageType, subfolder: string = "", overwrite: boolean = false): Promise<ComfyImageLocation> {
    console.debug("[utils] Uploading image to ComfyUI", filename, blob.size)

    const url = `http://${location.hostname}:8188` // TODO make configurable

    const formData = new FormData();
    formData.append("image", blob, filename);
    formData.set("type", type)
    formData.set("subfolder", subfolder)
    formData.set("overwrite", String(overwrite))

    const req = new Request(url + "/upload/image", {
        body: formData,
        method: 'POST'
    });

    return fetch(req)
        .then((r) => r.json())
        .then((resp) => {
            return {
                filename: resp.name,
                subfolder: resp.subfolder,
                type: resp.type
            }
        });
}

/*
 * Convenient type for passing around image filepaths and their metadata with
 * wires. Needs to be converted to a filename for use with LoadImage.
 *
 * Litegraph type is COMFYBOX_IMAGE. The array type is COMFYBOX_IMAGES.
 */
export type ComfyBoxImageMetadata = {
    /* For easy structural type detection */
    isComfyBoxImageMetadata: true,
    /* Pointer to where this image resides in ComfyUI. */
    comfyUIFile: ComfyImageLocation,
    /* Readable name of the image. */
    name: string
    /* Tags applicable to this image, like ["mask"]. */
    tags: string[],
    /* Image width. */
    width?: number,
    /* Image height. */
    height?: number,
}

export function isComfyBoxImageMetadata(value: any): value is ComfyBoxImageMetadata {
    return value && typeof value === "object" && (value as any).isComfyBoxImageMetadata;
}

export function isComfyBoxImageMetadataArray(value: any): value is ComfyBoxImageMetadata[] {
    return Array.isArray(value) && value.every(isComfyBoxImageMetadata);
}

export function isComfyExecutionResult(value: any): value is ComfyExecutionResult {
    return value && typeof value === "object" && Array.isArray(value.images)
}

export function filenameToComfyBoxMetadata(filename: string, type: ComfyUploadImageType, subfolder: string = ""): ComfyBoxImageMetadata {
    return {
        isComfyBoxImageMetadata: true,
        comfyUIFile: {
            filename,
            subfolder,
            type
        },
        name: "Filename",
        tags: [],
    }
}

export function comfyFileToComfyBoxMetadata(comfyUIFile: ComfyImageLocation): ComfyBoxImageMetadata {
    return {
        isComfyBoxImageMetadata: true,
        comfyUIFile,
        name: "File",
        tags: [],
    }
}

/*
 * Converts a ComfyUI file into an annotated filepath. Backend nodes like
 * LoadImage support syntax like "subfolder/image.png [output]" to specify which
 * image folder to load from.
 */
export function comfyFileToAnnotatedFilepath(comfyUIFile: ComfyImageLocation): string {
    let path = ""
    if (comfyUIFile.subfolder != "")
        path = comfyUIFile.subfolder + "/";

    path += `${comfyUIFile.filename} [${comfyUIFile.type}]`
    return path;
}

export function executionResultToImageMetadata(result: ComfyExecutionResult): ComfyBoxImageMetadata[] {
    return result.images.map(comfyFileToComfyBoxMetadata)
}

export function parseWhateverIntoImageMetadata(param: any): ComfyBoxImageMetadata[] | null {
    let meta: ComfyBoxImageMetadata[] | null = null

    if (isComfyBoxImageMetadata(param)) {
        meta = [param];
    }
    else if (Array.isArray(param) && param.every(isComfyBoxImageMetadata)) {
        meta = param
    }
    else if (isComfyExecutionResult(param)) {
        meta = executionResultToImageMetadata(param)
    }

    return meta;
}

export function comfyBoxImageToComfyFile(image: ComfyBoxImageMetadata): ComfyImageLocation {
    return image.comfyUIFile
}

export function comfyBoxImageToComfyURL(image: ComfyBoxImageMetadata): string {
    return convertComfyOutputToComfyURL(image.comfyUIFile)
}
