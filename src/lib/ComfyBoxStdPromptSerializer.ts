import type { ComfyBoxStdGroupLoRA, ComfyBoxStdPrompt } from "$lib/ComfyBoxStdPrompt";
import type { SerializedPrompt, SerializedPromptInputs } from "./components/ComfyApp";

export type ComfyPromptConverter = (stdPrompt: ComfyBoxStdPrompt, inputs: SerializedPromptInputs, nodeID: ComfyNodeID) => void;

function LoraLoader(stdPrompt: ComfyBoxStdPrompt, inputs: SerializedPromptInputs) {
    const params = stdPrompt.parameters

    const lora: ComfyBoxStdGroupLoRA = {
        model_name: inputs["lora_name"],
        strength_unet: inputs["strength_model"],
        strength_tenc: inputs["strength_clip"]
    }

    if (params.lora)
        params.lora.push(lora)
    else
        params.lora = [lora]
}

const ALL_CONVERTERS: Record<string, ComfyPromptConverter> = {
    LoraLoader
}

const COMMIT_HASH: string = __GIT_COMMIT_HASH__;

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
            const converter = ALL_CONVERTERS[classType]
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
