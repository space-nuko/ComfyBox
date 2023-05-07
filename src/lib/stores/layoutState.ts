import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type ComfyApp from "$lib/components/ComfyApp"
import type { LGraphNode, IWidget, LGraph } from "@litegraph-ts/core"
import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';
import type { ComfyWidgetNode } from '$lib/nodes';

type DragItemEntry = {
    /*
     * Drag item.
     */
    dragItem: IDragItem,

    /*
     * Children of this drag item.
     * Only applies if the drag item's type is "container"
     */
    children: IDragItem[] | null,

    /*
     * Parent of this drag item.
     */
    parent: IDragItem | null
}

/*
 * Global workflow attributes
 */
export type LayoutAttributes = {
    /*
     * Default subgraph to run when the "Queue Prompt" button in the bottom bar
     * is pressed.
     *
     * If it's an empty string, all backend nodes will be included in the prompt
     * instead.
     */
    defaultSubgraph: string
}

/*
 * Keeps track of the tree of UI components - widgets and the containers that
 * group them together.
 */
export type LayoutState = {
    /*
     * Root of the UI tree
     */
    root: IDragItem | null,

    /*
     * All items indexed by their own ID
     */
    allItems: Record<DragItemID, DragItemEntry>,

    /*
     * Items indexed by the litegraph node they're bound to
     * Only contains drag items of type "widget"
     */
    allItemsByNode: Record<number, DragItemEntry>,

    /*
     * Next ID to use for instantiating a new drag item
     */
    currentId: number,

    /*
     * Selected drag items.
     */
    currentSelection: DragItemID[],

    /*
     * Selected LGraphNodes inside the litegraph canvas.
     */
    currentSelectionNodes: LGraphNode[],

    /*
     * If true, a saved workflow is being deserialized, so ignore any
     * nodeAdded/nodeRemoved events.
     *
     * TODO: instead use LGraphAddNodeOptions.addedByDeserialize
     */
    isConfiguring: boolean,

    /*
     * If true, the right-click context menu is open
     */
    isMenuOpen: boolean,

    /*
     * Global workflow attributes
     */
    attrs: LayoutAttributes
}

/**
 * Attributes for both containers and nodes.
 **/
export type Attributes = {
    /*
     * Flex direction for containers.
     */
    direction: "horizontal" | "vertical",

    /*
     * Display name of this item.
     */
    title: string,

    /*
     * List of classes to apply to the component.
     */
    classes: string,

    /*
     * Variant for containers. "hidden" hides margin/borders.
     */
    containerVariant?: "block" | "hidden",

    /*
     * If true, don't show this component in the UI
     */
    hidden?: boolean,

    /*
     * If true, grey out this component in the UI
     */
    disabled?: boolean,

    /*
     * CSS height
     */
    height?: string,

    /*
     * CSS Flex grow
     */
    flexGrow?: number,

    /**
     * Display variant for widgets/containers (e.g. number widget can act as slider/knob/dial)
     * Valid values depend on the widget in question.
     */
    variant?: string,

    /*********************************************/
    /* Special attributes for widgets/containers */
    /*********************************************/

    // Accordion
    openOnStartup?: boolean

    // Button
    buttonVariant?: "primary" | "secondary",
    buttonSize?: "large" | "small"
}

export type AttributesSpec = {
    /*
     * ID necessary for svelte's keyed each, autoset at the top level in this source file.
     */
    id?: number,

    /*
     * Attribute name. Corresponds to the name of the instance variable in the
     * hashmap/class instance, which depends on `location`.
     */
    name: string,

    /*
     * Type of this attribute.
     * If you want to support a custom type, use "string" combined with
     * `serialize` and `deserialize`.
     */
    type: "string" | "enum" | "number" | "boolean",

    /*
     * Location of this attribute.
     * - "widget":    inside IDragNode.attrs
     * - "nodeProps": inside LGraphNode.properties
     * - "nodeVars":  an instance variable directly on an LGraphNode
     * - "workflow":  inside $layoutState.attrs
     */
    location: "widget" | "nodeProps" | "nodeVars" | "workflow"

    /*
     * Can this attribute be edited in the properties pane.
     */
    editable: boolean,

    /*
     * Default value to supply to this attribute if it is null when the properties pane is opened.
     * NOTE: This means that any attribute can't have a default null value!
     */
    defaultValue: any,

    /*
     * If `type` is "enum", the valid values for the combo widget.
     */
    values?: string[],

    /*
     * If `type` is "number", step for the slider
     */
    step?: number,

    /*
     * If `type` is "number", min for the slider
     */
    min?: number,

    /*
     * If `type` is "number", max for the slider
     */
    max?: number,

    /*
     * Valid `LGraphNode.type`s this property applies to if it's located in a node.
     * These are like "ui/button", "ui/slider".
     */
    validNodeTypes?: string[],

    /*
     * Callback: if false, don't show the property in the pane.
     * Useful if you need to show the property based on another property.
     * Example: If the IDragItem is a container (not a widget), show its flex `direction`.
     */
    canShow?: (arg: IDragItem | LGraphNode) => boolean,

    /*
     * If the type of this spec is "string", but the underlying type is something else,
     * convert the value to a string here so it can be edited in the textbox.
     */
    serialize?: (arg: any) => string,

    /*
     * If the type of this spec is "string", but the underlying type is something else,
     * convert the textbox value into the underlying value.
     */
    deserialize?: (arg: string) => any,

    /*
     * If true, when this property is changed the properties pane will be rebuilt.
     * This should be used if there's a canShow dependent on this property so
     * the pane can be updated with the new list of valid properties.
     */
    refreshPanelOnChange?: boolean
}

