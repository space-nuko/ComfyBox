import { negmod } from "./utils";

export class ImageViewer {
    root: HTMLDivElement;
    lightboxModal: HTMLDivElement;
    currentImages: string[] = []
    selectedIndex: number = -1;
    currentGallery: HTMLDivElement | null = null;
    private static _instance: ImageViewer;

    static get instance(): ImageViewer {
        if (!ImageViewer._instance)
            ImageViewer._instance = new ImageViewer((window as any).app.rootEl)
        return ImageViewer._instance
    }

    get modalImage(): HTMLImageElement | null {
        return this.root.querySelector<HTMLImageElement>("#modalImage");
    }

    constructor(root: HTMLDivElement) {
        this.root = root;
        this.lightboxModal = this.root.querySelector<HTMLDivElement>("#lightboxModal");
    }

    // A full size 'lightbox' preview modal shown when left clicking on gallery previews
    closeModal() {
        this.lightboxModal.style.display = "none";
        this.currentImages = []
        this.selectedIndex = -1;
        this.currentGallery = null;
    }

    static all_gallery_buttons(gallery: HTMLDivElement): HTMLButtonElement[] {
        var allGalleryButtons = gallery.querySelectorAll('.preview > .thumbnails > .thumbnail-item.thumbnail-small');
        var visibleGalleryButtons = [];
        allGalleryButtons.forEach((elem) => {
            if (elem.parentElement.offsetParent) {
                visibleGalleryButtons.push(elem);
            }
        })
        return visibleGalleryButtons;
    }

    static selected_gallery_button(gallery: HTMLDivElement): [HTMLButtonElement | null, number] {
        var allCurrentButtons = gallery.querySelectorAll('.preview > .thumbnails > .thumbnail-item.thumbnail-small');
        console.log(allCurrentButtons)
        var visibleCurrentButton = null;
        let index = -1;
        allCurrentButtons.forEach((elem, i) => {
            if (elem.parentElement.offsetParent && elem.classList.contains("selected")) {
                visibleCurrentButton = elem;
                index = i;
            }
        })
        return [visibleCurrentButton, index];
    }

    showModal(imageUrls: string[], index: number, galleryElem?: HTMLDivElement) {
        this.currentImages = imageUrls
        this.selectedIndex = index
        this.currentGallery = galleryElem;
        this.setModalImageSrc(imageUrls[index])
        this.lightboxModal.style.display = "flex";
        setTimeout(() => {
            this.modalImage.focus()
        }, 200)
    }

    static get_gallery_urls(galleryElem: HTMLDivElement): string[] {
        return ImageViewer.all_gallery_buttons(galleryElem)
            .map(b => (b.children[0] as HTMLImageElement).src)
    }

    refreshImages() {
        if (this.currentGallery) {
            this.currentImages = ImageViewer.get_gallery_urls(this.currentGallery)
            let [_currentButton, index] = ImageViewer.selected_gallery_button(this.currentGallery);
            this.selectedIndex = index;
        }

        const selectedImageUrl = this.currentImages[this.selectedIndex];
        this.setModalImageSrc(selectedImageUrl)
    }

    private setModalImageSrc(src: string, isTiling: boolean = false) {
        const modalImage = this.modalImage
        const modal = this.lightboxModal
        modalImage.src = src;
        if (isTiling) {
            modalImage.style.display = 'none';
            modal.style.setProperty('background-image', `url(${modalImage.src})`)
        } else {
            modalImage.style.display = 'block';
            modal.style.setProperty('background-image', 'none')
        }
    }

    modalImageSwitch(offset: number) {
        this.selectedIndex = negmod(this.selectedIndex + offset, this.currentImages.length);
        const selectedImageUrl = this.currentImages[this.selectedIndex];

        this.setModalImageSrc(selectedImageUrl)

        if (this.currentGallery) {
            const galleryButtons = ImageViewer.all_gallery_buttons(this.currentGallery);
            const nextButton = galleryButtons[this.selectedIndex];
            if (nextButton) {
                nextButton.click()
            }
        }

        setTimeout(() => { this.lightboxModal.focus() }, 10)
    }

    modalNextImage(event) {
        this.modalImageSwitch(1)
        event.stopPropagation()
    }

    modalPrevImage(event) {
        this.modalImageSwitch(-1)
        event.stopPropagation()
    }

    modalKeyHandler(event) {
        switch (event.key) {
            case "ArrowLeft":
                this.modalPrevImage(event)
                break;
            case "ArrowRight":
                this.modalNextImage(event)
                break;
            case "Escape":
                this.closeModal();
                break;
        }
    }

    setupGalleryImageForLightbox(e: HTMLImageElement) {
        if (e.dataset.modded === "true")
            return;

        e.dataset.modded = "true";
        e.style.cursor = 'pointer'
        e.style.userSelect = 'none'

        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

        // For Firefox, listening on click first switched to next image then shows the lightbox.
        // If you know how to fix this without switching to mousedown event, please.
        // For other browsers the event is click to make it possiblr to drag picture.
        var event = isFirefox ? 'mousedown' : 'click'

        e.addEventListener(event, (evt) => {
            // if (!opts.js_modal_lightbox || evt.button != 0) return;

            const initiallyZoomed = true
            this.modalZoomSet(this.modalImage, initiallyZoomed)
            evt.preventDefault()

            const source = evt.target as HTMLImageElement;

            const galleryElem = source.closest<HTMLDivElement>("div.block")
            console.debug("[ImageViewer] showModal", event, source, galleryElem);
            if (!galleryElem || ImageViewer.all_gallery_buttons(galleryElem).length === 0) {
                console.error("No buttons found on gallery element!", galleryElem)
                return;
            }

            let urls = ImageViewer.get_gallery_urls(galleryElem)
            const [_currentButton, index] = ImageViewer.selected_gallery_button(galleryElem)
            console.warn("Gallery!", index, urls, galleryElem)

            this.showModal(urls, index, galleryElem)
            evt.stopPropagation();
        }, true);

    }

    modalZoomSet(modalImage: HTMLImageElement, enable: boolean) {
        if (enable) {
            modalImage.classList.add('modalImageFullscreen');
        } else {
            modalImage.classList.remove('modalImageFullscreen');
        }
    }

    modalZoomToggle(event: Event) {
        const modalImage = this.modalImage;
        this.modalZoomSet(modalImage, !modalImage.classList.contains('modalImageFullscreen'))
        event.stopPropagation()
    }

    modalTileImageToggle(event: Event) {
        const isTiling = this.modalImage.style.display === 'none';
        this.setModalImageSrc(this.modalImage.src, isTiling)
        event.stopPropagation()
    }
}
