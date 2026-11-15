/* Seitennavigation am Ende der Hauptseiten, in der Reihenfolge des Menüs. */
(() => {
    const links = Array.from(document.querySelectorAll('.main-nav a'));
    const currentPath = window.location.pathname.replace(/\/$/, '/index.html');
    const currentIndex = links.findIndex(link => new URL(link.href).pathname === currentPath);
    const footer = document.querySelector('.site-footer');
    if (currentIndex < 0 || !footer || document.querySelector('.page-next')) return;

    const isLastPage = currentIndex === links.length - 1;
    const nextLink = links[(currentIndex + 1) % links.length];
    const nav = document.createElement('nav');
    nav.className = 'page-next';
    nav.setAttribute('aria-label', 'Weiter durch die Website');
    nav.style.cssText = 'padding: clamp(2rem, 5vw, 4rem) max(1.25rem, 5vw); border-top: 1px solid var(--line); background: var(--paper); text-align: right;';

    const label = document.createElement('p');
    label.className = 'eyebrow';
    label.textContent = isLastPage ? 'Zurück zum Anfang' : 'Weiter entdecken';
    label.style.margin = '0 0 1rem';
    const button = document.createElement('a');
    button.className = 'button';
    button.href = nextLink.getAttribute('href');
    button.rel = 'next';
    button.style.cssText = 'max-width: 100%; box-sizing: border-box; white-space: normal; text-align: left;';
    button.append(document.createTextNode(isLastPage ? 'Zurück zur Startseite ' : 'Weiter zu: ' + nextLink.textContent.trim() + ' '));
    const arrow = document.createElement('span');
    arrow.textContent = '→';
    arrow.setAttribute('aria-hidden', 'true');
    button.append(arrow);
    nav.append(label, button);
    footer.before(nav);
})();

/* Teilen und zurück nach oben auf allen Seiten. */
(() => {
    if (!document.querySelector('.site-footer') || document.querySelector('.site-tools')) return;
    const style = document.createElement('style');
    style.textContent = `
        .site-tools { position: fixed; right: max(1rem, env(safe-area-inset-right)); bottom: calc(1rem + env(safe-area-inset-bottom)); z-index: 90; display: flex; gap: .5rem; align-items: flex-end; }
        .site-tools button, .site-tools a { font: inherit; font-size: .85rem; line-height: 1.4; min-height: 44px; padding: .7rem 1rem; border: 1px solid var(--line); border-radius: 6px; cursor: pointer; background: var(--paper); color: var(--moss); text-decoration: none; }
        .site-tools button:hover, .site-tools a:hover { background: var(--sand); }
        .site-tools button:focus-visible, .site-tools a:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }
        .site-tools .to-top { background: var(--moss); color: white; }
        .site-tools .to-top:hover { background: #284a3e; }
        .site-tools [hidden] { display: none !important; }
        .share-options { position: absolute; right: 0; bottom: calc(100% + .75rem); width: min(300px, calc(100vw - 2rem)); padding: 1rem; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; box-shadow: 0 8px 30px #1d2c2826; display: grid; gap: .65rem; }
        .share-options p { margin: 0; font-size: .85rem; }
        .share-options input { width: 100%; min-width: 0; font: inherit; font-size: .8rem; padding: .5rem; }
        body:has(.lightbox.open) .site-tools { display: none; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto !important; } }
    `;
    document.head.append(style);
    const tools = document.createElement('div');
    tools.className = 'site-tools';
    tools.innerHTML = `<button type="button" class="to-top" aria-label="Zurück nach oben" hidden>Nach oben ↑</button>
        <button type="button" class="share-toggle" aria-expanded="false" aria-controls="share-options">Teilen ↗</button>
        <div class="share-options" id="share-options" hidden>
            <p><strong>Diese Seite teilen</strong></p>
            <a class="share-whatsapp" target="_blank" rel="noopener noreferrer">Über WhatsApp teilen ↗</a>
            <button type="button" class="share-copy">Link kopieren</button>
            <p role="status" aria-live="polite"></p>
            <input type="text" aria-label="Link zum manuellen Kopieren" readonly hidden>
        </div>`;
    document.body.append(tools);
    const top = tools.querySelector('.to-top');
    const toggle = tools.querySelector('.share-toggle');
    const panel = tools.querySelector('.share-options');
    const copy = tools.querySelector('.share-copy');
    const status = tools.querySelector('[role="status"]');
    const input = tools.querySelector('input');
    const url = new URL(document.querySelector('link[rel="canonical"]')?.href || window.location.href);
    url.search = '';
    url.hash = '';
    tools.querySelector('.share-whatsapp').href = 'https://wa.me/?text=' + encodeURIComponent(document.title + '\n' + url.href);
    const updateTop = () => { top.hidden = window.scrollY < 600; };
    window.addEventListener('scroll', updateTop, { passive: true });
    updateTop();
    top.addEventListener('click', (event) => {
        window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        if (event.detail === 0) document.querySelector('.site-header .brand')?.focus({ preventScroll: true });
    });
    const close = () => {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
        panel.hidden = !panel.hidden;
        toggle.setAttribute('aria-expanded', String(!panel.hidden));
        if (!panel.hidden) tools.querySelector('.share-whatsapp').focus();
    });
    document.addEventListener('click', (event) => {
        if (!tools.contains(event.target)) close();
    });
    tools.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !panel.hidden) {
            close();
            toggle.focus();
            event.stopPropagation();
        }
    });
    copy.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(url.href);
            status.textContent = 'Link kopiert!';
            input.hidden = true;
        } catch {
            status.textContent = 'Bitte den markierten Link kopieren.';
            input.value = url.href;
            input.hidden = false;
            input.focus();
            input.select();
        }
    });
})();

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
let previousFocus = null;
let previousOverflow = "";


