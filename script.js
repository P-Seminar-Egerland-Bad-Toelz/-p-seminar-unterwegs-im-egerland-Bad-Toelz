/* =====================================================
   ALLGEMEIN
===================================================== */

document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
});


/* =====================================================
   MOBILE MENÜ
===================================================== */

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('open');

        menuButton.setAttribute(
            'aria-expanded',
            isOpen ? 'true' : 'false'
        );
    });
}


/* =====================================================
   FOTOGALERIE – LIGHTBOX
===================================================== */

const galleryImages = Array.from(
    document.querySelectorAll('.gallery-item img')
);

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');

const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImage = 0;


/* =====================================================
   BILD ÖFFNEN
===================================================== */

function openLightbox(index) {

    if (!lightbox || !lightboxImage || galleryImages.length === 0) {
        return;
    }

    currentImage = index;

    const image = galleryImages[currentImage];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || '';

    if (lightboxCaption) {
        lightboxCaption.textContent = image.alt || '';
    }

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';
}


/* =====================================================
   BILD SCHLIESSEN
===================================================== */

function closeLightbox() {

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';
}


/* =====================================================
   VORHERIGES BILD
===================================================== */

function showPrevious() {

    if (galleryImages.length === 0) {
        return;
    }

    currentImage--;

    if (currentImage < 0) {
        currentImage = galleryImages.length - 1;
    }

    openLightbox(currentImage);
}


/* =====================================================
   NÄCHSTES BILD
===================================================== */

function showNext() {

    if (galleryImages.length === 0) {
        return;
    }

    currentImage++;

    if (currentImage >= galleryImages.length) {
        currentImage = 0;
    }

    openLightbox(currentImage);
}


/* =====================================================
   AUF BILD KLICKEN
===================================================== */

galleryImages.forEach((image, index) => {

    image.style.cursor = 'pointer';

    image.addEventListener('click', () => {
        openLightbox(index);
    });

});


/* =====================================================
   BUTTONS
===================================================== */

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevious);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', showNext);
}


/* =====================================================
   HINTERGRUND KLICKEN
===================================================== */

if (lightbox) {

    lightbox.addEventListener('click', (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

}


/* =====================================================
   TASTATUR
===================================================== */

document.addEventListener('keydown', (event) => {

    if (!lightbox || !lightbox.classList.contains('open')) {
        return;
    }

    if (event.key === 'Escape') {
        closeLightbox();
    }

    if (event.key === 'ArrowLeft') {
        showPrevious();
    }

    if (event.key === 'ArrowRight') {
        showNext();
    }

});
