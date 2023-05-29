import type { ComfyBoxStdGroupLoRA, ComfyBoxStdPrompt } from "$lib/ComfyBoxStdPrompt";
import StdPrompt from "$lib/ComfyBoxStdPrompt";
import type { SafeParseReturnType, ZodError } from "zod";
import type { ComfyNodeID } from "./api";
import type { SerializedAppState, SerializedPrompt, SerializedPromptInputs, SerializedPromptInputsAll } from "./components/ComfyApp";
import { ComfyComboNode, type ComfyWidgetNode } from "./nodes/widgets";
import { basename, isSerializedPromptInputLink } from "./utils";

export type ComfyPromptConverter = {
    encoder: ComfyPromptEncoder,
    decoder: ComfyPromptDecoder
}

//
export type ComfyDecodeArgument = {
    groupName: string,
    keyName: string,
    value: any,
    widgetNode: ComfyWidgetNode
};

export type ComfyPromptEncoder = (stdPrompt: ComfyBoxStdPrompt, inputs: SerializedPromptInputs, nodeID: ComfyNodeID) => void;
export type ComfyPromptDecoder = (args: ComfyDecodeArgument[]) => void;

const LoraLoader: ComfyPromptConverter = {
    encoder: (stdPrompt: ComfyBoxStdPrompt, inputs: SerializedPromptInputs) => {
        const params = stdPrompt.parameters
        const loras: ComfyBoxStdGroupLoRA[] = params.lora

        for (const lora of loras) {
            lora.model_hashes = {
                addnet_shorthash: null // TODO find hashes for model!
            }
        }
    },
    decoder: (args: ComfyDecodeArgument[]) => {
        // Find corresponding model names in the ComfyUI models folder from the model base filename
        for (const arg of args) {
            if (arg.groupName === "lora" && arg.keyName === "model_name" && arg.widgetNode.is(ComfyComboNode)) {
                const modelBasename = basename(arg.value);
                const found = arg.widgetNode.properties.values.find(k => k.indexOf(modelBasename) !== -1)
                if (found)
                    arg.value = found;
            }
        }
    }
}

// input name -> group/key in standard prompt
type ComfyStdPromptMapping = Record<string, string>

type ComfyStdPromptSpec = {
    paramMapping: ComfyStdPromptMapping,
    extraParams?: Record<string, string>,
    converter?: ComfyPromptConverter,
}

const ALL_SPECS: Record<string, ComfyStdPromptSpec> = {
    "KSampler": {
        paramMapping: {
            cfg: "k_sampler.cfg_scale",
            seed: "k_sampler.seed",
            steps: "k_sampler.steps",
            sampler_name: "k_sampler.sampler_name",
            scheduler: "k_sampler.scheduler",
            denoise: "k_sampler.denoise",
        },
    },
    "LoraLoader": {
        paramMapping: {
            lora_name: "lora.model_name",
            strength_model: "lora.strength_unet",
            strength_clip: "lora.strength_tenc",
        },
        extraParams: {
            "lora.module_name": "LoRA",
        },
        converter: LoraLoader,
    }
}

const COMMIT_HASH: string = __GIT_COMMIT_HASH__;

export default class ComfyBoxStdPromptSerializer {
    serialize(prompt: SerializedPromptInputsAll, workflow?: SerializedAppState): [SafeParseReturnType<any, ComfyBoxStdPrompt>, any] {
        const stdPrompt: ComfyBoxStdPrompt = {
            version: 1,
            metadata: {
                created_with: "ComfyBox",
                commit_hash: COMMIT_HASH,
                extra_data: {
                    comfybox: {
                        workflows: [] // TODO!!!
                    }
                }
            },
            parameters: {}
        }

        for (const [nodeID, inputs] of Object.entries(prompt)) {
            const classType = inputs.class_type
            const spec = ALL_SPECS[classType]
            if (spec) {
                console.warn("SPEC", spec, inputs)
                let targets = {}
                for (const [comfyKey, stdPromptKey] of Object.entries(spec.paramMapping)) {
                    const inputValue = inputs.inputs[comfyKey];
                    if (inputValue != null && !isSerializedPromptInputLink(inputValue)) {
                        console.warn("GET", comfyKey, inputValue)
                        const trail = stdPromptKey.split(".");
                        let target = null;

                        console.warn(trail, trail.length - 2);
                        for (let index = 0; index < trail.length - 1; index++) {
                            const name = trail[index];
                            if (index === 0) {
                                targets[name] ||= {}
                                target = targets[name]
                            }
                            else {
                                target = target[name]
                            }
                            console.warn(index, name, target)
                        }

                        let name = trail[trail.length - 1]
                        target[name] = inputValue
                        console.warn(stdPrompt.parameters)
                    }
                }

                // TODO converter.encode

                for (const [groupName, group] of Object.entries(targets)) {
                    stdPrompt.parameters[groupName] ||= []
                    stdPrompt.parameters[groupName].push(group)
                }
            }
            else {
                console.warn("No StdPrompt type spec for comfy class!", classType)
            }
        }

        return [StdPrompt.safeParse(stdPrompt), stdPrompt];
    }
}
