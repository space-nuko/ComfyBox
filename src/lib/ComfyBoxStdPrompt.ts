import { z, type ZodTypeAny } from "zod"

/*
 * This metadata can be attached to each entry in a group to assist in
 * identifying the correct nodes to apply it to.
 *
 * As an example, positive and negative conditioning are deployed as two
 * separate nodes in ComfyUI. This makes bundling them into a { positive,
 * negative } entry difficult as either one can be missing. So instead they're
 * tagged like
 *
 * {
 *   conditioning: [
 *     { text: "masterpiece",   "$meta": { types: ["positive"] } },
 *     { text: "worst quality", "$meta": { types: ["negative"] } },
 *   ]
 * }
 *
 * The reasoning is the "types" information isn't required to reinstantiate
 * the node, it's only semantic information describing how the node is used in
 * the encompassing workflow. When the prompt is loaded the workflow can be
 * searched for a node with the compatible type to attach the information to.
 */
const GroupMetadata = z.object({
    types: z.array(z.string()).nonempty().optional()
})
export type ComfyBoxStdGroupMetadata = z.infer<typeof GroupMetadata>

const group = (obj: Record<string, any>): ZodTypeAny => {
    const meta = z.object({ "$meta": GroupMetadata.optional() })
    return z.object(obj).and(meta)
}

const ModelHashes = z.object({
    a1111_shorthash: z.string().optional(),
    sha256: z.string().optional(),
}).refine(({ a1111_shorthash, sha256 }) =>
    a1111_shorthash !== undefined || sha256 !== undefined,
    { message: "At least one model hash must be specified" })

const GroupConditioning = group({
    text: z.string(),
})
export type ComfyBoxStdGroupConditioning = z.infer<typeof GroupConditioning>

const GroupCheckpoint = group({
    model_name: z.string().optional(),
    model_hashes: ModelHashes.optional(),
}).refine(({ model_name, model_hashes }) =>
    model_name !== undefined || model_hashes !== undefined,
    { message: "Must include either model name or model hash" }
)
export type ComfyBoxStdGroupCheckpoint = z.infer<typeof GroupCheckpoint>

const GroupVAE = group({
    model_name: z.string().optional(),
    model_hashes: ModelHashes.optional(),
    type: z.enum(["internal", "external"])
}).refine(({ model_name, model_hashes }) =>
    model_name !== undefined || model_hashes !== undefined,
    { message: "Must include either model name or model hashes" }
)
export type ComfyBoxStdGroupVAE = z.infer<typeof GroupVAE>

const GroupKSampler = group({
    cfg_scale: z.number(),
    seed: z.number(),
    steps: z.number(),
    sampler_name: z.string(),
    scheduler: z.string(),
    denoise: z.number().default(1.0),
    type: z.enum(["empty", "image", "upscale"]).optional()
})
export type ComfyBoxStdGroupKSampler = z.infer<typeof GroupKSampler>

const GroupLatentImage = group({
    width: z.number(),
    height: z.number(),
    mask_blur: z.number().optional(),
    batch_count: z.number().default(1).optional(),
    batch_pos: z.number().default(0).optional()
})
export type ComfyBoxStdGroupLatentImage = z.infer<typeof GroupLatentImage>

const GroupLatentUpscale = group({
    width: z.number(),
    height: z.number(),
    upscale_method: z.string().optional(),
    upscale_by: z.number().optional(),
    crop: z.string().optional()
})
export type ComfyBoxStdGroupLatentUpscale = z.infer<typeof GroupLatentUpscale>

const GroupSDUpscale = group({
    upscaler: z.string(),
    overlap: z.number(),
})
export type ComfyBoxStdGroupSDUpscale = z.infer<typeof GroupSDUpscale>

const GroupSelfAttentionGuidance = group({
    guidance_scale: z.number(),
    mask_threshold: z.number(),
})
export type ComfyBoxStdGroupSelfAttentionGuidance = z.infer<typeof GroupSelfAttentionGuidance>

