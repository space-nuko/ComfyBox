import { LiteGraph, LGraph, LGraphCanvas, LGraphNode, type LGraphNodeConstructor, type LGraphNodeExecutable, type SerializedLGraph, type SerializedLGraphGroup, type SerializedLGraphNode, type SerializedLLink, NodeMode, type Vector2, BuiltInSlotType } from "@litegraph-ts/core";
import type { LConnectionKind, INodeSlot } from "@litegraph-ts/core";
import ComfyAPI from "$lib/api"
import defaultGraph from "$lib/defaultGraph"
import { getPngMetadata, importA1111 } from "$lib/pnginfo";
import EventEmitter from "events";
import type TypedEmitter from "typed-emitter";

// Import nodes
import "@litegraph-ts/nodes-basic"
import "@litegraph-ts/nodes-events"
import "@litegraph-ts/nodes-math"
import "@litegraph-ts/nodes-strings"
import "$lib/nodes/index"
import * as nodes from "$lib/nodes/index"

import ComfyGraphCanvas, { type SerializedGraphCanvasState } from "$lib/ComfyGraphCanvas";
import type ComfyGraphNode from "$lib/nodes/ComfyGraphNode";
import * as widgets from "$lib/widgets/index"
import queueState from "$lib/stores/queueState";
import type { SvelteComponentDev } from "svelte/internal";
import type IComfyInputSlot from "$lib/IComfyInputSlot";
import type { SerializedLayoutState } from "$lib/stores/layoutState";
import layoutState from "$lib/stores/layoutState";
import { toast } from '@zerodevx/svelte-toast'
import ComfyGraph from "$lib/ComfyGraph";
import { ComfyBackendNode } from "$lib/nodes/ComfyBackendNode";
import { get } from "svelte/store";
import uiState from "$lib/stores/uiState";
import { promptToGraphVis } from "$lib/utils";

export const COMFYBOX_SERIAL_VERSION = 1;

LiteGraph.catch_exceptions = false;
LiteGraph.CANVAS_GRID_SIZE = 32;

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
export type SerializedPromptInput = [string, number] | any

export type SerializedPromptInputs = {
    inputs: Record<string, SerializedPromptInput>,
    class_type: string
}

export type SerializedPromptOutput = Record<string, SerializedPromptInputs>

export type SerializedPrompt = {
    workflow: SerializedLGraph,
    output: SerializedPromptOutput
}

