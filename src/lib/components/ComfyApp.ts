import { LiteGraph, LGraph, LGraphCanvas, LGraphNode, type LGraphNodeConstructor, type LGraphNodeExecutable, type SerializedLGraph, type SerializedLGraphGroup, type SerializedLGraphNode, type SerializedLLink, NodeMode, type Vector2, BuiltInSlotType, type INodeInputSlot, type NodeID, type NodeTypeSpec, type NodeTypeOpts, type SlotIndex, type UUID } from "@litegraph-ts/core";
import type { LConnectionKind, INodeSlot } from "@litegraph-ts/core";
import ComfyAPI, { type ComfyAPIStatusResponse, type ComfyBoxPromptExtraData, type ComfyPromptRequest, type ComfyNodeID, type PromptID, type QueueItemType } from "$lib/api"
import { importA1111, parsePNGMetadata } from "$lib/pnginfo";
import EventEmitter from "events";
import type TypedEmitter from "typed-emitter";
import A1111PromptModal from "./modal/A1111PromptModal.svelte";
import MissingNodeTypesModal from "./modal/MissingNodeTypesModal.svelte";
import WorkflowLoadErrorModal from "./modal/WorkflowLoadErrorModal.svelte";
import ConfirmConvertWithMissingNodeTypesModal from "./modal/ConfirmConvertWithMissingNodeTypesModal.svelte";


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
import { defaultWorkflowAttributes, type LayoutState, type SerializedLayoutState, type WritableLayoutStateStore } from "$lib/stores/layoutStates";
import { toast } from '@zerodevx/svelte-toast'
import ComfyGraph from "$lib/ComfyGraph";
import { ComfyBackendNode } from "$lib/nodes/ComfyBackendNode";
import { get, writable, type Writable } from "svelte/store";
import { tick } from "svelte";
import uiState from "$lib/stores/uiState";
import { basename, capitalize, download, graphToGraphVis, jsonToJsObject, promptToGraphVis, range, workflowToGraphVis } from "$lib/utils";
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
import selectionState from "$lib/stores/selectionState";
import layoutStates from "$lib/stores/layoutStates";
import { ComfyWorkflow, type WorkflowAttributes, type WorkflowInstID } from "$lib/stores/workflowState";
import workflowState from "$lib/stores/workflowState";
import convertVanillaWorkflow, { type ComfyVanillaWorkflow } from "$lib/convertVanillaWorkflow";
import modalState from "$lib/stores/modalState";

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
    /** For easy structural typing use */
    comfyBoxWorkflow: true,
    /** Program identifier, should be something like "ComfyBox" or "ComfyUI" */
    createdBy: string,
    /** Serial version, should be incremented on breaking changes */
    version: number,
    /** Commit hash if found */
    commitHash?: string,
    /** Graph state */
    workflow: SerializedLGraph,
    /** Workflow attributes */
    attrs: WorkflowAttributes,
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

export type WorkflowLoadError = {
    message: string,
    error: Error
}

export type VanillaWorkflowConvertResult = {
    comfyBoxWorkflow: SerializedAppState,
    missingNodeTypes: Set<string>
}

function isComfyBoxWorkflow(data: any): data is SerializedAppState {
    return data != null && (typeof data === "object") && data.comfyBoxWorkflow;
}

function isVanillaWorkflow(data: any): data is SerializedLGraph {
    return data != null && (typeof data === "object") && data.last_node_id != null;
}

type BackendNodeDef = {
    nodeDef: ComfyNodeDef
}

export default class ComfyApp {
    api: ComfyAPI;

    rootEl: HTMLDivElement | null = null;
    canvasEl: HTMLCanvasElement | null = null;
    canvasCtx: CanvasRenderingContext2D | null = null;
    lCanvas: ComfyGraphCanvas | null = null;

