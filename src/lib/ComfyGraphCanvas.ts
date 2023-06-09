import { BuiltInSlotShape, ContextMenu, LGraphCanvas, LGraphNode, LLink, LiteGraph, NodeMode, Subgraph, TitleMode, type ContextMenuItem, type IContextMenuItem, type MouseEventExt, type NodeID, type Vector2, type Vector4, LGraph, type SlotIndex, type SlotNameOrIndex } from "@litegraph-ts/core";
import { get, type Unsubscriber } from "svelte/store";
import { createTemplate, serializeTemplate, type ComfyBoxTemplate, type SerializedComfyBoxTemplate } from "./ComfyBoxTemplate";
import type ComfyGraph from "./ComfyGraph";
import type { ComfyGraphErrorLocation, ComfyGraphErrors, ComfyNodeErrors } from "./apiErrors";
import type ComfyApp from "./components/ComfyApp";
import { ComfyReroute } from "./nodes";
import notify from "./notify";
import layoutStates, { type ContainerLayout } from "./stores/layoutStates";
import queueState from "./stores/queueState";
import selectionState from "./stores/selectionState";
import templateState from "./stores/templateState";
import { calcNodesBoundingBox } from "./utils";
import interfaceState from "./stores/interfaceState";

export type SerializedGraphCanvasState = {
    offset: Vector2,
    scale: number
}

export default class ComfyGraphCanvas extends LGraphCanvas {
    app: ComfyApp | null;
    private _unsubscribe: Unsubscriber;
    isExportingSVG: boolean = false;
    activeErrors?: ComfyGraphErrors = null;
    blinkError: ComfyGraphErrorLocation | null = null;
    blinkErrorTime: number = 0;
    highlightNodeAndInput: [LGraphNode, number | null] | null = null;

    get comfyGraph(): ComfyGraph | null {
        return this.graph as ComfyGraph;
    }

    clearErrors() {
        this.activeErrors = null;
        this.blinkError = null;
        this.blinkErrorTime = 0;
        this.highlightNodeAndInput = null;
    }

    constructor(
        app: ComfyApp,
        canvas: HTMLCanvasElement | string,
        graph?: ComfyGraph,
        options: {
            skip_render?: boolean;
            skip_events?: boolean;
            autoresize?: boolean;
            viewport?: Vector4;
        } = {}
    ) {
        super(canvas, graph, options);
        this.app = app;
        this._unsubscribe = selectionState.subscribe(ss => {
            for (const node of Object.values(this.selected_nodes)) {
                node.is_selected = false;
            }
            this.selected_nodes = {}
            for (const node of ss.currentSelectionNodes) {
                this.selected_nodes[node.id] = node;
                node.is_selected = true
            }
            this._selectedNodes = new Set()
            this.setDirty(true, true);
        })
    }

    _selectedNodes: Set<NodeID> = new Set();

    serialize(): SerializedGraphCanvasState {
        let offset = this.ds.offset;
        let scale = this.ds.scale;

        // Use top-level graph for saved offset if we're viewing a subgraph
        if (this._graph_stack?.length > 0) {
            offset = this._graph_stack[0].offset;
            scale = this._graph_stack[0].scale;
        }

        return { offset, scale }
    }

    deserialize(data: SerializedGraphCanvasState) {
        this.ds.offset = data.offset;
        this.ds.scale = data.scale;
    }

    recenter() {
        this.ds.reset();
        this.setDirty(true, true)
    }

