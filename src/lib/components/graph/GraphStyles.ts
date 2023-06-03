import type { Stylesheet } from "cytoscape";

const styles: Stylesheet[] = [
    {
        selector: "core",
        style: {
            "selection-box-color": "#ddd",
            "selection-box-opacity": 0.65,
            "selection-box-border-color": "#aaa",
            "selection-box-border-width": 1,
            "active-bg-color": "#4b5563",
            "active-bg-opacity": 0.35,
            "active-bg-size": 30,
            "outside-texture-bg-color": "#000",
            "outside-texture-bg-opacity": 0.125,
        }
    },
    {
        selector: ".historyNode",
        style: {
            "width": "100",
            "height": "100",
            "shape": "round-rectangle",
            "font-family": "Arial",
            "font-size": "18",
            "font-weight": "normal",
            "content": `data(label)`,
            "text-valign": "center",
            "text-wrap": "wrap",
            "text-max-width": "140",
            "background-color": "#60a5fa",
            "border-color": "#2563eb",
            "border-width": "3",
            "color": "#1d3660"
        }
    },
    {
        selector: "node.historyNode[bgImage]",
        style: {
            "label": "",
            "background-image": "data(bgImage)",
            "background-image-containment": "over",
            "background-fit": "cover",
            "color": "transparent"
        }
    },
    {
        selector: ".historyNode:selected",
        style: {
            "background-color": "#f97316",
            "color": "white",
            "border-color": "#ea580c",
            "line-color": "#0e76ba",
            "target-arrow-color": "#0e76ba",
        }
    },
    {
        selector: ".patchNode",
        style: {
            "width": "label",
            "height": "label",
            "shape": "round-rectangle",
            "padding": "20",
            "font-family": "Arial",
            "font-size": "11",
            "font-weight": "normal",
            "content": `data(label)`,
            "text-valign": "center",
            "text-wrap": "wrap",
            "text-max-width": "140",
            "background-color": "#333",
            "border-color": "#black",
            "border-width": "1",
            "color": "white",
        }
    },
    {
        selector: "edge",
        style: {
            "curve-style": "bezier",
            "color": "darkred",
            "text-background-color": "#ffffff",
            "text-background-opacity": 1,
            "text-background-padding": "3",
            "width": 3,
            "target-arrow-shape": "triangle",
            "line-color": "#1d4ed8",
            "target-arrow-color": "#1d4ed8",
            "font-weight": "bold"
        }
    },
    {
        selector: "edge[label]",
        style: {
            "content": `data(label)`,
        }
    },
    {
        selector: "edge.label",
        style: {
            "line-color": "orange",
            "target-arrow-color": "orange"
        }
    }
]
export default styles;
