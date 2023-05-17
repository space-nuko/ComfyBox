import { LiteGraph, LGraph, LGraphCanvas, LGraphNode, type LGraphNodeConstructor, type LGraphNodeExecutable, type SerializedLGraph, type SerializedLGraphGroup, type SerializedLGraphNode, type SerializedLLink, NodeMode, type Vector2, BuiltInSlotType, type INodeInputSlot, type NodeID, type NodeTypeSpec, type NodeTypeOpts, type SlotIndex } from "@litegraph-ts/core";
import type { LConnectionKind, INodeSlot } from "@litegraph-ts/core";
import ComfyAPI, { type ComfyAPIStatusResponse, type ComfyBoxPromptExtraData, type ComfyPromptRequest, type ComfyNodeID, type PromptID } from "$lib/api"
import { getPngMetadata, importA1111 } from "$lib/pnginfo";
import EventEmitter from "events";
import type TypedEmitter from "typed-emitter";

// Import nodes
import "@litegraph-ts/nodes-basic"
import "@litegraph-ts/nodes-events"
import "@litegraph-ts/nodes-logic"
import "@litegraph-ts/nodes-math"
import "@litegraph-ts/nodes-strings"
import "$lib/nodes/index"
import "$lib/nodes/widgets/index"
import * as nodes from "$lib/nodes/index"
import * as widgets from "$lib/nodes/widgets/index"

import ComfyGraphCanvas, { type SerializedGraphCanvasState } from "$lib/ComfyGraphCanvas";
import type ComfyGraphNode from "$lib/nodes/ComfyGraphNode";
import queueState from "$lib/stores/queueState";
import { type SvelteComponentDev } from "svelte/internal";
import type IComfyInputSlot from "$lib/IComfyInputSlot";
import type { SerializedLayoutState } from "$lib/stores/layoutState";
import layoutState from "$lib/stores/layoutState";
import { toast } from '@zerodevx/svelte-toast'
import ComfyGraph from "$lib/ComfyGraph";
import { ComfyBackendNode } from "$lib/nodes/ComfyBackendNode";
import { get } from "svelte/store";
import { tick } from "svelte";
import uiState from "$lib/stores/uiState";
import { download, graphToGraphVis, jsonToJsObject, promptToGraphVis, range, workflowToGraphVis } from "$lib/utils";
import notify from "$lib/notify";
import configState from "$lib/stores/configState";
import { blankGraph } from "$lib/defaultGraph";
import type { ComfyExecutionResult } from "$lib/utils";
import ComfyPromptSerializer, { UpstreamNodeLocator, isActiveBackendNode } from "./ComfyPromptSerializer";
import { iterateNodeDefInputs, type ComfyNodeDef, isBackendNodeDefInputType, iterateNodeDefOutputs } from "$lib/ComfyNodeDef";
import { ComfyComboNode } from "$lib/nodes/widgets";

export const COMFYBOX_SERIAL_VERSION = 1;

if (typeof window !== "undefined") {
    // Load default visibility
    nodes.ComfyReroute.setDefaultTextVisibility(!!localStorage["Comfy.ComfyReroute.DefaultVisibility"]);
}

type QueueItem = { num: number, batchCount: number }

export type SerializedAppState = {
    createdBy: "ComfyBox",
    version: number,
    workflow: SerializedLGraph,
    layout: SerializedLayoutState,
    canvas: SerializedGraphCanvasState
}

/** [link origin, link index] | value */
export type SerializedPromptInput = [ComfyNodeID, number] | any

export type SerializedPromptInputs = {
    /* property name -> value or link */
    inputs: Record<string, SerializedPromptInput>,
    class_type: string
}

export type SerializedPromptInputsAll = Record<ComfyNodeID, SerializedPromptInputs>

export type SerializedPrompt = {
    workflow: SerializedLGraph,
    output: SerializedPromptInputsAll
}

export type SerializedPromptOutputs = Record<ComfyNodeID, ComfyExecutionResult>

export type Progress = {
    value: number,
    max: number
}

