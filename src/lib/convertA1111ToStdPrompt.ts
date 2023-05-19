import type { ComfyBoxStdGroupCheckpoint, ComfyBoxStdGroupDDetailer, ComfyBoxStdGroupDynamicThresholding, ComfyBoxStdGroupHypernetwork, ComfyBoxStdGroupKSampler, ComfyBoxStdGroupLatentImage, ComfyBoxStdGroupLoRA, ComfyBoxStdGroupSelfAttentionGuidance, ComfyBoxStdParameters, ComfyBoxStdPrompt } from "./ComfyBoxStdPrompt";
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

function parseAddNetModelNameAndHash(name: string | null): [string | undefined, string | undefined] {
    if (!name)
        return [undefined, undefined]

    const match = name.match(reAddNetModelName);
    if (match) {
        return [match[1], match[2]]
    }
    return [undefined, undefined]
}

const reDDetailerModelName = /(.+)\s\[(.+)\]/;

function parseDDetailerModelNameAndHash(name: string | null): [string | undefined, string | undefined] {
    if (!name || name === "None")
        return [undefined, undefined]

    // bbox\mmdet_anime-face_yolov3.pth [51e1af4a]
    const match = name.match(reDDetailerModelName);
    if (match) {
        return [match[1], match[2]]
    }
    return [undefined, undefined]
}

