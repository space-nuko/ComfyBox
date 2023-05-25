import type ComfyGraphCanvas from "$lib/ComfyGraphCanvas";
import { type ContainerLayout, type IDragItem, type TemplateLayout, type WritableLayoutStateStore } from "$lib/stores/layoutStates"
import type { LGraphCanvas, Vector2 } from "@litegraph-ts/core";
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

    const newPos: Vector2 = [canvas.visible_area[0] + canvas.visible_area[2] / 2, canvas.visible_area[1] + canvas.visible_area[3] / 2]

    canvas.insertTemplate(droppedTemplate.template, newPos, container, templateItemIndex);

    return get(layoutState).allItems[container.id].children;
}
