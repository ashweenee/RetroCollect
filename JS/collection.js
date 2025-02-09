document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('collectionModal');
    const modalTitle = document.getElementById('modalTitle');
    const collectionItems = document.querySelector('.collection-items');
    const closeBtn = document.querySelector('.close');

    // Collection data
    const collections = {
        ps1: {
            name: 'PlayStation 1',
            items: [
                {
                    name: 'Super Mario Bros',
                    condition: 'Mint',
                    rarity: 'Legendary',
                    image: '/api/placeholder/200/200'
                }
            ]
        },
        n64: {
            name: 'Nintendo 64',
            items: [
                {
                    name: 'Super Mario 64',
                    condition: 'Mint',
                    rarity: 'Legendary',
                    image: '/api/placeholder/200/200'
                }
            ]
        },
        genesis: {
            name: 'SEGA Genesis',
            items: [
                {
                    name: 'Sonic the Hedgehog 2',
                    condition: 'Mint',
                    rarity: 'Rare',
                    image: '/api/placeholder/200/200'
                }
            ]
        }
    };

    // Add click handlers to view details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => {
            const consoleId = button.getAttribute('data-console');
            showCollectionDetails(consoleId);
        });
    });

    // Show collection details in modal
    function showCollectionDetails(consoleId) {
        const collection = collections[consoleId];
        modalTitle.textContent = collection.name;
        
        // Clear previous items
        collectionItems.innerHTML = '';
        
        // Add collection items
        collection.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'collection-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <span class="condition-badge">${item.condition}</span>
                    <p>Rarity: ${item.rarity}</p>
                </div>
            `;
            collectionItems.appendChild(itemElement);
        });

        modal.style.display = 'block';
    }

    // Close modal when clicking X or outside
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});