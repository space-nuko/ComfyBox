import type { SerializedAppState } from "./components/ComfyApp"

const blankGraph: SerializedAppState = {
    createdBy: "ComfyBox",
    version: 1,
    workflow: {
        last_node_id: 0,
        last_link_id: 0,
        nodes: [],
        links: [],
        groups: [],
        config: {},
        extra: {},
        version: 0
    },
    layout: {
        root: null,
        allItems: {},
        attrs: {
            queuePromptButtonName: "Queue Prompt",
            queuePromptButtonRunWorkflow: true
        }
    }
}

export { blankGraph }
