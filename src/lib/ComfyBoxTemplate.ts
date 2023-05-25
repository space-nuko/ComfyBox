import { Subgraph, type LGraphNode, type LLink, type SerializedLGraphNode, type SerializedLLink, LGraph, type NodeID, type UUID, type Vector2 } from "@litegraph-ts/core"
import layoutStates, { isComfyWidgetNode, type ContainerLayout, type SerializedDragEntry, type WidgetLayout, type DragItemID, type WritableLayoutStateStore, type DragItemEntry, type SerializedLayoutState } from "./stores/layoutStates"
import type { ComfyWidgetNode } from "./nodes/widgets"
import type ComfyGraphCanvas from "./ComfyGraphCanvas"
import C2S from "canvas-to-svg";
import { calcNodesBoundingBox, download } from "./utils";
import { v4 as uuidv4 } from "uuid";
import uiState from "./stores/uiState";

/*
 * In ComfyBox a template contains a subset of nodes in the graph and the set of
 * components they represent in the UI.
 */
export type ComfyBoxTemplate = {
    version: 1,
    id: UUID,
    metadata: ComfyBoxTemplateMetadata,
    nodes: LGraphNode[],
    links: LLink[],
    container?: DragItemEntry
}

export type SerializedTemplateLink = [NodeID, number, NodeID, number];

export type ComfyBoxTemplateMetadata = {
    title: string,
    author: string,
    description: string,
    tags: string[],
    category: string,
    createdAt: number

    // TODO required/optional python extensions
}

/*
 * In ComfyBox a template contains a subset of nodes in the graph and the set of
 * components they represent in the UI.
 */
export type SerializedComfyBoxTemplate = {
    isComfyBoxTemplate: true,
    version: 1,
    id: UUID,
    commitHash: string,
    isBuiltIn?: boolean,

    /*
     * Serialized metadata
     */
    metadata: ComfyBoxTemplateMetadata,

    /*
     * Serialized nodes
     */
    nodes: SerializedLGraphNode[]

    /*
     * Serialized inner links
     */
    links: SerializedTemplateLink[],

    /*
     * Serialized container type drag item
     */
    layout?: SerializedLayoutState

    /*
     * SVG of the graph ndoes
     */
    svg?: string
}

function isSerializedComfyBoxTemplate(param: any): param is SerializedComfyBoxTemplate {
    return param && param.isComfyBoxTemplate;
}

const DEFAULT_TEMPLATE_METADATA = {
    title: "New Template",
    author: "Anonymous",
    description: "A brand-new ComfyBox template",
    tags: [],
    category: "general"
}

export type ComfyBoxTemplateError = {
    error: string
}

export type ComfyBoxTemplateResult = ComfyBoxTemplate | ComfyBoxTemplateError;

function findIdealParentContainerForNodes(layout: WritableLayoutStateStore, widgets: WidgetLayout[]): DragItemEntry | null {
    const widgetIds = new Set(widgets.map(w => w.id));

    const containsExactlyTheWidgets = (container: ContainerLayout): boolean => {
        const found: Set<DragItemID> = new Set();
        for (const { dragItem } of layout.iterateBreadthFirst(container.id)) {
            if (dragItem.type === "widget") {
                if (!widgetIds.has(dragItem.id))
                    return false;

                found.add(dragItem.id);
            }
        }

        return found.size === widgetIds.size;
    }

    for (const entry of layout.iterateBreadthFirst()) {
        if (entry.dragItem.type === "container" && entry.children.length > 0) {
            const container = entry.dragItem as ContainerLayout;
            if (containsExactlyTheWidgets(container)) {
                return entry;
            }
        }
    }

    return null;
}

function getWidgetNodes(nodes: LGraphNode[]): ComfyWidgetNode[] {
    let result = []

    for (const node of nodes) {
        if (isComfyWidgetNode(node)) {
            result.push(node)
        }
        else if (node.is(Subgraph)) {
            result = result.concat(Array.from(node.subgraph.iterateNodesInOrderRecursive())
                .filter(isComfyWidgetNode))
        }
    }

    return result;
}

function getInnerLinks(nodes: LGraphNode[]): LLink[] {
    const nodeIds = new Set(nodes.map(n => n.id));
    const result = []

    for (const node of nodes) {
        for (const link of node.iterateAllLinks()) {
            if (nodeIds.has(link.origin_id) && nodeIds.has(link.target_id))
                result.push(link)
        }
    }

    return result;
}

