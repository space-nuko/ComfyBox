import ComfyGraph from '$lib/ComfyGraph';
import { LGraphCanvas, LiteGraph, Subgraph } from '@litegraph-ts/core';
import layoutStates from './stores/layoutStates';
import { get } from 'svelte/store';

export function configureLitegraph(isMobile: boolean = false) {
    LiteGraph.catch_exceptions = false;

    // Must be enabled, otherwise subgraphs won't work (because of non-unique node/link IDs)
    LiteGraph.use_uuids = true;

    LiteGraph.search_filter_enabled = true;
    LiteGraph.release_link_on_empty_shows_menu = true;
    LiteGraph.alt_drag_do_clone_nodes = true;
    LiteGraph.middle_click_slot_add_default_node = true;
    LiteGraph.dialog_close_on_mouse_leave = false;
    LiteGraph.search_hide_on_mouse_leave = false;
    LiteGraph.graph_inputs_outputs_use_combo_widget = true;
    LiteGraph.search_box_refresh_interval_ms = 150;

    LiteGraph.CANVAS_GRID_SIZE = 32;

    if (isMobile) {
        LiteGraph.pointerevents_method = "pointer";
    }

    Subgraph.default_lgraph_factory = () => new ComfyGraph;

    (window as any).LiteGraph = LiteGraph;
    (window as any).LGraphCanvas = LGraphCanvas;
    (window as any).layoutStates = get(layoutStates)
}
