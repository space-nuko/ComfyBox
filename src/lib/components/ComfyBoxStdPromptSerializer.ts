import type { ComfyBoxStdPrompt } from "$lib/ComfyBoxStdPrompt";
import type { SerializedPrompt } from "./ComfyApp";
import comfyStdPromptConverters from "$lib/comfyStdPromptConverters"

const COMMIT_HASH: string = "asdf";

export default class ComfyBoxStdPromptSerializer {
    serialize(prompt: SerializedPrompt): ComfyBoxStdPrompt {
        const stdPrompt: ComfyBoxStdPrompt = {
            version: 1,
            metadata: {
                created_with: "ComfyBox",
                commit_hash: COMMIT_HASH,
                extra_data: {
                    comfybox: {
                    }
                }
            },
            parameters: {}
        }

        for (const [nodeID, inputs] of Object.entries(prompt.output)) {
            const classType = inputs.class_type
            const converter = comfyStdPromptConverters[classType]
            if (converter) {
                converter(stdPrompt, inputs.inputs, nodeID)
            }
            else {
                console.warn("No StdPrompt type converter for comfy class!", classType)
            }
        }

        return stdPrompt
    }
}
