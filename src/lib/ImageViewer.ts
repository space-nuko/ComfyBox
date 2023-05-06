export class ImageViewer {
    root: HTMLDivElement;
    lightboxModal: HTMLDivElement;
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

    static selected_gallery_button(gallery: HTMLDivElement): HTMLButtonElement | null {
        var allCurrentButtons = gallery.querySelectorAll('.preview > .thumbnails > .thumbnail-item.thumbnail-small.selected');
        var visibleCurrentButton = null;
        allCurrentButtons.forEach((elem) => {
            if (elem.parentElement.offsetParent) {
                visibleCurrentButton = elem;
            }
        })
        return visibleCurrentButton;
    }

    showModal(event: Event) {
        const source = (event.target || event.srcElement) as HTMLImageElement;
        const galleryElem = source.closest<HTMLDivElement>("div.block")
        console.debug("[ImageViewer] showModal", event, source, galleryElem);
        if (!galleryElem || ImageViewer.all_gallery_buttons(galleryElem).length === 0) {
            console.error("No buttons found on gallery element!", galleryElem)
            return;
        }
        this.currentGallery = galleryElem;
        this.modalImage.src = source.src
        if (this.modalImage.style.display === 'none') {
            this.lightboxModal.style.setProperty('background-image', 'url(' + source.src + ')');
        }
        this.lightboxModal.style.display = "flex";
        setTimeout(() => {
            this.modalImage.focus()
        }, 200)

        event.stopPropagation()
    }

    static negmod(n: number, m: number) {
        return ((n % m) + m) % m;
    }

    updateOnBackgroundChange() {
        const modalImage = this.modalImage
        if (modalImage && modalImage.offsetParent && this.currentGallery) {
            let currentButton = ImageViewer.selected_gallery_button(this.currentGallery);

            if (currentButton?.children?.length > 0 && modalImage.src != currentButton.children[0].src) {
                modalImage.src = currentButton.children[0].src;
                if (modalImage.style.display === 'none') {
                    this.lightboxModal.style.setProperty('background-image', `url(${modalImage.src})`)
                }
            }
        }
    }

    modalImageSwitch(offset: number) {
        if (!this.currentGallery)
            return

        var galleryButtons = ImageViewer.all_gallery_buttons(this.currentGallery);

        if (galleryButtons.length > 1) {
            var currentButton = ImageViewer.selected_gallery_button(this.currentGallery);

            var result = -1
            galleryButtons.forEach((v, i) => {
                if (v == currentButton) {
                    result = i
                }
            })

            if (result != -1) {
                const nextButton = galleryButtons[ImageViewer.negmod((result + offset), galleryButtons.length)]
                nextButton.click()
                const modalImage = this.modalImage;
                const modal = this.lightboxModal
                modalImage.src = nextButton.children[0].src;
                if (modalImage.style.display === 'none') {
                    modal.style.setProperty('background-image', `url(${modalImage.src})`)
                }
                setTimeout(() => { modal.focus() }, 10)
            }
        }
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

    setupImageForLightbox(e: HTMLImageElement) {
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
            this.showModal(evt)
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
        const modalImage = this.modalImage
        const modal = this.lightboxModal
        const isTiling = modalImage.style.display === 'none';
        if (isTiling) {
            modalImage.style.display = 'block';
            modal.style.setProperty('background-image', 'none')
        } else {
            modalImage.style.display = 'none';
            modal.style.setProperty('background-image', `url(${modalImage.src})`)
        }

        event.stopPropagation()
    }
}
