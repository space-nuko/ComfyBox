import { LiteGraph, LGraph, LGraphCanvas, LGraphNode, type LGraphNodeConstructor, type LGraphNodeExecutable, type SerializedLGraph, type SerializedLGraphGroup, type SerializedLGraphNode, type SerializedLLink, NodeMode, type Vector2, BuiltInSlotType, type INodeInputSlot, type NodeID, type NodeTypeSpec, type NodeTypeOpts, type SlotIndex, type UUID } from "@litegraph-ts/core";
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
import type { LayoutState, SerializedLayoutState, WritableLayoutStateStore } from "$lib/stores/layoutState";
import layoutState from "$lib/stores/layoutState";
import { toast } from '@zerodevx/svelte-toast'
import ComfyGraph from "$lib/ComfyGraph";
import { ComfyBackendNode } from "$lib/nodes/ComfyBackendNode";
import { get, writable, type Writable } from "svelte/store";
import { tick } from "svelte";
import uiState from "$lib/stores/uiState";
import { download, graphToGraphVis, jsonToJsObject, promptToGraphVis, range, workflowToGraphVis } from "$lib/utils";
import notify from "$lib/notify";
import configState from "$lib/stores/configState";
import { blankGraph } from "$lib/defaultGraph";
import type { SerializedPromptOutput } from "$lib/utils";
import ComfyPromptSerializer, { UpstreamNodeLocator, isActiveBackendNode } from "./ComfyPromptSerializer";
import { iterateNodeDefInputs, type ComfyNodeDef, isBackendNodeDefInputType, iterateNodeDefOutputs } from "$lib/ComfyNodeDef";
import { ComfyComboNode } from "$lib/nodes/widgets";
import parseA1111, { type A1111ParsedInfotext } from "$lib/parseA1111";
import convertA1111ToStdPrompt from "$lib/convertA1111ToStdPrompt";
import type { ComfyBoxStdPrompt } from "$lib/ComfyBoxStdPrompt";
import ComfyBoxStdPromptSerializer from "$lib/ComfyBoxStdPromptSerializer";
import { v4 as uuidv4 } from "uuid";

export const COMFYBOX_SERIAL_VERSION = 1;

if (typeof window !== "undefined") {
    // Load default visibility
    nodes.ComfyReroute.setDefaultTextVisibility(!!localStorage["Comfy.ComfyReroute.DefaultVisibility"]);
}

/*
 * Queued prompt that hasn't been sent to the backend yet.
 */
type PromptQueueItem = {
    num: number,
    batchCount: number
    workflow: ComfyWorkflow
}

export type A1111PromptAndInfo = {
    infotext: string,
    parsedInfotext: A1111ParsedInfotext,
    stdPrompt: ComfyBoxStdPrompt,
    imageFile: File
}

/*
 * Represents a single workflow that can be loaded into the program from JSON.
 */
export type SerializedAppState = {
    /** Program identifier, should always be "ComfyBox" */
    createdBy: "ComfyBox",
    /** Serial version, should be incremented on breaking changes */
    version: number,
    /** Commit hash if found */
    commitHash?: string,
    /** Graph state */
    workflow: SerializedLGraph,
    /** UI state */
    layout: SerializedLayoutState,
    /** Position/offset of the canvas at the time of saving */
    canvas: SerializedGraphCanvasState
}

/** [link_origin, link_slot_index] | input_value */
export type SerializedPromptInput = [ComfyNodeID, number] | any

export type SerializedPromptInputs = Record<string, SerializedPromptInput>;

/*
 * A single node in the prompt and its input values.
 */
export type SerializedPromptInputsForNode = {
    /* property name -> value or link */
    inputs: SerializedPromptInputs,
    class_type: string
}

/*
 * All nodes in the graph and their input values.
 */
export type SerializedPromptInputsAll = Record<ComfyNodeID, SerializedPromptInputsForNode>

export type SerializedPrompt = {
    workflow: SerializedLGraph,
    output: SerializedPromptInputsAll
}

