import type { SerializedPrompt } from "$lib/components/ComfyApp";
import notify from "$lib/notify";
import layoutState, { type DragItemID } from "$lib/stores/layoutState";
import queueState from "$lib/stores/queueState";
import { BuiltInSlotType, LiteGraph, NodeMode, type ITextWidget, type IToggleWidget, type SerializedLGraphNode, type SlotLayout, type PropertyLayout } from "@litegraph-ts/core";
import { get } from "svelte/store";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "./ComfyGraphNode";
import type { ComfyWidgetNode, ComfyExecutionResult, ComfyImageLocation } from "./ComfyWidgetNodes";
import type { NotifyOptions } from "$lib/notify";
import type { FileData as GradioFileData } from "@gradio/upload";
import { convertComfyOutputToGradio, type ComfyUploadImageAPIResponse } from "$lib/utils";

export class ComfyQueueEvents extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        outputs: [
            { name: "beforeQueued", type: BuiltInSlotType.EVENT },
            { name: "afterQueued", type: BuiltInSlotType.EVENT },
            { name: "onDefaultQueueAction", type: BuiltInSlotType.EVENT },
        ],
    }

    private getActionParams(subgraph: string | null): any {
        let queue = get(queueState)
        let queueRemaining = 0;

        if (typeof queue.queueRemaining === "number")
            queueRemaining = queue.queueRemaining

        return {
            queueRemaining,
            subgraph
        }
    }

    override beforeQueued(subgraph: string | null) {
        this.triggerSlot(0, this.getActionParams(subgraph))
    }

    override afterQueued(p: SerializedPrompt, subgraph: string | null) {
        this.triggerSlot(1, this.getActionParams(subgraph))
    }

    override onDefaultQueueAction() {
        let queue = get(queueState)
        let queueRemaining = 0;

        if (typeof queue.queueRemaining === "number")
            queueRemaining = queue.queueRemaining

        this.triggerSlot(2, { queueRemaining })
    }

    override onSerialize(o: SerializedLGraphNode) {
        super.onSerialize(o)
    }
}

LiteGraph.registerNodeType({
    class: ComfyQueueEvents,
    title: "Comfy.QueueEvents",
    desc: "Triggers a 'bang' event when a prompt is queued.",
    type: "actions/queue_events"
})

export interface ComfyStoreImagesActionProperties extends ComfyGraphNodeProperties {
    images: ComfyExecutionResult | null
}

export class ComfyStoreImagesAction extends ComfyGraphNode {
    override properties: ComfyStoreImagesActionProperties = {
        tags: [],
        images: null
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "output", type: BuiltInSlotType.ACTION, options: { color_off: "rebeccapurple", color_on: "rebeccapurple" } }
        ],
        outputs: [
            { name: "images", type: "OUTPUT" },
        ],
    }

    override onExecute() {
        if (this.properties.images !== null)
            this.setOutputData(0, this.properties.images)
    }

    override onAction(action: any, param: any) {
        if (action !== "store" || !param || !("images" in param))
            return;

        this.setProperty("images", param as ComfyExecutionResult)
        this.setOutputData(0, this.properties.images)
    }
}

LiteGraph.registerNodeType({
    class: ComfyStoreImagesAction,
    title: "Comfy.StoreImagesAction",
    desc: "Stores images from an onExecuted callback",
    type: "actions/store_images"
})

export interface ComfyCopyActionProperties extends ComfyGraphNodeProperties {
    value: any
}

export class ComfyCopyAction extends ComfyGraphNode {
    override properties: ComfyCopyActionProperties = {
        value: null,
        tags: []
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "in", type: "*" },
            { name: "copy", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "out", type: BuiltInSlotType.EVENT }
        ],
    }

    displayWidget: ITextWidget;

    constructor(title?: string) {
        super(title);
        this.displayWidget = this.addWidget<ITextWidget>(
            "text",
            "Value",
            "",
            "value"
        );
        this.displayWidget.disabled = true;
    }

    override onExecute() {
        if (this.getInputLink(0))
            this.setProperty("value", this.getInputData(0))
    }

    override onAction(action: any, param: any) {
        if (action === "copy") {
            this.setProperty("value", this.getInputData(0))
            this.triggerSlot(0, this.properties.value)
        }
    };
}

