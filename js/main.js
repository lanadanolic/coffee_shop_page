
/**
 * Coffee Shop Storefront
 * Main application entry point
 */

import { initCart } from './cart.js';
import { initProducts } from './products.js';

import {
    initForms,
    showCheckoutPopup,
    closeCheckoutPopup,
    processPayment,
    closeReservationPopup
} from './forms.js';

import {
    initUI,
    toggleText,
    zoomImage
} from './ui.js';


// ==========================================
// GLOBAL HANDLERS FOR EXISTING HTML
// ==========================================

// Existing HTML uses inline onclick attributes.
// Expose these functions until inline handlers
// are replaced with event listeners.

window.showCheckoutPopup = showCheckoutPopup;
window.closeCheckoutPopup = closeCheckoutPopup;
window.processPayment = processPayment;

window.closePopup = closeReservationPopup;

window.toggleText = toggleText;
window.zoomImage = zoomImage;


function initApp() {
    initProducts();
    initCart();
    initForms();
    initUI();

    console.info('Coffee Shop Storefront initialized.');
}


// Vite loads ES modules using defer semantics.
// DOM is normally available when this code runs.
if (document.readyState === 'loading') {
    document.addEventListener(
        'DOMContentLoaded',
        initApp,
        { once: true }
    );
} else {
    initApp();
}
