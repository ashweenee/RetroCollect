// Load and manage cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateTotals();
    setupEventListeners();
});

function displayCart() {
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-button minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-button plus">+</button>
                </div>
            </div>
        `;
        cartContainer.insertAdjacentHTML('beforeend', itemElement);
    });
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = document.querySelector('input[name="delivery"]:checked').value === 'express' ? 50 : 10;
    const total = subtotal + deliveryFee;

    document.getElementById('cartSubtotal').textContent = `$${subtotal}`;
    document.getElementById('summarySubtotal').textContent = `$${subtotal}`;
    document.getElementById('deliveryFee').textContent = `$${deliveryFee}`;
    document.getElementById('orderTotal').textContent = `$${total}`;
}

function setupEventListeners() {
    // qty buttons
    document.getElementById('cartItems').addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-button')) {
            const itemId = e.target.closest('.cart-item').dataset.id;
            const change = e.target.classList.contains('plus') ? 1 : -1;
            updateQuantity(itemId, change);
        }
    });

    // Delivery method
    document.querySelectorAll('input[name="delivery"]').forEach(radio => {
        radio.addEventListener('change', updateTotals);
    });

    // Address form
    const addAddressBtn = document.getElementById('addAddressBtn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => {
            document.getElementById('addressForm').style.display = 'block';
            addAddressBtn.style.display = 'none';
        });
    }

    // Place order
    document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);
}

function updateQuantity(itemId, change) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateTotals();
    }
}

function placeOrder(e) {
    e.preventDefault();
    
    // form validation
    const required = document.querySelectorAll('input[required]');
    const isValid = Array.from(required).every(input => input.value.trim() !== '');
    
    if (isValid) {
        // Show success modal
        document.getElementById('successModal').style.display = 'flex';
        
        // Clear cart
        cart = [];
        localStorage.removeItem('cart');
        
        // Modal close button
        document.querySelector('.back-home-button').addEventListener('click', () => {
            window.location.href = 'homepage.html';
        });
    } else {
        alert('Please fill in all required fields');
    }
}

function placeOrder(e) {
    e.preventDefault();
    
    // form validation
    const required = document.querySelectorAll('input[required]');
    const isValid = Array.from(required).every(input => input.value.trim() !== '');
    
    if (isValid) {
        // Show success modal
        const modal = document.getElementById('successModal');
        modal.style.display = 'flex';
        
        // Initialize Lottie animation
        const animation = lottie.loadAnimation({
            container: document.getElementById('lottieContainer'),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'media\\Animation - 1739088374387.json' 
        });

        // animation completion
        animation.addEventListener('complete', () => {
            console.log('Animation completed');
        });
        
        // Clear cart
        cart = [];
        localStorage.removeItem('cart');
        
        // Modal close button
        document.querySelector('.back-home-button').addEventListener('click', () => {
            window.location.href = 'homepage.html';
        });
    } else {
        alert('Please fill in all required fields');
    }
}