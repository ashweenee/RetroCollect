
const API_KEY = '974cdee040f84a4a98f05d006f525103'; 
const BASE_URL = 'https://api.rawg.io/api';

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const achievementNotification = document.getElementById('achievementNotification');
const achievementText = document.getElementById('achievementText');
const errorNotification = document.getElementById('errorNotification');

// Error Handling Wrapper
async function safeApiCall(apiCall) {
    try {
        return await apiCall();
    } catch (error) {
        console.error('API Error:', error);
        displayErrorNotification(error.message);
    }
}

// Error Notification Function
function displayErrorNotification(message) {
    errorNotification.textContent = message;
    errorNotification.style.display = 'block';
    
    setTimeout(() => {
        errorNotification.style.display = 'none';
    }, 3000);
}

// Fetch Retro Games Function
async function fetchRetroGames() {
    const apiCall = async () => {
        const response = await fetch(`${BASE_URL}/games?dates=1980-01-01,1999-12-31&platforms=27,15&key=${API_KEY}`);
        const data = await response.json();
        return data.results;
    };

    const games = await safeApiCall(apiCall);
    
    if (games) {
        const marketplaceGrid = document.getElementById('marketplaceGrid');
        if (marketplaceGrid) {
            marketplaceGrid.innerHTML = ''; // Clear existing items
            games.forEach(game => {
                const card = createGameCard(game);
                marketplaceGrid.appendChild(card);
            });
        }

        const featuredItems = document.getElementById('featuredItems');
        if (featuredItems) {
            featuredItems.innerHTML = ''; // Clear existing items
            games.slice(0, 4).forEach(game => {
                const card = createGameCard(game);
                featuredItems.appendChild(card);
            });
        }
    }
}

function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Set a default image if game.background_image is null
    const imageUrl = game.background_image || '/api/placeholder/250/200';
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${game.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${game.name}</h3>
            <p>Platform: ${game.platforms ? game.platforms.map(p => p.platform.name).join(', ') : 'Various'}</p>
            <span class="rarity">Rating: ${game.rating || 'N/A'}</span>
            <p class="product-price">$${((game.rating || 3) * 10).toFixed(2)}</p>
        </div>
        <button class="buy-button">Buy Now</button>
    `;
    
    card.querySelector('.buy-button').addEventListener('click', () => addToCollection(game));
    
    return card;
}

// Add to Collection
function addToCollection(game) {
    const collectionGrid = document.getElementById('collectionGrid');
    if (collectionGrid) {
        const existingItems = collectionGrid.children.length;
        
        const collectionCard = document.createElement('div');
        collectionCard.className = 'collection-item';
        collectionCard.innerHTML = `
            <img src="${game.background_image}" alt="${game.name}">
            <h3>${game.name}</h3>
        `;
        
        collectionGrid.appendChild(collectionCard);
        
        // Update collection stats
        document.getElementById('itemsCollected').textContent = existingItems + 1;
        unlockCollectionAchievement(existingItems + 1);
    }
    unlockAchievement('Item Added to Collection!');
}

// Login Modal Handlers
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (email && password) {
        loginModal.style.display = 'none';
        unlockAchievement('First Login!');
        
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        }
    } else {
        displayErrorNotification('Please enter email and password');
    }
});

// Achievement System
function unlockAchievement(title) {
    achievementText.textContent = title;
    achievementNotification.style.display = 'block';
    
    setTimeout(() => {
        achievementNotification.style.display = 'none';
    }, 3000);
}

// Collection Achievement
function unlockCollectionAchievement(itemCount) {
    if (itemCount === 5) {
        unlockAchievement('Collector Starter!');
    }
    if (itemCount === 10) {
        unlockAchievement('Serious Collector!');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fetch games for both homepage and marketplace
    fetchRetroGames();
    
    // Example initial achievement
    setTimeout(() => {
        unlockAchievement('Welcome to RetroCollect!');
    }, 1000);
});