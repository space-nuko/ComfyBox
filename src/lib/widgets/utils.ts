import type { IDragItem } from "$lib/stores/layoutState";
import layoutState from "$lib/stores/layoutState";
import { LGraphNode, NodeMode } from "@litegraph-ts/core";
import { get } from "svelte/store";

export function isNodeDisabled(node: LGraphNode): boolean {
    while (node != null) {
        if (node.mode !== NodeMode.ALWAYS) {
            return true;
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
