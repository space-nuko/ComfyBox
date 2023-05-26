import type { SerializedComfyBoxTemplate } from '$lib/ComfyBoxTemplate';
import type { UUID } from '@litegraph-ts/core';
import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import { v4 as uuidv4 } from "uuid";

export type TemplateState = {
    builtInTemplates: SerializedComfyBoxTemplate[]
    userTemplates: SerializedComfyBoxTemplate[]
    templatesByID: Record<UUID, SerializedComfyBoxTemplate>
}

type TemplateStateOps = {
    getAllTemplates: () => SerializedComfyBoxTemplate[],
    addTemplate: (template: SerializedComfyBoxTemplate) => boolean,
    updateTemplate: (template: SerializedComfyBoxTemplate) => boolean,
    removeTemplate: (templateID: UUID) => boolean,
    save: () => void,
    load: (builtInTemplates: SerializedComfyBoxTemplate[]) => void,
}

export type WritableTemplateStateStore = Writable<TemplateState> & TemplateStateOps;
const store: Writable<TemplateState> = writable(
    {
        builtInTemplates: [],
        userTemplates: [],
        templatesByID: {}
    })

function getTemplateList(template: SerializedComfyBoxTemplate, state: TemplateState): SerializedComfyBoxTemplate[] {
    if (template.isBuiltIn)
        return state.builtInTemplates
    return state.userTemplates;
}

function getAllTemplates(): SerializedComfyBoxTemplate[] {
    const state = get(store);
    return state.builtInTemplates.concat(state.userTemplates);
}

function addTemplate(template: SerializedComfyBoxTemplate): boolean {
    const state = get(store);
    if (state.templatesByID[template.id]) {
        return false;
    }

    store.update(s => {
        const templateList = getTemplateList(template, s)
        templateList.push(template)
        s.templatesByID[template.id] = template;
        return s;
    })

    save();

    return true;
}

function removeTemplate(templateID: UUID): boolean {
    const state = get(store);
    if (!state.templatesByID[templateID]) {
        return false;
    }

    store.update(s => {
        const templateList = getTemplateList(s.templatesByID[templateID], s)
        const index = templateList.findIndex(t => t.id === templateID)
        templateList.splice(index, 1);
        delete s.templatesByID[templateID];
        return s;
    })

    save();

    return true;
}

function updateTemplate(template: SerializedComfyBoxTemplate): boolean {
    const state = get(store);
    if (!state.templatesByID[template.id]) {
        return false;
    }

    store.update(s => {
        const oldId = template.id
        const templateList = getTemplateList(template, s)
        const index = templateList.findIndex(t => t.id === oldId)
        templateList.splice(index, 1);
        delete s.templatesByID[oldId];

        template.id = uuidv4();

        templateList.push(template);
        s.templatesByID[template.id] = template;
        return s;
    })

    save();

    return true;
}

function save() {
    const json = JSON.stringify(get(store).userTemplates)
    localStorage.setItem("templates", json)
    store.set(get(store))
}

function load(builtInTemplates: SerializedComfyBoxTemplate[]) {
    store.update(s => {
        s.userTemplates = []
        s.templatesByID = {}

        for (const t of builtInTemplates) {
            t.isBuiltIn = true;
            s.templatesByID[t.id] = t;
        }

        s.builtInTemplates = builtInTemplates;

        return s
    })

    const json = localStorage.getItem("templates")
    if (!json) {
        console.info("No templates in local storage, creating store")
        save();
        return;
    }

    const data = JSON.parse(json) as SerializedComfyBoxTemplate[];
    if (Array.isArray(data)) {
        const templatesByID: Record<UUID, SerializedComfyBoxTemplate> =
            data.map(t => {
                t.isBuiltIn = false;
                return [t.id, t]
            }).reduce((dict, el: [UUID, SerializedComfyBoxTemplate]) => (dict[el[0]] = el[1], dict), {})

        store.update(s => {
            s.userTemplates = data
            s.templatesByID = { ...s.templatesByID, ...templatesByID }
            return s;
        })
    }
}

const templateStateStore: WritableTemplateStateStore =
{
    ...store,
    getAllTemplates,
    addTemplate,
    removeTemplate,
    updateTemplate,
    save,
    load
}
export default templateStateStore;
