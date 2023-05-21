<script lang="ts">
	import { getContext, onMount, createEventDispatcher, tick } from "svelte";
	import { TABS } from "./Sidebar.svelte";
	import Column from "$lib/components/gradio/app/Column.svelte"
	import type { SelectData } from "@gradio/utils";
	import { SvelteComponentDev } from "svelte/internal";

	export let elem_id: string = "";
	export let elem_classes: Array<string> = [];
	export let name: string;
	export let id: string | number | object = {};
    export let icon: typeof SvelteComponentDev | null = null;

	const dispatch = createEventDispatcher<{ select: SelectData }>();

	const { register_tab, unregister_tab, selected_tab, selected_tab_index } =
		getContext(TABS) as any;

	let tab_index = register_tab({ name, id, icon });

	onMount(() => {
		return () => unregister_tab({ name, id, icon });
	});

	$: $selected_tab_index === tab_index &&
		tick().then(() => dispatch("select", { value: name, index: tab_index }));
</script>

<div
	id={elem_id}
	class="sidebar-item {elem_classes.join(' ')}"
	style:display={$selected_tab === id ? "block" : "none"}
>
	<div style:height="100%">
		<slot />
	</div>
</div>

<style>
	div {
		position: relative;
	}

 .sidebar-item {
     width: calc(100% - 4rem);
     height: 100%;
 }
</style>
