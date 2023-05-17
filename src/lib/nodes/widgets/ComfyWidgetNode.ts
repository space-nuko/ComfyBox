import type IComfyInputSlot from "$lib/IComfyInputSlot";
import layoutState from "$lib/stores/layoutState";
import { range } from "$lib/utils";
import { LConnectionKind, LGraphCanvas, LLink, LiteGraph, NodeMode, type INodeInputSlot, type INodeOutputSlot, type ITextWidget, type LGraphNode, type SerializedLGraphNode, type Vector2 } from "@litegraph-ts/core";
import { Watch } from "@litegraph-ts/nodes-basic";
import type { SvelteComponentDev } from "svelte/internal";
import { get, writable, type Unsubscriber, type Writable } from "svelte/store";

import type { ComfyNodeID } from "$lib/api";
import type { ComfyGraphNodeProperties } from "../ComfyGraphNode";
import ComfyGraphNode from "../ComfyGraphNode";

export type AutoConfigOptions = {
    includeProperties?: Set<string> | null,
    setDefaultValue?: boolean
    setWidgetTitle?: boolean
}

/*
 * NOTE: If you want to add a new widget but it has the same input/output type
 * as another one of the existing widgets, best to create a new "variant" of
 * that widget instead.
 *
 * - Go to layoutState, look for `ALL_ATTRIBUTES,` insert or find a "variant"
 *   attribute and set `validNodeTypes` to the type of the litegraph node
 * - Add a new entry in the `values` array, like "knob" or "dial" for ComfySliderWidget
 * - Add an {#if widget.attrs.variant === <...>} statement in the existing Svelte component
 *
 * Also, BEWARE of calling setOutputData() and triggerSlot() on the same frame!
 * You will have to either implement an internal delay on the event triggering
 * or use an Event Delay node to ensure the output slot data can propagate to
 * the rest of the graph first (see `delayChangedEvent` for details)
 */

export interface ComfyWidgetProperties extends ComfyGraphNodeProperties {
    defaultValue: any
}

/*
 * A node that is tied to a UI widget in the frontend. When the frontend's
 * widget is changed, the value of the first output in the node is updated
 * in the litegraph instance.
 */
export default abstract class ComfyWidgetNode<T = any> extends ComfyGraphNode {
    abstract properties: ComfyWidgetProperties;

    value: Writable<T>
    propsChanged: Writable<number> = writable(0) // dummy to indicate if props changed
    unsubscribe: Unsubscriber;

    /** Svelte class for the frontend logic */
    abstract svelteComponentType: typeof SvelteComponentDev

    /** If false, user manually set min/max/step, and should not be autoinherited from connected input */
    autoConfig: boolean = true;

    copyFromInputLink: boolean = true;

    /**
     * If true wait until next frame update to trigger the changed event.
     * Reason is, if the event is triggered immediately then other stuff that wants to run
     * their own onExecute on the output value won't have completed yet.
     */
    delayChangedEvent: boolean = true;

    private _aboutToChange: number = 0;
    private _aboutToChangeValue: any = null;
    private _noChangedEvent: boolean = false;

    abstract defaultValue: T;

    /** Names of properties to add as inputs */
    // shownInputProperties: string[] = []

    /** Names of properties to add as outputs */
    private shownOutputProperties: Record<string, { type: string, index: number }> = {}
    outputProperties: { name: string, type: string }[] = []

    override isBackendNode = false;
    override serialize_widgets = true;

    storeActionName: string | null = "store";

    // output slots
    outputSlotName: string | null = "value";
    changedEventName: string | null = "changed";

    displayWidget: ITextWidget;

    override size: Vector2 = [60, 40];

    constructor(name: string, value: T) {
        const color = LGraphCanvas.node_colors["blue"]
        super(name)
        this.value = writable(value)
        this.color ||= color.color
        this.bgColor ||= color.bgColor
        this.displayWidget = this.addWidget<ITextWidget>(
            "text",
            "Value",
            ""
        );
        this.displayWidget.disabled = true; // prevent editing
        this.unsubscribe = this.value.subscribe(this.onValueUpdated.bind(this))
    }

    addPropertyAsOutput(propertyName: string, type: string) {
        if (this.shownOutputProperties["@" + propertyName])
            return;

        if (!(propertyName in this.properties)) {
            throw `No property named ${propertyName} found!`
        }

        this.shownOutputProperties["@" + propertyName] = { type, index: this.outputs.length }
        this.addOutput("@" + propertyName, type)
    }

    formatValue(value: any): string {
        return Watch.toString(value)
    }

    override changeMode(modeTo: NodeMode): boolean {
        const result = super.changeMode(modeTo);
        this.notifyPropsChanged();
        return result;
    }

    private onValueUpdated(value: any) {
        // console.debug("[Widget] valueUpdated", this, value)
        this.displayWidget.value = this.formatValue(value)

        if (this.outputSlotName !== null) {
            const outputIndex = this.findOutputSlotIndexByName(this.outputSlotName)
            if (outputIndex !== -1)
                this.setOutputData(outputIndex, get(this.value))
        }

        if (this.changedEventName !== null && !this._noChangedEvent) {
            if (!this.delayChangedEvent)
                this.triggerChangeEvent(get(this.value))
            else {
                // console.debug("[Widget] queueChangeEvent", this, value)
                this._aboutToChange = 2; // wait 1.5-2 frames, in case we're already in the middle of executing the graph
                this._aboutToChangeValue = get(this.value);
            }
        }
        this._noChangedEvent = false;
    }

