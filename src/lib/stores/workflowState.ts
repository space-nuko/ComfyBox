import type { SerializedGraphCanvasState } from '$lib/ComfyGraphCanvas';
import { clamp, LGraphNode, type LGraphCanvas, type NodeID, type SerializedLGraph, type UUID, LGraph, LiteGraph, type SlotType, NodeMode } from '@litegraph-ts/core';
import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import { defaultWorkflowAttributes, type SerializedLayoutState, type WritableLayoutStateStore } from './layoutStates';
import ComfyGraph from '$lib/ComfyGraph';
import layoutStates from './layoutStates';
import { v4 as uuidv4 } from "uuid";
import type ComfyGraphCanvas from '$lib/ComfyGraphCanvas';
import type { SerializedAppState, SerializedPrompt } from '$lib/components/ComfyApp';
import type ComfyReceiveOutputNode from '$lib/nodes/actions/ComfyReceiveOutputNode';
import type { ComfyBoxPromptExtraData, PromptID } from '$lib/api';
import type { ComfyAPIPromptErrorResponse, ComfyExecutionError } from '$lib/apiErrors';

type ActiveCanvas = {
    canvas: LGraphCanvas | null;
    canvasHandler: () => void | null;
    state: SerializedGraphCanvasState;
}

export type SerializedWorkflowState = {
    graph: SerializedLGraph,
    layout: SerializedLayoutState,
    attrs: WorkflowAttributes
}

export enum OpenWorkflowMode {
    Append,
    AppendAndSetActive,
    ReplaceActive,
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

/*
 * Global workflow attributes
 */
export type WorkflowAttributes = {
    /*
     * Title of the workflow.
     */
    title: string,

    /*
     * Name of the "Queue Prompt" button. Set to blank to hide the button.
     */
    queuePromptButtonName: string,

    /*
     * If true, clicking the "Queue Prompt" button will run the default
     * subgraph. Set this to false if you need special behavior before running
     * any subgraphs, and instead use the `onDefaultQueueAction` event of the
     * Comfy.QueueEvents node.
     */
    queuePromptButtonRunWorkflow: boolean,

    /*
     * Default subgraph to run if `queuePromptButtonRunWorkflow` is `true`. Set
     * to blank to run the default subgraph (tagless).
     */
    queuePromptButtonDefaultWorkflow: string,

    /*
     * If true, notifications will be shown when a prompt is queued and
     * completed. Set to false if you need more detailed control over the
     * notification type/contents, and use the `ComfyNotifyAction` node instead.
     */
    showDefaultNotifications: boolean,
}

export type WorkflowValidationError = {
    type: "validation"
    workflowID: WorkflowInstID,
    error: ComfyAPIPromptErrorResponse,
    prompt: SerializedPrompt,
    extraData: ComfyBoxPromptExtraData
}

export type WorkflowExecutionError = {
    type: "execution"
    error: ComfyExecutionError,
}

export type WorkflowError = WorkflowValidationError | WorkflowExecutionError;

export class ComfyBoxWorkflow {
    /*
     * Used for uniquely identifying the instance of the opened workflow in the frontend.
     */
    id: WorkflowInstID;

    /*
     * Graph of this workflow, whose nodes are bound to the UI layout
     */
    graph: ComfyGraph;

    /*
     * Global workflow attributes
     */
    attrs: WorkflowAttributes;

    /*
     * True if an unsaved modification has been detected on this workflow
     */
    isModified: boolean = false;

    /*
     * Missing node types encountered when deserializing the graph
     */
    missingNodeTypes: Set<string> = new Set();

    /*
     * Completed queue entry ID that holds the last validation/execution error.
     */
    lastError?: PromptID

    get layout(): WritableLayoutStateStore | null {
        return layoutStates.getLayout(this.id)
    }

    /*
     * Graph canvases attached to the graph of this workflow
     */
    canvases: Record<string, ActiveCanvas> = {};

    constructor(title: string) {
        this.id = uuidv4();
        this.attrs = {
            ...defaultWorkflowAttributes,
            title,
        }
        this.graph = new ComfyGraph(this.id);
    }

