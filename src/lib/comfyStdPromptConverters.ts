import type { ComfyBoxStdGroupLoRA, ComfyBoxStdPrompt } from "./ComfyBoxStdPrompt";
import type { ComfyNodeID } from "./api";
import type { SerializedPromptInputs } from "./components/ComfyApp";
import type { ComfyBackendNode } from "./nodes/ComfyBackendNode";

export type ComfyPromptConverter = (stdPrompt: ComfyBoxStdPrompt, inputs: SerializedPromptInputs, nodeID: ComfyNodeID) => void;

function LoraLoader(stdPrompt: ComfyBoxStdPrompt, inputs: SerializedPromptInputs) {
    const params = stdPrompt.prompt.parameters

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

const converters: Record<string, ComfyPromptConverter> = {
    LoraLoader
}
export default converters;
