import type { IDragItem } from "$lib/stores/layoutState";
import layoutState from "$lib/stores/layoutState";
import { NodeMode } from "@litegraph-ts/core";
import { get } from "svelte/store";

export function isDisabled(widget: IDragItem) {
    if (widget.attrs.disabled)
        return true;

    if (widget.type === "widget") {
        return widget.attrs.nodeDisabledState === "disabled" && widget.node.mode === NodeMode.NEVER
    }

    return false;
}

export function isHidden(widget: IDragItem) {
    if (widget.attrs.hidden)
        return true;

    if (widget.type === "widget") {
        return widget.attrs.nodeDisabledState === "hidden" && widget.node.mode === NodeMode.NEVER
    }

    return false;
}
