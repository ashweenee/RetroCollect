const products = [
    { id: 1, name: 'PS1 Controller', price: 20, image: 'media\\PSController.png' },
    { id: 2, name: 'N64 Controller', price: 30, image: 'media\\N64Controller.png' },
    { id: 3, name: 'Mario Kart 64', price: 15, image: 'media\\MK64.png' },
    { id: 4, name: 'Super Thunder Blade', price: 13, image: 'media\\Superthunderblade.png' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const createProductCard = product => {
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
    
    card.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) existingItem.quantity++;
        else cart.push({ ...product, quantity: 1 });
        
        localStorage.setItem('cart', JSON.stringify(cart));
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        const button = e.target.querySelector('button');
        button.textContent = 'Added!';
        setTimeout(() => button.textContent = 'Add to Cart', 1000);
    });
    
    return card;
};

const renderProducts = (products, container = document.getElementById('marketplaceGrid')) => {
    container.innerHTML = '';
    products.forEach(product => container.appendChild(createProductCard(product)));
};

document.getElementById('searchBar')?.addEventListener('input', e => {
    const searchTerm = e.target.value.toLowerCase();
    renderProducts(products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    ));
});

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
});