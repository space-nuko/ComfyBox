import parseA1111 from "$lib/parseA1111";
import { expect } from 'vitest';
import UnitTest from "./UnitTest";

export default class parseA1111Tests extends UnitTest {
    test__parsesBasic() {
        const infotext = `
highest quality, masterpiece, best quality, masterpiece, asuka langley sitting cross legged on a chair
Negative prompt: lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts,signature, watermark, username, blurry, artist name
Size: 512x512, Seed: 2870305590, Steps: 28, Sampler: Euler, CFG scale: 12, Clip skip: 2, Model hash: 925997e9, Aesthetic LR: 0.0005, Aesthetic text: , Aesthetic slerp: False, Aesthetic steps: 15, Aesthetic weight: 0.9, Aesthetic embedding: Belle, Aesthetic slerp angle: 0.1, Aesthetic text negative: False
`

        const parsed = parseA1111(infotext);

        expect(parsed).toEqual({
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
        })
    }

    test__parsesExtraNetworks() {
        const infotext = `
dreamlike fantasy landscape where everything is a shade of pink,
 <lora:asdfg:1:foo:bar> dog <hypernet:0.5:baz:quux>
Negative prompt: (worst quality:1.4), (low quality:1.4) , (monochrome:1.1)
Steps: 40, Sampler: DPM++ 2M Karras, CFG scale: 12, Seed: 2416682767, Size: 640x512, Model hash: 0f0eaaa61e, Model: pastelmix-better-vae-fp16, Denoising strength: 0.55, Clip skip: 2, ENSD: 31337, Hires upscale: 2, Hires steps: 20, Hires upscaler: Latent
`
        const parsed = parseA1111(infotext);

        expect(parsed).toEqual({
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
                    { items: ["0.5", "baz", "quux"], },
                ],
                lora: [
                    { items: ["asdfg", "1", "foo", "bar"] },
                ],
            },
            extraParams: {
                "clip skip": "2",
                "ensd": "31337",
                "hires steps": "20",
                "hires upscale": "2",
                "hires upscaler": "Latent",
            },
        })
    }

    test__parsesXYZGrid() {
        const infotext = `
1girl
Negative prompt: (worst quality, low quality:1.4)
Steps: 20, Sampler: DPM++ SDE Karras, CFG scale: 5, Seed: 1964718363, Size: 512x512, Model hash: 736a6f43c2, Denoising strength: 0.5, Clip skip: 2, Hires upscale: 1.75, Hires steps: 14, Hires upscaler: Latent (nearest-exact), Script: X/Y/Z plot, X Type: Prompt S/R, X Values: "<lora:cru5rb:0.5> , <lora:cru5rb:0.6>,<lora:cru5rb:0.7>,  <lora:cru5rb:0.8> ,<lora:cru5rb:0.9> , <lora:cru5rb:1>,"
`

        const parsed = parseA1111(infotext);

        expect(parsed).toEqual({
            positive: "1girl",
            negative: "(worst quality, low quality:1.4)",
            width: 512,
            height: 512,
            modelHash: "736a6f43c2",
            cfgScale: 5,
            sampler: "DPM++ SDE Karras",
            seed: 1964718363,
            steps: 20,
            denoise: 0.5,
            extraNetworks: {},
            extraParams: {
                "clip skip": "2",
                "hires steps": "14",
                "hires upscale": "1.75",
                "hires upscaler": "Latent (nearest-exact)",
                "script": "X/Y/Z plot",
                "x type": "Prompt S/R",
                "x values": '"<lora:cru5rb:0.5> , <lora:cru5rb:0.6>,<lora:cru5rb:0.7>,  <lora:cru5rb:0.8> ,<lora:cru5rb:0.9> , <lora:cru5rb:1>,"',
            },
        })
    }

    test__parsesDynamicPromptsTemplates() {
        const infotext = `
1girl, pink hair
Negative prompt: (worst quality, low quality:1.4)
Steps: 20, Sampler: DPM++ SDE Karras, CFG scale: 6, Seed: 780207036, Size: 512x768, Model hash: 0873291ac5, Model: AbyssOrangeMix2_nsfw, Denoising strength: 0.2, ENSD: 31337, Mask blur: 1, SD upscale overlap: 64, SD upscale upscaler: 4x_Valar_v1, AddNet Enabled: True, AddNet Module 1: LoRA, AddNet Model 1: ElysiaV3-000002(6d3eb064dcc1), AddNet Weight A 1: 0.9, AddNet Weight B 1: 0.9, AddNet Module 2: LoRA, AddNet Model 2: elfmorie2(a34cd9a8c3cc), AddNet Weight A 2: 1, AddNet Weight B 2: 1
Template: 1girl, __haircolor__
Negative Template: (worst quality, low quality:1.4), __badprompt__
`

        const parsed = parseA1111(infotext);

        expect(parsed).toEqual({
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
                "addnet weight b 1": "0.9",
                "addnet weight b 2": "1",
                "ensd": "31337",
                "low quality": "1.4)",
                "mask blur": "1",
                "sd upscale overlap": "64",
                "sd upscale upscaler": "4x_Valar_v1",
                // XXX: just make sure it doesn't fall over for now
                // this prompt format I swear...
                "template": "1girl",
                "negative template": "(worst quality",
            },
        })
    }
}