    override drawNodeShape(
        node: LGraphNode,
        ctx: CanvasRenderingContext2D,
        size: Vector2,
        fgColor: string,
        bgColor: string,
        selected: boolean,
        mouseOver: boolean
    ): void {
        super.drawNodeShape(node, ctx, size, fgColor, bgColor, selected, mouseOver);

        let state = get(queueState);
        let ss = get(selectionState);

        const isExecuting = state.executingNodes.has(node.id);
        const nodeErrors = this.activeErrors?.errorsByID[node.id];
        const isHighlightedNode = this.highlightNodeAndInput && this.highlightNodeAndInput[0].id === node.id;

        if (this.blinkErrorTime > 0) {
            this.blinkErrorTime -= this.graph.elapsed_time;
        }

        let color = null;
        let thickness = 1;
        let blink = false;
        // if (this._selectedNodes.has(node.id)) {
        //     color = "yellow";
        //     thickness = 5;
        // }
        if (nodeErrors) {
            const hasExecutionError = nodeErrors.find(e => e.errorType === "execution");
            if (hasExecutionError) {
                blink = true;
                color = "#f0f";
            }
            else {
                color = "red";
            }
            thickness = 2
        }
        else if (isHighlightedNode) {
            color = "cyan";
            thickness = 2

            // Blink node if no input highlighted
            if (this.highlightNodeAndInput[1] == null) {
                if (this.blinkErrorTime > 0) {
                    if ((Math.floor(this.blinkErrorTime / 2)) % 2 === 0) {
                        color = null;
                    }
                }
            }
        }
        else if (ss.currentHoveredNodes.has(node.id)) {
            color = "lightblue";
        }
        else if (isExecuting) {
            color = "#0f0";
        }

        if (blink) {
            if (nodeErrors && nodeErrors.includes(this.blinkError) && this.blinkErrorTime > 0) {
                if ((Math.floor(this.blinkErrorTime / 2)) % 2 === 0) {
                    color = null;
                }
            }
        }

        if (color) {
            this.drawNodeOutline(node, ctx, size, mouseOver, fgColor, bgColor, color, thickness)
        }

        if (isExecuting && state.progress) {
            ctx.fillStyle = "green";
            ctx.fillRect(0, 0, size[0] * (state.progress.value / state.progress.max), 6);
            ctx.fillStyle = bgColor;
        }

        if (nodeErrors) {
            this.drawFailedValidationInputs(node, nodeErrors, color, ctx);
        }

        if (isHighlightedNode) {
            let draw = true;
            if (this.blinkErrorTime > 0) {
                if ((Math.floor(this.blinkErrorTime / 2)) % 2 === 0) {
                    draw = false;
                }
            }
            if (draw) {
                const [node, inputSlot] = this.highlightNodeAndInput;
                if (inputSlot != null) {
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = color;
                    this.highlightNodeInput(node, inputSlot, ctx);
                }
            }
        }
    }

    private drawFailedValidationInputs(node: LGraphNode, errors: ComfyGraphErrorLocation[], color: string, ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = color || "red";
        for (const errorLocation of errors) {
            if (errorLocation.input != null) {
                if (errorLocation === this.blinkError && this.blinkErrorTime > 0) {
                    if ((Math.floor(this.blinkErrorTime / 2)) % 2 === 0) {
                        continue;
                    }
                }
                this.highlightNodeInput(node, errorLocation.input.name, ctx);
            }
        }
    }

    private static CONNECTION_POS: Vector2 = [0, 0];

    private highlightNodeInput(node: LGraphNode, inputSlot: SlotNameOrIndex, ctx: CanvasRenderingContext2D) {
        let inputIndex: number;
        if (typeof inputSlot === "number")
            inputIndex = inputSlot
        else
            inputIndex = node.findInputSlotIndexByName(inputSlot)
        if (inputIndex !== -1) {
            let pos = node.getConnectionPos(true, inputIndex, ComfyGraphCanvas.CONNECTION_POS);
            ctx.beginPath();
            ctx.arc(pos[0] - node.pos[0], pos[1] - node.pos[1], 12, 0, 2 * Math.PI, false)
            ctx.stroke();
        }
    }