export type Progress = {
    value: number,
    max: number
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

    dragOverNode: LGraphNode | null = null;
    shiftDown: boolean = false;
    selectedGroupMoving: boolean = false;

    private queueItems: QueueItem[] = [];
    private processingQueue: boolean = false;
    private alreadySetup = false;

    constructor() {
        this.api = new ComfyAPI();
    }

    async setup(): Promise<void> {
        if (this.alreadySetup) {
            console.error("Already setup")
            return;
        }

        this.rootEl = document.getElementById("main") as HTMLDivElement;
        this.canvasEl = document.getElementById("graph-canvas") as HTMLCanvasElement;
        this.lGraph = new ComfyGraph();
        this.lCanvas = new ComfyGraphCanvas(this, this.canvasEl);
        this.canvasCtx = this.canvasEl.getContext("2d");

        LiteGraph.release_link_on_empty_shows_menu = true;
        LiteGraph.alt_drag_do_clone_nodes = true;

        (window as any).LiteGraph = LiteGraph;

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

        this.setupColorScheme()

        // await this.#invokeExtensionsAsync("setup");

        // Ensure the canvas fills the window
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas.bind(this));

        this.lGraph.start();
        this.lGraph.eventBus.on("afterExecute", () => this.lCanvas.draw(true))

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
        const savedWorkflow = this.serialize();
        const json = JSON.stringify(savedWorkflow);
        localStorage.setItem("workflow", json)
    }

    static node_type_overrides: Record<string, typeof ComfyBackendNode> = {}
    static widget_type_overrides: Record<string, typeof SvelteComponentDev> = {}

    private async registerNodes() {
        const app = this;

        // Load node definitions from the backend
        const defs = await this.api.getNodeDefs();

        // Register a node for each definition
        for (const nodeId in defs) {
            const nodeData = defs[nodeId];

            const typeOverride = ComfyApp.node_type_overrides[nodeId]
            if (typeOverride)
                console.debug("Attaching custom type to received node:", nodeId, typeOverride)
            const baseClass: typeof ComfyBackendNode = typeOverride || ComfyBackendNode;

            const ctor = class extends baseClass {
                constructor(title?: string) {
                    super(title, nodeId, nodeData);
                }
            }

            const node: LGraphNodeConstructor = {
                class: ctor,
                title: nodeData.name,
                type: nodeId,
                desc: `ComfyNode: ${nodeId}`
            }

            LiteGraph.registerNodeType(node);
            node.category = nodeData.category;
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
        this.api.addEventListener("status", ({ detail: ComfyAPIStatus }: CustomEvent) => {
            // this.ui.setStatus(detail);
        });

        this.api.addEventListener("reconnecting", () => {
            // this.ui.dialog.show("Reconnecting...");
        });

        this.api.addEventListener("reconnected", () => {
            // this.ui.dialog.close();
        });

        this.api.addEventListener("progress", ({ detail }: CustomEvent) => {
            queueState.progressUpdated(detail);
            this.lGraph.setDirtyCanvas(true, false);
        });

        this.api.addEventListener("executing", ({ detail }: CustomEvent) => {
            queueState.executingUpdated(detail.node);
            this.lGraph.setDirtyCanvas(true, false);
        });

        this.api.addEventListener("executed", ({ detail }: CustomEvent) => {
            this.nodeOutputs[detail.node] = detail.output;
            const node = this.lGraph.getNodeById(detail.node) as ComfyGraphNode;
            if (node?.onExecuted) {
                node.onExecuted(detail.output);
            }
        });

        this.api.init();
    }

    private addKeyboardHandler() {
        window.addEventListener("keydown", (e) => {
            this.shiftDown = e.shiftKey;

            // Queue prompt using ctrl or command + enter
            if ((e.ctrlKey || e.metaKey) && (e.key === "Enter" || e.keyCode === 13 || e.keyCode === 10)) {
                this.queuePrompt(e.shiftKey ? -1 : 0);
            }
        });
        window.addEventListener("keyup", (e) => {
            this.shiftDown = e.shiftKey;
        });
    }

    private setupColorScheme() {
        const setColor = (type: any, color: string) => {
            this.lCanvas.link_type_colors[type] = color
            this.lCanvas.default_connection_color_byType[type] = color
        }

        // Distinguish frontend/backend connections
        const BACKEND_TYPES = ["CLIP", "CLIP_VISION", "CLIP_VISION_OUTPUT", "CONDITIONING", "CONTROL_NET", "LATENT", "MASK", "MODEL", "STYLE_MODEL", "VAE"]
        for (const type of BACKEND_TYPES) {
            setColor(type, "orange")
        }

        setColor("IMAGE", "rebeccapurple")
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
    }

    async initDefaultGraph() {
        const state = structuredClone(defaultGraph)
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
        this.lGraph.configure(blankGraph)
        layoutState.initDefaultLayout();
    }

    /**
     * Converts the current graph workflow for sending to the API
     * @returns The workflow and node links
     */
    async graphToPrompt(tag: string | null = null): Promise<SerializedPrompt> {
        // Run frontend-only logic
        this.lGraph.runStep(1)

        const workflow = this.lGraph.serialize();

        const output = {};
        // Process nodes in order of execution
        for (const node_ of this.lGraph.computeExecutionOrder<ComfyGraphNode>(false, null)) {
            const n = workflow.nodes.find((n) => n.id === node_.id);

            if (!node_.isBackendNode) {
                // console.debug("Not serializing node: ", node_.type)
                continue;
            }

            const node = node_ as ComfyBackendNode;

            if (tag && node.tags.indexOf(tag) === -1) {
                console.debug("Skipping tagged node", tag, node.tags)
                continue;
            }

            if (node.mode === NodeMode.NEVER) {
                // Don't serialize muted nodes
                continue;
            }

            const inputs = {};

            // Store all link values
            if (node.inputs) {
                for (let i = 0; i < node.inputs.length; i++) {
                    const inp = node.inputs[i];
                    const inputLink = node.getInputLink(i)
                    const inputNode = node.getInputNode(i)

                    if (inputNode && tag && "tags" in inputNode && (inputNode.tags as string[]).indexOf(tag) === -1) {
                        continue;
                    }

                    if (!inputLink || !inputNode) {
                        if ("config" in inp) {
                            const defaultValue = (inp as IComfyInputSlot).config?.defaultValue
                            if (defaultValue !== null && defaultValue !== undefined)
                                inputs[inp.name] = defaultValue
                        }
                        continue;
                    }

                    let serialize = true;
                    if ("config" in inp)
                        serialize = (inp as IComfyInputSlot).serialize

                    let isBackendNode = node.isBackendNode;
                    let isInputBackendNode = false;
                    if ("isBackendNode" in inputNode)
                        isInputBackendNode = (inputNode as ComfyGraphNode).isBackendNode;

                    // The reasoning behind this check:
                    // We only want to serialize inputs to nodes with backend equivalents.
                    // And in ComfyBox, the nodes in litegraph *never* have widgets, instead they're all inputs.
                    // All values are passed by separate frontend-only nodes,
                    // either UI-bound or something like ConstantInteger.
                    // So we know that any value passed into a backend node *must* come from
                    // a frontend node.
                    // The rest (links between backend nodes) will be serialized after this bit runs.
                    if (serialize && isBackendNode && !isInputBackendNode) {
                        inputs[inp.name] = inputLink.data
                    }
                }
            }

            // Store all links between nodes
            for (let i = 0; i < node.inputs.length; i++) {
                let parent: ComfyGraphNode = node.getInputNode(i) as ComfyGraphNode;
                if (parent) {
                    const seen = {}
                    let link = node.getInputLink(i);

                    const isValidParent = (parent: ComfyGraphNode) => {
                        if (!parent || parent.isBackendNode)
                            return false;
                        if ("tags" in parent && (parent.tags as string[]).indexOf(tag) === -1)
                            return false;
                        return true;
                    }

                    while (isValidParent(parent)) {
                        link = parent.getInputLink(link.origin_slot);
                        if (link && !seen[link.id]) {
                            seen[link.id] = true
                            const inputNode = parent.getInputNode(link.origin_slot) as ComfyGraphNode;
                            if (inputNode && "tags" in inputNode && tag && (inputNode.tags as string[]).indexOf(tag) === -1) {
                                console.debug("Skipping tagged parent node", tag, node.tags)
                                parent = null;
                            }
                            else {
                                parent = inputNode;
                            }
                        } else {
                            parent = null;
                        }
                    }

                    if (link && parent && parent.isBackendNode) {
                        if ("tags" in parent && tag && (parent.tags as string[]).indexOf(tag) === -1)
                            continue;

                        const input = node.inputs[i]
                        // TODO can null be a legitimate value in some cases?
                        // Nodes like CLIPLoader will never have a value in the frontend, hence "null".
                        if (!(input.name in inputs))
                            inputs[input.name] = [String(link.origin_id), link.origin_slot];
                    }
                }
            }

            output[String(node.id)] = {
                inputs,
                class_type: node.comfyClass,
            };
        }

        // Remove inputs connected to removed nodes

        for (const o in output) {
            for (const i in output[o].inputs) {
                if (Array.isArray(output[o].inputs[i])
                    && output[o].inputs[i].length === 2
                    && !output[output[o].inputs[i][0]]) {
                    console.debug("Prune removed node link", o, i, output[o].inputs[i])
                    delete output[o].inputs[i];
                }
            }
        }

        // console.debug({ workflow, output })
        // console.debug(promptToGraphVis({ workflow, output }))

        return { workflow, output };
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

                for (let i = 0; i < batchCount; i++) {
                    for (const node of this.lGraph._nodes_in_order) {
                        if ("beforeQueued" in node) {
                            (node as ComfyGraphNode).beforeQueued(tag);
                        }
                    }

                    const p = await this.graphToPrompt(tag);

                    try {
                        await this.api.queuePrompt(num, p);
                    } catch (error) {
                        // this.ui.dialog.show(error.response || error.toString());
                        const mes = error.response || error.toString()
                        toast.push(`Error queuing prompt:\n${mes}`, {
                            theme: {
                                '--toastBackground': 'var(--color-red-500)',
                            }
                        })
                        console.error("Error queuing prompt", mes, num, p)
                        break;
                    }

                    for (const n of p.workflow.nodes) {
                        const node = this.lGraph.getNodeById(n.id);
                        if ("afterQueued" in node) {
                            (node as ComfyGraphNode).afterQueued(p, tag);
                        }
                    }

                    this.lCanvas.draw(true, true);
                    // await this.ui.queue.update();
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
                    throw "TODO import A111 import!"
                    // importA1111(this.lGraph, pngInfo.parameters, this.api);
                }
                else {
                    console.error("No metadata found in image file.", pngInfo)
                    toast.push("No metadata found in image file.")
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
    async refreshComboInNodes() {
        const defs = await this.api.getNodeDefs();

        for (let nodeNum in this.lGraph._nodes) {
            const node = this.lGraph._nodes[nodeNum];

            const def = defs[node.type];

            for (let index = 0; index < node.inputs.length; index++) {
                const input = node.inputs[index];
                if ("config" in input) {
                    const comfyInput = input as IComfyInputSlot;

                    if (comfyInput.defaultWidgetNode == nodes.ComfyComboNode && def["input"]["required"][comfyInput.name] !== undefined) {
                        comfyInput.config.values = def["input"]["required"][comfyInput.name][0];
                        const inputNode = node.getInputNode(index)

                        if (inputNode && "doAutoConfig" in inputNode) {
                            const comfyInputNode = inputNode as nodes.ComfyWidgetNode;
                            comfyInputNode.doAutoConfig(comfyInput)
                            if (!comfyInput.config.values.includes(get(comfyInputNode.value))) {
                                comfyInputNode.setValue(comfyInput.config.defaultValue || comfyInput.config.values[0])
                            }
                        }
                    }
                }
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