    shiftDown: boolean = false;
    ctrlDown: boolean = false;
    selectedGroupMoving: boolean = false;
    alreadySetup: Writable<boolean> = writable(false);

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
            console.log("Already setup")
            return;
        }

        this.setupColorScheme()

        this.rootEl = document.getElementById("app-root") as HTMLDivElement;
        this.canvasEl = document.getElementById("graph-canvas") as HTMLCanvasElement;
        this.lCanvas = new ComfyGraphCanvas(this, this.canvasEl);
        this.canvasCtx = this.canvasEl.getContext("2d");

        const uiUnlocked = get(uiState).uiUnlocked;
        this.lCanvas.allow_dragnodes = uiUnlocked;
        this.lCanvas.allow_interaction = uiUnlocked;

        // await this.#invokeExtensionsAsync("init");
        const defs = await this.api.getNodeDefs();
        await this.registerNodes(defs);

        // Load previous workflow
        let restored = false;
        try {
            restored = await this.loadStateFromLocalStorage(defs);
        } catch (err) {
            console.error("Error loading previous workflow", err);
            notify(`Error loading previous workflow:\n${err}`, { type: "error", timeout: null })
        }

        // We failed to restore a workflow so load the default
        if (!restored) {
            await this.initDefaultWorkflow(defs);
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

    serialize(workflow: ComfyWorkflow, canvas?: SerializedGraphCanvasState): SerializedAppState {
        const layoutState = layoutStates.getLayout(workflow.id);
        if (layoutState == null)
            throw new Error("Workflow has no layout!")

        const { graph, layout, attrs } = workflow.serialize(layoutState);
        canvas ||= this.lCanvas.serialize();

        return {
            comfyBoxWorkflow: true,
            createdBy: "ComfyBox",
            version: COMFYBOX_SERIAL_VERSION,
            commitHash: __GIT_COMMIT_HASH__,
            workflow: graph,
            attrs,
            layout,
            canvas
        }
    }

    saveStateToLocalStorage() {
        try {
            uiState.update(s => { s.isSavingToLocalStorage = true; return s; })
            const state = get(workflowState)
            const workflows = state.openedWorkflows
            const savedWorkflows = workflows.map(w => this.serialize(w));
            const activeWorkflowIndex = workflows.findIndex(w => state.activeWorkflowID === w.id);
            const json = JSON.stringify({ workflows: savedWorkflows, activeWorkflowIndex });
            localStorage.setItem("workflows", json)
            for (const workflow of workflows)
                workflow.isModified = false;
            workflowState.set(get(workflowState));
            notify("Saved to local storage.")
        }
        catch (err) {
            notify(`Failed saving to local storage:\n${err}`, { type: "error" })
        }
        finally {
            uiState.update(s => { s.isSavingToLocalStorage = false; return s; })
        }
    }

    async loadStateFromLocalStorage(defs: Record<ComfyNodeID, ComfyNodeDef>): Promise<boolean> {
        const json = localStorage.getItem("workflows");
        if (!json) {
            return false
        }

        const state = JSON.parse(json);
        if (!("workflows" in state))
            return false;

        const workflows = state.workflows as SerializedAppState[];
        await Promise.all(workflows.map(w => {
            return this.openWorkflow(w, defs, false).catch(error => {
                console.error("Failed restoring previous workflow", error)
                notify(`Failed restoring previous workflow: ${error}`, { type: "error" })
            })
        }));

        if (typeof state.activeWorkflowIndex === "number") {
            workflowState.setActiveWorkflow(this.lCanvas, state.activeWorkflowIndex);
            selectionState.clear();
        }

        return true;
    }

    static node_type_overrides: Record<string, typeof ComfyBackendNode> = {}
    static widget_type_overrides: Record<string, typeof SvelteComponentDev> = {}

    static knownBackendNodes: Record<string, BackendNodeDef> = {}

    private async registerNodes(defs: Record<ComfyNodeID, ComfyNodeDef>) {
        ComfyApp.knownBackendNodes = {}

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
            ComfyApp.knownBackendNodes[nodeId] = {
                nodeDef
            }

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

            if (workflow && typeof workflow.createdBy === "string") {
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
            workflowState.getActiveWorkflow()?.graph?.setDirtyCanvas(true, false); // TODO PromptID
        });

        this.api.addEventListener("executing", (promptID: PromptID | null, nodeID: ComfyNodeID | null) => {
            const queueEntry = queueState.executingUpdated(promptID, nodeID);
            if (queueEntry != null) {
                const workflow = workflowState.getWorkflow(queueEntry.workflowID);
                workflow?.graph?.setDirtyCanvas(true, false);
            }
        });

        this.api.addEventListener("executed", (promptID: PromptID, nodeID: ComfyNodeID, output: SerializedPromptOutput) => {
            const queueEntry = queueState.onExecuted(promptID, nodeID, output)
            if (queueEntry != null) {
                const workflow = workflowState.getWorkflow(queueEntry.workflowID);
                if (workflow != null) {
                    workflow.graph.setDirtyCanvas(true, false);
                    const node = workflow.graph.getNodeByIdRecursive(nodeID) as ComfyGraphNode;
                    if (node?.onExecuted) {
                        node.onExecuted(output);
                    }
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

    async clearQueue(type: QueueItemType) {
        queueState.update(s => { s.isInterrupting = true; return s; })
        await this.api.clearItems(type)
            .then(() => {
                queueState.queueCleared(type);
                notify(`${capitalize(type)} cleared.`);
            })
            .finally(() => {
                queueState.update(s => { s.isInterrupting = false; return s; })
            });
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

    async openWorkflow(data: SerializedAppState,
        refreshCombos: boolean | Record<string, ComfyNodeDef> = true,
        warnMissingNodeTypes: boolean = true
    ): Promise<ComfyWorkflow> {
        if (data.version !== COMFYBOX_SERIAL_VERSION) {
            const mes = `Invalid ComfyBox saved data format: ${data.version} `
            notify(mes, { type: "error" })
            return Promise.reject(mes);
        }

        this.clean();

        let workflow: ComfyWorkflow;
        try {
            workflow = workflowState.openWorkflow(this.lCanvas, data);
        }
        catch (error) {
            modalState.pushModal({
                svelteComponent: WorkflowLoadErrorModal,
                svelteProps: {
                    error
                }
            })
            return Promise.reject(error)
        }

        if (workflow.missingNodeTypes.size > 0 && warnMissingNodeTypes) {
            modalState.pushModal({
                svelteComponent: MissingNodeTypesModal,
                svelteProps: {
                    missingNodeTypes: workflow.missingNodeTypes
                }
            })
        }

        // Restore canvas offset/zoom
        this.lCanvas.deserialize(data.canvas)

        if (refreshCombos) {
            let defs = null;
            if (typeof refreshCombos === "object")
                defs = refreshCombos;
            await this.refreshComboInNodes(workflow, defs);
        }

        return workflow;
    }

    async openVanillaWorkflow(data: SerializedLGraph, filename: string) {
        const title = basename(filename)

        const attrs: WorkflowAttributes = {
            ...defaultWorkflowAttributes,
            title
        }

        const canvas: SerializedGraphCanvasState = {
            offset: [0, 0],
            scale: 1
        }

        const [comfyBoxWorkflow, layoutState] = convertVanillaWorkflow(data, attrs);

        const addWorkflow = () => {
            notify("Converted ComfyUI workflow to ComfyBox format.", { type: "info" })
            workflowState.addWorkflow(this.lCanvas, comfyBoxWorkflow)
            this.lCanvas.deserialize(canvas);
        }

        if (comfyBoxWorkflow.missingNodeTypes.size > 0) {
            modalState.pushModal({
                svelteComponent: ConfirmConvertWithMissingNodeTypesModal,
                svelteProps: {
                    missingNodeTypes: comfyBoxWorkflow.missingNodeTypes
                },
                closeOnClick: false,
                showCloseButton: false,
                buttons: [
                    {
                        name: "Cancel",
                        variant: "secondary",
                        onClick: () => {
                            layoutStates.remove(comfyBoxWorkflow.id)
                        }
                    },
                    {
                        name: "Convert",
                        variant: "primary",
                        onClick: addWorkflow
                    },
                ]
            })
        }
        else {
            addWorkflow()
        }
    }

    setActiveWorkflow(id: WorkflowInstID) {
        const index = get(workflowState).openedWorkflows.findIndex(w => w.id === id)
        if (index === -1)
            return;
        workflowState.setActiveWorkflow(this.lCanvas, index);
        selectionState.clear();
    }

    createNewWorkflow() {
        workflowState.createNewWorkflow(this.lCanvas, undefined, true);
        selectionState.clear();
    }

    closeWorkflow(id: WorkflowInstID) {
        const index = get(workflowState).openedWorkflows.findIndex(w => w.id === id)
        if (index === -1)
            return;
        workflowState.closeWorkflow(this.lCanvas, index);
        selectionState.clear();
    }

    async initDefaultWorkflow(defs?: Record<string, ComfyNodeDef>) {
        let state = null;
        try {
            const graphResponse = await fetch("/workflows/defaultWorkflow.json");
            state = await graphResponse.json() as SerializedAppState;
        }
        catch (error) {
            console.error("Failed to load default graph", error)
            notify(`Failed to load default graph: ${error} `, { type: "error" })
            state = structuredClone(blankGraph)
        }
        await this.openWorkflow(state, defs)
    }

    clear() {
        this.clean();

        this.lCanvas.closeAllSubgraphs();
        workflowState.closeAllWorkflows(this.lCanvas);
        uiState.update(s => {
            s.uiUnlocked = true;
            s.uiEditMode = "widgets";
            return s;
        })
    }

    runDefaultQueueAction() {
        const workflow = workflowState.getActiveWorkflow();
        if (workflow == null)
            return;

        for (const node of workflow.graph.iterateNodesInOrderRecursive()) {
            if ("onDefaultQueueAction" in node) {
                (node as ComfyGraphNode).onDefaultQueueAction()
            }
        }

        if (workflow.attrs.queuePromptButtonRunWorkflow) {
            // Hold control to queue at the front
            const num = this.ctrlDown ? -1 : 0;
            this.queuePrompt(num, 1);
        }
    }

    querySave() {
        const workflow = workflowState.getActiveWorkflow();
        if (workflow == null) {
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
            filename = `workflow - ${formattedDate}.json`
        }

        const indent = 2
        const json = JSON.stringify(this.serialize(workflow), null, indent)

        download(filename, json, "application/json")

        workflow.isModified = false;
        workflowState.set(get(workflowState));

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
        const activeWorkflow = workflowState.getActiveWorkflow();
        if (activeWorkflow == null) {
            notify("No workflow is opened!", { type: "error" })
            return;
        }

        this.queueItems.push({ num, batchCount, workflow: activeWorkflow });

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
                console.debug(`Queue get! ${num} ${batchCount} ${tag} `);

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
                    const wf = this.serialize(workflow)
                    console.debug(graphToGraphVis(workflow.graph))
                    console.debug(promptToGraphVis(p))

                    const stdPrompt = this.stdPromptSerializer.serialize(p);
                    console.warn("STD", stdPrompt);

                    const extraData: ComfyBoxPromptExtraData = {
                        extra_pnginfo: {
                            comfyBoxWorkflow: wf,
                            comfyBoxPrompt: {
                                subgraphs: [tag]
                            }
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
                        notify(`Error queuing prompt: \n${mes} `, { type: "error" })
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
            const buffer = await file.arrayBuffer();
            const pngInfo = await parsePNGMetadata(buffer);
            if (pngInfo) {
                if (pngInfo.comfyBoxWorkflow) {
                    await this.openWorkflow(JSON.parse(pngInfo.comfyBoxWorkflow));
                } else if (pngInfo.workflow) {
                    const workflow = JSON.parse(pngInfo.workflow);
                    await this.openVanillaWorkflow(workflow, file.name);
                } else if (pngInfo.parameters) {
                    const parsed = parseA1111(pngInfo.parameters)
                    if ("error" in parsed) {
                        notify(`Couldn't parse webui prompt: ${parsed.error}`, { type: "error" })
                        return;
                    }
                    const converted = convertA1111ToStdPrompt(parsed)
                    const a1111Info: A1111PromptAndInfo = {
                        infotext: pngInfo.parameters,
                        parsedInfotext: parsed,
                        stdPrompt: converted,
                        imageFile: file
                    }
                    modalState.pushModal({
                        title: "A1111 Prompt Details",
                        svelteComponent: A1111PromptModal,
                        svelteProps: {
                            prompt: a1111Info
                        },
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
                const result = JSON.parse(reader.result as string)
                if (isComfyBoxWorkflow(result)) {
                    await this.openWorkflow(result);
                }
                else if (isVanillaWorkflow(result)) {
                    await this.openVanillaWorkflow(result, file.name);
                }
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
    async refreshComboInNodes(workflow?: ComfyWorkflow, defs?: Record<string, ComfyNodeDef>, flashUI: boolean = false) {
        workflow ||= workflowState.getActiveWorkflow();
        if (workflow == null) {
            notify("No active workflow!", { type: "error" })
            return
        }

        if (defs == null)
            defs = await this.api.getNodeDefs();

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
    }
}
