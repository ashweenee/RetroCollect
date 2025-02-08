// Collection Stats Update
function updateCollectionStats() {
    const totalItems = document.getElementById('totalItems');
    const collectionScore = document.getElementById('collectionScore');
    const completedSets = document.getElementById('completedSets');
    
    if (totalItems && collectionScore && completedSets) {
        // Get collection data from localStorage or use default values
        const collection = JSON.parse(localStorage.getItem('collection')) || {
            items: [],
            score: 0,
            completedSets: 0
        };

        totalItems.textContent = collection.items.length;
        collectionScore.textContent = collection.score;
        completedSets.textContent = collection.completedSets;
    }
}

// Modified addToCollection function
function addToCollection(game) {
    // Get existing collection or create new one
    const collection = JSON.parse(localStorage.getItem('collection')) || {
        items: [],
        score: 0,
        completedSets: 0
    };

    // Add item to collection if it doesn't exist
    if (!collection.items.find(item => item.id === game.id)) {
        collection.items.push({
            id: game.id,
            name: game.name,
            image: game.background_image,
            platform: game.platforms ? game.platforms[0].platform.name : 'Unknown',
            rating: game.rating || 0,
            addedDate: new Date().toISOString()
        });

        // Update collection score (based on game rating)
        collection.score += Math.round((game.rating || 3) * 100);

        // Save updated collection
        localStorage.setItem('collection', JSON.stringify(collection));

        // Update UI
        updateCollectionStats();
        displayCollectionItems();
        unlockAchievement('Item Added to Collection!');

        // Check for collection milestones
        checkCollectionMilestones(collection.items.length);
    } else {
        displayErrorNotification('Item already in collection!');
    }
}

// Display Collection Items
function displayCollectionItems() {
    const collectionGrid = document.getElementById('collectionGrid');
    if (collectionGrid) {
        const collection = JSON.parse(localStorage.getItem('collection')) || { items: [] };
        
        collectionGrid.innerHTML = ''; // Clear existing items
        
        // Sort by most recently added
        const sortedItems = collection.items.sort((a, b) => 
            new Date(b.addedDate) - new Date(a.addedDate)
        );

        // Display most recent 12 items
        sortedItems.slice(0, 12).forEach(item => {
            const card = document.createElement('div');
            card.className = 'collection-item';
            card.innerHTML = `
                <img src="${item.image || '/api/placeholder/200/150'}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Platform: ${item.platform}</p>
                <p>Rating: ${item.rating.toFixed(1)}</p>
            `;
            collectionGrid.appendChild(card);
        });
    }
}

// Check Collection Milestones
function checkCollectionMilestones(itemCount) {
    if (itemCount === 5) {
        unlockAchievement('Collector Starter!');
    }
    if (itemCount === 10) {
        unlockAchievement('Serious Collector!');
    }
    if (itemCount === 20) {
        unlockAchievement('Dedicated Collector!');
    }
}

// Add to the existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Existing initialization code...
    
    // Initialize collection page if we're on it
    if (window.location.pathname.includes('collection.html')) {
        updateCollectionStats();
        displayCollectionItems();
    }
});

// Add event listeners for console collection details
const viewDetailsButtons = document.querySelectorAll('.view-details');
viewDetailsButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const consoleName = e.target.parentElement.querySelector('h3').textContent;
        // You can implement the console collection detail view here
        alert(`Viewing ${consoleName} collection details - Coming soon!`);
    });
});

// Collection details modal functionality
function createCollectionDetailsModal() {
    const modal = document.createElement('div');
    modal.className = 'collection-details-modal modal';
    modal.innerHTML = `
        <div class="modal-content collection-details-content">
            <span class="close-button">&times;</span>
            <h2 id="modalTitle"></h2>
            <div class="collection-items-grid"></div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Sample collection data - In production, this would come from your backend
const collectionData = {
    'PlayStation 1': [
        {
            name: 'Crash Bandicoot',
            image: '/api/placeholder/200/200',
            condition: 'Mint',
            rarity: 5,
            details: 'Original 1996 release'
        }
        // Add more items as needed
    ],
    'Nintendo 64': [
        {
            name: 'Super Mario 64',
            image: '/api/placeholder/200/200',
            condition: 'Near Mint',
            rarity: 4,
            details: 'Launch title'
        }
        // Add more items as needed
    ],
    'SEGA Genesis': [
        {
            name: 'Sonic the Hedgehog',
            image: '/api/placeholder/200/200',
            condition: 'Good',
            rarity: 3,
            details: 'Original cartridge'
        }
        // Add more items as needed
    ]
};

// Create rarity stars HTML
function createRarityStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Initialize collection details functionality
function initializeCollectionDetails() {
    const modal = createCollectionDetailsModal();
    const closeButton = modal.querySelector('.close-button');
    
    // Add click handlers to all "View Details" buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => {
            const consoleName = button.parentElement.querySelector('h3').textContent;
            displayCollectionDetails(consoleName, modal);
        });
    });

    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Display collection details in modal
function displayCollectionDetails(consoleName, modal) {
    const items = collectionData[consoleName] || [];
    const modalTitle = modal.querySelector('#modalTitle');
    const itemsGrid = modal.querySelector('.collection-items-grid');
    
    modalTitle.textContent = `${consoleName} Collection`;
    itemsGrid.innerHTML = '';

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'collection-detail-item';
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <div class="condition-badge ${item.condition.toLowerCase()}">${item.condition}</div>
                <div class="rarity-stars">${createRarityStars(item.rarity)}</div>
                <p>${item.details}</p>
            </div>
        `;
        itemsGrid.appendChild(itemElement);
    });

    modal.style.display = 'block';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCollectionDetails();
})