/*
 * Outputs for each node.
 */
export type SerializedPromptOutputs = Record<ComfyNodeID, SerializedPromptOutput>

export type Progress = {
    value: number,
    max: number
}

/*
 * A combo node and the backend node that will send an updated config over, for
 * refreshing lists of model files
 */
type BackendComboNode = {
    comboNode: ComfyComboNode,
    comfyInput: IComfyInputSlot,
    backendNode: ComfyBackendNode
}

type CanvasState = {
    canvasEl: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D,
    canvas: ComfyGraphCanvas,
}

type ActiveCanvas = {
    canvas: LGraphCanvas | null;
    canvasHandler: () => void | null;
    state: SerializedGraphCanvasState;
}

export type SerializedWorkflowState = {
    graph: SerializedLGraph,
    layout: SerializedLayoutState
}

/*
 * ID for an opened workflow.
 *
 * Unlike NodeID and PromptID, these are *not* saved to the workflow itself.
 * They are only used for identifying an open workflow in the program. If the
 * workflow is closed and reopened, a different workflow ID will be assigned to
 * it.
 */
export type WorkflowInstID = UUID;

export class ComfyWorkflow {
    /*
     * Used for uniquely identifying the instance of the opened workflow in the frontend.
     */
    id: WorkflowInstID;
    title: string;
    graph: ComfyGraph;
    layout: WritableLayoutStateStore;

    canvases: Record<string, ActiveCanvas> = {};

    constructor(title: string, graph: ComfyGraph, layout: WritableLayoutStateStore) {
        this.id = uuidv4();
        this.title = title;
        this.layout = layout;
        this.graph = graph;
    }

    start(key: string, canvas: ComfyGraphCanvas) {
        if (this.canvases[key] != null)
            throw new Error(`This workflow is already being displayed on canvas ${key}`)

        const canvasHandler = () => canvas.draw(true);

        this.canvases[key] = {
            canvas,
            canvasHandler,
            state: {
                // TODO
                offset: [0, 0],
                scale: 1
            }
        }

        this.graph.attachCanvas(canvas);
        this.graph.eventBus.on("afterExecute", canvasHandler)

        if (Object.keys(this.canvases).length === 1)
            this.graph.start();
    }

    stop(key: string) {
        const canvas = this.canvases[key]
        if (canvas == null)
            throw new Error(`This workflow is not being displayed on canvas ${key}`)

        this.graph.detachCanvas(canvas.canvas);
        this.graph.eventBus.removeListener("afterExecute", canvas.canvasHandler)

        delete this.canvases[key]

        if (Object.keys(this.canvases).length === 0)
            this.graph.stop();
    }

    stopAll() {
        for (const key of Object.keys(this.canvases))
            this.stop(key)
        this.graph.stop()
    }

    serialize(): SerializedWorkflowState {
        const graph = this.graph;

        const serializedGraph = graph.serialize()
        const serializedLayout = this.layout.serialize()

        return {
            graph: serializedGraph,
            layout: serializedLayout
        }
    }

    static deserialize(data: SerializedWorkflowState): ComfyWorkflow {
        const layout = layoutState; // TODO
        // Ensure loadGraphData does not trigger any state changes in layoutState
        // (isConfiguring is set to true here)
        // lGraph.configure will add new nodes, triggering onNodeAdded, but we
        // want to restore the layoutState ourselves
        layout.onStartConfigure();

        // Patch T2IAdapterLoader to ControlNetLoader since they are the same node now
        for (let n of data.graph.nodes) {
            if (n.type == "T2IAdapterLoader") n.type = "ControlNetLoader";
        }

        const graph = new ComfyGraph();
        graph.configure(data.graph);

        for (const node of graph._nodes) {
            const size = node.computeSize();
            size[0] = Math.max(node.size[0], size[0]);
            size[1] = Math.max(node.size[1], size[1]);
            node.size = size;
            // this.#invokeExtensions("loadedGraphNode", node);
        }

        // Now restore the layout
        // Subsequent added nodes will add the UI data to layoutState
        // TODO
        layout.deserialize(data.layout, graph)

        return new ComfyWorkflow("Workflow X", graph, layout);
    }
}