    private drawNodeOutline(node: LGraphNode, ctx: CanvasRenderingContext2D, size: Vector2, mouseOver: boolean, fgColor: string, bgColor: string, outlineColor: string, outlineThickness: number) {
        const shape = node.shape || BuiltInSlotShape.ROUND_SHAPE;

        var render_title = true;
        if (node.titleMode == TitleMode.TRANSPARENT_TITLE || node.titleMode == TitleMode.NO_TITLE) {
            render_title = false;
        } else if (node.titleMode == TitleMode.AUTOHIDE_TITLE && mouseOver) {
            render_title = true;
        }
        const titleHeight = render_title ? LiteGraph.NODE_TITLE_HEIGHT : 0;

        ctx.lineWidth = outlineThickness;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        if (shape == BuiltInSlotShape.BOX_SHAPE)
            ctx.rect(-6, -6 + titleHeight, 12 + size[0] + 1, 12 + size[1] + titleHeight);
        else if (shape == BuiltInSlotShape.ROUND_SHAPE || (shape == BuiltInSlotShape.CARD_SHAPE && node.flags.collapsed))
            ctx.roundRect(
                -6,
                -6 - titleHeight,
                12 + size[0] + 1,
                12 + size[1] + titleHeight,
                this.round_radius * 2
            );
        else if (shape == BuiltInSlotShape.CARD_SHAPE)
            ctx.roundRect(
                -6,
                -6 + titleHeight,
                12 + size[0] + 1,
                12 + size[1] + titleHeight,
                this.round_radius * 2,
                2
            );
        else if (shape == BuiltInSlotShape.CIRCLE_SHAPE)
            ctx.arc(size[0] * 0.5, size[1] * 0.5, size[0] * 0.5 + 6, 0, Math.PI * 2);
        ctx.strokeStyle = outlineColor;
        ctx.stroke();
        ctx.strokeStyle = fgColor;
        ctx.globalAlpha = 1;
    }

    private alignToGrid(node: LGraphNode, ctx: CanvasRenderingContext2D) {
        const x = LiteGraph.CANVAS_GRID_SIZE * Math.round(node.pos[0] / LiteGraph.CANVAS_GRID_SIZE);
        const y = LiteGraph.CANVAS_GRID_SIZE * Math.round(node.pos[1] / LiteGraph.CANVAS_GRID_SIZE);

        const shiftX = x - node.pos[0];
        let shiftY = y - node.pos[1];

        let w, h;
        if (node.flags.collapsed) {
            w = node._collapsed_width;
            h = LiteGraph.NODE_TITLE_HEIGHT;
            shiftY -= LiteGraph.NODE_TITLE_HEIGHT;
        } else {
            w = node.size[0];
            h = node.size[1];
            let titleMode = node.titleMode
            if (titleMode !== TitleMode.TRANSPARENT_TITLE && titleMode !== TitleMode.NO_TITLE) {
                h += LiteGraph.NODE_TITLE_HEIGHT;
                shiftY -= LiteGraph.NODE_TITLE_HEIGHT;
            }
        }
        const f = ctx.fillStyle;
        ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
        ctx.fillRect(shiftX, shiftY, w, h);
        ctx.fillStyle = f;
    }

    override drawNode(node: LGraphNode, ctx: CanvasRenderingContext2D): void {
        if ((window as any)?.app?.shiftDown && this.node_dragged && node.id in this.selected_nodes) {
            this.alignToGrid(node, ctx)
        }

        // Fade out inactive nodes
        var editor_alpha = this.editor_alpha;
        if (node.mode === NodeMode.NEVER) { // never
            this.editor_alpha = 0.4;
        }
        const res = super.drawNode(node, ctx);
        this.editor_alpha = editor_alpha;

        return res;
    }

    override drawGroups(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        if (!this.graph) {
            return;
        }

        var groups = this.graph._groups;

        ctx.save();
        ctx.globalAlpha = 0.7 * this.editor_alpha;

        for (var i = 0; i < groups.length; ++i) {
            var group = groups[i];

            if (!LiteGraph.overlapBounding(this.visible_area, group.bounding)) {
                continue;
            } //out of the visible area

            ctx.fillStyle = group.color || "#335";
            ctx.strokeStyle = group.color || "#335";
            var pos = group.pos;
            var size = group.size;
            ctx.globalAlpha = 0.25 * this.editor_alpha;
            ctx.beginPath();
            var font_size =
                group.fontSize || LiteGraph.DEFAULT_GROUP_FONT_SIZE;
            ctx.rect(pos[0] + 0.5, pos[1] + 0.5, size[0], font_size * 1.4);
            ctx.fill();
            ctx.globalAlpha = this.editor_alpha;
        }

        ctx.restore();

        const res = super.drawGroups(canvas, ctx);
        return res;
    }

