import type SerializedAppState from "./ComfyApp"

const defaultGraph: SerializedAppState = {
  createdBy: "ComfyBox",
  version: 1,
  workflow: {
    last_node_id: 156,
    last_link_id: 234,
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
        shownOutputProperties: {}
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
        shownOutputProperties: {}
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
        }
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
          defaultValue: "",
          values: [],
          hidden: false
        },
        widgets_values: [
          ""
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "",
        shownOutputProperties: {}
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
          defaultValue: "",
          values: []
        },
        widgets_values: [
          ""
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "",
        shownOutputProperties: {}
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
        shownOutputProperties: {}
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
        shownOutputProperties: {}
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
            config: {
              min: 64,
              max: 8192,
              step: 8,
              precision: 0,
              defaultValue: 512
            },
            serialize: true
          },
          {
            name: "height",
            type: "number",
            link: 94,
            config: {
              min: 64,
              max: 8192,
              step: 8,
              precision: 0,
              defaultValue: 512
            },
            serialize: true
          },
          {
            name: "batch_size",
            type: "number",
            link: 38,
            config: {
              min: 1,
              max: 64,
              step: 1,
              precision: 0,
              defaultValue: 1
            },
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
            color_on: "orange"
          },
          {
            name: "vae",
            type: "VAE",
            link: 101,
            color_off: "orange",
            color_on: "orange"
          }
        ],
        outputs: [
          {
            name: "IMAGE",
            type: "IMAGE",
            links: [
              120
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
        shownOutputProperties: {}
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
            color_on: "orange"
          },
          {
            name: "seed",
            type: "number",
            link: 80,
            config: {
              min: 0,
              max: 18446744073709552000,
              step: 1,
              precision: 0,
              defaultValue: 0
            },
            serialize: true
          },
          {
            name: "steps",
            type: "number",
            link: 17,
            config: {
              min: 1,
              max: 10000,
              step: 1,
              precision: 0,
              defaultValue: 20
            },
            serialize: true
          },
          {
            name: "cfg",
            type: "number",
            link: 18,
            config: {
              min: 0,
              max: 100,
              step: 0.5,
              precision: 0,
              defaultValue: 8
            },
            serialize: true
          },
          {
            name: "sampler_name",
            type: "string",
            link: 19,
            config: {
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
              defaultValue: "euler"
            },
            serialize: true
          },
          {
            name: "scheduler",
            type: "string",
            link: 20,
            config: {
              values: [
                "karras",
                "normal",
                "simple",
                "ddim_uniform"
              ],
              defaultValue: "karras"
            },
            serialize: true
          },
          {
            name: "positive",
            type: "CONDITIONING",
            link: 33,
            color_off: "orange",
            color_on: "orange"
          },
          {
            name: "negative",
            type: "CONDITIONING",
            link: 32,
            color_off: "orange",
            color_on: "orange"
          },
          {
            name: "latent_image",
            type: "LATENT",
            link: 39,
            color_off: "orange",
            color_on: "orange"
          },
          {
            name: "denoise",
            type: "number",
            link: 178,
            config: {
              min: 0,
              max: 1,
              step: 0.01,
              precision: 0,
              defaultValue: 1
            },
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
        shownOutputProperties: {}
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
        }
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
        shownOutputProperties: {}
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
        }
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
        }
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
        order: 47,
        mode: 0,
        inputs: [
          {
            name: "text",
            type: "string",
            link: 30,
            config: {
              defaultValue: "",
              multiline: true
            },
            serialize: true
          },
          {
            name: "clip",
            type: "CLIP",
            link: 110,
            color_off: "orange",
            color_on: "orange"
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
        order: 48,
        mode: 0,
        inputs: [
          {
            name: "text",
            type: "string",
            link: 31,
            config: {
              defaultValue: "",
              multiline: true
            },
            serialize: true
          },
          {
            name: "clip",
            type: "CLIP",
            link: 111,
            color_off: "orange",
            color_on: "orange"
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
        order: 82,
        mode: 0,
        inputs: [
          {
            name: "pixels",
            type: "IMAGE",
            link: 155
          },
          {
            name: "vae",
            type: "VAE",
            link: 133
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
        order: 33,
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
        }
      },
      {
        id: 102,
        type: "actions/on_executed",
        pos: [
          1842.9857870046837,
          75.61589906416026
        ],
        size: [
          176.4,
          46
        ],
        flags: {},
        order: 50,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "IMAGE",
            link: 190
          }
        ],
        outputs: [
          {
            name: "images",
            type: "IMAGE",
            links: [
              142
            ],
            slot_index: 0
          },
          {
            name: "onExecuted",
            type: -2,
            links: [
              141,
              186
            ],
            shape: 1,
            slot_index: 1
          }
        ],
        title: "Comfy.OnExecutedEvent",
        properties: {
          images: {
            images: [
              {
                filename: "ComfyUI_01228_.png",
                subfolder: "",
                type: "output"
              }
            ]
          },
          filename: null
        }
      },
      {
        id: 122,
        type: "actions/notify",
        pos: [
          2045.9857870046853,
          250.61589906416074
        ],
        size: [
          151.2,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 59,
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
            link: 186,
            shape: 1,
            slot_index: 1
          }
        ],
        outputs: [],
        title: "Comfy.NotifyAction",
        properties: {
          message: "Nya."
        }
      },
      {
        id: 77,
        type: "actions/notify",
        pos: [
          673.9106933619984,
          665.4708575549992
        ],
        size: [
          151.2,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 79,
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
            link: 146,
            shape: 1,
            slot_index: 1
          }
        ],
        outputs: [],
        title: "Comfy.NotifyAction",
        properties: {
          message: "Nya."
        }
      },
      {
        id: 105,
        type: "actions/on_executed",
        pos: [
          666.2486933619984,
          541.4778575549989
        ],
        size: [
          176.4,
          46
        ],
        flags: {
          collapsed: false
        },
        order: 53,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "IMAGE",
            link: 143,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "images",
            type: "OUTPUT",
            links: [
              144,
              162
            ],
            slot_index: 0
          },
          {
            name: "onExecuted",
            type: -2,
            links: [
              145,
              146,
              163
            ],
            shape: 1,
            slot_index: 1
          }
        ],
        title: "Comfy.OnExecutedEvent",
        properties: {
          images: {
            images: [
              {
                filename: "ComfyUI_01224_.png",
                subfolder: "",
                type: "output"
              },
              {
                filename: "ComfyUI_01225_.png",
                subfolder: "",
                type: "output"
              },
              {
                filename: "ComfyUI_01226_.png",
                subfolder: "",
                type: "output"
              },
              {
                filename: "ComfyUI_01227_.png",
                subfolder: "",
                type: "output"
              }
            ]
          },
          filename: null
        }
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
        order: 57,
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
        order: 46,
        mode: 0,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 108
          },
          {
            name: "clip",
            type: "CLIP",
            link: 109
          },
          {
            name: "lora_name",
            type: "string",
            link: 105,
            config: {
              values: [],
              defaultValue: ""
            },
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "strength_model",
            type: "number",
            link: 106,
            config: {
              min: -10,
              max: 10,
              step: 0.01,
              precision: 0,
              defaultValue: 1
            },
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "strength_clip",
            type: "number",
            link: 107,
            config: {
              min: -10,
              max: 10,
              step: 0.01,
              precision: 0,
              defaultValue: 1
            },
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
            config: {
              values: [],
              defaultValue: ""
            },
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
        shownOutputProperties: {}
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
        id: 83,
        type: "SaveImage",
        pos: [
          378.6760126953125,
          243.33800634765626
        ],
        size: [
          186.4,
          46
        ],
        flags: {},
        order: 80,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "IMAGE",
            link: 120
          },
          {
            name: "filename_prefix",
            type: "string",
            link: 113,
            config: {
              defaultValue: "ComfyUI",
              multiline: false
            },
            defaultWidgetNode: null,
            widgetNodeType: "ui/text",
            serialize: true,
            slot_index: 1
          }
        ],
        outputs: [
          {
            name: "output",
            type: "IMAGE",
            links: [
              143
            ],
            slot_index: 0
          }
        ],
        title: "SaveImage",
        properties: {},
        color: "#432",
        bgColor: "#653",
        tags: [
          "default"
        ]
      },
      {
        id: 119,
        type: "KSampler",
        pos: [
          1569.419133004686,
          -89.92794393583983
        ],
        size: [
          241.79999999999998,
          206
        ],
        flags: {},
        order: 58,
        mode: 0,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 183
          },
          {
            name: "seed",
            type: "number",
            link: 175,
            config: {
              min: 0,
              max: 18446744073709552000,
              step: 1,
              precision: 0,
              defaultValue: 0
            },
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "steps",
            type: "number",
            link: 180,
            config: {
              min: 1,
              max: 10000,
              step: 1,
              precision: 0,
              defaultValue: 20
            },
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "cfg",
            type: "number",
            link: 177,
            config: {
              min: 0,
              max: 100,
              step: 0.5,
              precision: 0,
              defaultValue: 8
            },
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "sampler_name",
            type: "string",
            link: 173,
            config: {
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
              defaultValue: "euler"
            },
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "scheduler",
            type: "string",
            link: 174,
            config: {
              values: [
                "karras",
                "normal",
                "simple",
                "ddim_uniform"
              ],
              defaultValue: "karras"
            },
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "positive",
            type: "CONDITIONING",
            link: 182,
            slot_index: 6
          },
          {
            name: "negative",
            type: "CONDITIONING",
            link: 172,
            slot_index: 7
          },
          {
            name: "latent_image",
            type: "LATENT",
            link: 170
          },
          {
            name: "denoise",
            type: "number",
            link: 169,
            config: {
              min: 0,
              max: 1,
              step: 0.01,
              precision: 0,
              defaultValue: 1
            },
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
        tags: [
          "hr"
        ]
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
        order: 54,
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
        shownOutputProperties: {}
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
        }
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
        }
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
        }
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
          }
        ],
        title: "Comfy.ValueControl",
        properties: {
          value: 736802441844388,
          action: "randomize",
          min: 0,
          max: 18446744073709552000,
          step: 1
        }
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
          "736802441844388.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 736802441844388,
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
        }
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
        order: 34,
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
        order: 35,
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
        order: 55,
        mode: 0,
        inputs: [
          {
            name: "image",
            type: "string",
            link: 164,
            config: {
              values: [
                "ComfyUI_00527_.png",
                "ComfyUI_00535_.png",
                "ComfyUI_00536_.png",
                "ComfyUI_00537_.png",
                "ComfyUI_00538_.png",
                "ComfyUI_00539_.png",
                "ComfyUI_00540_.png",
                "ComfyUI_00541_.png",
                "ComfyUI_00542_.png",
                "ComfyUI_00543_.png",
                "ComfyUI_00545_.png",
                "ComfyUI_00546_.png",
                "ComfyUI_00547_.png",
                "ComfyUI_00548_.png",
                "ComfyUI_00549_.png",
                "ComfyUI_00550_.png",
                "ComfyUI_00551_.png",
                "ComfyUI_00552_.png",
                "ComfyUI_00553_.png",
                "ComfyUI_00554_.png",
                "ComfyUI_00555_.png",
                "ComfyUI_00556_.png",
                "ComfyUI_00557_.png",
                "ComfyUI_00561_.png",
                "ComfyUI_00577_.png",
                "ComfyUI_00581_.png",
                "ComfyUI_00585_.png",
                "ComfyUI_00586_.png",
                "ComfyUI_00587_.png",
                "ComfyUI_00588_.png",
                "ComfyUI_00589_.png",
                "ComfyUI_00590_.png",
                "ComfyUI_00591_.png",
                "ComfyUI_00592_.png",
                "ComfyUI_00593_.png",
                "ComfyUI_00595_.png",
                "ComfyUI_00596_.png",
                "ComfyUI_00597_.png",
                "ComfyUI_00600_.png",
                "ComfyUI_00605_.png",
                "ComfyUI_00607_.png",
                "ComfyUI_00609_.png",
                "ComfyUI_00613_.png",
                "ComfyUI_00617_.png",
                "ComfyUI_00618_.png",
                "ComfyUI_00619_.png",
                "ComfyUI_00620_.png",
                "ComfyUI_00621_.png",
                "ComfyUI_00622_.png",
                "ComfyUI_00623_.png",
                "ComfyUI_00624_.png",
                "ComfyUI_00625_.png",
                "ComfyUI_00626_.png",
                "ComfyUI_00628_.png",
                "ComfyUI_00629_.png",
                "ComfyUI_00633_.png",
                "ComfyUI_00636_.png",
                "ComfyUI_00637_.png",
                "ComfyUI_00641_.png",
                "ComfyUI_00645_.png",
                "ComfyUI_00649_.png",
                "ComfyUI_00653_.png",
                "ComfyUI_00654_.png",
                "ComfyUI_00655_.png",
                "ComfyUI_00656_.png",
                "ComfyUI_00657_.png",
                "ComfyUI_00658_.png",
                "ComfyUI_00659_.png",
                "ComfyUI_00660_.png",
                "ComfyUI_00661_.png",
                "ComfyUI_00662_.png",
                "ComfyUI_00663_.png",
                "ComfyUI_00664_.png",
                "ComfyUI_00665_.png",
                "ComfyUI_00669_.png",
                "ComfyUI_00670_.png",
                "ComfyUI_00671_.png",
                "ComfyUI_00672_.png",
                "ComfyUI_00673_.png",
                "ComfyUI_00677_.png",
                "ComfyUI_00678_.png",
                "ComfyUI_00679_.png",
                "ComfyUI_00680_.png",
                "ComfyUI_00681_.png",
                "ComfyUI_00682_ (1).png",
                "ComfyUI_00682_.png",
                "ComfyUI_00683_ (1).png",
                "ComfyUI_00683_.png",
                "ComfyUI_00684_.png",
                "ComfyUI_00685_.png",
                "ComfyUI_00686_.png",
                "ComfyUI_00687_.png",
                "ComfyUI_00688_.png",
                "ComfyUI_00689_.png",
                "ComfyUI_00690_.png",
                "ComfyUI_00691_.png",
                "ComfyUI_00692_.png",
                "ComfyUI_00693_.png",
                "ComfyUI_00697_.png",
                "ComfyUI_00698_.png",
                "ComfyUI_00699_.png",
                "ComfyUI_00700_.png",
                "ComfyUI_00701_.png",
                "ComfyUI_00703_.png",
                "ComfyUI_00704_.png",
                "ComfyUI_00705_.png",
                "ComfyUI_00706_.png",
                "ComfyUI_00707_.png",
                "ComfyUI_00708_.png",
                "ComfyUI_00709_.png",
                "ComfyUI_00710_.png",
                "ComfyUI_00711_.png",
                "ComfyUI_00713_.png",
                "ComfyUI_00714_.png",
                "ComfyUI_00715_.png",
                "ComfyUI_00716_.png",
                "ComfyUI_00717_.png",
                "ComfyUI_00718_.png",
                "ComfyUI_00719_.png",
                "ComfyUI_00720_.png",
                "ComfyUI_00721_.png",
                "ComfyUI_00722_.png",
                "ComfyUI_00723_.png",
                "ComfyUI_00724_.png",
                "ComfyUI_00725_.png",
                "ComfyUI_00729_.png",
                "ComfyUI_00730_.png",
                "ComfyUI_00731_.png",
                "ComfyUI_00732_.png",
                "ComfyUI_00733_.png",
                "ComfyUI_00737_.png",
                "ComfyUI_00745_.png",
                "ComfyUI_00749_.png",
                "ComfyUI_00753_.png",
                "ComfyUI_00757_.png",
                "ComfyUI_00761_.png",
                "ComfyUI_00765_.png",
                "ComfyUI_00769_.png",
                "ComfyUI_00777_.png",
                "ComfyUI_00781_.png",
                "ComfyUI_00783_.png",
                "ComfyUI_00784_.png",
                "ComfyUI_00785_.png",
                "ComfyUI_00786_.png",
                "ComfyUI_00787_.png",
                "ComfyUI_00788_.png",
                "ComfyUI_00789_.png",
                "ComfyUI_00792_.png",
                "ComfyUI_00793_.png",
                "ComfyUI_00794_.png",
                "ComfyUI_00795_.png",
                "ComfyUI_00796_.png",
                "ComfyUI_00797_.png",
                "ComfyUI_00798_.png",
                "ComfyUI_00799_.png",
                "ComfyUI_00800_.png",
                "ComfyUI_00801_.png",
                "ComfyUI_00802_.png",
                "ComfyUI_00803_.png",
                "ComfyUI_00804_.png",
                "ComfyUI_00805_.png",
                "ComfyUI_00806_.png",
                "ComfyUI_00807_.png",
                "ComfyUI_00808_.png",
                "ComfyUI_00809_.png",
                "ComfyUI_00810_.png",
                "ComfyUI_00811_.png",
                "ComfyUI_00812_.png",
                "ComfyUI_00813_.png",
                "ComfyUI_00814_.png",
                "ComfyUI_00815_.png",
                "ComfyUI_00816_.png",
                "ComfyUI_00817_.png",
                "ComfyUI_00818_.png",
                "ComfyUI_00819_.png",
                "ComfyUI_00820_.png",
                "ComfyUI_00821_.png",
                "ComfyUI_00822_.png",
                "ComfyUI_00823_.png",
                "ComfyUI_00824_.png",
                "ComfyUI_00825_.png",
                "ComfyUI_00829_.png",
                "ComfyUI_00830_.png",
                "ComfyUI_00831_.png",
                "ComfyUI_00832_.png",
                "ComfyUI_00839_.png",
                "ComfyUI_00842_.png",
                "ComfyUI_00843_.png",
                "ComfyUI_00844_.png",
                "ComfyUI_00846_.png",
                "ComfyUI_00848_ (1).png",
                "ComfyUI_00848_.png",
                "ComfyUI_00849_.png",
                "ComfyUI_00850_.png",
                "ComfyUI_00851_.png",
                "ComfyUI_00854_ (1).png",
                "ComfyUI_00854_.png",
                "ComfyUI_00855_.png",
                "ComfyUI_00856_.png",
                "ComfyUI_00857_.png",
                "ComfyUI_00859_ (1).png",
                "ComfyUI_00859_.png",
                "ComfyUI_00860_.png",
                "ComfyUI_00861_.png",
                "ComfyUI_00862_.png",
                "ComfyUI_00864_ (1).png",
                "ComfyUI_00864_.png",
                "ComfyUI_00865_.png",
                "ComfyUI_00866_.png",
                "ComfyUI_00867_.png",
                "ComfyUI_00869_.png",
                "ComfyUI_00870_.png",
                "ComfyUI_00871_.png",
                "ComfyUI_00872_.png",
                "ComfyUI_00874_.png",
                "ComfyUI_00875_.png",
                "ComfyUI_00876_.png",
                "ComfyUI_00877_.png",
                "ComfyUI_00878_.png",
                "ComfyUI_00879_.png",
                "ComfyUI_00880_.png",
                "ComfyUI_00881_.png",
                "ComfyUI_00883_.png",
                "ComfyUI_00884_.png",
                "ComfyUI_00885_.png",
                "ComfyUI_00889_.png",
                "ComfyUI_00890_.png",
                "ComfyUI_00891_.png",
                "ComfyUI_00892_.png",
                "ComfyUI_00894_.png",
                "ComfyUI_00895_.png",
                "ComfyUI_00896_.png",
                "ComfyUI_00897_.png",
                "ComfyUI_00898_.png",
                "ComfyUI_00899_.png",
                "ComfyUI_00900_.png",
                "ComfyUI_00901_.png",
                "ComfyUI_00904_.png",
                "ComfyUI_00905_.png",
                "ComfyUI_00914_.png",
                "ComfyUI_00915_.png",
                "ComfyUI_00916_.png",
                "ComfyUI_00917_.png",
                "ComfyUI_00920_.png",
                "ComfyUI_00922_.png",
                "ComfyUI_00923_.png",
                "ComfyUI_00926_ (1).png",
                "ComfyUI_00926_.png",
                "ComfyUI_00927_.png",
                "ComfyUI_00928_.png",
                "ComfyUI_00929_.png",
                "ComfyUI_00933_.png",
                "ComfyUI_00934_.png",
                "ComfyUI_00935_.png",
                "ComfyUI_00936_.png",
                "ComfyUI_00943_.png",
                "ComfyUI_00944_.png",
                "ComfyUI_00945_.png",
                "ComfyUI_00946_.png",
                "ComfyUI_00947_.png",
                "ComfyUI_00951_.png",
                "ComfyUI_00955_.png",
                "ComfyUI_00959_.png",
                "ComfyUI_00963_.png",
                "ComfyUI_00967_.png",
                "ComfyUI_00971_.png",
                "ComfyUI_00975_.png",
                "ComfyUI_00976_.png",
                "ComfyUI_00977_.png",
                "ComfyUI_00978_ (1).png",
                "ComfyUI_00978_.png",
                "ComfyUI_00982_ (1).png",
                "ComfyUI_00982_.png",
                "ComfyUI_00986_ (1).png",
                "ComfyUI_00986_.png",
                "ComfyUI_00990_ (1).png",
                "ComfyUI_00990_.png",
                "ComfyUI_00991_ (1).png",
                "ComfyUI_00991_.png",
                "ComfyUI_00995_ (1).png",
                "ComfyUI_00995_.png",
                "ComfyUI_00996_.png",
                "ComfyUI_00997_.png",
                "ComfyUI_01001_.png",
                "ComfyUI_01002_.png",
                "ComfyUI_01003_.png",
                "ComfyUI_01004_.png",
                "ComfyUI_01005_.png",
                "ComfyUI_01006_.png",
                "ComfyUI_01007_.png",
                "ComfyUI_01008_.png",
                "ComfyUI_01009_.png",
                "ComfyUI_01010_.png",
                "ComfyUI_01011_.png",
                "ComfyUI_01012_.png",
                "ComfyUI_01013_.png",
                "ComfyUI_01014_.png",
                "ComfyUI_01028_.png",
                "ComfyUI_01031_ (1).png",
                "ComfyUI_01031_.png",
                "ComfyUI_01032_ (1).png",
                "ComfyUI_01032_.png",
                "ComfyUI_01036_.png",
                "ComfyUI_01037_.png",
                "ComfyUI_01041_.png",
                "ComfyUI_01042_.png",
                "ComfyUI_01043_.png",
                "ComfyUI_01044_.png",
                "ComfyUI_01049_.png",
                "ComfyUI_01050_.png",
                "ComfyUI_01051_.png",
                "ComfyUI_01052_.png",
                "ComfyUI_01053_.png",
                "ComfyUI_01057_.png",
                "ComfyUI_01058_.png",
                "ComfyUI_01059_.png",
                "ComfyUI_01063_ (1).png",
                "ComfyUI_01063_.png",
                "ComfyUI_01064_.png",
                "ComfyUI_01065_ (1).png",
                "ComfyUI_01065_.png",
                "ComfyUI_01069_ (1).png",
                "ComfyUI_01069_.png",
                "ComfyUI_01073_.png",
                "ComfyUI_01074_.png",
                "ComfyUI_01075_.png",
                "ComfyUI_01076_.png",
                "ComfyUI_01077_ (1).png",
                "ComfyUI_01077_.png",
                "ComfyUI_01078_.png",
                "ComfyUI_01079_.png",
                "ComfyUI_01080_.png",
                "ComfyUI_01081_.png",
                "ComfyUI_01085_.png",
                "ComfyUI_01088_.png",
                "ComfyUI_01089_.png",
                "ComfyUI_01091_.png",
                "ComfyUI_01093_.png",
                "ComfyUI_01095_.png",
                "ComfyUI_01096_.png",
                "ComfyUI_01097_.png",
                "ComfyUI_01098_.png",
                "ComfyUI_01099_.png",
                "ComfyUI_01100_.png",
                "ComfyUI_01102_.png",
                "ComfyUI_01103_.png",
                "ComfyUI_01104_.png",
                "ComfyUI_01105_.png",
                "ComfyUI_01107_.png",
                "ComfyUI_01108_.png",
                "ComfyUI_01109_.png",
                "ComfyUI_01110_.png",
                "ComfyUI_01111_.png",
                "ComfyUI_01112_.png",
                "ComfyUI_01113_.png",
                "ComfyUI_01114_.png",
                "ComfyUI_01118_.png",
                "ComfyUI_01122_.png",
                "ComfyUI_01123_.png",
                "ComfyUI_01124_.png",
                "ComfyUI_01125_.png",
                "ComfyUI_01126_.png",
                "ComfyUI_01127_.png",
                "ComfyUI_01128_.png",
                "ComfyUI_01129_.png",
                "ComfyUI_01130_.png",
                "ComfyUI_01131_.png",
                "ComfyUI_01132_.png",
                "ComfyUI_01133_.png",
                "ComfyUI_01134_.png",
                "ComfyUI_01135_.png",
                "ComfyUI_01136_.png",
                "ComfyUI_01137_.png",
                "ComfyUI_01141_ (1).png",
                "ComfyUI_01141_.png",
                "ComfyUI_01145_.png",
                "ComfyUI_01146_.png",
                "ComfyUI_01147_.png",
                "ComfyUI_01148_.png",
                "ComfyUI_01149_.png",
                "ComfyUI_01150_.png",
                "ComfyUI_01151_.png",
                "ComfyUI_01152_.png",
                "ComfyUI_01153_.png",
                "ComfyUI_01157_.png",
                "ComfyUI_01158_.png",
                "ComfyUI_01159_.png",
                "ComfyUI_01160_.png",
                "ComfyUI_01162_.png",
                "ComfyUI_01166_.png",
                "ComfyUI_01168_.png",
                "ComfyUI_01169_.png",
                "ComfyUI_01178_.png",
                "ComfyUI_01179_.png",
                "ComfyUI_01180_.png",
                "ComfyUI_01181_ (1).png",
                "ComfyUI_01181_.png",
                "ComfyUI_01182_.png",
                "ComfyUI_01183_ (1).png",
                "ComfyUI_01183_.png",
                "ComfyUI_01190_.png",
                "ComfyUI_01191_.png",
                "ComfyUI_01196_.png",
                "ComfyUI_01198_.png",
                "ComfyUI_01199_.png",
                "ComfyUI_01203_.png",
                "ComfyUI_01204_.png",
                "ComfyUI_01205_.png",
                "ComfyUI_01206_.png",
                "ComfyUI_01207_.png",
                "ComfyUI_01211_.png",
                "ComfyUI_01212_.png",
                "ComfyUI_01213_.png",
                "ComfyUI_01214_.png",
                "ComfyUI_01215_.png",
                "ComfyUI_01216_.png",
                "ComfyUI_01217_.png",
                "ComfyUI_01218_.png",
                "__etna_and_flonne_disgaea_and_1_more__4fa15fd4c0d2233cc02b79bf903897ec.jpg",
                "__fujiwara_no_mokou_and_houraisan_kaguya_touhou_drawn_by_tsuno_no_hito__3dd87f83b2e0bfb976fd2689598f0fb4.png",
                "__marona_phantom_brave_drawn_by_yilx__496dbc0b6cc95cf8a00427b2db29ed21.jpg",
                "blob",
                "blob (1)",
                "blob (2)",
                "blob (3)",
                "example.png"
              ],
              defaultValue: "ComfyUI_00527_.png"
            },
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
              113,
              188
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
        shownOutputProperties: {}
      },
      {
        id: 124,
        type: "SaveImage",
        pos: [
          1838.4379300390613,
          -4.673272456054686
        ],
        size: [
          186.4,
          46
        ],
        flags: {},
        order: 60,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "IMAGE",
            link: 189
          },
          {
            name: "filename_prefix",
            type: "string",
            link: 188,
            config: {
              defaultValue: "ComfyUI",
              multiline: false
            },
            defaultWidgetNode: null,
            widgetNodeType: "ui/text",
            serialize: true
          }
        ],
        outputs: [
          {
            name: "output",
            type: "IMAGE",
            links: [
              190
            ],
            slot_index: 0
          }
        ],
        title: "SaveImage",
        properties: {},
        color: "#432",
        bgColor: "#653",
        tags: [
          "hr"
        ]
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
        properties: {}
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
        shownOutputProperties: {}
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
        order: 36,
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
        }
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
        shownOutputProperties: {}
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
        }
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
        }
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
        order: 65,
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
        order: 63,
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
        shownOutputProperties: {}
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
        order: 66,
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
        order: 64,
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
        shownOutputProperties: {}
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
        order: 67,
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
        order: 81,
        mode: 0,
        inputs: [
          {
            name: "samples",
            type: "LATENT",
            link: 134
          },
          {
            name: "upscale_method",
            type: "string",
            link: 126,
            config: {
              values: [
                "nearest-exact",
                "bilinear",
                "area"
              ],
              defaultValue: "nearest-exact"
            },
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "width",
            type: "number",
            link: 207,
            config: {
              min: 64,
              max: 8192,
              step: 8,
              precision: 0,
              defaultValue: 512
            },
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "height",
            type: "number",
            link: 211,
            config: {
              min: 64,
              max: 8192,
              step: 8,
              precision: 0,
              defaultValue: 512
            },
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "crop",
            type: "string",
            link: 129,
            config: {
              values: [
                "disabled",
                "center"
              ],
              defaultValue: "disabled"
            },
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
        order: 62,
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
        order: 61,
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
        order: 68,
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
        }
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
        }
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
        order: 37,
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
        order: 40,
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
        order: 38,
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
        order: 41,
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
        order: 42,
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
        }
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
        }
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
        }
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
            link: 144
          },
          {
            name: "store",
            type: -1,
            link: 145,
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
          defaultValue: [],
          index: 3,
          updateMode: "append"
        },
        widgets_values: [
          "Images: 4",
          "append"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: [],
        shownOutputProperties: {}
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
            link: 142
          },
          {
            name: "store",
            type: -1,
            link: 141,
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
          defaultValue: [],
          index: 0,
          updateMode: "append"
        },
        widgets_values: [
          "Images: 1",
          "append"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: [],
        shownOutputProperties: {}
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
        shownOutputProperties: {}
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
        order: 45,
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
        order: 56,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "OUTPUT",
            link: 162,
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
            link: 163,
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
                filename: "ComfyUI_01224_.png",
                subfolder: "",
                type: "output"
              },
              {
                filename: "ComfyUI_01225_.png",
                subfolder: "",
                type: "output"
              },
              {
                filename: "ComfyUI_01226_.png",
                subfolder: "",
                type: "output"
              },
              {
                filename: "ComfyUI_01227_.png",
                subfolder: "",
                type: "output"
              }
            ]
          },
          index: 3,
          filenames: {
            0: {
              filename: "ComfyUI_01224_.png",
              status: "cached"
            },
            1: {
              filename: "ComfyUI_01225_.png",
              status: "cached"
            },
            2: {
              filename: "ComfyUI_01226_.png",
              status: "cached"
            },
            3: {
              filename: "ComfyUI_01227_.png",
              status: "cached"
            }
          },
          genNumber: 66,
          updateMode: "append"
        }
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
        order: 49,
        mode: 0,
        inputs: [
          {
            name: "samples",
            type: "LATENT",
            link: 179
          },
          {
            name: "vae",
            type: "VAE",
            link: 234
          }
        ],
        outputs: [
          {
            name: "IMAGE",
            type: "IMAGE",
            links: [
              189
            ],
            slot_index: 0
          }
        ],
        title: "VAEDecode",
        properties: {},
        color: "#432",
        bgColor: "#653",
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
        order: 44,
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
        shownOutputProperties: {}
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
        order: 39,
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
        }
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
        113,
        45,
        0,
        83,
        1,
        "string"
      ],
      [
        120,
        40,
        0,
        83,
        0,
        "IMAGE"
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
        141,
        102,
        1,
        103,
        1,
        -1
      ],
      [
        142,
        102,
        0,
        103,
        0,
        "IMAGE"
      ],
      [
        143,
        83,
        0,
        105,
        0,
        "IMAGE"
      ],
      [
        144,
        105,
        0,
        104,
        0,
        "OUTPUT"
      ],
      [
        145,
        105,
        1,
        104,
        1,
        -1
      ],
      [
        146,
        105,
        1,
        77,
        1,
        -1
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
        162,
        105,
        0,
        116,
        0,
        "OUTPUT"
      ],
      [
        163,
        105,
        1,
        116,
        2,
        -1
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
        186,
        102,
        1,
        122,
        1,
        -1
      ],
      [
        188,
        45,
        0,
        124,
        1,
        "string"
      ],
      [
        189,
        100,
        0,
        124,
        0,
        "IMAGE"
      ],
      [
        190,
        124,
        0,
        102,
        0,
        "IMAGE"
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
            disabled: false
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
            disabled: false
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
            hidden: false
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
            disabled: true
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
    currentId: 96,
    attrs: {
      defaultSubgraph: "default"
    }
  },
  canvas: {
    offset: [0, 0],
    scale: 1
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
