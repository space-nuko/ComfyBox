import { LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode from "./ComfyGraphNode";

export default class ComfyRegionToCoordsNode extends ComfyGraphNode {
    static slotLayout: SlotLayout = {
        inputs: [
            { name: "in", type: "COMFYBOX_REGION" },
        ],
        outputs: [
            // same order as conditioning nodes
            { name: "width", type: "number" },
            { name: "height", type: "number" },
            { name: "x", type: "number" },
            { name: "y", type: "number" },
        ],
    }

    override onExecute() {
        const value = this.getInputData(0);
        if (!Array.isArray(value))
            return;

        this.setOutputData(0, value[2])
        this.setOutputData(1, value[3])
        this.setOutputData(2, value[0])
        this.setOutputData(3, value[1])
    }
}

LiteGraph.registerNodeType({
    class: ComfyRegionToCoordsNode,
    title: "Comfy.RegionToCoords",
    desc: "Converts a COMFYBOX_REGION to four outputs of [width, height, x, y]",
    type: "utils/region_to_coords"
})
