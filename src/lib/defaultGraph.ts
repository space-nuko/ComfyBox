import type SerializedAppState from "./ComfyApp"

const defaultGraph: SerializedAppState = {
  createdBy: "ComfyBox",
  version: 1,
  workflow: {
    last_node_id: 160,
    last_link_id: 245,
    nodes: [
      {
        id: 33,
        type: "ui/text",
        pos: [
          -345.18967539843317,
          300.3925393984385
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 0,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: [
              30
            ]
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Text",
        properties: {
          defaultValue: "",
          multiline: true,
          hidden: false
        },
        widgets_values: [
          "a fluffy corgi wearing sunglasses"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "a fluffy corgi wearing sunglasses",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 35,
        type: "ui/text",
        pos: [
          -343.9796753984334,
          391.14253939843877
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 1,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: [
              31
            ]
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Text",
        properties: {
          defaultValue: "",
          multiline: true,
          hidden: false
        },
        widgets_values: [
          "worst quality"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "worst quality",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 39,
        type: "ui/slider",
        pos: [
          -346.1130753984374,
          523.3667393984382
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 2,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              38,
              83
            ]
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "min",
            type: "number",
            links: null
          },
          {
            name: "max",
            type: "number",
            links: null
          },
          {
            name: "step",
            type: "number",
            links: null
          },
          {
            name: "precision",
            type: "number",
            links: null
          }
        ],
        title: "UI.Slider",
        properties: {
          defaultValue: 1,
          min: 1,
          max: 16,
          step: 1,
          precision: 0,
          hidden: false
        },
        widgets_values: [
          "4.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 4,
        shownOutputProperties: {
          min: {
            type: "number",
            index: 2
          },
          max: {
            type: "number",
            index: 3
          },
          step: {
            type: "number",
            index: 4
          },
          precision: {
            type: "number",
            index: 5
          }
        },
        saveUserState: true
      },
      {
        id: 75,
        type: "ui/combo",
        pos: [
          -340.57880653843677,
          -12.063136000804299
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 3,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: [
              97
            ]
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Combo",
        properties: {
          defaultValue: null,
          values: [],
          hidden: false
        },
        widgets_values: [],
        color: "#223",
        bgColor: "#335",
        comfyValue: "A",
        shownOutputProperties: {},
        saveUserState: false
      },
      {
        id: 80,
        type: "ui/combo",
        pos: [
          -378.1190268824409,
          157.68165265758216
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 4,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: [
              105
            ]
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Combo",
        properties: {
          defaultValue: null,
          values: []
        },
        widgets_values: [],
        color: "#223",
        bgColor: "#335",
        comfyValue: "A",
        shownOutputProperties: {},
        saveUserState: false
      },
      {
        id: 91,
        type: "ui/combo",
        pos: [
          1388.6643069580841,
          200.96841416456488
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 5,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: [
              126
            ]
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Combo",
        properties: {
          defaultValue: "nearest-exact",
          values: [
            "nearest-exact",
            "bilinear",
            "area"
          ]
        },
        widgets_values: [
          "nearest-exact"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "nearest-exact",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 94,
        type: "ui/combo",
        pos: [
          1388.6643069580841,
          260.96841416456544
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 6,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: [
              129
            ]
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Combo",
        properties: {
          defaultValue: "disabled",
          values: [
            "disabled",
            "center"
          ]
        },
        widgets_values: [
          "disabled"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "disabled",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 36,
        type: "EmptyLatentImage",
        pos: [
          -216.57717539843762,
          459.32823939843735
        ],
        size: [
          216.60000000000002,
          66
        ],
        flags: {},
        order: 71,
        mode: 0,
        inputs: [
          {
            name: "width",
            type: "number",
            link: 93,
            config: {},
            serialize: true
          },
          {
            name: "height",
            type: "number",
            link: 94,
            config: {},
            serialize: true
          },
          {
            name: "batch_size",
            type: "number",
            link: 38,
            config: {},
            serialize: true
          }
        ],
        outputs: [
          {
            name: "LATENT",
            type: "LATENT",
            links: [
              39
            ],
            color_off: "orange",
            color_on: "orange",
            slot_index: 0
          }
        ],
        title: "EmptyLatentImage",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "default"
        ]
      },
      {
        id: 40,
        type: "VAEDecode",
        pos: [
          382.42282460156275,
          150.32823939843757
        ],
        size: [
          140,
          46
        ],
        flags: {},
        order: 74,
        mode: 0,
        inputs: [
          {
            name: "samples",
            type: "LATENT",
            link: 40,
            color_off: "orange",
            color_on: "orange",
            config: {}
          },
          {
            name: "vae",
            type: "VAE",
            link: 101,
            color_off: "orange",
            color_on: "orange",
            config: {}
          }
        ],
        outputs: [
          {
            name: "IMAGE",
            type: "IMAGE",
            links: [
              245
            ],
            color_off: "orange",
            color_on: "orange",
            slot_index: 0
          }
        ],
        title: "VAEDecode",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "default"
        ]
      },
      {
        id: 109,
        type: "ui/button",
        pos: [
          1424.334787004682,
          341.46389906416016
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 7,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              151
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "isClicked",
            type: "boolean",
            links: null
          }
        ],
        title: "UI.Button",
        properties: {
          defaultValue: false,
          param: "bang",
          message: "bang"
        },
        widgets_values: [
          "false"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: false,
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 16,
        type: "KSampler",
        pos: [
          188.42282460156238,
          150.32823939843757
        ],
        size: [
          161.2,
          206
        ],
        flags: {},
        order: 69,
        mode: 0,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 112,
            color_off: "orange",
            color_on: "orange",
            config: {}
          },
          {
            name: "seed",
            type: "number",
            link: 80,
            config: {},
            serialize: true
          },
          {
            name: "steps",
            type: "number",
            link: 17,
            config: {},
            serialize: true
          },
          {
            name: "cfg",
            type: "number",
            link: 18,
            config: {},
            serialize: true
          },
          {
            name: "sampler_name",
            type: "string",
            link: 19,
            config: {},
            serialize: true
          },
          {
            name: "scheduler",
            type: "string",
            link: 20,
            config: {},
            serialize: true
          },
          {
            name: "positive",
            type: "CONDITIONING",
            link: 33,
            color_off: "orange",
            color_on: "orange",
            config: {}
          },
          {
            name: "negative",
            type: "CONDITIONING",
            link: 32,
            color_off: "orange",
            color_on: "orange",
            config: {}
          },
          {
            name: "latent_image",
            type: "LATENT",
            link: 39,
            color_off: "orange",
            color_on: "orange",
            config: {}
          },
          {
            name: "denoise",
            type: "number",
            link: 178,
            config: {},
            serialize: true
          }
        ],
        outputs: [
          {
            name: "LATENT",
            type: "LATENT",
            links: [
              40
            ],
            color_off: "orange",
            color_on: "orange",
            slot_index: 0
          }
        ],
        title: "KSampler",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "default"
        ]
      },
      {
        id: 21,
        type: "ui/combo",
        pos: [
          70.02882460156246,
          285.99723939843733
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 8,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: [
              20,
              174
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Combo",
        properties: {
          defaultValue: "karras",
          values: [
            "karras",
            "normal",
            "simple",
            "ddim_uniform"
          ],
          hidden: false
        },
        widgets_values: [
          "normal"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "normal",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 19,
        type: "ui/slider",
        pos: [
          66.02882460156248,
          235.99723939843759
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 9,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              18,
              177
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "min",
            type: "number",
            links: null
          },
          {
            name: "max",
            type: "number",
            links: null
          },
          {
            name: "step",
            type: "number",
            links: null
          },
          {
            name: "precision",
            type: "number",
            links: null
          }
        ],
        title: "UI.Slider",
        properties: {
          defaultValue: 8,
          min: 0,
          max: 100,
          step: 0.5,
          precision: 0,
          hidden: false
        },
        widgets_values: [
          "8.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 8,
        shownOutputProperties: {
          min: {
            type: "number",
            index: 2
          },
          max: {
            type: "number",
            index: 3
          },
          step: {
            type: "number",
            index: 4
          },
          precision: {
            type: "number",
            index: 5
          }
        },
        saveUserState: true
      },
      {
        id: 20,
        type: "ui/combo",
        pos: [
          68.02882460156248,
          260.99723939843733
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 10,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: [
              19,
              173
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Combo",
        properties: {
          defaultValue: "euler",
          values: [
            "euler",
            "euler_ancestral",
            "heun",
            "dpm_2",
            "dpm_2_ancestral",
            "lms",
            "dpm_fast",
            "dpm_adaptive",
            "dpmpp_2s_ancestral",
            "dpmpp_sde",
            "dpmpp_2m",
            "ddim",
            "uni_pc",
            "uni_pc_bh2"
          ],
          hidden: false
        },
        widgets_values: [
          "euler"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "euler",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 120,
        type: "basic/number",
        pos: [
          88.42282460156257,
          358.32823939843735
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 11,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              178
            ],
            label: "1.000",
            slot_index: 0
          }
        ],
        title: "Const Number",
        properties: {
          value: 1
        }
      },
      {
        id: 22,
        type: "ui/slider",
        pos: [
          1466.9857870046842,
          113.61589906415983
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 12,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              169
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "min",
            type: "number",
            links: null
          },
          {
            name: "max",
            type: "number",
            links: null
          },
          {
            name: "step",
            type: "number",
            links: null
          },
          {
            name: "precision",
            type: "number",
            links: null
          }
        ],
        title: "UI.Slider",
        properties: {
          defaultValue: 1,
          min: 0,
          max: 1,
          step: 0.01,
          precision: 0,
          hidden: true
        },
        widgets_values: [
          "0.500"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 0.5,
        shownOutputProperties: {
          min: {
            type: "number",
            index: 2
          },
          max: {
            type: "number",
            index: 3
          },
          step: {
            type: "number",
            index: 4
          },
          precision: {
            type: "number",
            index: 5
          }
        },
        saveUserState: true
      },
      {
        id: 121,
        type: "ui/slider",
        pos: [
          1458.985787004684,
          -28.384100935839506
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 13,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              180
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "min",
            type: "number",
            links: null
          },
          {
            name: "max",
            type: "number",
            links: null
          },
          {
            name: "step",
            type: "number",
            links: null
          },
          {
            name: "precision",
            type: "number",
            links: null
          }
        ],
        title: "UI.Slider",
        properties: {
          defaultValue: 20,
          min: 1,
          max: 100,
          step: 1,
          precision: 0
        },
        widgets_values: [
          "20.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 20,
        shownOutputProperties: {
          min: {
            type: "number",
            index: 2
          },
          max: {
            type: "number",
            index: 3
          },
          step: {
            type: "number",
            index: 4
          },
          precision: {
            type: "number",
            index: 5
          }
        },
        saveUserState: true
      },
      {
        id: 32,
        type: "CLIPTextEncode",
        pos: [
          -215.57717539843762,
          276.32823939843735
        ],
        size: [
          212.10067125600108,
          46
        ],
        flags: {},
        order: 48,
        mode: 0,
        inputs: [
          {
            name: "text",
            type: "string",
            link: 30,
            config: {},
            serialize: true
          },
          {
            name: "clip",
            type: "CLIP",
            link: 110,
            color_off: "orange",
            color_on: "orange",
            config: {}
          }
        ],
        outputs: [
          {
            name: "CONDITIONING",
            type: "CONDITIONING",
            links: [
              33,
              182
            ],
            color_off: "orange",
            color_on: "orange",
            slot_index: 0
          }
        ],
        title: "CLIPTextEncode",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "default",
          "hr"
        ]
      },
      {
        id: 34,
        type: "CLIPTextEncode",
        pos: [
          -213.57717539843762,
          367.32823939843735
        ],
        size: [
          216.60000000000002,
          46
        ],
        flags: {},
        order: 49,
        mode: 0,
        inputs: [
          {
            name: "text",
            type: "string",
            link: 31,
            config: {},
            serialize: true
          },
          {
            name: "clip",
            type: "CLIP",
            link: 111,
            color_off: "orange",
            color_on: "orange",
            config: {}
          }
        ],
        outputs: [
          {
            name: "CONDITIONING",
            type: "CONDITIONING",
            links: [
              32,
              172
            ],
            color_off: "orange",
            color_on: "orange",
            slot_index: 0
          }
        ],
        title: "CLIPTextEncode",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "default",
          "hr"
        ]
      },
      {
        id: 99,
        type: "VAEEncode",
        pos: [
          1210.3010870046833,
          71.84689906416044
        ],
        size: [
          210,
          46
        ],
        flags: {},
        order: 80,
        mode: 0,
        inputs: [
          {
            name: "pixels",
            type: "IMAGE",
            link: 155,
            config: {}
          },
          {
            name: "vae",
            type: "VAE",
            link: 133,
            config: {}
          }
        ],
        outputs: [
          {
            name: "LATENT",
            type: "LATENT",
            links: [
              134
            ],
            slot_index: 0
          }
        ],
        title: "VAEEncode",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "hr"
        ]
      },
      {
        id: 110,
        type: "actions/execute_subgraph",
        pos: [
          1557.9857870046837,
          312.6158990641602
        ],
        size: [
          226.79999999999998,
          46
        ],
        flags: {},
        order: 34,
        mode: 0,
        inputs: [
          {
            name: "execute",
            type: -1,
            link: 151,
            shape: 1
          },
          {
            name: "tag",
            type: "string",
            link: 152
          }
        ],
        outputs: [],
        title: "Comfy.ExecuteSubgraphAction",
        properties: {
          tag: "hr"
        },
        saveUserState: true
      },
      {
        id: 118,
        type: "basic/watch",
        pos: [
          1102.2486933619957,
          667.4778575549991
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 56,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: 0,
            link: 184,
            label: "0.000"
          }
        ],
        outputs: [],
        title: "Watch",
        properties: {
          value: 1
        }
      },
      {
        id: 79,
        type: "LoraLoader",
        pos: [
          -250.57717539843756,
          93.32823939843746
        ],
        size: [
          254.39999999999998,
          106
        ],
        flags: {},
        order: 47,
        mode: 0,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 108,
            config: {}
          },
          {
            name: "clip",
            type: "CLIP",
            link: 109,
            config: {}
          },
          {
            name: "lora_name",
            type: "string",
            link: 105,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "strength_model",
            type: "number",
            link: 106,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "strength_clip",
            type: "number",
            link: 107,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          }
        ],
        outputs: [
          {
            name: "MODEL",
            type: "MODEL",
            links: [
              112,
              183
            ],
            slot_index: 0
          },
          {
            name: "CLIP",
            type: "CLIP",
            links: [
              110,
              111
            ],
            slot_index: 1
          }
        ],
        title: "LoraLoader",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "default",
          "hr"
        ]
      },
      {
        id: 74,
        type: "CheckpointLoaderSimple",
        pos: [
          -222.57717539843762,
          -46.67176060156249
        ],
        size: [
          184.79999999999998,
          66
        ],
        flags: {},
        order: 32,
        mode: 0,
        inputs: [
          {
            name: "ckpt_name",
            type: "string",
            link: 97,
            config: {},
            widgetNodeType: "ui/combo",
            serialize: true,
            defaultWidgetNode: null
          }
        ],
        outputs: [
          {
            name: "MODEL",
            type: "MODEL",
            links: [
              108
            ],
            slot_index: 0
          },
          {
            name: "CLIP",
            type: "CLIP",
            links: [
              109
            ],
            slot_index: 1
          },
          {
            name: "VAE",
            type: "VAE",
            links: [
              101,
              133,
              234
            ],
            slot_index: 2
          }
        ],
        title: "CheckpointLoaderSimple",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "default",
          "hr"
        ]
      },
      {
        id: 70,
        type: "basic/watch",
        pos: [
          -535.6060000000011,
          211.90199999999967
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 77,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: 0,
            link: 87,
            label: "1.000"
          }
        ],
        outputs: [],
        title: "Watch",
        properties: {
          value: 1
        }
      },
      {
        id: 57,
        type: "ui/combo",
        pos: [
          -1107.189,
          287.4150000000001
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 14,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: [
              55,
              79
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Combo",
        properties: {
          defaultValue: "randomize",
          values: [
            "fixed",
            "increment",
            "decrement",
            "randomize"
          ],
          hidden: false
        },
        widgets_values: [
          "randomize"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "randomize",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 78,
        type: "basic/string",
        pos: [
          673.2486933619983,
          634.4778575549986
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 15,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              104
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "Prompt generated!"
        }
      },
      {
        id: 123,
        type: "basic/string",
        pos: [
          2045.9857870046853,
          221.61589906416032
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 16,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              185
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "Upscale complete!"
        }
      },
      {
        id: 111,
        type: "basic/string",
        pos: [
          1460.985787004684,
          363.61589906416043
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 17,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              152
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "hr"
        }
      },
      {
        id: 108,
        type: "ui/text",
        pos: [
          1108,
          501
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 53,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: 165
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: null
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Text",
        properties: {
          defaultValue: "",
          multiline: false
        },
        widgets_values: [
          "cached"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "cached",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 69,
        type: "basic/integer",
        pos: [
          -603.4780000000004,
          346.9650000000004
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 18,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              85
            ],
            label: "1",
            slot_index: 0
          }
        ],
        title: "Const Integer",
        properties: {
          value: 1
        }
      },
      {
        id: 18,
        type: "ui/slider",
        pos: [
          64.67601269531251,
          209.33800634765626
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 19,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              17
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "min",
            type: "number",
            links: null
          },
          {
            name: "max",
            type: "number",
            links: null
          },
          {
            name: "step",
            type: "number",
            links: null
          },
          {
            name: "precision",
            type: "number",
            links: null
          }
        ],
        title: "UI.Slider",
        properties: {
          defaultValue: 20,
          min: 1,
          max: 100,
          step: 1,
          precision: 0,
          hidden: false
        },
        widgets_values: [
          "20.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 20,
        shownOutputProperties: {
          min: {
            type: "number",
            index: 2
          },
          max: {
            type: "number",
            index: 3
          },
          step: {
            type: "number",
            index: 4
          },
          precision: {
            type: "number",
            index: 5
          }
        },
        saveUserState: true
      },
      {
        id: 63,
        type: "utils/selector2",
        pos: [
          -696.2890000000004,
          187.11900000000014
        ],
        size: [
          140,
          66
        ],
        flags: {},
        order: 76,
        mode: 0,
        inputs: [
          {
            name: "select",
            type: "boolean",
            link: 74
          },
          {
            name: "true",
            type: "*",
            link: 75
          },
          {
            name: "false",
            type: "*",
            link: 86,
            slot_index: 2
          }
        ],
        outputs: [
          {
            name: "out",
            type: "*",
            links: [
              87,
              88
            ],
            slot_index: 0
          }
        ],
        title: "Comfy.Selector2",
        properties: {
          value: null
        },
        saveUserState: true
      },
      {
        id: 107,
        type: "actions/queue_events",
        pos: [
          -1155.0000000000002,
          321.07699999999994
        ],
        size: [
          142.79999999999998,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 20,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "beforeQueued",
            type: -2,
            links: [
              149
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "afterQueued",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "prompt",
            type: "*",
            links: null
          }
        ],
        title: "Comfy.QueueEvents",
        properties: {
          prompt: null
        },
        saveUserState: true
      },
      {
        id: 56,
        type: "utils/value_control",
        pos: [
          -979,
          277
        ],
        size: [
          151.2,
          126
        ],
        flags: {},
        order: 75,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: 68
          },
          {
            name: "trigger",
            type: -1,
            link: 149,
            shape: 1
          },
          {
            name: "action",
            type: "string",
            link: 55,
            config: {
              defaultValue: "randomize",
              values: [
                "fixed",
                "increment",
                "decrement",
                "randomize"
              ]
            }
          },
          {
            name: "min",
            type: "number",
            link: 69
          },
          {
            name: "max",
            type: "number",
            link: 70
          },
          {
            name: "step",
            type: "number",
            link: 88
          }
        ],
        outputs: [
          {
            name: "value",
            type: "*",
            links: [
              67
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Comfy.ValueControl",
        properties: {
          value: 730502003782738,
          action: "randomize",
          min: 0,
          max: 18446744073709552000,
          step: 1
        },
        saveUserState: true
      },
      {
        id: 17,
        type: "ui/slider",
        pos: [
          -746,
          358
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 70,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: 67,
            slot_index: 0
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              68,
              80,
              175
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "min",
            type: "number",
            links: [
              69
            ],
            slot_index: 2
          },
          {
            name: "max",
            type: "number",
            links: [
              70
            ],
            slot_index: 3
          },
          {
            name: "step",
            type: "number",
            links: [
              75
            ],
            slot_index: 4
          },
          {
            name: "precision",
            type: "number",
            links: null
          }
        ],
        title: "UI.Slider",
        properties: {
          defaultValue: 0,
          min: 0,
          max: 18446744073709552000,
          step: 1,
          precision: 0,
          hidden: false
        },
        widgets_values: [
          "730502003782738.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 730502003782738,
        shownOutputProperties: {
          min: {
            type: "number",
            index: 2
          },
          max: {
            type: "number",
            index: 3
          },
          step: {
            type: "number",
            index: 4
          },
          precision: {
            type: "number",
            index: 5
          }
        },
        saveUserState: true
      },
      {
        id: 67,
        type: "math/operation",
        pos: [
          -522,
          346
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 35,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "number,array,object",
            link: 85
          },
          {
            name: "B",
            type: "number",
            link: 83
          }
        ],
        outputs: [
          {
            name: "=",
            type: "number",
            links: [
              86
            ],
            slot_index: 0
          }
        ],
        title: "Operation",
        properties: {
          A: 1,
          B: 4,
          OP: "+"
        }
      },
      {
        id: 64,
        type: "basic/CompareValues",
        pos: [
          -813,
          208
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 36,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: 0,
            link: 78
          },
          {
            name: "B",
            type: 0,
            link: 79
          }
        ],
        outputs: [
          {
            name: "true",
            type: "boolean",
            links: [
              74
            ],
            slot_index: 0
          },
          {
            name: "false",
            type: "boolean",
            links: null
          }
        ],
        title: "GenericCompare",
        properties: {
          A: "randomize",
          B: "randomize",
          OP: "==",
          enabled: true
        }
      },
      {
        id: 66,
        type: "basic/string",
        pos: [
          -943,
          209
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 21,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              78
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "randomize"
        }
      },
      {
        id: 112,
        type: "LoadImage",
        pos: [
          1208.4379300390613,
          -42.6732724560547
        ],
        size: [
          210,
          46
        ],
        flags: {},
        order: 54,
        mode: 0,
        inputs: [
          {
            name: "image",
            type: "string",
            link: 164,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          }
        ],
        outputs: [
          {
            name: "IMAGE",
            type: "IMAGE",
            links: [
              155
            ],
            slot_index: 0
          },
          {
            name: "MASK",
            type: "MASK",
            links: null
          }
        ],
        title: "LoadImage",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "hr"
        ]
      },
      {
        id: 45,
        type: "ui/text",
        pos: [
          395,
          331
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 22,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: [
              238,
              244
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Text",
        properties: {
          defaultValue: "ComfyUI",
          multiline: false,
          hidden: false
        },
        widgets_values: [
          "ComfyUI"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "ComfyUI",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 71,
        type: "actions/swap",
        pos: [
          -531,
          461
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: false
        },
        order: 78,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "*",
            link: 89
          },
          {
            name: "B",
            type: "*",
            link: 90
          },
          {
            name: "swap",
            type: -1,
            link: 95,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "B",
            type: "*",
            links: [
              91
            ],
            slot_index: 0
          },
          {
            name: "A",
            type: "*",
            links: [
              92
            ],
            slot_index: 1
          }
        ],
        title: "Comfy.SwapAction",
        properties: {},
        saveUserState: true
      },
      {
        id: 62,
        type: "ui/button",
        pos: [
          -648,
          524
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 23,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              95
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "isClicked",
            type: "boolean",
            links: null
          }
        ],
        title: "UI.Button",
        properties: {
          defaultValue: false,
          param: "bang",
          message: "bang",
          hidden: false
        },
        widgets_values: [
          "false"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: false,
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 127,
        type: "actions/execute_subgraph",
        pos: [
          297,
          -73
        ],
        size: [
          226.79999999999998,
          46
        ],
        flags: {},
        order: 37,
        mode: 0,
        inputs: [
          {
            name: "execute",
            type: -1,
            link: 191,
            shape: 1
          },
          {
            name: "tag",
            type: "string",
            link: 192
          }
        ],
        outputs: [],
        title: "Comfy.ExecuteSubgraphAction",
        properties: {
          tag: "default"
        },
        saveUserState: true
      },
      {
        id: 128,
        type: "basic/string",
        pos: [
          198,
          -26
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 24,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              192
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "default"
        }
      },
      {
        id: 126,
        type: "ui/button",
        pos: [
          178,
          -57
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 25,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              191
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "isClicked",
            type: "boolean",
            links: null
          }
        ],
        title: "UI.Button",
        properties: {
          defaultValue: false,
          param: "bang",
          message: "bang"
        },
        widgets_values: [
          "false"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: false,
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 37,
        type: "ui/slider",
        pos: [
          -348,
          478
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 72,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: 92
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              89,
              93,
              200
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "min",
            type: "number",
            links: null
          },
          {
            name: "max",
            type: "number",
            links: null
          },
          {
            name: "step",
            type: "number",
            links: null
          },
          {
            name: "precision",
            type: "number",
            links: null
          }
        ],
        title: "UI.Slider",
        properties: {
          defaultValue: 512,
          min: 64,
          max: 2048,
          step: 64,
          precision: 0,
          hidden: false
        },
        widgets_values: [
          "512.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 512,
        shownOutputProperties: {
          min: {
            type: "number",
            index: 2
          },
          max: {
            type: "number",
            index: 3
          },
          step: {
            type: "number",
            index: 4
          },
          precision: {
            type: "number",
            index: 5
          }
        },
        saveUserState: true
      },
      {
        id: 38,
        type: "ui/slider",
        pos: [
          -346,
          502
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 73,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: 91
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              90,
              94,
              201
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "min",
            type: "number",
            links: null
          },
          {
            name: "max",
            type: "number",
            links: null
          },
          {
            name: "step",
            type: "number",
            links: null
          },
          {
            name: "precision",
            type: "number",
            links: null
          }
        ],
        title: "UI.Slider",
        properties: {
          defaultValue: 512,
          min: 64,
          max: 2048,
          step: 64,
          precision: 0,
          hidden: false
        },
        widgets_values: [
          "512.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 512,
        shownOutputProperties: {
          min: {
            type: "number",
            index: 2
          },
          max: {
            type: "number",
            index: 3
          },
          step: {
            type: "number",
            index: 4
          },
          precision: {
            type: "number",
            index: 5
          }
        },
        saveUserState: true
      },
      {
        id: 136,
        type: "string/toString",
        pos: [
          1206.8279300390627,
          305.9667275439455
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 63,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "",
            link: 210
          }
        ],
        outputs: [
          {
            name: "out",
            type: "string",
            links: [
              203
            ],
            slot_index: 0
          }
        ],
        title: "ToString",
        properties: {}
      },
      {
        id: 134,
        type: "ui/text",
        pos: [
          1315.9379300390594,
          169.92672754394547
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 61,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: 205
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: null
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Text",
        properties: {
          defaultValue: "",
          multiline: false
        },
        widgets_values: [
          "1024"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "1024",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 137,
        type: "string/toString",
        pos: [
          1215.9379300390615,
          171.4267275439454
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 64,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "",
            link: 208
          }
        ],
        outputs: [
          {
            name: "out",
            type: "string",
            links: [
              205
            ],
            slot_index: 0
          }
        ],
        title: "ToString",
        properties: {}
      },
      {
        id: 135,
        type: "ui/text",
        pos: [
          1310.4379300390613,
          307.3267275439454
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 62,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: 203
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: null
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.Text",
        properties: {
          defaultValue: "",
          multiline: false
        },
        widgets_values: [
          "1024"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "1024",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 138,
        type: "math/floor",
        pos: [
          1315.337930039061,
          219.6267275439453
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 65,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "number",
            link: 206
          }
        ],
        outputs: [
          {
            name: "out",
            type: "number",
            links: [
              207,
              208
            ],
            slot_index: 0
          }
        ],
        title: "Floor",
        properties: {}
      },
      {
        id: 90,
        type: "LatentUpscale",
        pos: [
          1518.5659630046853,
          156.84021606416005
        ],
        size: [
          267,
          106
        ],
        flags: {},
        order: 79,
        mode: 0,
        inputs: [
          {
            name: "samples",
            type: "LATENT",
            link: 134,
            config: {}
          },
          {
            name: "upscale_method",
            type: "string",
            link: 126,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "width",
            type: "number",
            link: 207,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "height",
            type: "number",
            link: 211,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "crop",
            type: "string",
            link: 129,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          }
        ],
        outputs: [
          {
            name: "LATENT",
            type: "LATENT",
            links: [
              170
            ],
            slot_index: 0
          }
        ],
        title: "LatentUpscale",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "hr"
        ]
      },
      {
        id: 133,
        type: "math/operation",
        pos: [
          1225.4379300390613,
          204.22672754394537
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 60,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "number,array,object",
            link: 199
          },
          {
            name: "B",
            type: "number",
            link: 200
          }
        ],
        outputs: [
          {
            name: "=",
            type: "number",
            links: [
              206
            ],
            slot_index: 0
          }
        ],
        title: "Operation",
        properties: {
          A: 2,
          B: 512,
          OP: "*"
        }
      },
      {
        id: 129,
        type: "math/operation",
        pos: [
          1239.4379300390613,
          274.3267275439454
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 59,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "number,array,object",
            link: 198
          },
          {
            name: "B",
            type: "number",
            link: 201
          }
        ],
        outputs: [
          {
            name: "=",
            type: "number",
            links: [
              209
            ],
            slot_index: 0
          }
        ],
        title: "Operation",
        properties: {
          A: 2,
          B: 512,
          OP: "*"
        }
      },
      {
        id: 139,
        type: "math/floor",
        pos: [
          1315.4379300390613,
          243.3267275439455
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 66,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "number",
            link: 209
          }
        ],
        outputs: [
          {
            name: "out",
            type: "number",
            links: [
              210,
              211
            ],
            slot_index: 0
          }
        ],
        title: "Floor",
        properties: {}
      },
      {
        id: 93,
        type: "ui/slider",
        pos: [
          1194.4379300390613,
          238.32672754394542
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 26,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              198,
              199
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "min",
            type: "number",
            links: null
          },
          {
            name: "max",
            type: "number",
            links: null
          },
          {
            name: "step",
            type: "number",
            links: null
          },
          {
            name: "precision",
            type: "number",
            links: null
          }
        ],
        title: "UI.Slider",
        properties: {
          defaultValue: 512,
          min: 1,
          max: 4,
          step: 0.1,
          precision: 0
        },
        widgets_values: [
          "2.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 2,
        shownOutputProperties: {
          min: {
            type: "number",
            index: 2
          },
          max: {
            type: "number",
            index: 3
          },
          step: {
            type: "number",
            index: 4
          },
          precision: {
            type: "number",
            index: 5
          }
        },
        saveUserState: true
      },
      {
        id: 140,
        type: "actions/queue_events",
        pos: [
          1811.4379300390613,
          227.32672754394528
        ],
        size: [
          142.79999999999998,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 27,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "beforeQueued",
            type: -2,
            links: [
              212
            ],
            shape: 1
          },
          {
            name: "afterQueued",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "prompt",
            type: "*",
            links: null
          }
        ],
        title: "Comfy.QueueEvents",
        properties: {
          prompt: null
        },
        saveUserState: true
      },
      {
        id: 141,
        type: "events/filter",
        pos: [
          1822.4379300390613,
          267.3267275439454
        ],
        size: [
          210,
          150
        ],
        flags: {
          collapsed: true
        },
        order: 38,
        mode: 0,
        inputs: [
          {
            name: "event",
            type: -1,
            link: 212,
            shape: 1,
            slot_index: 0
          },
          {
            name: "compare_value",
            type: "*",
            link: null
          }
        ],
        outputs: [
          {
            name: "accept",
            type: -2,
            links: [
              216
            ],
            shape: 1
          },
          {
            name: "reject",
            type: -2,
            links: [],
            shape: 1
          }
        ],
        title: "Filter Event",
        properties: {
          compareValue: 0,
          propertyName: "queueRemaining",
          mode: "property",
          operation: "=="
        }
      },
      {
        id: 145,
        type: "events/filter",
        pos: [
          1816.4379300390613,
          303.3267275439454
        ],
        size: [
          210,
          150
        ],
        flags: {
          collapsed: true
        },
        order: 41,
        mode: 0,
        inputs: [
          {
            name: "event",
            type: -1,
            link: 216,
            shape: 1,
            slot_index: 0
          },
          {
            name: "compare_value",
            type: "*",
            link: null
          }
        ],
        outputs: [
          {
            name: "accept",
            type: -2,
            links: [
              230
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "reject",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Filter Event",
        properties: {
          compareValue: "hr",
          propertyName: "subgraph",
          mode: "property",
          operation: "=="
        }
      },
      {
        id: 148,
        type: "events/filter",
        pos: [
          607.799999999999,
          765.4000000000001
        ],
        size: [
          210,
          150
        ],
        flags: {
          collapsed: true
        },
        order: 39,
        mode: 0,
        inputs: [
          {
            name: "event",
            type: -1,
            link: 219,
            shape: 1,
            slot_index: 0
          },
          {
            name: "compare_value",
            type: "*",
            link: null
          }
        ],
        outputs: [
          {
            name: "accept",
            type: -2,
            links: [
              220
            ],
            shape: 1
          },
          {
            name: "reject",
            type: -2,
            links: [],
            shape: 1
          }
        ],
        title: "Filter Event",
        properties: {
          compareValue: 0,
          propertyName: "queueRemaining",
          mode: "property",
          operation: "=="
        }
      },
      {
        id: 149,
        type: "events/filter",
        pos: [
          604.799999999999,
          798.4000000000001
        ],
        size: [
          210,
          150
        ],
        flags: {
          collapsed: true
        },
        order: 42,
        mode: 0,
        inputs: [
          {
            name: "event",
            type: -1,
            link: 220,
            shape: 1,
            slot_index: 0
          },
          {
            name: "compare_value",
            type: "*",
            link: null
          }
        ],
        outputs: [
          {
            name: "accept",
            type: -2,
            links: [
              227
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "reject",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Filter Event",
        properties: {
          compareValue: "default",
          propertyName: "subgraph",
          mode: "property",
          operation: "=="
        }
      },
      {
        id: 152,
        type: "basic/integer",
        pos: [
          -508.8369999999996,
          49.28399999999989
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 28,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              223
            ],
            label: "0",
            slot_index: 0
          }
        ],
        title: "Const Integer",
        properties: {
          value: 0
        }
      },
      {
        id: 81,
        type: "ui/slider",
        pos: [
          -378,
          178
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 43,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: 224,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              106
            ]
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "min",
            type: "number",
            links: null
          },
          {
            name: "max",
            type: "number",
            links: null
          },
          {
            name: "step",
            type: "number",
            links: null
          },
          {
            name: "precision",
            type: "number",
            links: null
          }
        ],
        title: "UI.Slider",
        properties: {
          defaultValue: 1,
          min: -10,
          max: 10,
          step: 0.01,
          precision: 0
        },
        widgets_values: [
          "0.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 0,
        shownOutputProperties: {
          min: {
            type: "number",
            index: 2
          },
          max: {
            type: "number",
            index: 3
          },
          step: {
            type: "number",
            index: 4
          },
          precision: {
            type: "number",
            index: 5
          }
        },
        saveUserState: true
      },
      {
        id: 82,
        type: "ui/slider",
        pos: [
          -378,
          210
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 44,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: 225,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              107
            ]
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "min",
            type: "number",
            links: null
          },
          {
            name: "max",
            type: "number",
            links: null
          },
          {
            name: "step",
            type: "number",
            links: null
          },
          {
            name: "precision",
            type: "number",
            links: null
          }
        ],
        title: "UI.Slider",
        properties: {
          defaultValue: 1,
          min: -10,
          max: 10,
          step: 0.01,
          precision: 0
        },
        widgets_values: [
          "0.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 0,
        shownOutputProperties: {
          min: {
            type: "number",
            index: 2
          },
          max: {
            type: "number",
            index: 3
          },
          step: {
            type: "number",
            index: 4
          },
          precision: {
            type: "number",
            index: 5
          }
        },
        saveUserState: true
      },
      {
        id: 147,
        type: "actions/queue_events",
        pos: [
          593,
          732
        ],
        size: [
          142.79999999999998,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 29,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "beforeQueued",
            type: -2,
            links: [
              219
            ],
            shape: 1
          },
          {
            name: "afterQueued",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "prompt",
            type: "*",
            links: null
          }
        ],
        title: "Comfy.QueueEvents",
        properties: {
          prompt: null
        },
        saveUserState: true
      },
      {
        id: 104,
        type: "ui/gallery",
        pos: [
          862.248693361997,
          640.4778575549986
        ],
        size: [
          210,
          122
        ],
        flags: {},
        order: 52,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "OUTPUT",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: 243,
            shape: 1
          },
          {
            name: "clear",
            type: -1,
            link: 229,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "selected_index",
            type: "number",
            links: [
              168,
              184
            ],
            slot_index: 0
          }
        ],
        title: "UI.Gallery",
        properties: {
          defaultValue: null,
          index: 0,
          updateMode: "append",
          values: []
        },
        widgets_values: [],
        color: "#223",
        bgColor: "#335",
        comfyValue: [],
        shownOutputProperties: {},
        saveUserState: false
      },
      {
        id: 103,
        type: "ui/gallery",
        pos: [
          2051.985787004686,
          76.61589906416023
        ],
        size: [
          210,
          122
        ],
        flags: {},
        order: 51,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "IMAGE",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: 240,
            shape: 1
          },
          {
            name: "clear",
            type: -1,
            link: 232,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "selected_index",
            type: "number",
            links: null
          }
        ],
        title: "UI.Gallery",
        properties: {
          defaultValue: null,
          index: 0,
          updateMode: "append",
          values: []
        },
        widgets_values: [],
        color: "#223",
        bgColor: "#335",
        comfyValue: [],
        shownOutputProperties: {},
        saveUserState: false
      },
      {
        id: 153,
        type: "ui/checkbox",
        pos: [
          1457,
          641
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 30,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "value",
            type: "boolean",
            links: [
              228,
              231
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: [],
            shape: 1,
            slot_index: 1
          }
        ],
        title: "UI.Checkbox",
        properties: {
          defaultValue: false
        },
        widgets_values: [
          "false"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: false,
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 155,
        type: "events/branch",
        pos: [
          735,
          798
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 46,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 227,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 228
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: null,
            shape: 1,
            slot_index: 0
          },
          {
            name: "false",
            type: -2,
            links: [
              229,
              233
            ],
            shape: 1,
            slot_index: 1
          }
        ],
        title: "Branch",
        properties: {}
      },
      {
        id: 116,
        type: "image/cache",
        pos: [
          869,
          459
        ],
        size: [
          210,
          166
        ],
        flags: {},
        order: 55,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "OUTPUT",
            link: null,
            slot_index: 0
          },
          {
            name: "index",
            type: "number",
            link: 168
          },
          {
            name: "store",
            type: -1,
            link: 242,
            shape: 1,
            slot_index: 2
          },
          {
            name: "clear",
            type: -1,
            link: 233,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "filename",
            type: "string",
            links: [
              164
            ],
            slot_index: 0
          },
          {
            name: "state",
            type: "string",
            links: [
              165
            ],
            slot_index: 1
          }
        ],
        title: "Comfy.ImageCache",
        properties: {
          images: {
            images: [
              {
                filename: "ComfyUI_01333_.png",
                subfolder: "",
                type: "output"
              },
              {
                filename: "ComfyUI_01334_.png",
                subfolder: "",
                type: "output"
              },
              {
                filename: "ComfyUI_01335_.png",
                subfolder: "",
                type: "output"
              },
              {
                filename: "ComfyUI_01336_.png",
                subfolder: "",
                type: "output"
              }
            ]
          },
          index: 0,
          filenames: {
            0: {
              filename: "ComfyUI_01333_.png",
              status: "cached"
            }
          },
          genNumber: 68,
          updateMode: "append"
        },
        saveUserState: true
      },
      {
        id: 100,
        type: "VAEDecode",
        pos: [
          1834.9857870046837,
          -86.3841009358395
        ],
        size: [
          210,
          46
        ],
        flags: {},
        order: 50,
        mode: 0,
        inputs: [
          {
            name: "samples",
            type: "LATENT",
            link: 179,
            config: {}
          },
          {
            name: "vae",
            type: "VAE",
            link: 234,
            config: {}
          }
        ],
        outputs: [
          {
            name: "IMAGE",
            type: "IMAGE",
            links: [
              239
            ],
            slot_index: 0
          }
        ],
        title: "VAEDecode",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "hr"
        ]
      },
      {
        id: 156,
        type: "events/branch",
        pos: [
          1955.1662000000001,
          360.7267458544923
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 45,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 230,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 231
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "false",
            type: -2,
            links: [
              232
            ],
            shape: 1,
            slot_index: 1
          }
        ],
        title: "Branch",
        properties: {}
      },
      {
        id: 150,
        type: "ui/button",
        pos: [
          -551.8369999999995,
          88.28399999999995
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 31,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              222
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "isClicked",
            type: "boolean",
            links: null
          }
        ],
        title: "UI.Button",
        properties: {
          defaultValue: false,
          param: "bang"
        },
        widgets_values: [
          "false"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: false,
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 151,
        type: "actions/copy",
        pos: [
          -442,
          59
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 40,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "*",
            link: 223
          },
          {
            name: "copy",
            type: -1,
            link: 222,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              224,
              225
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.CopyAction",
        properties: {
          value: 0
        },
        saveUserState: true
      },
      {
        id: 159,
        type: "SaveImage",
        pos: [
          1831,
          -8
        ],
        size: [
          220,
          46
        ],
        flags: {},
        order: 68,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "IMAGE",
            link: 239,
            config: {}
          },
          {
            name: "filename_prefix",
            type: "string",
            link: 238,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/text",
            serialize: true
          }
        ],
        outputs: [
          {
            name: "onExecuted",
            type: -2,
            links: [
              240,
              241
            ],
            color_off: "rebeccapurple",
            color_on: "rebeccapurple",
            shape: 1,
            slot_index: 0
          }
        ],
        title: "SaveImage",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "hr"
        ]
      },
      {
        id: 122,
        type: "actions/notify",
        pos: [
          2046,
          251
        ],
        size: [
          151.2,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 58,
        mode: 0,
        inputs: [
          {
            name: "message",
            type: "string",
            link: 185
          },
          {
            name: "trigger",
            type: -1,
            link: 241,
            shape: 1,
            slot_index: 1
          }
        ],
        outputs: [],
        title: "Comfy.NotifyAction",
        properties: {
          message: "Nya."
        },
        saveUserState: true
      },
      {
        id: 77,
        type: "actions/notify",
        pos: [
          674,
          665
        ],
        size: [
          151.2,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 33,
        mode: 0,
        inputs: [
          {
            name: "message",
            type: "string",
            link: 104
          },
          {
            name: "trigger",
            type: -1,
            link: null,
            shape: 1,
            slot_index: 1
          }
        ],
        outputs: [],
        title: "Comfy.NotifyAction",
        properties: {
          message: "Nya."
        },
        saveUserState: true
      },
      {
        id: 157,
        type: "SaveImage",
        pos: [
          375,
          236
        ],
        size: [
          220,
          46
        ],
        flags: {},
        order: 67,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "IMAGE",
            link: 245,
            config: {}
          },
          {
            name: "filename_prefix",
            type: "string",
            link: 244,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/text",
            serialize: true
          }
        ],
        outputs: [
          {
            name: "onExecuted",
            type: -2,
            links: [
              242,
              243
            ],
            color_off: "rebeccapurple",
            color_on: "rebeccapurple",
            shape: 1,
            slot_index: 0
          }
        ],
        title: "SaveImage",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "default"
        ]
      },
      {
        id: 119,
        type: "KSampler",
        pos: [
          1569,
          -90
        ],
        size: [
          241.79999999999998,
          206
        ],
        flags: {},
        order: 57,
        mode: 0,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 183,
            config: {}
          },
          {
            name: "seed",
            type: "number",
            link: 175,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "steps",
            type: "number",
            link: 180,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "cfg",
            type: "number",
            link: 177,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "sampler_name",
            type: "string",
            link: 173,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "scheduler",
            type: "string",
            link: 174,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "positive",
            type: "CONDITIONING",
            link: 182,
            slot_index: 6,
            config: {}
          },
          {
            name: "negative",
            type: "CONDITIONING",
            link: 172,
            slot_index: 7,
            config: {}
          },
          {
            name: "latent_image",
            type: "LATENT",
            link: 170,
            config: {}
          },
          {
            name: "denoise",
            type: "number",
            link: 169,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          }
        ],
        outputs: [
          {
            name: "LATENT",
            type: "LATENT",
            links: [
              179
            ],
            slot_index: 0
          }
        ],
        title: "KSampler",
        properties: {},
        color: "#432",
        bgColor: "#653",
        saveUserState: true,
        tags: [
          "hr"
        ]
      }
    ],
    links: [
      [
        17,
        18,
        0,
        16,
        2,
        "number"
      ],
      [
        18,
        19,
        0,
        16,
        3,
        "number"
      ],
      [
        19,
        20,
        0,
        16,
        4,
        "string"
      ],
      [
        20,
        21,
        0,
        16,
        5,
        "string"
      ],
      [
        30,
        33,
        0,
        32,
        0,
        "string"
      ],
      [
        31,
        35,
        0,
        34,
        0,
        "string"
      ],
      [
        32,
        34,
        0,
        16,
        7,
        "CONDITIONING"
      ],
      [
        33,
        32,
        0,
        16,
        6,
        "CONDITIONING"
      ],
      [
        38,
        39,
        0,
        36,
        2,
        "number"
      ],
      [
        39,
        36,
        0,
        16,
        8,
        "LATENT"
      ],
      [
        40,
        16,
        0,
        40,
        0,
        "LATENT"
      ],
      [
        55,
        57,
        0,
        56,
        2,
        "string"
      ],
      [
        67,
        56,
        0,
        17,
        0,
        "number"
      ],
      [
        68,
        17,
        0,
        56,
        0,
        "number"
      ],
      [
        69,
        17,
        2,
        56,
        3,
        "number"
      ],
      [
        70,
        17,
        3,
        56,
        4,
        "number"
      ],
      [
        74,
        64,
        0,
        63,
        0,
        "boolean"
      ],
      [
        75,
        17,
        4,
        63,
        1,
        "*"
      ],
      [
        78,
        66,
        0,
        64,
        0,
        "string"
      ],
      [
        79,
        57,
        0,
        64,
        1,
        "string"
      ],
      [
        80,
        17,
        0,
        16,
        1,
        "number"
      ],
      [
        83,
        39,
        0,
        67,
        1,
        "number"
      ],
      [
        85,
        69,
        0,
        67,
        0,
        "number,array,object"
      ],
      [
        86,
        67,
        0,
        63,
        2,
        "*"
      ],
      [
        87,
        63,
        0,
        70,
        0,
        "*"
      ],
      [
        88,
        63,
        0,
        56,
        5,
        "number"
      ],
      [
        89,
        37,
        0,
        71,
        0,
        "*"
      ],
      [
        90,
        38,
        0,
        71,
        1,
        "*"
      ],
      [
        91,
        71,
        0,
        38,
        0,
        "number"
      ],
      [
        92,
        71,
        1,
        37,
        0,
        "number"
      ],
      [
        93,
        37,
        0,
        36,
        0,
        "number"
      ],
      [
        94,
        38,
        0,
        36,
        1,
        "number"
      ],
      [
        95,
        62,
        0,
        71,
        2,
        -1
      ],
      [
        97,
        75,
        0,
        74,
        0,
        "string"
      ],
      [
        101,
        74,
        2,
        40,
        1,
        "VAE"
      ],
      [
        104,
        78,
        0,
        77,
        0,
        "string"
      ],
      [
        105,
        80,
        0,
        79,
        2,
        "string"
      ],
      [
        106,
        81,
        0,
        79,
        3,
        "number"
      ],
      [
        107,
        82,
        0,
        79,
        4,
        "number"
      ],
      [
        108,
        74,
        0,
        79,
        0,
        "MODEL"
      ],
      [
        109,
        74,
        1,
        79,
        1,
        "CLIP"
      ],
      [
        110,
        79,
        1,
        32,
        1,
        "CLIP"
      ],
      [
        111,
        79,
        1,
        34,
        1,
        "CLIP"
      ],
      [
        112,
        79,
        0,
        16,
        0,
        "MODEL"
      ],
      [
        126,
        91,
        0,
        90,
        1,
        "string"
      ],
      [
        129,
        94,
        0,
        90,
        4,
        "string"
      ],
      [
        133,
        74,
        2,
        99,
        1,
        "VAE"
      ],
      [
        134,
        99,
        0,
        90,
        0,
        "LATENT"
      ],
      [
        149,
        107,
        0,
        56,
        1,
        -1
      ],
      [
        151,
        109,
        0,
        110,
        0,
        -1
      ],
      [
        152,
        111,
        0,
        110,
        1,
        "string"
      ],
      [
        155,
        112,
        0,
        99,
        0,
        "IMAGE"
      ],
      [
        164,
        116,
        0,
        112,
        0,
        "string"
      ],
      [
        165,
        116,
        1,
        108,
        0,
        "string"
      ],
      [
        168,
        104,
        0,
        116,
        1,
        "number"
      ],
      [
        169,
        22,
        0,
        119,
        9,
        "number"
      ],
      [
        170,
        90,
        0,
        119,
        8,
        "LATENT"
      ],
      [
        172,
        34,
        0,
        119,
        7,
        "CONDITIONING"
      ],
      [
        173,
        20,
        0,
        119,
        4,
        "string"
      ],
      [
        174,
        21,
        0,
        119,
        5,
        "string"
      ],
      [
        175,
        17,
        0,
        119,
        1,
        "number"
      ],
      [
        177,
        19,
        0,
        119,
        3,
        "number"
      ],
      [
        178,
        120,
        0,
        16,
        9,
        "number"
      ],
      [
        179,
        119,
        0,
        100,
        0,
        "LATENT"
      ],
      [
        180,
        121,
        0,
        119,
        2,
        "number"
      ],
      [
        182,
        32,
        0,
        119,
        6,
        "CONDITIONING"
      ],
      [
        183,
        79,
        0,
        119,
        0,
        "MODEL"
      ],
      [
        184,
        104,
        0,
        118,
        0,
        "number"
      ],
      [
        185,
        123,
        0,
        122,
        0,
        "string"
      ],
      [
        191,
        126,
        0,
        127,
        0,
        -1
      ],
      [
        192,
        128,
        0,
        127,
        1,
        "string"
      ],
      [
        198,
        93,
        0,
        129,
        0,
        "number,array,object"
      ],
      [
        199,
        93,
        0,
        133,
        0,
        "number,array,object"
      ],
      [
        200,
        37,
        0,
        133,
        1,
        "number"
      ],
      [
        201,
        38,
        0,
        129,
        1,
        "number"
      ],
      [
        203,
        136,
        0,
        135,
        0,
        "string"
      ],
      [
        205,
        137,
        0,
        134,
        0,
        "string"
      ],
      [
        206,
        133,
        0,
        138,
        0,
        "number"
      ],
      [
        207,
        138,
        0,
        90,
        2,
        "number"
      ],
      [
        208,
        138,
        0,
        137,
        0,
        "number"
      ],
      [
        209,
        129,
        0,
        139,
        0,
        "number"
      ],
      [
        210,
        139,
        0,
        136,
        0,
        "number"
      ],
      [
        211,
        139,
        0,
        90,
        3,
        "number"
      ],
      [
        212,
        140,
        0,
        141,
        0,
        -1
      ],
      [
        216,
        141,
        0,
        145,
        0,
        -1
      ],
      [
        219,
        147,
        0,
        148,
        0,
        -1
      ],
      [
        220,
        148,
        0,
        149,
        0,
        -1
      ],
      [
        222,
        150,
        0,
        151,
        1,
        -1
      ],
      [
        223,
        152,
        0,
        151,
        0,
        "*"
      ],
      [
        224,
        151,
        0,
        81,
        1,
        -1
      ],
      [
        225,
        151,
        0,
        82,
        1,
        -1
      ],
      [
        227,
        149,
        0,
        155,
        0,
        -1
      ],
      [
        228,
        153,
        0,
        155,
        1,
        "boolean"
      ],
      [
        229,
        155,
        1,
        104,
        2,
        -1
      ],
      [
        230,
        145,
        0,
        156,
        0,
        -1
      ],
      [
        231,
        153,
        0,
        156,
        1,
        "boolean"
      ],
      [
        232,
        156,
        1,
        103,
        2,
        -1
      ],
      [
        233,
        155,
        1,
        116,
        3,
        -1
      ],
      [
        234,
        74,
        2,
        100,
        1,
        "VAE"
      ],
      [
        238,
        45,
        0,
        159,
        1,
        "string"
      ],
      [
        239,
        100,
        0,
        159,
        0,
        "IMAGE"
      ],
      [
        240,
        159,
        0,
        103,
        1,
        -1
      ],
      [
        241,
        159,
        0,
        122,
        1,
        -1
      ],
      [
        242,
        157,
        0,
        116,
        2,
        -1
      ],
      [
        243,
        157,
        0,
        104,
        1,
        -1
      ],
      [
        244,
        45,
        0,
        157,
        1,
        "string"
      ],
      [
        245,
        40,
        0,
        157,
        0,
        "IMAGE"
      ]
    ],
    groups: [
      {
        title: "txt2img",
        bounding: [
          -282,
          -159,
          883,
          757
        ],
        color: "#3f789e"
      },
      {
        title: "HR Fix",
        bounding: [
          1185,
          -176,
          1128,
          569
        ],
        color: "#b06634"
      },
      {
        title: "Seed Randomizer",
        bounding: [
          -1167,
          115,
          749,
          301
        ],
        color: "#8A8"
      }
    ],
    config: {},
    extra: {},
    version: 10
  },
  layout: {
    root: "0",
    allItems: {
      0: {
        dragItem: {
          type: "container",
          id: "0",
          attrs: {
            title: "",
            showTitle: false,
            direction: "horizontal",
            classes: "",
            blockVariant: "block",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            containerVariant: "block"
          }
        },
        children: [
          "1",
          "2"
        ]
      },
      1: {
        dragItem: {
          type: "container",
          id: "1",
          attrs: {
            title: "",
            showTitle: false,
            direction: "vertical",
            classes: "",
            blockVariant: "block",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            containerVariant: "block"
          }
        },
        children: [
          "51",
          "27",
          "33",
          "16",
          "79",
          "41"
        ],
        parent: "0"
      },
      2: {
        dragItem: {
          type: "container",
          id: "2",
          attrs: {
            title: "",
            showTitle: false,
            direction: "vertical",
            classes: "",
            blockVariant: "block",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            containerVariant: "block"
          }
        },
        children: [
          "95",
          "58"
        ],
        parent: "0"
      },
      10: {
        dragItem: {
          type: "widget",
          id: "10",
          nodeId: 17,
          attrs: {
            title: "seed",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 100,
            disabled: false
          }
        },
        children: [],
        parent: "48"
      },
      11: {
        dragItem: {
          type: "widget",
          id: "11",
          nodeId: 18,
          attrs: {
            title: "steps",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 100,
            disabled: false
          }
        },
        children: [],
        parent: "54"
      },
      12: {
        dragItem: {
          type: "widget",
          id: "12",
          nodeId: 19,
          attrs: {
            title: "cfg",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 100,
            disabled: false
          }
        },
        children: [],
        parent: "54"
      },
      13: {
        dragItem: {
          type: "widget",
          id: "13",
          nodeId: 20,
          attrs: {
            title: "sampler_name",
            showTitle: false,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 100,
            disabled: false
          }
        },
        children: [],
        parent: "53"
      },
      14: {
        dragItem: {
          type: "widget",
          id: "14",
          nodeId: 21,
          attrs: {
            title: "scheduler",
            showTitle: false,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 100,
            disabled: false
          }
        },
        children: [],
        parent: "53"
      },
      15: {
        dragItem: {
          type: "widget",
          id: "15",
          nodeId: 22,
          attrs: {
            title: "denoise",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            max: 2,
            hidden: false,
            flexGrow: 100,
            disabled: false
          }
        },
        children: [],
        parent: "83"
      },
      16: {
        dragItem: {
          type: "container",
          id: "16",
          attrs: {
            title: "KSampler",
            showTitle: true,
            direction: "vertical",
            classes: "",
            blockVariant: "block",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            containerVariant: "block",
            variant: "accordion",
            buttonVariant: "primary",
            buttonSize: "large",
            openOnStartup: true
          }
        },
        children: [
          "53",
          "54",
          "48",
          "88"
        ],
        parent: "1"
      },
      26: {
        dragItem: {
          type: "widget",
          id: "26",
          nodeId: 33,
          attrs: {
            title: "Positive",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "27"
      },
      27: {
        dragItem: {
          type: "container",
          id: "27",
          attrs: {
            title: "Prompt",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            blockVariant: "hidden",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            variant: "accordion",
            tabNames: [
              "Positive",
              "Negative"
            ],
            openOnStartup: true,
            containerVariant: "hidden",
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [
          "26",
          "28"
        ],
        parent: "1"
      },
      28: {
        dragItem: {
          type: "widget",
          id: "28",
          nodeId: 35,
          attrs: {
            title: "Negative",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "27"
      },
      30: {
        dragItem: {
          type: "widget",
          id: "30",
          nodeId: 37,
          attrs: {
            title: "width",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "47"
      },
      31: {
        dragItem: {
          type: "widget",
          id: "31",
          nodeId: 38,
          attrs: {
            title: "height",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "47"
      },
      32: {
        dragItem: {
          type: "widget",
          id: "32",
          nodeId: 39,
          attrs: {
            title: "batch_size",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 100,
            disabled: false
          }
        },
        children: [],
        parent: "33"
      },
      33: {
        dragItem: {
          type: "container",
          id: "33",
          attrs: {
            title: "EmptyLatentImage",
            showTitle: true,
            direction: "vertical",
            classes: "",
            blockVariant: "block",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            containerVariant: "block",
            variant: "accordion",
            buttonVariant: "primary",
            buttonSize: "large",
            openOnStartup: true
          }
        },
        children: [
          "32",
          "47"
        ],
        parent: "1"
      },
      34: {
        dragItem: {
          type: "widget",
          id: "34",
          nodeId: 45,
          attrs: {
            title: "Filename Prefix",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "94"
      },
      41: {
        dragItem: {
          type: "container",
          id: "41",
          attrs: {
            title: "Copy Test",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            blockVariant: "block",
            hidden: true,
            flexGrow: 100,
            disabled: false,
            containerVariant: "block"
          }
        },
        children: [],
        parent: "1"
      },
      42: {
        dragItem: {
          type: "widget",
          id: "42",
          nodeId: 57,
          attrs: {
            title: "action",
            showTitle: true,
            direction: "horizontal",
            classes: "testClas",
            hidden: false,
            flexGrow: 100,
            disabled: false
          }
        },
        children: [],
        parent: "48"
      },
      46: {
        dragItem: {
          type: "widget",
          id: "46",
          nodeId: 62,
          attrs: {
            title: "⮀",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 1,
            disabled: false,
            buttonVariant: "secondary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "47"
      },
      47: {
        dragItem: {
          type: "container",
          id: "47",
          attrs: {
            title: "",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            blockVariant: "hidden",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            containerVariant: "hidden"
          }
        },
        children: [
          "30",
          "46",
          "31"
        ],
        parent: "33"
      },
      48: {
        dragItem: {
          type: "container",
          id: "48",
          attrs: {
            title: "",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            blockVariant: "hidden",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            containerVariant: "hidden"
          }
        },
        children: [
          "10",
          "42"
        ],
        parent: "16"
      },
      51: {
        dragItem: {
          type: "widget",
          id: "51",
          nodeId: 75,
          attrs: {
            title: "ckpt_name",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "1"
      },
      53: {
        dragItem: {
          type: "container",
          id: "53",
          attrs: {
            title: "",
            showTitle: false,
            direction: "horizontal",
            classes: "",
            blockVariant: "hidden",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            containerVariant: "hidden"
          }
        },
        children: [
          "13",
          "14"
        ],
        parent: "16"
      },
      54: {
        dragItem: {
          type: "container",
          id: "54",
          attrs: {
            title: "",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            blockVariant: "hidden",
            hidden: false,
            flexGrow: 100,
            disabled: false,
            containerVariant: "hidden"
          }
        },
        children: [
          "12",
          "11"
        ],
        parent: "16"
      },
      55: {
        dragItem: {
          type: "widget",
          id: "55",
          nodeId: 80,
          attrs: {
            title: "lora_name",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            disabled: false,
            hidden: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "58"
      },
      56: {
        dragItem: {
          type: "widget",
          id: "56",
          nodeId: 81,
          attrs: {
            title: "UNet",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            disabled: false,
            hidden: false
          }
        },
        children: [],
        parent: "59"
      },
      57: {
        dragItem: {
          type: "widget",
          id: "57",
          nodeId: 82,
          attrs: {
            title: "TEnc",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            disabled: false,
            hidden: false
          }
        },
        children: [],
        parent: "59"
      },
      58: {
        dragItem: {
          type: "container",
          id: "58",
          attrs: {
            title: "LoraLoader",
            showTitle: true,
            direction: "vertical",
            classes: "",
            blockVariant: "block",
            flexGrow: 100,
            disabled: false,
            containerVariant: "block",
            hidden: false,
            variant: "accordion",
            buttonVariant: "primary",
            buttonSize: "large",
            openOnStartup: true
          }
        },
        children: [
          "55",
          "59"
        ],
        parent: "2"
      },
      59: {
        dragItem: {
          type: "container",
          id: "59",
          attrs: {
            title: "",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            blockVariant: "block",
            flexGrow: 100,
            disabled: false,
            containerVariant: "block",
            hidden: false,
            variant: "block",
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [
          "56",
          "57",
          "92"
        ],
        parent: "58"
      },
      64: {
        dragItem: {
          type: "widget",
          id: "64",
          nodeId: 91,
          attrs: {
            title: "upscale_method",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            disabled: false
          }
        },
        children: [],
        parent: "75"
      },
      66: {
        dragItem: {
          type: "widget",
          id: "66",
          nodeId: 93,
          attrs: {
            title: "scale",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            disabled: false,
            hidden: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "74"
      },
      67: {
        dragItem: {
          type: "widget",
          id: "67",
          nodeId: 94,
          attrs: {
            title: "crop",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            disabled: false
          }
        },
        children: [],
        parent: "75"
      },
      73: {
        dragItem: {
          type: "widget",
          id: "73",
          nodeId: 103,
          attrs: {
            title: "HiRes Fix",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            disabled: false,
            hidden: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "95"
      },
      74: {
        dragItem: {
          type: "container",
          id: "74",
          attrs: {
            title: "",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            blockVariant: "hidden",
            flexGrow: 100,
            disabled: false,
            containerVariant: "hidden"
          }
        },
        children: [
          "66"
        ],
        parent: "79"
      },
      75: {
        dragItem: {
          type: "container",
          id: "75",
          attrs: {
            title: "",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            blockVariant: "hidden",
            flexGrow: 100,
            disabled: false,
            containerVariant: "hidden"
          }
        },
        children: [
          "67",
          "64"
        ],
        parent: "79"
      },
      76: {
        dragItem: {
          type: "widget",
          id: "76",
          nodeId: 104,
          attrs: {
            title: "",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            disabled: false,
            hidden: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "95"
      },
      77: {
        dragItem: {
          type: "widget",
          id: "77",
          nodeId: 108,
          attrs: {
            title: "State",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            disabled: true,
            hidden: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "82"
      },
      78: {
        dragItem: {
          type: "widget",
          id: "78",
          nodeId: 109,
          attrs: {
            title: "Upscale",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            hidden: false,
            disabled: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "82"
      },
      79: {
        dragItem: {
          type: "container",
          id: "79",
          attrs: {
            title: "HR Fix",
            showTitle: true,
            direction: "vertical",
            classes: "",
            blockVariant: "block",
            flexGrow: 100,
            containerVariant: "block",
            hidden: false,
            disabled: false,
            variant: "accordion",
            buttonVariant: "primary",
            buttonSize: "large",
            openOnStartup: true
          }
        },
        children: [
          "74",
          "91",
          "83",
          "75",
          "82"
        ],
        parent: "1"
      },
      82: {
        dragItem: {
          type: "container",
          id: "82",
          attrs: {
            title: "",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            blockVariant: "hidden",
            flexGrow: 100,
            containerVariant: "hidden",
            hidden: false,
            disabled: false,
            variant: "block",
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [
          "77",
          "78"
        ],
        parent: "79"
      },
      83: {
        dragItem: {
          type: "container",
          id: "83",
          attrs: {
            title: "",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            blockVariant: "hidden",
            flexGrow: 100,
            containerVariant: "hidden"
          }
        },
        children: [
          "84",
          "15"
        ],
        parent: "79"
      },
      84: {
        dragItem: {
          type: "widget",
          id: "84",
          nodeId: 121,
          attrs: {
            title: "steps",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100
          }
        },
        children: [],
        parent: "83"
      },
      87: {
        dragItem: {
          type: "widget",
          id: "87",
          nodeId: 126,
          attrs: {
            title: "Generate",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            hidden: false,
            disabled: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "88"
      },
      88: {
        dragItem: {
          type: "container",
          id: "88",
          attrs: {
            title: "",
            showTitle: true,
            direction: "vertical",
            classes: "",
            containerVariant: "block",
            flexGrow: 100
          }
        },
        children: [
          "87"
        ],
        parent: "16"
      },
      89: {
        dragItem: {
          type: "widget",
          id: "89",
          nodeId: 134,
          attrs: {
            title: "Width",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            hidden: false,
            disabled: true,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "91"
      },
      90: {
        dragItem: {
          type: "widget",
          id: "90",
          nodeId: 135,
          attrs: {
            title: "Height",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            hidden: false,
            disabled: true,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "91"
      },
      91: {
        dragItem: {
          type: "container",
          id: "91",
          attrs: {
            title: "",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            containerVariant: "block",
            flexGrow: 100,
            hidden: false,
            disabled: false,
            variant: "block",
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [
          "89",
          "90"
        ],
        parent: "79"
      },
      92: {
        dragItem: {
          type: "widget",
          id: "92",
          nodeId: 150,
          attrs: {
            title: "🗙",
            direction: "horizontal",
            classes: "",
            flexGrow: 1,
            hidden: false,
            disabled: false,
            buttonVariant: "secondary",
            buttonSize: "small"
          }
        },
        children: [],
        parent: "59"
      },
      93: {
        dragItem: {
          type: "widget",
          id: "93",
          nodeId: 153,
          attrs: {
            title: "Preserve Outputs",
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            hidden: false,
            disabled: false,
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [],
        parent: "94"
      },
      94: {
        dragItem: {
          type: "container",
          id: "94",
          attrs: {
            title: "",
            direction: "horizontal",
            classes: "",
            containerVariant: "hidden",
            flexGrow: 100,
            hidden: false,
            disabled: false,
            variant: "block",
            buttonVariant: "primary",
            buttonSize: "large"
          }
        },
        children: [
          "34",
          "93"
        ],
        parent: "95"
      },
      95: {
        dragItem: {
          type: "container",
          id: "95",
          attrs: {
            title: "Result",
            direction: "vertical",
            classes: "",
            containerVariant: "hidden",
            flexGrow: 100,
            hidden: false,
            disabled: false,
            variant: "accordion",
            buttonVariant: "primary",
            buttonSize: "large",
            openOnStartup: true
          }
        },
        children: [
          "76",
          "73",
          "94"
        ],
        parent: "2"
      }
    },
    currentId: 100,
    attrs: {
      defaultSubgraph: "default"
    }
  },
  canvas: {
    offset: [
      396.6035503358165,
      -20.538133861234147
    ],
    scale: 0.6830134553650707
  }
}
const blankGraph: SerializedAppState = {
    createdBy: "ComfyBox",
    version: 1,
    workflow: {
        last_node_id: 0,
        last_link_id: 0,
        nodes: [],
        links: [],
        groups: [],
        config: {},
        extra: {},
        version: 0
    },
    panes: {}
}

export default defaultGraph;
export { blankGraph }
