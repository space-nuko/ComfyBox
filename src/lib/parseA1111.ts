interface ExtraNetworkParams {
    items: string[];
}

export type A1111ParsedInfotext = {
    positive: string,
    negative: string,

    steps: number,
    cfgScale: number,
    width: number,
    height: number,
    modelHash?: string,
    modelName?: string,
    batchSize?: number,
    batchPos?: number,
    sampler: string,
    seed: number,
    denoise?: number,

    extraNetworks: Record<string, ExtraNetworkParams[]>
    extraParams: Record<string, any>
}

export type A1111ParsingError = {
    error: string
}

const reExtraNetworks = /<(\w+):([^>]+)>/g;
const reParam = /\s*([\w ]+):\s*("(?:\\"[^,]|\\"|\\|[^\"])+"|[^,]*)(?:,|$)/g;

function parseExtraNetworks(prompt: string): [string, Record<string, ExtraNetworkParams[]>] {
    const res: Record<string, ExtraNetworkParams[]> = {};

    function found(_match: string, modelType: string, args: string): string {
        if (!res[modelType]) {
            res[modelType] = [];
        }

        res[modelType].push({ items: args.split(":") });

        return "";
    }

    prompt = prompt.replace(reExtraNetworks, found);

    return [prompt, res];
}

type A1111ParamHandler = string | ((prompt: A1111ParsedInfotext, value: string) => void);

const wrapFloat = (name: string): ((p: A1111ParsedInfotext, v: string) => void) => {
    return (p, v) => {
        p[name] = parseFloat(v);
    }
}

const wrapInt = (name: string): A1111ParamHandler => {
    return (p, v) => {
        p[name] = parseInt(v);
    }
}

const handlers: Record<string, A1111ParamHandler> = {
    steps: wrapInt("steps"),
    "cfg scale": wrapFloat("cfgScale"),
    "size": (p, v) => {
        const [widthStr, heightStr] = v.split("x")
        p.width = parseInt(widthStr);
        p.height = parseInt(heightStr);
    },
    "model hash": "modelHash",
    model: "modelName",
    "batch size": wrapInt("batchSize"),
    "batch pos": wrapInt("batchPos"),
    sampler: "sampler",
    seed: wrapInt("seed"),
    "denoising strength": wrapFloat("denoise")
}

/*
 * Parses AUTOMATIC1111/stable-diffusion-webui format infotext into their raw parameters.
 *
 * Format is as follows:
 * - Prompt text immediately starts at the start of the file, ending
 *   on the first line starting with "Negative prompt:" or "Steps:"
 * - "Negative prompt:" is optional and might be omitted
 * - Following "Steps:" are various sort-of-comma-separated values.
 *   Random characters can completely break parsing. Here be dragons.
 */
export default function parseA1111(infotext: string): A1111ParsedInfotext | A1111ParsingError {
    let doneWithPrompt = false;

    let positive_ = ""
    let negative = ""

    const lines = infotext.trim().split("\n")
    let lastLineIdx = lines.findIndex(l => l.trim().indexOf("Steps: ") !== -1)
    if (lastLineIdx === -1) {
        return { error: "Steps: line not found" }
    }

    for (let index = 0; index < lastLineIdx; index++) {
        let line = lines[index].trim()
        if (line.startsWith("Negative prompt:")) {
            doneWithPrompt = true;
            line = line.substring(16).trim();
        }

        if (doneWithPrompt) {
            const addNewLine = negative != ""
            negative += (addNewLine ? "\n" : "") + line
        }
        else {
            const addNewLine = positive_ != ""
            positive_ += (addNewLine ? "\n" : "") + line
        }
    }

    // webui doesn't apply extra networks in the negative prompt
    let [positive, extraNetworks] = parseExtraNetworks(positive_)

    const extraParams: Record<string, string> = {}

    let result: A1111ParsedInfotext = {
        positive,
        negative,

        // defaults taken from webui
        width: 512,
        height: 512,
        steps: 20,
        cfgScale: 7.0,
        seed: -1,
        sampler: "Euler",

        extraNetworks,
        extraParams
    }

    for (let index = lastLineIdx; index < lines.length; index++) {
        const line = lines[index];
        for (let [_, key, value] of line.matchAll(reParam)) {
            key = key.toLowerCase()
            if (value[0] === '"' && value[value.length - 1] === '""')
                value = value.substring(1, value.length - 1)

            const handler = handlers[key]
            if (handler != null) {
                if (value != null) {
                    if (typeof handler === "function") {
                        handler(result, value)
                    }
                    else {
                        (result as any)[handler] = value
                    }
                }
            }
            else {
                extraParams[key] = value
            }
        }
    }

    return result;
}
