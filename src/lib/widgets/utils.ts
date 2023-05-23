import type { IDragItem } from "$lib/stores/layoutStates";
import { LGraphNode, NodeMode } from "@litegraph-ts/core";
import { get } from "svelte/store";

export function isNodeDisabled(node: LGraphNode): boolean {
    while (node != null) {
        if (node.mode !== NodeMode.ALWAYS) {
            return true;
        }
        if (node.graph == null) {
            return true
        }
        node = node.graph._subgraph_node;
    }
    return false;
}

export function isDisabled(widget: IDragItem) {
    if (widget.attrs.disabled)
        return true;

    if (widget.type === "widget") {
        return widget.attrs.nodeDisabledState === "disabled" && isNodeDisabled(widget.node)
    }

    return false;
}

export function isHidden(widget: IDragItem) {
    if (widget.attrs.hidden)
        return true;

    if (widget.type === "widget") {
        return widget.attrs.nodeDisabledState === "hidden" && isNodeDisabled(widget.node)
    }

    return false;
}

export function generateBlankCanvas(width: number, height: number, fill: string = "#fff"): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = fill,
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    return canvas;
}

export async function loadImage(imageURL: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const e = new Image();
        e.setAttribute('crossorigin', 'anonymous'); // Don't taint the canvas from loading files on-disk
        e.addEventListener("load", () => { resolve(e); });
        e.src = imageURL;
        return e;
    });
}

export async function generateImageCanvas(imageURL: string): Promise<[HTMLCanvasElement, number, number]> {
    const image = await loadImage(imageURL);
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
    ctx.restore();
    return [canvas, image.width, image.height];
}
