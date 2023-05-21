import type { SerializedGraphCanvasState } from '$lib/ComfyGraphCanvas';
import type { LGraphCanvas, NodeID, SerializedLGraph, UUID } from '@litegraph-ts/core';
import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { SerializedLayoutState, WritableLayoutStateStore } from './layoutStates';
import ComfyGraph from '$lib/ComfyGraph';
import layoutStates from './layoutStates';
import { v4 as uuidv4 } from "uuid";
import type ComfyGraphCanvas from '$lib/ComfyGraphCanvas';
import { blankGraph } from '$lib/defaultGraph';
import type { SerializedAppState } from '$lib/components/ComfyApp';

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

    /*
     * Human-readable name on the tab
     */
    title: string;

    /*
     * Graph of this workflow, whose nodes are bound to the UI layout
     */
    graph: ComfyGraph;

    get layout(): WritableLayoutStateStore | null {
        return layoutStates.getLayout(this.id)
    }

    /*
     * Graph canvases attached to the graph of this workflow
     */
    canvases: Record<string, ActiveCanvas> = {};

    constructor(title: string) {
        this.id = uuidv4();
        this.title = title;
        this.graph = new ComfyGraph(this.id);
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

    serialize(layoutState: WritableLayoutStateStore): SerializedWorkflowState {
        const graph = this.graph;

        const serializedGraph = graph.serialize()
        const serializedLayout = layoutState.serialize()

        return {
            graph: serializedGraph,
            layout: serializedLayout
        }
    }

    static create(title: string = "New Workflow"): [ComfyWorkflow, WritableLayoutStateStore] {
        const workflow = new ComfyWorkflow(title);
        const layoutState = layoutStates.create(workflow);
        return [workflow, layoutState]
    }

    deserialize(layoutState: WritableLayoutStateStore, data: SerializedWorkflowState) {
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

        for (const node of this.graph._nodes) {
            const size = node.computeSize();
            size[0] = Math.max(node.size[0], size[0]);
            size[1] = Math.max(node.size[1], size[1]);
            node.size = size;
            // this.#invokeExtensions("loadedGraphNode", node);
        }

        // Now restore the layout
        // Subsequent added nodes will add the UI data to layoutState
        // TODO
        layoutState.deserialize(data.layout, this.graph)
    }
}

export type WorkflowState = {
    openedWorkflows: ComfyWorkflow[],
    openedWorkflowsByID: Record<WorkflowInstID, ComfyWorkflow>,
    activeWorkflowIdx: number,
    activeWorkflow: ComfyWorkflow | null,
}

type WorkflowStateOps = {
    getWorkflow: (id: WorkflowInstID) => ComfyWorkflow | null
    getWorkflowByNodeID: (id: NodeID) => ComfyWorkflow | null
    getActiveWorkflow: () => ComfyWorkflow | null
    createNewWorkflow: (canvas: ComfyGraphCanvas, setActive?: boolean) => ComfyWorkflow,
    openWorkflow: (canvas: ComfyGraphCanvas, data: SerializedAppState) => ComfyWorkflow,
    closeWorkflow: (canvas: ComfyGraphCanvas, index: number) => void,
    closeAllWorkflows: (canvas: ComfyGraphCanvas) => void,
    setActiveWorkflow: (canvas: ComfyGraphCanvas, index: number) => ComfyWorkflow | null
}

export type WritableWorkflowStateStore = Writable<WorkflowState> & WorkflowStateOps;
const store: Writable<WorkflowState> = writable(
    {
        openedWorkflows: [],
        openedWorkflowsByID: {},
        activeWorkflowIdx: -1,
        activeWorkflow: null
    })

function getWorkflow(id: WorkflowInstID): ComfyWorkflow | null {
    return get(store).openedWorkflowsByID[id];
}

function getWorkflowByNodeID(id: NodeID): ComfyWorkflow | null {
    return Object.values(get(store).openedWorkflows).find(w => {
        return w.graph.getNodeByIdRecursive(id) != null
    })
}

function getActiveWorkflow(): ComfyWorkflow | null {
    const state = get(store);
    if (state.activeWorkflowIdx === -1)
        return null;
    return state.openedWorkflows[state.activeWorkflowIdx];
}

function createNewWorkflow(canvas: ComfyGraphCanvas, setActive: boolean = false): ComfyWorkflow {
    const workflow = new ComfyWorkflow("Workflow X");
    const layoutState = layoutStates.create(workflow);
    layoutState.initDefaultLayout();

    const state = get(store);
    state.openedWorkflows.push(workflow);

    if (setActive)
        setActiveWorkflow(canvas, state.openedWorkflows.length - 1)

    store.set(state)

    return workflow;
}

function openWorkflow(canvas: ComfyGraphCanvas, data: SerializedAppState): ComfyWorkflow {
    const [workflow, layoutState] = ComfyWorkflow.create("Workflow X")
    workflow.deserialize(layoutState, { graph: data.workflow, layout: data.layout })

    const state = get(store);
    state.openedWorkflows.push(workflow);
    setActiveWorkflow(canvas, state.openedWorkflows.length - 1)

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
    setActiveWorkflow(canvas, 0);

    store.set(state);
}

function closeAllWorkflows(canvas: ComfyGraphCanvas) {
    const state = get(store)
    while (state.openedWorkflows.length > 0)
        closeWorkflow(canvas, 0)
}

function setActiveWorkflow(canvas: ComfyGraphCanvas, index: number): ComfyWorkflow | null {
    const state = get(store);

    if (state.openedWorkflows.length === 0) {
        state.activeWorkflowIdx = -1;
        state.activeWorkflow = null
        return null;
    }

    if (index < 0 || index >= state.openedWorkflows.length || state.activeWorkflowIdx === index)
        return state.activeWorkflow;

    if (state.activeWorkflow != null)
        state.activeWorkflow.stop("app")

    const workflow = state.openedWorkflows[index]
    state.activeWorkflowIdx = index;
    state.activeWorkflow = workflow;

    workflow.start("app", canvas);
    canvas.deserialize(workflow.canvases["app"].state)

    store.set(state)

    return workflow;
}

const workflowStateStore: WritableWorkflowStateStore =
{
    ...store,
    getWorkflow,
    getWorkflowByNodeID,
    getActiveWorkflow,
    createNewWorkflow,
    openWorkflow,
    closeWorkflow,
    closeAllWorkflows,
    setActiveWorkflow,
}
export default workflowStateStore;
