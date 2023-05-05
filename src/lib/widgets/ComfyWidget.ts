import type ComfyGraphNode from "$lib/nodes/ComfyGraphNode";
import type { IWidget, LGraphNode, SerializedLGraphNode, Vector2, WidgetCallback, WidgetTypes } from "@litegraph-ts/core";

export default abstract class ComfyWidget<T = any, V = any> implements IWidget<T, V> {
    name: string;
    value: V;
    node: ComfyGraphNode;

    constructor(name: string, value: V, node: ComfyGraphNode) {
        this.name = name;
        this.value = value
        this.node = node;
    }

    isVirtual?: boolean;
    options?: T;
    type?: WidgetTypes | string | any;
    y?: number;
    property?: string;
    last_y?: number;
    width?: number;
    clicked?: boolean;
    marker?: boolean;
    disabled?: boolean;
    callback?: WidgetCallback<this>;

    setValue(value: V) {
        this.value = value;
    }

    draw?(ctx: CanvasRenderingContext2D, node: LGraphNode, width: number, posY: number, height: number): void;

    mouse?(event: MouseEvent, pos: Vector2, node: LGraphNode): boolean;

    computeSize?(width: number): [number, number];

    afterQueued?(): void;

    serializeValue?(serialized: SerializedLGraphNode<LGraphNode>, slot: number): Promise<any>;
}
