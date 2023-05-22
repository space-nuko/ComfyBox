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
import type IComfyInputSlot from '$lib/IComfyInputSlot';

const objectInfo: Record<string, ComfyNodeDef> = await import("./data/objectInfo.json")
const json1: ComfyVanillaWorkflow = await import("./data/convertedWidget.json")
const json2: ComfyVanillaWorkflow = await import("./data/convertedSeedWidget.json")
const json3: ComfyVanillaWorkflow = await import("./data/convertedWidgetAndPrimitiveNode.json")

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

    test__convertsSeedWidget() {
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

        const widgets = Object.values(layout.allItems).filter(di => di.dragItem.type === "widget").map(di => di.dragItem) as WidgetLayout[];
        expect(widgets).toHaveLength(6);

        const widgetsValues = widgets.map(w => { return [w.node.type, w.node.getValue(), w.attrs.title] })
        expect(widgetsValues).toEqual([
            ["ui/number", 20, 'steps'],
            ["ui/number", 8, 'cfg'],
            ["ui/combo", 'euler', 'sampler_name'],
            ["ui/combo", 'normal', 'scheduler'],
            ["ui/number", 1, 'denoise'],
            ["ui/number", 1461, 'seed']
        ]);

        const widget = widgets.find(w => w.attrs.title === "seed") as WidgetLayout | null;
        expect(widget).toBeDefined();
        expect(widget.node).toBeDefined();
        expect(widget.node.type).toEqual("ui/number")
        expect(widget.node.getValue()).toEqual(1461)
        expect(convWorkflow.graph.getNodeById(widget.node.id)).toEqual(widget.node)

        const links = widget.node.getOutputLinks(0)
        expect(links).toHaveLength(1);

        const kSampler = convWorkflow.graph.findNodesByType("KSampler")[0];
        expect(links[0].origin_id).toEqual(widget.node.id);
        expect(links[0].target_id).toEqual(kSampler.id);

        expect(widget.node.outputs[0].type).toEqual("number");

        const targetNode = widget.node.getOutputNodes(0)[0]
        expect(targetNode.inputs[links[0].target_slot].type).toEqual("number")
        expect((targetNode.inputs[links[0].target_slot] as IComfyInputSlot).serialize).toEqual(true)
        expect(links[0].type).toEqual("number");
    }

    test__convertsPrimitiveNodeAndConvertedInput() {
        const workflow = LiteGraph.cloneObject(json3)
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
