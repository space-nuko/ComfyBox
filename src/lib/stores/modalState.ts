import type { SvelteComponentDev } from "svelte/internal";
import { get, writable, type Writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

export type ModalState = Record<string, any>;

export type ModalButton = {
    name: string,
    variant: "primary" | "secondary",
    onClick: (state: ModalData) => boolean | void,
    disabled?: boolean,
    closeOnClick?: boolean
}
export interface ModalData {
    id: string,
    title?: string,
    onClose?: (modal: ModalState) => void,
    svelteComponent?: typeof SvelteComponentDev,
    svelteProps: Record<string, any>,
    buttons: ModalButton[],
    showCloseButton: boolean,
    closeOnClick: boolean,
    state: Writable<ModalState>,
    close: () => void,
}
export interface ModalStates {
    activeModals: ModalData[]
}

export interface ModalStateOps {
    pushModal: (data: Partial<ModalData>) => void,
    closeModal: (id: string) => void,
    closeAllModals: () => void,
}

export type WritableModalStateStore = Writable<ModalStates> & ModalStateOps;
const store: Writable<ModalStates> = writable(
    {
        activeModals: []
    })

function pushModal(data: Partial<ModalData>) {
    const id = uuidv4()
    const modal: ModalData = {
        showCloseButton: true,
        closeOnClick: true,
        buttons: [],
        svelteProps: {},
        state: writable({}),
        ...data,
        id,
        close: () => closeModal(id)
    }

    store.update(s => {
        s.activeModals.push(modal);
        return s;
    })
}

function closeModal(id: string) {
    const modal = get(store).activeModals.find(m => m.id === id);
    if (modal == null)
        return;

    store.update(s => {
        if (modal.onClose)
            modal.onClose(modal)
        s.activeModals = s.activeModals.filter(m => m.id !== id)
        return s;
    })
}

function closeAllModals() {
    store.set({ activeModals: [] })
}

const modalStateStore: WritableModalStateStore =
{
    ...store,
    pushModal,
    closeModal,
    closeAllModals
}
export default modalStateStore;
