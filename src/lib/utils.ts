import ComfyApp from "./components/ComfyApp";
import ComboWidget from "$lib/widgets/ComboWidget.svelte";
import RangeWidget from "$lib/widgets/RangeWidget.svelte";
import TextWidget from "$lib/widgets/TextWidget.svelte";
 import widgetState, { type WidgetDrawState, type WidgetUIState } from "$lib/stores/widgetState";

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

export function getComponentForWidgetState(item: WidgetUIState): any {
    let ctor: any = null;

    // custom widgets with TypeScript sources
    let override = ComfyApp.widget_type_overrides[item.widget.type]
    if (override) {
        return override;
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
