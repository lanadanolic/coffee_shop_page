
 // Coffee Shop - frontend interactions
 // HTML, CSS & Vanilla JavaScript

'use strict';

// ==========================================
// SHOPPING CART
// ==========================================

const cart = new Map();

// Calculate total cart price
function getCartTotal() {
    return [...cart.values()].reduce(
        (total, product) =>
            total + product.price * product.quantity,
        0
    );
}

// Update product controls in menu
function updateProductControls(id) {
    const buttons = document.querySelectorAll('.add-to-cart');
    const box = buttons[Number(id)]?.closest('.box');

    if (!box) return;

    const quantity = cart.get(id)?.quantity ?? 0;

    const counter = box.querySelector('.cart-count');
    const count = box.querySelector('.count');
    const removeButton = box.querySelector('.remove-from-cart');

    if (counter) {
        counter.style.display = quantity ? 'block' : 'none';
    }

    if (count) {
        count.textContent = quantity;
    }

    if (removeButton) {
        removeButton.style.display = quantity
            ? 'inline-block'
            : 'none';
    }
}

// Render all cart items
function renderCart() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-price');

    if (!container || !totalElement) return;

    container.replaceChildren();

    for (const [id, product] of cart) {

        const item = document.createElement('div');
        item.className = 'cart-item';

        // Product image
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;

        // Product details
        const details = document.createElement('div');

        const title = document.createElement('h4');
        title.textContent = product.name;

        const price = document.createElement('span');
        price.className = 'price';
        price.textContent =
            `$${(product.price * product.quantity).toFixed(2)}`;

        const quantity = document.createElement('span');
        quantity.className = 'quantity';
        quantity.textContent =
            ` Quantity: ${product.quantity}`;

        details.append(title, price, quantity);

        // Decrease quantity
        const decreaseButton = document.createElement('button');
        decreaseButton.type = 'button';
        decreaseButton.textContent = '−';

        decreaseButton.setAttribute(
            'aria-label',
            `Decrease ${product.name} quantity`
        );

        decreaseButton.addEventListener('click', () => {
            changeQuantity(id, -1);
        });

        // Increase quantity
        const increaseButton = document.createElement('button');
        increaseButton.type = 'button';
        increaseButton.textContent = '+';

        increaseButton.setAttribute(
            'aria-label',
            `Increase ${product.name} quantity`
        );

        increaseButton.addEventListener('click', () => {
            changeQuantity(id, 1);
        });

        // Remove product
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = '×';

        removeButton.setAttribute(
            'aria-label',
            `Remove ${product.name}`
        );

        removeButton.addEventListener('click', () => {
            changeQuantity(id, -product.quantity);
        });

        item.append(
            image,
            details,
            decreaseButton,
            increaseButton,
            removeButton
        );

        container.appendChild(item);
    }

    // Update total price
    totalElement.textContent =
        `Total: $${getCartTotal().toFixed(2)}`;

    // Synchronize menu counters
    document.querySelectorAll('.add-to-cart').forEach(
        (_, index) => {
            updateProductControls(String(index));
        }
    );
}

// Update product quantity
function changeQuantity(id, difference) {
    const product = cart.get(id);

    if (!product) return;

    product.quantity += difference;

    if (product.quantity <= 0) {
        cart.delete(id);
    }

    renderCart();
}


// ==========================================
// EXPANDABLE TEXT
// ==========================================

function toggleText(event) {
    event.preventDefault();

    const content = event.currentTarget.closest('.content');

    const shortText = content?.querySelector('.short-text');
    const longText = content?.querySelector('.long-text');

    if (!shortText || !longText) return;

    const isHidden =
        getComputedStyle(longText).display === 'none';

    longText.style.display = isHidden ? 'block' : 'none';
    shortText.style.display = isHidden ? 'none' : 'block';

    event.currentTarget.textContent =
        isHidden ? 'Read less' : 'Read more';
}


// ==========================================
// IMAGE ZOOM
// ==========================================

function removeCloseButton(container) {
    container?.querySelector('.close-btn')?.remove();
}

