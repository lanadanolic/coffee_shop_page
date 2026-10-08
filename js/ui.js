//Handles navigation, image zooming, expandable text and popup interactions

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const searchForm = document.querySelector('.search-form');
    const cartPanel = document.querySelector(
        '.cart-items-container'
    );

    const panels = [navbar, searchForm, cartPanel];

    function closeAllPanels() {
        panels.forEach(panel => {
            panel?.classList.remove('active');
        });
    }

    function bindToggle(buttonId, panel) {
        const button = document.getElementById(buttonId);

        if (!button || !panel) return;

        button.addEventListener('click', () => {
            const isActive = panel.classList.contains('active');

            closeAllPanels();

            if (!isActive) {
                panel.classList.add('active');
            }
        });
    }

    bindToggle('menu-btn', navbar);
    bindToggle('search-btn', searchForm);
    bindToggle('cart-btn', cartPanel);

    // Close navigation panels on scroll
    window.addEventListener(
        'scroll',
        closeAllPanels,
        { passive: true }
    );
}

export function toggleText(event) {
    event.preventDefault();

    const content = event.currentTarget.closest('.content');

    if (!content) return;

    const shortText = content.querySelector('.short-text');
    const longText = content.querySelector('.long-text');

    if (!shortText || !longText) return;

    const isHidden =
        getComputedStyle(longText).display === 'none';

    longText.style.display = isHidden ? 'block' : 'none';
    shortText.style.display = isHidden ? 'none' : 'block';

    event.currentTarget.textContent =
        isHidden ? 'Read less' : 'Read more';
}


function removeCloseButton(container) {
    container?.querySelector('.close-btn')?.remove();
}

export function zoomImage(event, imageId) {
    event.preventDefault();

    const image = document.getElementById(imageId);
    const container = image?.closest('.image');

    if (!image || !container) return;

    // Close enlarged image
    if (image.classList.contains('zoomed')) {
        image.classList.remove('zoomed');
        removeCloseButton(container);
        return;
    }

    // Enlarge image
    image.classList.add('zoomed');

    if (container.querySelector('.close-btn')) return;

    const closeButton = document.createElement('button');

    closeButton.type = 'button';
    closeButton.className = 'close-btn';
    closeButton.textContent = '×';

    closeButton.setAttribute(
        'aria-label',
        'Close enlarged image'
    );

    Object.assign(closeButton.style, {
        position: 'absolute',
        top: '-80px',
        right: '-80px',
        color: 'white',
        fontSize: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: '10'
    });

    closeButton.addEventListener('click', () => {
        image.classList.remove('zoomed');
        removeCloseButton(container);
    });

    container.appendChild(closeButton);
}


function initPopupInteractions() {
    const popups = document.querySelectorAll('.popup-overlay');

    popups.forEach(popup => {
        // Close popup when clicking the background
        popup.addEventListener('click', event => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });
    });

    // Close open popups with Escape
    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;

        popups.forEach(popup => {
            popup.style.display = 'none';
        });
    });
}


export function initUI() {
    initNavigation();
    initPopupInteractions();
}
