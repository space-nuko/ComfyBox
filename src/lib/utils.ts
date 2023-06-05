import { type WidgetLayout, type WritableLayoutStateStore } from "$lib/stores/layoutStates";
import selectionState from "$lib/stores/selectionState";
import type { FileData as GradioFileData } from "@gradio/upload";
import { Subgraph, type LGraph, type LGraphNode, type LLink, type SerializedLGraph, type UUID, type NodeID, type SlotType, type Vector4, type SerializedLGraphNode } from "@litegraph-ts/core";
import { get } from "svelte/store";
import type { ComfyNodeID } from "./api";
import workflowState, { type WorkflowReceiveOutputTargets } from "./stores/workflowState";
import ComfyApp, { type SerializedPrompt, type SerializedPromptInput, type SerializedPromptInputLink } from "./components/ComfyApp";
import { ImageViewer } from "./ImageViewer";
import configState from "$lib/stores/configState";
import SendOutputModal, { type SendOutputModalResult } from "$lib/components/modal/SendOutputModal.svelte";

export function clamp(n: number, min: number, max: number): number {
    if (max <= min)
        return min;
    return Math.min(Math.max(n, min), max)
}

export function negmod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

export function range(size: number, startAt: number = 0): ReadonlyArray<number> {
    return [...Array(size).keys()].map(i => i + startAt);
}

export function countNewLines(str: string): number {
    return str.split(/\r\n|\r|\n/).length
}

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function basename(filepath: string): string {
    const filename = filepath.split('/').pop().split('\\').pop();
    return filename.split('.').slice(0, -1).join('.');
}

export function truncateString(str: string, num: number): string {
    if (num <= 0)
        return "…";

    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + "…";
}

export function* enumerate<T>(iterable: Iterable<T>): Iterable<[number, T]> {
    let index = 0;
    for (const value of iterable) {
        yield [index++, value];
    }
}

export async function timeExecutionMs(fn: (...any) => Promise<any>, ...args: any[]): Promise<number> {
    const start = new Date().getTime();

    await fn.apply(null, args)

    return new Date().getTime() - start;
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

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string, type: string = "image/png") {
    var link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL(type);
    link.click();
}

export const MAX_LOCAL_STORAGE_MB = 5;

export function getLocalStorageUsedMB(): number {
    var total = 0;
    for (const x in localStorage) {
        // Value is multiplied by 2 due to data being stored in `utf-16` format, which requires twice the space.
        const amount = (localStorage[x].length * 2) / 1024 / 1024;
        if (!isNaN(amount) && localStorage.hasOwnProperty(x)) {
            total += amount;
        }
    }
    return total
};

export function startDrag(evt: MouseEvent, layoutState: WritableLayoutStateStore) {
    const dragItemId: string = evt.target.dataset["dragItemId"];
    const ss = get(selectionState)
    const ls = get(layoutState)

    if (evt.button !== 0) {
        if (ss.currentSelection.length <= 1 && !ls.isMenuOpen)
            ss.currentSelection = [dragItemId]
        return;
    }

    const item = ls.allItems[dragItemId].dragItem

    console.debug("startDrag", item)

    if (evt.ctrlKey) {
        const index = ss.currentSelection.indexOf(item.id)
        if (index === -1)
            ss.currentSelection.push(item.id);
        else
            ss.currentSelection.splice(index, 1);
        ss.currentSelection = ss.currentSelection;
    }
    else {
        ss.currentSelection = [item.id]
    }
    ss.currentSelectionNodes = [];
    for (const id of ss.currentSelection) {
        const item = ls.allItems[id].dragItem
        if (item.type === "widget") {
            const node = (item as WidgetLayout).node;
            if (node) {
                ss.currentSelectionNodes.push(node)
            }
        }
    }

    layoutState.set(ls)
    selectionState.set(ss)
    layoutState.notifyWorkflowModified();
};

export function stopDrag(evt: MouseEvent, layoutState: WritableLayoutStateStore) {
    layoutState.notifyWorkflowModified();
};

export function isSerializedPromptInputLink(inputValue: SerializedPromptInput): inputValue is SerializedPromptInputLink {
    return Array.isArray(inputValue) && inputValue.length === 2 && typeof inputValue[0] === "string" && typeof inputValue[1] === "number"
}

