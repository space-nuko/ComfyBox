import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type ComfyApp from "$lib/components/ComfyApp"
import type { LGraphNode, IWidget } from "@litegraph-ts/core"

export type LayoutState = {
    root: IDragItem | null,
    children: Record<number, IDragItem[]>,
}

export type Properties = {
    direction: string,
}

export interface IDragItem {
    type: string,
    id: number,
    isNodeExecuting?: boolean,
    properties: Properties
}

export interface ContainerLayout extends IDragItem {
    type: "container",
}

export interface WidgetLayout extends IDragItem {
    type: "widget",
    nodeId: number,
    widgetName: string
}

type LayoutStateOps = {
    findDefaultContainerForInsertion: () => ContainerLayout | null,
    reset: () => void,
}

export type WritableLayoutStateStore = Writable<LayoutState> & LayoutStateOps;
const store: Writable<LayoutState> = writable({
    root: null,
    children: []
})

function findDefaultContainerForInsertion(): ContainerLayout | null {
    const state = get(store);
    if ("children" in state.root) {
        const container = state.root as ContainerLayout;
        const found = state.children[container.id].find((di) => {"children" in di})
        if (found && "children" in found)
            return found as ContainerLayout;
        return container;
    }
    return null
}

function reset() {
    // TODO
}

const uiStateStore: WritableLayoutStateStore =
{
    ...store,
    findDefaultContainerForInsertion,
    reset
}
export default uiStateStore;
