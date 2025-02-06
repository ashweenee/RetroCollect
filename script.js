
const API_KEY = '974cdee040f84a4a98f05d006f525103'; 
const BASE_URL = 'https://api.rawg.io/api';


const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const navLinks = document.querySelectorAll('.nav-links a');
const pages = document.querySelectorAll('.page');
const achievementNotification = document.getElementById('achievementNotification');
const achievementText = document.getElementById('achievementText');
const marketplaceGrid = document.getElementById('marketplaceGrid');
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
        marketplaceGrid.innerHTML = ''; // Clear existing items
        games.forEach(game => {
            const card = createGameCard(game);
            marketplaceGrid.appendChild(card);
        });
    }
}


function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <img src="${game.background_image}" alt="${game.name}" class="item-image">
        <h3>${game.name}</h3>
        <p>Platform: ${game.platforms.map(p => p.platform.name).join(', ')}</p>
        <span class="rarity">Rating: ${game.rating}</span>
        <div class="price">$${(game.rating * 10).toFixed(2)}</div>
        <button class="add-to-collection">Add to Collection</button>
    `;
    

    card.querySelector('.add-to-collection').addEventListener('click', () => addToCollection(game));
    
    return card;
}

// Add to Collection
function addToCollection(game) {
    const collectionGrid = document.getElementById('collectionGrid');
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


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        

        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageId) {
                page.classList.add('active');
                

                if (pageId === 'marketplace') {
                    fetchRetroGames();
                }
            }
        });
    });
});


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
    
    // Simple validation
    if (email && password) {
        // Simulate login (replace with actual authentication)
        loginModal.style.display = 'none';
        unlockAchievement('First Login!');
        
        // Store email if remember me is checked
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        }
    } else {
        displayErrorNotification('Please enter email and password');
    }
});

// Signup and Forgot Password Links
document.getElementById('signupLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Signup functionality to be implemented');
});

document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password reset functionality to be implemented');
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

// Lottie Animation Loader
function loadLottieAnimation() {
    lottie.loadAnimation({
        container: document.getElementById('lottie-container'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets2.lottiefiles.com/packages/lf20_UJNc2t.json' // Retro gaming animation
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadLottieAnimation();
    
    // Example initial achievement
    setTimeout(() => {
        unlockAchievement('Welcome to RetroCollect!');
    }, 1000);
});