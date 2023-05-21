import { LGraph, type SerializedLGraph } from "@litegraph-ts/core";
import type { SerializedAppState } from "./components/ComfyApp";
import layoutStates, { defaultWorkflowAttributes, type DragItemID, type SerializedDragEntry, type SerializedLayoutState } from "./stores/layoutStates";
import type { WorkflowAttributes } from "./stores/workflowState";
import type { SerializedGraphCanvasState } from "./ComfyGraphCanvas";

/*
 * The workflow type used by base ComfyUI
 */
export type ComfyVanillaWorkflow = SerializedLGraph;

function addLayoutToVanillaWorkflow(workflow: ComfyVanillaWorkflow): SerializedLayoutState {
    // easier to create a real layout first and then serialize it, then have to
    // deal with manually constructing the serialized state from the ground up
    const layoutState = layoutStates.createRaw();
    const graph = new LGraph();
    graph.configure(workflow)

    for (const node of graph.iterateNodesInOrder()) {
        console.warn("NODE", node)
    }

    return layoutState.serialize()
}

export default function convertVanillaWorkflow(workflow: ComfyVanillaWorkflow): SerializedAppState {
    const attrs: WorkflowAttributes = {
        ...defaultWorkflowAttributes,
        title: "ComfyUI Workflow"
    }

    const canvas: SerializedGraphCanvasState = {
        offset: [0, 0],
        scale: 1
    }

    const layout = addLayoutToVanillaWorkflow(workflow);

    const appState: SerializedAppState = {
        comfyBoxWorkflow: true,
        createdBy: "ComfyUI", // ???
        version: 1,
        workflow,
        attrs,
        canvas,
        layout,
        commitHash: null
    }

    return appState
}