function escapeXml(unsafe) {
    return unsafe.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function unescapeXml(safe) {
    return safe.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
}

const TEMPLATE_SVG_PADDING: number = 50;

function renderSvg(canvas: ComfyGraphCanvas, graph: LGraph, padding: number, extraData?: SerializedComfyBoxTemplate | null): string {
    // Calculate the min max bounds for the nodes on the graph
    const bounds = graph._nodes.reduce(
        (p, n) => {
            if (n.pos[0] < p[0]) p[0] = n.pos[0];
            if (n.pos[1] < p[1]) p[1] = n.pos[1];
            const r = n.pos[0] + n.size[0];
            const b = n.pos[1] + n.size[1];
            if (r > p[2]) p[2] = r;
            if (b > p[3]) p[3] = b;
            return p;
        },
        [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY]
    );

    bounds[0] -= padding;
    bounds[1] -= padding;
    bounds[2] += padding;
    bounds[3] += padding;

    // Store current canvas values to reset after drawing
    const ctx = canvas.ctx;
    const scale = canvas.ds.scale;
    const width = canvas.canvas.width;
    const height = canvas.canvas.height;
    const offset = canvas.ds.offset;
    const show_info = canvas.show_info;
    const background_image = canvas.background_image;
    const clear_background = canvas.clear_background;
    const render_canvas_border = canvas.render_canvas_border;
    const render_subgraph_panels = canvas.render_subgraph_panels
    const render_subgraph_stack_header = canvas.render_subgraph_stack_header

    canvas.openSubgraph(graph)
    canvas.show_info = false;
    canvas.background_image = null;
    canvas.clear_background = false;
    canvas.render_canvas_border = false;
    canvas.render_subgraph_panels = false;
    canvas.render_subgraph_stack_header = false;

    const svgCtx = new C2S(bounds[2] - bounds[0], bounds[3] - bounds[1]);

    svgCtx.canvas.getBoundingClientRect = function() {
        return { width: svgCtx.width, height: svgCtx.height };
    };

    // Override the c2s handling of images to draw images as canvases
    // const drawImage = svgCtx.drawImage;
    // svgCtx.drawImage = function(...args) {
    //     const image = args[0];
    //     // If we are an image node and not a datauri then we need to replace with a canvas
    //     // we cant convert to data uri here as it is an async process
    //     if (image.nodeName === "IMG" && !image.src.startsWith("data:image/")) {
    //         const canvas = document.createElement("canvas");
    //         canvas.width = image.width;
    //         canvas.height = image.height;
    //         const imgCtx = canvas.getContext("2d");
    //         imgCtx.drawImage(image, 0, 0);
    //         args[0] = canvas;
    //     }

    //     return drawImage.apply(this, args);
    // };

    // Implement missing required functions
    svgCtx.getTransform = function() {
        return ctx.getTransform();
    };
    svgCtx.resetTransform = function() {
        return ctx.resetTransform();
    };
    svgCtx.roundRect = svgCtx.rect;

    // Force the canvas to render the whole graph to the svg context
    canvas.ds.scale = 1;
    canvas.canvas.width = bounds[2] - bounds[0];
    canvas.canvas.height = bounds[3] - bounds[1];
    canvas.ds.offset = [-bounds[0], -bounds[1]];
    canvas.ctx = svgCtx;

    // Trigger saving
    canvas.isExportingSVG = true;
    canvas.draw(true, true);
    canvas.isExportingSVG = false;

    // Restore original settings
    canvas.closeSubgraph();
    canvas.ds.scale = scale;
    canvas.canvas.width = width;
    canvas.canvas.height = height;
    canvas.ds.offset = offset;
    canvas.ctx = ctx;
    canvas.show_info = show_info;
    canvas.clear_background = clear_background;
    canvas.background_image = background_image;
    canvas.render_canvas_border = render_canvas_border;
    canvas.render_subgraph_panels = render_subgraph_panels;
    canvas.render_subgraph_stack_header = render_subgraph_stack_header;

    canvas.draw(true, true);

    let svg = svgCtx.getSerializedSvg(true)
    return svg
}

export function embedTemplateInSvg(template: SerializedComfyBoxTemplate): string {
    let oldSvg = template.svg;
    template.svg = undefined;
    const json = JSON.stringify(template);
    const svg = oldSvg.replace("</svg>", `<desc>${escapeXml(json)}</desc></svg>`);
    template.svg = oldSvg;
    return svg
}

/*
 * Moves nodes so their origin is at (0, 0)
 */
function relocateNodes(nodes: SerializedLGraphNode[]): SerializedLGraphNode[] {
    let [min_x, min_y, max_x, max_y] = calcNodesBoundingBox(nodes);

    for (const node of nodes) {
        node.pos = [node.pos[0] - min_x, node.pos[1] - min_y];
    }

    return nodes;
}

function pruneDetachedLinks(nodes: SerializedLGraphNode[], links: SerializedTemplateLink[]): [SerializedLGraphNode[], SerializedTemplateLink[]] {
    const nodeIds = new Set(nodes.map(n => n.id));

    for (const node of nodes) {
        if (node.inputs) {
            for (const input of node.inputs) {
                if (input.link && (!nodeIds.has(input.link)))
                    input.link = null;
            }
        }
        if (node.outputs) {
            for (const output of node.outputs) {
                if (output.links) {
                    output.links = output.links.filter(l => nodeIds.has(l))
                }
            }
        }
    }

    links = links.filter(l => {
        return nodeIds.has(l[0]) && nodeIds.has(l[2]);
    })

    return [nodes, links]
}

function convLinkForTemplate(link: LLink): SerializedTemplateLink {
    return [link.origin_id, link.origin_slot, link.target_id, link.target_slot];
}

export function serializeTemplate(canvas: ComfyGraphCanvas, template: ComfyBoxTemplate): SerializedComfyBoxTemplate {
    let graph: LGraph
    if (template.nodes.length === 1 && template.nodes[0].is(Subgraph)) {
        graph = template.nodes[0].subgraph
    } else {
        // TODO render graph portion
        graph = canvas.graph;
    }

    const layoutState = layoutStates.getLayoutByDragItemID(template.container.dragItem.id);
    if (layoutState == null)
        throw "Couldn't find layout for template being serialized!"

    uiState.update(s => { s.forceSaveUserState = false; return s; });

    const metadata = template.metadata;
    let nodes = template.nodes.map(n => n.serialize());
    let links = template.links.map(convLinkForTemplate);
    const layout = layoutState.serializeAtRoot(template.container.dragItem.id);

    uiState.update(s => { s.forceSaveUserState = null; return s; });

    nodes = relocateNodes(nodes);
    [nodes, links] = pruneDetachedLinks(nodes, links);

    const svg = renderSvg(canvas, graph, TEMPLATE_SVG_PADDING);

    const serTemplate: SerializedComfyBoxTemplate = {
        isComfyBoxTemplate: true,
        version: 1,
        commitHash: __GIT_COMMIT_HASH__,
        id: template.id,
        metadata,
        nodes,
        links,
        layout,
        svg
    }

    return serTemplate;
}


/*
 * Extract embedded workflow from desc tags
 */
export function extractTemplateJSONFromSVG(svg: string): string | null {
    const descEnd = svg.lastIndexOf("</desc>");
    if (descEnd !== -1) {
        const descStart = svg.lastIndexOf("<desc>", descEnd);
        if (descStart !== -1) {
            const json = svg.substring(descStart + 6, descEnd);
            return unescapeXml(json);
        }
    }

    return null;
}

/*
 * Credit goes to pythongosssss for this format
 */
export function deserializeTemplateFromSVG(svg: string): SerializedComfyBoxTemplate | null {
    let template = null;
    let templateJSON = extractTemplateJSONFromSVG(svg);
    if (templateJSON)
        template = JSON.parse(templateJSON);

    if (!isSerializedComfyBoxTemplate(template)) {
        return null;
    }
    else {
        template.svg = svg;
        return template;
    }
}

export function createTemplate(nodes: LGraphNode[]): ComfyBoxTemplateResult {
    if (nodes.length === 0) {
        return {
            error: "No nodes selected."
        }
    }
    // Find all UI nodes in this subgraph recursively
    const widgetNodes = getWidgetNodes(nodes)
    const links = getInnerLinks(nodes)

    const layout = layoutStates.getLayoutByNode(nodes[0])
    if (layout == null) {
        return {
            error: "Node(s) not contained in a layout!"
        }
    }

    let title = "New Template";
    if (nodes.length === 1) {
        title = nodes[0].title || title;
    }

    if (widgetNodes.length > 0) {
        // Find the highest-level container that contains all these nodes and
        // contains no other widgets
        const widgets = widgetNodes.map(node => node.dragItem)
        if (!widgets.every(Boolean)) {
            return {
                error: "At least one widget node was missing an entry in the UI!"
            }
        }
        const container = findIdealParentContainerForNodes(layout, widgets);
        if (container == null) {
            return {
                error: "Couldn't find a suitable container in the UI for these nodes. Ensure all the widget nodes in the subgraph are kept inside a single container in the UI."
            }
        }

        return {
            version: 1,
            id: uuidv4(),
            metadata: { ...DEFAULT_TEMPLATE_METADATA, title, createdAt: Date.now() },
            nodes: nodes,
            links: links,
            container: container
        }
    }
    else {
        // No UI to serialize.
        return {
            version: 1,
            id: uuidv4(),
            metadata: { ...DEFAULT_TEMPLATE_METADATA, title, createdAt: Date.now() },
            nodes: nodes,
            links: links,
        }
    }
}
