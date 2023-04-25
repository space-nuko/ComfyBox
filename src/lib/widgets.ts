import type { IWidget, LGraphNode } from "@litegraph-js/core";
import type ComfyApp from "$lib/components/ComfyApp";
import ComfyValueControlWidget from "./widgets/ComfyValueControlWidget";

export interface WidgetData {
    widget: IWidget,
    minWidth?: number,
    minHeight?: number
}

type WidgetFactory = (node: LGraphNode, inputName: string, inputData: any, app: ComfyApp) => WidgetData;


type NumberConfig = { min: number, max: number, step: number, precision: number }
type NumberDefaults = { val: number, config: NumberConfig }

function getNumberDefaults(inputData: any, defaultStep: number): NumberDefaults {
    let defaultVal = inputData[1]["default"];
    let { min, max, step } = inputData[1];

    if (defaultVal == undefined) defaultVal = 0;
    if (min == undefined) min = 0;
    if (max == undefined) max = 2048;
    if (step == undefined) step = defaultStep;

    return { val: defaultVal, config: { min, max, step: step, precision: 0 } };
}


const FLOAT: WidgetFactory = (node: LGraphNode, inputName: string, inputData: any): WidgetData => {
    const { val, config } = getNumberDefaults(inputData, 0.5);
    return { widget: node.addWidget("number", inputName, val, () => { }, config) };
}


const INT: WidgetFactory = (node: LGraphNode, inputName: string, inputData: any): WidgetData => {
    const { val, config } = getNumberDefaults(inputData, 1);
    return {
        widget: node.addWidget(
            "number",
            inputName,
            val,
            function(v) {
                const s = this.options.step;
                this.value = Math.round(v / s) * s;
            },
            config
        ),
    };
};

function seedWidget(node, inputName, inputData, app) {
	const seed = INT(node, inputName, inputData, app);
	const seedControl = new ComfyValueControlWidget("control_after_generate", "randomize", node, seed.widget);
    node.addCustomWidget(seedControl);

	// seed.widget.linkedWidgets = [seedControl];
	return seed;
}

const STRING: WidgetFactory = (node: LGraphNode, inputName: string, inputData: any, app: ComfyApp): WidgetData => {
    const defaultVal = inputData[1].default || "";
    const multiline = !!inputData[1].multiline;

    // if (multiline) {
    //     return addMultilineWidget(node, inputName, { defaultVal, ...inputData[1] }, app);
    // } else {
    return { widget: node.addWidget("text", inputName, defaultVal, () => { }, { multiline }) };
    // }
};

const COMBO: WidgetFactory = (node: LGraphNode, inputName: string, inputData: any): WidgetData => {
    const type = inputData[0];
    let defaultValue = type[0];
    if (inputData[1] && inputData[1].default) {
        defaultValue = inputData[1].default;
    }
    return { widget: node.addWidget("combo", inputName, defaultValue, () => { }, { values: type }) };
}

const IMAGEUPLOAD: WidgetFactory = (node: LGraphNode, inputName: string, inputData: any, app): WidgetData => {
    const imageWidget = node.widgets.find((w) => w.name === "image");
    let uploadWidget: IWidget;

    // async function uploadFile(file: File, updateNode: boolean) {
    //     try {
    //         // Wrap file in formdata so it includes filename
    //         const body = new FormData();
    //         body.append("image", file);
    //         const resp = await fetch("/upload/image", {
    //             method: "POST",
    //             body,
    //         });

    //         if (resp.status === 200) {
    //             const data = await resp.json();
    //             // Add the file as an option and update the widget value
    //             if (!imageWidget.options.values.includes(data.name)) {
    //                 imageWidget.options.values.push(data.name);
    //             }

    //             if (updateNode) {
    //                 // showImage(data.name);
    //                 imageWidget.value = data.name;
    //             }
    //         } else {
    //             alert(resp.status + " - " + resp.statusText);
    //         }
    //     } catch (error) {
    //         alert(error);
    //     }
    // }

    // const fileInput = document.createElement("input");
    // Object.assign(fileInput, {
    //     type: "file",
    //     accept: "image/jpeg,image/png",
    //     style: "display: none",
    //     onchange: async () => {
    //         if (fileInput.files.length) {
    //             await uploadFile(fileInput.files[0], true);
    //         }
    //     },
    // });
    // document.body.append(fileInput);

    // Create the button widget for selecting the files
    uploadWidget = node.addWidget("button", "choose file to upload", "image", () => {
        // fileInput.click();
    });
    uploadWidget.options = { serialize: false };

    return { widget: uploadWidget };
}


export type WidgetRepository = Record<string, WidgetFactory>

export const ComfyWidgets: WidgetRepository = {
    "INT:seed": seedWidget,
    "INT:noise_seed": seedWidget,
    FLOAT,
    INT,
    STRING,
    COMBO,
    IMAGEUPLOAD,
}
