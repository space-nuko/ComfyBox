<script context="module">
 export const TABS = {};
</script>

<script lang="ts">
 import { setContext, createEventDispatcher } from "svelte";
 import { writable } from "svelte/store";
 import type { SelectData } from "@gradio/utils";
 import { SvelteComponentDev } from "svelte/internal";

 interface Tab {
     name: string;
     id: object;
     icon: typeof SvelteComponentDev | null;
 }

 export let visible: boolean = true;
 export let elem_id: string = "id";
 export let elem_classes: Array<string> = [];
 export let selected: number | string | object;

 let tabs: Array<Tab> = [];

 const selected_tab = writable<false | object | number | string>(false);
 const selected_tab_index = writable<number>(0);
 const dispatch = createEventDispatcher<{
     change: undefined;
     select: SelectData;
 }>();

 setContext(TABS, {
     register_tab: (tab: Tab) => {
         tabs.push({ name: tab.name, id: tab.id, icon: tab.icon });
         selected_tab.update((current) => current ?? tab.id);
         tabs = tabs;
         return tabs.length - 1;
     },
     unregister_tab: (tab: Tab) => {
         const i = tabs.findIndex((t) => t.id === tab.id);
         tabs.splice(i, 1);
         selected_tab.update((current) =>
             current === tab.id ? tabs[i]?.id || tabs[tabs.length - 1]?.id : current
         );
     },
     selected_tab,
     selected_tab_index
 });

 function change_tab(id: object | string | number) {
     selected = id;
     $selected_tab = id;
     $selected_tab_index = tabs.findIndex((t) => t.id === id);
     dispatch("change");
 }

 $: selected !== null && change_tab(selected);
</script>

<div class="sidebar {elem_classes.join(' ')}" class:hide={!visible} id={elem_id}>
    <div class="sidebar-nav scroll-hide">
        {#each tabs as t, i (t.id)}
            {#if t.id === $selected_tab}
                <button class="selected">
                    {#if t.icon !== null}
                        <svelte:component this={t.icon} width="100%" height="100%" strokeWidth={1.5} />
                    {:else}
                        {t.name}
                    {/if}
                </button>
            {:else}
                <button
                    on:click={() => {
                             change_tab(t.id);
                             dispatch("select", { value: t.name, index: i });
                             }}
                    >
                    {#if t.icon !== null}
                        <svelte:component this={t.icon} width="100%" height="100%" strokeWidth={1.5} />
                    {:else}
                        {t.name}
                    {/if}
                </button>
            {/if}
        {/each}
        <div class="sidebar-rest"/>
    </div>
    <slot />
</div>

<style lang="scss">
 .sidebar {
     background: var(--neutral-900);
     width: 100%;
     height: 100%;
     display: flex;
     flex-direction: row;
     float: left;
     top: 0px;
     padding: 0;
 }

 .hide {
     display: none;
 }

 .sidebar-nav, .sidebar-rest {
     display: flex;
     position: relative;
     flex-wrap: wrap;
     white-space: nowrap;
     width: 4rem;
     height: 100%;
     background: var(--neutral-800);

     > button {
         width: 4rem;
         height: 4rem;
         padding: 0.5rem;
         color: var(--neutral-600);
         border-right: 3px solid transparent;

         display: flex;
         flex-direction: column;
         justify-content: center;

         &:hover {
             background: var(--neutral-700);
             color: var(--neutral-500);
         }

         &.selected {
             background: var(--neutral-700);
             color: var(--neutral-300);
             border-right-color: var(--primary-500);
         }
     }
 }

 .sidebar-rest {
     height: 100%;
 }

 .bar {
     display: block;
     position: absolute;
     bottom: -2px;
     left: 0;
     z-index: 999;
     background: var(--background-fill-primary);
     width: 100%;
     height: 2px;
     content: "";
 }
</style>