LiteGraph.registerNodeType({
    class: ComfyCopyAction,
    title: "Comfy.CopyAction",
    desc: "Copies its input to its output when an event is received",
    type: "actions/copy"
})

export interface ComfySwapActionProperties extends ComfyGraphNodeProperties {
}

export class ComfySwapAction extends ComfyGraphNode {
    override properties: ComfySwapActionProperties = {
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "A", type: "*" },
            { name: "B", type: "*" },
            { name: "swap", type: BuiltInSlotType.ACTION }
        ],
        outputs: [
            { name: "B", type: BuiltInSlotType.EVENT },
            { name: "A", type: BuiltInSlotType.EVENT }
        ],
    }

    override onAction(action: any, param: any) {
        const a = this.getInputData(0)
        const b = this.getInputData(1)
        this.triggerSlot(0, a)
        this.triggerSlot(1, b)
    };
}

LiteGraph.registerNodeType({
    class: ComfySwapAction,
    title: "Comfy.SwapAction",
    desc: "Swaps two inputs when triggered",
    type: "actions/swap"
})

export interface ComfyNotifyActionProperties extends ComfyGraphNodeProperties {
    message: string,
    type: string
}

export class ComfyNotifyAction extends ComfyGraphNode {
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
                const output = param as ComfyExecutionResult;
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

export interface ComfyPlaySoundActionProperties extends ComfyGraphNodeProperties {
    sound: string,
}

export class ComfyPlaySoundAction extends ComfyGraphNode {
    override properties: ComfyPlaySoundActionProperties = {
        tags: [],
        sound: "notification.mp3"
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "sound", type: "string" },
            { name: "trigger", type: BuiltInSlotType.ACTION }
        ],
    }

    override onAction(action: any, param: any) {
        const sound = this.getInputData(0) || this.properties.sound;
        if (sound) {
            const url = `${location.origin}/sound/${sound}`;
            const audio = new Audio(url);
            audio.play();
        }
    };
}

LiteGraph.registerNodeType({
    class: ComfyPlaySoundAction,
    title: "Comfy.PlaySoundAction",
    desc: "Plays a sound located under the sound/ directory.",
    type: "actions/play_sound"
})

export interface ComfyExecuteSubgraphActionProperties extends ComfyGraphNodeProperties {
    targetTag: string
}

export class ComfyExecuteSubgraphAction extends ComfyGraphNode {
    override properties: ComfyExecuteSubgraphActionProperties = {
        tags: [],
        targetTag: ""
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "execute", type: BuiltInSlotType.ACTION },
            { name: "targetTag", type: "string" }
        ],
    }

    displayWidget: ITextWidget;

    constructor(title?: string) {
        super(title)
        this.displayWidget = this.addWidget("text", "targetTag", this.properties.targetTag, "targetTag")
    }

    override onExecute() {
        const tag = this.getInputData(1)
        if (tag)
            this.setProperty("tag", tag)
    }

    override onAction(action: any, param: any) {
        const tag = this.getInputData(1) || this.properties.targetTag;

        const app = (window as any)?.app;
        if (!app)
            return;

        app.queuePrompt(0, 1, tag);
    }
}

LiteGraph.registerNodeType({
    class: ComfyExecuteSubgraphAction,
    title: "Comfy.ExecuteSubgraphAction",
    desc: "Runs a part of the graph based on a tag",
    type: "actions/execute_subgraph"
})

export interface ComfySetNodeModeActionProperties extends ComfyGraphNodeProperties {
    targetTags: string,
    enable: boolean,
}