type BackendComboNode = {
    comboNode: ComfyComboNode,
    comfyInput: IComfyInputSlot,
    backendNode: ComfyBackendNode
}

export default class ComfyApp {
    api: ComfyAPI;
    rootEl: HTMLDivElement | null = null;
    canvasEl: HTMLCanvasElement | null = null;
    canvasCtx: CanvasRenderingContext2D | null = null;
    lGraph: ComfyGraph | null = null;
    lCanvas: ComfyGraphCanvas | null = null;
    dropZone: HTMLElement | null = null;
    nodeOutputs: Record<string, any> = {};

    shiftDown: boolean = false;
    selectedGroupMoving: boolean = false;

    private queueItems: QueueItem[] = [];
    private processingQueue: boolean = false;
    private alreadySetup = false;
    private promptSerializer: ComfyPromptSerializer;

    constructor() {
        this.api = new ComfyAPI();
        this.promptSerializer = new ComfyPromptSerializer();
    }

    async setup(): Promise<void> {
        if (this.alreadySetup) {
            console.error("Already setup")
            return;
        }

        this.setupColorScheme()

        this.rootEl = document.getElementById("app") as HTMLDivElement;
        this.canvasEl = document.getElementById("graph-canvas") as HTMLCanvasElement;
        this.lGraph = new ComfyGraph();
        this.lCanvas = new ComfyGraphCanvas(this, this.canvasEl);
        this.canvasCtx = this.canvasEl.getContext("2d");

        LiteGraph.release_link_on_empty_shows_menu = true;
        LiteGraph.alt_drag_do_clone_nodes = true;

        const uiUnlocked = get(uiState).uiUnlocked;
        this.lCanvas.allow_dragnodes = uiUnlocked;
        this.lCanvas.allow_interaction = uiUnlocked;

        // await this.#invokeExtensionsAsync("init");
        await this.registerNodes();

        // Load previous workflow
        let restored = false;
        try {
            const json = localStorage.getItem("workflow");
            if (json) {
                const state = JSON.parse(json) as SerializedAppState;
                await this.deserialize(state)
                restored = true;
            }
        } catch (err) {
            console.error("Error loading previous workflow", err);
            notify(`Error loading previous workflow:\n${err}`, { type: "error", timeout: null })
        }

        // We failed to restore a workflow so load the default
        if (!restored) {
            await this.initDefaultGraph();
        }

        // Save current workflow automatically
        // setInterval(this.saveStateToLocalStorage.bind(this), 1000);

        this.addApiUpdateHandlers();
        this.addDropHandler();
        this.addPasteHandler();
        this.addKeyboardHandler();

        await this.updateHistoryAndQueue();

        // await this.#invokeExtensionsAsync("setup");

        // Ensure the canvas fills the window
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas.bind(this));

        this.requestPermissions();

        this.alreadySetup = true;

