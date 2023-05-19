import type { Progress, SerializedPrompt, SerializedPromptInputsForNode, SerializedPromptInputsAll, SerializedPromptOutputs } from "./components/ComfyApp";
import type TypedEmitter from "typed-emitter";
import EventEmitter from "events";
import type { ComfyImageLocation } from "$lib/utils";
import type { SerializedLGraph, UUID } from "@litegraph-ts/core";
import type { SerializedLayoutState } from "./stores/layoutState";
import type { ComfyNodeDef } from "./ComfyNodeDef";

export type ComfyPromptRequest = {
    client_id?: string,
    prompt: SerializedPromptInputsAll,
    extra_data: ComfyBoxPromptExtraData,
    front?: boolean,
    number?: number
}

export type QueueItemType = "queue" | "history";

export type ComfyAPIStatusExecInfo = {
    queueRemaining: number | "X";
}

export type ComfyAPIStatusResponse = {
    execInfo?: ComfyAPIStatusExecInfo,
    error?: string
}

export type ComfyAPIQueueResponse = {
    running: ComfyAPIHistoryItem[],
    pending: ComfyAPIHistoryItem[],
    error?: string
}

export type ComfyNodeID = UUID; // To distinguish from Litegraph NodeID
export type PromptID = UUID; // UUID

export type ComfyAPIHistoryItem = [
    number,   // prompt number
    PromptID,
    SerializedPromptInputsAll,
    ComfyBoxPromptExtraData,
    ComfyNodeID[]  // good outputs
]

export type ComfyAPIPromptResponse = {
    promptID?: PromptID,
    error?: string
}

export type ComfyAPIHistoryEntry = {
    prompt: ComfyAPIHistoryItem,
    outputs: SerializedPromptOutputs
}

export type ComfyAPIHistoryResponse = {
    history: Record<PromptID, ComfyAPIHistoryEntry>,
    error?: string
}

export type ComfyPromptPNGInfo = {
    workflow: SerializedLGraph,
    comfyBoxLayout: SerializedLayoutState,
    comfyBoxSubgraphs: string[],
}

export type ComfyBoxPromptExtraData = ComfyUIPromptExtraData & {
    thumbnails?: ComfyImageLocation[],
}

export type ComfyUIPromptExtraData = {
    extra_pnginfo?: ComfyPromptPNGInfo,
    client_id?: UUID, // UUID
}

type ComfyAPIEvents = {
    status: (status: ComfyAPIStatusResponse | null, error?: Error | null) => void,
    progress: (progress: Progress) => void,
    reconnecting: () => void,
    reconnected: () => void,
    executing: (promptID: PromptID | null, runningNodeID: ComfyNodeID | null) => void,
    executed: (promptID: PromptID, nodeID: ComfyNodeID, output: SerializedPromptOutputs) => void,
    execution_start: (promptID: PromptID) => void,
    execution_cached: (promptID: PromptID, nodes: ComfyNodeID[]) => void,
    execution_error: (promptID: PromptID, message: string) => void,
}

export default class ComfyAPI {
    private eventBus: TypedEmitter<ComfyAPIEvents> = new EventEmitter() as TypedEmitter<ComfyAPIEvents>;

    socket: WebSocket | null = null;
    clientId: string | null = null;
    hostname: string | null = null;
    port: number | null = 8188;

    addEventListener<E extends keyof ComfyAPIEvents>(type: E, callback: ComfyAPIEvents[E]) {
        this.eventBus.addListener(type, callback);
    }

    /**
     * Poll status  for colab and other things that don't support websockets.
     */
    private pollQueue() {
        setInterval(async () => {
            try {
                const resp = await fetch(this.getBackendUrl() + "/prompt");
                const status = await resp.json();
                this.eventBus.emit("status", { execInfo: { queueRemaining: status.exec_info.queue_remaining } });
            } catch (error) {
                this.eventBus.emit("status", { error: error.toString() });
            }
        }, 1000);
    }

    private getBackendUrl(): string {
        const hostname = this.hostname || location.hostname;
        const port = this.port || location.port;
        return `${window.location.protocol}//${hostname}:${port}`
    }