    /**
     * Handle keypress
     *
     * Ctrl + M      mute/unmute selected nodes
     * Ctrl + Space  open node searchbox
     */
    override processKey(e: KeyboardEvent): boolean | undefined {
        const res = super.processKey(e);

        if (res === false) {
            return res;
        }

        if (!this.graph) {
            return;
        }

        var block_default = false;

        if ("localName" in e.target && e.target.localName == "input") {
            return;
        }

        if (e.type == "keydown") {
            // Ctrl + M - mute/unmute
            if (e.keyCode == 77 && e.ctrlKey) {
                if (this.selected_nodes) {
                    for (var i in this.selected_nodes) {
                        if (this.selected_nodes[i].mode === 2) { // never
                            this.selected_nodes[i].mode = 0; // always
                        } else {
                            this.selected_nodes[i].mode = 2; // never
                        }
                    }
                }
                block_default = true;
            }
            // Ctrl + Space - open node searchbox
            else if (e.keyCode == 32 && e.ctrlKey) {
                const event = new MouseEvent("click");
                const searchBox = this.showSearchBox(event);
                const rect = this.canvas.getBoundingClientRect();
                const sbRect = searchBox.getBoundingClientRect();
                const clientX = rect.left + rect.width / 2 - sbRect.width / 2;
                const clientY = rect.top + rect.height / 2 - sbRect.height / 2
                searchBox.style.left = `${clientX}px`;
                searchBox.style.top = `${clientY}px`;
                // TODO better API
                event.initMouseEvent("click", true, true, window, 1, clientX, clientY, clientX, clientY, false, false, false, false, 0, null);
                this.adjustMouseEvent(event);
                block_default = true;
            }
        }

        this.graph.change();

        if (block_default) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        return res;
    }

    override onSelectionChange(nodes: Record<number, LGraphNode>) {
        selectionState.update(ss => {
            ss.currentSelectionNodes = Object.values(nodes)
            ss.currentSelection = []
            const layoutState = layoutStates.getLayoutByGraph(this.graph);
            if (layoutState) {
                const ls = get(layoutState)
                for (const node of ss.currentSelectionNodes) {
                    const widget = ls.allItemsByNode[node.id]
                    if (widget)
                        ss.currentSelection.push(widget.dragItem.id)
                }
            }
            return ss
        })
    }

    override onHoverChange(node: LGraphNode | null) {
        selectionState.update(ss => {
            ss.currentHoveredNodes.clear()
            if (node) {
                ss.currentHoveredNodes.add(node.id)
            }
            ss.currentHovered.clear()
            const layoutState = layoutStates.getLayoutByGraph(this.graph);
            if (layoutState) {
                const ls = get(layoutState)
                for (const nodeID of ss.currentHoveredNodes) {
                    const widget = ls.allItemsByNode[nodeID]
                    if (widget)
                        ss.currentHovered.add(widget.dragItem.id)
                }
            }
            return ss
        })
    }

    override clear() {
        super.clear();
        selectionState.update(ss => {
            ss.currentSelectionNodes = [];
            ss.currentHoveredNodes.clear()
            return ss;
        })
    }

    override onNodeMoved(node: LGraphNode) {
        if (super.onNodeMoved)
            super.onNodeMoved(node);

        if ((window as any)?.app?.shiftDown) {
            // Ensure all selected nodes are realigned
            for (const id in this.selected_nodes) {
                this.selected_nodes[id].alignToGrid();
            }
        }
    }

