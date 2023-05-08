import ComfyApp, { type SerializedPrompt } from "./components/ComfyApp";
import ComboWidget from "$lib/widgets/ComboWidget.svelte";
import RangeWidget from "$lib/widgets/RangeWidget.svelte";
import TextWidget from "$lib/widgets/TextWidget.svelte";
import { get } from "svelte/store"
import layoutState from "$lib/stores/layoutState"
import type { SvelteComponentDev } from "svelte/internal";
import type { SerializedLGraph } from "@litegraph-ts/core";
import type { GalleryOutput } from "./nodes/ComfyWidgetNodes";

export function clamp(n: number, min: number, max: number): number {
    return Math.min(Math.max(n, min), max)
}

export function range(size: number, startAt: number = 0): ReadonlyArray<number> {
    return [...Array(size).keys()].map(i => i + startAt);
}

export function download(filename: string, text: string, type: string = "text/plain") {
    const blob = new Blob([text], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(function() {
        a.remove();
        window.URL.revokeObjectURL(url);
    }, 0);
}

export function startDrag(evt: MouseEvent) {
    const dragItemId: string = evt.target.dataset["dragItemId"];
    const ls = get(layoutState)

    if (evt.button !== 0) {
        if (ls.currentSelection.length <= 1 && !ls.isMenuOpen)
            ls.currentSelection = [dragItemId]
        return;
    }

    const item = ls.allItems[dragItemId].dragItem

    console.debug("startDrag", item)

    if (evt.ctrlKey) {
        const index = ls.currentSelection.indexOf(item.id)
        if (index === -1)
            ls.currentSelection.push(item.id);
        else
            ls.currentSelection.splice(index, 1);
        ls.currentSelection = ls.currentSelection;
    }
    else {
        ls.currentSelection = [item.id]
    }
    ls.currentSelectionNodes = [];

    layoutState.set(ls)
};

export function stopDrag(evt: MouseEvent) {
};

export function workflowToGraphVis(workflow: SerializedLGraph): string {
    let out = "digraph {\n"

    for (const link of workflow.links) {
        const nodeA = workflow.nodes.find(n => n.id === link[1])
        const nodeB = workflow.nodes.find(n => n.id === link[3])
        out += `"${link[1]}_${nodeA.title}" -> "${link[3]}_${nodeB.title}"\n`;
    }

    out += "}"
    return out
}

export function promptToGraphVis(prompt: SerializedPrompt): string {
    let out = "digraph {\n"

    for (const pair of Object.entries(prompt.output)) {
        const [id, o] = pair;
        const outNode = prompt.workflow.nodes.find(n => n.id == id)
        for (const pair2 of Object.entries(o.inputs)) {
            const [inpName, i] = pair2;

            if (Array.isArray(i) && i.length === 2 && typeof i[0] === "string" && typeof i[1] === "number") {
                // Link
                const inpNode = prompt.workflow.nodes.find(n => n.id == i[0])
                out += `"${inpNode.title}" -> "${outNode.title}"\n`
            }
            else {
                // Value
                out += `"${id}-${inpName}-${i}" -> "${outNode.title}"\n`
            }
        }
    }

    out += "}"
    return out
}

export function getNodeInfo(nodeId: number): string {
    let app = (window as any).app;
    if (!app)
        return String(nodeId);

    const title = app.lGraph.getNodeById(nodeId)?.title || String(nodeId);
    return title + " (" + nodeId + ")"
}

export const debounce = (callback: Function, wait = 250) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Array<unknown>) => {
        const next = () => callback(...args);
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(next, wait);
    };
};

export function convertComfyOutputToGradio(output: GalleryOutput): GradioFileData[] {
    return output.images.map(r => {
        // TODO configure backend URL
        const url = `http://${location.hostname}:8188` // TODO make configurable
        const params = new URLSearchParams(r)
        return {
            name: null,
            data: url + "/view?" + params
        }
    });
}
