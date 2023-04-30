import ComfyApp from "./components/ComfyApp";
import ComboWidget from "$lib/widgets/ComboWidget.svelte";
import RangeWidget from "$lib/widgets/RangeWidget.svelte";
import TextWidget from "$lib/widgets/TextWidget.svelte";
import { type WidgetUIState } from "$lib/stores/nodeState";
import { get } from "svelte/store"
import layoutState from "$lib/stores/layoutState"
import type { SvelteComponentDev } from "svelte/internal";

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

export function getComponentForWidgetState(item: WidgetUIState): typeof SvelteComponentDev {
    // custom widgets with TypeScript sources
    let override = ComfyApp.widget_type_overrides[item.widget.type]
    if (override) {
        return override
    }

    // litegraph.ts built-in widgets
    switch (item.widget.type) {
        case "combo":
            return ComboWidget;
        case "number":
            return RangeWidget;
        case "text":
            return TextWidget;
    }

    return null;
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
    layoutState.set(ls)
};

export function stopDrag(evt: MouseEvent) {
};