export default class ComfyApp {
    api: ComfyAPI;

    rootEl: HTMLDivElement | null = null;
    canvasEl: HTMLCanvasElement | null = null;
    canvasCtx: CanvasRenderingContext2D | null = null;
    lCanvas: ComfyGraphCanvas | null = null;

    openedWorkflows: ComfyWorkflow[] = [];
    openedWorkflowsByID: Record<WorkflowInstID, ComfyWorkflow> = {};
    activeWorkflowIdx: number = -1;

    get activeWorkflow(): ComfyWorkflow | null {
        return this.openedWorkflows[this.activeWorkflowIdx]
    }

    get activeGraph(): ComfyGraph | null {
        return this.activeWorkflow?.graph;
    }

    getWorkflow(id: WorkflowInstID): ComfyWorkflow | null {
        return this.openedWorkflowsByID[id];
    }

    shiftDown: boolean = false;
    ctrlDown: boolean = false;
    selectedGroupMoving: boolean = false;
    alreadySetup: Writable<boolean> = writable(false);
    a1111Prompt: Writable<A1111PromptAndInfo | null> = writable(null);

    private queueItems: PromptQueueItem[] = [];
    private processingQueue: boolean = false;
    private promptSerializer: ComfyPromptSerializer;
    private stdPromptSerializer: ComfyBoxStdPromptSerializer;

    constructor() {
        this.api = new ComfyAPI();
        this.promptSerializer = new ComfyPromptSerializer();
        this.stdPromptSerializer = new ComfyBoxStdPromptSerializer();
    }

    async setup(): Promise<void> {
        if (get(this.alreadySetup)) {
            console.error("Already setup")
            return;
        }

        this.setupColorScheme()

        this.rootEl = document.getElementById("app-root") as HTMLDivElement;
        this.canvasEl = document.getElementById("graph-canvas") as HTMLCanvasElement;
        this.lCanvas = new ComfyGraphCanvas(this, null, this.canvasEl);
        this.canvasCtx = this.canvasEl.getContext("2d");

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
                await this.openWorkflow(state)
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
        this.addPasteHandler();
        this.addKeyboardHandler();

        await this.updateHistoryAndQueue();

        // await this.#invokeExtensionsAsync("setup");

        // Ensure the canvas fills the window
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas.bind(this));

        this.requestPermissions();

        this.alreadySetup.set(true);

