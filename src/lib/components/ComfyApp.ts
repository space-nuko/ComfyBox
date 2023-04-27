import { LiteGraph, LGraph, LGraphCanvas, LGraphNode, type LGraphNodeConstructor, type LGraphNodeExecutable, type SerializedLGraph, type SerializedLGraphGroup, type SerializedLGraphNode, type SerializedLLink } from "@litegraph-ts/core";
import type { LConnectionKind, INodeSlot } from "@litegraph-ts/core";
import ComfyAPI from "$lib/api"
import { ComfyWidgets } from "$lib/widgets"
import defaultGraph from "$lib/defaultGraph"
import { getPngMetadata, importA1111 } from "$lib/pnginfo";
import EventEmitter from "events";
import type TypedEmitter from "typed-emitter";

// Import nodes
import * as basic from "@litegraph-ts/nodes-basic"
import * as nodes from "$lib/nodes/index"
import ComfyGraphCanvas from "$lib/ComfyGraphCanvas";
import type ComfyGraphNode from "$lib/nodes/ComfyGraphNode";
import type { WidgetStateStore, WidgetUIState } from "$lib/stores/widgetState";
import * as widgets from "$lib/widgets/index"
import type ComfyWidget from "$lib/widgets/ComfyWidget";
import queueState from "$lib/stores/queueState";
import GraphSync from "$lib/GraphSync";

LiteGraph.catch_exceptions = false;

if (typeof window !== "undefined") {
    // Load default visibility
    nodes.ComfyReroute.setDefaultTextVisibility(!!localStorage["Comfy.ComfyReroute.DefaultVisibility"]);
}

type QueueItem = { num: number, batchCount: number }

export type SerializedPanes = {
    panels: { nodeId: number }[][]
}

export type SerializedAppState = {
    createdBy: "ComfyBox",
    version: number,
    panes: SerializedPanes,
    workflow: SerializedLGraph
}

type ComfyAppEvents = {
    configured: (graph: LGraph) => void
    nodeAdded: (node: LGraphNode) => void
    nodeRemoved: (node: LGraphNode) => void
    nodeConnectionChanged: (kind: LConnectionKind, node: LGraphNode, slot: INodeSlot, targetNode: LGraphNode, targetSlot: INodeSlot) => void
    cleared: () => void
    beforeChange: (graph: LGraph, param: any) => void
    afterChange: (graph: LGraph, param: any) => void
    autosave: (graph: LGraph) => void
    restored: (workflow: SerializedAppState) => void
}

interface ComfyGraphNodeExecutable extends LGraphNodeExecutable {
    comfyClass: string
    isVirtualNode?: boolean;
    applyToGraph(workflow: SerializedLGraph<SerializedLGraphNode<LGraphNode>, SerializedLLink, SerializedLGraphGroup>): void;
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
    lGraph: LGraph | null = null;
    lCanvas: LGraphCanvas | null = null;
    dropZone: HTMLElement | null = null;
    nodeOutputs: Record<string, any> = {};
    eventBus: TypedEmitter<ComfyAppEvents> = new EventEmitter() as TypedEmitter<ComfyAppEvents>;
    graphSync: GraphSync;

    dragOverNode: LGraphNode | null = null;
    shiftDown: boolean = false;
    selectedGroupMoving: boolean = false;

    private queueItems: QueueItem[] = [];
    private processingQueue: boolean = false;

    constructor() {
        this.api = new ComfyAPI();
    }

    async setup(): Promise<void> {
        this.rootEl = document.getElementById("main") as HTMLDivElement;
        this.canvasEl = document.getElementById("graph-canvas") as HTMLCanvasElement;
        this.lGraph = new LGraph();
        this.lCanvas = new ComfyGraphCanvas(this, this.canvasEl, this.lGraph);
        this.canvasCtx = this.canvasEl.getContext("2d");
        this.graphSync = new GraphSync(this);

        this.addGraphLifecycleHooks();

        LiteGraph.release_link_on_empty_shows_menu = true;
        LiteGraph.alt_drag_do_clone_nodes = true;
        LiteGraph.ignore_all_widget_events = true;

        this.lGraph.start();

        // await this.#invokeExtensionsAsync("init");
        this.registerNodeTypeOverrides();
        this.registerWidgetTypeOverrides();
        await this.registerNodes();

        // Load previous workflow
        let restored = false;
        try {
            const json = localStorage.getItem("workflow");
            if (json) {
                const workflow = JSON.parse(json) as SerializedAppState;
                this.loadGraphData(workflow["workflow"]);
                this.eventBus.emit("restored", workflow);
                restored = true;
            }
        } catch (err) {
            console.error("Error loading previous workflow", err);
        }

        // We failed to restore a workflow so load the default
        if (!restored) {
            this.loadGraphData();
        }

        // Save current workflow automatically
        setInterval(this.requestAutosave.bind(this), 1000);

        this.addApiUpdateHandlers();
        this.addDropHandler();
        this.addPasteHandler();
        this.addKeyboardHandler();


        // await this.#invokeExtensionsAsync("setup");

        // Ensure the canvas fills the window
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas.bind(this));

