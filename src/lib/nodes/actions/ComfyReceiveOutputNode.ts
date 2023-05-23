import { BuiltInSlotType, LiteGraph, type IComboWidget, type SlotLayout, type SlotType, type ITextWidget, BASE_SLOT_TYPES, LGraphNode, type Vector2, BuiltInSlotShape, LGraphCanvas } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "../ComfyGraphNode";
import { getLitegraphType } from "$lib/utils";
import notify from "$lib/notify";

export interface ComfyReceiveOutputNodeProperties extends ComfyGraphNodeProperties {
    name: string,
    description: string,
    type: SlotType
}

function getOutputTypes(widget: IComboWidget, node: LGraphNode): string[] {
    let result = []
    result = result.concat(Array.from(BASE_SLOT_TYPES))
    result.push("COMFYBOX_IMAGE")
    result.push("COMFYBOX_IMAGES")
    return result
}

export default class ComfyReceiveOutputNode extends ComfyGraphNode {
    override properties: ComfyReceiveOutputNodeProperties = {
        tags: [],
        name: "Image",
        description: "Generic image input.",
        type: "COMFYBOX_IMAGE"
    }

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "received", type: BuiltInSlotType.EVENT, options: { color_off: "fuchsia", color_on: "fuchsia" } }
        ]
    }

    override size: Vector2 = [180, 90];

    nameWidget: ITextWidget;
    descriptionWidget: ITextWidget;
    typeWidget: IComboWidget;

    isActive: boolean = false;

    private _queue: any[] = []

    constructor(title?: string) {
        super(title)

        this.nameWidget = this.addWidget("text", "Name", this.properties.name, "name");
        this.descriptionWidget = this.addWidget("text", "Desc.", this.properties.description, "description", { multiline: true });
        this.typeWidget = this.addWidget<IComboWidget>("combo", "Type", "" + this.properties.type, "type", { values: getOutputTypes });
    }

    override onPropertyChanged(property: any, value: any) {
        if (property === "type") {
            const color = LGraphCanvas.DEFAULT_CONNECTION_COLORS_BY_TYPE[value] || LGraphCanvas.DEFAULT_CONNECTION_COLORS_BY_TYPE[BuiltInSlotType.EVENT];
            this.outputs[0].color_on = color
            this.outputs[0].color_off = color
        }
    }

    override getTitle(): string {
        if (this.flags.collapsed) {
            return this.properties.name;
        }
        return this.title;
    }

    override onExecute() {
        while (this._queue.length > 0)
            this.triggerSlot(0, this._queue.splice(0, 1))
    }

    receiveOutput(value: any) {
        const type = getLitegraphType(value);
        console.warn("receive", this.id, value, type)

        if (type !== this.properties.type) {
            console.error(`Output type mismatch! ${type} != ${this.properties.type}`)
            notify("Output type mismatch!", { type: "error" })
            return;
        }

        this._queue.push(value);
    }
}

LiteGraph.registerNodeType({
    class: ComfyReceiveOutputNode,
    title: "Comfy.ReceiveOutput",
    desc: "Receives a workflow output sent from elsewhere",
    type: "events/receive_output"
})
