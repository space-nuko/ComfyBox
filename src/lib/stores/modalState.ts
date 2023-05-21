import type { SvelteComponentDev } from "svelte/internal";
import { writable, type Writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

export type ModalButton = {
    name: string,
    variant: "primary" | "secondary",
    onClick: () => void,
    closeOnClick?: boolean
}
export interface ModalData {
    id: string,
    title?: string,
    onClose?: () => void,
    svelteComponent?: typeof SvelteComponentDev,
    svelteProps: Record<string, any>,
    buttons: ModalButton[],
    showCloseButton: boolean,
    closeOnClick: boolean
}
export interface ModalState {
    activeModals: ModalData[]
}

export interface ModalStateOps {
    pushModal: (data: Partial<ModalData>) => void,
    closeModal: (id: string) => void,
    closeAllModals: () => void,
}

export type WritableModalStateStore = Writable<ModalState> & ModalStateOps;
const store: Writable<ModalState> = writable(
    {
        activeModals: []
    })

function pushModal(data: Partial<ModalData>) {
    const modal: ModalData = {
        showCloseButton: true,
        closeOnClick: true,
        buttons: [],
        svelteProps: {},
        ...data,
        id: uuidv4(),
    }

    store.update(s => {
        s.activeModals.push(modal);
        return s;
    })
}

function closeModal(id: string) {
    store.update(s => {
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
