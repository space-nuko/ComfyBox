import type { NotifyOptions } from "$lib/notify";
import notify from "$lib/notify";
import { convertComfyOutputToGradio, type SerializedPromptOutput } from "$lib/utils";
import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "../ComfyGraphNode";

export interface ComfyNotifyActionProperties extends ComfyGraphNodeProperties {
    message: string,
    type: string
}

export default class ComfyNotifyAction extends ComfyGraphNode {
    override properties: ComfyNotifyActionProperties = {
        tags: [],
        message: "Nya.",
        type: "info"
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "message", type: "string" },
            { name: "trigger", type: BuiltInSlotType.ACTION }
        ],
    }

    override onAction(action: any, param: any) {
        const message = this.getInputData(0) || this.properties.message;
        if (!message)
            return;

        const options: NotifyOptions = {
            type: this.properties.type,
            showOn: "all"
        }

        // Check if this event was triggered from a backend node and has the
        // onExecuted arguments. If so then use the first image as the icon for
        // native notifications.
        if (param != null && typeof param === "object") {
            if ("images" in param) {
                const output = param as SerializedPromptOutput;
                const converted = convertComfyOutputToGradio(output);
                if (converted.length > 0)
                    options.imageUrl = converted[0].data;
            }
        }

        notify(message, options);
    };
}

LiteGraph.registerNodeType({
    class: ComfyNotifyAction,
    title: "Comfy.NotifyAction",
    desc: "Displays a message.",
    type: "actions/notify"
})
