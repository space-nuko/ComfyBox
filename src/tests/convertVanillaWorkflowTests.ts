import { expect } from 'vitest';
import UnitTest from "./UnitTest";
import { readFile } from "fs/promises"
import { get } from "svelte/store";
import convertVanillaWorkflow, { type ComfyVanillaWorkflow } from '$lib/convertVanillaWorkflow';
import type { WorkflowAttributes } from '$lib/stores/workflowState';
import layoutStates, { defaultWorkflowAttributes, type IDragItem, type WidgetLayout } from '$lib/stores/layoutStates';
import ComfyApp from '$lib/components/ComfyApp';
import { LiteGraph } from '@litegraph-ts/core';
import type { ComfyNodeDef } from '$lib/ComfyNodeDef';

const objectInfo: Record<string, ComfyNodeDef> = await import("./data/objectInfo.json")
const json1: ComfyVanillaWorkflow = await import("./data/convertedWidgetAndPrimitiveNode.json")

export default class convertVanillaWorkflowTests extends UnitTest {
    test__convertsPrimitiveNodeAndConvertedInput() {
        const workflow = LiteGraph.cloneObject(json1)
        const attrs: WorkflowAttributes = { ...defaultWorkflowAttributes }

        ComfyApp.knownBackendNodes["KSampler"] = {
            nodeDef: objectInfo["KSampler"]
        }

        const converted = convertVanillaWorkflow(workflow, attrs)

        expect(converted).toBeInstanceOf(Array)

        const [convWorkflow, convLayout] = converted;

        const layout = get(convLayout)

        expect(Object.keys(layout.allItems)).toHaveLength(10)

        const widgets = Object.values(layout.allItems).filter(di => di.dragItem.type === "widget").map(di => di.dragItem);
        expect(widgets).toHaveLength(6);

        const widget = widgets.find(w => w.attrs.title === "cfg") as WidgetLayout | null;
        expect(widget).toBeDefined();
        expect(widget.node).toBeDefined();
        expect(widget.node.type).toEqual("ui/number")
        expect(convWorkflow.graph.getNodeById(widget.node.id)).toEqual(widget.node)
    }
}
