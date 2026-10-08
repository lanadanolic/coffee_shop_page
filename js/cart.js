const STORAGE_KEY = 'coffee-shop-cart';

const cart = new Map();


// Load saved cart from localStorage
function loadCart() {
    try {
        const savedCart = localStorage.getItem(STORAGE_KEY);

        if (!savedCart) return;

        const products = JSON.parse(savedCart);

        if (!Array.isArray(products)) return;

        products.forEach(([id, product]) => {
            if (
                typeof id === 'string' &&
                product &&
                typeof product.name === 'string' &&
                typeof product.image === 'string' &&
                Number.isFinite(product.price) &&
                product.price > 0 &&
                Number.isInteger(product.quantity) &&
                product.quantity > 0
            ) {
                cart.set(id, product);
            }
        });

    } catch (error) {
        console.error('Failed to load cart:', error);
    }
}


// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify([...cart.entries()])
        );
    } catch (error) {
        console.error('Failed to save cart:', error);
    }
}


// Calculate total cart price
export function getCartTotal() {
    return [...cart.values()].reduce(
        (total, product) =>
            total + product.price * product.quantity,
        0
    );
}


// Update product controls in the menu
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


// Render cart items
export function renderCart() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-price');

    if (!container || !totalElement) return;

    container.replaceChildren();

    for (const [id, product] of cart) {

        const item = document.createElement('div');
        item.className = 'cart-item';

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;

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

        decreaseButton.addEventListener('click', () => {
            changeQuantity(id, -1);
        });

        // Increase quantity
        const increaseButton = document.createElement('button');
        increaseButton.type = 'button';
        increaseButton.textContent = '+';

        increaseButton.addEventListener('click', () => {
            changeQuantity(id, 1);
        });

        // Remove product
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = '×';

        removeButton.addEventListener('click', () => {
            removeFromCart(id);
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

    totalElement.textContent =
        `Total: $${getCartTotal().toFixed(2)}`;

    document.querySelectorAll('.add-to-cart').forEach(
        (_, index) => updateProductControls(String(index))
    );
}


// Add a product to the cart
export function addToCart(id, product) {
    if (cart.has(id)) {
        cart.get(id).quantity += 1;
    } else {
        cart.set(id, {
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
}


// Change product quantity
export function changeQuantity(id, difference) {
    const product = cart.get(id);

    if (!product) return;

    product.quantity += difference;

    if (product.quantity <= 0) {
        cart.delete(id);
    }

    saveCart();
    renderCart();
}


// Remove a product completely
export function removeFromCart(id) {
    cart.delete(id);
    saveCart();
    renderCart();
}


// Clear the entire cart
export function clearCart() {
    cart.clear();
    saveCart();
    renderCart();
}


// Check whether the cart is empty
export function isCartEmpty() {
    return cart.size === 0;
}


// Initialize cart
export function initCart() {
    loadCart();
    renderCart();
}
