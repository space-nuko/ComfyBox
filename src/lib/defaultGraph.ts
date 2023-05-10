import type SerializedAppState from "./ComfyApp"

const defaultGraph: SerializedAppState = {
  createdBy: "ComfyBox",
  version: 1,
  workflow: {
    last_node_id: 434,
    last_link_id: 664,
    nodes: [
      {
        id: 35,
        type: "ui/text",
        pos: [
          -329.97997539843374,
          205.60113939843882
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
          -252.5788065384366,
          -9.863136000804298
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
        order: 5,
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
          -538.8660048828136,
          277.58201159667937
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 226,
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
          -1110.4490048828125,
          353.09501159667974
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
        order: 137,
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
          -606.7380048828129,
          412.64501159668004
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 10,
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
          -699.5490048828129,
          252.79901159667983
        ],
        size: [
          140,
          66
        ],
        flags: {},
        order: 225,
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
          -1158.2600048828126,
          386.7570115966796
        ],
        size: [
          142.79999999999998,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 12,
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
          -525.2600048828125,
          411.68001159667966
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 75,
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
          -816.2600048828125,
          273.68001159667966
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 72,
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
          -946.2600048828125,
          274.68001159667966
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
        order: 148,
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
        order: 146,
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
        order: 149,
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
        order: 147,
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
        order: 150,
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
        order: 151,
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
        order: 15,
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
        order: 73,
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
          -1182.3021221452946,
          -604.6813949850745
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
        order: 17,
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
        order: 18,
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
          "true"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: true,
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
          -411.6,
          -256.41999999999996
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
        id: 181,
        type: "logic/NOT",
        pos: [
          -207.7999999999998,
          -408.1200000000003
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 84,
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
        order: 21,
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
        order: 22,
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
        order: 192,
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
        order: 231,
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
        order: 232,
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
        order: 139,
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
        order: 134,
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
        order: 219,
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
        order: 74,
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
        order: 100,
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
        order: 23,
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
        order: 24,
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
          step: 0.01,
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
        order: 101,
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
          -281.59999999999997,
          -280.4200000000002
        ],
        size: [
          140,
          26
        ],
        flags: {},
        order: 76,
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
        order: 99,
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
        order: 114,
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
        id: 56,
        type: "utils/value_control",
        pos: [
          -982.2600048828125,
          342.68001159667966
        ],
        size: [
          151.2,
          126
        ],
        flags: {},
        order: 224,
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
          value: 1050766615654456,
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
          -721.2600048828125,
          420.68001159667966
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 155,
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
        order: 94,
        mode: 2,
        inputs: [
          {
            name: "image",
            type: "string",
            link: 628,
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
        order: 77,
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
        order: 157,
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
        order: 78,
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
        order: 26,
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
        order: 27,
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
        order: 158,
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
        order: 28,
        mode: 2,
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
        order: 208,
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
        order: 156,
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
        order: 199,
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
        order: 125,
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
        order: 126,
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
        order: 118,
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
        order: 119,
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
        order: 110,
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
        order: 145,
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
          A: 2,
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
        order: 144,
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
          A: 2,
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
        order: 140,
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
            link: 658,
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
        order: 141,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: 0,
            link: 184,
            label: "11.000"
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
        order: 161,
        mode: 2,
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
        order: 159,
        mode: 2,
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
        order: 160,
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
        order: 109,
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
        order: 29,
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
        order: 162,
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
        order: 163,
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
        order: 30,
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
        order: 31,
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
        order: 108,
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
        order: 117,
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
        order: 32,
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
        order: 79,
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
        order: 154,
        mode: 0,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 601,
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
            link: 664,
            color_off: "orange",
            color_on: "orange",
            config: {}
          },
          {
            name: "negative",
            type: "CONDITIONING",
            link: 663,
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
        order: 164,
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
              361,
              443
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
        order: 138,
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
      },
      {
        id: 263,
        type: "basic/boolean",
        pos: [
          -1144.9562904132222,
          1007.88950710744
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 33,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "bool",
            type: "boolean",
            links: [
              404
            ],
            slot_index: 0
          }
        ],
        title: "Const Boolean",
        properties: {
          value: true,
          tags: []
        }
      },
      {
        id: 261,
        type: "actions/set_node_mode_advanced",
        pos: [
          -1059.69074,
          1283.15526
        ],
        size: [
          260.4,
          102
        ],
        flags: {},
        order: 128,
        mode: 0,
        inputs: [
          {
            name: "enabled",
            type: "boolean",
            link: null
          },
          {
            name: "set",
            type: -1,
            link: 409,
            shape: 1
          }
        ],
        outputs: [],
        title: "Comfy.SetNodeModeAdvancedAction",
        properties: {
          targetTags: [
            {
              tag: "i2iScaleSize",
              enable: false
            },
            {
              tag: "i2iPixelSize",
              enable: true
            }
          ],
          enable: true,
          tags: []
        },
        boxcolor: "#666",
        saveUserState: true
      },
      {
        id: 163,
        type: "ui/radio",
        pos: [
          -2080.056843593749,
          467.44071808593736
        ],
        size: [
          210,
          122
        ],
        flags: {
          collapsed: false
        },
        order: 34,
        mode: 0,
        inputs: [
          {
            name: "value",
            type: "string,number",
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
              370,
              432
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
              398,
              400,
              434
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
        id: 78,
        type: "basic/string",
        pos: [
          668,
          635
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
              104
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "Generation finished!",
          tags: []
        }
      },
      {
        id: 277,
        type: "string/template",
        pos: [
          -1845.056843593749,
          466.44071808593736
        ],
        size: [
          210,
          98
        ],
        flags: {},
        order: 82,
        mode: 0,
        inputs: [
          {
            name: "",
            type: "string,array",
            link: 432
          },
          {
            name: "",
            type: "string",
            link: null
          },
          {
            name: "update",
            type: -1,
            link: 434,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "out",
            type: "string",
            links: [
              431
            ],
            slot_index: 0
          }
        ],
        title: "Template",
        properties: {
          template: "Queue $1",
          stringQuote: "",
          tags: []
        }
      },
      {
        id: 276,
        type: "events/trigger",
        pos: [
          -1618.056843593749,
          471.44071808593736
        ],
        size: [
          140,
          66
        ],
        flags: {},
        order: 105,
        mode: 0,
        inputs: [
          {
            name: "if",
            type: "",
            link: 431
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
            name: "change",
            type: -2,
            links: [
              433
            ],
            shape: 1,
            slot_index: 1
          },
          {
            name: "false",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Trigger Event",
        properties: {
          onlyOnChange: true,
          tags: []
        }
      },
      {
        id: 246,
        type: "events/filter",
        pos: [
          -2087.056843593749,
          632.4407180859373
        ],
        size: [
          210,
          150
        ],
        flags: {},
        order: 80,
        mode: 0,
        inputs: [
          {
            name: "event",
            type: -1,
            link: 398,
            shape: 1
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
              402
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "reject",
            type: -2,
            links: [],
            shape: 1,
            slot_index: 1
          }
        ],
        title: "Filter Event",
        properties: {
          compareValue: "txt2img",
          propertyName: "",
          mode: "param",
          operation: "==",
          tags: []
        }
      },
      {
        id: 256,
        type: "events/filter",
        pos: [
          -2080.056843593749,
          806.4407180859373
        ],
        size: [
          210,
          150
        ],
        flags: {
          collapsed: false
        },
        order: 81,
        mode: 0,
        inputs: [
          {
            name: "event",
            type: -1,
            link: 400,
            shape: 1
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
              401,
              403
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
          compareValue: "img2img",
          propertyName: "",
          mode: "param",
          operation: "==",
          tags: []
        }
      },
      {
        id: 258,
        type: "actions/set_node_mode_advanced",
        pos: [
          -1778.056843593749,
          609.4407180859373
        ],
        size: [
          260.4,
          102
        ],
        flags: {},
        order: 102,
        mode: 0,
        inputs: [
          {
            name: "enabled",
            type: "boolean",
            link: null
          },
          {
            name: "set",
            type: -1,
            link: 402,
            shape: 1
          }
        ],
        outputs: [],
        title: "Comfy.SetNodeModeAdvancedAction",
        properties: {
          targetTags: [
            {
              tag: "t2i",
              enable: true
            },
            {
              tag: "i2i",
              enable: false
            }
          ],
          enable: true,
          tags: []
        },
        boxcolor: "#666",
        saveUserState: true
      },
      {
        id: 259,
        type: "actions/set_node_mode_advanced",
        pos: [
          -1797.056843593749,
          794.4407180859373
        ],
        size: [
          260.4,
          102
        ],
        flags: {},
        order: 104,
        mode: 0,
        inputs: [
          {
            name: "enabled",
            type: "boolean",
            link: null
          },
          {
            name: "set",
            type: -1,
            link: 403,
            shape: 1
          }
        ],
        outputs: [],
        title: "Comfy.SetNodeModeAdvancedAction",
        properties: {
          targetTags: [
            {
              tag: "i2i",
              enable: true
            },
            {
              tag: "t2i",
              enable: false
            },
            {
              tag: "i2iPixelSize",
              enable: true
            },
            {
              tag: "i2iScaleSize",
              enable: false
            }
          ],
          enable: true,
          tags: []
        },
        boxcolor: "#666",
        saveUserState: true
      },
      {
        id: 252,
        type: "basic/json",
        pos: [
          -1859.8217735937492,
          1022.4599680859374
        ],
        size: [
          210,
          86
        ],
        flags: {
          collapsed: true
        },
        order: 36,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "data",
            type: "object",
            links: [
              387
            ],
            shape: 0,
            slot_index: 0
          }
        ],
        title: "Const JSON",
        properties: {
          json: "{ \u000balue: false, \noChangedEvent: true }",
          value: "null",
          type: "object",
          tags: []
        },
        boxcolor: "#AEA"
      },
      {
        id: 260,
        type: "actions/set_node_mode_advanced",
        pos: [
          -1058.6012399999997,
          1148.6630599999996
        ],
        size: [
          260.4,
          102
        ],
        flags: {},
        order: 127,
        mode: 0,
        inputs: [
          {
            name: "enabled",
            type: "boolean",
            link: null
          },
          {
            name: "set",
            type: -1,
            link: 408,
            shape: 1
          }
        ],
        outputs: [],
        title: "Comfy.SetNodeModeAdvancedAction",
        properties: {
          targetTags: [
            {
              tag: "i2iScaleSize",
              enable: true
            },
            {
              tag: "i2iPixelSize",
              enable: false
            }
          ],
          enable: true,
          tags: []
        },
        boxcolor: "#666",
        saveUserState: true
      },
      {
        id: 262,
        type: "events/filter",
        pos: [
          -1071,
          965
        ],
        size: [
          210,
          150
        ],
        flags: {
          collapsed: false
        },
        order: 123,
        mode: 0,
        inputs: [
          {
            name: "event",
            type: -1,
            link: 407,
            shape: 1
          },
          {
            name: "compare_value",
            type: "*",
            link: 404
          }
        ],
        outputs: [
          {
            name: "accept",
            type: -2,
            links: [
              408
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "reject",
            type: -2,
            links: [
              409
            ],
            shape: 1,
            slot_index: 1
          }
        ],
        title: "Filter Event",
        properties: {
          compareValue: true,
          propertyName: "",
          mode: "param",
          operation: "==",
          tags: []
        }
      },
      {
        id: 272,
        type: "workflow/configure_queue_prompt_button",
        pos: [
          -1681.7597994531247,
          402.4011205078125
        ],
        size: [
          268.8,
          26
        ],
        flags: {
          collapsed: false
        },
        order: 116,
        mode: 0,
        inputs: [
          {
            name: "config",
            type: -1,
            link: 433,
            shape: 1
          }
        ],
        outputs: [],
        title: "Comfy.ConfigureQueuePromptButton",
        properties: {
          tags: []
        }
      },
      {
        id: 251,
        type: "events/trigger_new_event",
        pos: [
          -1726.36279296875,
          981.864013671875
        ],
        size: [
          210,
          78
        ],
        flags: {},
        order: 103,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 401,
            shape: 1
          },
          {
            name: "param",
            type: "*",
            link: 387
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              436
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.TriggerNewEvent",
        properties: {
          param: {
            value: false,
            noChangedEvent: true
          },
          tags: []
        }
      },
      {
        id: 214,
        type: "ui/checkbox",
        pos: [
          -1362,
          949
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: false
        },
        order: 115,
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
            link: 436,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "boolean",
            links: [],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: [
              407
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
          "false"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: false,
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 273,
        type: "actions/queue_events",
        pos: [
          199,
          1046
        ],
        size: [
          178,
          66
        ],
        flags: {},
        order: 37,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "beforeQueued",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "afterQueued",
            type: -2,
            links: null,
            shape: 1
          },
          {
            name: "onDefaultQueueAction",
            type: -2,
            links: [
              438
            ],
            shape: 1,
            slot_index: 2
          }
        ],
        title: "Comfy.QueueEvents",
        properties: {
          tags: []
        },
        saveUserState: true
      },
      {
        id: 126,
        type: "ui/button",
        pos: [
          354,
          1139
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 38,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              437
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
        id: 278,
        type: "events/sequence",
        pos: [
          422,
          1106
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 83,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 437,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 438,
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
              439
            ],
            shape: 1,
            slot_index: 0
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
        order: 130,
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
          tags: [],
          message: "Nya.",
          type: "error"
        },
        saveUserState: true
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
        order: 39,
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
        id: 122,
        type: "actions/notify",
        pos: [
          2021,
          279
        ],
        size: [
          151.2,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 143,
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
          tags: [],
          message: "Nya.",
          type: "success"
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
        order: 227,
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
            link: 435,
            shape: 1,
            slot_index: 1
          }
        ],
        outputs: [],
        title: "Comfy.NotifyAction",
        properties: {
          tags: [],
          message: "Nya.",
          type: "success"
        },
        saveUserState: true
      },
      {
        id: 281,
        type: "actions/notify",
        pos: [
          1509,
          505
        ],
        size: [
          151.2,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 166,
        mode: 0,
        inputs: [
          {
            name: "message",
            type: "string",
            link: 442
          },
          {
            name: "trigger",
            type: -1,
            link: 443,
            shape: 1,
            slot_index: 1
          }
        ],
        outputs: [],
        title: "Comfy.NotifyAction",
        properties: {
          tags: [],
          message: "Nya.",
          type: "info"
        },
        saveUserState: true
      },
      {
        id: 230,
        type: "actions/notify",
        pos: [
          1689,
          524
        ],
        size: [
          151.2,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 165,
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
          tags: [],
          message: "Nya.",
          type: "error"
        },
        saveUserState: true
      },
      {
        id: 231,
        type: "basic/string",
        pos: [
          1674,
          486
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
        id: 280,
        type: "basic/string",
        pos: [
          1525.9631480090163,
          855.4472802404205
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
              440
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "Prompt queued.",
          tags: []
        }
      },
      {
        id: 282,
        type: "basic/string",
        pos: [
          1514,
          475
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 42,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              442
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "Upscale queued.",
          tags: []
        }
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
        order: 153,
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
              241,
              444
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
        id: 283,
        type: "actions/play_sound",
        pos: [
          2379,
          257
        ],
        size: [
          176.4,
          46
        ],
        flags: {},
        order: 167,
        mode: 0,
        inputs: [
          {
            name: "sound",
            type: "string",
            link: null
          },
          {
            name: "trigger",
            type: -1,
            link: 444,
            shape: 1
          }
        ],
        outputs: [],
        title: "Comfy.PlaySoundAction",
        properties: {
          tags: [],
          sound: "notification.mp3"
        },
        saveUserState: true
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
        order: 152,
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
              243,
              435,
              445
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
        id: 284,
        type: "actions/play_sound",
        pos: [
          652,
          534
        ],
        size: [
          176.4,
          46
        ],
        flags: {},
        order: 168,
        mode: 0,
        inputs: [
          {
            name: "sound",
            type: "string",
            link: null
          },
          {
            name: "trigger",
            type: -1,
            link: 445,
            shape: 1
          }
        ],
        outputs: [],
        title: "Comfy.PlaySoundAction",
        properties: {
          tags: [],
          sound: "notification.mp3"
        },
        saveUserState: true
      },
      {
        id: 179,
        type: "ui/checkbox",
        pos: [
          -348.19999999999993,
          -384.92000000000013
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 43,
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
          "null"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: false,
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 80,
        type: "ui/combo",
        pos: [
          -852.9751221452975,
          -565.4453949850752
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
        id: 150,
        type: "ui/button",
        pos: [
          -1236.265122145295,
          -579.6653949850739
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
        id: 81,
        type: "ui/slider",
        pos: [
          -835.41064453125,
          -547.365478515625
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 229,
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
            link: 494,
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
            links: [
              496
            ],
            shape: 1,
            slot_index: 1
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
          min: -1,
          max: 2,
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
          -838.41064453125,
          -526.365478515625
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 230,
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
            link: 489,
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
            links: [
              490
            ],
            shape: 1,
            slot_index: 1
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
          min: -1,
          max: 2,
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
        id: 318,
        type: "events/sequence",
        pos: [
          -964.41064453125,
          -546.365478515625
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 172,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 492,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 493,
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
              494
            ],
            shape: 1,
            slot_index: 0
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
        id: 316,
        type: "events/sequence",
        pos: [
          -962.41064453125,
          -519.365478515625
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 170,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 488,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 498,
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
              489
            ],
            shape: 1,
            slot_index: 0
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
        id: 319,
        type: "events/branch",
        pos: [
          -1267.4606445312504,
          -512.8354785156248
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 173,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 496,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 495
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              497
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "false",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Branch",
        properties: {
          tags: []
        }
      },
      {
        id: 315,
        type: "events/branch",
        pos: [
          -1266.41064453125,
          -540.365478515625
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 169,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 490,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 487
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              491
            ],
            shape: 1
          },
          {
            name: "false",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Branch",
        properties: {
          tags: []
        }
      },
      {
        id: 317,
        type: "events/no_change",
        pos: [
          -1157.41064453125,
          -545.365478515625
        ],
        size: [
          159.6,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 171,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 491,
            shape: 1,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              493
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.NoChangeEvent",
        properties: {
          tags: []
        },
        saveUserState: true
      },
      {
        id: 151,
        type: "actions/copy",
        pos: [
          -1116.41064453125,
          -594.365478515625
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 85,
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
              488,
              492
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
        id: 320,
        type: "events/no_change",
        pos: [
          -1155.41064453125,
          -520.365478515625
        ],
        size: [
          159.6,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 175,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 497,
            shape: 1,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              498
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.NoChangeEvent",
        properties: {
          tags: []
        },
        saveUserState: true
      },
      {
        id: 336,
        type: "ui/combo",
        pos: [
          -854.0548037537221,
          -421.2182846433528
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 46,
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
              503
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
        id: 337,
        type: "ui/slider",
        pos: [
          -836.4903261396746,
          -403.1383681739026
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 177,
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
            link: 506,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              504
            ]
          },
          {
            name: "changed",
            type: -2,
            links: [
              517
            ],
            shape: 1,
            slot_index: 1
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
          min: -1,
          max: 2,
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
        id: 338,
        type: "ui/slider",
        pos: [
          -839.4903261396746,
          -382.13836817390256
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 178,
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
            link: 507,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              505
            ]
          },
          {
            name: "changed",
            type: -2,
            links: [
              510
            ],
            shape: 1,
            slot_index: 1
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
          min: -1,
          max: 2,
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
        id: 339,
        type: "ui/button",
        pos: [
          -1237.3448037537198,
          -435.43828464335155
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
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              509
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
        id: 340,
        type: "actions/copy",
        pos: [
          -1117.490326139675,
          -450.1383681739026
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
            name: "in",
            type: "*",
            link: 508
          },
          {
            name: "copy",
            type: -1,
            link: 509,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              512,
              515
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
        id: 341,
        type: "basic/integer",
        pos: [
          -1183.3818037537194,
          -460.4542846433521
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
            name: "value",
            type: "number",
            links: [
              508
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
        id: 344,
        type: "events/sequence",
        pos: [
          -963.4903261396746,
          -375.13836817390256
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 181,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 512,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 513,
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
              507
            ],
            shape: 1,
            slot_index: 0
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
        id: 345,
        type: "events/no_change",
        pos: [
          -1158.4903261396748,
          -401.1383681739026
        ],
        size: [
          159.6,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 182,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 514,
            shape: 1,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              516
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.NoChangeEvent",
        properties: {
          tags: []
        },
        saveUserState: true
      },
      {
        id: 346,
        type: "events/sequence",
        pos: [
          -965.4903261396746,
          -402.1383681739026
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 183,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 515,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 516,
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
              506
            ],
            shape: 1,
            slot_index: 0
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
        id: 348,
        type: "events/no_change",
        pos: [
          -1156.4903261396748,
          -376.13836817390256
        ],
        size: [
          159.6,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 185,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 519,
            shape: 1,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              513
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.NoChangeEvent",
        properties: {
          tags: []
        },
        saveUserState: true
      },
      {
        id: 350,
        type: "ui/combo",
        pos: [
          -858.134485362147,
          -281.0255907710794
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
              520
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
        id: 351,
        type: "ui/slider",
        pos: [
          -840.5700077480994,
          -262.9456743016291
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 187,
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
            link: 523,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              521
            ]
          },
          {
            name: "changed",
            type: -2,
            links: [
              534
            ],
            shape: 1,
            slot_index: 1
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
          min: -1,
          max: 2,
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
        id: 352,
        type: "ui/slider",
        pos: [
          -843.5700077480994,
          -241.94567430162894
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 188,
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
            link: 524,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              522
            ]
          },
          {
            name: "changed",
            type: -2,
            links: [
              527
            ],
            shape: 1,
            slot_index: 1
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
          min: -1,
          max: 2,
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
        id: 353,
        type: "ui/button",
        pos: [
          -1241.424485362144,
          -295.2455907710783
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 50,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              526
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
        id: 354,
        type: "actions/copy",
        pos: [
          -1121.5700077480994,
          -309.94567430162937
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
            name: "in",
            type: "*",
            link: 525
          },
          {
            name: "copy",
            type: -1,
            link: 526,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              529,
              532
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
        id: 355,
        type: "basic/integer",
        pos: [
          -1187.4614853621438,
          -320.26159077107883
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 51,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              525
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
        id: 358,
        type: "events/sequence",
        pos: [
          -967.5700077480994,
          -234.94567430162894
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 190,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 529,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 530,
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
              524
            ],
            shape: 1,
            slot_index: 0
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
        id: 359,
        type: "events/no_change",
        pos: [
          -1162.5700077480992,
          -260.945674301629
        ],
        size: [
          159.6,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 191,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 531,
            shape: 1,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              533
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.NoChangeEvent",
        properties: {
          tags: []
        },
        saveUserState: true
      },
      {
        id: 360,
        type: "events/sequence",
        pos: [
          -969.5700077480994,
          -261.9456743016291
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 193,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 532,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 533,
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
              523
            ],
            shape: 1,
            slot_index: 0
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
        id: 362,
        type: "events/no_change",
        pos: [
          -1160.5700077480992,
          -235.94567430162894
        ],
        size: [
          159.6,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 195,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 536,
            shape: 1,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              530
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.NoChangeEvent",
        properties: {
          tags: []
        },
        saveUserState: true
      },
      {
        id: 364,
        type: "ui/combo",
        pos: [
          -866.9344853621461,
          -143.5255907710794
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 52,
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
              537
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
        id: 365,
        type: "ui/slider",
        pos: [
          -849.3700077480986,
          -125.44567430162923
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 197,
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
            link: 540,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              538
            ]
          },
          {
            name: "changed",
            type: -2,
            links: [
              551
            ],
            shape: 1,
            slot_index: 1
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
          min: -1,
          max: 2,
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
        id: 366,
        type: "ui/slider",
        pos: [
          -852.3700077480986,
          -104.44567430162917
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 198,
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
            link: 541,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              539
            ]
          },
          {
            name: "changed",
            type: -2,
            links: [
              544
            ],
            shape: 1,
            slot_index: 1
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
          min: -1,
          max: 2,
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
        id: 367,
        type: "ui/button",
        pos: [
          -1250.2244853621448,
          -157.74559077107818
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
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              543
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
        id: 368,
        type: "actions/copy",
        pos: [
          -1130.3700077481,
          -172.44567430162925
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 88,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "*",
            link: 542
          },
          {
            name: "copy",
            type: -1,
            link: 543,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              546,
              549
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
        id: 369,
        type: "basic/integer",
        pos: [
          -1196.2614853621444,
          -182.76159077107872
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 54,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              542
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
        id: 372,
        type: "events/sequence",
        pos: [
          -976.3700077480986,
          -97.44567430162918
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 201,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 546,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 547,
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
              541
            ],
            shape: 1,
            slot_index: 0
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
        id: 373,
        type: "events/no_change",
        pos: [
          -1171.3700077480999,
          -123.44567430162923
        ],
        size: [
          159.6,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 202,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 548,
            shape: 1,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              550
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.NoChangeEvent",
        properties: {
          tags: []
        },
        saveUserState: true
      },
      {
        id: 374,
        type: "events/sequence",
        pos: [
          -978.3700077480986,
          -124.44567430162923
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 203,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 549,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 550,
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
              540
            ],
            shape: 1,
            slot_index: 0
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
        id: 376,
        type: "events/no_change",
        pos: [
          -1169.3700077480999,
          -98.44567430162918
        ],
        size: [
          159.6,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 205,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 553,
            shape: 1,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              547
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.NoChangeEvent",
        properties: {
          tags: []
        },
        saveUserState: true
      },
      {
        id: 378,
        type: "ui/combo",
        pos: [
          -870.2344853621465,
          -0.5255907710793659
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 55,
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
              554
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
        id: 379,
        type: "ui/slider",
        pos: [
          -852.670007748099,
          17.554325698370793
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 207,
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
            link: 557,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              555
            ]
          },
          {
            name: "changed",
            type: -2,
            links: [
              568
            ],
            shape: 1,
            slot_index: 1
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
          min: -1,
          max: 2,
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
        id: 380,
        type: "ui/slider",
        pos: [
          -855.670007748099,
          38.55432569837085
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 209,
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
            link: 558,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              556
            ]
          },
          {
            name: "changed",
            type: -2,
            links: [
              561
            ],
            shape: 1,
            slot_index: 1
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
          min: -1,
          max: 2,
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
        id: 381,
        type: "ui/button",
        pos: [
          -1253.524485362144,
          -14.745590771078136
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 56,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              560
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
        id: 382,
        type: "actions/copy",
        pos: [
          -1133.6700077480994,
          -29.445674301629197
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 89,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "*",
            link: 559
          },
          {
            name: "copy",
            type: -1,
            link: 560,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              563,
              566
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
        id: 383,
        type: "basic/integer",
        pos: [
          -1199.5614853621437,
          -39.76159077107865
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 57,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              559
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
        id: 386,
        type: "events/sequence",
        pos: [
          -979.670007748099,
          45.55432569837086
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 211,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 563,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 564,
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
              558
            ],
            shape: 1,
            slot_index: 0
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
        id: 387,
        type: "events/no_change",
        pos: [
          -1174.6700077480991,
          19.554325698370796
        ],
        size: [
          159.6,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 212,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 565,
            shape: 1,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              567
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.NoChangeEvent",
        properties: {
          tags: []
        },
        saveUserState: true
      },
      {
        id: 388,
        type: "events/sequence",
        pos: [
          -981.670007748099,
          18.554325698370793
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 213,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 566,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 567,
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
              557
            ],
            shape: 1,
            slot_index: 0
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
        id: 390,
        type: "events/no_change",
        pos: [
          -1172.6700077480991,
          44.55432569837086
        ],
        size: [
          159.6,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 215,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 570,
            shape: 1,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              564
            ],
            shape: 1,
            slot_index: 0
          }
        ],
        title: "Comfy.NoChangeEvent",
        properties: {
          tags: []
        },
        saveUserState: true
      },
      {
        id: 343,
        type: "events/branch",
        pos: [
          -1257.41064453125,
          -398.365478515625
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 180,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 510,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 571
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              514
            ],
            shape: 1
          },
          {
            name: "false",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Branch",
        properties: {
          tags: []
        }
      },
      {
        id: 347,
        type: "events/branch",
        pos: [
          -1263.41064453125,
          -372.365478515625
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 184,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 517,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 572
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              519
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "false",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Branch",
        properties: {
          tags: []
        }
      },
      {
        id: 361,
        type: "events/branch",
        pos: [
          -1263.9560990767047,
          -233.09275124289772
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 194,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 534,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 574,
            slot_index: 1
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              536
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "false",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Branch",
        properties: {
          tags: []
        }
      },
      {
        id: 371,
        type: "events/branch",
        pos: [
          -1269.774280894886,
          -123.00184215198863
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 200,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 544,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 575,
            slot_index: 1
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              548
            ],
            shape: 1
          },
          {
            name: "false",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Branch",
        properties: {
          tags: []
        }
      },
      {
        id: 357,
        type: "events/branch",
        pos: [
          -1264.41064453125,
          -261.365478515625
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 189,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 527,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 573,
            slot_index: 1
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              531
            ],
            shape: 1
          },
          {
            name: "false",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Branch",
        properties: {
          tags: []
        }
      },
      {
        id: 375,
        type: "events/branch",
        pos: [
          -1273.41064453125,
          -97.365478515625
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 204,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 551,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 576,
            slot_index: 1
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              553
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "false",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Branch",
        properties: {
          tags: []
        }
      },
      {
        id: 389,
        type: "events/branch",
        pos: [
          -1276.41064453125,
          46.634521484375
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 214,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 568,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 578
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              570
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "false",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Branch",
        properties: {
          tags: []
        }
      },
      {
        id: 385,
        type: "events/branch",
        pos: [
          -1279.41064453125,
          19.634521484375
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 210,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 561,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 577
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              565
            ],
            shape: 1
          },
          {
            name: "false",
            type: -2,
            links: null,
            shape: 1
          }
        ],
        title: "Branch",
        properties: {
          tags: []
        }
      },
      {
        id: 313,
        type: "ui/checkbox",
        pos: [
          -1569.41064453125,
          -238.365478515625
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 58,
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
              487,
              495,
              571,
              572,
              573,
              574,
              575,
              576,
              577,
              578
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: null,
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
          "true"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: true,
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 363,
        type: "LoraLoader",
        pos: [
          -736.41064453125,
          -209.365478515625
        ],
        size: [
          254.39999999999998,
          106
        ],
        flags: {},
        order: 196,
        mode: 0,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 588,
            config: {}
          },
          {
            name: "clip",
            type: "CLIP",
            link: 581,
            config: {}
          },
          {
            name: "lora_name",
            type: "string",
            link: 537,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "strength_model",
            type: "number",
            link: 538,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "strength_clip",
            type: "number",
            link: 539,
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
              587
            ],
            slot_index: 0
          },
          {
            name: "CLIP",
            type: "CLIP",
            links: [
              582
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
        id: 349,
        type: "LoraLoader",
        pos: [
          -727.41064453125,
          -347.365478515625
        ],
        size: [
          254.39999999999998,
          106
        ],
        flags: {},
        order: 186,
        mode: 0,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 589,
            config: {}
          },
          {
            name: "clip",
            type: "CLIP",
            link: 580,
            config: {}
          },
          {
            name: "lora_name",
            type: "string",
            link: 520,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "strength_model",
            type: "number",
            link: 521,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "strength_clip",
            type: "number",
            link: 522,
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
              588
            ],
            slot_index: 0
          },
          {
            name: "CLIP",
            type: "CLIP",
            links: [
              581
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
        id: 335,
        type: "LoraLoader",
        pos: [
          -723.41064453125,
          -487.365478515625
        ],
        size: [
          254.39999999999998,
          106
        ],
        flags: {},
        order: 176,
        mode: 0,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 590,
            config: {}
          },
          {
            name: "clip",
            type: "CLIP",
            link: 579,
            config: {}
          },
          {
            name: "lora_name",
            type: "string",
            link: 503,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "strength_model",
            type: "number",
            link: 504,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "strength_clip",
            type: "number",
            link: 505,
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
              589
            ],
            slot_index: 0
          },
          {
            name: "CLIP",
            type: "CLIP",
            links: [
              580
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
        id: 79,
        type: "LoraLoader",
        pos: [
          -721.41064453125,
          -631.365478515625
        ],
        size: [
          254.39999999999998,
          106
        ],
        flags: {},
        order: 228,
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
              590
            ],
            slot_index: 0
          },
          {
            name: "CLIP",
            type: "CLIP",
            links: [
              579
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
        id: 391,
        type: "utils/reroute",
        pos: [
          -435,
          16
        ],
        size: [
          75,
          26
        ],
        flags: {},
        order: 216,
        mode: 0,
        inputs: [
          {
            name: "",
            type: "*",
            link: 583
          }
        ],
        outputs: [
          {
            name: "",
            type: "CLIP",
            links: [
              584,
              585
            ],
            slot_index: 0
          }
        ],
        title: "Comfy.Reroute",
        properties: {
          tags: [
            "txt2img",
            "hr"
          ],
          showOutputText: false,
          horizontal: false
        },
        saveUserState: true
      },
      {
        id: 377,
        type: "LoraLoader",
        pos: [
          -739.41064453125,
          -66.365478515625
        ],
        size: [
          254.39999999999998,
          106
        ],
        flags: {},
        order: 206,
        mode: 0,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 587,
            config: {}
          },
          {
            name: "clip",
            type: "CLIP",
            link: 582,
            config: {}
          },
          {
            name: "lora_name",
            type: "string",
            link: 554,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          },
          {
            name: "strength_model",
            type: "number",
            link: 555,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          },
          {
            name: "strength_clip",
            type: "number",
            link: 556,
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
              599,
              601,
              602
            ],
            slot_index: 0
          },
          {
            name: "CLIP",
            type: "CLIP",
            links: [
              583
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
        id: 392,
        type: "utils/reroute",
        pos: [
          -432,
          -63
        ],
        size: [
          75,
          26
        ],
        flags: {},
        order: 217,
        mode: 0,
        inputs: [
          {
            name: "",
            type: "*",
            link: 599,
            slot_index: 0
          }
        ],
        outputs: [
          {
            name: "",
            type: "MODEL",
            links: [
              600
            ],
            slot_index: 0
          }
        ],
        title: "Comfy.Reroute",
        properties: {
          tags: [
            "txt2img",
            "hr"
          ],
          showOutputText: false,
          horizontal: false
        },
        saveUserState: true
      },
      {
        id: 74,
        type: "CheckpointLoaderSimple",
        pos: [
          -139,
          -36
        ],
        size: [
          184.79999999999998,
          66
        ],
        flags: {},
        order: 71,
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
        id: 33,
        type: "ui/text",
        pos: [
          -331.1103000000002,
          114.9386
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 59,
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
          "masterpiece, a fluffy corgi wearing sunglasses"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: "masterpiece, a fluffy corgi wearing sunglasses",
        shownOutputProperties: {},
        saveUserState: true
      },
      {
        id: 400,
        type: "ui/combo",
        pos: [
          -202,
          -520
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 60,
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
              596
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
            "controlNet"
          ],
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
        id: 412,
        type: "ui/button",
        pos: [
          222.21750788554073,
          -334.659448390596
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 61,
        mode: 2,
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              621
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
            "controlNet"
          ],
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
        id: 414,
        type: "basic/integer",
        pos: [
          276.18050788554115,
          -359.67544839059656
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 62,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              620
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
        id: 413,
        type: "actions/copy",
        pos: [
          342,
          -349
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 90,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "*",
            link: 620
          },
          {
            name: "copy",
            type: -1,
            link: 621,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "out",
            type: -2,
            links: [
              622
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
        id: 180,
        type: "actions/set_node_mode",
        pos: [
          -49,
          -448
        ],
        size: [
          210,
          102
        ],
        flags: {},
        order: 106,
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
        id: 402,
        type: "ui/slider",
        pos: [
          512,
          -352
        ],
        size: [
          210,
          158
        ],
        flags: {
          collapsed: true
        },
        order: 107,
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
            link: 622,
            shape: 1
          }
        ],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              603,
              616
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
            "controlNet"
          ],
          defaultValue: 1,
          min: 0,
          max: 10,
          step: 0.01,
          precision: 0
        },
        widgets_values: [
          "1.050"
        ],
        color: "#223",
        bgColor: "#335",
        comfyValue: 1.05,
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
        id: 238,
        type: "basic/string",
        pos: [
          182,
          1180
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 63,
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
          240,
          1200
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 93,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "string",
            link: 627
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
        id: 204,
        type: "math/operation",
        pos: [
          -330,
          1186
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 96,
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
            link: 629
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
        order: 95,
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
            link: 630
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
        id: 417,
        type: "ui/image_upload",
        pos: [
          185,
          -527
        ],
        size: [
          210,
          138
        ],
        flags: {},
        order: 64,
        mode: 2,
        inputs: [],
        outputs: [
          {
            name: "filename",
            type: "string",
            links: [
              626
            ],
            slot_index: 0
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
            name: "image_count",
            type: "number",
            links: [
              631
            ],
            slot_index: 3
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
            "controlNet"
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
        id: 419,
        type: "basic/integer",
        pos: [
          531.5860255447035,
          1030.5762584522918
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 65,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "value",
            type: "number",
            links: [
              633
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
        id: 421,
        type: "logic/NOT",
        pos: [
          830.5229151014274,
          1007.3749060856503
        ],
        size: [
          140,
          26
        ],
        flags: {
          collapsed: true
        },
        order: 120,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: "boolean",
            link: 635
          }
        ],
        outputs: [
          {
            name: "out",
            type: "boolean",
            links: [
              636
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
        order: 124,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 439,
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
              637
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
        id: 279,
        type: "actions/notify",
        pos: [
          1524.5131480090158,
          884.0172802404205
        ],
        size: [
          151.2,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 131,
        mode: 0,
        inputs: [
          {
            name: "message",
            type: "string",
            link: 440
          },
          {
            name: "trigger",
            type: -1,
            link: 638,
            shape: 1,
            slot_index: 1
          }
        ],
        outputs: [],
        title: "Comfy.NotifyAction",
        properties: {
          tags: [],
          message: "Nya.",
          type: "info"
        },
        saveUserState: true
      },
      {
        id: 127,
        type: "actions/execute_subgraph",
        pos: [
          1500,
          922
        ],
        size: [
          226.79999999999998,
          78
        ],
        flags: {},
        order: 132,
        mode: 0,
        inputs: [
          {
            name: "execute",
            type: -1,
            link: 639,
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
        id: 416,
        type: "basic/CompareValues",
        pos: [
          611.5229151014275,
          1021.3749060856503
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 92,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: 0,
            link: 633
          },
          {
            name: "B",
            type: 0,
            link: 631
          }
        ],
        outputs: [
          {
            name: "true",
            type: "boolean",
            links: [
              634
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
          A: 0,
          B: 1,
          OP: "==",
          enabled: true,
          tags: []
        }
      },
      {
        id: 422,
        type: "actions/notify",
        pos: [
          1243,
          1158
        ],
        size: [
          151.2,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 133,
        mode: 0,
        inputs: [
          {
            name: "message",
            type: "string",
            link: 640
          },
          {
            name: "trigger",
            type: -1,
            link: 641,
            shape: 1,
            slot_index: 1
          }
        ],
        outputs: [],
        title: "Comfy.NotifyAction",
        properties: {
          tags: [],
          message: "Nya.",
          type: "error"
        },
        saveUserState: true
      },
      {
        id: 418,
        type: "ui/image_upload",
        pos: [
          -649,
          1228
        ],
        size: [
          210,
          138
        ],
        flags: {},
        order: 66,
        mode: 2,
        inputs: [],
        outputs: [
          {
            name: "filename",
            type: "string",
            links: [
              627,
              628
            ],
            slot_index: 0
          },
          {
            name: "width",
            type: "number",
            links: [
              630
            ],
            slot_index: 1
          },
          {
            name: "height",
            type: "number",
            links: [
              629
            ],
            slot_index: 2
          },
          {
            name: "image_count",
            type: "number",
            links: null
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
        order: 142,
        mode: 0,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 602,
            config: {},
            slot_index: 0
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
            link: 647,
            slot_index: 6,
            config: {}
          },
          {
            name: "negative",
            type: "CONDITIONING",
            link: 646,
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
        id: 32,
        type: "CLIPTextEncode",
        pos: [
          -202.11029999999997,
          89.88860000000001
        ],
        size: [
          212.10067125600108,
          46
        ],
        flags: {},
        order: 174,
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
            link: 584,
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
              610,
              648
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
          -208,
          179
        ],
        size: [
          216.60000000000002,
          46
        ],
        flags: {},
        order: 179,
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
            link: 585,
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
              611,
              649
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
        id: 428,
        type: "ui/checkbox",
        pos: [
          148.20931895085073,
          -741.6210814162781
        ],
        size: [
          210,
          78
        ],
        flags: {},
        order: 67,
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
              651,
              653
            ],
            slot_index: 0
          },
          {
            name: "changed",
            type: -2,
            links: [
              650
            ],
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
        id: 429,
        type: "actions/set_node_mode",
        pos: [
          415,
          -717
        ],
        size: [
          210,
          102
        ],
        flags: {},
        order: 97,
        mode: 0,
        inputs: [
          {
            name: "enabled",
            type: "boolean",
            link: 651
          },
          {
            name: "set",
            type: -1,
            link: 650,
            shape: 1
          }
        ],
        outputs: [],
        title: "Comfy.SetNodeModeAction",
        properties: {
          targetTags: "controlNet",
          enable: true,
          tags: []
        },
        saveUserState: true
      },
      {
        id: 399,
        type: "DiffControlNetLoader",
        pos: [
          -85,
          -566
        ],
        size: [
          236.8,
          46
        ],
        flags: {},
        order: 218,
        mode: 2,
        inputs: [
          {
            name: "model",
            type: "MODEL",
            link: 600,
            slot_index: 0,
            config: {}
          },
          {
            name: "control_net_name",
            type: "string",
            link: 596,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/combo",
            serialize: true
          }
        ],
        outputs: [
          {
            name: "CONTROL_NET",
            type: "CONTROL_NET",
            links: [
              607,
              609
            ],
            slot_index: 0
          }
        ],
        title: "DiffControlNetLoader",
        properties: {
          tags: [
            "txt2img",
            "hr",
            "controlNet"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 404,
        type: "LoadImage",
        pos: [
          460,
          -512
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: false
        },
        order: 91,
        mode: 2,
        inputs: [
          {
            name: "image",
            type: "string",
            link: 626,
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
              606,
              608
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
            "hr",
            "controlNet"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 423,
        type: "basic/string",
        pos: [
          1217,
          1124
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 68,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "string",
            type: "string",
            links: [
              640
            ],
            slot_index: 0
          }
        ],
        title: "Const String",
        properties: {
          value: "Upload an image to be used with ControlNet, or disable it first.",
          tags: []
        }
      },
      {
        id: 410,
        type: "logic/AND",
        pos: [
          746,
          1005
        ],
        size: [
          140,
          46
        ],
        flags: {
          collapsed: true
        },
        order: 111,
        mode: 0,
        inputs: [
          {
            name: "a",
            type: "boolean",
            link: 655,
            slot_index: 0
          },
          {
            name: "b",
            type: "boolean",
            link: 634,
            slot_index: 1
          }
        ],
        outputs: [
          {
            name: "out",
            type: "boolean",
            links: [
              635
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
        id: 430,
        type: "basic/CompareValues",
        pos: [
          613,
          984
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 98,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: 0,
            link: 654,
            slot_index: 0
          },
          {
            name: "B",
            type: 0,
            link: 653
          }
        ],
        outputs: [
          {
            name: "true",
            type: "boolean",
            links: [
              655
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
          A: true,
          B: false,
          OP: "==",
          enabled: true,
          tags: []
        }
      },
      {
        id: 420,
        type: "events/branch",
        pos: [
          926,
          960
        ],
        size: [
          140,
          46
        ],
        flags: {},
        order: 129,
        mode: 0,
        inputs: [
          {
            name: "in",
            type: -1,
            link: 637,
            shape: 1
          },
          {
            name: "cond",
            type: "boolean",
            link: 636
          }
        ],
        outputs: [
          {
            name: "true",
            type: -2,
            links: [
              638,
              639
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "false",
            type: -2,
            links: [
              641
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
        id: 431,
        type: "basic/boolean",
        pos: [
          528,
          983
        ],
        size: [
          210,
          38
        ],
        flags: {
          collapsed: true
        },
        order: 69,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "bool",
            type: "boolean",
            links: [
              654
            ],
            slot_index: 0
          }
        ],
        title: "Const Boolean",
        properties: {
          value: true,
          tags: []
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
          142
        ],
        flags: {},
        order: 136,
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
            link: 657,
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
        id: 155,
        type: "events/branch",
        pos: [
          615,
          827
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
              656
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
        order: 135,
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
            link: 661,
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
        id: 156,
        type: "events/branch",
        pos: [
          1835,
          348
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
              660
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
        id: 432,
        type: "events/sequence",
        pos: [
          716,
          825
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 122,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 656,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 659,
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
              657
            ],
            shape: 1,
            slot_index: 0
          },
          {
            name: "",
            type: -2,
            links: [
              658
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
        id: 433,
        type: "ui/button",
        pos: [
          705,
          874
        ],
        size: [
          210,
          78
        ],
        flags: {
          collapsed: true
        },
        order: 70,
        mode: 0,
        inputs: [],
        outputs: [
          {
            name: "clicked",
            type: -2,
            links: [
              659,
              662
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
        id: 434,
        type: "events/sequence",
        pos: [
          1968,
          366
        ],
        size: [
          140,
          66
        ],
        flags: {
          collapsed: true
        },
        order: 121,
        mode: 0,
        inputs: [
          {
            name: "",
            type: -1,
            link: 660,
            shape: 1
          },
          {
            name: "",
            type: -1,
            link: 662,
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
              661
            ],
            shape: 1,
            slot_index: 0
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
        id: 401,
        type: "ControlNetApply",
        pos: [
          677,
          -594
        ],
        size: [
          211.6,
          86
        ],
        flags: {},
        order: 220,
        mode: 2,
        inputs: [
          {
            name: "conditioning",
            type: "CONDITIONING",
            link: 610,
            config: {}
          },
          {
            name: "control_net",
            type: "CONTROL_NET",
            link: 607,
            config: {}
          },
          {
            name: "image",
            type: "IMAGE",
            link: 606,
            config: {}
          },
          {
            name: "strength",
            type: "number",
            link: 603,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          }
        ],
        outputs: [
          {
            name: "CONDITIONING",
            type: "CONDITIONING",
            links: [
              642
            ],
            slot_index: 0
          }
        ],
        title: "ControlNetApply",
        properties: {
          tags: [
            "txt2img",
            "hr",
            "controlNet"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 406,
        type: "ControlNetApply",
        pos: [
          675,
          -468
        ],
        size: [
          211.6,
          86
        ],
        flags: {},
        order: 221,
        mode: 2,
        inputs: [
          {
            name: "conditioning",
            type: "CONDITIONING",
            link: 611,
            config: {}
          },
          {
            name: "control_net",
            type: "CONTROL_NET",
            link: 609,
            config: {}
          },
          {
            name: "image",
            type: "IMAGE",
            link: 608,
            config: {}
          },
          {
            name: "strength",
            type: "number",
            link: 616,
            config: {},
            defaultWidgetNode: null,
            widgetNodeType: "ui/slider",
            serialize: true
          }
        ],
        outputs: [
          {
            name: "CONDITIONING",
            type: "CONDITIONING",
            links: [
              644
            ],
            slot_index: 0
          }
        ],
        title: "ControlNetApply",
        properties: {
          tags: [
            "txt2img",
            "hr",
            "controlNet"
          ]
        },
        color: "#432",
        bgColor: "#653",
        saveUserState: true
      },
      {
        id: 427,
        type: "utils/pick_first",
        pos: [
          951,
          -438
        ],
        size: [
          210,
          122
        ],
        flags: {
          collapsed: false
        },
        order: 223,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "*",
            link: 644
          },
          {
            name: "B",
            type: "*",
            link: 649
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
            type: "CONDITIONING",
            links: [
              646,
              663
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
          mode: "dataNonNull"
        },
        color: "#232",
        bgColor: "#353",
        saveUserState: true
      },
      {
        id: 424,
        type: "utils/pick_first",
        pos: [
          943,
          -599
        ],
        size: [
          210,
          122
        ],
        flags: {
          collapsed: false
        },
        order: 222,
        mode: 0,
        inputs: [
          {
            name: "A",
            type: "*",
            link: 642
          },
          {
            name: "B",
            type: "*",
            link: 648
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
            type: "CONDITIONING",
            links: [
              647,
              664
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
          mode: "dataNonNull"
        },
        color: "#232",
        bgColor: "#353",
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
        387,
        252,
        0,
        251,
        1,
        "*"
      ],
      [
        398,
        163,
        2,
        246,
        0,
        -1
      ],
      [
        400,
        163,
        2,
        256,
        0,
        -1
      ],
      [
        401,
        256,
        0,
        251,
        0,
        -1
      ],
      [
        402,
        246,
        0,
        258,
        1,
        -1
      ],
      [
        403,
        256,
        0,
        259,
        1,
        -1
      ],
      [
        404,
        263,
        0,
        262,
        1,
        "*"
      ],
      [
        407,
        214,
        1,
        262,
        0,
        -1
      ],
      [
        408,
        262,
        0,
        260,
        1,
        -1
      ],
      [
        409,
        262,
        1,
        261,
        1,
        -1
      ],
      [
        431,
        277,
        0,
        276,
        0,
        "string"
      ],
      [
        432,
        163,
        0,
        277,
        0,
        "string,array"
      ],
      [
        433,
        276,
        1,
        272,
        0,
        -1
      ],
      [
        434,
        163,
        2,
        277,
        2,
        -1
      ],
      [
        435,
        157,
        0,
        77,
        1,
        -1
      ],
      [
        436,
        251,
        0,
        214,
        1,
        -1
      ],
      [
        437,
        126,
        0,
        278,
        0,
        -1
      ],
      [
        438,
        273,
        2,
        278,
        1,
        -1
      ],
      [
        439,
        278,
        0,
        233,
        0,
        -1
      ],
      [
        440,
        280,
        0,
        279,
        0,
        "string"
      ],
      [
        442,
        282,
        0,
        281,
        0,
        "string"
      ],
      [
        443,
        228,
        0,
        281,
        1,
        -1
      ],
      [
        444,
        159,
        0,
        283,
        1,
        -1
      ],
      [
        445,
        157,
        0,
        284,
        1,
        -1
      ],
      [
        487,
        313,
        0,
        315,
        1,
        "boolean"
      ],
      [
        488,
        151,
        0,
        316,
        0,
        -1
      ],
      [
        489,
        316,
        0,
        82,
        1,
        -1
      ],
      [
        490,
        82,
        1,
        315,
        0,
        -1
      ],
      [
        491,
        315,
        0,
        317,
        0,
        -1
      ],
      [
        492,
        151,
        0,
        318,
        0,
        -1
      ],
      [
        493,
        317,
        0,
        318,
        1,
        -1
      ],
      [
        494,
        318,
        0,
        81,
        1,
        -1
      ],
      [
        495,
        313,
        0,
        319,
        1,
        "boolean"
      ],
      [
        496,
        81,
        1,
        319,
        0,
        -1
      ],
      [
        497,
        319,
        0,
        320,
        0,
        -1
      ],
      [
        498,
        320,
        0,
        316,
        1,
        -1
      ],
      [
        503,
        336,
        0,
        335,
        2,
        "string"
      ],
      [
        504,
        337,
        0,
        335,
        3,
        "number"
      ],
      [
        505,
        338,
        0,
        335,
        4,
        "number"
      ],
      [
        506,
        346,
        0,
        337,
        1,
        -1
      ],
      [
        507,
        344,
        0,
        338,
        1,
        -1
      ],
      [
        508,
        341,
        0,
        340,
        0,
        "*"
      ],
      [
        509,
        339,
        0,
        340,
        1,
        -1
      ],
      [
        510,
        338,
        1,
        343,
        0,
        -1
      ],
      [
        512,
        340,
        0,
        344,
        0,
        -1
      ],
      [
        513,
        348,
        0,
        344,
        1,
        -1
      ],
      [
        514,
        343,
        0,
        345,
        0,
        -1
      ],
      [
        515,
        340,
        0,
        346,
        0,
        -1
      ],
      [
        516,
        345,
        0,
        346,
        1,
        -1
      ],
      [
        517,
        337,
        1,
        347,
        0,
        -1
      ],
      [
        519,
        347,
        0,
        348,
        0,
        -1
      ],
      [
        520,
        350,
        0,
        349,
        2,
        "string"
      ],
      [
        521,
        351,
        0,
        349,
        3,
        "number"
      ],
      [
        522,
        352,
        0,
        349,
        4,
        "number"
      ],
      [
        523,
        360,
        0,
        351,
        1,
        -1
      ],
      [
        524,
        358,
        0,
        352,
        1,
        -1
      ],
      [
        525,
        355,
        0,
        354,
        0,
        "*"
      ],
      [
        526,
        353,
        0,
        354,
        1,
        -1
      ],
      [
        527,
        352,
        1,
        357,
        0,
        -1
      ],
      [
        529,
        354,
        0,
        358,
        0,
        -1
      ],
      [
        530,
        362,
        0,
        358,
        1,
        -1
      ],
      [
        531,
        357,
        0,
        359,
        0,
        -1
      ],
      [
        532,
        354,
        0,
        360,
        0,
        -1
      ],
      [
        533,
        359,
        0,
        360,
        1,
        -1
      ],
      [
        534,
        351,
        1,
        361,
        0,
        -1
      ],
      [
        536,
        361,
        0,
        362,
        0,
        -1
      ],
      [
        537,
        364,
        0,
        363,
        2,
        "string"
      ],
      [
        538,
        365,
        0,
        363,
        3,
        "number"
      ],
      [
        539,
        366,
        0,
        363,
        4,
        "number"
      ],
      [
        540,
        374,
        0,
        365,
        1,
        -1
      ],
      [
        541,
        372,
        0,
        366,
        1,
        -1
      ],
      [
        542,
        369,
        0,
        368,
        0,
        "*"
      ],
      [
        543,
        367,
        0,
        368,
        1,
        -1
      ],
      [
        544,
        366,
        1,
        371,
        0,
        -1
      ],
      [
        546,
        368,
        0,
        372,
        0,
        -1
      ],
      [
        547,
        376,
        0,
        372,
        1,
        -1
      ],
      [
        548,
        371,
        0,
        373,
        0,
        -1
      ],
      [
        549,
        368,
        0,
        374,
        0,
        -1
      ],
      [
        550,
        373,
        0,
        374,
        1,
        -1
      ],
      [
        551,
        365,
        1,
        375,
        0,
        -1
      ],
      [
        553,
        375,
        0,
        376,
        0,
        -1
      ],
      [
        554,
        378,
        0,
        377,
        2,
        "string"
      ],
      [
        555,
        379,
        0,
        377,
        3,
        "number"
      ],
      [
        556,
        380,
        0,
        377,
        4,
        "number"
      ],
      [
        557,
        388,
        0,
        379,
        1,
        -1
      ],
      [
        558,
        386,
        0,
        380,
        1,
        -1
      ],
      [
        559,
        383,
        0,
        382,
        0,
        "*"
      ],
      [
        560,
        381,
        0,
        382,
        1,
        -1
      ],
      [
        561,
        380,
        1,
        385,
        0,
        -1
      ],
      [
        563,
        382,
        0,
        386,
        0,
        -1
      ],
      [
        564,
        390,
        0,
        386,
        1,
        -1
      ],
      [
        565,
        385,
        0,
        387,
        0,
        -1
      ],
      [
        566,
        382,
        0,
        388,
        0,
        -1
      ],
      [
        567,
        387,
        0,
        388,
        1,
        -1
      ],
      [
        568,
        379,
        1,
        389,
        0,
        -1
      ],
      [
        570,
        389,
        0,
        390,
        0,
        -1
      ],
      [
        571,
        313,
        0,
        343,
        1,
        "boolean"
      ],
      [
        572,
        313,
        0,
        347,
        1,
        "boolean"
      ],
      [
        573,
        313,
        0,
        357,
        1,
        "boolean"
      ],
      [
        574,
        313,
        0,
        361,
        1,
        "boolean"
      ],
      [
        575,
        313,
        0,
        371,
        1,
        "boolean"
      ],
      [
        576,
        313,
        0,
        375,
        1,
        "boolean"
      ],
      [
        577,
        313,
        0,
        385,
        1,
        "boolean"
      ],
      [
        578,
        313,
        0,
        389,
        1,
        "boolean"
      ],
      [
        579,
        79,
        1,
        335,
        1,
        "CLIP"
      ],
      [
        580,
        335,
        1,
        349,
        1,
        "CLIP"
      ],
      [
        581,
        349,
        1,
        363,
        1,
        "CLIP"
      ],
      [
        582,
        363,
        1,
        377,
        1,
        "CLIP"
      ],
      [
        583,
        377,
        1,
        391,
        0,
        "*"
      ],
      [
        584,
        391,
        0,
        32,
        1,
        "CLIP"
      ],
      [
        585,
        391,
        0,
        34,
        1,
        "CLIP"
      ],
      [
        587,
        363,
        0,
        377,
        0,
        "MODEL"
      ],
      [
        588,
        349,
        0,
        363,
        0,
        "MODEL"
      ],
      [
        589,
        335,
        0,
        349,
        0,
        "MODEL"
      ],
      [
        590,
        79,
        0,
        335,
        0,
        "MODEL"
      ],
      [
        596,
        400,
        0,
        399,
        1,
        "string"
      ],
      [
        599,
        377,
        0,
        392,
        0,
        "*"
      ],
      [
        600,
        392,
        0,
        399,
        0,
        "MODEL"
      ],
      [
        601,
        377,
        0,
        16,
        0,
        "MODEL"
      ],
      [
        602,
        377,
        0,
        119,
        0,
        "MODEL"
      ],
      [
        603,
        402,
        0,
        401,
        3,
        "number"
      ],
      [
        606,
        404,
        0,
        401,
        2,
        "IMAGE"
      ],
      [
        607,
        399,
        0,
        401,
        1,
        "CONTROL_NET"
      ],
      [
        608,
        404,
        0,
        406,
        2,
        "IMAGE"
      ],
      [
        609,
        399,
        0,
        406,
        1,
        "CONTROL_NET"
      ],
      [
        610,
        32,
        0,
        401,
        0,
        "CONDITIONING"
      ],
      [
        611,
        34,
        0,
        406,
        0,
        "CONDITIONING"
      ],
      [
        616,
        402,
        0,
        406,
        3,
        "number"
      ],
      [
        620,
        414,
        0,
        413,
        0,
        "*"
      ],
      [
        621,
        412,
        0,
        413,
        1,
        -1
      ],
      [
        622,
        413,
        0,
        402,
        1,
        -1
      ],
      [
        626,
        417,
        0,
        404,
        0,
        "string"
      ],
      [
        627,
        418,
        0,
        237,
        0,
        "string"
      ],
      [
        628,
        418,
        0,
        161,
        0,
        "string"
      ],
      [
        629,
        418,
        2,
        204,
        1,
        "number"
      ],
      [
        630,
        418,
        1,
        205,
        1,
        "number"
      ],
      [
        631,
        417,
        3,
        416,
        1,
        "number"
      ],
      [
        633,
        419,
        0,
        416,
        0,
        "number"
      ],
      [
        634,
        416,
        0,
        410,
        1,
        "boolean"
      ],
      [
        635,
        410,
        0,
        421,
        0,
        "boolean"
      ],
      [
        636,
        421,
        0,
        420,
        1,
        "boolean"
      ],
      [
        637,
        233,
        0,
        420,
        0,
        -1
      ],
      [
        638,
        420,
        0,
        279,
        1,
        -1
      ],
      [
        639,
        420,
        0,
        127,
        0,
        -1
      ],
      [
        640,
        423,
        0,
        422,
        0,
        "string"
      ],
      [
        641,
        420,
        1,
        422,
        1,
        -1
      ],
      [
        642,
        401,
        0,
        424,
        0,
        "*"
      ],
      [
        644,
        406,
        0,
        427,
        0,
        "*"
      ],
      [
        646,
        427,
        0,
        119,
        7,
        "CONDITIONING"
      ],
      [
        647,
        424,
        0,
        119,
        6,
        "CONDITIONING"
      ],
      [
        648,
        32,
        0,
        424,
        1,
        "*"
      ],
      [
        649,
        34,
        0,
        427,
        1,
        "*"
      ],
      [
        650,
        428,
        1,
        429,
        1,
        -1
      ],
      [
        651,
        428,
        0,
        429,
        0,
        "boolean"
      ],
      [
        653,
        428,
        0,
        430,
        1,
        "boolean"
      ],
      [
        654,
        431,
        0,
        430,
        0,
        "boolean"
      ],
      [
        655,
        430,
        0,
        410,
        0,
        "boolean"
      ],
      [
        656,
        155,
        1,
        432,
        0,
        -1
      ],
      [
        657,
        432,
        0,
        104,
        2,
        -1
      ],
      [
        658,
        432,
        1,
        116,
        3,
        -1
      ],
      [
        659,
        433,
        0,
        432,
        1,
        -1
      ],
      [
        660,
        156,
        1,
        434,
        0,
        -1
      ],
      [
        661,
        434,
        0,
        103,
        2,
        -1
      ],
      [
        662,
        433,
        0,
        434,
        1,
        -1
      ],
      [
        663,
        427,
        0,
        16,
        7,
        "CONDITIONING"
      ],
      [
        664,
        424,
        0,
        16,
        6,
        "CONDITIONING"
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
          -1170,
          181,
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
      },
      {
        title: "Mode Switcher",
        bounding: [
          -2109,
          329,
          707,
          745
        ],
        color: "#b58b2a"
      },
      {
        title: "LoRA",
        bounding: [
          -1600,
          -693,
          1146,
          772
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
          "58",
          "79",
          "41",
          "202"
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
          "95"
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
            title: "Sampler",
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
            title: "Scheduler",
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
            title: "Checkpoint",
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
            title: "Model",
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
        parent: "157"
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
        parent: "157"
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
        parent: "157"
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
          "162",
          "157",
          "188",
          "189",
          "190",
          "191"
        ],
        parent: "1"
      },
      64: {
        dragItem: {
          type: "widget",
          id: "64",
          nodeId: 91,
          attrs: {
            title: "Upscale Method",
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
            title: "Crop",
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
            hidden: true,
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
        parent: "157"
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
          "93",
          "213"
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
            title: "VAE",
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
            title: "Upscale Method",
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
            title: "Crop",
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
          "211",
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
      },
      157: {
        dragItem: {
          type: "container",
          id: "157",
          attrs: {
            title: "LoRA 1",
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
          "55",
          "56",
          "57",
          "92"
        ],
        parent: "58"
      },
      162: {
        dragItem: {
          type: "widget",
          id: "162",
          nodeId: 313,
          attrs: {
            title: "Link Weights",
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
            tags: []
          }
        },
        children: [],
        parent: "58"
      },
      168: {
        dragItem: {
          type: "widget",
          id: "168",
          nodeId: 336,
          attrs: {
            title: "Model",
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
            tags: []
          }
        },
        children: [],
        parent: "188"
      },
      169: {
        dragItem: {
          type: "widget",
          id: "169",
          nodeId: 337,
          attrs: {
            title: "UNet",
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
            tags: []
          }
        },
        children: [],
        parent: "188"
      },
      170: {
        dragItem: {
          type: "widget",
          id: "170",
          nodeId: 338,
          attrs: {
            title: "TEnc",
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
            tags: []
          }
        },
        children: [],
        parent: "188"
      },
      171: {
        dragItem: {
          type: "widget",
          id: "171",
          nodeId: 339,
          attrs: {
            title: "🗙",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "flex-grow: 1;",
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
        parent: "188"
      },
      173: {
        dragItem: {
          type: "widget",
          id: "173",
          nodeId: 350,
          attrs: {
            title: "Model",
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
            tags: []
          }
        },
        children: [],
        parent: "189"
      },
      174: {
        dragItem: {
          type: "widget",
          id: "174",
          nodeId: 351,
          attrs: {
            title: "UNet",
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
            tags: []
          }
        },
        children: [],
        parent: "189"
      },
      175: {
        dragItem: {
          type: "widget",
          id: "175",
          nodeId: 352,
          attrs: {
            title: "TEnc",
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
            tags: []
          }
        },
        children: [],
        parent: "189"
      },
      176: {
        dragItem: {
          type: "widget",
          id: "176",
          nodeId: 353,
          attrs: {
            title: "🗙",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "flex-grow: 1;",
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
        parent: "189"
      },
      178: {
        dragItem: {
          type: "widget",
          id: "178",
          nodeId: 364,
          attrs: {
            title: "Model",
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
            tags: []
          }
        },
        children: [],
        parent: "190"
      },
      179: {
        dragItem: {
          type: "widget",
          id: "179",
          nodeId: 365,
          attrs: {
            title: "UNet",
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
            tags: []
          }
        },
        children: [],
        parent: "190"
      },
      180: {
        dragItem: {
          type: "widget",
          id: "180",
          nodeId: 366,
          attrs: {
            title: "TEnc",
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
            tags: []
          }
        },
        children: [],
        parent: "190"
      },
      181: {
        dragItem: {
          type: "widget",
          id: "181",
          nodeId: 367,
          attrs: {
            title: "🗙",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "flex-grow: 1;",
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
        parent: "190"
      },
      183: {
        dragItem: {
          type: "widget",
          id: "183",
          nodeId: 378,
          attrs: {
            title: "Model",
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
            tags: []
          }
        },
        children: [],
        parent: "191"
      },
      184: {
        dragItem: {
          type: "widget",
          id: "184",
          nodeId: 379,
          attrs: {
            title: "UNet",
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
            tags: []
          }
        },
        children: [],
        parent: "191"
      },
      185: {
        dragItem: {
          type: "widget",
          id: "185",
          nodeId: 380,
          attrs: {
            title: "TEnc",
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
            tags: []
          }
        },
        children: [],
        parent: "191"
      },
      186: {
        dragItem: {
          type: "widget",
          id: "186",
          nodeId: 381,
          attrs: {
            title: "🗙",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "flex-grow: 1;",
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
        parent: "191"
      },
      188: {
        dragItem: {
          type: "container",
          id: "188",
          attrs: {
            title: "LoRA 2",
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
          "168",
          "169",
          "170",
          "171"
        ],
        parent: "58"
      },
      189: {
        dragItem: {
          type: "container",
          id: "189",
          attrs: {
            title: "LoRA 3",
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
          "173",
          "174",
          "175",
          "176"
        ],
        parent: "58"
      },
      190: {
        dragItem: {
          type: "container",
          id: "190",
          attrs: {
            title: "LoRA 4",
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
          "178",
          "179",
          "180",
          "181"
        ],
        parent: "58"
      },
      191: {
        dragItem: {
          type: "container",
          id: "191",
          attrs: {
            title: "LoRA 5",
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
          "183",
          "184",
          "185",
          "186"
        ],
        parent: "58"
      },
      198: {
        dragItem: {
          type: "widget",
          id: "198",
          nodeId: 400,
          attrs: {
            title: "Model",
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
        parent: "199"
      },
      199: {
        dragItem: {
          type: "container",
          id: "199",
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
              "controlNet"
            ]
          }
        },
        children: [
          "198"
        ],
        parent: "202"
      },
      200: {
        dragItem: {
          type: "widget",
          id: "200",
          nodeId: 402,
          attrs: {
            title: "Strength",
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
        parent: "201"
      },
      201: {
        dragItem: {
          type: "container",
          id: "201",
          attrs: {
            title: "",
            hidden: true,
            disabled: false,
            direction: "horizontal",
            classes: "",
            style: "controlNet",
            nodeDisabledState: "disabled",
            variant: "gallery",
            containerVariant: "hidden",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: [
              "controlNet"
            ]
          }
        },
        children: [
          "200",
          "207"
        ],
        parent: "202"
      },
      202: {
        dragItem: {
          type: "container",
          id: "202",
          attrs: {
            title: "ControlNet",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "",
            nodeDisabledState: "disabled",
            variant: "accordion",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "primary",
            buttonSize: "large",
            tags: []
          }
        },
        children: [
          "212",
          "208",
          "199",
          "201"
        ],
        parent: "1"
      },
      207: {
        dragItem: {
          type: "widget",
          id: "207",
          nodeId: 412,
          attrs: {
            title: "🗙",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "flex-grow: 1",
            nodeDisabledState: "hidden",
            variant: "gallery",
            containerVariant: "block",
            openOnStartup: false,
            buttonVariant: "secondary",
            buttonSize: "small",
            tags: []
          }
        },
        children: [],
        parent: "201"
      },
      208: {
        dragItem: {
          type: "container",
          id: "208",
          attrs: {
            title: "",
            hidden: true,
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
            tags: [
              "controlNet"
            ]
          }
        },
        children: [
          "209"
        ],
        parent: "202"
      },
      209: {
        dragItem: {
          type: "widget",
          id: "209",
          nodeId: 417,
          attrs: {
            title: "ControlNet Image",
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
        parent: "208"
      },
      210: {
        dragItem: {
          type: "widget",
          id: "210",
          nodeId: 418,
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
        parent: "211"
      },
      211: {
        dragItem: {
          type: "container",
          id: "211",
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
          "210"
        ],
        parent: "109"
      },
      212: {
        dragItem: {
          type: "widget",
          id: "212",
          nodeId: 428,
          attrs: {
            title: "Enable",
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
            tags: []
          }
        },
        children: [],
        parent: "202"
      },
      213: {
        dragItem: {
          type: "widget",
          id: "213",
          nodeId: 433,
          attrs: {
            title: "🗑️",
            hidden: false,
            disabled: false,
            direction: "vertical",
            classes: "",
            style: "flex-grow: 20;",
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
        parent: "94"
      }
    },
    currentId: 214,
    attrs: {
      queuePromptButtonName: "Queue txt2img",
      defaultSubgraph: "txt2img"
    }
  },
  canvas: {
    offset: [
      272.9053569395375,
      537.7665125964128
    ],
    scale: 0.8264462809917358
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