/*
 * A list of `AttributesSpec`s grouped under a category.
 */
export type AttributesCategorySpec = {
    categoryName: string,
    specs: AttributesSpec[]
}

export type AttributesSpecList = AttributesCategorySpec[]

const serializeStringArray = (arg: string[]) => arg.join(",")
const deserializeStringArray = (arg: string) => {
    if (arg === "")
        return []
    return arg.split(",").map(s => s.trim())
}

/*
 * Attributes that will show up in the properties panel.
 * Their order in the list is the order they'll appear in the panel.
 */
const ALL_ATTRIBUTES: AttributesSpecList = [
    {
        categoryName: "appearance",
        specs: [
            {
                name: "title",
                type: "string",
                location: "widget",
                defaultValue: "",
                editable: true,
            },
            {
                name: "hidden",
                type: "boolean",
                location: "widget",
                defaultValue: false,
                editable: true
            },
            {
                name: "disabled",
                type: "boolean",
                location: "widget",
                defaultValue: false,
                editable: true
            },
            {
                name: "direction",
                type: "enum",
                location: "widget",
                editable: true,
                values: ["horizontal", "vertical"],
                defaultValue: "vertical",
                canShow: (di: IDragItem) => di.type === "container"
            },
            {
                name: "flexGrow",
                type: "number",
                location: "widget",
                defaultValue: 100,
                editable: true
            },
            {
                name: "classes",
                type: "string",
                location: "widget",
                defaultValue: "",
                editable: true,
            },

            // Container variants
            {
                name: "variant",
                type: "enum",
                location: "widget",
                editable: true,
                values: ["block", "accordion", "tabs"],
                defaultValue: "block",
                canShow: (di: IDragItem) => di.type === "container",
                refreshPanelOnChange: true
            },
            {
                name: "containerVariant",
                type: "enum",
                location: "widget",
                editable: true,
                values: ["block", "hidden"],
                defaultValue: "block",
                canShow: (di: IDragItem) => di.type === "container"
            },

            // Accordion
            {
                name: "openOnStartup",
                type: "boolean",
                location: "widget",
                editable: true,
                defaultValue: false,
                canShow: (di: IDragItem) => di.type === "container" && di.attrs.variant === "accordion"
            },

            // Button
            {
                name: "buttonVariant",
                type: "enum",
                location: "widget",
                editable: true,
                validNodeTypes: ["ui/button"],
                values: ["primary", "secondary"],
                defaultValue: "primary"
            },
            {
                name: "buttonSize",
                type: "enum",
                location: "widget",
                editable: true,
                validNodeTypes: ["ui/button"],
                values: ["large", "small"],
                defaultValue: "large"
            },
        ]
    },
    {
        categoryName: "behavior",
        specs: [
            // Node variables
            {
                name: "tags",
                type: "string",
                location: "nodeVars",
                editable: true,
                defaultValue: [],
                serialize: serializeStringArray,
                deserialize: deserializeStringArray
            },
            {
                name: "saveUserState",
                type: "boolean",
                location: "nodeVars",
                editable: true,
                defaultValue: true,
            },

            // Range
            {
                name: "min",
                type: "number",
                location: "nodeProps",
                editable: true,
                defaultValue: 0,
                min: -2 ^ 16,
                max: 2 ^ 16,
                validNodeTypes: ["ui/slider"],
            },
            {
                name: "max",
                type: "number",
                location: "nodeProps",
                editable: true,
                defaultValue: 10,
                min: -2 ^ 16,
                max: 2 ^ 16,
                validNodeTypes: ["ui/slider"],
            },
            {
                name: "step",
                type: "number",
                location: "nodeProps",
                editable: true,
                defaultValue: 1,
                min: -2 ^ 16,
                max: 2 ^ 16,
                validNodeTypes: ["ui/slider"],
            },

            // Button
            {
                name: "param",
                type: "string",
                location: "nodeProps",
                editable: true,
                validNodeTypes: ["ui/button"],
                defaultValue: "bang"
            },

            // gallery
            {
                name: "updateMode",
                type: "enum",
                location: "nodeProps",
                editable: true,
                validNodeTypes: ["ui/gallery"],
                values: ["replace", "append"],
                defaultValue: "replace"
            },

            // Workflow
            {
                name: "defaultSubgraph",
                type: "string",
                location: "workflow",
                editable: true,
                defaultValue: ""
            }
        ]
    }
];