    private reinstantiate(_value: IContextMenuItem, _options, mouseEvent, prevMenu, node?: LGraphNode) {
        if ((node as any).isBackendNode)
            return

        const newNode = LiteGraph.createNode(node.type);

        const createInputReroute = (slotIndex: number, link: LLink | null): ComfyReroute => {
            const reroute = LiteGraph.createNode(ComfyReroute);
            reroute.properties.ignoreTypes = true;
            node.graph.add(reroute)
            const inputPos = node.getConnectionPos(true, slotIndex);
            reroute.pos = [inputPos[0] - 140, inputPos[1] + LiteGraph.NODE_SLOT_HEIGHT / 2];
            node.graph.getNodeById(link.origin_id).connect(link.origin_slot, reroute, 0)
            return reroute
        }

        for (let index = node.inputs.length - 1; index >= 0; index--) {
            let link: LLink | null = null;

            link = node.getInputLink(index);
            node.disconnectInput(index)

            if (link)
                createInputReroute(index, link);

            node.removeInput(index);
        }

        for (let index = 0; index < newNode.inputs.length; index++) {
            const newInput = newNode.inputs[index]
            const input = node.addInput(newInput.name, newInput.type);
        }

        const createOutputReroute = (index: number, links: LLink[], connect: boolean = true): ComfyReroute => {
            const reroute = LiteGraph.createNode(ComfyReroute);
            reroute.properties.ignoreTypes = true;
            node.graph.add(reroute)
            const rerouteSize = reroute.computeSize();
            const outputPos = node.getConnectionPos(false, index);
            reroute.pos = [outputPos[0] + rerouteSize[0] + 20, outputPos[1] + LiteGraph.NODE_SLOT_HEIGHT / 2];
            for (const link of links) {
                reroute.connect(0, node.graph.getNodeById(link.target_id), link.target_slot)
            }
            return reroute
        }

        for (let index = node.outputs.length - 1; index >= 0; index--) {
            let links = node.getOutputLinks(index)
            node.disconnectOutput(index)

            if (links.length > 0)
                createOutputReroute(index, links);

            node.removeOutput(index);
        }

        for (let index = 0; index < newNode.outputs.length; index++) {
            const newOutput = newNode.outputs[index]
            const output = node.addOutput(newOutput.name, newOutput.type);
        }
    }

    private insertReroute(_value: IContextMenuItem, _options, mouseEvent: MouseEventExt, prevMenu?: ContextMenu, link?: LLink) {
        if (link == null)
            return

        const originNode = this.graph.getNodeById(link.origin_id);
        const targetNode = this.graph.getNodeById(link.target_id);

        if (originNode == null || targetNode == null)
            return;

        if (typeof prevMenu?.options?.event?.canvasX === "number")
            mouseEvent = prevMenu.options.event as MouseEventExt;

        const reroute = LiteGraph.createNode(ComfyReroute);
        const size = reroute.computeSize();
        const pos: Vector2 = [mouseEvent.canvasX - size[0] * 0.5, mouseEvent.canvasY - size[1] * 0.5];

        this.graph.removeLink(link.id);
        this.graph.add(reroute, { pos });

        originNode.connect(link.origin_slot, reroute, 0)
        reroute.connect(0, targetNode, link.target_slot);
    }

    private convertToSubgraph(_value: IContextMenuItem, _options, mouseEvent, prevMenu, callback?: (node: LGraphNode) => void) {
        if (Object.keys(this.selected_nodes).length === 0)
            return

        const selected = Object.values(this.selected_nodes).filter(n => n != null);
        this.selected_nodes = {}

        const subgraph = LiteGraph.createNode(Subgraph);
        subgraph.buildFromNodes(selected)

        this.graph.add(subgraph)
    }

    /*
     * Inserts a ComfyBox template. Logic is similar to pasting from the
     * clipboard in vanilla litegraph.
     */
    insertTemplate(template: SerializedComfyBoxTemplate, pos: Vector2, container: ContainerLayout, containerIndex: number): [LGraphNode[], IDragItem] {
        const comfyGraph = this.graph as ComfyGraph;

        let [min_x, min_y, max_x, max_y] = calcNodesBoundingBox(template.nodes);

        const width = max_x - min_x
        const height = max_y - min_y

        pos[0] -= width / 2
        pos[1] -= height / 2

        const layout = comfyGraph.layout;
        if (layout == null) {
            console.error("[ComfyGraphCanvas] graph has no layout!", comfyGraph)
            return;
        }

        // The following operations modify the template in-place, so be sure it's been cloned first
        const cloned = LiteGraph.cloneObject(template)
        const nodeMapping = comfyGraph.insertTemplate(cloned, pos);
        const templateLayoutRoot = layout.insertTemplate(cloned, comfyGraph, nodeMapping, container, containerIndex);

        this.selectNodes(Object.values(nodeMapping).filter(n => n.graph === this.graph));

        return [Object.values(nodeMapping), templateLayoutRoot]
    }

