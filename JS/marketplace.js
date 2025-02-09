const products = [
    {
        id: 1,
        name: 'PS1 Controller',
        price: 20,
        image: 'media\\PSController.png' 
    },
    {
        id: 2,
        name: 'N64 Controller',
        price: 30,
        image: 'media\\N64Controller.png' 
    },
    {
        id: 3,
        name: 'Mario Kart 64',
        price: 15,
        image: 'media\\MK64.png' 
    },
    {
        id: 4,
        name: 'Super Thunder Blade',
        price: 13,
        image: 'media\\Superthunderblade.png' 
    }
];

// Function to create product cards
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price}</p>
        </div>
        <button class="buy-button">Buy now</button>
    `;
    
    // Add click event to buy button
    card.querySelector('.buy-button').addEventListener('click', () => {
        alert(`Added ${product.name} to cart!`);
        // Add your cart functionality here
    });
    
    return card;
}

// Function to initialize marketplace
function initializeMarketplace() {
    const marketplaceGrid = document.getElementById('marketplaceGrid');
    
    // Clear existing content
    marketplaceGrid.innerHTML = '';
    
    // Add product cards
    products.forEach(product => {
        const card = createProductCard(product);
        marketplaceGrid.appendChild(card);
    });
}

// Search functionality
document.getElementById('searchBar').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    const marketplaceGrid = document.getElementById('marketplaceGrid');
    marketplaceGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        marketplaceGrid.appendChild(card);
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMarketplace);

// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in UI
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Function to add item to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Function to create product cards
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price}</p>
        </div>
        <form class="add-to-cart-form">
            <input type="hidden" name="productId" value="${product.id}">
            <button type="submit" class="buy-button">Add to Cart</button>
        </form>
    `;
    
    // Add submit event to form
    card.querySelector('.add-to-cart-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addToCart(product);
        const button = e.target.querySelector('button');
        button.textContent = 'Added!';
        setTimeout(() => {
            button.textContent = 'Add to Cart';
        }, 1000);
    });
    
    return card;
}

// Function to initialize marketplace
function initializeMarketplace() {
    const marketplaceGrid = document.getElementById('marketplaceGrid');
    
    // Clear existing content
    marketplaceGrid.innerHTML = '';
    
    // Add product cards
    products.forEach(product => {
        const card = createProductCard(product);
        marketplaceGrid.appendChild(card);
    });
    
    // Initialize cart count
    updateCartCount();
}

// Search functionality
document.getElementById('searchBar').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    const marketplaceGrid = document.getElementById('marketplaceGrid');
    marketplaceGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        marketplaceGrid.appendChild(card);
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMarketplace);