<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	const dispatch = createEventDispatcher<{
		close: undefined;
	}>();

	$: if (dialog && showModal) dialog.showModal();

 function close() {
     dialog.close();
     dispatch("close")
 }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={close}
	on:click|self={close}
>
	<div on:click|stopPropagation>
		<slot name="header" />
		<slot />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={close}>Close</button>
	</div>
</dialog>

<style>
	dialog {
		max-width: 75vw;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