export default function convertA1111ToStdPrompt(infotext: A1111ParsedInfotext): ComfyBoxStdPrompt {
    const popOpt = (name: string): string | undefined => {
        const v = infotext.extraParams[name];
        delete infotext.extraParams[name];
        return v;
    }

    const parameters: ComfyBoxStdParameters = {}

    parameters.conditioning = [
        {
            "^meta": {
                types: ["positive"]
            },
            text: infotext.positive,
        },
        {
            "^meta": {
                types: ["negative"]
            },
            text: infotext.negative,
        }
    ]

    const hrUp = popOpt("hires upscale");
    const hrSz = popOpt("hires resize");
    let hrScaleBy = hrUp ? parseFloat(hrUp) : undefined;
    let hrMethod = popOpt("hires upscaler");
    let hrSteps = popOpt("hires steps");
    let hrWidth = undefined
    let hrHeight = undefined
    if (hrSz) {
        [hrWidth, hrHeight] = hrSz.split(hrSz).map(parseInt);
    }

    const latent_image: ComfyBoxStdGroupLatentImage = {
        width: infotext.width,
        height: infotext.height,
        // type: "empty", // detect txt2img???
        batch_count: infotext.batchSize,
        batch_pos: infotext.batchPos,
    }

    const maskBlur = popOpt("mask blur")
    if (maskBlur != null)
        latent_image.mask_blur = parseFloat(maskBlur)

    parameters.latent_image = [latent_image];

    if (hrMethod != null) {
        let uw, uh;
        if (hrScaleBy) {
            uw = infotext.width * hrScaleBy;
            uh = infotext.height * hrScaleBy;
        } else {
            if (hrWidth == null || hrHeight == null)
                throw new Error("Highres prompt didn't have width/height!")
            uw = +hrWidth;
            uh = +hrHeight;
        }
        const hr_image: ComfyBoxStdGroupLatentImage = {
            type: "upscale",
            width: uw,
            height: uh,
            upscale_by: hrScaleBy,
            batch_count: infotext.batchSize,
            batch_pos: infotext.batchPos,
            upscale_method: hrMethod
        }
        parameters.latent_image.push(hr_image)
    }

    const [sampler_name, scheduler] = getSamplerAndScheduler(infotext.sampler)

    const k_sampler: ComfyBoxStdGroupKSampler = {
        steps: infotext.steps,
        seed: infotext.seed,
        cfg_scale: infotext.cfgScale,
        denoise: hrMethod != null ? 1.0 : infotext.denoise || 1.0, // detect img2img???
        sampler_name,
        scheduler,
    }
    parameters.k_sampler = [k_sampler];

    if (hrMethod != null) {
        const k_sampler_hr: ComfyBoxStdGroupKSampler = {
            type: "upscale",
            steps: hrSteps != null ? parseInt(hrSteps) : infotext.steps,
            seed: infotext.seed,
            cfg_scale: infotext.cfgScale,
            denoise: infotext.denoise || 1.0,
            sampler_name,
            scheduler,
        }
        parameters.k_sampler.push(k_sampler_hr)
    }

    if (infotext.modelHash || infotext.modelName) {
        const checkpoint: ComfyBoxStdGroupCheckpoint = {
            model_name: infotext.modelName,
            model_hashes: {
                a1111_shorthash: infotext.modelHash
            }
        }
        parameters.checkpoint = [checkpoint]
    }

    if ("clip skip" in infotext.extraParams) {
        const clipSkip = popOpt("clip skip")
        parameters.clip = [{
            clip_skip: parseInt(clipSkip)
        }]
    }

    if ("sd upscale upscaler" in infotext.extraParams) {
        const sdUpscaleUpscaler = popOpt("sd upscale upscaler")
        const sdUpscaleOverlap = popOpt("sd upscale overlap") || "64"
        parameters.sd_upscale = [{
            upscaler: sdUpscaleUpscaler,
            overlap: parseInt(sdUpscaleOverlap)
        }]
    }

    if ("dynamic thresholding enabled" in infotext.extraParams) {
        const dtEnabled = popOpt("dynamic thresholding enabled")
        if (dtEnabled === "True") {
            const dynamic_thresholding: ComfyBoxStdGroupDynamicThresholding = {
                mimic_scale: parseInt(popOpt("mimic scale")),
                threshold_percentile: parseFloat(popOpt("threshold percentile")),
                mimic_mode: popOpt("mimic mode"),
                mimic_scale_minimum: parseFloat(popOpt("mimic scale minimum")),
                cfg_mode: popOpt("cfg mode"),
                cfg_scale_minimum: parseFloat(popOpt("cfg scale minimum")),
            }
            parameters.dynamic_thresholding = [dynamic_thresholding]
        }
    }

    if ("sag guidance scale" in infotext.extraParams) {
        const self_attention_guidance: ComfyBoxStdGroupSelfAttentionGuidance = {
            guidance_scale: parseFloat(popOpt("sag guidance scale")),
            mask_threshold: parseFloat(popOpt("sag mask threshold")),
        }
        parameters.self_attention_guidance = [self_attention_guidance]
    }

    if ("ddetailer prompt" in infotext.extraParams) {
        const positive_prompt = popOpt("ddetailer prompt")
        const negative_prompt = popOpt("ddetailer neg prompt")
        const bitwise = popOpt("ddetailer bitwise")
        const denoise = parseFloat(popOpt("ddetailer denoising"))
        const inpaint_full = popOpt("ddetailer inpaint full") === "True"
        const inpaint_padding = parseInt(popOpt("ddetailer inpaint padding"))
        const mask_blur = parseFloat(popOpt("ddetailer mask blur"))
        const cfg = parseFloat(popOpt("ddetailer cfg"))

        const preprocess_b = popOpt("ddetailer preprocess b") === "True"

        const [model_a, model_a_shorthash] = parseDDetailerModelNameAndHash(popOpt("ddetailer model a"))
        const [model_b, model_b_shorthash] = parseDDetailerModelNameAndHash(popOpt("ddetailer model b"))

        const ddetailer_a: ComfyBoxStdGroupDDetailer = {
            positive_prompt,
            negative_prompt,
            bitwise,
            denoise,
            inpaint_full,
            inpaint_padding,
            mask_blur,
            cfg,
            model: model_a,
            model_hashes: model_a_shorthash ? {
                a1111_shorthash: model_a_shorthash
            } : undefined,
            preprocess: !preprocess_b,
            conf: parseFloat(popOpt("ddetailer conf a")),
            dilation: parseFloat(popOpt("ddetailer dilation a")),
            offset_x: parseFloat(popOpt("ddetailer offset x a")),
            offset_y: parseFloat(popOpt("ddetailer offset y a")),
        }
        const ddetailer_b: ComfyBoxStdGroupDDetailer = {
            positive_prompt,
            negative_prompt,
            bitwise,
            denoise,
            inpaint_full,
            inpaint_padding,
            mask_blur,
            cfg,
            model: model_b,
            model_hashes: model_b_shorthash ? {
                a1111_shorthash: model_b_shorthash
            } : undefined,
            preprocess: preprocess_b,
            conf: parseFloat(popOpt("ddetailer conf b")),
            dilation: parseFloat(popOpt("ddetailer dilation b")),
            offset_x: parseFloat(popOpt("ddetailer offset x b")),
            offset_y: parseFloat(popOpt("ddetailer offset y b")),
        }
        parameters.ddetailer = [ddetailer_a, ddetailer_b]
    }

    // TODO ControlNet

    for (const [extraNetworkType, extraNetworks] of Object.entries(infotext.extraNetworks)) {
        for (const extraNetworkParams of extraNetworks) {
            let strength;
            switch (extraNetworkType.toLowerCase()) {
                case "lora":
                case "locon":
                case "lyco":
                    strength = parseFloat(extraNetworkParams.items[1]);
                    const lora: ComfyBoxStdGroupLoRA = {
                        module_name: extraNetworkType.toLowerCase(),
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

    let app_version = popOpt("version")

    const prompt: ComfyBoxStdPrompt = {
        version: 1,
        metadata: {
            created_with: "stable-diffusion-webui",
            app_version,
            extra_data: {
                a1111: {
                    params: infotext.extraParams
                }
            }
        },
        parameters
    }

    console.warn("Unhandled A1111 parameters:", infotext.extraParams, infotext.extraNetworks)

    return prompt
}
