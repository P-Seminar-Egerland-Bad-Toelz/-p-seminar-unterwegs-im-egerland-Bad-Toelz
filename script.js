javascript
document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
});

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', isOpen);
    });
}


/* =====================================================
   FOTOGALERIE – LIGHTBOX
===================================================== */

const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");

const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let currentImage = 0;


/* =====================================================
   BILD ÖFFNEN
===================================================== */

function openLightbox(index) {

    if (!galleryItems.length || !lightbox) return;

    currentImage = index;

    lightboxImage.src = galleryItems[currentImage].src;
    lightboxImage.alt = galleryItems[currentImage].alt;

    lightboxCaption.textContent = galleryItems[currentImage].alt;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


/* =====================================================
   BILD SCHLIESSEN
===================================================== */

function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


/* =====================================================
   VORHERIGES BILD
===================================================== */

function showPrevious() {

    currentImage--;

    if (currentImage < 0) {
        currentImage = galleryItems.length - 1;
    }

    openLightbox(currentImage);
}


/* =====================================================
   NÄCHSTES BILD
===================================================== */

function showNext() {

    currentImage++;

    if (currentImage >= galleryItems.length) {
        currentImage = 0;
    }

    openLightbox(currentImage);
}


/* =====================================================
   KLICK AUF BILDER
===================================================== */

galleryItems.forEach((image, index) => {

    image.addEventListener("click", () => {
        openLightbox(index);
    });

});


/* =====================================================
   BUTTONS
===================================================== */

if (lightbox && lightboxClose && lightboxPrev && lightboxNext) {

    lightboxClose.addEventListener("click", closeLightbox);

    lightboxPrev.addEventListener("click", showPrevious);

    lightboxNext.addEventListener("click", showNext);


    /* Klick auf dunklen Hintergrund */

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

}


/* =====================================================
   TASTATUR-STEUERUNG
===================================================== */

document.addEventListener("keydown", (event) => {

    if (!lightbox || !lightbox.classList.contains("open")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showPrevious();
    }

    if (event.key === "ArrowRight") {
        showNext();
    }

});
