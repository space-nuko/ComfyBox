<script lang="ts">
 import { ImageViewer } from "$lib/ImageViewer";

 function toggleZoom(e: Event) {
     ImageViewer.instance.modalZoomToggle(e);
 }

 function previewTiling(e: Event) {
     ImageViewer.instance.modalTileImageToggle(e);
 }

 function closeModal(e: Event) {
     ImageViewer.instance.closeModal();
 }

 function handleKey(e: KeyboardEvent) {
     ImageViewer.instance.modalKeyHandler(e);
 }

 function prevImage(e: Event) {
     ImageViewer.instance.modalPrevImage(e);
 }

 function nextImage(e: Event) {
     ImageViewer.instance.modalNextImage(e);
 }
</script>

<div id="lightboxModal" on:keydown={handleKey} on:click={closeModal}>
    <div class="modalControls gradio-container" on:keydown={handleKey}>
        <span class="modalZoom cursor" title="Toggle zoomed view" on:click={toggleZoom} on:keydown={handleKey}>&#10529;</span>
        <span class="modalTileImage cursor" title="Preview tiling" on:click={previewTiling} on:keydown={handleKey}>&#8862;</span>
        <span class="modalClose cursor" title="Close image viewer" on:click={closeModal} on:keydown={handleKey}>&times;</span>
    </div>
    <img id="modalImage" alt="Modal" tabIndex="0" on:keydown={handleKey}>
    <a class="modalPrev" href="#" tabIndex="0" on:click={prevImage} on:keydown={handleKey}>&#10094</a>
    <a class="modalNext" href="#" tabIndex="0" on:click={nextImage} on:keydown={handleKey}>&#10095</a>
</div>

<style>
 #lightboxModal{
     display: none;
     position: fixed;
     z-index: var(--layer-top);
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     overflow: auto;
     background-color: rgba(20, 20, 20, 0.95);
     flex-direction: column;
 }

 #modalImage {
     overflow: hidden;
     user-drag: none;
 }

 .modalControls {
     display: flex;
     gap: 1em;
     padding: 1em;
     background-color: rgba(0,0,0,0.2);
 }
 .modalClose {
     margin-left: auto;
 }
 .modalControls span{
     color: white;
     font-size: 35px;
     font-weight: bold;
     cursor: pointer;
     width: 1em;
 }

 .modalControls span:hover, .modalControls span:focus{
     color: #999;
     text-decoration: none;
 }

 #lightboxModal > img {
     display: block;
     margin: auto;
     width: auto;
 }

 #lightboxModal > img.modalImageFullscreen{
     object-fit: contain;
     height: 100%;
 }

 .modalPrev,
 .modalNext {
     cursor: pointer;
     position: absolute;
     top: 50%;
     width: auto;
     padding: 60px;
     margin-top: -50px;
     color: white;
     font-weight: bold;
     font-size: 40px;
     transition: 0.3s ease;
     border-radius: 0 3px 3px 0;
     user-select: none;
     -webkit-user-select: none;
 }

 .modalNext {
     right: 0;
     border-radius: 3px 0 0 3px;
 }

 .modalPrev:hover,
 .modalNext:hover {
     background-color: rgba(180, 180, 180, 0.8);
 }
</style>
