import type SerializedAppState from "./ComfyApp"

const defaultGraph: SerializedAppState = {
  createdBy: "ComfyBox",
  version: 1,
  workflow: {
    last_node_id: 123,
    last_link_id: 186,
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
        id: 38,
        type: "ui/slider",
        pos: [
          -347.11307539843733,
          501.36673939843797
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 51,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: 91
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              90,
              94
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
          "768.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 768,
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
        id: 37,
        type: "ui/slider",
        pos: [
          -348.11307539843733,
          478.36673939843814
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 50,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: 92
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              89,
              93
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
          defaultValue: "refslaveV2_v2.safetensors",
          values: [
            "refslaveV2_v2.safetensors"
          ],
          hidden: false
        },
        widgets_values: [
          "refslaveV2_v2.safetensors"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "refslaveV2_v2.safetensors",
        shownOutputProperties: {}
      },
      {
        id: 71,
        type: "actions/swap",
        pos: [
          -533.2321880937501,
          464.976233050781
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: false
        },
        order: 56,
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
        id: 81,
        type: "ui/slider",
        pos: [
          -378.1190268824409,
          177.68165265758233
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 5,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
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
          "1.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 1,
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
          -378.11902688244066,
          209.66065265758203
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 6,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
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
          "1.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 1,
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
        id: 91,
        type: "ui/combo",
        pos: [
          1170.2263769190229,
          217.6416866206195
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
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
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
        id: 92,
        type: "ui/slider",
        pos: [
          1170.2263769190229,
          237.64168662061957
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 8,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              127
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
          defaultValue: 512,
          min: 64,
          max: 8192,
          step: 8,
          precision: 0
        },
        widgets_values: [
          "1152.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 1152,
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
        id: 93,
        type: "ui/slider",
        pos: [
          1170.2263769190229,
          257.6416866206199
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
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              128
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
          defaultValue: 512,
          min: 64,
          max: 8192,
          step: 8,
          precision: 0
        },
        widgets_values: [
          "1664.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 1664,
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
        id: 94,
        type: "ui/combo",
        pos: [
          1170.2263769190229,
          277.64168662061996
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
        order: 49,
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
        order: 52,
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
          1205.8968569656208,
          358.13717152021474
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 11,
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
        order: 47,
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
        order: 12,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
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
          "simple"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "simple",
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
        order: 13,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
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
        order: 14,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
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
          "dpmpp_2m"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "dpmpp_2m",
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
        order: 15,
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
          1248.547856965623,
          130.28917152021444
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 16,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
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
          "0.590"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 0.59,
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
          1240.5478569656227,
          -11.710828479784823
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 17,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
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
          "34.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 34,
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
        order: 33,
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
        order: 34,
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
        id: 100,
        type: "VAEDecode",
        pos: [
          1616.5478569656225,
          -69.71082847978477
        ],
        size: [
          210,
          46
        ],
        flags: {},
        order: 35,
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
            link: 136
          }
        ],
        outputs: [
          {
            name: "IMAGE",
            type: "IMAGE",
            links: [
              156
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
        id: 101,
        type: "PreviewImage",
        pos: [
          1631.5478569656225,
          21.28917152021509
        ],
        size: [
          140,
          26
        ],
        flags: {},
        order: 36,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "IMAGE",
            link: 156
          }
        ],
        outputs: [
          {
            name: "output",
            type: "IMAGE",
            links: [
              138
            ],
            slot_index: 0
          }
        ],
        title: "PreviewImage",
        properties: {},
        color: "#432",
        bgColor: "#653",
        tags: [
          "hr"
        ]
      },
      {
        id: 103,
        type: "ui/gallery",
        pos: [
          1833.5478569656261,
          93.28917152021494
        ],
        size: [
          210,
          98
        ],
        flags: {},
        order: 38,
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
            link: null,
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
          index: 0
        },
        widgets_values: [
          "Images: 1"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: [],
        shownOutputProperties: {}
      },
      {
        id: 99,
        type: "VAEEncode",
        pos: [
          991.863156965622,
          88.52017152021514
        ],
        size: [
          210,
          46
        ],
        flags: {},
        order: 60,
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
          1339.5478569656225,
          329.2891715202148
        ],
        size: [
          226.79999999999998,
          46
        ],
        flags: {},
        order: 29,
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
        id: 104,
        type: "ui/gallery",
        pos: [
          862.248693361997,
          640.4778575549986
        ],
        size: [
          210,
          98
        ],
        flags: {},
        order: 39,
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
            link: null,
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
          index: 2
        },
        widgets_values: [
          "Images: 4"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: [],
        shownOutputProperties: {}
      },
      {
        id: 102,
        type: "actions/on_executed",
        pos: [
          1624.5478569656225,
          92.28917152021496
        ],
        size: [
          176.4,
          46
        ],
        flags: {},
        order: 37,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "IMAGE",
            link: 138
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
          images: null,
          filename: null
        }
      },
      {
        id: 122,
        type: "actions/notify",
        pos: [
          1827.5478569656257,
          267.28917152021523
        ],
        size: [
          151.2,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 46,
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
        order: 57,
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
        order: 40,
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
            images: []
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
        order: 44,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: 0,
            link: 184,
            label: "2.000"
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
        order: 32,
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
        order: 28,
        mode: 0,
        inputs: [
          {
            name: "ckpt_name",
            type: "string",
            link: 97,
            config: {
              values: [
                "refslaveV2_v2.safetensors"
              ],
              defaultValue: "refslaveV2_v2.safetensors"
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
              136
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
        order: 55,
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
        order: 18,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: null
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
        order: 19,
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
          1827.5478569656257,
          238.289171520215
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 20,
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
          1242.5478569656227,
          380.289171520215
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
        id: 45,
        type: "ui/text",
        pos: [
          394.7273286953123,
          330.62239634765615
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
          }
        ],
        outputs: [
          {
            name: "value",
            type: "string",
            links: [
              113
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
        order: 58,
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
        id: 90,
        type: "LatentUpscale",
        pos: [
          1300.128032965624,
          173.51348852021468
        ],
        size: [
          267,
          106
        ],
        flags: {},
        order: 59,
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
            link: 127,
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
            link: 128,
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
        id: 119,
        type: "KSampler",
        pos: [
          1350.9812029656248,
          -73.2546714797851
        ],
        size: [
          241.79999999999998,
          206
        ],
        flags: {},
        order: 45,
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
        id: 116,
        type: "image/cache",
        pos: [
          869,
          459
        ],
        size: [
          210,
          142
        ],
        flags: {},
        order: 43,
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
            link: null,
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
            images: []
          },
          index: 2,
          filenames: {},
          genNumber: 15
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
        order: 41,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string",
            link: 165
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
        order: 23,
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
        order: 24,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null
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
        order: 54,
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
        id: 62,
        type: "ui/button",
        pos: [
          -643,
          528
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
        order: 26,
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
        order: 53,
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
          value: 133306333103352,
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
        order: 48,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: 67,
            slot_index: 0
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
          "133306333103352.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 133306333103352,
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
        order: 30,
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
        order: 31,
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
        order: 27,
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
          990,
          -26
        ],
        size: [
          210,
          46
        ],
        flags: {},
        order: 42,
        mode: 0,
        inputs: [
          {
            name: "image",
            type: "string",
            link: 164,
            config: {
              values: [],
              defaultValue: ""
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
        127,
        92,
        0,
        90,
        2,
        "number"
      ],
      [
        128,
        93,
        0,
        90,
        3,
        "number"
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
        136,
        74,
        2,
        100,
        1,
        "VAE"
      ],
      [
        138,
        101,
        0,
        102,
        0,
        "IMAGE"
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
        156,
        100,
        0,
        101,
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
          967,
          -159,
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
            disabled: false
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
            disabled: false
          }
        },
        children: [
          "51",
          "27",
          "33",
          "16",
          "41",
          "58"
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
            disabled: false
          }
        },
        children: [
          "76",
          "34",
          "79"
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
            disabled: false
          }
        },
        children: [
          "53",
          "54",
          "48"
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
            disabled: false
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
            title: "",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            blockVariant: "hidden",
            hidden: false,
            flexGrow: 100,
            disabled: false
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
            disabled: false
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
            disabled: false
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
            disabled: false
          }
        },
        children: [],
        parent: "2"
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
            disabled: false
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
            title: "↔",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            hidden: false,
            flexGrow: 1,
            disabled: false
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
            disabled: false
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
            disabled: false
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
            disabled: false
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
            disabled: false
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
            disabled: false
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
            disabled: false
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
            disabled: false
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
            disabled: false
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
            disabled: false
          }
        },
        children: [
          "55",
          "59"
        ],
        parent: "1"
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
            disabled: false
          }
        },
        children: [
          "56",
          "57"
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
      65: {
        dragItem: {
          type: "widget",
          id: "65",
          nodeId: 92,
          attrs: {
            title: "width",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            disabled: false
          }
        },
        children: [],
        parent: "74"
      },
      66: {
        dragItem: {
          type: "widget",
          id: "66",
          nodeId: 93,
          attrs: {
            title: "height",
            showTitle: true,
            direction: "horizontal",
            classes: "",
            flexGrow: 100,
            disabled: false
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
            disabled: false
          }
        },
        children: [],
        parent: "79"
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
            disabled: false
          }
        },
        children: [
          "65",
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
            disabled: false
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
            disabled: false
          }
        },
        children: [],
        parent: "2"
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
            flexGrow: 100
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
            flexGrow: 100
          }
        },
        children: [
          "82",
          "74",
          "83",
          "75",
          "73"
        ],
        parent: "2"
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
            flexGrow: 100
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
            flexGrow: 100
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
      }
    },
    currentId: 85,
    attrs: {
      defaultSubgraph: "default"
    }
  },
  canvas: {
    offset: [
      -123.23101613364986,
      242.30476878539957
    ],
    scale: 0.7513148009015788
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
