<script lang="ts">
	import { Button } from "@gradio/button";
	import { createEventDispatcher } from "svelte";

	export let showModal; // boolean
	export let closeOnClick = true; // boolean
    export const closeDialog = () => doClose();

	let dialog; // HTMLDialogElement

	const dispatch = createEventDispatcher<{
		close: undefined;
	}>();

	$: if (dialog && showModal) dialog.showModal();

 function close(e: Event) {
     if (!closeOnClick) {
         e.preventDefault();
         e.stopPropagation();
         return false
     }

     doClose()
 }

 function doClose() {
     showModal = false;
     dialog.close();
     dispatch("close")
 }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
    bind:this={dialog}
    on:close={close}
    on:cancel={doClose}
    on:click|self={close}
>
    <div on:click|stopPropagation>
        <slot name="header" />
        <slot {closeDialog} />
        <div class="button-row">
            <slot name="buttons" {closeDialog}>
                <!-- svelte-ignore a11y-autofocus -->
                <Button variant="secondary" on:click={doClose}>Close</Button>
            </slot>
        </div>
    </div>
</dialog>

<style lang="scss">
	dialog {
		max-width: 75vw;
		border-radius: 0.2em;
		border: none;
		padding: 0;
        overflow: hidden;
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

 .button-row {
     display: flex;
     flex-direction: row;
     padding-top: 0.5em;
 }

 .button-row, .buttons {
     gap: var(--spacing-sm);
 }
</style>
