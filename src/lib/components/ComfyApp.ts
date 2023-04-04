import { LiteGraph, LGraph, LGraphCanvas, LGraphNode } from "litegraph.js";
import type { LGraphNodeBase } from "litegraph.js";
import ComfyAPI from "$lib/api"
import { ComfyWidgets } from "$lib/widgets"
import defaultGraph from "$lib/defaultGraph"
import { getPngMetadata, importA1111 } from "$lib/pnginfo";

type QueueItem = { num: number, batchCount: number }

export default class ComfyApp {
    api: ComfyAPI;
    canvasEl: HTMLCanvasElement | null = null;
    canvasCtx: CanvasRenderingContext2D | null = null;
    lGraph: LGraph | null = null;
    lCanvas: LGraphCanvas | null = null;
    nodeOutputs: Record<string, any> = {};

    private queueItems: QueueItem[] = [];
    private processingQueue: boolean = false;

    constructor() {
        this.api = new ComfyAPI();
    }

    async setup(): Promise<void> {
        this.addProcessMouseHandler();
        this.addProcessKeyHandler();

        this.canvasEl = document.getElementById("graph-canvas") as HTMLCanvasElement;
        this.lGraph = new LGraph();
        this.lCanvas = new LGraphCanvas(this.canvasEl, this.lGraph);
        this.canvasCtx = this.canvasEl.getContext("2d");

		LiteGraph.release_link_on_empty_shows_menu = true;
		LiteGraph.alt_drag_do_clone_nodes = true;

		this.lGraph.start();

		// await this.#invokeExtensionsAsync("init");
		await this.registerNodes();

		// Load previous workflow
		let restored = false;
		try {
			const json = localStorage.getItem("workflow");
			if (json) {
				const workflow = JSON.parse(json);
				this.loadGraphData(workflow);
				restored = true;
			}
		} catch (err) {
			console.error("Error loading previous workflow", err);
		}

		// We failed to restore a workflow so load the default
		if (!restored) {
			this.loadGraphData();
		}

		// Save current workflow automatically
		setInterval(() => localStorage.setItem("workflow", JSON.stringify(this.lGraph.serialize())), 1000);

		// this.#addDrawNodeHandler();
		// this.#addDrawGroupsHandler();
		// this.#addApiUpdateHandlers();
		// this.#addDropHandler();
		// this.#addPasteHandler();
		// this.#addKeyboardHandler();

		// await this.#invokeExtensionsAsync("setup");

		// Ensure the canvas fills the window
        this.resizeCanvas();
		window.addEventListener("resize", this.resizeCanvas.bind(this));

        return Promise.resolve();
    }

    resizeCanvas() {
        this.canvasEl.width = this.canvasEl.parentElement.clientWidth;
        this.canvasEl.height = this.canvasEl.parentElement.clientHeight;
        this.lCanvas.draw(true, true);
    }

    private addProcessMouseHandler() {

    }

    private addProcessKeyHandler() {

    }