function zoomImage(event, imageId) {
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


// ==========================================
// CHECKOUT SIMULATION
// ==========================================

function showCheckoutPopup(event) {
    event?.preventDefault();

    const popup = document.getElementById('checkout-popup');

    if (!popup) return;

    if (cart.size === 0) {
        alert('Your cart is empty. Add a product first.');
        return;
    }

    popup.style.display = 'flex';
}

function closeCheckoutPopup() {
    const popup = document.getElementById('checkout-popup');

    if (popup) {
        popup.style.display = 'none';
    }
}

// Demonstration only - no real payments
function processPayment() {
    if (cart.size === 0) return;

    const total = getCartTotal().toFixed(2);

    alert(
        `Demo order placed! Total: $${total}. ` +
        'No payment was made.'
    );

    cart.clear();
    renderCart();
    closeCheckoutPopup();
}


// ==========================================
// RESERVATION POPUP
// ==========================================

function showPopup() {
    const popup = document.getElementById('confirmation-popup');

    if (popup) {
        popup.style.display = 'flex';
    }
}

function closePopup() {
    const popup = document.getElementById('confirmation-popup');

    if (popup) {
        popup.style.display = 'none';
    }
}


// ==========================================
// INITIALIZE APPLICATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ======================================
    // NAVIGATION
    // ======================================

    const navbar = document.querySelector('.navbar');
    const searchForm = document.querySelector('.search-form');
    const cartPanel = document.querySelector('.cart-items-container');

    const panels = [navbar, searchForm, cartPanel];

    function bindToggle(buttonId, panel) {
        document.getElementById(buttonId)?.addEventListener(
            'click',
            () => {
                const wasOpen =
                    panel?.classList.contains('active');

                // Close all panels
                panels.forEach(item => {
                    item?.classList.remove('active');
                });

                // Open selected panel
                if (!wasOpen) {
                    panel?.classList.add('active');
                }
            }
        );
    }

    bindToggle('menu-btn', navbar);
    bindToggle('search-btn', searchForm);
    bindToggle('cart-btn', cartPanel);

    // Close panels on scroll
    window.addEventListener(
        'scroll',
        () => {
            panels.forEach(item => {
                item?.classList.remove('active');
            });
        },
        { passive: true }
    );


    // ======================================
    // ADD PRODUCTS TO CART
    // ======================================

    document.querySelectorAll('.add-to-cart').forEach(
        (button, index) => {

            const box = button.closest('.box');

            const name = box
                ?.querySelector('h3')
                ?.textContent.trim();

            const image = box
                ?.querySelector('img')
                ?.src;

            const priceText = box
                ?.querySelector('.price')
                ?.textContent.trim() ?? '';

            // Extract current price, not old price
            const price = Number(
                priceText.match(/\$\s*(\d+(?:\.\d+)?)/)?.[1]
            );

            const id = String(index);

            if (
                !name ||
                !image ||
                !Number.isFinite(price) ||
                price <= 0
            ) {
                return;
            }

            // Add product
            button.addEventListener('click', event => {
                event.preventDefault();

                if (cart.has(id)) {
                    changeQuantity(id, 1);
                } else {
                    cart.set(id, {
                        name,
                        image,
                        price,
                        quantity: 1
                    });

                    renderCart();
                }
            });

            // Remove one product
            box.querySelector('.remove-from-cart')
                ?.addEventListener('click', event => {
                    event.preventDefault();
                    changeQuantity(id, -1);
                });
        }
    );

    renderCart();


    // ======================================
    // SAFE DEMO CHECKOUT
    // ======================================

    const checkoutContent = document.querySelector(
        '#checkout-popup .popup-content'
    );

    if (checkoutContent) {

        // Remove old card input form
        checkoutContent.replaceChildren();

        const heading = document.createElement('h2');
        heading.textContent = 'Demo Checkout';

        const description = document.createElement('p');
        description.textContent =
            'This is a demonstration. ' +
            'No payment will be processed.';

        const confirmButton = document.createElement('button');
        confirmButton.type = 'button';
        confirmButton.className = 'btn';
        confirmButton.textContent = 'Place Demo Order';

        confirmButton.addEventListener(
            'click',
            processPayment
        );

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'close-btn';
        closeButton.textContent = 'Close';

        closeButton.addEventListener(
            'click',
            closeCheckoutPopup
        );

        checkoutContent.append(
            heading,
            description,
            confirmButton,
            closeButton
        );
    }


    // ======================================
    // CONTACT FORM
    // ======================================

    document.getElementById('contact-form')
        ?.addEventListener('submit', event => {

            event.preventDefault();

            const form = event.currentTarget;

            if (!form.reportValidity()) return;

            // Scoped selectors avoid duplicate HTML IDs
            const name = form
                .querySelector('[id="name"]')
                ?.value.trim() ?? '';

            const email = form
                .querySelector('[id="email"]')
                ?.value.trim() ?? '';

            const phone = form
                .querySelector('[id="phone"]')
                ?.value.trim() ?? '';

            if (!name || !email) {
                alert('Please enter your name and email.');
                return;
            }

            form.querySelector('#contact-info')
                ?.classList.remove('hidden');

            const subject = `Contact from: ${name}`;

            const body =
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone}`;

            const mailtoLink =
                'mailto:lana.danolicc@gmail.com' +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(body)}`;

            // Open user's email client
            window.location.href = mailtoLink;
        });


    // ======================================
    // TABLE RESERVATION
    // ======================================

    document.getElementById('reservation-form')
        ?.addEventListener('submit', event => {

            event.preventDefault();

            const form = event.currentTarget;

            if (!form.reportValidity()) return;

            // Demo reservation - no backend
            const heading = document.querySelector(
                '#confirmation-popup .popup-content h2'
            );

            if (heading) {
                heading.textContent = 'Demo Reservation';
            }

            const message = document.querySelector(
                '#confirmation-popup .popup-content p'
            );

            if (message) {
                message.textContent =
                    'Demo reservation submitted. ' +
                    'No booking was saved.';
            }

            showPopup();
        });

});
