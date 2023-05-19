import convertA1111ToStdPrompt from "$lib/convertA1111ToStdPrompt";
import { expect } from 'vitest';
import UnitTest from "./UnitTest";
import type { A1111ParsedInfotext } from "$lib/parseA1111";
import ComfyBoxStdPrompt from "$lib/ComfyBoxStdPrompt";

export default class convertA1111ToStdPromptTests extends UnitTest {
    test__convertsBasic() {
        const infotext: A1111ParsedInfotext = {
            positive: "highest quality, masterpiece, best quality, masterpiece, asuka langley sitting cross legged on a chair",
            negative: "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts,signature, watermark, username, blurry, artist name",
            height: 512,
            width: 512,
            modelHash: "925997e9",
            cfgScale: 12,
            sampler: "Euler",
            seed: 2870305590,
            steps: 28,
            extraNetworks: {},
            extraParams: {
                "clip skip": "2",
                "aesthetic embedding": "Belle",
                "aesthetic lr": "0.0005",
                "aesthetic slerp": "False",
                "aesthetic slerp angle": "0.1",
                "aesthetic steps": "15",
                "aesthetic text": "",
                "aesthetic text negative": "False",
                "aesthetic weight": "0.9",
            },
        }

        const converted = convertA1111ToStdPrompt(infotext);

        expect(converted).toEqual({
            version: 1,
            metadata: {
                created_with: "stable-diffusion-webui",
                extra_data: {}
            },
            parameters: {
                checkpoint: [{
                    model_hashes: {
                        a1111_shorthash: "925997e9",
                    }
                }],
                conditioning: [{
                    "$meta": {
                        types: ["positive"]
                    },
                    text: "highest quality, masterpiece, best quality, masterpiece, asuka langley sitting cross legged on a chair",
                }, {
                    "$meta": {
                        types: ["negative"]
                    },
                    text: "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts,signature, watermark, username, blurry, artist name"
                }],
                clip: [{
                    clip_skip: 2,
                }],
                k_sampler: [{
                    cfg_scale: 12,
                    denoise: 1,
                    sampler_name: "euler",
                    scheduler: "normal",
                    seed: 2870305590,
                    steps: 28
                }],
                latent_image: [{
                    width: 512,
                    height: 512,
                }],
                aesthetic_embedding: [{
                    lr: 0.0005,
                    model_name: "Belle",
                    text: "",
                    text_negative: false,
                    slerp: false,
                    slerp_angle: 0.1,
                    steps: 15,
                    weight: 0.9
                }]
            }
        })

        expect(() => ComfyBoxStdPrompt.parse(converted)).not.toThrow();
    }

    test__convertsExtraNetworks() {
        const infotext: A1111ParsedInfotext = {
            positive: "dreamlike fantasy landscape where everything is a shade of pink,\n dog ",
            negative: "(worst quality:1.4), (low quality:1.4) , (monochrome:1.1)",
            width: 640,
            height: 512,
            modelHash: "0f0eaaa61e",
            modelName: "pastelmix-better-vae-fp16",
            cfgScale: 12,
            sampler: "DPM++ 2M Karras",
            seed: 2416682767,
            steps: 40,
            denoise: 0.55,
            extraNetworks: {
                hypernet: [
                    { items: ["zxcfc", "0.5", "baz", "quux"], },
                ],
                lora: [
                    { items: ["asdfg", "0.8", "foo", "bar"] },
                ],
            },
            extraParams: {
                "clip skip": "2",
                "ensd": "31337",
                "hires steps": "20",
                "hires upscale": "2",
                "hires upscaler": "Latent",
            },
        }

        const converted = convertA1111ToStdPrompt(infotext);

        expect(converted).toEqual({
            version: 1,
            metadata: {
                created_with: "stable-diffusion-webui",
                extra_data: {
                    a1111: {
                        params: {
                            "ensd": "31337"
                        }
                    }
                }
            },
            parameters: {
                checkpoint: [{
                    model_name: "pastelmix-better-vae-fp16",
                    model_hashes: {
                        a1111_shorthash: "0f0eaaa61e",
                    }
                }],
                conditioning: [{
                    "$meta": {
                        types: ["positive"]
                    },
                    text: "dreamlike fantasy landscape where everything is a shade of pink,\n dog ",
                }, {
                    "$meta": {
                        types: ["negative"]
                    },
                    text: "(worst quality:1.4), (low quality:1.4) , (monochrome:1.1)"
                }],
                clip: [{
                    clip_skip: 2,
                }],
                hypernetwork: [{
                    model_name: "zxcfc",
                    strength: 0.5,
                }],
                lora: [{
                    model_name: "asdfg",
                    module_name: "lora",
                    strength_unet: 0.8,
                    strength_tenc: 0.8,
                }],
                k_sampler: [{
                    cfg_scale: 12,
                    denoise: 1,
                    sampler_name: "dpmpp_2m",
                    scheduler: "karras",
                    seed: 2416682767,
                    steps: 40
                }, {
                    "$meta": {
                        types: ["upscale"]
                    },
                    cfg_scale: 12,
                    denoise: 0.55,
                    sampler_name: "dpmpp_2m",
                    scheduler: "karras",
                    seed: 2416682767,
                    steps: 20
                }],
                latent_image: [{
                    width: 640,
                    height: 512,
                }],
                latent_upscale: [{
                    width: 1280,
                    height: 1024,
                    upscale_by: 2,
                    upscale_method: "Latent"
                }]
            }
        })

        expect(() => ComfyBoxStdPrompt.parse(converted)).not.toThrow();
    }