export function graphToGraphVis(graph: LGraph): string {
    let links: string[] = []
    let seenLinks = new Set()
    let subgraphs: Record<string, [Subgraph, string[]]> = {}
    let subgraphNodes: Record<number | UUID, Subgraph> = {}
    let idToInt: Record<number | UUID, number> = {}
    let curId = 0;

    const convId = (id: number | UUID): number => {
        if (idToInt[id] == null) {
            idToInt[id] = curId++;
        }
        return idToInt[id];
    }

    const addLink = (node: LGraphNode, link: LLink): string => {
        const nodeA = node.graph.getNodeById(link.origin_id)
        const nodeB = node.graph.getNodeById(link.target_id);
        seenLinks.add(link.id)
        return `    "${convId(nodeA.id)}_${nodeA.title}" -> "${convId(nodeB.id)}_${nodeB.title}";\n`;
    }

    for (const node of graph.iterateNodesInOrderRecursive()) {
        for (let [index, input] of enumerate(node.iterateInputInfo())) {
            const link = node.getInputLink(index);
            if (link && !seenLinks.has(link.id)) {
                const linkText = addLink(node, link)
                if (node.graph != graph) {
                    subgraphs[node.graph._subgraph_node.id] ||= [node.graph._subgraph_node, []]
                    subgraphs[node.graph._subgraph_node.id][1].push(linkText)
                    subgraphNodes[node.graph._subgraph_node.id] = node.graph._subgraph_node
                }
                else {
                    links.push(linkText)
                }
            }
        }
        for (let [index, output] of enumerate(node.iterateOutputInfo())) {
            for (const link of node.getOutputLinks(index)) {
                if (!seenLinks.has(link.id)) {
                    const linkText = addLink(node, link)
                    if (node.graph != graph) {
                        subgraphs[node.graph._subgraph_node.id] ||= [node.graph._subgraph_node, []]
                        subgraphs[node.graph._subgraph_node.id][1].push(linkText)
                        subgraphNodes[node.graph._subgraph_node.id] = node.graph._subgraph_node
                    }
                    else {
                        links.push(linkText)
                    }
                }
            }
        }
    }

    let out = "digraph {\n"
    out += '    fontname="Helvetica,Arial,sans-serif"\n'
    out += '    node [fontname="Helvetica,Arial,sans-serif"]\n'
    out += '    edge [fontname="Helvetica,Arial,sans-serif"]\n'
    out += '    node [shape=box style=filled fillcolor="#DDDDDD"]\n'

    for (const [subgraph, links] of Object.values(subgraphs)) {
        // Subgraph name has to be prefixed with "cluster" to show up as a cluster...
        out += `    subgraph cluster_subgraph_${convId(subgraph.id)} {\n`
        out += `        label="${convId(subgraph.id)}_${subgraph.title}";\n`;
        out += "        color=red;\n";
        // out += "        style=grey;\n";
        out += "    " + links.join("    ")
        out += "    }\n"
    }

    out += links.join("")

    out += "}"
    return out
}

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

    const ids: Record<NodeID, number> = {}
    let nextID = 0;

    for (const pair of Object.entries(prompt.output)) {
        const [id, o] = pair;
        if (ids[id] == null)
            ids[id] = nextID++;

        if ("class_type" in o) {
            for (const pair2 of Object.entries(o.inputs)) {
                const [inpName, i] = pair2;

                if (isSerializedPromptInputLink(i)) {
                    // Link
                    const [inpID, inpSlot] = i;
                    if (ids[inpID] == null)
                        ids[inpID] = nextID++;

                    const inpNode = prompt.output[inpID]
                    if (inpNode) {
                        out += `"${ids[inpID]}_${inpNode.class_type}" -> "${ids[id]}_${o.class_type}"\n`
                    }
                }
                else {
                    const value = String(i).substring(0, 20)
                    // Value
                    out += `"${ids[id]}-${inpName}-${value}" -> "${ids[id]}_${o.class_type}"\n`
                }
            }
        }
    }

    out += "}"
    return out
}

export function getNodeInfo(nodeId: ComfyNodeID): string {
    const workflow = workflowState.getWorkflowByNodeID(nodeId);
    if (workflow == null)
        return nodeId;

    const title = workflow.graph?.getNodeByIdRecursive(nodeId)?.title;
    if (title == null)
        return nodeId;

    const displayNodeID = nodeId ? (nodeId.split("-")[0]) : String(nodeId);
    return title + " (" + displayNodeID + ")"
}

export const debounce = (callback: Function, wait = 250) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Array<unknown>) => {
        const next = () => callback(...args);
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(next, wait);
    };
};

