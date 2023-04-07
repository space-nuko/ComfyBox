type PromptRequestBody = {
    client_id: string,
    prompt: any,
    extra_data: any,
    front: boolean,
    number: number | null
}

export type QueueItemType = "queue" | "history";

export default class ComfyAPI extends EventTarget {
    private registered: Set<string> = new Set<string>();

    socket: WebSocket | null = null;
    clientId: string | null = null;
    hostname: string | null = null;
    port: number | null = 8188;

    constructor() {
        super();
    }

    override addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean) {
        super.addEventListener(type, callback, options);
        this.registered.add(type);
    }

    /**
     * Poll status  for colab and other things that don't support websockets.
     */
    private pollQueue() {
        setInterval(async () => {
            try {
                const resp = await fetch(this.getBackendUrl() + "/prompt");
                const status = await resp.json();
                this.dispatchEvent(new CustomEvent("status", { detail: status }));
            } catch (error) {
                this.dispatchEvent(new CustomEvent("status", { detail: null }));
            }
        }, 1000);
    }

    private getBackendUrl(): string {
        const hostname = this.hostname || location.hostname;
        const port = this.port || location.port;
        console.log(hostname)
        console.log(port)
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
                this.dispatchEvent(new CustomEvent("reconnected"));
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
                this.dispatchEvent(new CustomEvent("status", { detail: null }));
                this.dispatchEvent(new CustomEvent("reconnecting"));
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
                        this.dispatchEvent(new CustomEvent("status", { detail: msg.data.status }));
                        break;
                    case "progress":
                        this.dispatchEvent(new CustomEvent("progress", { detail: msg.data }));
                        break;
                    case "executing":
                        this.dispatchEvent(new CustomEvent("executing", { detail: msg.data.node }));
                        break;
                    case "executed":
                        this.dispatchEvent(new CustomEvent("executed", { detail: msg.data }));
                        break;
                    default:
                        if (this.registered.has(msg.type)) {
                            this.dispatchEvent(new CustomEvent(msg.type, { detail: msg.data }));
                        } else {
                            throw new Error("Unknown message type");
                        }
                }
            } catch (error) {
                console.warn("Unhandled message:", event.data);
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
    async getExtensions() {
        const resp = await fetch(this.getBackendUrl() + `/extensions`, { cache: "no-store" });
        return await resp.json();
    }

    /**
     * Gets a list of embedding names
     * @returns An array of script urls to import
     */
    async getEmbeddings() {
        const resp = await fetch(this.getBackendUrl() + "/embeddings", { cache: "no-store" });
        return await resp.json();
    }

    /**
     * Loads node object definitions for the graph
     * @returns The node definitions
     */
    async getNodeDefs() {
        const resp = await fetch(this.getBackendUrl() + "/object_info", { cache: "no-store" });
        return await resp.json();
    }

    /**
     *
     * @param {number} number The index at which to queue the prompt, passing -1 will insert the prompt at the front of the queue
     * @param {object} prompt The prompt data to queue
     */
    async queuePrompt(number: number, { output, workflow }) {
        const body: PromptRequestBody = {
            client_id: this.clientId,
            prompt: output,
            extra_data: { extra_pnginfo: { workflow } },
            front: false,
            number: null
        };

        if (number === -1) {
            body.front = true;
        } else if (number != 0) {
            body.number = number;
        }

        const res = await fetch(this.getBackendUrl() + "/prompt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (res.status !== 200) {
            throw {
                response: await res.text(),
            };
        }
    }

    /**
     * Loads a list of items (queue or history)
     * @param {string} type The type of items to load, queue or history
     * @returns The items of the specified type grouped by their status
     */
    async getItems(type: QueueItemType) {
        if (type === "queue") {
            return this.getQueue();
        }
        return this.getHistory();
    }

    /**
     * Gets the current state of the queue
     * @returns The currently running and queued items
     */
    async getQueue() {
        try {
            const res = await fetch(this.getBackendUrl() + "/queue");
            const data = await res.json();
            return {
                // Running action uses a different endpoint for cancelling
                Running: data.queue_running.map((prompt) => ({
                    prompt,
                    remove: { name: "Cancel", cb: () => this.interrupt() },
                })),
                Pending: data.queue_pending.map((prompt) => ({ prompt })),
            };
        } catch (error) {
            console.error(error);
            return { Running: [], Pending: [] };
        }
    }

    /**
     * Gets the prompt execution history
     * @returns Prompt history including node outputs
     */
    async getHistory() {
        try {
            const res = await fetch(this.getBackendUrl() + "/history");
            return { History: Object.values(await res.json()) };
        } catch (error) {
            console.error(error);
            return { History: [] };
        }
    }

    /**
     * Sends a POST request to the API
     * @param {*} type The endpoint to post to
     * @param {*} body Optional POST data
     */
    private async postItem(type: string, body: any) {
        try {
            await fetch("/" + type, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body ? JSON.stringify(body) : undefined,
            });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Deletes an item from the specified list
     * @param {string} type The type of item to delete, queue or history
     * @param {number} id The id of the item to delete
     */
    async deleteItem(type: string, id: number) {
        await this.postItem(type, { delete: [id] });
    }

    /**
     * Clears the specified list
     * @param {string} type The type of list to clear, queue or history
     */
    async clearItems(type: string) {
        await this.postItem(type, { clear: true });
    }

    /**
     * Interrupts the execution of the running prompt
     */
    async interrupt() {
        await this.postItem("interrupt", null);
    }
}