    private async registerNodes() {
        const app = this;

		// Load node definitions from the backend
        const defs = await this.api.getNodeDefs();
		// await this.#invokeExtensionsAsync("addCustomNodeDefs", defs);

		// Generate list of known widgets
		const widgets = ComfyWidgets;
        // const widgets = Object.assign(
		// 	{},
		// 	ComfyWidgets,
		// 	...(await this.#invokeExtensionsAsync("getCustomWidgets")).filter(Boolean)
		// );

		// Register a node for each definition
		for (const nodeId in defs) {
			const nodeData = defs[nodeId];
			const node: LGraphNodeBase = Object.assign(
				function ComfyNode(this: LGraphNode) {
					var inputs = nodeData["input"]["required"];
					if (nodeData["input"]["optional"] != undefined){
					    inputs = Object.assign({}, nodeData["input"]["required"], nodeData["input"]["optional"])
					}
					const config = { minWidth: 1, minHeight: 1 };
					for (const inputName in inputs) {
						const inputData = inputs[inputName];
						const type = inputData[0];

						if(inputData[1]?.forceInput) {
							this.addInput(inputName, type);
						} else {
							if (Array.isArray(type)) {
								// Enums
								Object.assign(config, widgets.COMBO(this, inputName, inputData, app) || {});
							} else if (`${type}:${inputName}` in widgets) {
								// Support custom widgets by Type:Name
								Object.assign(config, widgets[`${type}:${inputName}`](this, inputName, inputData, app) || {});
							} else if (type in widgets) {
								// Standard type widgets
								Object.assign(config, widgets[type](this, inputName, inputData, app) || {});
							} else {
								// Node connection inputs
								this.addInput(inputName, type);
							}
						}
					}

					for (const o in nodeData["output"]) {
						const output = nodeData["output"][o];
						const outputName = nodeData["output_name"][o] || output;
						this.addOutput(outputName, output);
					}

					const s = this.computeSize();
					s[0] = Math.max(config.minWidth, s[0] * 1.5);
					s[1] = Math.max(config.minHeight, s[1]);
					this.size = s;
					this.serialize_widgets = true;

					// app.#invokeExtensionsAsync("nodeCreated", this);

                    return this;
				},
				{
					title: nodeData.name,
					comfyClass: nodeData.name,
				}
			);
			node.prototype.comfyClass = nodeData.name;

			// this.#addNodeContextMenuHandler(node);
			// this.#addDrawBackgroundHandler(node, app);

			// await this.#invokeExtensionsAsync("beforeRegisterNodeDef", node, nodeData);
			LiteGraph.registerNodeType(nodeId, node);
			node.category = nodeData.category;
		}

		// await this.#invokeExtensionsAsync("registerCustomNodes");
    }

	/**
	 * Populates the graph with the specified workflow data
	 * @param {*} graphData A serialized graph object
	 */
	loadGraphData(graphData: any = null) {
		this.clean();

		if (!graphData) {
			graphData = structuredClone(defaultGraph);
		}

		// Patch T2IAdapterLoader to ControlNetLoader since they are the same node now
		for (let n of graphData.nodes) {
			if (n.type == "T2IAdapterLoader") n.type = "ControlNetLoader";
		}

		this.lGraph.configure(graphData);

		for (const node of this.lGraph._nodes) {
			const size = node.computeSize();
			size[0] = Math.max(node.size[0], size[0]);
			size[1] = Math.max(node.size[1], size[1]);
			node.size = size;

			if (node.widgets) {
				// If you break something in the backend and want to patch workflows in the frontend
				// This is the place to do this
				for (let widget of node.widgets) {
					if (node.type == "KSampler" || node.type == "KSamplerAdvanced") {
						if (widget.name == "sampler_name") {
							if (widget.value.constructor === String && widget.value.startsWith("sample_")) {
								widget.value = widget.value.slice(7);
							}
						}
					}
				}
			}

			// this.#invokeExtensions("loadedGraphNode", node);
		}
	}

	/**
	 * Converts the current graph workflow for sending to the API
	 * @returns The workflow and node links
	 */
	async graphToPrompt() {
		const workflow = this.lGraph.serialize();
		const output = {};
		// Process nodes in order of execution
		for (const node of this.lGraph.computeExecutionOrder(false, null)) {
			const n = workflow.nodes.find((n) => n.id === node.id);

			if (node.isVirtualNode) {
				// Don't serialize frontend only nodes but let them make changes
				if (node.applyToGraph) {
					node.applyToGraph(workflow);
				}
				continue;
			}

			if (node.mode === 2) {
				// Don't serialize muted nodes
				continue;
			}

			const inputs = {};
			const widgets = node.widgets;

			// Store all widget values
			if (widgets) {
				for (const i in widgets) {
					const widget = widgets[i];
					if (!widget.options || widget.options.serialize !== false) {
						inputs[widget.name] = widget.serializeValue ? await widget.serializeValue(n, i) : widget.value;
					}
				}
			}

			// Store all node links
			for (let i in node.inputs) {
				let parent = node.getInputNode(i);
				if (parent) {
					let link = node.getInputLink(i);
					while (parent && parent.isVirtualNode) {
						link = parent.getInputLink(link.origin_slot);
						if (link) {
							parent = parent.getInputNode(link.origin_slot);
						} else {
							parent = null;
						}
					}

					if (link) {
						inputs[node.inputs[i].name] = [String(link.origin_id), parseInt(link.origin_slot)];
					}
				}
			}

			output[String(node.id)] = {
				inputs,
				class_type: node.comfyClass,
			};
		}

		// Remove inputs connected to removed nodes

		for (const o in output) {
			for (const i in output[o].inputs) {
				if (Array.isArray(output[o].inputs[i])
					&& output[o].inputs[i].length === 2
					&& !output[output[o].inputs[i][0]]) {
					delete output[o].inputs[i];
				}
			}
		}

		return { workflow, output };
	}