export class ComfySetNodeModeAction extends ComfyGraphNode {
    override properties: ComfySetNodeModeActionProperties = {
        targetTags: "",
        enable: false,
        tags: []
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "enabled", type: "boolean" },
            { name: "set", type: BuiltInSlotType.ACTION },
        ],
    }

    displayWidget: ITextWidget;
    enableWidget: IToggleWidget;

    constructor(title?: string) {
        super(title)
        this.displayWidget = this.addWidget("text", "Tags", this.properties.targetTags, "targetTags")
        this.enableWidget = this.addWidget("toggle", "Enable", this.properties.enable, "enable");
    }

    override onPropertyChanged(property: any, value: any) {
        if (property === "enable") {
            this.enableWidget.value = value
        }
    }

    override onAction(action: any, param: any) {
        let input = this.getInputData(0)
        if (input == null)
            input = this.properties.enable

        let enabled = Boolean(input)

        if (typeof param === "object" && "enabled" in param)
            enabled = param["enabled"]

        const tags = this.properties.targetTags.split(",").map(s => s.trim());

        for (const node of this.graph._nodes) {
            if ("tags" in node.properties) {
                const comfyNode = node as ComfyGraphNode;
                const hasTag = tags.some(t => comfyNode.properties.tags.indexOf(t) != -1);
                if (hasTag) {
                    let newMode: NodeMode;
                    if (enabled) {
                        newMode = NodeMode.ALWAYS;
                    } else {
                        newMode = NodeMode.NEVER;
                    }
                    node.changeMode(newMode);
                    if ("notifyPropsChanged" in node)
                        (node as ComfyWidgetNode).notifyPropsChanged();
                }
            }
        }

        for (const entry of Object.values(get(layoutState).allItems)) {
            if (entry.dragItem.type === "container") {
                const container = entry.dragItem;
                const hasTag = tags.some(t => container.attrs.tags.indexOf(t) != -1);
                if (hasTag) {
                    container.attrs.hidden = !enabled;
                }
                container.attrsChanged.set(get(container.attrsChanged) + 1)
            }
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfySetNodeModeAction,
    title: "Comfy.SetNodeModeAction",
    desc: "Sets a group of nodes/UI containers as enabled/disabled based on their tags (comma-separated)",
    type: "actions/set_node_mode"
})

export type TagAction = {
    tag: string,
    enable: boolean
}

export interface ComfySetNodeModeAdvancedActionProperties extends ComfyGraphNodeProperties {
    targetTags: TagAction[],
    enable: boolean,
}

export class ComfySetNodeModeAdvancedAction extends ComfyGraphNode {
    override properties: ComfySetNodeModeAdvancedActionProperties = {
        targetTags: [{ tag: "myTag", enable: true }, { tag: "anotherTag", enable: false }],
        enable: true,
        tags: []
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "enabled", type: "boolean" },
            { name: "set", type: BuiltInSlotType.ACTION },
        ],
    }

    static propertyLayout: PropertyLayout = [
        { name: "enable", defaultValue: true, type: "boolean", },
        { name: "targetTags", defaultValue: [{ tag: "myTag", enable: true }, { tag: "anotherTag", enable: false }], type: "array", options: { multiline: true, inputStyle: { fontFamily: "monospace" } } }
    ]

    displayWidget: ITextWidget;
    enableWidget: IToggleWidget;

    constructor(title?: string) {
        super(title)
        this.displayWidget = this.addWidget("text", "Tags", this.formatTags(), null);
        this.displayWidget.disabled = true;
        this.enableWidget = this.addWidget("toggle", "Enable", this.properties.enable, "enable");
    }

    override onPropertyChanged(property: any, value: any) {
        if (property === "enable") {
            this.enableWidget.value = value
        }
        else if (property === "targetTags") {
            this.displayWidget.value = this.formatTags()
        }
    }

    private formatTags(): string {
        if (!Array.isArray(this.properties.targetTags) || this.properties.targetTags.length === 0)
            return "(No tags)";
        return this.properties.targetTags.map(t => {
            let s = t.tag
            if (t.enable)
                s = "+" + s
            else
                s = "!" + s
            return s
        }).join(", ")
    }

    private getModeChanges(action: TagAction, enable: boolean, nodeChanges: Record<string, NodeMode>, widgetChanges: Record<DragItemID, boolean>) {
        for (const node of this.graph._nodes) {
            if ("tags" in node.properties) {
                const comfyNode = node as ComfyGraphNode;
                const hasTag = comfyNode.properties.tags.indexOf(action.tag) != -1;

                if (hasTag) {
                    let newMode: NodeMode;
                    if (enable && action.enable) {
                        newMode = NodeMode.ALWAYS;
                    } else {
                        newMode = NodeMode.NEVER;
                    }
                    nodeChanges[node.id] = newMode
                    node.changeMode(newMode);
                    if ("notifyPropsChanged" in node)
                        (node as ComfyWidgetNode).notifyPropsChanged();
                }
            }
        }

        for (const entry of Object.values(get(layoutState).allItems)) {
            if (entry.dragItem.type === "container") {
                const container = entry.dragItem;
                const hasTag = container.attrs.tags.indexOf(action.tag) != -1;
                if (hasTag) {
                    const hidden = !(enable && action.enable)
                    widgetChanges[container.id] = hidden
                }
            }
        }
    }

    override onExecute() {
        this.boxcolor = LiteGraph.NODE_DEFAULT_BOXCOLOR;

        for (const action of this.properties.targetTags) {
            if (typeof action !== "object" || !("tag" in action) || !("enable" in action)) {
                this.boxcolor = "red";
                break;
            }
        }
    }

    override onAction(action: any, param: any) {
        let input = this.getInputData(0)
        if (input == null)
            input = this.properties.enable

        let enabled = Boolean(input)

        if (typeof param === "object" && "enabled" in param)
            enabled = param["enabled"]

        const nodeChanges: Record<string, NodeMode> = {}  // nodeID => newState
        const widgetChanges: Record<string, boolean> = {} // dragItemID => isHidden

        for (const action of this.properties.targetTags) {
            this.getModeChanges(action, enabled, nodeChanges, widgetChanges)
        }

        for (const [nodeId, newMode] of Object.entries(nodeChanges)) {
            this.graph.getNodeById(nodeId).changeMode(newMode);
        }

        const layout = get(layoutState);
        for (const [dragItemID, isHidden] of Object.entries(widgetChanges)) {
            const container = layout.allItems[dragItemID].dragItem
            container.attrs.hidden = isHidden;
            container.attrsChanged.set(get(container.attrsChanged) + 1)
        }
    }
}