// This is needed so the specs can be iterated with svelte's keyed #each.
let i = 0;
for (const cat of Object.values(ALL_ATTRIBUTES)) {
    for (const val of Object.values(cat.specs)) {
        val.id = i;
        i += 1;
    }
}

export { ALL_ATTRIBUTES };

/*
 * Something that can be dragged around in the frontend - a widget or a container.
 */
export interface IDragItem {
    /*
     * Type of the item.
     */
    type: "container" | "widget",

    /*
     * Unique ID of the item.
     */
    id: DragItemID,

    /*
     * If true, the node associated with this drag item is executing.
     * Used to show an indicator on the widget/container.
     */
    isNodeExecuting?: boolean,

    /*
     * Attributes for this drag item.
     */
    attrs: Attributes,

    /*
     * Hackish thing to indicate to Svelte that an attribute changed.
     * TODO Use Writeable<Attributes> instead!
     */
    attrsChanged: Writable<boolean>
}

/*
 * A container (block, accordion, tabs). Has child drag items.
 */
export interface ContainerLayout extends IDragItem {
    type: "container",
}

/*
 * A widget (slider, dropdown, textbox...)
 */
export interface WidgetLayout extends IDragItem {
    type: "widget",

    /*
     * litegraph node this widget is bound to.
     */
    node: ComfyWidgetNode
}

type DragItemID = string;

type LayoutStateOps = {
    addContainer: (parent: ContainerLayout | null, attrs: Partial<Attributes>, index?: number) => ContainerLayout,
    addWidget: (parent: ContainerLayout, node: ComfyWidgetNode, attrs: Partial<Attributes>, index?: number) => WidgetLayout,
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
    currentSelectionNodes: [],
    isMenuOpen: false,
    isConfiguring: true,
    attrs: {
        defaultSubgraph: ""
    }
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

function addContainer(parent: ContainerLayout | null, attrs: Partial<Attributes> = {}, index?: number): ContainerLayout {
    const state = get(store);
    const dragItem: ContainerLayout = {
        type: "container",
        id: `${state.currentId++}`,
        attrsChanged: writable(false),
        attrs: {
            title: "Container",
            direction: "vertical",
            classes: "",
            containerVariant: "block",
            flexGrow: 100,
            ...attrs
        }
    }
    const entry: DragItemEntry = { dragItem, children: [], parent: null };
    state.allItems[dragItem.id] = entry;
    if (parent) {
        moveItem(dragItem, parent, index)
    }
    console.debug("[layoutState] addContainer", state)
    store.set(state)
    return dragItem;
}

function addWidget(parent: ContainerLayout, node: ComfyWidgetNode, attrs: Partial<Attributes> = {}, index?: number): WidgetLayout {
    const state = get(store);
    const widgetName = "Widget"
    const dragItem: WidgetLayout = {
        type: "widget",
        id: `${state.currentId++}`,
        node: node,
        attrsChanged: writable(false),
        attrs: {
            title: widgetName,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            ...attrs
        }
    }
    const parentEntry = state.allItems[parent.id]
    const entry: DragItemEntry = { dragItem, children: [], parent: null };
    state.allItems[dragItem.id] = entry;
    state.allItemsByNode[node.id] = entry;
    console.debug("[layoutState] addWidget", state)
    moveItem(dragItem, parent, index)
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

    console.debug("[layoutState] nodeAdded", node)
    if ("svelteComponentType" in node) {
        addWidget(parent, node as ComfyWidgetNode);
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

function moveItem(target: IDragItem, to: ContainerLayout, index?: number) {
    const state = get(store)
    const entry = state.allItems[target.id]
    if (entry.parent && entry.parent.id === to.id)
        return;

    if (entry.parent) {
        const parentEntry = state.allItems[entry.parent.id];
        const parentIndex = parentEntry.children.findIndex(c => c.id === target.id)
        if (parentIndex !== -1) {
            parentEntry.children.splice(parentIndex, 1)
        }
        else {
            console.error(parentEntry)
            console.error(target)
            throw "Child not found in parent!"
        }
    }

    const toEntry = state.allItems[to.id];
    if (index != null && index >= 0)
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
        allItemsByNode: {},
        currentId: 0,
        currentSelection: [],
        currentSelectionNodes: [],
        isMenuOpen: false,
        isConfiguring: false,
        attrs: {
            defaultSubgraph: ""
        }
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
    attrs: LayoutAttributes
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
        attrs: state.attrs
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
        currentSelectionNodes: [],
        isMenuOpen: false,
        isConfiguring: false,
        attrs: data.attrs
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
