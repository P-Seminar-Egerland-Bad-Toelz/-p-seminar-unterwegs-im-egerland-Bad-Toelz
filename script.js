/* =====================================================
   JAHR
===================================================== */

document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
});


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {

    menuButton.addEventListener('click', () => {

        const isOpen = navigation.classList.toggle('open');

        menuButton.setAttribute(
            'aria-expanded',
            isOpen
        );

    });

}


/* =====================================================
   FOTOGALERIE – LIGHTBOX
===================================================== */

const galleryItems = document.querySelectorAll(
    ".gallery-item img"
);

const lightbox = document.getElementById(
    "lightbox"
);

const lightboxImage = document.getElementById(
    "lightbox-image"
);

const lightboxCaption = document.getElementById(
    "lightbox-caption"
);

const lightboxClose = document.querySelector(
    ".lightbox-close"
);

const lightboxPrev = document.querySelector(
    ".lightbox-prev"
);

const lightboxNext = document.querySelector(
    ".lightbox-next"
);

let currentImage = 0;


/* =====================================================
   BILD ÖFFNEN
===================================================== */

function openLightbox(index) {

    if (!galleryItems.length || !lightbox) {
        return;
    }

    currentImage = index;

    const image = galleryItems[currentImage];

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxCaption.textContent = image.alt;

    lightbox.classList.add("open");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";
}


/* =====================================================
   BILD SCHLIESSEN
===================================================== */

function closeLightbox() {

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* =====================================================
   VORHERIGES BILD
===================================================== */

function showPrevious() {

    currentImage--;

    if (currentImage < 0) {

        currentImage =
            galleryItems.length - 1;

    }

    openLightbox(currentImage);
}


/* =====================================================
   NÄCHSTES BILD
===================================================== */

function showNext() {

    currentImage++;

    if (
        currentImage >=
        galleryItems.length
    ) {

        currentImage = 0;

    }

    openLightbox(currentImage);
}


/* =====================================================
   KLICK AUF BILDER
===================================================== */

galleryItems.forEach((image, index) => {

    image.addEventListener(
        "click",
        () => {
            openLightbox(index);
        }
    );

});


/* =====================================================
   BUTTONS
===================================================== */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}

if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        showPrevious
    );

}

if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        showNext
    );

}


/* =====================================================
   HINTERGRUND KLICK
===================================================== */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/* =====================================================
   TASTATUR
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !lightbox ||
            !lightbox.classList.contains("open")
        ) {
            return;
        }

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowLeft") {

            showPrevious();

        }

        if (event.key === "ArrowRight") {

            showNext();

        }

    }
);
