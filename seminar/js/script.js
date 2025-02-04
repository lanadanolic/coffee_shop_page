let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
let cartItem = document.querySelector('.cart-items-container');

// Toggle navbar, search form, and cart item visibility
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
};

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
};

document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
};

// Close all forms and navbar on scroll
window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
};

// Cart functionality
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const addToCartIcons = document.querySelectorAll(".fa-shopping-cart");
    const addToCartButtons = document.querySelectorAll(".menu .box .btn");

    // Add item to cart
    function addToCart(name, price, image) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${image}" alt="Product">
            <h4>${name}</h4>
            <span>${price}</span>
            <button class="remove-btn">X</button>
        `;

        cartItemsContainer.appendChild(cartItem);

        // Remove item from cart
        cartItem.querySelector(".remove-btn").addEventListener("click", () => {
            cartItem.remove();
        });
    }

    
});

// Toggle text between short and long version
function toggleText(event) {
    event.preventDefault();
    const longText = event.target.closest('.content').querySelector('.long-text');
    const shortText = event.target.closest('.content').querySelector('.short-text');

    if (longText.style.display === 'none') {
        longText.style.display = 'block';
        shortText.style.display = 'none';
        event.target.textContent = 'Read less';
    } else {
        longText.style.display = 'none';
        shortText.style.display = 'block';
        event.target.textContent = 'Read more';
    }
}

// Zoom image functionality
function zoomImage(event, imageId) {
    event.preventDefault();

    const image = document.getElementById(imageId);
    const imageContainer = image.closest('.image');

    if (!image.classList.contains('zoomed')) {
        image.classList.add('zoomed');
        addCloseButton(imageContainer);
    } else {
        image.classList.remove('zoomed');
        removeCloseButton(imageContainer);
    }
}

// Zoom image functionality
function zoomImage(event, imageId) {
    event.preventDefault();

    const image = document.getElementById(imageId);
    const imageContainer = image.closest('.image');

    if (!image.classList.contains('zoomed')) {
        image.classList.add('zoomed');
        addCloseButton(imageContainer, image);
    } else {
        image.classList.remove('zoomed');
        removeCloseButton(imageContainer);
    }
}

// Funkcija za povećavanje slike
function zoomImage(event, imageId) {
    event.preventDefault();

    const image = document.getElementById(imageId);
    const imageContainer = image.closest('.image'); // Pronalazi div slike

    if (!image.classList.contains('zoomed')) {
        image.classList.add('zoomed');
        addCloseButton(imageContainer);
    } else {
        image.classList.remove('zoomed');
        removeCloseButton(imageContainer);
    }
}

// Funkcija za dodavanje gumba unutar slike
function addCloseButton(imageContainer) {
    // Provjera postoji li već gumb
    if (imageContainer.querySelector('.close-btn')) return;

    let closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = '&times;'; // X simbol

    // Dodavanje gumba unutar imageContainer-a
    imageContainer.appendChild(closeButton);

    // Stiliziranje gumba
    closeButton.style.position = 'absolute';
    closeButton.style.top = '-80px'; 
    closeButton.style.right = '-80px'; 
    closeButton.style.backgroundColor ;
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '30px';
    closeButton.style.width = '50px';
    closeButton.style.height = '50px';
    closeButton.style.borderRadius = '50%';
    closeButton.style.textAlign = 'center';
    closeButton.style.lineHeight = '50px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '10';

    // Event za zatvaranje slike
    closeButton.addEventListener('click', () => {
        const image = imageContainer.querySelector('.productImage');
        image.classList.remove('zoomed');
        removeCloseButton(imageContainer);
    });
}

// Funkcija za uklanjanje gumba
function removeCloseButton(imageContainer) {
    const closeButton = imageContainer.querySelector('.close-btn');
    if (closeButton) {
        closeButton.remove();
    }
}






// Add to cart buttons functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        const box = this.closest('.box');
        const countElement = box.querySelector('.cart-count');
        const countSpan = box.querySelector('.count');
        const removeButton = box.querySelector('.remove-from-cart');

        let count = parseInt(countSpan.innerText);
        count=count+1;

        countSpan.innerText = count;
        countElement.style.display = 'block';
        removeButton.style.display = 'inline-block';

        this.innerText = 'Added to cart';
        this.disabled = true;
        this.style.backgroundColor = '#A52A2A';
        this.style.color = 'white';
    });
});

// Remove from cart buttons functionality
const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
removeFromCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        const box = this.closest('.box');
        const countSpan = box.querySelector('.count');
        const addToCartButton = box.querySelector('.add-to-cart');
        let count = parseInt(countSpan.innerText);

        if (count > 0) {
            count--;
            countSpan.innerText = count;
            addToCartButton.innerText = `Add to cart`;

            const cart = document.querySelector('#cart-items');
            const cartItem = cart.querySelector(`.cart-item[data-id="${box.dataset.id}"]`);

            if (count === 0) {
                box.querySelector('.cart-count').style.display = 'none';
                this.style.display = 'none';

                addToCartButton.disabled = false;
                addToCartButton.style.backgroundColor = '';
                addToCartButton.style.color = '';

                if (cartItem) {
                    cartItem.remove();
                }
            }
        }

        addToCartButton.classList.remove('added-to-cart');
        addToCartButton.style.backgroundColor = '';
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items"); // Košarica
    const addToCartButtons = document.querySelectorAll(".add-to-cart"); // Gumbi za dodavanje u košaricu

    // Funkcija za dodavanje proizvoda u košaricu
    function addToCart(name, price, image, productId) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.dataset.id = productId; // Poveži proizvod s ID-em

        cartItem.innerHTML = `
            <img src="${image}" alt="Proizvod">
            <h4>${name}</h4>
            <span class="price">${price}</span>
            <span class="quantity">1</span> <!-- Početna količina -->
            <button class="decrease-btn">-</button> <!-- Gumb za smanjenje količine -->
            <button class="remove-btn">X</button> <!-- Gumb za uklanjanje proizvoda -->
        `;

        cartItemsContainer.appendChild(cartItem);

        // Omogućava uklanjanje proizvoda iz košarice
        cartItem.querySelector(".remove-btn").addEventListener("click", () => {
            cartItem.remove();
            updateTotalPrice(); // Ažuriraj ukupnu cijenu nakon uklanjanja proizvoda
        });

        // Omogućava smanjenje količine proizvoda
        cartItem.querySelector(".decrease-btn").addEventListener("click", () => {
            decreaseFromCart(productId);
        });

        updateTotalPrice(); // Ažuriraj ukupnu cijenu odmah nakon dodavanja proizvoda
    }

    // Funkcija za smanjenje količine proizvoda u košarici
    function decreaseFromCart(productId) {
        let cartItem = cartItemsContainer.querySelector(`.cart-item[data-id="${productId}"]`);
        if (cartItem) {
            let quantityElement = cartItem.querySelector(".quantity");
            let currentQuantity = parseInt(quantityElement.innerText);

            if (currentQuantity > 1) {
                quantityElement.innerText = currentQuantity - 1; // Smanjivanje količine
            } else {
                cartItem.remove(); // Ako količina dođe na 0, ukloni proizvod
            }
        }
        updateTotalPrice(); // Ažuriraj ukupnu cijenu
    }


    
    // Funkcija za ažuriranje ukupne cijene u košarici
  // Početna vrijednost za ukupnu cijenu
let totalPrice = 0;

// Funkcija koja ažurira ukupnu cijenu na stranici
function updateTotalPrice() {
    document.getElementById('total-price').textContent = `Total: €${totalPrice.toFixed(2)}`;
}

// Dodavanje proizvoda u košaricu
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault(); // Sprečava defaultno ponašanje linka

        // Pronađi cijenu proizvoda
        let priceText = this.previousElementSibling.textContent; // Pronađi cijenu u .price
        let price = parseFloat(priceText.replace('$', '')); // Ukloni znak $ i pretvori u broj

        // Dodaj cijenu proizvoda u ukupnu cijenu
        totalPrice += price;

        // Ažuriraj ukupnu cijenu na stranici
        updateTotalPrice();

        // Dodaj proizvod u košaricu (ovdje možeš dodati logiku za prikaz proizvoda u košarici)
        let cartItemsContainer = document.getElementById('cart-items');
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.textContent = `${this.previousElementSibling.previousElementSibling.textContent} - €${price.toFixed(2)}`;
        cartItemsContainer.appendChild(cartItem);
    });
});



    // Dodavanje proizvoda u košaricu klikom na "Add to Cart" gumb
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const box = this.closest(".box");
            const productId = box.dataset.id;
            const productName = box.querySelector("h3").innerText;
            const productPrice = box.querySelector(".price").innerText;
            const productImage = box.querySelector("img").src;

            addToCart(productName, productPrice, productImage, productId);
        });
    });

});






/////////////////////////////////////////////////
/////////////////////////////////////
/* */
// Show the checkout popup
function showCheckoutPopup(event) {
    event.preventDefault(); // Spriječavamo defaultno ponašanje linka (koje vodi na #)
    document.getElementById("checkout-popup").style.display = "flex";
}

// Close the checkout popup
function closeCheckoutPopup() {
    document.getElementById("checkout-popup").style.display = "none";
}

// Process the payment (simulate payment)
function processPayment() {
    const cardNumber = document.getElementById("card-number").value;
    const cardExpiry = document.getElementById("card-expiry").value;
    const cardCVC = document.getElementById("card-cvc").value;

    if (cardNumber && cardExpiry && cardCVC) {
        alert("Payment successful! Your card details: " +
            "\nCard Number: " + cardNumber + 
            "\nExpiry Date: " + cardExpiry + 
            "\nCVC: " + cardCVC);
         // Čišćenje podataka u formi
    document.getElementById('checkout-form').reset(); // Briše sve unesene podatke u formi   
        closeCheckoutPopup(); // Close the popup after successful payment
    } else {
        alert("Please fill in all the fields.");
    }
}


document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Sprječava reload stranice

    // Prikazuje kontakt informacije
    document.getElementById("contact-info").classList.remove("hidden");

    // Kreira mailto link s unesenim podacima
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var subject = "Contact from: " + name;
    var body = "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone;
    var mailtoLink = "mailto:lana.danolicc@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

    // Otvara korisnikov mail klijent
    window.location.href = mailtoLink;
});





///////////////////////////////////////////////////////////////////////////////////////
// Functions to handle form submission and showing the confirmation popup
document.getElementById("reservation-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting in the usual way

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const reservationDate = document.getElementById("reservation-date").value;
    const reservationTime = document.getElementById("reservation-time").value;
    const tableType = document.getElementById("table-type").value;

    // You can process the form data or send it to a server here

    // Show confirmation popup
    showPopup();
});

// Function to show the confirmation popup
function showPopup() {
    document.getElementById("confirmation-popup").style.display = 'flex';
}

// Function to close the confirmation popup
function closePopup() {
    document.getElementById("confirmation-popup").style.display = 'none';
}




