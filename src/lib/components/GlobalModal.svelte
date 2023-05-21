<script lang="ts">
 import modalState, { type ModalData } from "$lib/stores/modalState";
 import { Button } from "@gradio/button";
 import Modal from "./Modal.svelte";

 function onClose(modal: ModalData | null) {
     if (modal == null)
         return;

     if (modal.onClose)
         modal.onClose()

     modalState.closeModal(modal.id)
 }
</script>

{#each $modalState.activeModals as modal(modal.id)}
    <Modal showModal={true} on:close={() => onClose(modal)}>
        <div slot="header" class="modal-header">
            {#if modal != null}
                <h1 style="padding-bottom: 1rem;">{modal.title}</h1>
            {/if}
        </div>
        <svelte:fragment>
            {#if modal != null && modal.svelteComponent != null}
                <svelte:component this={modal.svelteComponent} {...modal.svelteProps}/>
            {/if}
        </svelte:fragment>
        <div slot="buttons" let:closeDialog>
            {#if modal != null && modal.buttons?.length > 0}
                {#each modal.buttons as button}
                    <Button variant={button.variant} on:click={button.onClick}>
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
