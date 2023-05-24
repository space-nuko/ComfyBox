import type { SerializedComfyBoxTemplate } from '$lib/ComfyBoxTemplate';
import type { UUID } from '@litegraph-ts/core';
import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';

export type TemplateState = {
    templates: SerializedComfyBoxTemplate[]
    templatesByID: Record<UUID, SerializedComfyBoxTemplate>
}

type TemplateStateOps = {
    save: () => void,
    load: () => void,
    add: (template: SerializedComfyBoxTemplate) => boolean,
    remove: (templateID: UUID) => boolean,
}

export type WritableTemplateStateStore = Writable<TemplateState> & TemplateStateOps;
const store: Writable<TemplateState> = writable(
    {
        templates: [],
        templatesByID: {}
    })

function add(template: SerializedComfyBoxTemplate): boolean {
    const state = get(store);
    if (state.templatesByID[template.id]) {
        return false;
    }

    store.update(s => {
        s.templates.push(template);
        s.templatesByID[template.id] = template;
        return s;
    })

    save();

    return true;
}

function remove(templateID: UUID): boolean {
    const state = get(store);
    if (!state.templatesByID[templateID]) {
        return false;
    }

    store.update(s => {
        const index = s.templates.findIndex(t => t.id === templateID)
        s.templates.splice(index, 1);
        delete s.templatesByID[templateID];
        return s;
    })

    save();

    return true;
}

function save() {
    const json = JSON.stringify(get(store).templates)
    localStorage.setItem("templates", json)
    store.set(get(store))
}

function load() {
    const json = localStorage.getItem("templates")
    if (!json) {
        console.info("No templates in local storage, creating store")
        save();
        return;
    }

    const data = JSON.parse(json) as SerializedComfyBoxTemplate[];
    if (Array.isArray(data)) {
        const templatesByID: Record<UUID, SerializedComfyBoxTemplate> =
            data.map(d => [d.id, d])
                .reduce((dict, el: [UUID, SerializedComfyBoxTemplate]) => (dict[el[0]] = el[1], dict), {})

        store.set({
            templates: data,
            templatesByID
        })
    }
    else {
        store.set({
            templates: [],
            templatesByID: {}
        })
    }
}

const templateStateStore: WritableTemplateStateStore =
{
    ...store,
    add,
    remove,
    save,
    load,
}
export default templateStateStore;
