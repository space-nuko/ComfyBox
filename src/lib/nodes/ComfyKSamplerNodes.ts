import { get } from 'svelte/store';
import ComfyGraphNode from "./ComfyGraphNode";
import widgetState from "$lib/stores/widgetState"

/*
 * Autorefreshes seed (until bangs/main inlets are implemented)
 */
class ComfyBaseKSamplerNode extends ComfyGraphNode {
    constructor(title?: any) {
        super(title)
    }

    override onExecuting() {
        console.log(this);
        const widget = widgetState.findWidgetByName(this.id, "seed")
        if (!widget)
            return;

        // TODO cleanup&remove
		let min = widget.widget.options.min;
		let max = widget.widget.options.max;
		// limit to something that javascript can handle
		max = Math.min(1125899906842624, max);
		min = Math.max(-1125899906842624, min);
		const range = (max - min) / (widget.widget.options.step);
        const v = Math.floor(Math.floor(Math.random() * range) * (widget.widget.options.step) + min);

        widget.widget.value = v;
        widgetState.widgetStateChanged(this.id, widget.widget);
    }
}

export class ComfyKSamplerNode extends ComfyBaseKSamplerNode {}
export class ComfyKSamplerAdvancedNode extends ComfyBaseKSamplerNode {}
