<script lang="ts">
 import modalState, { type ModalButton, type ModalData } from "$lib/stores/modalState";
 import { Button } from "@gradio/button";
 import Modal from "./Modal.svelte";

 function onClose(modal: ModalData | null) {
     if (modal == null)
         return;

     if (modal.onClose)
         modal.onClose()

     modalState.closeModal(modal.id)
 }

 function onButtonClicked(button: ModalButton, closeDialog: Function) {
     button.onClick();

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
            {#if modal != null && modal.svelteComponent != null}
                <svelte:component this={modal.svelteComponent} {...modal.svelteProps}/>
            {/if}
        </svelte:fragment>
        <div slot="buttons" class="buttons" let:closeDialog>
            {#if modal != null && modal.buttons?.length > 0}
                {#each modal.buttons as button}
                    <Button variant={button.variant} on:click={() => onButtonClicked(button, closeDialog)}>
                        {button.name}
                    </Button>
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
     gap: var(--spacing-sm);
 }
</style>