    saveAsTemplate(_value: IContextMenuItem, _options, mouseEvent, prevMenu, node?: LGraphNode) {
        if (!this.selected_nodes || Object.values(this.selected_nodes).length === 0)
            return;

        const result = createTemplate(Object.values(this.selected_nodes));

        if ("error" in result) {
            notify(`Couldn't create template: ${result.error}`, { type: "error", timeout: 5000 });
            return;
        }

        const template = result as ComfyBoxTemplate;

        const serialized = serializeTemplate(this, template);

        try {
            if (templateState.addTemplate(serialized)) {
                notify("Template saved!", { type: "success" })
            }
            else {
                notify("Failed to save template: already exists in LocalStorage", { type: "error" })
            }
        }
        catch (error) {
            // Quota exceeded?
            notify(`Failed to save template: ${error}`, { type: "error", timeout: 10000 })
        }
    }

    override getCanvasMenuOptions(): ContextMenuItem[] {
        const options = super.getCanvasMenuOptions();

        options.push(
            {
                content: "Convert to Subgraph",
                has_submenu: false,
                disabled: Object.keys(this.selected_nodes).length === 0,
                callback: this.convertToSubgraph.bind(this)
            },
        )

        return options
    }

    override getNodeMenuOptions(node: LGraphNode): ContextMenuItem[] {
        const options = super.getNodeMenuOptions(node);

        options.push(
            {
                content: "Reinstantiate",
                has_submenu: false,
                disabled: false,
                callback: this.reinstantiate.bind(this)
            },
        )

        options.push(
            {
                content: "Save as Template",
                has_submenu: false,
                disabled: false,
                callback: this.saveAsTemplate.bind(this)
            },
        )

        return options
    }

    override getLinkMenuOptions(link: LLink): ContextMenuItem[] {
        const options = super.getLinkMenuOptions(link);

        options.push(
            {
                content: "Insert Reroute",
                has_submenu: false,
                disabled: false,
                callback: this.insertReroute.bind(this)
            },
        )

        return options
    }

    override onRenderBackground(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): boolean {
        if (this.isExportingSVG) {
            ctx.clearRect(
                this.visible_area[0],
                this.visible_area[1],
                this.visible_area[2],
                this.visible_area[3]
            );
            return true;
        }
        return false;
    }

    jumpToFirstError() {
        this.jumpToError(0);
    }

    jumpToError(index: number | ComfyGraphErrorLocation) {
        if (this.activeErrors == null) {
            return;
        }

        let error;
        if (typeof index === "number") {
            error = this.activeErrors.errors[index]
        }
        else {
            error = index;
        }

        if (error == null) {
            return;
        }

        const rootGraph = this.graph.getRootGraph()
        if (rootGraph == null) {
            return
        }

        const node = rootGraph.getNodeByIdRecursive(error.nodeID);
        if (node == null) {
            notify(`Couldn't find node '${error.comfyNodeType}' (${error.nodeID})`, { type: "warning" })
            return
        }

        this.jumpToNode(node)

        this.highlightNodeAndInput = null;
        this.blinkError = error;
        this.blinkErrorTime = 20;
    }

    jumpToNode(node: LGraphNode) {
        interfaceState.update(s => { s.isJumpingToNode = true; return s; })

        this.closeAllSubgraphs();

        const subgraphs = Array.from(node.iterateParentSubgraphNodes()).reverse();

        for (const subgraph of subgraphs) {
            this.openSubgraph(subgraph.subgraph)
        }

        this.centerOnNode(node);
        this.selectNode(node);
    }

    jumpToNodeAndInput(node: LGraphNode, slotIndex: number | null) {
        this.jumpToNode(node);
        this.highlightNodeAndInput = [node, slotIndex];
        this.blinkErrorTime = 20;
    }
}
