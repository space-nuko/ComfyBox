import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type ComfyApp from "$lib/components/ComfyApp"
import type { LGraphNode, IWidget, LGraph } from "@litegraph-ts/core"
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
    currentSelection: DragItemID[],
    isConfiguring: boolean,
    isMenuOpen: boolean
}

export type AttributesSpec = {
    name: string,
    type: string,
    editable: boolean
}

export type AttributesCategorySpec = {
    categoryName: string,
    specs: AttributesSpec[]
}

export type AttributesSpecList = AttributesCategorySpec[]

const ALL_ATTRIBUTES: AttributesSpecList = [
    {
        categoryName: "appearance",
        specs: [
            {
                name: "title",
                type: "string",
                editable: true,
            },
            {
                name: "showTitle",
                type: "boolean",
                editable: true,
            },
            {
                name: "direction",
                type: "string",
                editable: true,
            },
            {
                name: "classes",
                type: "string",
                editable: true,
            },
        ]
    },
    {
        categoryName: "behavior",
        specs: [
            {
                name: "associatedNode",
                type: "number",
                editable: false,
            },
        ]
    }
];
export { ALL_ATTRIBUTES };

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
    addContainer: (parentId: DragItemID, attrs: Partial<Attributes>, index: number) => ContainerLayout,
    addWidget: (parentId: DragItemID, node: LGraphNode, widget: IWidget<any, any>, attrs: Partial<Attributes>, index: number) => WidgetLayout,
    findDefaultContainerForInsertion: () => ContainerLayout | null,
    updateChildren: (parent: IDragItem, children: IDragItem[]) => IDragItem[],
    nodeAdded: (node: LGraphNode) => void,
    nodeRemoved: (node: LGraphNode) => void,
    configureFinished: (graph: LGraph) => void,
    groupItems: (dragItems: IDragItem[]) => ContainerLayout,
    ungroup: (container: ContainerLayout) => void,
    getCurrentSelection: () => IDragItem[],
    clear: () => void,
    resetLayout: () => void,
}

export type WritableLayoutStateStore = Writable<LayoutState> & LayoutStateOps;
const store: Writable<LayoutState> = writable({
    root: null,
    allItems: {},
    currentId: 0,
    currentSelection: [],
    isMenuOpen: false
})
addContainer(null, { direction: "horizontal", showTitle: false });

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

function addContainer(parentId: DragItemID | null, attrs: Partial<Attributes> = {}, index: number = -1): ContainerLayout {
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
        if (index)
            parent.children.splice(index, 0, dragItem)
        else
            parent.children.push(dragItem)
    }
    store.set(state)
    return dragItem;
}

function addWidget(parentId: DragItemID, node: LGraphNode, widget: IWidget<any, any>, attrs: Partial<Attributes> = {}, index: number = -1): WidgetLayout {
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
    if (index !== -1)
        parent.children.splice(index, 0, dragItem)
    else
        parent.children.push(dragItem)
    store.set(state)
    return dragItem;
}

function updateChildren(parent: IDragItem, newChildren?: IDragItem[]): IDragItem[] {
    const state = get(store);
    if (newChildren)
        state.allItems[parent.id].children = newChildren;
    for (const child of state.allItems[parent.id].children) {
        if (child.id === SHADOW_PLACEHOLDER_ITEM_ID)
            continue;
        state.allItems[child.id].parent = parent;
    }
    store.set(state)
    return state.allItems[parent.id].children
}

function nodeAdded(node: LGraphNode) {
    const state = get(store)
    if (state.isConfiguring)
        return;

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

    console.debug("[layoutState] nodeRemoved", node)

    // Remove widgets bound to the node
    let del = Object.entries(state.allItems).filter(pair =>
        pair[1].dragItem.type === "widget"
        && pair[1].dragItem.attrs.associatedNode === node.id)
    for (const item of del) {
        const [id, dragItem] = item;
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
    for (const id of delContainers) {
        console.debug("[layoutState] Remove container", id, state.allItems[id])
        removeEntry(state, id)
    }

    store.set(state)
}

function configureFinished(graph: LGraph) {
    const state = get(store)
    const id = 0;

    state.isConfiguring = false;

    state.root = addContainer(null, { direction: "horizontal", showTitle: false });
    const left = addContainer(state.root.id, { direction: "vertical", showTitle: false });
    const right = addContainer(state.root.id, { direction: "vertical", showTitle: false });

    for (const node of graph.computeExecutionOrder(false, null)) {
        nodeAdded(node)
    }

    console.debug("[layoutState] configureFinished", state)
    store.set(state)
}

function moveItem(target: IDragItem, to: ContainerLayout, index: number = -1) {
    const state = get(store)
    const entry = state.allItems[target.id]
    if (entry.parent && entry.parent.id === to.id)
        return;

    if (entry.parent) {
        const parentEntry = state.allItems[entry.parent.id];
        const index = parentEntry.children.indexOf(target)
        if (index !== -1) {
            parentEntry.children.splice(index, 1)
        }
        else {
            console.error(parentEntry)
            console.error(target)
            throw "Child not found in parent!"
        }
    }

    const toEntry = state.allItems[to.id];
    if (index !== -1)
        toEntry.children.splice(index, 0, target)
    else
        toEntry.children.push(target)
    state.allItems[target.id].parent = toEntry.dragItem;

    console.debug("[layoutState] Move child", target, toEntry, index)

    store.set(state)
}

function getCurrentSelection(): IDragItem[] {
    const state = get(store)
    return state.currentSelection.map(id => state.allItems[id].dragItem)
}

function groupItems(dragItems: IDragItem[]): ContainerLayout {
    if (dragItems.length === 0)
        return;

    const state = get(store)
    const parent = state.allItems[dragItems[0].id].parent || findDefaultContainerForInsertion();

    if (parent === null || parent.type !== "container")
        return;

    let index = undefined;
    if (parent) {
        const indexFound = state.allItems[parent.id].children.indexOf(dragItems[0])
        if (indexFound !== -1)
            index = indexFound
    }

    const container = addContainer(parent.id, { title: "Group" }, index)

    for (const item of dragItems) {
        moveItem(item, container)
    }

    store.set(state)
    return container
}

function ungroup(container: ContainerLayout) {
    const state = get(store)

    const parent = state.allItems[container.id].parent;
    if (!parent || parent.type !== "container") {
        console.warn("No parent to ungroup into!", container)
        return;
    }

    let index = undefined;
    const parentChildren = state.allItems[parent.id].children;
    const indexFound = parentChildren.indexOf(container)
    if (indexFound !== -1)
        index = indexFound

    const containerEntry = state.allItems[container.id]
    console.debug("[layoutState] About to ungroup", containerEntry, parent, parentChildren, index)

    const children = [...containerEntry.children]
    for (const item of children) {
        moveItem(item, parent as ContainerLayout, index)
    }

    removeEntry(state, container.id)

    console.debug("[layoutState] Ungrouped", containerEntry, parent, parentChildren, index)

    store.set(state)
}

function clear() {
    store.set({
        root: null,
        allItems: {},
        currentId: 0,
        currentSelection: [],
        isMenuOpen: false,
        isConfiguring: true,
    })
    addContainer(null, { direction: "horizontal", showTitle: false });
}

function resetLayout() {
    // TODO
}

const layoutStateStore: WritableLayoutStateStore =
{
    ...store,
    addContainer,
    addWidget,
    findDefaultContainerForInsertion,
    updateChildren,
    nodeAdded,
    nodeRemoved,
    configureFinished,
    getCurrentSelection,
    groupItems,
    ungroup,
    clear,
    resetLayout
}
export default layoutStateStore;