/* =====================================================
   BILD ÖFFNEN
===================================================== */

function openLightbox(index) {

    if (!lightbox || !lightboxImage || galleryImages.length === 0) {
        return;
    }

    const wasOpen = lightbox.classList.contains('open');
    if (!wasOpen) {
        previousFocus = document.activeElement;
        previousOverflow = document.body.style.overflow;
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
    if (!wasOpen) lightboxClose?.focus();
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

    document.body.style.overflow = previousOverflow;
    previousFocus?.focus({ preventScroll: true });
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

    const item = image.closest('.gallery-item');
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'Foto ' + (index + 1) + ' groß anzeigen');
    item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openLightbox(index);
        }
    });

    item.addEventListener('click', () => {
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

// In der Großansicht horizontal wischen; Scrollen und Pinch-Zoom ausnehmen.
if (lightboxImage) {
    let swipeStart = null;
    lightboxImage.addEventListener('touchstart', (event) => {
        swipeStart = null;
        if (!lightbox?.classList.contains('open') || event.touches.length !== 1 ||
            (window.visualViewport?.scale ?? 1) > 1) return;
        const touch = event.touches[0];
        swipeStart = { x: touch.clientX, y: touch.clientY, id: touch.identifier };
    }, { passive: true });
    lightboxImage.addEventListener('touchmove', (event) => {
        if (event.touches.length !== 1) swipeStart = null;
    }, { passive: true });
    lightboxImage.addEventListener('touchcancel', () => {
        swipeStart = null;
    }, { passive: true });
    lightboxImage.addEventListener('touchend', (event) => {
        const start = swipeStart;
        swipeStart = null;
        if (!start || event.touches.length || !lightbox?.classList.contains('open') ||
            (window.visualViewport?.scale ?? 1) > 1) return;
        const touch = Array.from(event.changedTouches).find(t => t.identifier === start.id);
        if (!touch) return;
        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        if (dx < 0) showNext();
        else showPrevious();
    }, { passive: true });
}

document.addEventListener('keydown', (event) => {

    if (!lightbox || !lightbox.classList.contains('open')) {
        return;
    }

    if (['Escape', 'ArrowLeft', 'ArrowRight'].includes(event.key)) event.preventDefault();
    if (event.key === 'Tab') {
        const buttons = [lightboxClose, lightboxPrev, lightboxNext].filter(Boolean);
        const index = buttons.indexOf(document.activeElement);
        event.preventDefault();
        buttons[(index + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus();
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