    notifyModified() {
        this.isModified = true;
        store.set(get(store));
    }

    setAttribute<K extends keyof WorkflowAttributes>(key: K, value: WorkflowAttributes[K]) {
        this.attrs[key] = value;
        this.notifyModified();
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
        if (canvas == null) {
            console.debug("This workflow is not being displayed on canvas ${key}")
            return;
        }

        canvas.canvas.closeAllSubgraphs();
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

    serialize(layoutState: WritableLayoutStateStore): SerializedWorkflowState {
        const graph = this.graph;

        const serializedGraph = graph.serialize()
        const serializedLayout = layoutState.serialize()

        return {
            graph: serializedGraph,
            layout: serializedLayout,
            attrs: this.attrs
        }
    }

    /*
     * Creates a workflow and layout.
     *
     * NOTE: The layout will be attached to the global store, but the workflow
     * will not. If you change your mind later be sure to call
     * layoutStates.remove(workflow.id)!
     */
    static create(title: string = "New Workflow"): [ComfyBoxWorkflow, WritableLayoutStateStore] {
        const workflow = new ComfyBoxWorkflow(title);
        const layoutState = layoutStates.create(workflow);
        return [workflow, layoutState]
    }

    deserialize(layoutState: WritableLayoutStateStore, data: SerializedWorkflowState) {
        this.missingNodeTypes.clear();

        for (let n of data.graph.nodes) {
            // Patch T2IAdapterLoader to ControlNetLoader since they are the same node now
            if (n.type == "T2IAdapterLoader") n.type = "ControlNetLoader";

            // Find missing node types
            if (!(n.type in LiteGraph.registered_node_types)) {
                this.missingNodeTypes.add(n.type);
            }
        }

        // Ensure loadGraphData does not trigger any state changes in layoutState
        // (isConfiguring is set to true here)
        // lGraph.configure will add new nodes, triggering onNodeAdded, but we
        // want to restore the layoutState ourselves
        layoutState.onStartConfigure();

        // Patch T2IAdapterLoader to ControlNetLoader since they are the same node now
        for (let n of data.graph.nodes) {
            if (n.type == "T2IAdapterLoader") n.type = "ControlNetLoader";
        }

        this.graph.configure(data.graph);
        this.graph.workflowID = this.id;

        for (const node of this.graph._nodes) {
            const size = node.computeSize();
            size[0] = Math.max(node.size[0], size[0]);
            size[1] = Math.max(node.size[1], size[1]);
            node.size = size;
            // this.#invokeExtensions("loadedGraphNode", node);
        }

        this.attrs = { ...defaultWorkflowAttributes, ...data.attrs };

        // Now restore the layout
        // Subsequent added nodes will add the UI data to layoutState
        // TODO
        layoutState.deserialize(data.layout, this.graph)
    }
}

export type WorkflowState = {
    openedWorkflows: ComfyBoxWorkflow[],
    openedWorkflowsByID: Record<WorkflowInstID, ComfyBoxWorkflow>,
    activeWorkflowID: WorkflowInstID | null,
    activeWorkflowIndex: number | null,
    activeWorkflow: ComfyBoxWorkflow | null,
}

export type WorkflowReceiveOutputTargets = {
    workflow: ComfyBoxWorkflow,
    targetNodes: ComfyReceiveOutputNode[]
}

type WorkflowStateOps = {
    getWorkflow: (id: WorkflowInstID) => ComfyBoxWorkflow | null
    getWorkflowByGraph: (graph: LGraph) => ComfyBoxWorkflow | null
    getWorkflowByNode: (node: LGraphNode) => ComfyBoxWorkflow | null
    getWorkflowByNodeID: (id: NodeID) => ComfyBoxWorkflow | null
    getActiveWorkflow: () => ComfyBoxWorkflow | null
    createNewWorkflow: (canvas: ComfyGraphCanvas, title?: string, mode?: OpenWorkflowMode) => ComfyBoxWorkflow,
    openWorkflow: (canvas: ComfyGraphCanvas, data: SerializedAppState, mode?: OpenWorkflowMode) => ComfyBoxWorkflow,
    addWorkflow: (canvas: ComfyGraphCanvas, data: ComfyBoxWorkflow, mode?: OpenWorkflowMode) => void,
    closeWorkflow: (canvas: ComfyGraphCanvas, index: number) => void,
    closeAllWorkflows: (canvas: ComfyGraphCanvas) => void,
    setActiveWorkflow: (canvas: ComfyGraphCanvas, index: number | WorkflowInstID) => ComfyBoxWorkflow | null,
    findReceiveOutputTargets: (type: SlotType | SlotType[]) => WorkflowReceiveOutputTargets[],
    afterQueued: (id: WorkflowInstID, promptID: PromptID) => void
    promptError: (id: WorkflowInstID, promptID: PromptID) => void
    executionError: (id: WorkflowInstID, promptID: PromptID) => void
}

export type WritableWorkflowStateStore = Writable<WorkflowState> & WorkflowStateOps;
const store: Writable<WorkflowState> = writable(
    {
        openedWorkflows: [],
        openedWorkflowsByID: {},
        activeWorkflowID: null,
        activeWorkflowIndex: null,
        activeWorkflow: null
    })

function getWorkflow(id: WorkflowInstID): ComfyBoxWorkflow | null {
    return get(store).openedWorkflowsByID[id];
}

function getWorkflowByGraph(graph: LGraph): ComfyBoxWorkflow | null {
    const workflowID = (graph.getRootGraph() as ComfyGraph)?.workflowID;
    if (workflowID == null)
        return null;
    return getWorkflow(workflowID);
}

function getWorkflowByNode(node: LGraphNode): ComfyBoxWorkflow | null {
    return getWorkflowByGraph(node.graph);
}

function getWorkflowByNodeID(id: NodeID): ComfyBoxWorkflow | null {
    return Object.values(get(store).openedWorkflows).find(w => {
        return w.graph.getNodeByIdRecursive(id) != null
    })
}

function getActiveWorkflow(): ComfyBoxWorkflow | null {
    const state = get(store);
    if (state.activeWorkflowID == null)
        return null;
    return state.openedWorkflowsByID[state.activeWorkflowID];
}

function createNewWorkflow(canvas: ComfyGraphCanvas, title: string = "New Workflow", mode: OpenWorkflowMode = OpenWorkflowMode.AppendAndSetActive): ComfyBoxWorkflow {
    const workflow = new ComfyBoxWorkflow(title);
    const layoutState = layoutStates.create(workflow);
    layoutState.initDefaultLayout();

    return addWorkflow(canvas, workflow, mode);
}

function openWorkflow(canvas: ComfyGraphCanvas, data: SerializedAppState, mode: OpenWorkflowMode = OpenWorkflowMode.AppendAndSetActive): ComfyBoxWorkflow {
    const [workflow, layoutState] = ComfyBoxWorkflow.create("Workflow")
    workflow.deserialize(layoutState, { graph: data.workflow, layout: data.layout, attrs: data.attrs })

    addWorkflow(canvas, workflow, mode);

    return workflow;
}

function addWorkflow(canvas: ComfyGraphCanvas, workflow: ComfyBoxWorkflow, mode: OpenWorkflowMode = OpenWorkflowMode.AppendAndSetActive) {
    const state = get(store);

    let resultIndex: number = state.openedWorkflows.length;
    if (mode == OpenWorkflowMode.ReplaceActive && state.activeWorkflowIndex != null) {
        resultIndex = state.activeWorkflowIndex;
        closeWorkflow(canvas, resultIndex);
        state.openedWorkflows.splice(resultIndex, 0, workflow);
    }
    else {
        state.openedWorkflows.push(workflow);
    }

    state.openedWorkflowsByID[workflow.id] = workflow;

    let setActive: boolean;
    switch (mode) {
        case OpenWorkflowMode.Append:
            setActive = false;
            break;
        case OpenWorkflowMode.AppendAndSetActive:
        case OpenWorkflowMode.ReplaceActive:
            setActive = true;
            break;
    }

    if (setActive || state.activeWorkflowID == null)
        setActiveWorkflow(canvas, resultIndex)

    store.set(state)

    return workflow;
}

function closeWorkflow(canvas: ComfyGraphCanvas, index: number) {
    const state = get(store);

    if (index < 0 || index >= state.openedWorkflows.length)
        return;

    const workflow = state.openedWorkflows[index];
    workflow.stopAll();

    layoutStates.remove(workflow.id)

    state.openedWorkflows.splice(index, 1)
    delete state.openedWorkflowsByID[workflow.id]
    let newIndex = clamp(index, 0, state.openedWorkflows.length - 1)
    setActiveWorkflow(canvas, newIndex);

    store.set(state);
}

function closeAllWorkflows(canvas: ComfyGraphCanvas) {
    const state = get(store)
    while (state.openedWorkflows.length > 0)
        closeWorkflow(canvas, 0)
}

function setActiveWorkflow(canvas: ComfyGraphCanvas, index: number | WorkflowInstID): ComfyBoxWorkflow | null {
    const state = get(store);

    if (state.openedWorkflows.length === 0) {
        state.activeWorkflowID = null;
        state.activeWorkflowIndex = null;
        state.activeWorkflow = null
        return null;
    }

    if (typeof index === "string") {
        index = state.openedWorkflows.findIndex(w => w.id === index)
    }

    if (index < 0 || index >= state.openedWorkflows.length)
        return state.activeWorkflow;

    const workflow = state.openedWorkflows[index]
    if (workflow.id === state.activeWorkflowID)
        return state.activeWorkflow;

    if (state.activeWorkflow != null)
        state.activeWorkflow.stop("app")

    state.activeWorkflowID = workflow.id;
    state.activeWorkflowIndex = index;
    state.activeWorkflow = workflow;

    workflow.start("app", canvas);
    canvas.deserialize(workflow.canvases["app"].state)

    store.set(state)

    return workflow;
}

function findReceiveOutputTargets(type: SlotType | SlotType[]): WorkflowReceiveOutputTargets[] {
    let result = []

    const state = get(store);

    if (!Array.isArray(type))
        type = [type]

    const types = new Set(type);

    for (const workflow of state.openedWorkflows) {
        const targetNodes = workflow.graph
            // can't use class here because of circular import
            .findNodesByTypeRecursive("events/receive_output")
            .filter(n => {
                return types.has(n.properties.type) && n.mode === NodeMode.ALWAYS
            })

        if (targetNodes.length > 0)
            result.push({ workflow, targetNodes });
    }

    return result;
}

function afterQueued(id: WorkflowInstID, promptID: PromptID) {
    const workflow = getWorkflow(id);
    if (workflow == null) {
        console.warn("[workflowState] afterQueued: workflow not found", id, promptID)
        return
    }

    workflow.lastError = null;
}

function promptError(id: WorkflowInstID, promptID: PromptID) {
    const workflow = getWorkflow(id);
    if (workflow == null) {
        console.warn("[workflowState] promptError: workflow not found", id, promptID)
        return
    }

    workflow.lastError = promptID;
}

function executionError(id: WorkflowInstID, promptID: PromptID) {
    const workflow = getWorkflow(id);
    if (workflow == null) {
        console.warn("[workflowState] executionError: workflow not found", id, promptID)
        return
    }

    workflow.lastError = promptID;
}

const workflowStateStore: WritableWorkflowStateStore =
{
    ...store,
    getWorkflow,
    getWorkflowByGraph,
    getWorkflowByNode,
    getWorkflowByNodeID,
    getActiveWorkflow,
    createNewWorkflow,
    openWorkflow,
    addWorkflow,
    closeWorkflow,
    closeAllWorkflows,
    setActiveWorkflow,
    findReceiveOutputTargets,
    afterQueued,
    promptError,
    executionError,
}
export default workflowStateStore;