        return Promise.resolve();
    }

    resizeCanvas() {
        this.canvasEl.width = this.canvasEl.parentElement.offsetWidth;
        this.canvasEl.height = this.canvasEl.parentElement.offsetHeight;
        this.canvasEl.style.width = ""
        this.canvasEl.style.height = ""
        this.lCanvas.draw(true, true);
    }

    serialize(): SerializedAppState {
        const workflow = this.activeWorkflow
        if (workflow == null)
            throw new Error("No workflow active!")

        const { graph, layout } = workflow.serialize();
        const canvas = this.lCanvas.serialize();

        return {
            createdBy: "ComfyBox",
            version: COMFYBOX_SERIAL_VERSION,
            commitHash: __GIT_COMMIT_HASH__,
            workflow: graph,
            layout,
            canvas
        }
    }

    saveStateToLocalStorage() {
        if (this.activeWorkflow == null) {
            notify("No active workflow!", { type: "error" })
            return;
        }

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
                LiteGraph.slot_types_default_out[inputType] ||= ["utils/reroute"]
                LiteGraph.slot_types_default_out[inputType].push(nodeTypeSpec)

                // Input types have to be stored as lower case
                // Store each node that can handle this input type
                const lowerType = inputType.toLocaleLowerCase();
                if (!(lowerType in LiteGraph.registered_slot_in_types)) {
                    LiteGraph.registered_slot_in_types[lowerType] = { nodes: [] };
                }
                LiteGraph.registered_slot_in_types[lowerType].nodes.push(nodeId);

                if (!LiteGraph.slot_types_in.includes(lowerType)) {
                    LiteGraph.slot_types_in.push(lowerType);
                }
            }
            else {
                // inputType is an array of combo box entries (["euler", "karras", ...])
                // or a widget input type ("INT").
            }
        }

        for (const output of iterateNodeDefOutputs(nodeDef)) {
            LiteGraph.slot_types_default_in[output.type] ||= ["utils/reroute"]
            LiteGraph.slot_types_default_in[output.type].push(nodeTypeSpec)

            // Store each node that can handle this output type
            if (!(output.type in LiteGraph.registered_slot_out_types)) {
                LiteGraph.registered_slot_out_types[output.type] = { nodes: [] };
            }
            LiteGraph.registered_slot_out_types[output.type].nodes.push(nodeId);

            if (!LiteGraph.slot_types_out.includes(output.type)) {
                LiteGraph.slot_types_out.push(output.type);
            }
        }

        const maxNodeSuggestions = 5 // TODO config

        // TODO config beforeChanged
        for (const key of Object.keys(LiteGraph.slot_types_default_in)) {
            LiteGraph.slot_types_default_in[key] = LiteGraph.slot_types_default_in[key].slice(0, maxNodeSuggestions)
        }
        for (const key of Object.keys(LiteGraph.slot_types_default_out)) {
            LiteGraph.slot_types_default_out[key] = LiteGraph.slot_types_default_out[key].slice(0, maxNodeSuggestions)
        }
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

            if (workflow && workflow.createdBy === "ComfyBox") {
                this.openWorkflow(workflow);
            }
            else {
                // TODO handle vanilla workflows
                throw new Error("Workflow was not in ComfyBox format!")
            }
        });
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
            this.activeGraph?.setDirtyCanvas(true, false); // TODO PromptID
        });

        this.api.addEventListener("executing", (promptID: PromptID | null, nodeID: ComfyNodeID | null) => {
            const queueEntry = queueState.executingUpdated(promptID, nodeID);
            if (queueEntry != null) {
                const workflow = this.getWorkflow(queueEntry.workflowID)
                workflow?.graph.setDirtyCanvas(true, false);
            }
        });

        this.api.addEventListener("executed", (promptID: PromptID, nodeID: ComfyNodeID, output: SerializedPromptOutput) => {
            const queueEntry = queueState.onExecuted(promptID, nodeID, output)
            if (queueEntry != null) {
                const workflow = this.getWorkflow(queueEntry.workflowID)
                workflow?.graph.setDirtyCanvas(true, false);
                const node = workflow?.graph.getNodeByIdRecursive(nodeID) as ComfyGraphNode;
                if (node?.onExecuted) {
                    node.onExecuted(output);
                }
            }
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
            this.ctrlDown = e.ctrlKey;

            // Queue prompt using ctrl or command + enter
            if ((e.ctrlKey || e.metaKey) && (e.key === "Enter" || e.keyCode === 13 || e.keyCode === 10)) {
                this.runDefaultQueueAction();
            }
        });
        window.addEventListener("keyup", (e) => {
            this.shiftDown = e.shiftKey;
            this.ctrlDown = e.ctrlKey;
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
        const BACKEND_TYPES = ["CLIP", "CLIP_VISION", "CLIP_VISION_OUTPUT", "CONDITIONING", "CONTROL_NET", "IMAGE", "LATENT", "MASK", "MODEL", "STYLE_MODEL", "VAE", "UPSCALE_MODEL"]
        for (const type of BACKEND_TYPES) {
            setColor(type, "orange")
        }

        setColor("COMFYBOX_IMAGES", "rebeccapurple")
        setColor("COMFYBOX_IMAGE", "fuchsia")
        setColor(BuiltInSlotType.EVENT, "lightseagreen")
        setColor(BuiltInSlotType.ACTION, "lightseagreen")
    }

    createNewWorkflow(): ComfyWorkflow {
        // TODO remove
        const workflow = ComfyWorkflow.deserialize({ graph: blankGraph.workflow, layout: blankGraph.layout })
        this.openedWorkflows.push(workflow);
        this.setActiveWorkflow(this.openedWorkflows.length - 1)
        return workflow;
    }

    async openWorkflow(data: SerializedAppState): Promise<ComfyWorkflow> {
        if (data.version !== COMFYBOX_SERIAL_VERSION) {
            throw `Invalid ComfyBox saved data format: ${data.version}`
        }

        this.clean();

        const workflow = ComfyWorkflow.deserialize({ graph: data.workflow, layout: data.layout })

        // Restore canvas offset/zoom
        this.lCanvas.deserialize(data.canvas)

        await this.refreshComboInNodes(workflow);

        this.openedWorkflows.push(workflow);
        this.setActiveWorkflow(this.openedWorkflows.length - 1)

        return workflow;
    }

    closeWorkflow(index: number) {
        if (index < 0 || index >= this.openedWorkflows.length)
            return;

        const workflow = this.openedWorkflows[index];
        workflow.stopAll();

        this.openedWorkflows.splice(index, 1)
        this.setActiveWorkflow(0);
    }

    closeAllWorkflows() {
        while (this.openedWorkflows.length > 0)
            this.closeWorkflow(0)
    }

    setActiveWorkflow(index: number) {
        if (this.openedWorkflows.length === 0) {
            this.activeWorkflowIdx = -1;
            return;
        }

        if (index < 0 || index >= this.openedWorkflows.length || this.activeWorkflowIdx === index)
            return;

        if (this.activeWorkflow != null)
            this.activeWorkflow.stop("app")

        const workflow = this.openedWorkflows[index]
        this.activeWorkflowIdx = index;

        console.warn("START")
        workflow.start("app", this.lCanvas);
        this.lCanvas.deserialize(workflow.canvases["app"].state)
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
        await this.openWorkflow(state)
    }

    clear() {
        this.clean();

        this.lCanvas.closeAllSubgraphs();
        this.closeAllWorkflows();
        uiState.update(s => {
            s.uiUnlocked = true;
            s.uiEditMode = "widgets";
            return s;
        })
    }

    runDefaultQueueAction() {
        if (this.activeWorkflow == null)
            return;

        for (const node of this.activeGraph.iterateNodesInOrderRecursive()) {
            if ("onDefaultQueueAction" in node) {
                (node as ComfyGraphNode).onDefaultQueueAction()
            }
        }

        if (get(layoutState).attrs.queuePromptButtonRunWorkflow) {
            // Hold control to queue at the front
            const num = this.ctrlDown ? -1 : 0;
            this.queuePrompt(num, 1);
        }
    }

    querySave() {
        if (this.activeWorkflow == null) {
            notify("No active workflow!", { type: "error" })
            return;
        }

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
    graphToPrompt(workflow: ComfyWorkflow, tag: string | null = null): SerializedPrompt {
        return this.promptSerializer.serialize(workflow.graph, tag)
    }

    async queuePrompt(num: number, batchCount: number = 1, tag: string | null = null) {
        if (this.activeWorkflow === null) {
            notify("No workflow is opened!", { type: "error" })
            return;
        }

        this.queueItems.push({ num, batchCount, workflow: this.activeWorkflow });

        // Only have one action process the items so each one gets a unique seed correctly
        if (this.processingQueue) {
            return;
        }

        if (tag === "")
            tag = null;

        this.processingQueue = true;
        let workflow;

        try {
            while (this.queueItems.length) {
                ({ num, batchCount, workflow } = this.queueItems.pop());
                console.debug(`Queue get! ${num} ${batchCount} ${tag}`);

                const thumbnails = []
                for (const node of workflow.graph.iterateNodesInOrderRecursive()) {
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
                    for (const node of workflow.graph.iterateNodesInOrderRecursive()) {
                        if (node.mode !== NodeMode.ALWAYS)
                            continue;

                        if ("beforeQueued" in node) {
                            (node as ComfyGraphNode).beforeQueued(tag);
                        }
                    }

                    const p = this.graphToPrompt(workflow, tag);
                    const l = layoutState.serialize();
                    console.debug(graphToGraphVis(workflow.graph))
                    console.debug(promptToGraphVis(p))

                    const stdPrompt = this.stdPromptSerializer.serialize(p);
                    console.warn("STD", stdPrompt);

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
                            queueState.afterQueued(workflow.id, response.promptID, num, p.output, extraData)
                        }
                    } catch (err) {
                        error = err?.toString();
                    }

                    if (error != null) {
                        const mes: string = error;
                        notify(`Error queuing prompt:\n${mes}`, { type: "error" })
                        console.error(graphToGraphVis(workflow.graph))
                        console.error(promptToGraphVis(p))
                        console.error("Error queuing prompt", error, num, p)
                        break;
                    }

                    for (const node of workflow.graph.iterateNodesInOrderRecursive()) {
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
                    await this.openWorkflow(JSON.parse(pngInfo.comfyBoxConfig));
                } else if (pngInfo.parameters) {
                    const parsed = parseA1111(pngInfo.parameters)
                    if ("error" in parsed) {
                        notify(`Couldn't parse webui prompt: ${parsed.error}`, { type: "error" })
                        return;
                    }
                    const converted = convertA1111ToStdPrompt(parsed)
                    this.a1111Prompt.set({
                        infotext: pngInfo.parameters,
                        parsedInfotext: parsed,
                        stdPrompt: converted,
                        imageFile: file
                    })
                }
                else {
                    console.error("No metadata found in image file.", pngInfo)
                    notify("No metadata found in image file.", { type: "error" })
                }
            }
        } else if (file.type === "application/json" || file.name.endsWith(".json")) {
            const reader = new FileReader();
            reader.onload = async () => {
                await this.openWorkflow(JSON.parse(reader.result as string));
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
    async refreshComboInNodes(workflow?: ComfyWorkflow, flashUI: boolean = false) {
        workflow ||= this.activeWorkflow;
        if (workflow == null) {
            notify("No active workflow!", { type: "error" })
            return
        }

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

        for (const node of workflow.graph.iterateNodesInOrderRecursive()) {
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
        for (const node of workflow.graph.iterateNodesOfClassRecursive(ComfyComboNode)) {
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

            let defaultValue = null;
            if (foundInput != null) {
                const comfyInput = foundInput as IComfyInputSlot;
                console.warn("[refreshComboInNodes] found frontend config:", node.title, node.type, comfyInput.config.values)
                values = comfyInput.config.values;
                defaultValue = comfyInput.config.defaultValue;
            }

            comboNode.formatValues(values, defaultValue);
        }

        await tick();

        // Load definitions from the backend.
        for (const { comboNode, comfyInput, backendNode } of Object.values(backendUpdatedCombos)) {
            const def = defs[backendNode.type];
            const [rawValues, opts] = def.input.required[comfyInput.name];

            console.debug("[ComfyApp] Reconfiguring combo widget", backendNode.type, "=>", comboNode.type, rawValues.length)
            comboNode.doAutoConfig(comfyInput, { includeProperties: new Set(["values"]), setWidgetTitle: false })

            const values = rawValues as string[]
            const defaultValue = rawValues[0];

            comboNode.formatValues(values, defaultValue, true)
            if (!rawValues?.includes(get(comboNode.value))) {
                comboNode.setValue(rawValues[0], comfyInput.config.defaultValue)
            }
        }
    }

    /**
     * Clean current state
     */
    clean() {
        this.a1111Prompt.set(null);
    }
}