export function convertComfyOutputToGradio(output: SerializedPromptOutput): GradioFileData[] {
    return output.images.map(convertComfyOutputEntryToGradio);
}

export function convertComfyOutputEntryToGradio(r: ComfyImageLocation): GradioFileData {
    const url = configState.getBackendURL();
    const params = new URLSearchParams(r)
    const fileData: GradioFileData = {
        name: r.filename,
        orig_name: r.filename,
        is_file: false,
        data: url + "/view?" + params
    }
    return fileData
}

export function convertComfyOutputToComfyURL(output: string | ComfyImageLocation): string {
    if (typeof output === "string")
        return output;

    const params = new URLSearchParams(output)
    const url = configState.getBackendURL();
    return url + "/view?" + params
}

export function convertGradioFileDataToComfyURL(image: GradioFileData, type: ComfyUploadImageType = "input"): string {
    const baseUrl = configState.getBackendURL();
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
    const url = configState.getBackendURL();
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

    const url = configState.getBackendURL();

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

/** Raw output as received from ComfyUI's backend */
export interface SerializedPromptOutput {
    // Technically this response can contain arbitrary data, but "images" is the
    // most frequently used as it's output by LoadImage and PreviewImage, the
    // only two output nodes in base ComfyUI.
    images: ComfyImageLocation[] | null,

    /*
     * Other data
     */
    [key: string]: any
}

/** Raw output entry as received from ComfyUI's backend */
export type ComfyImageLocation = {
    /* Filename with extension in the subfolder. */
    filename: string,
    /* Subfolder in the containing folder. */
    subfolder: string,
    /* Base ComfyUI folder where the image is located. */
    type: ComfyUploadImageType
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
    /* Child images associated with this image, like masks. */
    children: ComfyBoxImageMetadata[]
}

export function isComfyBoxImageMetadata(value: any): value is ComfyBoxImageMetadata {
    return value && typeof value === "object" && (value as any).isComfyBoxImageMetadata;
}

export function isComfyBoxImageMetadataArray(value: any): value is ComfyBoxImageMetadata[] {
    return Array.isArray(value) && value.every(isComfyBoxImageMetadata);
}

export function isComfyExecutionResult(value: any): value is SerializedPromptOutput {
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
        children: []
    }
}

export function comfyFileToComfyBoxMetadata(comfyUIFile: ComfyImageLocation): ComfyBoxImageMetadata {
    return {
        isComfyBoxImageMetadata: true,
        comfyUIFile,
        name: "File",
        tags: [],
        children: []
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

export function executionResultToImageMetadata(result: SerializedPromptOutput): ComfyBoxImageMetadata[] {
    return result.images.map(comfyFileToComfyBoxMetadata)
}

export function isComfyImageLocation(param: any): param is ComfyImageLocation {
    return param != null && typeof param === "object"
        && typeof param.filename === "string"
        && typeof param.type === "string"
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
        meta = executionResultToImageMetadata(param);
    }
    else if (isComfyImageLocation(param)) {
        meta = [comfyFileToComfyBoxMetadata(param)]
    }
    else if (Array.isArray(param) && param.every(isComfyImageLocation)) {
        meta = param.map(comfyFileToComfyBoxMetadata)
    }

    return meta;
}

export function parseWhateverIntoComfyImageLocations(param: any): ComfyImageLocation[] | null {
    const meta = parseWhateverIntoImageMetadata(param);
    if (!Array.isArray(meta))
        return null

    return meta.map(m => m.comfyUIFile);
}

export function comfyBoxImageToComfyFile(image: ComfyBoxImageMetadata): ComfyImageLocation {
    return image.comfyUIFile
}

export function comfyBoxImageToComfyURL(image: ComfyBoxImageMetadata): string {
    return convertComfyOutputToComfyURL(image.comfyUIFile)
}

export function comfyURLToComfyFile(urlString: string): ComfyImageLocation | null {
    const url = new URL(urlString);
    const params = new URLSearchParams(url.search);
    const filename = params.get("filename")
    const type = params.get("type") as ComfyUploadImageType;
    const subfolder = params.get("subfolder") || ""

    // If at least filename and type exist then we're good
    if (filename != null && type != null) {
        return { filename, type, subfolder }
    }

    return null;
}

export function showLightbox(images: string[], index: number, e: Event) {
    e.preventDefault()
    if (!images)
        return

    ImageViewer.instance.showModal(images, index);

    e.stopPropagation()
}

export function getLitegraphType(param: any): SlotType | null {
    if (param == null)
        return null;

    switch (typeof param) {
        case "string":
            return "string"
        case "number":
        case "bigint":
            return "number"
        case "boolean":
            return "boolean"
        case "object":
            if (isComfyBoxImageMetadata(param)) {
                return "COMFYBOX_IMAGE"
            }
            else if (isComfyBoxImageMetadataArray(param)) {
                return "COMFYBOX_IMAGES"
            }
            return null;
        case "symbol":
        case "undefined":
        case "function":
        default:
            return null;
    }
}

export function calcNodesBoundingBox(nodes: SerializedLGraphNode[]): Vector4 {
    let min_x = Number.MAX_SAFE_INTEGER;
    let max_x = 0;
    let min_y = Number.MAX_SAFE_INTEGER;
    let max_y = 0;

    for (const node of Object.values(nodes)) {
        min_x = Math.min(node.pos[0], min_x);
        max_x = Math.max(node.pos[0] + node.size[0], max_x);
        min_y = Math.min(node.pos[1], min_y);
        max_y = Math.max(node.pos[1] + node.size[1], max_y);
    }

    return [min_x, min_y, max_x, max_y];
}

export async function readFileToText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
            resolve(reader.result as string);
        };
        reader.onerror = async () => {
            reject(reader.error);
        }
        reader.readAsText(file);
    })
}