LiteGraph.registerNodeType({
    class: ComfySetNodeModeAdvancedAction,
    title: "Comfy.SetNodeModeAdvancedAction",
    desc: "Turns multiple groups of nodes on/off at once based on an array of rules [{ tag: string, enable: boolean }, ...]",
    type: "actions/set_node_mode_advanced"
})

export class ComfyNoChangeEvent extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        inputs: [
            { name: "in", type: BuiltInSlotType.ACTION },
        ],
        outputs: [
            { name: "out", type: BuiltInSlotType.EVENT },
        ],
    }

    override onAction(action: any, param: any, options: { action_call?: string }) {
        if (param && typeof param === "object" && "noChangedEvent" in param) {
            param.noChangedEvent = true;
        }
        else {
            param = {
                value: param,
                noChangedEvent: true
            }
        }

        this.triggerSlot(0, param, null, options);
    }
}

LiteGraph.registerNodeType({
    class: ComfyNoChangeEvent,
    title: "Comfy.NoChangeEvent",
    desc: "Wraps an event's parameter such that passing it into a ComfyWidgetNode's 'store' action will not trigger its 'changed' event",
    type: "events/no_change"
})

export interface ComfySetPromptThumbnailsActionProperties extends ComfyGraphNodeProperties {
    defaultFolderType: string | null
}

export class ComfySetPromptThumbnailsAction extends ComfyGraphNode {
    override properties: ComfySetPromptThumbnailsActionProperties = {
        tags: [],
        defaultFolderType: "input",
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "filenames", type: "*" },
        ]
    }

    _value: any = null;

    override getPromptThumbnails(): ComfyImageLocation[] | null {
        const data = this.getInputData(0)

        const folderType = this.properties.folderType || "input";

        const convertString = (s: string): ComfyImageLocation => {
            return { filename: data, subfolder: "", type: folderType }
        }

        if (typeof data === "string") {
            return [convertString(data)]
        }
        else if (data != null && typeof data === "object") {
            if ("filename" in data && "type" in data)
                return [data as ComfyImageLocation];
        }
        else if (Array.isArray(data) && data.length > 0) {
            if (typeof data[0] === "string")
                return data.map(convertString)
            else if (typeof data[0] === "object" && "filename" in data[0] && "type" in data[0])
                return data as ComfyImageLocation[]
        }
        return null;
    }
}

LiteGraph.registerNodeType({
    class: ComfySetPromptThumbnailsAction,
    title: "Comfy.SetPromptThumbnailsAction",
    desc: "When a subgraph containing this node is executed, sets the thumbnails in the queue sidebar to the input filename(s).",
    type: "actions/set_prompt_thumbnails"
})
