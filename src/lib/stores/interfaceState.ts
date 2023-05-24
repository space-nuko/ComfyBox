import { debounce } from '$lib/utils';
import { get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';

export type InterfaceState = {
    // Show a large indicator of the currently editing number value for mobile
    // use (sliders).
    pointerNearTop: boolean,
    pointerNearLeft: boolean,
    showIndicator: boolean,
    indicatorValue: any,

    graphTransitioning: boolean
}

type InterfaceStateOps = {
    showIndicator: (pointerX: number, pointerY: number, value: any) => void,
}

export type WritableInterfaceStateStore = Writable<InterfaceState> & InterfaceStateOps;
const store: Writable<InterfaceState> = writable(
    {
        pointerNearTop: false,
        pointerNearLeft: false,
        showIndicator: false,
        indicatorValue: null,

        graphTransitioning: false
    })

const debounceDrag = debounce(() => { store.update(s => { s.showIndicator = false; return s }) }, 1000)

function showIndicator(pointerX: number, pointerY: number, value: any) {
    if (!window)
        return;

    const state = get(store)

    let middleWidth = window.innerWidth / 2;
    let middleHeight = window.innerHeight / 2;
    const pointerNearLeft = pointerX < middleWidth;
    const pointerNearTop = pointerY < middleHeight;
    store.update(s => { return { ...s, pointerNearTop, pointerNearLeft, showIndicator: true, indicatorValue: value } });
    debounceDrag();
}

const interfaceStateStore: WritableInterfaceStateStore =
{
    ...store,
    showIndicator
}
export default interfaceStateStore;
