import { BuiltInSlotShape, LGraph, LGraphCanvas, LGraphNode, LiteGraph, NodeMode, type MouseEventExt, type Vector2, type Vector4 } from "@litegraph-ts/core";
import type ComfyApp from "./components/ComfyApp";
import queueState from "./stores/queueState";
import { get } from "svelte/store";

export default class ComfyGraphCanvas extends LGraphCanvas {
    app: ComfyApp

    constructor(
        app: ComfyApp,
        canvas: HTMLCanvasElement | string,
        graph?: LGraph,
        options: {
            skip_render?: boolean;
            skip_events?: boolean;
            autoresize?: boolean;
            viewport?: Vector4;
        } = {}
    ) {
        super(canvas, graph, options);
        this.app = app;
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
        if (node.id === +state.runningNodeId) {
            color = "#0f0";
        } else if (this.app.dragOverNode && node.id === this.app.dragOverNode.id) {
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

    override drawNode(node: LGraphNode, ctx: CanvasRenderingContext2D): void {
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
}
