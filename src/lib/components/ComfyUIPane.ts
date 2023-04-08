import type { LGraphNode } from "@litegraph-ts/core"

export type DragItem = {
    id: number,
    node: LGraphNode,
    isNodeExecuting?: boolean
}
