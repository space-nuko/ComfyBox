import { get } from "svelte/store";
import journeyState, { type JourneyState } from "$lib/stores/journeyState"
import { expect } from 'vitest';
import UnitTest from "../UnitTest";
import { Watch } from "@litegraph-ts/nodes-basic";
import { ComfyBoxWorkflow } from "$lib/stores/workflowState";
import { ComfyNumberNode } from "$lib/nodes/widgets";
import { LiteGraph } from "@litegraph-ts/core";
import { getWorkflowRestoreParamsFromWorkflow } from "$lib/restoreParameters";
import { calculateWorkflowParamsPatch } from "$lib/stores/journeyStates";

export default class journeyStateTests extends UnitTest {
    test__patches() {
        const [workflow, layoutState] = ComfyBoxWorkflow.create()
        const { graph, journey } = workflow;
        layoutState.initDefaultLayout() // adds 3 containers

        const widget1 = LiteGraph.createNode(ComfyNumberNode);
        const widget2 = LiteGraph.createNode(ComfyNumberNode);
        const watch1 = LiteGraph.createNode(Watch);
        const watch2 = LiteGraph.createNode(Watch);

        graph.add(widget1)
        graph.add(watch1)
        graph.add(widget2)
        graph.add(watch2)

        widget1.connect(0, watch1, 0);
        widget2.connect(0, watch2, 0);
        widget1.setValue(0)
        widget2.setValue(0)

        let workflowParams = getWorkflowRestoreParamsFromWorkflow(workflow)
        const root = journey.addNode(workflowParams, null);

        expect(root).toEqual({
            id: root.id,
            type: "root",
            children: [],
            base: {
                [widget1.id]: {
                    type: "workflow",
                    finalValue: 0,
                },
                [widget2.id]: {
                    type: "workflow",
                    finalValue: 0,
                }
            }
        });

        widget1.setValue(5)

        workflowParams = getWorkflowRestoreParamsFromWorkflow(workflow)
        const patchParams = calculateWorkflowParamsPatch(root, workflowParams)
        const patch = journey.addNode(patchParams, root.id);

        expect(patch).toEqual({
            id: patch.id,
            type: "patch",
            parent: root,
            children: [],
            patch: {
                [widget1.id]: {
                    type: "workflow",
                    finalValue: 5
                },
            }
        })
    }
}