    /**
     * Creates and connects a WebSocket for realtime updates
     * @param {boolean} isReconnect If the socket is connection is a reconnect attempt
     */
    private createSocket(isReconnect: boolean = false) {
        if (this.socket) {
            return;
        }

        let opened = false;
        let existingSession = sessionStorage["Comfy.SessionId"] || "";
        if (existingSession) {
            existingSession = "?clientId=" + existingSession;
        }

        const hostname = this.hostname || location.hostname;
        const port = this.port || location.port;

        this.socket = new WebSocket(
            `ws${window.location.protocol === "https:" ? "s" : ""}://${hostname}:${port}/ws${existingSession}`
        );

        this.socket.addEventListener("open", () => {
            opened = true;
            if (isReconnect) {
                this.eventBus.emit("reconnected");
            }
        });

        this.socket.addEventListener("error", () => {
            if (this.socket) this.socket.close();
            if (!isReconnect && !opened) {
                this.pollQueue();
            }
        });

        this.socket.addEventListener("close", () => {
            setTimeout(() => {
                this.socket = null;
                this.createSocket(true);
            }, 300);
            if (opened) {
                this.eventBus.emit("status", null);
                this.eventBus.emit("reconnecting");
            }
        });

        this.socket.addEventListener("message", (event) => {
            try {
                const msg = JSON.parse(event.data);
                switch (msg.type) {
                    case "status":
                        if (msg.data.sid) {
                            this.clientId = msg.data.sid;
                            sessionStorage["Comfy.SessionId"] = this.clientId;
                        }
                        this.eventBus.emit("status", { execInfo: { queueRemaining: msg.data.status.exec_info.queue_remaining } });
                        break;
                    case "progress":
                        this.eventBus.emit("progress", msg.data as Progress);
                        break;
                    case "executing":
                        this.eventBus.emit("executing", msg.data.prompt_id, msg.data.node);
                        break;
                    case "executed":
                        this.eventBus.emit("executed", msg.data.prompt_id, msg.data.node, msg.data.output);
                        break;
                    case "execution_start":
                        this.eventBus.emit("execution_start", msg.data.prompt_id);
                        break;
                    case "execution_cached":
                        this.eventBus.emit("execution_cached", msg.data.prompt_id, msg.data.nodes);
                        break;
                    case "execution_error":
                        this.eventBus.emit("execution_error", msg.data.prompt_id, msg.data.message);
                        break;
                    default:
                        console.warn("Unhandled message:", event.data);
                }
            } catch (error) {
                console.error("Error handling message", event.data, error);
            }
        });
    }

    /**
     * Initialises sockets and realtime updates
     */
    init() {
        this.createSocket();
    }

    /**
     * Gets a list of extension urls
     * @returns An array of script urls to import
     */
    async getExtensions(): Promise<any> {
        return fetch(this.getBackendUrl() + `/extensions`, { cache: "no-store" })
            .then(resp => resp.json())
    }

    /**
     * Gets a list of embedding names
     * @returns An array of script urls to import
     */
    async getEmbeddings(): Promise<any> {
        return fetch(this.getBackendUrl() + "/embeddings", { cache: "no-store" })
            .then(resp => resp.json())
    }

    /**
     * Loads node object definitions for the graph
     * @returns The node definitions
     */
    async getNodeDefs(): Promise<Record<ComfyNodeID, ComfyNodeDef>> {
        return fetch(this.getBackendUrl() + "/object_info", { cache: "no-store" })
            .then(resp => resp.json())
    }

    /**
     *
     * @param {number} number The index at which to queue the prompt, passing -1 will insert the prompt at the front of the queue
     * @param {object} prompt The prompt data to queue
     */
    async queuePrompt(body: ComfyPromptRequest): Promise<ComfyAPIPromptResponse> {
        body.client_id = this.clientId;

        if (body.number === -1) {
            body.front = true;
        }

        let postBody = null;
        try {
            postBody = JSON.stringify(body)
        }
        catch (error) {
            return Promise.reject({ error: error.toString() })
        }

        return fetch(this.getBackendUrl() + "/prompt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: postBody
        })
            .then(async (res) => {
                if (res.status != 200) {
                    throw await res.json()
                }
                return res.json()
            })
            .then(raw => { return { promptID: raw.prompt_id } })
            .catch(error => { return error })
    }

    /**
     * Gets the current state of the queue
     * @returns The currently running and queued items
     */
    async getQueue(): Promise<ComfyAPIQueueResponse> {
        return fetch(this.getBackendUrl() + "/queue")
            .then(res => res.json())
            .then(data => {
                return {
                    running: data.queue_running,
                    pending: data.queue_pending,
                }
            })
            .catch(error => { return { running: [], pending: [], error } })
    }

    /**
     * Gets the prompt execution history
     * @returns Prompt history including node outputs
     */
    async getHistory(): Promise<ComfyAPIHistoryResponse> {
        return fetch(this.getBackendUrl() + "/history")
            .then(res => res.json())
            .then(history => { return { history } })
            .catch(error => { return { history: {}, error } })
    }

    /**
     * Sends a POST request to the API
     * @param {*} type The endpoint to post to
     * @param {*} body Optional POST data
     */
    private async postItem(type: QueueItemType, body: any): Promise<Response> {
        try {
            body = body ? JSON.stringify(body) : body
        }
        catch (error) {
            return Promise.reject(error)
        }

        return fetch(this.getBackendUrl() + "/" + type, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body
        });
    }

    /**
     * Deletes an item from the specified list
     * @param {string} type The type of item to delete, queue or history
     * @param {number} id The id of the item to delete
     */
    async deleteItem(type: QueueItemType, id: number): Promise<Response> {
        return this.postItem(type, { delete: [id] });
    }

    /**
     * Clears the specified list
     * @param {string} type The type of list to clear, queue or history
     */
    async clearItems(type: QueueItemType): Promise<Response> {
        return this.postItem(type, { clear: true });
    }

    /**
     * Interrupts the execution of the running prompt
     */
    async interrupt(): Promise<Response> {
        return fetch(this.getBackendUrl() + "/interrupt", { method: "POST" });
    }
}