    private triggerChangeEvent(value: any) {
        // console.debug("[Widget] trigger changed", this, value)
        this.trigger(this.changedEventName, value)
    }

    parseValue(value: any): T { return value as T };

    getValue(): T {
        return get(this.value);
    }

    setValue(value: any, noChangedEvent: boolean = false) {
        if (noChangedEvent)
            this._noChangedEvent = true;

        const parsed = this.parseValue(value)
        this.value.set(parsed)

        // In case value.set() does not trigger onValueUpdated, we need to reset
        // the counter here also.
        this._noChangedEvent = false;
    }

    override onPropertyChanged(property: string, value: any, prevValue?: any) {
        if (this.shownOutputProperties != null) {
            const data = this.shownOutputProperties[property]
            if (data)
                this.setOutputData(data.index, value)
        }
    }

    /*
     * Logic to run if this widget can be treated as output (slider, combo, text)
     */
    override onExecute(param: any, options: object) {
        if (this.outputSlotName != null) {
            const outputIndex = this.findOutputSlotIndexByName(this.outputSlotName)
            if (outputIndex !== -1)
                this.setOutputData(outputIndex, get(this.value))
        }
        for (const propName in this.shownOutputProperties) {
            const data = this.shownOutputProperties[propName]
            this.setOutputData(data.index, this.properties[propName])
        }

        // Fire a pending change event after one full step of the graph has
        // finished processing
        if (this._aboutToChange > 0) {
            this._aboutToChange -= 1
            if (this._aboutToChange <= 0) {
                const value = this._aboutToChangeValue;
                this._aboutToChange = 0;
                this._aboutToChangeValue = null;
                this.triggerChangeEvent(value);
            }
        }
    }

    override onAction(action: any, param: any, options: { action_call?: string }) {
        if (action === this.storeActionName) {
            let noChangedEvent = false;
            let value = param;
            if (param != null && typeof param === "object" && "value" in param) {
                value = param.value
                if ("noChangedEvent" in param)
                    noChangedEvent = Boolean(param.noChangedEvent)
            }
            this.setValue(value, noChangedEvent)
        }
    }

    onConnectOutput(
        outputIndex: number,
        inputType: INodeInputSlot["type"],
        input: INodeInputSlot,
        inputNode: LGraphNode,
        inputIndex: number
    ): boolean {
        const anyConnected = range(this.outputs.length).some(i => this.getOutputLinks(i).length > 0);

        if (this.autoConfig && "config" in input && !anyConnected && (input as IComfyInputSlot).widgetNodeType === this.type) {
            this.doAutoConfig(input as IComfyInputSlot)
        }

        return true;
    }

    doAutoConfig(input: IComfyInputSlot, options: AutoConfigOptions = { setDefaultValue: true, setWidgetTitle: true }) {
        // Copy properties from default config in input slot
        const comfyInput = input as IComfyInputSlot;
        for (const key in comfyInput.config) {
            if (options.includeProperties == null || options.includeProperties.has(key))
                this.setProperty(key, comfyInput.config[key])
        }

        if (options.setDefaultValue) {
            if ("defaultValue" in this.properties)
                this.setValue(this.properties.defaultValue)
        }

        if (options.setWidgetTitle) {
            const widget = layoutState.findLayoutForNode(this.id as ComfyNodeID)
            if (widget && input.name !== "") {
                widget.attrs.title = input.name;
            }
        }

        // console.debug("Property copy", input, this.properties)

        this.setValue(get(this.value))

        this.onAutoConfig(input);

        this.notifyPropsChanged();
    }

    onAutoConfig(input: IComfyInputSlot) {
    }

    notifyPropsChanged() {
        const layoutEntry = layoutState.findLayoutEntryForNode(this.id as ComfyNodeID)
        if (layoutEntry && layoutEntry.parent) {
            layoutEntry.parent.attrsChanged.set(get(layoutEntry.parent.attrsChanged) + 1)
        }
        // console.debug("propsChanged", this)
        this.propsChanged.set(get(this.propsChanged) + 1)

    }

    override onConnectionsChange(
        type: LConnectionKind,
        slotIndex: number,
        isConnected: boolean,
        link: LLink,
        ioSlot: (INodeOutputSlot | INodeInputSlot)
    ): void {
        super.onConnectionsChange(type, slotIndex, isConnected, link, ioSlot);
        this.clampConfig();
    }

    clampConfig() {
        let changed = false;
        for (const link of this.getOutputLinks(0)) {
            if (link) { // can be undefined if the link is removed
                const node = this.graph._nodes_by_id[link.target_id]
                if (node) {
                    const input = node.inputs[link.target_slot]
                    if (input && "config" in input) {
                        this.clampOneConfig(input as IComfyInputSlot)
                        changed = true;
                    }
                }
            }
        }

        // Force reactivity change so the frontend can be updated with the new props
        this.notifyPropsChanged();
    }

    clampOneConfig(input: IComfyInputSlot) { }

    override onSerialize(o: SerializedLGraphNode) {
        (o as any).comfyValue = get(this.value);
        (o as any).shownOutputProperties = this.shownOutputProperties
        super.onSerialize(o);
    }

    override onConfigure(o: SerializedLGraphNode) {
        const value = (o as any).comfyValue || LiteGraph.cloneObject(this.defaultValue);
        this.value.set(value);
        this.shownOutputProperties = (o as any).shownOutputProperties;
    }

    override stripUserState(o: SerializedLGraphNode) {
        super.stripUserState(o);
        (o as any).comfyValue = this.defaultValue;
        o.properties.defaultValue = null;
    }
}
