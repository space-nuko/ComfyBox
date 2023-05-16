import ComfyGraph from '$lib/ComfyGraph';
import { LGraphCanvas, LiteGraph, Subgraph } from '@litegraph-ts/core';

export function configureLitegraph(isMobile: boolean = false) {
    LiteGraph.catch_exceptions = false;
    LiteGraph.use_uuids = true;
    LiteGraph.CANVAS_GRID_SIZE = 32;

    if (isMobile) {
        LiteGraph.dialog_close_on_mouse_leave = false;
        LiteGraph.search_hide_on_mouse_leave = false;
        LiteGraph.pointerevents_method = "pointer";
    }

    Subgraph.default_lgraph_factory = () => new ComfyGraph;

    (window as any).LiteGraph = LiteGraph;
    (window as any).LGraphCanvas = LGraphCanvas;
}