        return Promise.resolve();
    }

    resizeCanvas() {
        this.canvasEl.width = this.canvasEl.parentElement.offsetWidth;
        this.canvasEl.height = this.canvasEl.parentElement.offsetHeight;
        this.canvasEl.style.width = ""
        this.canvasEl.style.height = ""
        this.lCanvas.draw(true, true);
    }

    saveStateToLocalStorage() {
        try {
            uiState.update(s => { s.isSavingToLocalStorage = true; return s; })
            const savedWorkflow = this.serialize();
            const json = JSON.stringify(savedWorkflow);
            localStorage.setItem("workflow", json)
            notify("Saved to local storage.")
        }
        catch (err) {
            notify(`Failed saving to local storage:\n${err}`, { type: "error" })
        }
        finally {
            uiState.update(s => { s.isSavingToLocalStorage = false; return s; })
        }
    }

    static node_type_overrides: Record<string, typeof ComfyBackendNode> = {}
    static widget_type_overrides: Record<string, typeof SvelteComponentDev> = {}

    private async registerNodes() {
        // Load node definitions from the backend
        const defs = await this.api.getNodeDefs();

        // Register a node for each definition
        for (const [nodeId, nodeDef] of Object.entries(defs)) {
            const typeOverride = ComfyApp.node_type_overrides[nodeId]
            if (typeOverride)
                console.debug("Attaching custom type to received node:", nodeId, typeOverride)
            const baseClass: typeof ComfyBackendNode = typeOverride || ComfyBackendNode;

            const ctor = class extends baseClass {
                constructor(title?: string) {
                    super(title, nodeId, nodeDef);
                }
            }

            const node: LGraphNodeConstructor = {
                class: ctor,
                title: nodeDef.display_name || nodeDef.name,
                type: nodeId,
                desc: `ComfyNode: ${nodeId}`
            }

            LiteGraph.registerNodeType(node);
            node.category = nodeDef.category;

            ComfyApp.registerDefaultSlotHandlers(nodeId, nodeDef)
        }
    }

    static registerDefaultSlotHandlers(nodeId: string, nodeDef: ComfyNodeDef) {
        const nodeTypeSpec: NodeTypeOpts = {
            node: nodeId,
            title: nodeDef.display_name || nodeDef.name,
            properties: null,
            inputs: null,
            outputs: null
        }

        for (const [inputName, [inputType, _inputOpts]] of iterateNodeDefInputs(nodeDef)) {
            if (isBackendNodeDefInputType(inputName, inputType)) {
                LiteGraph.slot_types_default_out[inputType] ||= []
                LiteGraph.slot_types_default_out[inputType].push(nodeTypeSpec)
            }
        }
        for (const output of iterateNodeDefOutputs(nodeDef)) {
            LiteGraph.slot_types_default_in[output.type] ||= []
            LiteGraph.slot_types_default_in[output.type].push(nodeTypeSpec)
        }
    }

    private showDropZone() {
        if (this.dropZone)
            this.dropZone.style.display = "block";
    }

    private hideDropZone() {
        if (this.dropZone)
            this.dropZone.style.display = "none";
    }

    private allowDrag(event: DragEvent) {
        if (event.dataTransfer.items?.length > 0) {
            event.dataTransfer.dropEffect = 'copy';
            this.showDropZone();
            event.preventDefault();
        }
    }

    private async handleDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.hideDropZone();

        if (event.dataTransfer.files.length > 0) {
            await this.handleFile(event.dataTransfer.files[0]);
        }
    }

    private addDropHandler() {
        // this.dropZone = document.getElementById("dropzone");

        // if (this.dropZone) {
        //     window.addEventListener('dragenter', this.allowDrag.bind(this));
        //     this.dropZone.addEventListener('dragover', this.allowDrag.bind(this));
        //     this.dropZone.addEventListener('dragleave', this.hideDropZone.bind(this));
        //     this.dropZone.addEventListener('drop', this.handleDrop.bind(this));
        // }
        // else {
        //     console.warn("No dropzone detected (probably on mobile).")
        // }
    }

    /**
     * Adds a handler on paste that extracts and loads workflows from pasted JSON data
     */
    private addPasteHandler() {
        // document.addEventListener("paste", (e) => {
        //     let data = (e.clipboardData || (window as any).clipboardData).getData("text/plain");
        //     let workflow;
        //     try {
        //         data = data.slice(data.indexOf("{"));
        //         workflow = JSON.parse(data);
        //     } catch (err) {
        //         try {
        //             data = data.slice(data.indexOf("workflow\n"));
        //             data = data.slice(data.indexOf("{"));
        //             workflow = JSON.parse(data);
        //         } catch (error) { }
        //     }

        //     if (workflow && workflow.version && workflow.nodes && workflow.extra) {
        //         this.loadGraphData(workflow);
        //     }
        // });
    }

    /**
     * Handles updates from the API socket
     */
    private addApiUpdateHandlers() {
        this.api.addEventListener("status", (status: ComfyAPIStatusResponse) => {
            queueState.statusUpdated(status);
        });

        this.api.addEventListener("reconnecting", () => {
            uiState.reconnecting()
        });

        this.api.addEventListener("reconnected", () => {
            uiState.reconnected()
        });

        this.api.addEventListener("progress", (progress: Progress) => {
            queueState.progressUpdated(progress);
            this.lGraph.setDirtyCanvas(true, false);
        });

        this.api.addEventListener("executing", (promptID: PromptID | null, nodeID: ComfyNodeID | null) => {
            queueState.executingUpdated(promptID, nodeID);
            this.lGraph.setDirtyCanvas(true, false);
        });

        this.api.addEventListener("executed", (promptID: PromptID, nodeID: ComfyNodeID, output: ComfyExecutionResult) => {
            this.nodeOutputs[nodeID] = output;
            const node = this.lGraph.getNodeByIdRecursive(nodeID) as ComfyGraphNode;
            if (node?.onExecuted) {
                node.onExecuted(output);
            }
            queueState.onExecuted(promptID, nodeID, output)
        });

        this.api.addEventListener("execution_start", (promptID: PromptID) => {
            queueState.executionStart(promptID)
        });

        this.api.addEventListener("execution_cached", (promptID: PromptID, nodes: ComfyNodeID[]) => {
            queueState.executionCached(promptID, nodes)
        });

        this.api.addEventListener("execution_error", (promptID: PromptID, message: string) => {
            queueState.executionError(promptID, message)
            notify(`Execution error: ${message}`, { type: "error", timeout: 10000 })
        });

        this.api.init();
    }

    private addKeyboardHandler() {
        window.addEventListener("keydown", (e) => {
            this.shiftDown = e.shiftKey;

            // Queue prompt using ctrl or command + enter
            if ((e.ctrlKey || e.metaKey) && (e.key === "Enter" || e.keyCode === 13 || e.keyCode === 10)) {
                this.runDefaultQueueAction();
            }
        });
        window.addEventListener("keyup", (e) => {
            this.shiftDown = e.shiftKey;
        });
    }

    private async updateHistoryAndQueue() {
        const queue = await this.api.getQueue();
        const history = await this.api.getHistory();
        queueState.queueUpdated(queue);
        queueState.historyUpdated(history);
    }

    private requestPermissions() {
        if (Notification.permission === "default") {
            Notification.requestPermission()
                .then((result) => console.log("Notification status:", result));
        }
    }

    private setupColorScheme() {
        const setColor = (type: any, color: string) => {
            LGraphCanvas.DEFAULT_LINK_TYPE_COLORS[type] = color
            LGraphCanvas.DEFAULT_CONNECTION_COLORS_BY_TYPE[type] = color
        }

        // Distinguish frontend/backend connections
        const BACKEND_TYPES = ["CLIP", "CLIP_VISION", "CLIP_VISION_OUTPUT", "CONDITIONING", "CONTROL_NET", "LATENT", "MASK", "MODEL", "STYLE_MODEL", "VAE", "UPSCALE_MODEL"]
        for (const type of BACKEND_TYPES) {
            setColor(type, "orange")
        }

        setColor("COMFYBOX_IMAGES", "rebeccapurple")
        setColor("COMFYBOX_IMAGE", "fuchsia")
        setColor(BuiltInSlotType.EVENT, "lightseagreen")
        setColor(BuiltInSlotType.ACTION, "lightseagreen")
    }

    serialize(): SerializedAppState {
        const graph = this.lGraph;

        const serializedGraph = graph.serialize()
        const serializedLayout = layoutState.serialize()
        const serializedCanvas = this.lCanvas.serialize();

        return {
            createdBy: "ComfyBox",
            version: COMFYBOX_SERIAL_VERSION,
            workflow: serializedGraph,
            layout: serializedLayout,
            canvas: serializedCanvas
        }
    }

    async deserialize(data: SerializedAppState) {
        if (data.version !== COMFYBOX_SERIAL_VERSION) {
            throw `Invalid ComfyBox saved data format: ${data.version}`
        }

        // Ensure loadGraphData does not trigger any state changes in layoutState
        // (isConfiguring is set to true here)
        // lGraph.configure will add new nodes, triggering onNodeAdded, but we
        // want to restore the layoutState ourselves
        layoutState.onStartConfigure();

        this.loadGraphData(data.workflow)

        // Now restore the layout
        // Subsequent added nodes will add the UI data to layoutState
        layoutState.deserialize(data.layout, this.lGraph)

        // Restore canvas offset/zoom
        this.lCanvas.deserialize(data.canvas)

        await this.refreshComboInNodes();

        this.lGraph.start();
        this.lGraph.eventBus.on("afterExecute", () => this.lCanvas.draw(true))
    }

    async initDefaultGraph() {
        let state = null;
        try {
            const graphResponse = await fetch("/workflows/defaultWorkflow.json");
            state = await graphResponse.json() as SerializedAppState;
        }
        catch (error) {
            console.error("Failed to load default graph", error)
            notify(`Failed to load default graph: ${error}`, { type: "error" })
            state = structuredClone(blankGraph)
        }
        await this.deserialize(state)
    }

    /**
     * Populates the graph with the specified workflow data
     * @param {*} graphData A serialized graph object
     */
    loadGraphData(graphData: SerializedLGraph) {
        this.clean();

        // Patch T2IAdapterLoader to ControlNetLoader since they are the same node now
        for (let n of graphData.nodes) {
            if (n.type == "T2IAdapterLoader") n.type = "ControlNetLoader";
        }

        this.lGraph.configure(graphData);

        for (const node of this.lGraph._nodes) {
            const size = node.computeSize();
            size[0] = Math.max(node.size[0], size[0]);
            size[1] = Math.max(node.size[1], size[1]);
            node.size = size;
            // this.#invokeExtensions("loadedGraphNode", node);
        }
    }

    clear() {
        this.clean();

        const blankGraph: SerializedLGraph = {
            last_node_id: 0,
            last_link_id: 0,
            nodes: [],
            links: [],
            groups: [],
            config: {},
            extra: {},
            version: 0
        }

        layoutState.onStartConfigure();
        this.lCanvas.closeAllSubgraphs();
        this.lGraph.configure(blankGraph)
        layoutState.initDefaultLayout();
        uiState.update(s => {
            s.uiUnlocked = true;
            s.uiEditMode = "widgets";
            return s;
        })
    }

    runDefaultQueueAction() {
        for (const node of this.lGraph.iterateNodesInOrder()) {
            if ("onDefaultQueueAction" in node) {
                (node as ComfyGraphNode).onDefaultQueueAction()
            }
        }

        if (get(layoutState).attrs.queuePromptButtonRunWorkflow) {
            this.queuePrompt(0, 1);
        }
    }

    querySave() {
        const promptFilename = get(configState).promptForWorkflowName;

        let filename = "workflow.json";
        if (promptFilename) {
            filename = prompt("Save workflow as:", filename);
            if (!filename) return;
            if (!filename.toLowerCase().endsWith(".json")) {
                filename += ".json";
            }
        }
        else {
            const date = new Date();
            const formattedDate = date.toISOString().replace(/:/g, '-').replace(/\.\d{3}/g, '').replace('T', '_').replace("Z", "");
            filename = `workflow-${formattedDate}.json`
        }

        const indent = 2
        const json = JSON.stringify(this.serialize(), null, indent)

        download(filename, json, "application/json")

        console.debug(jsonToJsObject(json))
    }

    /**
     * Converts the current graph workflow for sending to the API
     * @returns The workflow and node links
     */
    graphToPrompt(tag: string | null = null): SerializedPrompt {
        return this.promptSerializer.serialize(this.lGraph, tag)
    }

    async queuePrompt(num: number, batchCount: number = 1, tag: string | null = null) {
        this.queueItems.push({ num, batchCount });

        // Only have one action process the items so each one gets a unique seed correctly
        if (this.processingQueue) {
            return;
        }

        if (tag === "")
            tag = null;

        this.processingQueue = true;
        try {
            while (this.queueItems.length) {
                ({ num, batchCount } = this.queueItems.pop());
                console.debug(`Queue get! ${num} ${batchCount} ${tag}`);

                const thumbnails = []
                for (const node of this.lGraph.iterateNodesInOrderRecursive()) {
                    if (node.mode !== NodeMode.ALWAYS
                        || (tag != null
                            && Array.isArray(node.properties.tags)
                            && node.properties.tags.indexOf(tag) === -1))
                        continue;

                    if ("getPromptThumbnails" in node) {
                        const thumbsToAdd = (node as ComfyGraphNode).getPromptThumbnails();
                        if (thumbsToAdd)
                            thumbnails.push(...thumbsToAdd)
                    }
                }

                for (let i = 0; i < batchCount; i++) {
                    for (const node of this.lGraph.iterateNodesInOrderRecursive()) {
                        if (node.mode !== NodeMode.ALWAYS)
                            continue;

                        if ("beforeQueued" in node) {
                            (node as ComfyGraphNode).beforeQueued(tag);
                        }
                    }

                    const p = this.graphToPrompt(tag);
                    const l = layoutState.serialize();
                    console.debug(graphToGraphVis(this.lGraph))
                    console.debug(promptToGraphVis(p))

                    const extraData: ComfyBoxPromptExtraData = {
                        extra_pnginfo: {
                            workflow: p.workflow,
                            comfyBoxLayout: l,
                            comfyBoxSubgraphs: [tag],
                        },
                        thumbnails
                    }

                    let error: string | null = null;
                    let promptID: PromptID | null = null;

                    const request: ComfyPromptRequest = {
                        number: num,
                        extra_data: extraData,
                        prompt: p.output
                    }

                    try {
                        const response = await this.api.queuePrompt(request);
                        if (response.error != null) {
                            error = response.error;
                        }
                        else {
                            queueState.afterQueued(response.promptID, num, p.output, extraData)
                        }
                    } catch (err) {
                        error = err?.toString();
                    }

                    if (error != null) {
                        const mes: string = error;
                        notify(`Error queuing prompt:\n${mes}`, { type: "error" })
                        console.error(graphToGraphVis(this.lGraph))
                        console.error(promptToGraphVis(p))
                        console.error("Error queuing prompt", error, num, p)
                        break;
                    }

                    for (const n of p.workflow.nodes) {
                        const node = this.lGraph.getNodeByIdRecursive(n.id);
                        if ("afterQueued" in node) {
                            (node as ComfyGraphNode).afterQueued(p, tag);
                        }
                    }

                    this.lCanvas.draw(true, true);
                }
            }
        } finally {
            console.log("Queue finished!");
            this.processingQueue = false;
        }
    }

    /**
     * Loads workflow data from the specified file
     */
    async handleFile(file: File) {
        if (file.type === "image/png") {
            const pngInfo = await getPngMetadata(file);
            if (pngInfo) {
                if (pngInfo.comfyBoxConfig) {
                    this.deserialize(JSON.parse(pngInfo.comfyBoxConfig));
                } else if (pngInfo.parameters) {
                    throw "TODO A111 import!"
                    // importA1111(this.lGraph, pngInfo.parameters, this.api);
                }
                else {
                    console.error("No metadata found in image file.", pngInfo)
                    notify("No metadata found in image file.", { type: "error" })
                }
            }
        } else if (file.type === "application/json" || file.name.endsWith(".json")) {
            const reader = new FileReader();
            reader.onload = () => {
                this.deserialize(JSON.parse(reader.result as string));
            };
            reader.readAsText(file);
        }
    }

    // registerExtension(extension) {
    // 	if (!extension.name) {
    // 		throw new Error("Extensions must have a 'name' property.");
    // 	}
    // 	if (this.extensions.find((ext) => ext.name === extension.name)) {
    // 		throw new Error(`Extension named '${extension.name}' already registered.`);
    // 	}
    // 	this.extensions.push(extension);
    // }

    /**
     * Refresh combo list on whole nodes
     */
    async refreshComboInNodes(flashUI: boolean = false) {
        const defs = await this.api.getNodeDefs();

        const isComfyComboNode = (node: LGraphNode): node is ComfyComboNode => {
            return node
                && node.type === "ui/combo"
                && "doAutoConfig" in node;
        }

        const isComfyComboInput = (input: INodeInputSlot): input is IComfyInputSlot => {
            return "config" in input
                && "widgetNodeType" in input
                && input.widgetNodeType === "ui/combo";
        }

        // Node IDs of combo widgets attached to a backend node
        const backendUpdatedCombos: Record<NodeID, BackendComboNode> = {}

        console.debug("[refreshComboInNodes] start")

        // Figure out which combo nodes to update. They need to be connected to
        // an input slot on a backend node with a backend config in the input
        // slot connected to.
        const nodeLocator = new UpstreamNodeLocator(isComfyComboNode)

        const findComfyInputAndAttachedCombo = (node: LGraphNode, i: SlotIndex): [IComfyInputSlot, ComfyComboNode] | null => {
            const input = node.inputs[i]

            // Does this input autocreate a combo box on creation?
            const isComfyInput = isComfyComboInput(input)
            if (!isComfyInput)
                return null;

            // Find an attached combo node even if it's inside/outside of a
            // subgraph, linked after several nodes, etc.
            const [comboNode, _link] = nodeLocator.locateUpstream(node, i, null);

            if (comboNode == null)
                return null;

            const result: [IComfyInputSlot, ComfyComboNode] = [input, comboNode as ComfyComboNode]
            return result
        }

        for (const node of this.lGraph.iterateNodesInOrderRecursive()) {
            if (!isActiveBackendNode(node))
                continue;

            const found = range(node.inputs.length)
                .map((i) => findComfyInputAndAttachedCombo(node, i))
                .filter(Boolean);

            for (const [comfyInput, comboNode] of found) {
                const def = defs[node.type];

                const hasBackendConfig = def["input"]["required"][comfyInput.name] !== undefined

                if (hasBackendConfig) {
                    backendUpdatedCombos[comboNode.id] = { comboNode, comfyInput, backendNode: node }
                }
            }
        }

        console.debug("[refreshComboInNodes] found:", backendUpdatedCombos.length, backendUpdatedCombos)

        // Mark combo nodes without backend configs as being loaded already.
        for (const node of this.lGraph.iterateNodesOfClassRecursive(ComfyComboNode)) {
            if (backendUpdatedCombos[node.id] != null) {
                continue;
            }

            // This node isn't connected to a backend node, so it's configured
            // by the frontend instead.
            const comboNode = node as ComfyComboNode;
            let values = comboNode.properties.values;

            // Frontend nodes can declare defaultWidgets which creates a
            // config inside their own inputs slots too.
            const foundInput = range(node.outputs.length)
                .flatMap(i => node.getInputSlotsConnectedTo(i))
                .find(inp => "config" in inp && Array.isArray((inp.config as any).values))

            if (foundInput != null) {
                const comfyInput = foundInput as IComfyInputSlot;
                console.warn("[refreshComboInNodes] found frontend config:", node.title, node.type, comfyInput.config.values)
                values = comfyInput.config.values;
            }

            comboNode.formatValues(values);
        }

        await tick();

        // Load definitions from the backend.
        for (const { comboNode, comfyInput, backendNode } of Object.values(backendUpdatedCombos)) {
            const def = defs[backendNode.type];
            const rawValues = def["input"]["required"][comfyInput.name][0];

            console.debug("[ComfyApp] Reconfiguring combo widget", backendNode.type, "=>", comboNode.type, rawValues.length)
            comboNode.doAutoConfig(comfyInput, { includeProperties: new Set(["values"]), setWidgetTitle: false })

            comboNode.formatValues(rawValues as string[], true)
            if (!rawValues?.includes(get(comboNode.value))) {
                comboNode.setValue(rawValues[0])
            }
        }
    }

    /**
     * Clean current state
     */
    clean() {
        this.nodeOutputs = {};
    }
}
