import type SerializedAppState from "./ComfyApp"

const defaultGraph: SerializedAppState = {
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
  panes: {}
}

export default defaultGraph;
