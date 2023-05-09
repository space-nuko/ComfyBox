import type SerializedAppState from "./ComfyApp"

const defaultGraph: SerializedAppState = {
  createdBy: "ComfyBox",
  version: 1,
  workflow: {
    last_node_id: 243,
    last_link_id: 384,
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
          "worst quality"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "worst quality",
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
        order: 7,
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
          "0.650"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 0.65,
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
        order: 140,
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
        order: 11,
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
        order: 12,
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
        order: 105,
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
          "none"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "none",
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
        order: 13,
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
        order: 14,
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
        order: 139,
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
        order: 15,
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
        order: 55,
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
        order: 51,
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
        order: 16,
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
        order: 116,
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
        order: 114,
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
          "2"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "2",
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
        order: 117,
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
        order: 115,
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
          "2"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "2",
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
        order: 118,
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
        order: 119,
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
          "2.100"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 2.1,
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
        order: 18,
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
        order: 52,
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
        order: 19,
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
        order: 71,
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
        order: 72,
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
        order: 20,
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
        order: 21,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "boolean",
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
        order: 81,
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
        order: 80,
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
        order: 22,
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
        order: 54,
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
          2020.6999999999966,
          278.5
        ],
        size: [
          151.2,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 111,
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
        order: 50,
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
          -1466.1829785123962,
          531.4379611570262
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
        id: 166,
        type: "basic/string",
        pos: [
          -1568.1829785123962,
          530.4379611570262
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
        order: 24,
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
        order: 25,
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
        order: 74,
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
        order: 57,
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
        order: 26,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "boolean",
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
          "false"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: false,
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
        order: 27,
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
        order: 28,
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
        order: 134,
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
        order: 141,
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
        order: 142,
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
        order: 107,
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
        order: 102,
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
        order: 137,
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
        order: 53,
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
        order: 70,
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
        order: 29,
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
        order: 30,
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
          "0.650"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 0.65,
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
          122
        ],
        flags: {},
        order: 73,
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
          mode: "dataNonNull",
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
        order: 56,
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
        order: 49,
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
          142
        ],
        flags: {},
        order: 103,
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
          },
          {
            name: "width",
            type: "number",
            links: null
          },
          {
            name: "height",
            type: "number",
            links: null
          },
          {
            name: "any_selected",
            type: "boolean",
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
        order: 69,
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
        order: 110,
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
        order: 82,
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
        order: 89,
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
        order: 90,
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
        order: 83,
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
        id: 173,
        type: "events/frame_delay",
        pos: [
          -1354.2999999999997,
          524.1000000000004
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
        order: 138,
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
          value: 1089491900447023,
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
        order: 123,
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
          "1089491900447023.000"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 1089491900447023,
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
        id: 161,
        type: "LoadImage",
        pos: [
          -238,
          829
        ],
        size: [
          140,
          46
        ],
        flags: {},
        order: 60,
        mode: 2,
        inputs: [
          {
            name: "image",
            type: "string",
            link: 317,
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
              269
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
            "i2i"
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
          122
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
          mode: "dataNonNull",
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
          683
        ],
        size: [
          210,
          122
        ],
        flags: {
          collapsed: true
        },
        order: 125,
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
          mode: "dataNonNull",
          acceptNullLinkData: false
        },
        color: "#232",
        bgColor: "#353",
        saveUserState: true
      },
      {
        id: 45,
        type: "ui/text",
        pos: [
          425,
          339
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
              308
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
        order: 121,
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
            link: 311,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/text",
            serialize: true,
            slot_index: 1
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
        id: 193,
        type: "utils/pick_first",
        pos: [
          532,
          339
        ],
        size: [
          210,
          122
        ],
        flags: {
          collapsed: true
        },
        order: 59,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "*",
            link: 308
          },
          {
            name: "B",
            type: "*",
            link: 309
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
            type: "string",
            links: [
              310,
              311
            ],
            slot_index: 0
          }
        ],
        title: "Comfy.PickFirst",
        properties: {
          tags: [],
          mode: "truthy"
        },
        color: "#232",
        bgColor: "#353",
        saveUserState: true
      },
      {
        id: 194,
        type: "basic/string",
        pos: [
          421,
          374
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 32,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              309
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "ComfyUI",
          tags: []
        }
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
        order: 33,
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
          tags: [
            "t2i"
          ],
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
        order: 126,
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
          tags: [
            "t2i"
          ]
        },
        saveUserState: true
      },
      {
        id: 197,
        type: "ui/button",
        pos: [
          -760,
          1180
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 34,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              312
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
          tags: [
            "i2i",
            "i2iPixelSize"
          ],
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
        order: 136,
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
          tags: [
            "t2i"
          ],
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
        order: 124,
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
            link: 353,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "height",
            type: "number",
            link: 354,
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
        order: 135,
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
          tags: [
            "t2i"
          ],
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
        id: 206,
        type: "ui/text",
        pos: [
          -254.39999999999998,
          1079.899999999999
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 91,
        mode: 2,
        inputs: [
          {
            name: "value",
            type: "string",
            link: 322
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
          tags: [
            "i2i",
            "i2iScaleSize"
          ],
          defaultValue: "",
          multiline: false
        },
        widgets_values: [
          "2"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "2",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 207,
        type: "ui/text",
        pos: [
          -259.4,
          1217.899999999999
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 92,
        mode: 2,
        inputs: [
          {
            name: "value",
            type: "string",
            link: 323
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
          tags: [
            "i2i",
            "i2iScaleSize"
          ],
          defaultValue: "",
          multiline: false
        },
        widgets_values: [
          "2"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "2",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 204,
        type: "math/operation",
        pos: [
          -330.4,
          1185.899999999999
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 62,
        mode: 2,
        inputs: [
          {
            name: "A",
            type: "number,array,object",
            link: 320
          },
          {
            name: "B",
            type: "number",
            link: 329
          }
        ],
        outputs: [
          {
            name: "=",
            type: "number",
            links: [
              327
            ],
            slot_index: 0
          }
        ],
        title: "Operation",
        properties: {
          A: 2,
          B: 1,
          OP: "*",
          tags: [
            "i2i",
            "i2iScaleSize"
          ]
        }
      },
      {
        id: 209,
        type: "string/toString",
        pos: [
          -354.4,
          1081.899999999999
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 84,
        mode: 2,
        inputs: [
          {
            name: "in",
            type: "",
            link: 325
          }
        ],
        outputs: [
          {
            name: "out",
            type: "string",
            links: [
              322
            ],
            slot_index: 0
          }
        ],
        title: "ToString",
        properties: {
          tags: [
            "i2i",
            "i2iScaleSize"
          ]
        }
      },
      {
        id: 208,
        type: "string/toString",
        pos: [
          -363.3999999999999,
          1216.899999999999
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 85,
        mode: 2,
        inputs: [
          {
            name: "in",
            type: "",
            link: 324
          }
        ],
        outputs: [
          {
            name: "out",
            type: "string",
            links: [
              323
            ],
            slot_index: 0
          }
        ],
        title: "ToString",
        properties: {
          tags: [
            "i2i",
            "i2iScaleSize"
          ]
        }
      },
      {
        id: 205,
        type: "math/operation",
        pos: [
          -344,
          1115
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 61,
        mode: 2,
        inputs: [
          {
            name: "A",
            type: "number,array,object",
            link: 321
          },
          {
            name: "B",
            type: "number",
            link: 328
          }
        ],
        outputs: [
          {
            name: "=",
            type: "number",
            links: [
              326
            ],
            slot_index: 0
          }
        ],
        title: "Operation",
        properties: {
          A: 2,
          B: 1,
          OP: "*",
          tags: [
            "i2i",
            "i2iScaleSize"
          ]
        }
      },
      {
        id: 211,
        type: "math/floor",
        pos: [
          -254,
          1154
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 76,
        mode: 2,
        inputs: [
          {
            name: "in",
            type: "number",
            link: 327
          }
        ],
        outputs: [
          {
            name: "out",
            type: "number",
            links: [
              324,
              332
            ],
            slot_index: 0
          }
        ],
        title: "Floor",
        properties: {
          tags: [
            "i2i",
            "i2iScaleSize"
          ]
        }
      },
      {
        id: 216,
        type: "logic/NOT",
        pos: [
          -942.8879999999998,
          980.8429999999998
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 99,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "boolean",
            link: 336
          }
        ],
        outputs: [
          {
            name: "out",
            type: "boolean",
            links: [
              337
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
        id: 167,
        type: "basic/string",
        pos: [
          -2065.2999999999993,
          687.1000000000004
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 35,
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
        id: 169,
        type: "basic/CompareValues",
        pos: [
          -1941.7999999999997,
          643.2000000000004
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: false
        },
        order: 65,
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
              343
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
        id: 219,
        type: "basic/boolean",
        pos: [
          -1288.0000000000007,
          817.700000000001
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
            name: "bool",
            type: "boolean",
            links: [
              342
            ],
            slot_index: 0
          }
        ],
        title: "Const Boolean",
        properties: {
          value: false,
          tags: []
        }
      },
      {
        id: 222,
        type: "basic/boolean",
        pos: [
          -1302,
          691
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 37,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "bool",
            type: "boolean",
            links: [
              344
            ],
            slot_index: 0
          }
        ],
        title: "Const Boolean",
        properties: {
          value: 1,
          tags: []
        }
      },
      {
        id: 220,
        type: "actions/set_node_mode",
        pos: [
          -1232,
          668
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: false
        },
        order: 87,
        mode: 0,
        inputs: [
          {
            name: "enabled",
            type: "boolean",
            link: 344
          },
          {
            name: "set",
            type: -1,
            link: 347,
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
        id: 133,
        type: "math/operation",
        pos: [
          1242,
          214
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 113,
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
            link: 356
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
          A: 2.1,
          B: 1,
          OP: "*",
          tags: []
        }
      },
      {
        id: 129,
        type: "math/operation",
        pos: [
          1240,
          270
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 112,
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
            link: 357
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
          A: 2.1,
          B: 1,
          OP: "*",
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
        order: 108,
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
          images: null,
          index: 0,
          filenames: {},
          genNumber: 0,
          updateMode: "append"
        },
        saveUserState: false,
        widgets_values: []
      },
      {
        id: 118,
        type: "basic/watch",
        pos: [
          1093,
          665
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 109,
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
        id: 198,
        type: "actions/swap",
        pos: [
          -640,
          1113
        ],
        size: [
          140,
          66
        ],
        flags: {},
        order: 129,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "*",
            link: 313
          },
          {
            name: "B",
            type: "*",
            link: 316
          },
          {
            name: "swap",
            type: -1,
            link: 312,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "B",
            type: -2,
            links: [
              358
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "A",
            type: -2,
            links: [
              359
            ],
            shape: 1,
            slot_index: 1
          }
        ],
        title: "Comfy.SwapAction",
        properties: {
          tags: [
            "i2i",
            "i2iPixelSize"
          ]
        },
        saveUserState: true
      },
      {
        id: 195,
        type: "ui/slider",
        pos: [
          -481,
          1160
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 127,
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
            link: 358,
            shape: 1,
            slot_index: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              316,
              333
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
            "i2i",
            "i2iPixelSize"
          ],
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
        id: 196,
        type: "ui/slider",
        pos: [
          -482,
          1134
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 128,
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
            link: 359,
            shape: 1,
            slot_index: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              313,
              334
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
            "i2i",
            "i2iPixelSize"
          ],
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
        id: 210,
        type: "math/floor",
        pos: [
          -254,
          1130
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 75,
        mode: 2,
        inputs: [
          {
            name: "in",
            type: "number",
            link: 326
          }
        ],
        outputs: [
          {
            name: "out",
            type: "number",
            links: [
              325,
              331
            ],
            slot_index: 0
          }
        ],
        title: "Floor",
        properties: {
          tags: [
            "i2i",
            "i2iScaleSize"
          ]
        }
      },
      {
        id: 203,
        type: "ui/slider",
        pos: [
          -375,
          1149
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 38,
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
              320,
              321
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
            "i2i",
            "i2iScaleSize"
          ],
          defaultValue: 512,
          min: 0.1,
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
        id: 212,
        type: "utils/pick_first",
        pos: [
          -130,
          1013
        ],
        size: [
          210,
          122
        ],
        flags: {},
        order: 130,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "*",
            link: 331
          },
          {
            name: "B",
            type: "*",
            link: 334
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
              353
            ],
            slot_index: 0
          }
        ],
        title: "Comfy.PickFirst",
        properties: {
          tags: [],
          mode: "dataNonNull"
        },
        color: "#232",
        bgColor: "#353",
        saveUserState: true
      },
      {
        id: 213,
        type: "utils/pick_first",
        pos: [
          -129,
          1168
        ],
        size: [
          210,
          122
        ],
        flags: {},
        order: 131,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "*",
            link: 332
          },
          {
            name: "B",
            type: "*",
            link: 333
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
              354
            ],
            slot_index: 0
          }
        ],
        title: "Comfy.PickFirst",
        properties: {
          tags: [],
          mode: "dataNonNull"
        },
        color: "#232",
        bgColor: "#353",
        saveUserState: true
      },
      {
        id: 214,
        type: "ui/checkbox",
        pos: [
          -1087.988,
          982.2430000000006
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 98,
        mode: 2,
        inputs: [
          {
            name: "value",
            type: "boolean",
            link: null
          },
          {
            name: "store",
            type: -1,
            link: 352,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "boolean",
            links: [
              335,
              336
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: [
              338,
              339
            ],
            shape: 1,
            slot_index: 1
          }
        ],
        title: "UI.Checkbox",
        properties: {
          tags: [
            "i2i"
          ],
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
        id: 164,
        type: "actions/set_node_mode",
        pos: [
          -1225,
          524
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: false
        },
        order: 78,
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
        id: 109,
        type: "ui/button",
        pos: [
          1380,
          342
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
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              360
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
        id: 104,
        type: "ui/gallery",
        pos: [
          862.248693361997,
          640.4778575549986
        ],
        size: [
          210,
          142
        ],
        flags: {},
        order: 104,
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
          },
          {
            name: "width",
            type: "number",
            links: [
              356
            ],
            slot_index: 1
          },
          {
            name: "height",
            type: "number",
            links: [
              357
            ],
            slot_index: 2
          },
          {
            name: "any_selected",
            type: "boolean",
            links: [
              363
            ],
            slot_index: 3
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
        id: 231,
        type: "basic/string",
        pos: [
          1523,
          444
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 40,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              365
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "Select an image from the Result gallery to upscale first.",
          tags: []
        }
      },
      {
        id: 123,
        type: "basic/string",
        pos: [
          2021,
          249
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 41,
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
        id: 157,
        type: "SaveImage",
        pos: [
          377,
          241
        ],
        size: [
          220,
          46
        ],
        flags: {},
        order: 120,
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
            link: 310,
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
        id: 127,
        type: "actions/execute_subgraph",
        pos: [
          712,
          1076
        ],
        size: [
          226.79999999999998,
          78
        ],
        flags: {},
        order: 96,
        mode: 0,
        inputs: [
          {
            name: "execute",
            type: -1,
            link: 368,
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
          tags: [],
          targetTag: "txt2img",
          tag: "txt2img"
        },
        saveUserState: true
      },
      {
        id: 199,
        type: "ui/image_upload",
        pos: [
          -485,
          894
        ],
        size: [
          210,
          118
        ],
        flags: {},
        order: 42,
        mode: 2,
        inputs: [],
        outputs: [
          {
            name: "filename",
            type: "string",
            links: [
              317,
              372
            ],
            slot_index: 0
          },
          {
            name: "width",
            type: "number",
            links: [
              328
            ],
            slot_index: 1
          },
          {
            name: "height",
            type: "number",
            links: [
              329
            ],
            slot_index: 2
          },
          {
            name: "changed",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "UI.ImageUpload",
        properties: {
          defaultValue: null,
          tags: [
            "i2i"
          ],
          fileCount: "single"
        },
        widgets_values: [],
        color: "#223",
        bgColor: "#335",
        comfyValue: [],
        shownOutputProperties: {},
        saveUserState: false
      },
      {
        id: 238,
        type: "basic/string",
        pos: [
          184.80000000000013,
          1195.4999999999986
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 43,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              373
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "",
          tags: []
        }
      },
      {
        id: 237,
        type: "string/compare",
        pos: [
          239.80000000000004,
          1200.4999999999986
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 63,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "string",
            link: 372
          },
          {
            name: "B",
            type: "string",
            link: 373
          }
        ],
        outputs: [
          {
            name: "==",
            type: "boolean",
            links: [
              374
            ],
            slot_index: 0
          }
        ],
        title: "Compare",
        properties: {
          tags: []
        }
      },
      {
        id: 235,
        type: "basic/string",
        pos: [
          139.80000000000018,
          1150.4999999999986
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 44,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              369
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
        id: 236,
        type: "logic/AND",
        pos: [
          345.80000000000007,
          1176.4999999999986
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 77,
        mode: 0,
        inputs: [
          {
            name: "a",
            type: "boolean",
            link: 371
          },
          {
            name: "b",
            type: "boolean",
            link: 374
          }
        ],
        outputs: [
          {
            name: "out",
            type: "boolean",
            links: [
              375
            ],
            slot_index: 0
          }
        ],
        title: "AND",
        properties: {
          tags: []
        }
      },
      {
        id: 239,
        type: "logic/NOT",
        pos: [
          437.8,
          1172.4999999999986
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 86,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "boolean",
            link: 375
          }
        ],
        outputs: [
          {
            name: "out",
            type: "boolean",
            links: [
              376
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
        id: 126,
        type: "ui/button",
        pos: [
          396,
          1124
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 45,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              367
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
        id: 233,
        type: "events/branch",
        pos: [
          533,
          1099
        ],
        size: [
          140,
          46
        ],
        flags: {},
        order: 93,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 367,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 376
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              368
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "false",
            type: -2,
            links: [
              379
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
        id: 240,
        type: "actions/notify",
        pos: [
          750,
          1231
        ],
        size: [
          151.2,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 97,
        mode: 0,
        inputs: [
          {
            name: "message",
            type: "string",
            link: 378
          },
          {
            name: "trigger",
            type: -1,
            link: 379,
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
        id: 241,
        type: "basic/string",
        pos: [
          724,
          1198
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 46,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              378
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "Upload an image to be used with img2img first.",
          tags: []
        }
      },
      {
        id: 234,
        type: "string/compare",
        pos: [
          241,
          1153
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 66,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "string",
            link: 370
          },
          {
            name: "B",
            type: "string",
            link: 369
          }
        ],
        outputs: [
          {
            name: "==",
            type: "boolean",
            links: [
              371
            ],
            slot_index: 0
          }
        ],
        title: "Compare",
        properties: {
          tags: []
        }
      },
      {
        id: 163,
        type: "ui/radio",
        pos: [
          -1969,
          495
        ],
        size: [
          210,
          122
        ],
        flags: {
          collapsed: false
        },
        order: 47,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "value",
            type: "string",
            links: [
              251,
              252,
              370
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
        id: 174,
        type: "events/frame_delay",
        pos: [
          -1780,
          674
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: false
        },
        order: 68,
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
              381
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Frame Delay",
        properties: {
          timeInFrames: 3,
          tags: []
        }
      },
      {
        id: 218,
        type: "events/branch",
        pos: [
          -1633,
          668
        ],
        size: [
          140,
          46
        ],
        flags: {},
        order: 79,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 381,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 343
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              347
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "false",
            type: -2,
            links: [
              382
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
        id: 243,
        type: "events/sequence",
        pos: [
          -1452,
          761
        ],
        size: [
          210,
          98
        ],
        flags: {
          collapsed: true
        },
        order: 88,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 382,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: null,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: null,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "",
            type: -2,
            links: [
              383
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "",
            type: -2,
            links: [
              384
            ],
            shape: 1,
            slot_index: 1
          },
          {
            name: "",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Sequence",
        properties: {
          tags: []
        }
      },
      {
        id: 226,
        type: "basic/boolean",
        pos: [
          -1425.8069999999982,
          953.7649999999993
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 48,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "bool",
            type: "boolean",
            links: [
              350
            ],
            slot_index: 0
          }
        ],
        title: "Const Boolean",
        properties: {
          value: false,
          tags: []
        }
      },
      {
        id: 165,
        type: "actions/set_node_mode",
        pos: [
          -1211,
          797
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: false
        },
        order: 94,
        mode: 0,
        inputs: [
          {
            name: "enabled",
            type: "boolean",
            link: 342
          },
          {
            name: "set",
            type: -1,
            link: 383,
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
        order: 122,
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
        id: 215,
        type: "actions/set_node_mode",
        pos: [
          -862.66,
          921.2869999999992
        ],
        size: [
          210,
          78
        ],
        flags: {},
        order: 100,
        mode: 0,
        inputs: [
          {
            name: "enabled",
            type: "boolean",
            link: 335
          },
          {
            name: "set",
            type: -1,
            link: 338,
            shape: 1
          }
        ],
        outputs: [],
        title: "Comfy.SetNodeModeAction",
        properties: {
          targetTags: "i2iScaleSize",
          enable: false,
          tags: []
        },
        saveUserState: true
      },
      {
        id: 225,
        type: "actions/copy",
        pos: [
          -1340,
          934
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: false
        },
        order: 95,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "*",
            link: 350
          },
          {
            name: "copy",
            type: -1,
            link: 384,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              352
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.CopyAction",
        properties: {
          value: false,
          tags: []
        },
        saveUserState: true
      },
      {
        id: 217,
        type: "actions/set_node_mode",
        pos: [
          -864,
          1034
        ],
        size: [
          210,
          78
        ],
        flags: {},
        order: 101,
        mode: 0,
        inputs: [
          {
            name: "enabled",
            type: "boolean",
            link: 337
          },
          {
            name: "set",
            type: -1,
            link: 339,
            shape: 1
          }
        ],
        outputs: [],
        title: "Comfy.SetNodeModeAction",
        properties: {
          targetTags: "i2iPixelSize",
          enable: false,
          tags: []
        },
        saveUserState: true
      },
      {
        id: 230,
        type: "actions/notify",
        pos: [
          1543,
          481
        ],
        size: [
          151.2,
          46
        ],
        flags: {},
        order: 133,
        mode: 0,
        inputs: [
          {
            name: "message",
            type: "string",
            link: 365
          },
          {
            name: "trigger",
            type: -1,
            link: 364,
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
        id: 228,
        type: "events/branch",
        pos: [
          1307,
          480
        ],
        size: [
          140,
          46
        ],
        flags: {},
        order: 132,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 360,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 363
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              361
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "false",
            type: -2,
            links: [
              364
            ],
            shape: 1
          }
        ],
        title: "Branch",
        properties: {
          tags: []
        }
      },
      {
        id: 110,
        type: "actions/execute_subgraph",
        pos: [
          1558,
          313
        ],
        size: [
          226.79999999999998,
          78
        ],
        flags: {},
        order: 106,
        mode: 0,
        inputs: [
          {
            name: "execute",
            type: -1,
            link: 361,
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
          tags: [],
          targetTag: "hr",
          tag: "hr"
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
        245,
        40,
        0,
        157,
        0,
        "IMAGE"
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
      ],
      [
        308,
        45,
        0,
        193,
        0,
        "*"
      ],
      [
        309,
        194,
        0,
        193,
        1,
        "*"
      ],
      [
        310,
        193,
        0,
        157,
        1,
        "string"
      ],
      [
        311,
        193,
        0,
        159,
        1,
        "string"
      ],
      [
        312,
        197,
        0,
        198,
        2,
        -1
      ],
      [
        313,
        196,
        0,
        198,
        0,
        "*"
      ],
      [
        316,
        195,
        0,
        198,
        1,
        "*"
      ],
      [
        317,
        199,
        0,
        161,
        0,
        "string"
      ],
      [
        320,
        203,
        0,
        204,
        0,
        "number,array,object"
      ],
      [
        321,
        203,
        0,
        205,
        0,
        "number,array,object"
      ],
      [
        322,
        209,
        0,
        206,
        0,
        "string"
      ],
      [
        323,
        208,
        0,
        207,
        0,
        "string"
      ],
      [
        324,
        211,
        0,
        208,
        0,
        "number"
      ],
      [
        325,
        210,
        0,
        209,
        0,
        "number"
      ],
      [
        326,
        205,
        0,
        210,
        0,
        "number"
      ],
      [
        327,
        204,
        0,
        211,
        0,
        "number"
      ],
      [
        328,
        199,
        1,
        205,
        1,
        "number"
      ],
      [
        329,
        199,
        2,
        204,
        1,
        "number"
      ],
      [
        331,
        210,
        0,
        212,
        0,
        "*"
      ],
      [
        332,
        211,
        0,
        213,
        0,
        "*"
      ],
      [
        333,
        195,
        0,
        213,
        1,
        "*"
      ],
      [
        334,
        196,
        0,
        212,
        1,
        "*"
      ],
      [
        335,
        214,
        0,
        215,
        0,
        "boolean"
      ],
      [
        336,
        214,
        0,
        216,
        0,
        "boolean"
      ],
      [
        337,
        216,
        0,
        217,
        0,
        "boolean"
      ],
      [
        338,
        214,
        1,
        215,
        1,
        -1
      ],
      [
        339,
        214,
        1,
        217,
        1,
        -1
      ],
      [
        342,
        219,
        0,
        165,
        0,
        "boolean"
      ],
      [
        343,
        169,
        0,
        218,
        1,
        "boolean"
      ],
      [
        344,
        222,
        0,
        220,
        0,
        "boolean"
      ],
      [
        347,
        218,
        0,
        220,
        1,
        -1
      ],
      [
        350,
        226,
        0,
        225,
        0,
        "*"
      ],
      [
        352,
        225,
        0,
        214,
        1,
        -1
      ],
      [
        353,
        212,
        0,
        182,
        2,
        "number"
      ],
      [
        354,
        213,
        0,
        182,
        3,
        "number"
      ],
      [
        356,
        104,
        1,
        133,
        1,
        "number"
      ],
      [
        357,
        104,
        2,
        129,
        1,
        "number"
      ],
      [
        358,
        198,
        0,
        195,
        1,
        -1
      ],
      [
        359,
        198,
        1,
        196,
        1,
        -1
      ],
      [
        360,
        109,
        0,
        228,
        0,
        -1
      ],
      [
        361,
        228,
        0,
        110,
        0,
        -1
      ],
      [
        363,
        104,
        3,
        228,
        1,
        "boolean"
      ],
      [
        364,
        228,
        1,
        230,
        1,
        -1
      ],
      [
        365,
        231,
        0,
        230,
        0,
        "string"
      ],
      [
        367,
        126,
        0,
        233,
        0,
        -1
      ],
      [
        368,
        233,
        0,
        127,
        0,
        -1
      ],
      [
        369,
        235,
        0,
        234,
        1,
        "string"
      ],
      [
        370,
        163,
        0,
        234,
        0,
        "string"
      ],
      [
        371,
        234,
        0,
        236,
        0,
        "boolean"
      ],
      [
        372,
        199,
        0,
        237,
        0,
        "string"
      ],
      [
        373,
        238,
        0,
        237,
        1,
        "string"
      ],
      [
        374,
        237,
        0,
        236,
        1,
        "boolean"
      ],
      [
        375,
        236,
        0,
        239,
        0,
        "boolean"
      ],
      [
        376,
        239,
        0,
        233,
        1,
        "boolean"
      ],
      [
        378,
        241,
        0,
        240,
        0,
        "string"
      ],
      [
        379,
        233,
        1,
        240,
        1,
        -1
      ],
      [
        381,
        174,
        0,
        218,
        0,
        -1
      ],
      [
        382,
        218,
        1,
        243,
        0,
        -1
      ],
      [
        383,
        243,
        0,
        165,
        1,
        -1
      ],
      [
        384,
        243,
        1,
        225,
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            title: "Seed",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            title: "Steps",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            title: "CFG Scale",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            title: "Denoise",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "hidden",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            title: "Width",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            title: "Height",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            title: "Batch Size",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
            showTitle: true,
            blockVariant: "block"
          }
        },
        children: [
          "129",
          "47",
          "122",
          "111",
          "127",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            title: "Seed Action",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            classes: "testClas",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "flex-grow: 1;",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "secondary",
            buttonSize: "large",
            tags: [],
            flexGrow: 1,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [
              "t2i"
            ],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "block",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            title: "Scale By",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "block",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            title: "Steps",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "block",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto",
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
            classes: "",
            style: "flex-grow: 1;",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "secondary",
            buttonSize: "small",
            tags: [],
            flexGrow: 1,
            height: "auto"
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto"
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "block",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto"
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "hidden",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto"
          }
        },
        children: [
          "76",
          "73",
          "94"
        ],
        parent: "2"
      },
      102: {
        dragItem: {
          type: "widget",
          id: "102",
          nodeId: 163,
          attrs: {
            title: "",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto"
          }
        },
        children: [],
        parent: "129"
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
            classes: "",
            style: "",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto"
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto"
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto"
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto"
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto"
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [
              "i2i"
            ],
            flexGrow: 100,
            height: "auto"
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: true,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [
              "i2i"
            ],
            flexGrow: 100,
            height: "auto"
          }
        },
        children: [
          "117",
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto"
          }
        },
        children: [
          "32",
          "114"
        ],
        parent: "33"
      },
      114: {
        dragItem: {
          type: "widget",
          id: "114",
          nodeId: 190,
          attrs: {
            title: "Denoise",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto"
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
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [],
            flexGrow: 100,
            height: "auto"
          }
        },
        children: [
          "51",
          "103"
        ],
        parent: "104"
      },
      117: {
        dragItem: {
          type: "container",
          id: "117",
          attrs: {
            title: "",
            hidden: true,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "",
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
          "121"
        ],
        parent: "109"
      },
      118: {
        dragItem: {
          type: "widget",
          id: "118",
          nodeId: 195,
          attrs: {
            title: "Height",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "",
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
        parent: "122"
      },
      119: {
        dragItem: {
          type: "widget",
          id: "119",
          nodeId: 196,
          attrs: {
            title: "Width",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "",
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
        parent: "122"
      },
      120: {
        dragItem: {
          type: "widget",
          id: "120",
          nodeId: 197,
          attrs: {
            title: "⮀",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "flex-grow: 1;",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "secondary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [],
        parent: "122"
      },
      121: {
        dragItem: {
          type: "widget",
          id: "121",
          nodeId: 199,
          attrs: {
            title: "Image",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "",
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
        parent: "117"
      },
      122: {
        dragItem: {
          type: "container",
          id: "122",
          attrs: {
            title: "",
            hidden: true,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [
              "i2i"
            ]
          }
        },
        children: [
          "119",
          "120",
          "118",
          "124"
        ],
        parent: "33"
      },
      124: {
        dragItem: {
          type: "widget",
          id: "124",
          nodeId: 203,
          attrs: {
            title: "Scale By",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "",
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
        parent: "122"
      },
      125: {
        dragItem: {
          type: "widget",
          id: "125",
          nodeId: 206,
          attrs: {
            title: "Height",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "",
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
        parent: "127"
      },
      126: {
        dragItem: {
          type: "widget",
          id: "126",
          nodeId: 207,
          attrs: {
            title: "Width",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "",
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
        parent: "127"
      },
      127: {
        dragItem: {
          type: "container",
          id: "127",
          attrs: {
            title: "",
            hidden: true,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [
              "i2i",
              "i2iScaleSize"
            ]
          }
        },
        children: [
          "126",
          "125"
        ],
        parent: "33"
      },
      128: {
        dragItem: {
          type: "widget",
          id: "128",
          nodeId: 214,
          attrs: {
            title: "Scale Image Size",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "",
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
        parent: "129"
      },
      129: {
        dragItem: {
          type: "container",
          id: "129",
          attrs: {
            title: "",
            hidden: false,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [
          "102",
          "128"
        ],
        parent: "33"
      }
    },
    currentId: 130,
    attrs: {
      defaultSubgraph: "txt2img"
    }
  },
  canvas: {
    offset: [
      949.2317346499664,
      180.17640279910015
    ],
    scale: 0.7513148009015782
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
