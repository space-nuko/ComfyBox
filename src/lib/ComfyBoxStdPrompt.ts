import { z, type ZodTypeAny } from "zod"

const ModelHashes = z.object({
    a1111_shorthash: z.string().optional(),
    sha256: z.string().optional(),
}).refine(({ a1111_shorthash, sha256 }) =>
    a1111_shorthash !== undefined || sha256 !== undefined,
    { message: "At least one model hash must be specified" })

const GroupPrompt = z.object({
    positive: z.string(),
    negative: z.string()
})
export type ComfyBoxStdGroupPrompt = z.infer<typeof GroupPrompt>

const GroupCheckpoint = z.object({
    model_name: z.string().optional(),
    model_hashes: ModelHashes.optional(),
}).refine(({ model_name, model_hashes }) =>
    model_name !== undefined || model_hashes !== undefined,
    { message: "Must include either model name or model hash" }
)
export type ComfyBoxStdGroupCheckpoint = z.infer<typeof GroupCheckpoint>

const GroupVAE = z.object({
    model_name: z.string().optional(),
    model_hashes: ModelHashes.optional(),
    type: z.enum(["internal", "external"])
}).refine(({ model_name, model_hashes }) =>
    model_name !== undefined || model_hashes !== undefined,
    { message: "Must include either model name or model hashes" }
)
export type ComfyBoxStdGroupVAE = z.infer<typeof GroupVAE>

const GroupKSampler = z.object({
    cfg_scale: z.number(),
    seed: z.number(),
    steps: z.number(),
    sampler_name: z.string(),
    scheduler: z.string(),
    denoise: z.number().default(1.0)
})
export type ComfyBoxStdGroupKSampler = z.infer<typeof GroupKSampler>

const GroupLatentImage = z.object({
    width: z.number(),
    height: z.number(),
    type: z.enum(["empty", "image", "image_upscale"]).optional(),
    upscale_method: z.string().optional(),
    upscale_by: z.number().optional(),
    upscale_width: z.number().optional(),
    upscale_height: z.number().optional(),
    crop: z.string().optional(),
    mask_blur: z.number().optional(),
    batch_count: z.number().default(1).optional(),
    batch_pos: z.number().default(0).optional()
})
export type ComfyBoxStdGroupLatentImage = z.infer<typeof GroupLatentImage>

const GroupSDUpscale = z.object({
    upscaler: z.string(),
    overlap: z.number(),
})
export type ComfyBoxStdGroupSDUpscale = z.infer<typeof GroupSDUpscale>

const GroupHypernetwork = z.object({
    model_name: z.string(),
    model_hashes: ModelHashes.optional(),
    strength: z.number()
})
export type ComfyBoxStdGroupHypernetwork = z.infer<typeof GroupHypernetwork>

const LoRAModelHashes = z.object({
    addnet_shorthash: z.string().optional(),
    addnet_shorthash_legacy: z.string().optional(),
    sha256: z.string().optional(),
}).refine(({ addnet_shorthash, addnet_shorthash_legacy, sha256 }) =>
    addnet_shorthash !== undefined || addnet_shorthash_legacy !== undefined || sha256 !== undefined,
    { message: "At least one model hash must be specified" })

const GroupLoRA = z.object({
    model_name: z.string(),
    module_name: z.string().optional(),
    model_hashes: LoRAModelHashes.optional(),
    strength_unet: z.number(),
    strength_tenc: z.number()
})
export type ComfyBoxStdGroupLoRA = z.infer<typeof GroupLoRA>

const GroupControlNet = z.object({
    model: z.string(),
    model_hashes: ModelHashes.optional(),
    strength: z.number(),
})
export type ComfyBoxStdGroupControlNet = z.infer<typeof GroupControlNet>

const GroupCLIP = z.object({
    clip_skip: z.number().optional()
})
export type ComfyBoxStdGroupCLIP = z.infer<typeof GroupCLIP>

const GroupDynamicThresholding = z.object({
    mimic_scale: z.number(),
    threshold_percentile: z.number(),
    mimic_mode: z.string(),
    mimic_scale_min: z.number(),
    cfg_mode: z.string(),
    cfg_scale_minimum: z.number()
})
export type ComfyBoxStdGroupDynamicThresholding = z.infer<typeof GroupDynamicThresholding>

const group = (s: ZodTypeAny) => z.optional(z.array(s).nonempty());

const Parameters = z.object({
    prompt: group(GroupPrompt),
    checkpoint: group(GroupCheckpoint),
    vae: group(GroupVAE),
    k_sampler: group(GroupKSampler),
    clip: group(GroupCLIP),
    latent_image: group(GroupLatentImage),
    sd_upscale: group(GroupSDUpscale),
    hypernetwork: group(GroupHypernetwork),
    lora: group(GroupLoRA),
    control_net: group(GroupControlNet),
    dynamic_thresholding: group(GroupDynamicThresholding)
}).partial()
export type ComfyBoxStdParameters = z.infer<typeof Parameters>

const ComfyBoxExtraData = z.object({
    workflows: z.array(z.string())
})

const ExtraData = z.object({
    comfybox: ComfyBoxExtraData.optional()
})

const Metadata = z.object({
    version: z.number(),
    created_with: z.string(),
    author: z.string().optional(),
    commit_hash: z.string().optional(),
    extra_data: ExtraData
})

const Prompt = z.object({
    metadata: Metadata,
    parameters: Parameters
})

const ComfyBoxStdPrompt = z.object({
    prompt: Prompt,
})

export default ComfyBoxStdPrompt
export type ComfyBoxStdPrompt = z.infer<typeof ComfyBoxStdPrompt>
