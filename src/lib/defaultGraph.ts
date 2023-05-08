import type SerializedAppState from "./ComfyApp"

const defaultGraph: SerializedAppState = {
  createdBy: "ComfyBox",
  version: 1,
  workflow: {
    last_node_id: 191,
    last_link_id: 306,
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
          tags: [],
          defaultValue: "",
          multiline: true,
          hidden: false
        },
        widgets_values: [
          "a fluffy corgi wearing glasses"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "a fluffy corgi wearing glasses",
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
          tags: [],
          defaultValue: "",
          multiline: true,
          hidden: false
        },
        widgets_values: [
          "worst quality, bad anatomy"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "worst quality, bad anatomy",
        shownOutputProperties: {},
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
        order: 2,
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
          tags: [],
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
          tags: [],
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
          tags: [],
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
          tags: [],
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
        order: 6,
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
          tags: [],
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
        order: 7,
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
          tags: [],
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
          "karras"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "karras",
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
        order: 8,
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
          tags: [],
          defaultValue: 8,
          min: 0,
          max: 100,
          step: 0.5,
          precision: 0,
          hidden: false
        },
        widgets_values: [
          "7.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 7,
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
        order: 9,
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
          tags: [],
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
        order: 10,
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
          tags: [],
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
        order: 11,
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
          tags: [],
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
        order: 43,
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
          tag: "hr",
          tags: []
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
        order: 81,
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
          value: 1,
          tags: []
        }
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
        order: 105,
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
          value: 1,
          tags: []
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
        order: 12,
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
          tags: [],
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
        order: 13,
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
          value: "Prompt generated!",
          tags: []
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
        order: 14,
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
          value: "Upscale complete!",
          tags: []
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
        order: 15,
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
          value: "hr",
          tags: []
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
        order: 78,
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
          tags: [],
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
        order: 16,
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
          value: 1,
          tags: []
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
        order: 17,
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
          tags: [],
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
        order: 104,
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
          tags: [],
          value: null
        },
        color: "#232",
        bgColor: "#353",
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
        order: 18,
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
          tags: [],
          prompt: null
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
        order: 52,
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
          OP: "+",
          tags: []
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
        order: 44,
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
          enabled: true,
          tags: []
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
        order: 19,
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
          value: "randomize",
          tags: []
        }
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
        order: 20,
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
          tags: [],
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
        order: 55,
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
          tag: "txt2img",
          tags: []
        },
        saveUserState: true
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
        order: 21,
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
          tags: [],
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
        order: 88,
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
        properties: {
          tags: []
        }
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
        order: 86,
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
          tags: [],
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
        order: 89,
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
        properties: {
          tags: []
        }
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
        order: 87,
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
          tags: [],
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
        order: 90,
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
        properties: {
          tags: []
        }
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
        order: 85,
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
          OP: "*",
          tags: []
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
        order: 84,
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
          OP: "*",
          tags: []
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
        order: 91,
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
        properties: {
          tags: []
        }
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
        order: 22,
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
          tags: [],
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
        order: 23,
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
          tags: [],
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
        order: 45,
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
          operation: "==",
          tags: []
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
        order: 24,
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
          value: 0,
          tags: []
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
        order: 61,
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
          tags: [],
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
        order: 62,
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
          tags: [],
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
        order: 25,
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
          tags: [],
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
        order: 77,
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
          tags: [],
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
        order: 26,
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
          tags: [],
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
        order: 69,
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
        properties: {
          tags: []
        }
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
        order: 68,
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
        properties: {
          tags: []
        }
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
        order: 27,
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
          tags: [],
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
        order: 47,
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
          value: 0,
          tags: []
        },
        saveUserState: true
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
        order: 83,
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
          message: "Nya.",
          tags: []
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
        order: 42,
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
          message: "Nya.",
          tags: []
        },
        saveUserState: true
      },
      {
        id: 168,
        type: "basic/CompareValues",
        pos: [
          -901.8829785123963,
          530.3379611570258
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 48,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: 0,
            link: 251
          },
          {
            name: "B",
            type: 0,
            link: 249
          }
        ],
        outputs: [
          {
            name: "true",
            type: "boolean",
            links: [
              253
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
          A: "txt2img",
          B: "txt2img",
          OP: "==",
          enabled: true,
          tags: []
        }
      },
      {
        id: 167,
        type: "basic/string",
        pos: [
          -1015.882978512396,
          647.3379611570261
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
            name: "string",
            type: "string",
            links: [
              250
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "img2img",
          tags: []
        }
      },
      {
        id: 166,
        type: "basic/string",
        pos: [
          -1003.8829785123964,
          529.3379611570258
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 29,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              249
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "txt2img",
          tags: []
        }
      },
      {
        id: 163,
        type: "ui/radio",
        pos: [
          -950.7590115702478,
          587.3379611570265
        ],
        size: [
          210,
          122
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
            type: "string",
            links: [
              251,
              252
            ],
            slot_index: 0
          },
          {
            name: "index",
            type: "number",
            links: null
          },
          {
            name: "changed",
            type: -2,
            links: [
              266,
              268
            ],
            shape: 1,
            slot_index: 2
          }
        ],
        title: "UI.Radio",
        properties: {
          tags: [],
          choices: [
            "txt2img",
            "img2img"
          ],
          defaultValue: "Choice A"
        },
        widgets_values: [
          "txt2img",
          0
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "txt2img",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 39,
        type: "ui/slider",
        pos: [
          -674.5920999999998,
          874.3974999999997
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 31,
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
          tags: [
            "t2i"
          ],
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
        id: 177,
        type: "ui/combo",
        pos: [
          -339,
          -254
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 32,
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
              270
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
          tags: [
            "useInternalVAE"
          ],
          defaultValue: "animefull-latest.vae.pt",
          values: [
            "animefull-latest.vae.pt",
            "kl-f8-anime2.vae.pt"
          ]
        },
        widgets_values: [
          "animefull-latest.vae.pt"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "animefull-latest.vae.pt",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 180,
        type: "actions/set_node_mode",
        pos: [
          -326,
          -387
        ],
        size: [
          210,
          78
        ],
        flags: {},
        order: 66,
        mode: 0,
        inputs: [
          {
            name: "enabled",
            type: "boolean",
            link: 276,
            slot_index: 0
          },
          {
            name: "set",
            type: -1,
            link: 273,
            shape: 1,
            slot_index: 1
          }
        ],
        outputs: [],
        title: "Comfy.SetNodeModeAction",
        properties: {
          targetTags: "useInternalVAE",
          enable: false,
          tags: []
        },
        saveUserState: true
      },
      {
        id: 181,
        type: "logic/NOT",
        pos: [
          -419,
          -365
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 54,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "boolean",
            link: 275
          }
        ],
        outputs: [
          {
            name: "out",
            type: "boolean",
            links: [
              276
            ],
            slot_index: 0
          }
        ],
        title: "NOT",
        properties: {
          tags: []
        }
      },
      {
        id: 179,
        type: "ui/checkbox",
        pos: [
          -660,
          -388
        ],
        size: [
          210,
          78
        ],
        flags: {},
        order: 33,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "value",
            type: "boolean",
            links: [
              275
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: [
              273
            ],
            shape: 1
          }
        ],
        title: "UI.Checkbox",
        properties: {
          tags: [],
          defaultValue: false
        },
        widgets_values: [
          "null"
        ],
        color: "#223",
        bgColor: "#335",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 184,
        type: "ui/combo",
        pos: [
          119.94512250976558,
          914.4891320312502
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 34,
        mode: 2,
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
              285
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
          tags: [
            "i2i"
          ],
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
        id: 183,
        type: "ui/combo",
        pos: [
          119.94512250976558,
          851.4891320312502
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 35,
        mode: 2,
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
              284
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
          tags: [
            "i2i"
          ],
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
        id: 36,
        type: "EmptyLatentImage",
        pos: [
          -207,
          455
        ],
        size: [
          216.60000000000002,
          66
        ],
        flags: {},
        order: 99,
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
              286
            ],
            color_off: "orange",
            color_on: "orange",
            slot_index: 0
          }
        ],
        title: "EmptyLatentImage",
        properties: {
          tags: [
            "txt2img",
            "t2i"
          ]
        },
        color: "#432",
        bgColor: "#653",
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
        order: 92,
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
        properties: {
          tags: [
            "txt2img"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 90,
        type: "LatentUpscale",
        pos: [
          1519,
          157
        ],
        size: [
          267,
          106
        ],
        flags: {},
        order: 106,
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
        properties: {
          tags: [
            "hr"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 99,
        type: "VAEEncode",
        pos: [
          1210,
          72
        ],
        size: [
          210,
          46
        ],
        flags: {},
        order: 107,
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
            link: 277,
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
        properties: {
          tags: [
            "hr"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 112,
        type: "LoadImage",
        pos: [
          1208,
          -43
        ],
        size: [
          210,
          46
        ],
        flags: {},
        order: 79,
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
        properties: {
          tags: [
            "hr"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 100,
        type: "VAEDecode",
        pos: [
          1835,
          -86
        ],
        size: [
          210,
          46
        ],
        flags: {},
        order: 75,
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
            link: 279,
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
        properties: {
          tags: [
            "hr"
          ]
        },
        color: "#432",
        bgColor: "#653",
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
        order: 93,
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
        properties: {
          tags: [
            "hr"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 40,
        type: "VAEDecode",
        pos: [
          382,
          150
        ],
        size: [
          140,
          46
        ],
        flags: {},
        order: 102,
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
            link: 278,
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
        properties: {
          tags: [
            "txt2img"
          ]
        },
        color: "#432",
        bgColor: "#653",
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
        order: 36,
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
          value: "txt2img",
          tags: []
        }
      },
      {
        id: 148,
        type: "events/filter",
        pos: [
          608,
          765
        ],
        size: [
          210,
          150
        ],
        flags: {
          collapsed: true
        },
        order: 46,
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
          operation: "==",
          tags: []
        }
      },
      {
        id: 149,
        type: "events/filter",
        pos: [
          605,
          798
        ],
        size: [
          210,
          150
        ],
        flags: {
          collapsed: true
        },
        order: 60,
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
          compareValue: "txt2img",
          propertyName: "subgraph",
          mode: "property",
          operation: "==",
          tags: []
        }
      },
      {
        id: 162,
        type: "ui/combo",
        pos: [
          -403.8113774902353,
          853.3226320312501
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 37,
        mode: 2,
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
              246
            ]
          },
          {
            name: "changed",
            type: -2,
            links: [
              295
            ],
            shape: 1,
            slot_index: 1
          }
        ],
        title: "UI.Combo",
        properties: {
          tags: [
            "i2i"
          ],
          defaultValue: "._00001_ (1).png",
          values: [
            "._00001_ (1).png",
            "._00001_ (10).png",
            "._00001_ (11).png",
            "._00001_ (12).png",
            "._00001_ (13).png",
            "._00001_ (14).png",
            "._00001_ (15).png",
            "._00001_ (16).png",
            "._00001_ (2).png",
            "._00001_ (3).png",
            "._00001_ (4).png",
            "._00001_ (5).png",
            "._00001_ (6).png",
            "._00001_ (7).png",
            "._00001_ (8).png",
            "._00001_ (9).png",
            "._00001_.png",
            "._00002_ (1).png",
            "._00002_ (2).png",
            "._00002_ (3).png",
            "._00002_ (4).png",
            "._00002_ (5).png",
            "._00002_ (6).png",
            "._00002_ (7).png",
            "._00002_.png",
            "._00003_ (1).png",
            "._00003_ (2).png",
            "._00003_ (3).png",
            "._00003_ (4).png",
            "._00003_ (5).png",
            "._00003_ (6).png",
            "._00003_ (7).png",
            "._00003_.png",
            "._00004_ (1).png",
            "._00004_ (2).png",
            "._00004_ (3).png",
            "._00004_ (4).png",
            "._00004_ (5).png",
            "._00004_ (6).png",
            "._00004_ (7).png",
            "._00004_ (8).png",
            "._00004_.png",
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
            "ComfyUI_01224_.png",
            "ComfyUI_01225_.png",
            "ComfyUI_01226_.png",
            "ComfyUI_01227_.png",
            "ComfyUI_01229_.png",
            "ComfyUI_01233_.png",
            "ComfyUI_01234_.png",
            "ComfyUI_01235_.png",
            "ComfyUI_01236_.png",
            "ComfyUI_01237_.png",
            "ComfyUI_01238_.png",
            "ComfyUI_01239_.png",
            "ComfyUI_01240_.png",
            "ComfyUI_01241_.png",
            "ComfyUI_01242_.png",
            "ComfyUI_01243_.png",
            "ComfyUI_01244_.png",
            "ComfyUI_01245_.png",
            "ComfyUI_01246_.png",
            "ComfyUI_01248_.png",
            "ComfyUI_01249_.png",
            "ComfyUI_01250_.png",
            "ComfyUI_01252_.png",
            "ComfyUI_01253_ (1).png",
            "ComfyUI_01253_.png",
            "ComfyUI_01265_.png",
            "ComfyUI_01268_ (1).png",
            "ComfyUI_01268_.png",
            "ComfyUI_01269_ (1).png",
            "ComfyUI_01269_.png",
            "ComfyUI_01273_.png",
            "ComfyUI_01274_.png",
            "ComfyUI_01275_.png",
            "ComfyUI_01276_.png",
            "ComfyUI_01277_.png",
            "ComfyUI_01278_.png",
            "ComfyUI_01279_.png",
            "ComfyUI_01280_.png",
            "ComfyUI_01281_.png",
            "ComfyUI_01282_.png",
            "ComfyUI_01283_.png",
            "ComfyUI_01284_.png",
            "ComfyUI_01285_.png",
            "ComfyUI_01289_.png",
            "ComfyUI_01291_.png",
            "ComfyUI_01292_.png",
            "ComfyUI_01293_.png",
            "ComfyUI_01294_.png",
            "ComfyUI_01295_.png",
            "ComfyUI_01296_.png",
            "ComfyUI_01297_.png",
            "ComfyUI_01298_.png",
            "ComfyUI_01299_.png",
            "ComfyUI_01300_.png",
            "ComfyUI_01301_.png",
            "ComfyUI_01302_.png",
            "ComfyUI_01303_.png",
            "ComfyUI_01304_.png",
            "ComfyUI_01319_.png",
            "ComfyUI_01320_.png",
            "ComfyUI_01329_.png",
            "ComfyUI_01333_.png",
            "ComfyUI_01334_ (1).png",
            "ComfyUI_01334_.png",
            "ComfyUI_01335_ (1).png",
            "ComfyUI_01335_.png",
            "ComfyUI_01336_ (1).png",
            "ComfyUI_01336_.png",
            "ComfyUI_01337_.png",
            "ComfyUI_01338_.png",
            "ComfyUI_01339_.png",
            "ComfyUI_01340_.png",
            "ComfyUI_01342_.png",
            "ComfyUI_01377_.png",
            "ComfyUI_01381_.png",
            "ComfyUI_01427_.png",
            "ComfyUI_01431_.png",
            "ComfyUI_01435_.png",
            "ComfyUI_01436_.png",
            "ComfyUI_01438_.png",
            "ComfyUI_01441_.png",
            "ComfyUI_01442_.png",
            "ComfyUI_01443_.png",
            "ComfyUI_01444_.png",
            "ComfyUI_01447_.png",
            "ComfyUI_01448_.png",
            "ComfyUI_01449_.png",
            "ComfyUI_01456_.png",
            "ComfyUI_01460_.png",
            "ComfyUI_01461_.png",
            "ComfyUI_01464_.png",
            "ComfyUI_01468_.png",
            "ComfyUI_01477_.png",
            "ComfyUI_01478_.png",
            "ComfyUI_01479_.png",
            "ComfyUI_01480_.png",
            "ComfyUI_01481_.png",
            "ComfyUI_01490_.png",
            "ComfyUI_01494_.png",
            "ComfyUI_01498_.png",
            "ComfyUI_01502_.png",
            "ComfyUI_01506_.png",
            "ComfyUI_01510_.png",
            "ComfyUI_01511_.png",
            "ComfyUI_01512_.png",
            "ComfyUI_01513_.png",
            "ComfyUI_01529_.png",
            "ComfyUI_01536_.png",
            "ComfyUI_01541_.png",
            "ComfyUI_01542_.png",
            "ComfyUI_01547_.png",
            "ComfyUI_01548_.png",
            "ComfyUI_01550_.png",
            "ComfyUI_01552_.png",
            "ComfyUI_01556_.png",
            "ComfyUI_01557_.png",
            "ComfyUI_01558_.png",
            "ComfyUI_01563_.png",
            "ComfyUI_01570_.png",
            "ComfyUI_01588_.png",
            "ComfyUI_01592_.png",
            "ComfyUI_01593_.png",
            "ComfyUI_01594_.png",
            "ComfyUI_01595_.png",
            "ComfyUI_01596_.png",
            "ComfyUI_01597_ (1).png",
            "ComfyUI_01597_.png",
            "ComfyUI_01598_.png",
            "ComfyUI_01599_.png",
            "ComfyUI_01600_.png",
            "ComfyUI_01601_.png",
            "ComfyUI_01602_.png",
            "ComfyUI_01617_.png",
            "ComfyUI_01619_.png",
            "ComfyUI_01620_.png",
            "ComfyUI_01621_.png",
            "ComfyUI_01622_.png",
            "ComfyUI_01628_.png",
            "ComfyUI_01629_.png",
            "ComfyUI_01632_.png",
            "__etna_and_flonne_disgaea_and_1_more__4fa15fd4c0d2233cc02b79bf903897ec.jpg",
            "__fujiwara_no_mokou_and_houraisan_kaguya_touhou_drawn_by_tsuno_no_hito__3dd87f83b2e0bfb976fd2689598f0fb4.png",
            "__marona_phantom_brave_drawn_by_yilx__496dbc0b6cc95cf8a00427b2db29ed21.jpg",
            "blob",
            "blob (1)",
            "blob (2)",
            "blob (3)",
            "example.png"
          ]
        },
        widgets_values: [
          "._00001_ (1).png"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "._00001_ (1).png",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 161,
        type: "LoadImage",
        pos: [
          -237.81137749023495,
          829.3226320312501
        ],
        size: [
          140,
          46
        ],
        flags: {},
        order: 56,
        mode: 2,
        inputs: [
          {
            name: "image",
            type: "string",
            link: 246,
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
              269,
              293
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
        properties: {
          tags: [
            "txt2img",
            "i2i",
            "i2iPreview"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 188,
        type: "actions/execute_subgraph",
        pos: [
          -349.81137749023526,
          947.3226320312502
        ],
        size: [
          226.79999999999998,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 57,
        mode: 0,
        inputs: [
          {
            name: "execute",
            type: -1,
            link: 295,
            shape: 1
          },
          {
            name: "tag",
            type: "string",
            link: null
          }
        ],
        outputs: [],
        title: "Comfy.ExecuteSubgraphAction",
        properties: {
          tag: "i2iPreview",
          tags: []
        },
        saveUserState: true
      },
      {
        id: 16,
        type: "KSampler",
        pos: [
          188,
          150
        ],
        size: [
          161.2,
          206
        ],
        flags: {},
        order: 94,
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
            link: 288,
            color_off: "orange",
            color_on: "orange",
            config: {}
          },
          {
            name: "denoise",
            type: "number",
            link: 299,
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
        properties: {
          tags: [
            "txt2img"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 120,
        type: "basic/number",
        pos: [
          -317,
          695
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 38,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              296
            ],
            label: "1.000",
            slot_index: 0
          }
        ],
        title: "Const Number",
        properties: {
          value: 1,
          tags: []
        }
      },
      {
        id: 190,
        type: "ui/slider",
        pos: [
          -338,
          668
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 39,
        mode: 2,
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
              298
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
          tags: [
            "i2i"
          ],
          defaultValue: 0,
          min: 0,
          max: 1,
          step: 0.05,
          precision: 1
        },
        widgets_values: [
          "0.550"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 0.55,
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
        id: 178,
        type: "utils/pick_first",
        pos: [
          103,
          -278
        ],
        size: [
          210,
          98
        ],
        flags: {},
        order: 65,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "*",
            link: 271
          },
          {
            name: "B",
            type: "*",
            link: 274
          },
          {
            name: "C",
            type: "*",
            link: null
          }
        ],
        outputs: [
          {
            name: "",
            type: "VAE",
            links: [
              277,
              278,
              279,
              280
            ],
            slot_index: 0
          }
        ],
        title: "Comfy.PickFirst",
        properties: {
          tags: [
            "txt2img",
            "hr"
          ],
          acceptNullLinkData: false
        },
        color: "#232",
        bgColor: "#353",
        saveUserState: true
      },
      {
        id: 176,
        type: "VAELoader",
        pos: [
          -209,
          -278
        ],
        size: [
          140,
          26
        ],
        flags: {},
        order: 53,
        mode: 0,
        inputs: [
          {
            name: "vae_name",
            type: "string",
            link: 270,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          }
        ],
        outputs: [
          {
            name: "VAE",
            type: "VAE",
            links: [
              271
            ],
            slot_index: 0
          }
        ],
        title: "VAELoader",
        properties: {
          tags: [
            "txt2img",
            "hr",
            "useInternalVAE"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 74,
        type: "CheckpointLoaderSimple",
        pos: [
          -227,
          -38
        ],
        size: [
          184.79999999999998,
          66
        ],
        flags: {},
        order: 41,
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
              292
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
              274
            ],
            slot_index: 2
          }
        ],
        title: "CheckpointLoaderSimple",
        properties: {
          tags: [
            "txt2img",
            "hr"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 103,
        type: "ui/gallery",
        pos: [
          2076,
          65
        ],
        size: [
          210,
          122
        ],
        flags: {},
        order: 76,
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
          tags: [],
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
        id: 145,
        type: "events/filter",
        pos: [
          1816,
          303
        ],
        size: [
          210,
          150
        ],
        flags: {
          collapsed: true
        },
        order: 59,
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
          operation: "==",
          tags: []
        }
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
        order: 82,
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
        properties: {
          tags: [
            "hr"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 79,
        type: "LoraLoader",
        pos: [
          -247,
          68
        ],
        size: [
          254.39999999999998,
          106
        ],
        flags: {},
        order: 70,
        mode: 0,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 292,
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
        properties: {
          tags: [
            "txt2img",
            "hr"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 32,
        type: "CLIPTextEncode",
        pos: [
          -216,
          276
        ],
        size: [
          212.10067125600108,
          46
        ],
        flags: {},
        order: 73,
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
        properties: {
          tags: [
            "txt2img",
            "hr"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 34,
        type: "CLIPTextEncode",
        pos: [
          -214,
          367
        ],
        size: [
          216.60000000000002,
          46
        ],
        flags: {},
        order: 74,
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
        properties: {
          tags: [
            "txt2img",
            "hr"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 189,
        type: "utils/pick_first",
        pos: [
          -218,
          686
        ],
        size: [
          210,
          98
        ],
        flags: {
          collapsed: true
        },
        order: 58,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "*",
            link: 298
          },
          {
            name: "B",
            type: "*",
            link: 296
          },
          {
            name: "C",
            type: "*",
            link: null
          }
        ],
        outputs: [
          {
            name: "",
            type: "*",
            links: [
              299
            ],
            slot_index: 0
          }
        ],
        title: "Comfy.PickFirst",
        properties: {
          tags: [
            "txt2img"
          ],
          acceptNullLinkData: false
        },
        color: "#232",
        bgColor: "#353",
        saveUserState: true
      },
      {
        id: 185,
        type: "utils/pick_first",
        pos: [
          96,
          682
        ],
        size: [
          210,
          98
        ],
        flags: {
          collapsed: true
        },
        order: 97,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "*",
            link: 286
          },
          {
            name: "B",
            type: "*",
            link: 287
          },
          {
            name: "C",
            type: "*",
            link: null
          }
        ],
        outputs: [
          {
            name: "",
            type: "LATENT",
            links: [
              288
            ],
            slot_index: 0
          }
        ],
        title: "Comfy.PickFirst",
        properties: {
          tags: [
            "txt2img"
          ],
          acceptNullLinkData: false
        },
        color: "#232",
        bgColor: "#353",
        saveUserState: true
      },
      {
        id: 182,
        type: "LatentUpscale",
        pos: [
          225.43002250976568,
          809.73263203125
        ],
        size: [
          178,
          106
        ],
        flags: {},
        order: 96,
        mode: 2,
        inputs: [
          {
            name: "samples",
            type: "LATENT",
            link: 281,
            config: {}
          },
          {
            name: "upscale_method",
            type: "string",
            link: 284,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "width",
            type: "number",
            link: 282,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "height",
            type: "number",
            link: 283,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "crop",
            type: "string",
            link: 285,
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
              287
            ],
            slot_index: 0
          }
        ],
        title: "LatentUpscale",
        properties: {
          tags: [
            "txt2img",
            "i2i"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 175,
        type: "VAEEncode",
        pos: [
          -72.56997749023432,
          837.73263203125
        ],
        size: [
          140,
          46
        ],
        flags: {},
        order: 71,
        mode: 2,
        inputs: [
          {
            name: "pixels",
            type: "IMAGE",
            link: 269,
            config: {}
          },
          {
            name: "vae",
            type: "VAE",
            link: 280,
            config: {}
          }
        ],
        outputs: [
          {
            name: "LATENT",
            type: "LATENT",
            links: [
              281
            ],
            slot_index: 0
          }
        ],
        title: "VAEEncode",
        properties: {
          tags: [
            "txt2img",
            "i2i"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 187,
        type: "PreviewImage",
        pos: [
          -119.56997749023432,
          928.73263203125
        ],
        size: [
          144.4,
          26
        ],
        flags: {},
        order: 67,
        mode: 0,
        inputs: [
          {
            name: "images",
            type: "IMAGE",
            link: 293,
            config: {}
          }
        ],
        outputs: [
          {
            name: "onExecuted",
            type: -2,
            links: [
              294
            ],
            color_off: "rebeccapurple",
            color_on: "rebeccapurple",
            shape: 1,
            slot_index: 0
          }
        ],
        title: "PreviewImage",
        properties: {
          tags: [
            "i2iPreview"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 186,
        type: "ui/gallery",
        pos: [
          49.43002250976564,
          947.73263203125
        ],
        size: [
          210,
          122
        ],
        flags: {
          collapsed: true
        },
        order: 72,
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
            link: 294,
            color_off: "rebeccapurple",
            color_on: "rebeccapurple",
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
          tags: [],
          defaultValue: null,
          index: 0,
          updateMode: "replace"
        },
        widgets_values: [],
        color: "#223",
        bgColor: "#335",
        comfyValue: [],
        shownOutputProperties: {},
        saveUserState: false
      },
      {
        id: 164,
        type: "actions/set_node_mode",
        pos: [
          -661,
          523
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
            name: "enabled",
            type: "boolean",
            link: 253
          },
          {
            name: "set",
            type: -1,
            link: 265,
            shape: 1
          }
        ],
        outputs: [],
        title: "Comfy.SetNodeModeAction",
        properties: {
          targetTags: "t2i",
          enable: false,
          tags: []
        },
        saveUserState: true
      },
      {
        id: 165,
        type: "actions/set_node_mode",
        pos: [
          -665,
          651
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
            name: "enabled",
            type: "boolean",
            link: 254
          },
          {
            name: "set",
            type: -1,
            link: 267,
            shape: 1
          }
        ],
        outputs: [],
        title: "Comfy.SetNodeModeAction",
        properties: {
          targetTags: "i2i",
          enable: false,
          tags: []
        },
        saveUserState: true
      },
      {
        id: 174,
        type: "events/frame_delay",
        pos: [
          -795,
          654
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 51,
        mode: 0,
        inputs: [
          {
            name: "event",
            type: -1,
            link: 268,
            shape: 1,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "on_time",
            type: -2,
            links: [
              267
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Frame Delay",
        properties: {
          timeInFrames: 8,
          tags: []
        }
      },
      {
        id: 173,
        type: "events/frame_delay",
        pos: [
          -790,
          523
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 50,
        mode: 0,
        inputs: [
          {
            name: "event",
            type: -1,
            link: 266,
            shape: 1,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "on_time",
            type: -2,
            links: [
              265
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Frame Delay",
        properties: {
          timeInFrames: 8,
          tags: []
        }
      },
      {
        id: 169,
        type: "basic/CompareValues",
        pos: [
          -906,
          649
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 49,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: 0,
            link: 252
          },
          {
            name: "B",
            type: 0,
            link: 250
          }
        ],
        outputs: [
          {
            name: "true",
            type: "boolean",
            links: [
              254
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
          A: "txt2img",
          B: "img2img",
          OP: "==",
          enabled: true,
          tags: []
        }
      },
      {
        id: 116,
        type: "image/cache",
        pos: [
          868,
          444
        ],
        size: [
          210,
          166
        ],
        flags: {},
        order: 80,
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
          tags: [],
          images: {
            images: [
              {
                filename: "ComfyUI_01628_.png",
                subfolder: "",
                type: "output"
              },
              {
                filename: "ComfyUI_01629_.png",
                subfolder: "",
                type: "output"
              }
            ]
          },
          index: 0,
          filenames: {
            0: {
              filename: "ComfyUI_01628_.png",
              status: "cached"
            }
          },
          genNumber: 93,
          updateMode: "append"
        },
        saveUserState: true
      },
      {
        id: 37,
        type: "ui/slider",
        pos: [
          -670,
          842
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 100,
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
            link: 305,
            shape: 1,
            slot_index: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              93,
              200,
              282,
              301
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
          tags: [],
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
          -667,
          815
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 101,
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
            link: 303,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              94,
              201,
              283,
              302
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
          tags: [],
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
        id: 191,
        type: "actions/swap",
        pos: [
          -847,
          795
        ],
        size: [
          140,
          66
        ],
        flags: {},
        order: 98,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "*",
            link: 301
          },
          {
            name: "B",
            type: "*",
            link: 302
          },
          {
            name: "swap",
            type: -1,
            link: 300,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "B",
            type: -2,
            links: [
              303
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "A",
            type: -2,
            links: [
              305
            ],
            shape: 1
          }
        ],
        title: "Comfy.SwapAction",
        properties: {
          tags: []
        },
        saveUserState: true
      },
      {
        id: 62,
        type: "ui/button",
        pos: [
          -966,
          857
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
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              300
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
          tags: [],
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
        order: 103,
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
            links: [],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: [
              306
            ],
            shape: 1,
            slot_index: 1
          }
        ],
        title: "Comfy.ValueControl",
        properties: {
          tags: [],
          value: 557222282511734,
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
          -718,
          355
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 95,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "number",
            link: null,
            slot_index: 0
          },
          {
            name: "store",
            type: -1,
            link: 306,
            shape: 1,
            slot_index: 1
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
          tags: [],
          defaultValue: 0,
          min: 0,
          max: 18446744073709552000,
          step: 1,
          precision: 0,
          hidden: false
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
        97,
        75,
        0,
        74,
        0,
        "string"
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
      ],
      [
        246,
        162,
        0,
        161,
        0,
        "string"
      ],
      [
        249,
        166,
        0,
        168,
        1,
        "string"
      ],
      [
        250,
        167,
        0,
        169,
        1,
        "string"
      ],
      [
        251,
        163,
        0,
        168,
        0,
        "string"
      ],
      [
        252,
        163,
        0,
        169,
        0,
        "string"
      ],
      [
        253,
        168,
        0,
        164,
        0,
        "boolean"
      ],
      [
        254,
        169,
        0,
        165,
        0,
        "boolean"
      ],
      [
        265,
        173,
        0,
        164,
        1,
        -1
      ],
      [
        266,
        163,
        2,
        173,
        0,
        -1
      ],
      [
        267,
        174,
        0,
        165,
        1,
        -1
      ],
      [
        268,
        163,
        2,
        174,
        0,
        -1
      ],
      [
        269,
        161,
        0,
        175,
        0,
        "IMAGE"
      ],
      [
        270,
        177,
        0,
        176,
        0,
        "string"
      ],
      [
        271,
        176,
        0,
        178,
        0,
        "*"
      ],
      [
        273,
        179,
        1,
        180,
        1,
        -1
      ],
      [
        274,
        74,
        2,
        178,
        1,
        "*"
      ],
      [
        275,
        179,
        0,
        181,
        0,
        "boolean"
      ],
      [
        276,
        181,
        0,
        180,
        0,
        "boolean"
      ],
      [
        277,
        178,
        0,
        99,
        1,
        "VAE"
      ],
      [
        278,
        178,
        0,
        40,
        1,
        "VAE"
      ],
      [
        279,
        178,
        0,
        100,
        1,
        "VAE"
      ],
      [
        280,
        178,
        0,
        175,
        1,
        "VAE"
      ],
      [
        281,
        175,
        0,
        182,
        0,
        "LATENT"
      ],
      [
        282,
        37,
        0,
        182,
        2,
        "number"
      ],
      [
        283,
        38,
        0,
        182,
        3,
        "number"
      ],
      [
        284,
        183,
        0,
        182,
        1,
        "string"
      ],
      [
        285,
        184,
        0,
        182,
        4,
        "string"
      ],
      [
        286,
        36,
        0,
        185,
        0,
        "*"
      ],
      [
        287,
        182,
        0,
        185,
        1,
        "*"
      ],
      [
        288,
        185,
        0,
        16,
        8,
        "LATENT"
      ],
      [
        292,
        74,
        0,
        79,
        0,
        "MODEL"
      ],
      [
        293,
        161,
        0,
        187,
        0,
        "IMAGE"
      ],
      [
        294,
        187,
        0,
        186,
        1,
        -1
      ],
      [
        295,
        162,
        1,
        188,
        0,
        -1
      ],
      [
        296,
        120,
        0,
        189,
        1,
        "*"
      ],
      [
        298,
        190,
        0,
        189,
        0,
        "*"
      ],
      [
        299,
        189,
        0,
        16,
        9,
        "number"
      ],
      [
        300,
        62,
        0,
        191,
        2,
        -1
      ],
      [
        301,
        37,
        0,
        191,
        0,
        "*"
      ],
      [
        302,
        38,
        0,
        191,
        1,
        "*"
      ],
      [
        303,
        191,
        0,
        38,
        1,
        -1
      ],
      [
        305,
        191,
        1,
        37,
        1,
        -1
      ],
      [
        306,
        56,
        1,
        17,
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
      },
      {
        title: "img2img",
        bounding: [
          -412,
          731,
          883,
          270
        ],
        color: "#A88"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: false,
            blockVariant: "block"
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
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: false,
            blockVariant: "block"
          }
        },
        children: [
          "104",
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
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: false,
            blockVariant: "block"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: false
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: false
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            max: 2
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
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "block"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "hidden",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "hidden",
            tabNames: [
              "Positive",
              "Negative"
            ]
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
          }
        },
        children: [],
        parent: "111"
      },
      33: {
        dragItem: {
          type: "container",
          id: "33",
          attrs: {
            title: "Latent Image",
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "block"
          }
        },
        children: [
          "102",
          "47",
          "111",
          "109"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: true,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "block"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "testClas",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 1,
            height: "auto",
            classes: "",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "secondary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "hidden"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "hidden"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
          }
        },
        children: [],
        parent: "115"
      },
      53: {
        dragItem: {
          type: "container",
          id: "53",
          attrs: {
            title: "",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: false,
            blockVariant: "hidden"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "hidden"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "block"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "block",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "block"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "hidden"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "hidden"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: true,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "block"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "block",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "hidden"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true,
            blockVariant: "hidden"
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: true,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: true,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "block",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            showTitle: true
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 1,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "secondary",
            buttonSize: "small",
            tags: []
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
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
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "block",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
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
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "hidden",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [
          "76",
          "73",
          "94"
        ],
        parent: "2"
      },
      100: {
        dragItem: {
          type: "widget",
          id: "100",
          nodeId: 162,
          attrs: {
            title: "image",
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [],
        parent: "112"
      },
      102: {
        dragItem: {
          type: "widget",
          id: "102",
          nodeId: 163,
          attrs: {
            title: "Widget",
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [],
        parent: "33"
      },
      103: {
        dragItem: {
          type: "widget",
          id: "103",
          nodeId: 177,
          attrs: {
            title: "vae_name",
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [],
        parent: "115"
      },
      104: {
        dragItem: {
          type: "container",
          id: "104",
          attrs: {
            title: "Models",
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [
          "115",
          "105"
        ],
        parent: "1"
      },
      105: {
        dragItem: {
          type: "widget",
          id: "105",
          nodeId: 179,
          attrs: {
            title: "Use Internal VAE",
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [],
        parent: "104"
      },
      106: {
        dragItem: {
          type: "widget",
          id: "106",
          nodeId: 183,
          attrs: {
            title: "upscale_method",
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [],
        parent: "108"
      },
      107: {
        dragItem: {
          type: "widget",
          id: "107",
          nodeId: 184,
          attrs: {
            title: "crop",
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [],
        parent: "108"
      },
      108: {
        dragItem: {
          type: "container",
          id: "108",
          attrs: {
            title: "",
            hidden: true,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [
              "i2i"
            ]
          }
        },
        children: [
          "107",
          "106"
        ],
        parent: "109"
      },
      109: {
        dragItem: {
          type: "container",
          id: "109",
          attrs: {
            title: "img2img",
            hidden: true,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [
              "i2i"
            ]
          }
        },
        children: [
          "112",
          "108"
        ],
        parent: "33"
      },
      111: {
        dragItem: {
          type: "container",
          id: "111",
          attrs: {
            title: "",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [
          "32",
          "114"
        ],
        parent: "33"
      },
      112: {
        dragItem: {
          type: "container",
          id: "112",
          attrs: {
            title: "",
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [
          "113",
          "100"
        ],
        parent: "109"
      },
      113: {
        dragItem: {
          type: "widget",
          id: "113",
          nodeId: 186,
          attrs: {
            title: "",
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "var(--size-96)",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "image",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [],
        parent: "112"
      },
      114: {
        dragItem: {
          type: "widget",
          id: "114",
          nodeId: 190,
          attrs: {
            title: "denoise",
            hidden: false,
            disabled: false,
            direction: "vertical",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [],
        parent: "111"
      },
      115: {
        dragItem: {
          type: "container",
          id: "115",
          attrs: {
            title: "",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            flexGrow: 100,
            height: "auto",
            classes: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [
          "51",
          "103"
        ],
        parent: "104"
      }
    },
    currentId: 116,
    attrs: {
      defaultSubgraph: "txt2img"
    }
  },
  canvas: {
    offset: [
      1270.7476082145795,
      -92.44840246010858
    ],
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
