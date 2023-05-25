<script lang="ts">
 import { setContext, createEventDispatcher } from 'svelte';
 import { key } from './menu.ts';

 import { offset, flip, shift } from "svelte-floating-ui/dom";
 import { createFloatingActions, type ClientRectObject, type VirtualElement } from "svelte-floating-ui";
	import { writable, type Writable } from 'svelte/store';

 const [floatingRef, floatingContent] = createFloatingActions({
     placement: "right-start",
     strategy: "fixed",
     middleware: [
         offset({ mainAxis: 5, alignmentAxis: 4 }),
         flip({
             fallbackPlacements: ["left-start"]
         }),
         shift({ padding: 10 })
     ],
 });


 export let x;
 export let y;

 // whenever x and y is changed, restrict box to be within bounds
 $: (() => {
     if (!menuEl) return;

     const rect = menuEl.getBoundingClientRect();
     x = Math.min(window.innerWidth - rect.width, x);
     if (y > window.innerHeight - rect.height) y -= rect.height;
 })();

 const dispatch = createEventDispatcher();

 setContext(key, {
     dispatchClick: () => dispatch('click')
 });

 let menuEl;
 function onPageClick(e) {
     if (e.target === menuEl || menuEl.contains(e.target)) return;
     dispatch('clickoutside');
 }


 let getBoundingClientRect: () => ClientRectObject;

  $: getBoundingClientRect = (): ClientRectObject => {
    return {
      x,
      y,
      top: y,
      left: x,
      bottom: y,
      right: x,
      width: 0,
      height: 0
    }
  }

  const virtualElement: Writable<VirtualElement> = writable({ getBoundingClientRect })

  $: virtualElement.set({ getBoundingClientRect })

  floatingRef(virtualElement)
</script>

<svelte:body on:click={onPageClick} />
<div class="menu" bind:this={menuEl} style="top: {y}px; left: {x}px;" use:floatingContent>
    <slot />
</div>

<style>
 .menu {
     z-index: var(--layer-top);
     position: absolute;
     display: grid;
     border: 1px solid #0003;
     box-shadow: 2px 2px 5px 0px #0002;
     background: white;
 }
</style>
