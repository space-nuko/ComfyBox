import { type ContainerLayout, type IDragItem, type WritableLayoutStateStore } from "$lib/stores/layoutStates"

export function handleContainerConsider(layoutState: WritableLayoutStateStore, container: ContainerLayout, evt: CustomEvent<DndEvent<IDragItem>>): IDragItem[] {
    return layoutState.updateChildren(container, evt.detail.items)
};

export function handleContainerFinalize(layoutState: WritableLayoutStateStore, container: ContainerLayout, evt: CustomEvent<DndEvent<IDragItem>>): IDragItem[] {
    const dnd = evt.detail
    const info = dnd.info;
    const droppedItem = dnd.items.find(i => i.id === info.id);
    const isDroppingTemplate = droppedItem?.type === "template"

    if (isDroppingTemplate) {
        return layoutState.updateChildren(container, dnd.items.filter(i => i.id !== info.id));
    }
    else {
        return layoutState.updateChildren(container, dnd.items)
    }
};