const GroupHypernetwork = group({
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

const GroupLoRA = group({
    model_name: z.string(),
    module_name: z.string().optional(),
    model_hashes: LoRAModelHashes.optional(),
    strength_unet: z.number(),
    strength_tenc: z.number()
})
export type ComfyBoxStdGroupLoRA = z.infer<typeof GroupLoRA>

const GroupControlNet = group({
    model: z.string(),
    model_hashes: ModelHashes.optional(),
    strength: z.number(),
})
export type ComfyBoxStdGroupControlNet = z.infer<typeof GroupControlNet>

const GroupCLIP = group({
    clip_skip: z.number().optional()
})
export type ComfyBoxStdGroupCLIP = z.infer<typeof GroupCLIP>

const GroupDynamicThresholding = group({
    mimic_scale: z.number(),
    threshold_percentile: z.number(),
    mimic_mode: z.string(),
    mimic_scale_minimum: z.number(),
    cfg_mode: z.string(),
    cfg_scale_minimum: z.number()
})
export type ComfyBoxStdGroupDynamicThresholding = z.infer<typeof GroupDynamicThresholding>

const GroupAestheticEmbedding = group({
    model_name: z.string(),
    lr: z.number(),
    slerp: z.boolean(),
    slerp_angle: z.number().optional(),
    steps: z.number(),
    text: z.string(),
    text_negative: z.boolean(),
    weight: z.number(),
})
export type ComfyBoxStdGroupAestheticEmbedding = z.infer<typeof GroupAestheticEmbedding>

const GroupDDetailer = group({
    positive_prompt: z.string(),
    negative_prompt: z.string(),
    bitwise: z.string(),
    model: z.string().optional(),
    model_hashes: ModelHashes.optional(),
    conf: z.number(),
    mask_blur: z.number(),
    denoise: z.number(),
    dilation: z.number(),
    offset_x: z.number(),
    offset_y: z.number(),
    preprocess: z.boolean(),
    inpaint_full: z.boolean(),
    inpaint_padding: z.number(),
    cfg: z.number()
})
export type ComfyBoxStdGroupDDetailer = z.infer<typeof GroupDDetailer>

const groupArray = (entry: ZodTypeAny) => {
    return z.optional(z.array(entry).nonempty());
}

const Parameters = z.object({
    conditioning: groupArray(GroupConditioning),
    checkpoint: groupArray(GroupCheckpoint),
    vae: groupArray(GroupVAE),
    k_sampler: groupArray(GroupKSampler),
    clip: groupArray(GroupCLIP),
    latent_image: groupArray(GroupLatentImage),
    latent_upscale: groupArray(GroupLatentUpscale),
    sd_upscale: groupArray(GroupSDUpscale),
    hypernetwork: groupArray(GroupHypernetwork),
    lora: groupArray(GroupLoRA),
    control_net: groupArray(GroupControlNet),
    dynamic_thresholding: groupArray(GroupDynamicThresholding),
    aesthetic_embedding: groupArray(GroupAestheticEmbedding),
    self_attention_guidance: groupArray(GroupSelfAttentionGuidance),
    ddetailer: groupArray(GroupDDetailer)
}).partial()
export type ComfyBoxStdParameters = z.infer<typeof Parameters>

const ComfyBoxExtraData = z.object({
    workflows: z.array(z.string())
})

const A1111ExtraData = z.object({
    params: z.any()
})

const ExtraData = z.object({
    comfybox: ComfyBoxExtraData.optional(),
    a1111: A1111ExtraData.optional()
})

const Metadata = z.object({
    created_with: z.string(),
    author: z.string().optional(),
    app_version: z.string().optional(),
    commit_hash: z.string().optional(),
    extra_data: ExtraData
})

const StdPrompt = z.object({
    version: z.number(),
    metadata: Metadata,
    parameters: Parameters
})

export default StdPrompt

/*
 * A standardized Stable Diffusion parameter format that should be used with an
 * encompassing workflow. Aims to encompass an arbitrary number of parameter
 * counts and types, so that most ComfyUI workflows can have parts of their
 * prompts transferred between each other.
 *
 * This format does *not* describe how the information should be used in the
 * underlying workflow, i.e. it does not specify the structure of a ComfyUI
 * execution graph. It only gives hints via tagged input types on each input
 * entry as to where the data should be inserted. To recreate a ComfyBox
 * workflow with the exact state of the UI intact, the `SerializedAppState` type
 * should be used instead. It suffices to embed data of that type in the output
 * PNGs for recreating their workflows. This type is meant as an interchange
 * format *between* workflows so their inputs can be copied to and from each
 * other in a sane-enough manner. (In ComfyBox, copying workflow outputs like
 * images to other workflows is handled separately, since this type does not
 * retain the actual image data.)
 *
 * In contrast with a serialized workflow, which is concerned with the
 * connections between nodes and the state of the frontend's UI, this format
 * concerns itself with the exact values that the execution backend receives,
 * after the data in the UI have finished processing.
 *
 * (Take for example a "scale by" slider that adjusts the width and height of an
 * img2img input image of 512 x 512 resolution by 2x. The backend will only
 * "see" width 1024 and height 1024, even though the only parameter exposed from
 * the frontend was the scale of 2.)
 */
export type ComfyBoxStdPrompt = z.infer<typeof StdPrompt>
