import { BuiltInSlotShape, LGraph, LGraphCanvas, LGraphNode, LiteGraph, NodeMode, type MouseEventExt, type Vector2, type Vector4, TitleMode, type ContextMenuItem, type IContextMenuItem, Subgraph } from "@litegraph-ts/core";
import type ComfyApp from "./components/ComfyApp";
import queueState from "./stores/queueState";
import { get } from "svelte/store";
import uiState from "./stores/uiState";
import layoutState from "./stores/layoutState";
import { Watch } from "@litegraph-ts/nodes-basic";
import { ComfyReroute } from "./nodes";

export type SerializedGraphCanvasState = {
    offset: Vector2,
    scale: number
}

export default class ComfyGraphCanvas extends LGraphCanvas {
    app: ComfyApp | null;

    constructor(
        app: ComfyApp,
        canvas: HTMLCanvasElement | string,
        options: {
            skip_render?: boolean;
            skip_events?: boolean;
            autoresize?: boolean;
            viewport?: Vector4;
        } = {}
    ) {
        super(canvas, app.lGraph, options);
        this.app = app;
    }

    serialize(): SerializedGraphCanvasState {
        return {
            offset: this.ds.offset,
            scale: this.ds.scale
        }
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

        let color = null;
        if (node.id === +state.runningNodeID) {
            color = "#0f0";
            // this.app can be null inside the constructor if rendering is taking place already
        } else if (this.app && this.app.dragOverNode && node.id === this.app.dragOverNode.id) {
            color = "dodgerblue";
        }

        if (color) {
            const shape = node.shape || BuiltInSlotShape.ROUND_SHAPE;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            if (shape == BuiltInSlotShape.BOX_SHAPE)
                ctx.rect(-6, -6 + LiteGraph.NODE_TITLE_HEIGHT, 12 + size[0] + 1, 12 + size[1] + LiteGraph.NODE_TITLE_HEIGHT);
            else if (shape == BuiltInSlotShape.ROUND_SHAPE || (shape == BuiltInSlotShape.CARD_SHAPE && node.flags.collapsed))
                ctx.roundRect(
                    -6,
                    -6 - LiteGraph.NODE_TITLE_HEIGHT,
                    12 + size[0] + 1,
                    12 + size[1] + LiteGraph.NODE_TITLE_HEIGHT,
                    this.round_radius * 2
                );
            else if (shape == BuiltInSlotShape.CARD_SHAPE)
                ctx.roundRect(
                    -6,
                    -6 + LiteGraph.NODE_TITLE_HEIGHT,
                    12 + size[0] + 1,
                    12 + size[1] + LiteGraph.NODE_TITLE_HEIGHT,
                    this.round_radius * 2,
                    2
                );
            else if (shape == BuiltInSlotShape.CIRCLE_SHAPE)
                ctx.arc(size[0] * 0.5, size[1] * 0.5, size[0] * 0.5 + 6, 0, Math.PI * 2);
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.strokeStyle = fgColor;
            ctx.globalAlpha = 1;

            if (state.progress) {
                ctx.fillStyle = "green";
                ctx.fillRect(0, 0, size[0] * (state.progress.value / state.progress.max), 6);
                ctx.fillStyle = bgColor;
            }
        }
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
     * Ctrl + M mute/unmute selected nodes
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
            // Ctrl + M mute/unmute
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
        const ls = get(layoutState)
        ls.currentSelectionNodes = Object.values(nodes)
        ls.currentSelection = []
        layoutState.set(ls)
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

        for (let index = 0; index < newNode.inputs.length; index++) {
            const newInput = newNode.inputs[index];
            const oldInput = node.inputs[index]

            if (oldInput && newInput.type === oldInput.type) {
                continue;
            }

            let link: LLink | null = null;

            if (oldInput) {
                link = node.getInputLink(index);
                node.disconnectInput(index)
                oldInput.type = newInput.type
                oldInput.name = newInput.name
            }
            else {
                node.addInput(newInput.name, newInput.type, newInput)
            }

            const reroute = LiteGraph.createNode(ComfyReroute);
            reroute.properties.ignoreTypes = true;
            node.graph.add(reroute)
            const inputPos = node.getConnectionPos(true, index);
            reroute.pos = [inputPos[0] - 140, inputPos[1] + LiteGraph.NODE_SLOT_HEIGHT / 2];
            reroute.connect(0, node, index);
            if (link != null)
                node.graph.getNodeById(link.target_id).connect(link.target_slot, reroute, 0)
        }

        for (let index = 0; index < newNode.outputs.length; index++) {
            const newOutput = newNode.outputs[index];
            const oldOutput = node.outputs[index]

            if (oldOutput && newOutput.type === oldOutput.type) {
                continue;
            }

            let links = []

            if (oldOutput) {
                links = node.getOutputLinks(index)
                node.disconnectOutput(index)
                oldOutput.type = newOutput.type
                oldOutput.name = newOutput.name
            }
            else {
                node.addOutput(newOutput.name, newOutput.type, newOutput)
            }

            const reroute = LiteGraph.createNode(ComfyReroute);
            reroute.properties.ignoreTypes = true;
            node.graph.add(reroute)
            const rerouteSize = reroute.computeSize();
            const outputPos = node.getConnectionPos(false, index);
            reroute.pos = [outputPos[0] + rerouteSize[0] + 20, outputPos[1] + LiteGraph.NODE_SLOT_HEIGHT / 2];
            node.connect(index, reroute, 0);
            for (const link of links) {
                reroute.connect(0, link.target_id, link.target_slot)
            }
        }
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

        return options
    }
}
