
import { addToCart, changeQuantity } from './cart.js';

// Extract the current price from a product
function getProductPrice(box) {
    const priceElement = box.querySelector('.price');

    if (!priceElement) return null;

    // Read only the current price, not the old price
    const priceText = priceElement.childNodes[0]?.textContent ?? '';

    const price = parseFloat(
        priceText.replace(/[^\d.]/g, '')
    );

    if (!Number.isFinite(price) || price <= 0) {
        return null;
    }

    return price;
}


// Read product information from HTML
function getProductData(box) {
    const name = box.querySelector('h3')?.textContent.trim();
    const image = box.querySelector('img')?.src;
    const price = getProductPrice(box);

    if (!name || !image || price === null) {
        return null;
    }

    return {
        name,
        image,
        price
    };
}


function initProductButtons() {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach((button, index) => {
        const box = button.closest('.box');

        if (!box) return;

        const product = getProductData(box);
        if (!product) return;

        // Consistent ID with cart.js
        const productId = String(index);

        // Add product to cart
        button.addEventListener('click', event => {
            event.preventDefault();

            addToCart(productId, product);
        });

        // Remove one unit from the cart
        const removeButton = box.querySelector(
            '.remove-from-cart'
        );

        removeButton?.addEventListener('click', event => {
            event.preventDefault();

            changeQuantity(productId, -1);
        });
    });
}


function initProductSearch() {
    const searchInput = document.getElementById('search-box');

    if (!searchInput) return;

    // Only search products that can be added to cart
    const productBoxes = [
        ...document.querySelectorAll('.add-to-cart')
    ].map(button => button.closest('.box')).filter(Boolean);

    const sections = [
        ...new Set(
            productBoxes.map(box => box.closest('.menu'))
        )
    ].filter(Boolean);

    function filterProducts() {
        const query = searchInput.value
            .trim()
            .toLocaleLowerCase();

        productBoxes.forEach(box => {
            const productName =
                box.querySelector('h3')?.textContent
                    .toLocaleLowerCase() ?? '';

            const matches = productName.includes(query);

            box.style.display = matches ? '' : 'none';
        });

        // Hide menu sections without matching products
        sections.forEach(section => {
            const boxes = [
                ...section.querySelectorAll('.box')
            ];

            const hasVisibleProducts = boxes.some(
                box => box.style.display !== 'none'
            );

            section.style.display =
                hasVisibleProducts ? '' : 'none';
        });
    }

    searchInput.addEventListener('input', filterProducts);

    // Prevent pressing Enter from navigating
    searchInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
}


export function initProducts() {
    initProductButtons();
    initProductSearch();
}