    test__convertsAdditionalNetworks() {
        const infotext: A1111ParsedInfotext = {
            positive: "1girl, pink hair",
            negative: "(worst quality, low quality:1.4)",
            width: 512,
            height: 768,
            modelHash: "0873291ac5",
            modelName: "AbyssOrangeMix2_nsfw",
            cfgScale: 6,
            sampler: "DPM++ SDE Karras",
            seed: 780207036,
            steps: 20,
            denoise: 0.2,
            extraNetworks: {},
            extraParams: {
                "addnet enabled": "True",
                "addnet model 1": "ElysiaV3-000002(6d3eb064dcc1)",
                "addnet model 2": "elfmorie2(a34cd9a8c3cc)",
                "addnet module 1": "LoRA",
                "addnet module 2": "LoRA",
                "addnet weight a 1": "0.9",
                "addnet weight a 2": "1",
                "addnet weight b 1": "0.7",
                "addnet weight b 2": "0.8",
                "ensd": "31337",
                "mask blur": "1",
                "sd upscale overlap": "64",
                "sd upscale upscaler": "4x_Valar_v1",
                // XXX: just make sure it doesn't fall over for now
                // this prompt format I swear...
                "template": "1girl",
                "negative template": "(worst quality",
            }
        }

        const converted = convertA1111ToStdPrompt(infotext)

        expect(converted).toEqual({
            version: 1,
            metadata: {
                created_with: "stable-diffusion-webui",
                extra_data: {
                    a1111: {
                        params: {
                            "ensd": "31337",
                            // TODO
                            "template": "1girl",
                            "negative template": "(worst quality",
                        }
                    }
                }
            },
            parameters: {
                checkpoint: [{
                    model_name: "AbyssOrangeMix2_nsfw",
                    model_hashes: {
                        a1111_shorthash: "0873291ac5",
                    }
                }],
                conditioning: [{
                    "$meta": {
                        types: ["positive"]
                    },
                    text: "1girl, pink hair",
                }, {
                    "$meta": {
                        types: ["negative"]
                    },
                    text: "(worst quality, low quality:1.4)",
                }],
                lora: [{
                    module_name: "LoRA",
                    model_name: "ElysiaV3-000002",
                    model_hashes: {
                        addnet_shorthash: "6d3eb064dcc1"
                    },
                    strength_unet: 0.9,
                    strength_tenc: 0.7,
                },
                {
                    module_name: "LoRA",
                    model_name: "elfmorie2",
                    model_hashes: {
                        addnet_shorthash: "a34cd9a8c3cc"
                    },
                    strength_unet: 1,
                    strength_tenc: 0.8,
                }],
                k_sampler: [{
                    cfg_scale: 6,
                    denoise: 0.2,
                    sampler_name: "dpmpp_sde",
                    scheduler: "karras",
                    seed: 780207036,
                    steps: 20
                }],
                latent_image: [{
                    width: 512,
                    height: 768,
                    mask_blur: 1
                }],
                sd_upscale: [{
                    upscaler: "4x_Valar_v1",
                    overlap: 64
                }]
            }
        })

        expect(() => ComfyBoxStdPrompt.parse(converted)).not.toThrow();
    }
}
