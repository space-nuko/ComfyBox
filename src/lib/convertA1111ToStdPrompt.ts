import type { ComfyBoxStdGroupCheckpoint, ComfyBoxStdGroupHypernetwork, ComfyBoxStdGroupKSampler, ComfyBoxStdGroupLatentImage, ComfyBoxStdGroupLoRA, ComfyBoxStdParameters, ComfyBoxStdPrompt } from "./ComfyBoxStdPrompt";
import type { A1111ParsedInfotext } from "./parseA1111";

function getSamplerAndScheduler(a1111Sampler: string): [string, string] {
    let name = a1111Sampler.toLowerCase().replace("++", "pp").replaceAll(" ", "_");
    let scheduler = "normal";
    if (name.includes("karras")) {
        name = name.replace("karras", "").replace(/_+$/, "");
        scheduler = "karras";
    } else {
        scheduler = "normal"
    }
    return [name, scheduler]
}

const reAddNetModelName = /^([^(]+)\(([^)]+)\)$/;
const reParens = /\(([^)]+)\)/;

function parseAddNetModelNameAndHash(name: string): [string | null, string | null] {
    const match = name.match(reAddNetModelName);
    if (match) {
        return [match[1], match[2]]
    }
    return [null, null]
}

export default function convertA1111ToStdPrompt(infotext: A1111ParsedInfotext): ComfyBoxStdPrompt {
    const popOpt = (name: string): string | undefined => {
        const v = infotext.extraParams[name];
        delete infotext.extraParams[name];
        return v;
    }

    const parameters: ComfyBoxStdParameters = {}

    const hrUp = popOpt("hires upscale");
    const hrSz = popOpt("hires resize");
    let hrMethod = popOpt("hires upscaler");
    let hrWidth = undefined
    let hrHeight = undefined
    if (hrSz) {
        [hrWidth, hrHeight] = hrSz.split(hrSz).map(parseInt);
    }

    if (hrMethod != null && hrMethod.startsWith("Latent (")) {
        const result = reParens.exec(hrMethod)
        if (result)
            hrMethod = String(result[1])
    }

    const latent_image: ComfyBoxStdGroupLatentImage = {
        width: infotext.width,
        height: infotext.height,
        upscale_method: hrMethod,
        upscale_by: hrUp ? parseFloat(hrUp) : undefined,
        upscale_width: hrWidth,
        upscale_height: hrHeight,
        batch_count: infotext.batchSize,
        batch_pos: infotext.batchPos,
    }

    const maskBlur = popOpt("mask blur")
    if (maskBlur != null)
        latent_image.mask_blur = parseFloat(maskBlur)

    parameters.latent_image = [latent_image];

    const [sampler_name, scheduler] = getSamplerAndScheduler(infotext.sampler)

    const k_sampler: ComfyBoxStdGroupKSampler = {
        steps: infotext.steps,
        seed: infotext.seed,
        cfg_scale: infotext.cfgScale,
        denoise: infotext.denoise || 1.0,
        sampler_name,
        scheduler,
    }
    parameters.k_sampler = [k_sampler];

    if (infotext.modelHash || infotext.modelName) {
        const checkpoint: ComfyBoxStdGroupCheckpoint = {
            model_name: infotext.modelName,
            model_hashes: {
                a1111_shorthash: infotext.modelHash
            }
        }
        parameters.checkpoint = [checkpoint]
    }

    const clipSkip = popOpt("clip skip")
    if (clipSkip != null) {
        parameters.clip = [{
            clip_skip: parseInt(clipSkip)
        }]
    }

    const sdUpscaleUpscaler = popOpt("sd upscale upscaler")
    if (sdUpscaleUpscaler != null) {
        const sdUpscaleOverlap = popOpt("sd upscale overlap") || "64"
        parameters.sd_upscale = [{
            upscaler: sdUpscaleUpscaler,
            overlap: parseInt(sdUpscaleOverlap)
        }]
    }

    for (const [extraNetworkType, extraNetworks] of Object.entries(infotext.extraNetworks)) {
        for (const extraNetworkParams of extraNetworks) {
            let strength;
            switch (extraNetworkType.toLowerCase()) {
                case "lora":
                    strength = parseFloat(extraNetworkParams.items[1]);
                    const lora: ComfyBoxStdGroupLoRA = {
                        model_name: extraNetworkParams.items[0],
                        strength_unet: strength,
                        strength_tenc: strength,
                    }
                    if (parameters.lora)
                        parameters.lora.push(lora)
                    else
                        parameters.lora = [lora]
                    break;
                case "hypernet":
                    strength = parseFloat(extraNetworkParams.items[1]);
                    const hypernetwork: ComfyBoxStdGroupHypernetwork = {
                        model_name: extraNetworkParams.items[0],
                        strength
                    }
                    if (parameters.hypernetwork)
                        parameters.hypernetwork.push(hypernetwork)
                    else
                        parameters.hypernetwork = [hypernetwork]
                    break;
                default:
                    break;
            }
        }
        delete infotext.extraNetworks[extraNetworkType]
    }

    let index = 1;
    let found = infotext.extraParams[`addnet module ${index}`]
    while (`addnet module ${index}` in infotext.extraParams) {
        popOpt("addnet enabled")
        const moduleName = popOpt(`addnet module ${index}`)
        const modelName = popOpt(`addnet model ${index}`);
        const weightA = popOpt(`addnet weight a ${index}`);
        const weightB = popOpt(`addnet weight b ${index}`);

        if (moduleName == null || modelName == null || weightA == null || weightB == null) {
            throw new Error(`Error parsing addnet model params: ${moduleName} ${modelName} ${weightA} ${weightB}`)
        }

        if (moduleName !== "LoRA") {
            throw new Error("Unknown AddNet model type " + moduleName)
        }

        const [name, hash] = parseAddNetModelNameAndHash(modelName);
        if (name == null || hash == null) {
            throw new Error("Error parsing addnet model name: " + modelName);
        }

        let shorthash = undefined
        let shorthash_legacy = undefined
        if (hash.length > 8) {
            // new method using safetensors hash
            shorthash = hash
        }
        else {
            // old hash using webui's 0x10000 hashing method
            shorthash_legacy = hash
        }

        const lora: ComfyBoxStdGroupLoRA = {
            model_name: name,
            module_name: moduleName,
            model_hashes: {
                addnet_shorthash: shorthash,
                addnet_shorthash_legacy: shorthash_legacy
            },
            strength_unet: parseFloat(weightA),
            strength_tenc: parseFloat(weightB),
        }
        if (parameters.lora)
            parameters.lora.push(lora)
        else
            parameters.lora = [lora]

        index += 1;
        found = infotext.extraParams[`addnet model ${index}`]
    }

    for (const [key, value] of Object.entries(infotext.extraParams)) {
        if (key.startsWith("addnet model ")) {
            const index = key.replace("addnet module ", "")
            // delete infotext.extraParams[key];
        }
    }

    const prompt: ComfyBoxStdPrompt = {
        prompt: {
            metadata: {
                version: 1,
                created_with: "stable-diffusion-webui",
                extra_data: {}
            },
            parameters
        }
    }

    console.warn("Unhandled A1111 parameters:", infotext.extraParams, infotext.extraNetworks)

    return prompt
}
