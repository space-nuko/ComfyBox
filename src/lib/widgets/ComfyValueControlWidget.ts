import type { IEnumWidget, IEnumWidgetOptions, INumberWidget, LGraphNode, WidgetPanelOptions } from "@litegraph-ts/core";
import ComfyWidget from "./ComfyWidget";
import type { ComfyImageResult } from "$lib/nodes/ComfySaveImageNode";
import type ComfyGraphNode from "$lib/nodes/ComfyGraphNode";
import nodeState from "$lib/stores/nodeState"

export interface ComfyValueControlWidgetOptions extends IEnumWidgetOptions {
}

export default class ComfyValueControlWidget extends ComfyWidget<ComfyValueControlWidgetOptions, string> {
    override type = "combo";
    targetWidget: INumberWidget;

    constructor(name: string, value: string, node: ComfyGraphNode, targetWidget: INumberWidget) {
        super(name, value, node)
        this.targetWidget = targetWidget;
        this.options = { values: ["fixed", "increment", "decrement", "randomize"], serialize: false };
    }

    override afterQueued() {
		var v = this.value;

		let min = this.targetWidget.options.min;
		let max = this.targetWidget.options.max;
		// limit to something that javascript can handle
		max = Math.min(1125899906842624, max);
		min = Math.max(-1125899906842624, min);
		let range = (max - min) / (this.targetWidget.options.step);

		//adjust values based on valueControl Behaviour
		switch (v) {
			case "fixed":
				break;
			case "increment":
				this.targetWidget.value += this.targetWidget.options.step;
				break;
			case "decrement":
				this.targetWidget.value -= this.targetWidget.options.step;
				break;
			case "randomize":
				this.targetWidget.value = Math.floor(Math.random() * range) * (this.targetWidget.options.step) + min;
			default:
				break;
		}
	/*check if values are over or under their respective
	 * ranges and set them to min or max.*/
		if (this.targetWidget.value < min)
			this.targetWidget.value = min;

		if (this.targetWidget.value > max)
			this.targetWidget.value = max;

        nodeState.widgetStateChanged(this.node.id, this.targetWidget);
    }
}
