import type ComfyGraphCanvas from "$lib/ComfyGraphCanvas";
import { type ContainerLayout, type IDragItem, type TemplateLayout, type WritableLayoutStateStore } from "$lib/stores/layoutStates"
import type { LGraphCanvas } from "@litegraph-ts/core";
import { get } from "svelte/store";

export function handleContainerConsider(layoutState: WritableLayoutStateStore, container: ContainerLayout, evt: CustomEvent<DndEvent<IDragItem>>): IDragItem[] {
    return layoutState.updateChildren(container, evt.detail.items)
};

export function handleContainerFinalize(layoutState: WritableLayoutStateStore, container: ContainerLayout, evt: CustomEvent<DndEvent<IDragItem>>): IDragItem[] {
    const dnd = evt.detail
    const info = dnd.info;
    const droppedItem = dnd.items.find(i => i.id === info.id);
    const isDroppingTemplate = droppedItem?.type === "template"

    if (isDroppingTemplate) {
        return doInsertTemplate(layoutState, droppedItem as TemplateLayout, container, dnd.items)
    }
    else {
        return layoutState.updateChildren(container, dnd.items)
    }
};

function isComfyGraphCanvas(canvas: LGraphCanvas): canvas is ComfyGraphCanvas {
    return "insertTemplate" in canvas;
}

function doInsertTemplate(layoutState: WritableLayoutStateStore, droppedTemplate: TemplateLayout, container: ContainerLayout, items: IDragItem[]): IDragItem[] {
    const workflow = layoutState.workflow;
    const templateItemIndex = items.findIndex(i => i.id === droppedTemplate.id)

    const newChildren = items.filter(i => i.id !== droppedTemplate.id);

    const canvas = workflow.canvases["app"]?.canvas
    if (canvas == null || !isComfyGraphCanvas(canvas) || canvas.graph !== workflow.graph) {
        console.error("Couldn't get main graph canvas!")
        return newChildren;
    }

    layoutState.updateChildren(container, newChildren);

    const rect = canvas.ds.element.getBoundingClientRect();
    const width = rect?.width || 1;
    const height = rect?.height || 1;
    const center = canvas.convertOffsetToCanvas([width * 0.5, height * 0.5]);

    canvas.insertTemplate(droppedTemplate.template, center, container, templateItemIndex);

    return get(layoutState).allItems[container.id].children;
}