        return Promise.resolve();
    }

    resizeCanvas() {
        this.canvasEl.width = this.canvasEl.parentElement.offsetWidth;
        this.canvasEl.height = this.canvasEl.parentElement.offsetHeight;
        this.canvasEl.style.width = ""
        this.canvasEl.style.height = ""
        this.lCanvas.draw(true, true);
    }

    private graphOnConfigure() {
        console.log("Configured");
        this.eventBus.emit("configured", this.lGraph);
    }

    private graphOnBeforeChange(graph: LGraph, info: any) {
        console.log("BeforeChange", info);
        this.eventBus.emit("beforeChange", graph, info);
    }

    private graphOnAfterChange(graph: LGraph, info: any) {
        console.log("AfterChange", info);
        this.eventBus.emit("afterChange", graph, info);
    }

    private graphOnNodeAdded(node: LGraphNode) {
        console.log("Added", node);
        this.eventBus.emit("nodeAdded", node);
    }

    private graphOnNodeRemoved(node: LGraphNode) {
        console.log("Removed", node);
        this.eventBus.emit("nodeRemoved", node);
    }

    private graphOnNodeConnectionChange(kind: LConnectionKind, node: LGraphNode, slot: INodeSlot, targetNode: LGraphNode, targetSlot: INodeSlot) {
        console.log("ConnectionChange", node);
        this.eventBus.emit("nodeConnectionChanged", kind, node, slot, targetNode, targetSlot);
    }

    private canvasOnClear() {
        console.log("CanvasClear");
        this.eventBus.emit("cleared");
    }

    private requestAutosave() {
        this.eventBus.emit("autosave", this.lGraph);
    }

    private addGraphLifecycleHooks() {
        this.lGraph.onConfigure = this.graphOnConfigure.bind(this);
        this.lGraph.onBeforeChange = this.graphOnBeforeChange.bind(this);
        this.lGraph.onAfterChange = this.graphOnAfterChange.bind(this);
        this.lGraph.onNodeAdded = this.graphOnNodeAdded.bind(this);
        this.lGraph.onNodeRemoved = this.graphOnNodeRemoved.bind(this);
        this.lGraph.onNodeConnectionChange = this.graphOnNodeConnectionChange.bind(this);

        this.lCanvas.onClear = this.canvasOnClear.bind(this);
    }

    static node_type_overrides: Record<string, typeof ComfyGraphNode> = {}
    static widget_type_overrides: Record<string, Function> = {}

    private registerNodeTypeOverrides() {
        ComfyApp.node_type_overrides["SaveImage"] = nodes.ComfySaveImageNode;
        ComfyApp.node_type_overrides["PreviewImage"] = nodes.ComfyPreviewImageNode;
    }

    private registerWidgetTypeOverrides() {
        ComfyApp.widget_type_overrides["comfy/gallery"] = widgets.ComfyGalleryWidget_Svelte;
    }

    private async registerNodes() {
        const app = this;

        // Load node definitions from the backend
        const defs = await this.api.getNodeDefs();
        // await this.#invokeExtensionsAsync("addCustomNodeDefs", defs);

        // Generate list of known widgets
        const widgets = ComfyWidgets;
        // const widgets = Object.assign(
        // 	{},
        // 	ComfyWidgets,
        // 	...(await this.#invokeExtensionsAsync("getCustomWidgets")).filter(Boolean)
        // );

        // Register a node for each definition
        for (const nodeId in defs) {
            const nodeData = defs[nodeId];

            const typeOverride = ComfyApp.node_type_overrides[nodeId]
            if (typeOverride)
                console.debug("Attaching custom type to received node:", nodeId, typeOverride)
            const baseClass: typeof LGraphNode = typeOverride || LGraphNode;

            const ctor = class extends baseClass {
                constructor(title?: string) {
                    super(title);
                    this.type = nodeId; // XXX: workaround dependency in LGraphNode.addInput()
                    (this as any).comfyClass = nodeId;
                    var inputs = nodeData["input"]["required"];
                    if (nodeData["input"]["optional"] != undefined) {
                        inputs = Object.assign({}, nodeData["input"]["required"], nodeData["input"]["optional"])
                    }
                    const config = { minWidth: 1, minHeight: 1 };
                    for (const inputName in inputs) {
                        const inputData = inputs[inputName];
                        const type = inputData[0];

                        if (inputData[1]?.forceInput) {
                            this.addInput(inputName, type);
                        } else {
                            if (Array.isArray(type)) {
                                // Enums
                                Object.assign(config, widgets.COMBO(this, inputName, inputData, app) || {});
                            } else if (`${type}:${inputName}` in widgets) {
                                // Support custom widgets by Type:Name
                                Object.assign(config, widgets[`${type}:${inputName}`](this, inputName, inputData, app) || {});
                            } else if (type in widgets) {
                                // Standard type widgets
                                Object.assign(config, widgets[type](this, inputName, inputData, app) || {});
                            } else {
                                // Node connection inputs
                                this.addInput(inputName, type);
                            }
                        }
                    }

                    for (const o in nodeData["output"]) {
                        const output = nodeData["output"][o];
                        const outputName = nodeData["output_name"][o] || output;
                        this.addOutput(outputName, output);
                    }

                    const s = this.computeSize();
                    s[0] = Math.max(config.minWidth, s[0] * 1.5);
                    s[1] = Math.max(config.minHeight, s[1]);
                    this.size = s;
                    this.serialize_widgets = true;

                    // app.#invokeExtensionsAsync("nodeCreated", this);

                    return this;
                }
            }

            const node: LGraphNodeConstructor = {
                class: ctor,
                title: nodeData.name,
                type: nodeId,
                desc: `ComfyNode: ${nodeId}`
            }

            // this.#addNodeContextMenuHandler(node);
            // this.#addDrawBackgroundHandler(node, app);

            // await this.#invokeExtensionsAsync("beforeRegisterNodeDef", node, nodeData);
            LiteGraph.registerNodeType(node);
            node.category = nodeData.category;
        }

        // await this.#invokeExtensionsAsync("registerCustomNodes");
    }

    private showDropZone() {
        this.dropZone.style.display = "block";
    }

    private hideDropZone() {
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
        this.dropZone = document.getElementById("dropzone");

        window.addEventListener('dragenter', this.allowDrag.bind(this));
        this.dropZone.addEventListener('dragover', this.allowDrag.bind(this));
        this.dropZone.addEventListener('dragleave', this.hideDropZone.bind(this));
        this.dropZone.addEventListener('drop', this.handleDrop.bind(this));
    }

    /**
     * Adds a handler on paste that extracts and loads workflows from pasted JSON data
     */
    private addPasteHandler() {
        document.addEventListener("paste", (e) => {
            let data = (e.clipboardData || (window as any).clipboardData).getData("text/plain");
            let workflow;
            try {
                data = data.slice(data.indexOf("{"));
                workflow = JSON.parse(data);
            } catch (err) {
                try {
                    data = data.slice(data.indexOf("workflow\n"));
                    data = data.slice(data.indexOf("{"));
                    workflow = JSON.parse(data);
                } catch (error) { }
            }

            if (workflow && workflow.version && workflow.nodes && workflow.extra) {
                this.loadGraphData(workflow);
            }
        });
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

    /**
     * Populates the graph with the specified workflow data
     * @param {*} graphData A serialized graph object
     */
    loadGraphData(graphData?: SerializedLGraph) {
        this.clean();

        if (!graphData) {
            graphData = structuredClone(defaultGraph.workflow)
        }

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

            if (node.widgets) {
                // If you break something in the backend and want to patch workflows in the frontend
                // This is the place to do this
                for (let widget of node.widgets) {
                    if (node.type == "KSampler" || node.type == "KSamplerAdvanced") {
                        if (widget.name == "sampler_name") {
                            if (widget.value.constructor === String && widget.value.startsWith("sample_")) {
                                widget.value = widget.value.slice(7);
                            }
                        }
                    }
                }
            }

            // this.#invokeExtensions("loadedGraphNode", node);
        }
    }

    /**
     * Converts the current graph workflow for sending to the API
     * @returns The workflow and node links
     */
    async graphToPrompt() {
        const workflow = this.lGraph.serialize();

        const output = {};
        // Process nodes in order of execution
        for (const node of this.lGraph.computeExecutionOrder<ComfyGraphNodeExecutable>(false, null)) {
            const n = workflow.nodes.find((n) => n.id === node.id);

            if (node.isVirtualNode || !node.comfyClass) {
                console.debug("Not serializing node: ", node.type)
                // Don't serialize frontend only nodes but let them make changes
                if (node.applyToGraph) {
                    node.applyToGraph(workflow);
                }
                continue;
            }

            if (node.mode === 2) {
                // Don't serialize muted nodes
                continue;
            }

            const inputs = {};
            const widgets = node.widgets;

            // Store all widget values
            if (widgets) {
                for (let i = 0; i < widgets.length; i++) {
                    const widget = widgets[i];
                    let isVirtual = false;
                    if ("isVirtual" in widget)
                        isVirtual = (widget as ComfyWidget<any, any>).isVirtual;
                    if ((!widget.options || widget.options.serialize !== false) && !isVirtual) {
                        let value = widget.serializeValue ? await widget.serializeValue(n, i) : widget.value;
                        inputs[widget.name] = value
                    }
                }
            }

            // Store all node links
            for (let i = 0; i < node.inputs.length; i++) {
                let parent: ComfyGraphNodeExecutable = node.getInputNode(i) as ComfyGraphNodeExecutable;
                if (parent) {
                    let link = node.getInputLink(i);
                    while (parent && parent.isVirtualNode) {
                        link = parent.getInputLink(link.origin_slot);
                        if (link) {
                            parent = parent.getInputNode(link.origin_slot) as ComfyGraphNodeExecutable;
                        } else {
                            parent = null;
                        }
                    }

                    if (link) {
                        inputs[node.inputs[i].name] = [String(link.origin_id), link.origin_slot];
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
                    delete output[o].inputs[i];
                }
            }
        }

        return { workflow, output };
    }

    async queuePrompt(num: number, batchCount: number = 1) {
        this.queueItems.push({ num, batchCount });

        // Only have one action process the items so each one gets a unique seed correctly
        if (this.processingQueue) {
            return;
        }

        this.processingQueue = true;
        try {
            while (this.queueItems.length) {
                ({ num, batchCount } = this.queueItems.pop());
                console.log(`Queue get! ${num} ${batchCount}`);

                for (let i = 0; i < batchCount; i++) {
                    const p = await this.graphToPrompt();

                    try {
                        await this.api.queuePrompt(num, p);
                    } catch (error) {
                        // this.ui.dialog.show(error.response || error.toString());
                        console.error(error.response || error.toString())
                        break;
                    }

                    for (const n of p.workflow.nodes) {
                        const node = this.lGraph.getNodeById(n.id);
                        if (node.widgets) {
                            for (const widget of node.widgets) {
                                // Allow widgets to run callbacks after a prompt has been queued
                                // e.g. random seed after every gen
                                if ("afterQueued" in widget) {
                                    (widget as ComfyWidget<any, any>).afterQueued();
                                }
                            }
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
                if (pngInfo.workflow) {
                    this.loadGraphData(JSON.parse(pngInfo.workflow));
                } else if (pngInfo.parameters) {
                    importA1111(this.lGraph, pngInfo.parameters, this.api);
                }
            }
        } else if (file.type === "application/json" || file.name.endsWith(".json")) {
            const reader = new FileReader();
            reader.onload = () => {
                this.loadGraphData(JSON.parse(reader.result as string));
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

            for (const widgetNum in node.widgets) {
                const widget = node.widgets[widgetNum]

                if (widget.type == "combo" && def["input"]["required"][widget.name] !== undefined) {
                    widget.options.values = def["input"]["required"][widget.name][0];

                    if (!widget.options.values.includes(widget.value)) {
                        widget.value = widget.options.values[0];
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
