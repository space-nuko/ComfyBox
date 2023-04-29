import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type ComfyApp from "$lib/components/ComfyApp"
import type { LGraphNode, IWidget } from "@litegraph-ts/core"
import nodeState from "$lib/state/nodeState";
import type { NodeStateStore } from './nodeState';
 import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';

type DragItemEntry = {
    dragItem: IDragItem,
    children: IDragItem[] | null,
    parent: IDragItem | null
}

export type LayoutState = {
    root: IDragItem | null,
    allItems: Record<DragItemID, DragItemEntry>,
    currentId: number,
    currentSelection: IDragItem[]
}

export type Attributes = {
    direction: string,
    title: string,
    showTitle: boolean,
    classes: string,
    associatedNode: number | null
}

export interface IDragItem {
    type: string,
    id: DragItemID,
    isNodeExecuting?: boolean,
    attrs: Attributes
}

export interface ContainerLayout extends IDragItem {
    type: "container",
}

export interface WidgetLayout extends IDragItem {
    type: "widget",
    nodeId: number,
    widgetName: string
}

type DragItemID = string;

type LayoutStateOps = {
    addContainer: (parentId: DragItemID, attrs: Partial<Attributes>) => ContainerLayout,
    findDefaultContainerForInsertion: () => ContainerLayout | null,
    addWidget: (parentId: DragItemID, node: LGraphNode, widget: IWidget<any, any>, attrs: Partial<Attributes>) => WidgetLayout,
    updateChildren: (parent: IDragItem, children: IDragItem[]) => IDragItem[],
    nodeAdded: (node: LGraphNode) => void,
    nodeRemoved: (node: LGraphNode) => void,
    clear: () => void,
    resetLayout: () => void,
}

export type WritableLayoutStateStore = Writable<LayoutState> & LayoutStateOps;
const store: Writable<LayoutState> = writable({
    root: null,
    allItems: [],
    currentId: 0,
    currentSelection: []
})

function findDefaultContainerForInsertion(): ContainerLayout | null {
    const state = get(store);

    if (state.root === null) {
        // Should never happen
        throw "Root container was null!";
    }

    if (state.root.type === "container") {
        const container = state.root as ContainerLayout;
        const children: IDragItem[] = state.allItems[container.id]?.children || []
        const found = children.find((di) =>  di.type === "container" )
        if (found && found.type === "container")
            return found as ContainerLayout;
        return container;
    }

    return null
}

function addContainer(parentId: DragItemID | null, attrs: Partial<Attributes> = {}): ContainerLayout {
    const state = get(store);
    const dragItem: ContainerLayout = {
        type: "container",
        id: `${state.currentId++}`,
        attrs: {
            title: "Container",
            showTitle: true,
            direction: "vertical",
            classes: "",
            associatedNode: null,
            ...attrs
        }
    }
    const parent = parentId ? state.allItems[parentId] : null;
    const entry: DragItemEntry = { dragItem, children: [], parent: parent?.dragItem };
    state.allItems[dragItem.id] = entry;
    if (parent) {
        parent.children ||= []
        parent.children.push(dragItem)
    }
    store.set(state)
    return dragItem;
}

function addWidget(parentId: DragItemID, node: LGraphNode, widget: IWidget<any, any>, attrs: Partial<Attributes> = {}): WidgetLayout {
    const state = get(store);
    const dragItem: WidgetLayout = {
        type: "widget",
        id: `${state.currentId++}`,
        nodeId: node.id,
        widgetName: widget.name, // TODO name and displayName
        attrs: {
            title: widget.name,
            showTitle: true,
            direction: "horizontal",
            classes: "",
            associatedNode: null,
            ...attrs
        }
    }
    const parent = state.allItems[parentId]
    const entry: DragItemEntry = { dragItem, children: [], parent: parent.dragItem };
    state.allItems[dragItem.id] = entry;
    parent.children ||= []
    parent.children.push(dragItem)
    store.set(state)
    return dragItem;
}

function updateChildren(parent: IDragItem, children: IDragItem[]): IDragItem[] {
    const state = get(store);
    state.allItems[parent.id].children = children;
    for (const child of children) {
        if (child.id === SHADOW_PLACEHOLDER_ITEM_ID)
            continue;
        state.allItems[child.id].parent = parent;
    }
    store.set(state)
    return children
}

function nodeAdded(node: LGraphNode) {
    const parent = findDefaultContainerForInsertion();
    // Add default node panel containing all widgets
    if (node.widgets && node.widgets.length > 0) {
        const container = addContainer(parent.id, { title: node.title, direction: "vertical", associatedNode: node.id });
        for (const widget of node.widgets) {
            addWidget(container.id, node, widget, { associatedNode: node.id });
        }
    }
}

function removeEntry(state: LayoutState, id: DragItemID) {
    const entry = state.allItems[id]
    if (entry.children && entry.children.length > 0) {
        console.error(entry)
        throw `Tried removing entry ${id} but it still had children!`
    }
    const parent = entry.parent;
    if (parent) {
        const parentEntry = state.allItems[parent.id];
        parentEntry.children = parentEntry.children.filter(item => item.id !== id)
    }
    delete state.allItems[id]
}

function nodeRemoved(node: LGraphNode) {
    const state = get(store)

    // Remove widgets bound to the node
    let del = Object.entries(state.allItems).filter(pair =>
        pair[1].dragItem.type === "widget"
        && pair[1].dragItem.attrs.associatedNode === node.id)
    for (const id in del) {
        console.debug("[layoutState] Remove widget", id, state.allItems[id])
        removeEntry(state, id)
    }

    const isAssociatedContainer = (dragItem: IDragItem) =>
        dragItem.type === "container"
        && dragItem.attrs.associatedNode === node.id;

    let delContainers = []

    // Remove widget from all children lists
    for (const entry of Object.values(state.allItems)) {
        if (entry.children?.length === 0 && isAssociatedContainer(entry.dragItem))
            delContainers.push(entry.dragItem.id)
    }

    // Remove empty containers bound to the node
    for (const id in delContainers) {
        console.debug("[layoutState] Remove container", id, state.allItems[id])
        removeEntry(state, id)
    }

    store.set(state)
}

function clear() {
}

function resetLayout() {
    // TODO
}

const uiStateStore: WritableLayoutStateStore =
{
    ...store,
    addContainer,
    addWidget,
    findDefaultContainerForInsertion,
    updateChildren,
    nodeAdded,
    nodeRemoved,
    clear,
    resetLayout
}
export default uiStateStore;
