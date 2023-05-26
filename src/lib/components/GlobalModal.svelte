<script lang="ts">
 import modalState, { type ModalButton, type ModalData } from "$lib/stores/modalState";
 import { Button } from "@gradio/button";
 import Modal from "./Modal.svelte";
	import { SvelteComponentDev } from "svelte/internal";
	import { get } from "svelte/store";

 function onClose(modal: ModalData | null) {
     if (modal == null)
         return;

     modalState.closeModal(modal.id)
 }

 function onButtonClicked(modal: ModalData, button: ModalButton, closeDialog: Function) {
     if (button.disabled || button.hidden)
         return;

     if (button.onClick(modal) === false)
         return

     if (button.closeOnClick !== false) {
         closeDialog()
     }
 }
</script>

{#each $modalState.activeModals as modal(modal.id)}
    <Modal showModal={true} closeOnClick={modal.closeOnClick} on:close={() => onClose(modal)}>
        <div slot="header" class="modal-header">
            {#if modal != null && modal.title != null}
                <h1 style="padding-bottom: 1rem;">{modal.title}</h1>
            {/if}
        </div>
        <svelte:fragment>
            <div class="modal-body">
                {#if modal != null && modal.svelteComponent != null}
                    <svelte:component this={modal.svelteComponent} {...modal.svelteProps} _modal={modal}/>
                {/if}
            </div>
        </svelte:fragment>
        <div slot="buttons" class="buttons" let:closeDialog>
            {#if modal != null && modal.buttons?.length > 0}
                {#each modal.buttons as button}
                    {#if !button.hidden}
                        <Button variant={button.variant} disabled={button.disabled} on:click={() => onButtonClicked(modal, button, closeDialog)}>
                            {button.name}
                        </Button>
                    {/if}
                {/each}
            {/if}
            {#if modal.showCloseButton}
                <Button variant="secondary" on:click={closeDialog}>
                    Close
                </Button>
            {/if}
        </div>
    </Modal>
{/each}

<style lang="scss">
 .buttons {
     display: flex;
     flex-direction: row;
     gap: var(--spacing-md);
 }

 .modal-body {
     overflow: auto;
 }
</style>
