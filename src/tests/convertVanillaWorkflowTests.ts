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
const json1: ComfyVanillaWorkflow = await import("./data/convertedWidget.json")
const json2: ComfyVanillaWorkflow = await import("./data/convertedWidgetAndPrimitiveNode.json")

export default class convertVanillaWorkflowTests extends UnitTest {
    test__convertsWidget() {
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

        const widgets = Object.values(layout.allItems).filter(di => di.dragItem.type === "widget").map(di => di.dragItem) as WidgetLayout[];
        expect(widgets).toHaveLength(6);

        const widgetsValues = widgets.map(w => { return [w.node.type, w.node.getValue(), w.attrs.title] })
        expect(widgetsValues).toEqual([
            ["ui/number", 0, 'seed'],
            ["ui/number", 20, 'steps'],
            ["ui/number", 8.5, 'cfg'],
            ["ui/combo", 'euler', 'sampler_name'],
            ["ui/combo", 'normal', 'scheduler'],
            ["ui/number", 1, 'denoise']
        ]);

        const widget = widgets.find(w => w.attrs.title === "cfg") as WidgetLayout | null;
        expect(widget).toBeDefined();
        expect(widget.node).toBeDefined();
        expect(widget.node.type).toEqual("ui/number")
        expect(widget.node.getValue()).toEqual(8.5)
        expect(convWorkflow.graph.getNodeById(widget.node.id)).toEqual(widget.node)
    }


    test__convertsPrimitiveNodeAndConvertedInput() {
        const workflow = LiteGraph.cloneObject(json2)
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