export function nextLetter(s: string): string {
    return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a) {
        var c = a.charCodeAt(0);
        switch (c) {
            case 90: return 'A';
            case 122: return 'a';
            default: return String.fromCharCode(++c);
        }
    });
}

export function playSound(sound: string) {
    if (!configState.canPlayNotificationSound())
        return;

    const url = `${location.origin}/sound/${sound}`;
    const audio = new Audio(url);
    audio.play();
}

export interface ComfyBatchUploadResult {
    error?: string;
    files: Array<ComfyImageLocation>;
}

export type ComfyBatchBlob = {
    blob: Blob,
    filename: string,
    overwrite?: boolean
}

export async function batchUploadFilesToComfyUI(files: Array<File>): Promise<ComfyBatchUploadResult> {
    const blobs = files.map(f => { return { blob: f, filename: f.name } })
    return batchUploadBlobsToComfyUI(blobs)
}

export async function batchUploadBlobsToComfyUI(blobs: ComfyBatchBlob[]): Promise<ComfyBatchUploadResult> {
    const url = configState.getBackendURL();

    const requests = blobs.map(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob.blob, blob.filename);
        if (blob.overwrite) {
            formData.append("overwrite", "true")
        }
        return fetch(new Request(url + "/upload/image", {
            body: formData,
            method: 'POST'
        }))
            .then(r => r.json())
            .catch(error => error);
    });

    return Promise.all(requests)
        .then((results) => {
            const errors = []
            const files = []

            for (const r of results) {
                if (r instanceof Error) {
                    errors.push(r.toString())
                }
                else {
                    // bare filename of image
                    const resp = r as ComfyUploadImageAPIResponse;
                    files.push({
                        filename: resp.name,
                        subfolder: "",
                        type: "input"
                    })
                }
            }

            let error = null;
            if (errors && errors.length > 0)
                error = "Upload error(s):\n" + errors.join("\n");

            return { error, files }
        })
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise(function(resolve) {
        canvas.toBlob(resolve);
    });
}

export type SafetensorsMetadata = Record<string, string>

export async function getSafetensorsMetadata(folder: string, filename: string): Promise<SafetensorsMetadata> {
    const url = configState.getBackendURL();
    const params = new URLSearchParams({ filename })

    return fetch(new Request(url + `/view_metadata/${folder}?` + params)).then(r => r.json())
}

export function partition<T>(myArray: T[], chunkSize: number): T[] {
    let index = 0;
    const arrayLength = myArray.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
        const myChunk = myArray.slice(index, index + chunkSize);
        tempArray.push(myChunk);
    }

    return tempArray;
}

const MOBILE_USER_AGENTS = ["iPhone", "iPad", "Android", "BlackBerry", "WebOs"].map(a => new RegExp(a, "i"))

export function isMobileBrowser(userAgent: string): boolean {
    return MOBILE_USER_AGENTS.some(a => userAgent.match(a))
}

export function isMultiline(input: any, splitLength: number = 50): boolean {
    return typeof input === "string" && (input.length > splitLength || countNewLines(input) > 1);
}
