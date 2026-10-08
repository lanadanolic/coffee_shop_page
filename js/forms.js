
import {
    clearCart,
    getCartTotal,
    isCartEmpty
} from './cart.js';

function openPopup(popupId) {
    const popup = document.getElementById(popupId);

    if (!popup) return;

    popup.style.display = 'flex';
}

function closePopupById(popupId) {
    const popup = document.getElementById(popupId);

    if (!popup) return;

    popup.style.display = 'none';
}


// Open checkout popup
export function showCheckoutPopup(event) {
    event?.preventDefault();

    if (isCartEmpty()) {
        alert('Your cart is empty. Add a product first.');
        return;
    }

    openPopup('checkout-popup');
}


// Close checkout popup
export function closeCheckoutPopup() {
    closePopupById('checkout-popup');
}


// Simulate placing an order
export function processPayment() {
    if (isCartEmpty()) {
        alert('Your cart is empty.');
        closeCheckoutPopup();
        return;
    }

    const total = getCartTotal().toFixed(2);

    alert(
        `Demo order placed! Total: $${total}.\n` +
        'No real payment was processed.'
    );

    // Clear the cart after the demo order
    clearCart();

    closeCheckoutPopup();
}

function initContactForm() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const name = form
            .querySelector('#name')
            ?.value.trim() ?? '';

        const email = form
            .querySelector('#email')
            ?.value.trim() ?? '';

        const phone = form
            .querySelector('#phone')
            ?.value.trim() ?? '';

        if (!name || !email) {
            alert('Please enter your name and email.');
            return;
        }

        // Show contact details
        document.getElementById('contact-info')
            ?.classList.remove('hidden');

        // Prepare email
        const subject = `Contact from: ${name}`;

        const body =
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}`;

        const mailtoLink =
            'mailto:lana.danolicc@gmail.com' +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;

        // Open the default email application
        window.location.href = mailtoLink;
    });
}

function initReservationForm() {
    const form = document.getElementById('reservation-form');

    if (!form) return;

    const dateInput = document.getElementById(
        'reservation-date'
    );

    // Minimum date: today (local time)
    if (dateInput) {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(
            now.getMonth() + 1
        ).padStart(2, '0');

        const day = String(
            now.getDate()
        ).padStart(2, '0');

        dateInput.min = `${year}-${month}-${day}`;
    }

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const name = document.getElementById(
            'reservation-name'
        )?.value.trim();

        const email = document.getElementById(
            'reservation-email'
        )?.value.trim();

        const phone = document.getElementById(
            'reservation-phone'
        )?.value.trim();

        const reservationDate = document.getElementById(
            'reservation-date'
        )?.value;

        const reservationTime = document.getElementById(
            'reservation-time'
        )?.value;

        const tableType = document.getElementById(
            'table-type'
        )?.value;

        if (
            !name ||
            !email ||
            !phone ||
            !reservationDate ||
            !reservationTime ||
            !tableType
        ) {
            alert('Please complete all reservation fields.');
            return;
        }

        // Demo only - reservation is not stored
        showReservationPopup();

        form.reset();
    });
}

export function showReservationPopup() {
    openPopup('confirmation-popup');
}

export function closeReservationPopup() {
    closePopupById('confirmation-popup');
}

export function initForms() {
    initContactForm();
    initReservationForm();
}
