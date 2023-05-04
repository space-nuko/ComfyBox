import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type ComfyApp from "$lib/components/ComfyApp"
import type { LGraphNode, IWidget, LGraph } from "@litegraph-ts/core"
import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';
import type { ComfyWidgetNode } from '$lib/nodes';

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
    }
];
export { ALL_ATTRIBUTES };

export type Attributes = {
    direction: string,
    title: string,
    showTitle: boolean,
    classes: string
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
    node: ComfyWidgetNode
}

type DragItemID = string;

type LayoutStateOps = {
    addContainer: (parent: ContainerLayout | null, attrs: Partial<Attributes>, index: number) => ContainerLayout,
    addWidget: (parent: ContainerLayout, node: ComfyWidgetNode, attrs: Partial<Attributes>, index: number) => WidgetLayout,
    findDefaultContainerForInsertion: () => ContainerLayout | null,
    updateChildren: (parent: IDragItem, children: IDragItem[]) => IDragItem[],
    nodeAdded: (node: LGraphNode) => void,
    nodeRemoved: (node: LGraphNode) => void,
    configureFinished: (graph: LGraph) => void,
    groupItems: (dragItems: IDragItem[]) => ContainerLayout,
    ungroup: (container: ContainerLayout) => void,
    getCurrentSelection: () => IDragItem[],
    findLayoutForNode: (nodeId: number) => IDragItem | null;
    clear: (state?: Partial<LayoutState>) => void,
    serialize(): SerializedLayoutState,
    resetLayout: () => void,
}

export type WritableLayoutStateStore = Writable<LayoutState> & LayoutStateOps;
const store: Writable<LayoutState> = writable({
    root: null,
    allItems: {},
    currentId: 0,
    currentSelection: [],
    isMenuOpen: false,
    isConfiguring: true
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
        const found = children.find((di) => di.type === "container")
        if (found && found.type === "container")
            return found as ContainerLayout;
        return container;
    }

    return null
}

function addContainer(parent: ContainerLayout | null, attrs: Partial<Attributes> = {}, index: number = -1): ContainerLayout {
    const state = get(store);
    const dragItem: ContainerLayout = {
        type: "container",
        id: `${state.currentId++}`,
        attrs: {
            title: "Container",
            showTitle: true,
            direction: "vertical",
            classes: "",
            ...attrs
        }
    }
    const entry: DragItemEntry = { dragItem, children: [], parent: null };
    state.allItems[dragItem.id] = entry;
    if (parent) {
        moveItem(dragItem, parent)
    }
    store.set(state)
    return dragItem;
}

function addWidget(parent: ContainerLayout, node: ComfyWidgetNode, attrs: Partial<Attributes> = {}, index: number = -1): WidgetLayout {
    const state = get(store);
    const widgetName = "Widget"
    const dragItem: WidgetLayout = {
        type: "widget",
        id: `${state.currentId++}`,
        node: node,
        attrs: {
            title: widgetName,
            showTitle: true,
            direction: "horizontal",
            classes: "",
            ...attrs
        }
    }
    const parentEntry = state.allItems[parent.id]
    const entry: DragItemEntry = { dragItem, children: [], parent: null };
    state.allItems[dragItem.id] = entry;
    moveItem(dragItem, parent)
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

    // Two cases where we want to add nodes:
    // 1. User adds a new UI node, so we should instantiate its widget in the frontend.
    // 2. User adds a node with inputs that can be filled by frontend widgets.
    // Depending on config, this means we should instantiate default UI nodes connected to those inputs.

    console.debug(node)
    if ("svelteComponentType" in node) {
        addWidget(parent, node as ComfyWidgetNode);
    }

    // Add default node panel with all widgets autoinstantiated
    // if (node.widgets && node.widgets.length > 0) {
    //     const container = addContainer(parent.id, { title: node.title, direction: "vertical", associatedNode: node.id });
    //     for (const widget of node.widgets) {
    //         addWidget(container.id, node, widget, { associatedNode: node.id });
    //     }
    // }
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

    let del = Object.entries(state.allItems).filter(pair =>
        pair[1].dragItem.type === "widget"
        && (pair[1].dragItem as WidgetLayout).node.id === node.id)

    for (const pair of del) {
        const [id, dragItem] = pair;
        removeEntry(state, id)
    }

    store.set(state)
}

function configureFinished(graph: LGraph) {
    const id = 0;

    clear({ isConfiguring: false })

    const root = addContainer(null, { direction: "horizontal", showTitle: false });
    const left = addContainer(root, { direction: "vertical", showTitle: false });
    const right = addContainer(root, { direction: "vertical", showTitle: false });

    const state = get(store)
    state.root = root;
    store.set(state)

    console.debug("[layoutState] configure begin", state, graph)

    for (const node of graph._nodes) {
        nodeAdded(node)
    }

    console.debug("[layoutState] configureFinished", state)
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

    const container = addContainer(parent as ContainerLayout, { title: "Group" }, index)

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

function findLayoutForNode(nodeId: number): WidgetLayout | null {
    const state = get(store)
    const found = Object.entries(state.allItems).find(pair =>
        pair[1].dragItem.type === "widget"
        && (pair[1].dragItem as WidgetLayout).node.id === nodeId)
    if (found)
        return found[1].dragItem as WidgetLayout
    return null;
}

function clear(state: Partial<LayoutState> = {}) {
    store.set({
        root: null,
        allItems: {},
        currentId: 0,
        currentSelection: [],
        isMenuOpen: false,
        isConfiguring: true,
        ...state
    })
}

function resetLayout() {
    // TODO
}

export type SerializedLayoutState = {
    root: DragItemID | null,
    allItems: Record<DragItemID, SerializedDragEntry>,
    currentId: number,
}

export type SerializedDragEntry = {
    dragItem: SerializedDragItem,
    children: DragItemID[],
    parent: DragItemID | null
}

export type SerializedDragItem = {
    type: string,
    id: DragItemID,
    nodeId: number | null,
    attrs: Attributes
}

function serialize(): SerializedLayoutState {
    const state = get(store)

    const allItems: Record<DragItemID, SerializedDragEntry> = {}
    for (const pair of Object.entries(state.allItems)) {
        const [id, entry] = pair;
        allItems[id] = {
            dragItem: {
                type: entry.dragItem.type,
                id: entry.dragItem.id,
                nodeId: (entry.dragItem as any).node?.id,
                attrs: entry.dragItem.attrs
            },
            children: entry.children.map((di) => di.id),
            parent: entry.parent?.id
        }
    }

    return {
        root: state.root?.id,
        allItems,
        currentId: state.currentId,
    }
}

// function deserialize(data: any): LayoutState {

// }

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
    findLayoutForNode,
    ungroup,
    clear,
    resetLayout,
    serialize,
    // deserialize
}
export default layoutStateStore;