	async queuePrompt(num: number, batchCount: number = 1) {
		this.queueItems.push({ num, batchCount });

		// Only have one action process the items so each one gets a unique seed correctly
		if (this.processingQueue) {
			return;
		}

		this.processingQueue = true;
		try {
			while (this.queueItems.length) {
				({ num, batchCount } = this.queueItems.pop());
                console.log(`Queue get! ${num} ${batchCount}`);

				for (let i = 0; i < batchCount; i++) {
					const p = await this.graphToPrompt();

					try {
						await this.api.queuePrompt(num, p);
					} catch (error) {
						// this.ui.dialog.show(error.response || error.toString());
                        console.error(error.response || error.toString())
						break;
					}

					for (const n of p.workflow.nodes) {
						const node = this.lGraph.getNodeById(n.id);
						if (node.widgets) {
							for (const widget of node.widgets) {
								// Allow widgets to run callbacks after a prompt has been queued
								// e.g. random seed after every gen
								// if (widget.afterQueued) {
								// 	widget.afterQueued();
								// }
							}
						}
					}

					this.lCanvas.draw(true, true);
					// await this.ui.queue.update();
				}
			}
		} finally {
            console.log("Queue finished!");
			this.processingQueue = false;
		}
	}

	/**
	 * Loads workflow data from the specified file
	 */
	async handleFile(file: File) {
		if (file.type === "image/png") {
			const pngInfo = await getPngMetadata(file);
			if (pngInfo) {
				if (pngInfo.workflow) {
					this.loadGraphData(JSON.parse(pngInfo.workflow));
				} else if (pngInfo.parameters) {
					importA1111(this.lGraph, pngInfo.parameters);
				}
			}
		} else if (file.type === "application/json" || file.name.endsWith(".json")) {
			const reader = new FileReader();
			reader.onload = () => {
				this.loadGraphData(JSON.parse(reader.result));
			};
			reader.readAsText(file);
		}
	}

	// registerExtension(extension) {
	// 	if (!extension.name) {
	// 		throw new Error("Extensions must have a 'name' property.");
	// 	}
	// 	if (this.extensions.find((ext) => ext.name === extension.name)) {
	// 		throw new Error(`Extension named '${extension.name}' already registered.`);
	// 	}
	// 	this.extensions.push(extension);
	// }

	/**
	 * Refresh combo list on whole nodes
	 */
	async refreshComboInNodes() {
		const defs = await this.api.getNodeDefs();

		for(let nodeNum in this.lGraph._nodes) {
			const node = this.lGraph._nodes[nodeNum];

			const def = defs[node.type];

			for(const widgetNum in node.widgets) {
				const widget = node.widgets[widgetNum]

				if(widget.type == "combo" && def["input"]["required"][widget.name] !== undefined) {
					widget.options.values = def["input"]["required"][widget.name][0];

					if(!widget.options.values.includes(widget.value)) {
						widget.value = widget.options.values[0];
					}
				}
			}
		}
	}

	/**
	 * Clean current state
	 */
	clean() {
		this.nodeOutputs = {};
	}
}
