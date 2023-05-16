import { LGraph, LiteGraph, Subgraph, type SlotLayout } from "@litegraph-ts/core"
import { Watch } from "@litegraph-ts/nodes-basic"
import { expect } from 'vitest'
import UnitTest from "./UnitTest"
import ComfyGraph from "$lib/ComfyGraph";
import ComfyPromptSerializer from "$lib/components/ComfyPromptSerializer";
import { ComfyBackendNode } from "$lib/nodes/ComfyBackendNode";
import ComfyGraphNode from "$lib/nodes/ComfyGraphNode";
import { graphToGraphVis } from "$lib/utils";

class MockBackendInput extends ComfyGraphNode {
    override isBackendNode = true;
    comfyClass: string = "MockBackendInput";

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "in", type: "*" },
        ],
    }
}

LiteGraph.registerNodeType({
    class: MockBackendInput,
    title: "Test.MockBackendInput",
    desc: "one input",
    type: "test/input"
})

class MockBackendLink extends ComfyGraphNode {
    override isBackendNode = true;
    comfyClass: string = "MockBackendLink";

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "in", type: "*" },
        ],
        outputs: [
            { name: "out", type: "*" },
        ],
    }
}

LiteGraph.registerNodeType({
    class: MockBackendLink,
    title: "Test.MockBackendLink",
    desc: "one input, one output",
    type: "test/link"
})

class MockBackendOutput extends ComfyGraphNode {
    override isBackendNode = true;
    comfyClass: string = "MockBackendOutput";

    static slotLayout: SlotLayout = {
        outputs: [
            { name: "out", type: "*" },
        ],
    }
}

LiteGraph.registerNodeType({
    class: MockBackendOutput,
    title: "Test.MockBackendOutput",
    desc: "one output",
    type: "test/output"
})

export default class ComfyPromptSerializerTests extends UnitTest {
    test__serialize__shouldIgnoreFrontend() {
        const ser = new ComfyPromptSerializer();
        const graph = new ComfyGraph();

        const nodeA = LiteGraph.createNode(Watch)
        const nodeB = LiteGraph.createNode(Watch)

        graph.add(nodeA)
        graph.add(nodeB)

        const result = ser.serialize(graph)

        expect(result.output).toEqual({})
    }

    test__serialize__shouldSerializeBackendNodes() {
        const ser = new ComfyPromptSerializer();
        const graph = new ComfyGraph();

        const input = LiteGraph.createNode(MockBackendInput)
        const link = LiteGraph.createNode(MockBackendLink)
        const output = LiteGraph.createNode(MockBackendOutput)

        graph.add(input)
        graph.add(link)
        graph.add(output)

        output.connect(0, link, 0)
        link.connect(0, input, 0)

        const result = ser.serialize(graph)

        console.warn(result.output)
        expect(Object.keys(result.output)).toHaveLength(3);
        expect(result.output[input.id].inputs["in"]).toBeInstanceOf(Array)
        expect(result.output[input.id].inputs["in"][0]).toEqual(link.id)
        expect(result.output[link.id].inputs["in"]).toBeInstanceOf(Array)
        expect(result.output[link.id].inputs["in"][0]).toEqual(output.id)
        expect(Object.keys(result.output[output.id].inputs)).toHaveLength(0);
    }

    test__serialize__shouldFollowSubgraphs() {
        const ser = new ComfyPromptSerializer();
        const graph = new ComfyGraph();

        const output = LiteGraph.createNode(MockBackendOutput)
        const link = LiteGraph.createNode(MockBackendLink)
        const input = LiteGraph.createNode(MockBackendInput)

        const subgraph = LiteGraph.createNode(Subgraph)
        const graphInput = subgraph.addGraphInput("testIn", "number")
        const graphOutput = subgraph.addGraphOutput("testOut", "number")

        graph.add(subgraph)
        graph.add(output)
        subgraph.subgraph.add(link)
        graph.add(input)

        output.connect(0, subgraph, 0)
        graphInput.innerNode.connect(0, link, 0)
        link.connect(0, graphOutput.innerNode, 0)
        subgraph.connect(0, input, 0)

        const result = ser.serialize(graph)

        console.warn(graphToGraphVis(graph))
        console.warn(result.output)
        expect(Object.keys(result.output)).toHaveLength(3);
        expect(result.output[input.id].inputs["in"]).toBeInstanceOf(Array)
        expect(result.output[input.id].inputs["in"][0]).toEqual(link.id)
        expect(result.output[link.id].inputs["in"]).toBeInstanceOf(Array)
        expect(result.output[link.id].inputs["in"][0]).toEqual(output.id)
        expect(result.output[output.id].inputs).toEqual({})
    }
}
