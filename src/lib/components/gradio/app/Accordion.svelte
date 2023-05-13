<script lang="ts">
	import { createEventDispatcher } from "svelte";
	export let label: string = "";
	export let open: boolean = true;

	const dispatch = createEventDispatcher<{
		click: boolean;
	}>();

 function handleClick() {
     open = !open;
     dispatch("click", open);
 }
</script>

<div class="label-wrap" on:click={handleClick} class:open>
	<span>{label}</span>
	<span style:transform={open ? "rotate(0)" : "rotate(90deg)"} class="icon">
		▼
	</span>
</div>
<div style:display={open ? "block" : "none"}>
	<slot />
</div>

<style>
	span {
		font-weight: var(--section-header-text-weight);
		font-size: var(--section-header-text-size);
	}
	.label-wrap {
		display: flex;
		justify-content: space-between;
		cursor: pointer;
		width: var(--size-full);
	}
	.label-wrap.open {
		margin-bottom: var(--size-2);
	}

	.icon {
		transition: 150ms;
	}
</style>
