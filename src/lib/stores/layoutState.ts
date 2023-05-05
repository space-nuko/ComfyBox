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
    allItemsByNode: Record<number, DragItemEntry>,
    currentId: number,
    currentSelection: DragItemID[],
    isConfiguring: boolean,
    isMenuOpen: boolean
}

export type AttributesSpec = {
    name: string,
    type: string,
    location: "widget" | "nodeProps"
    editable: boolean,

    values?: string[],
    hidden?: boolean
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
                location: "widget",
                editable: true,
            },
            {
                name: "hidden",
                type: "boolean",
                location: "widget",
                editable: true
            },
            {
                name: "direction",
                type: "enum",
                location: "widget",
                editable: true,
                values: ["horizontal", "vertical"]
            },
            {
                name: "classes",
                type: "string",
                location: "widget",
                editable: true,
            },
            {
                name: "blockVariant",
                type: "enum",
                location: "widget",
                editable: true,
                values: ["block", "hidden"]
            },
        ]
    },
    {
        categoryName: "behavior",
        specs: [
            {
                name: "min",
                type: "number",
                location: "nodeProps",
                editable: true,
            },
            {
                name: "max",
                type: "number",
                location: "nodeProps",
                editable: true
            },
            {
                name: "step",
                type: "number",
                location: "nodeProps",
                editable: true,
            },
        ]
    }
];
export { ALL_ATTRIBUTES };

export type Attributes = {
    direction: "horizontal" | "vertical",
    title: string,
    showTitle: boolean,
    classes: string,
    blockVariant?: "block" | "hidden",
    hidden?: boolean
}

export interface IDragItem {
    type: string,
    id: DragItemID,
    isNodeExecuting?: boolean,
    attrs: Attributes,
    attrsChanged: Writable<boolean>
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
    groupItems: (dragItems: IDragItem[], attrs?: Partial<Attributes>) => ContainerLayout,
    ungroup: (container: ContainerLayout) => void,
    getCurrentSelection: () => IDragItem[],
    findLayoutForNode: (nodeId: number) => IDragItem | null;
    serialize: () => SerializedLayoutState,
    deserialize: (data: SerializedLayoutState, graph: LGraph) => void,
    initDefaultLayout: () => void,
    onStartConfigure: () => void
}

export type WritableLayoutStateStore = Writable<LayoutState> & LayoutStateOps;
const store: Writable<LayoutState> = writable({
    root: null,
    allItems: {},
    allItemsByNode: {},
    currentId: 0,
    currentSelection: [],
    isMenuOpen: false,
    isConfiguring: true
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
        attrsChanged: writable(false),
        attrs: {
            title: "Container",
            showTitle: true,
            direction: "vertical",
            classes: "",
            blockVariant: "block",
            ...attrs
        }
    }
    const entry: DragItemEntry = { dragItem, children: [], parent: null };
    state.allItems[dragItem.id] = entry;
    if (parent) {
        moveItem(dragItem, parent)
    }
    console.debug("[layoutState] addContainer", state)
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
        attrsChanged: writable(false),
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
    state.allItemsByNode[node.id] = entry;
    console.debug("[layoutState] addWidget", state)
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
    if (entry.dragItem.type === "widget") {
        const widget = entry.dragItem as WidgetLayout;
        delete state.allItemsByNode[widget.node.id]
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

function moveItem(target: IDragItem, to: ContainerLayout, index: number = -1) {
    const state = get(store)
    const entry = state.allItems[target.id]
    if (entry.parent && entry.parent.id === to.id)
        return;

    if (entry.parent) {
        const parentEntry = state.allItems[entry.parent.id];
        const index = parentEntry.children.findIndex(c => c.id === target.id)
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

function groupItems(dragItems: IDragItem[], attrs: Partial<Attributes> = {}): ContainerLayout {
    if (dragItems.length === 0)
        return;

    const state = get(store)
    const parent = state.allItems[dragItems[0].id].parent || findDefaultContainerForInsertion();

    if (parent === null || parent.type !== "container")
        return;

    let index = undefined;
    if (parent) {
        const indexFound = state.allItems[parent.id].children.findIndex(c => c.id === dragItems[0].id)
        if (indexFound !== -1)
            index = indexFound
    }

    const title = dragItems.length <= 1 ? "" : "Group";

    const container = addContainer(parent as ContainerLayout, { title, ...attrs }, index)

    for (const item of dragItems) {
        moveItem(item, container)
    }

    console.debug("[layoutState] Grouped", container, parent, state.allItems[container.id].children, index)

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
    const indexFound = parentChildren.findIndex(c => c.id === container.id)
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

function initDefaultLayout() {
    store.set({
        root: null,
        allItems: {},
        currentId: 0,
        currentSelection: [],
        isMenuOpen: false,
        isConfiguring: false
    })

    const root = addContainer(null, { direction: "horizontal", title: "" });
    const left = addContainer(root, { direction: "vertical", title: "" });
    const right = addContainer(root, { direction: "vertical", title: "" });

    const state = get(store)
    state.root = root;
    store.set(state)

    console.debug("[layoutState] initDefault", state)
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

function deserialize(data: SerializedLayoutState, graph: LGraph) {
    const allItems: Record<DragItemID, DragItemEntry> = {}
    const allItemsByNode: Record<number, DragItemEntry> = {}
    for (const pair of Object.entries(data.allItems)) {
        const [id, entry] = pair;

        const dragItem: IDragItem = {
            type: entry.dragItem.type,
            id: entry.dragItem.id,
            attrs: entry.dragItem.attrs,
            attrsChanged: writable(false)
        };

        const dragEntry: DragItemEntry = {
            dragItem,
            children: [],
            parent: null
        }

        allItems[id] = dragEntry

        if (dragItem.type === "widget") {
            const widget = dragItem as WidgetLayout;
            widget.node = graph.getNodeById(entry.dragItem.nodeId) as ComfyWidgetNode
            allItemsByNode[entry.dragItem.nodeId] = dragEntry
        }
    }

    // reconnect parent/child tree
    for (const pair of Object.entries(data.allItems)) {
        const [id, entry] = pair;

        for (const childId of entry.children) {
            allItems[id].children.push(allItems[childId].dragItem)
        }
        if (entry.parent) {
            allItems[id].parent = allItems[entry.parent].dragItem;
        }
    }

    let root: IDragItem = null;
    if (data.root)
        root = allItems[data.root].dragItem

    const state: LayoutState = {
        root,
        allItems,
        allItemsByNode,
        currentId: data.currentId,
        currentSelection: [],
        isMenuOpen: false,
        isConfiguring: false
    }

    console.debug("[layoutState] deserialize", data, state)

    store.set(state)
}

function onStartConfigure() {
    store.update(s => {
        s.isConfiguring = true;
        return s
    })
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
    getCurrentSelection,
    groupItems,
    findLayoutForNode,
    ungroup,
    initDefaultLayout,
    onStartConfigure,
    serialize,
    deserialize
}
export default layoutStateStore;
