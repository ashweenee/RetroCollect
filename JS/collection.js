document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('collectionModal');
    const modalTitle = document.getElementById('modalTitle');
    const collectionItems = document.querySelector('.collection-items');
    const closeBtn = document.querySelector('.close');

    const collections = {
        ps1: {
            name: 'PlayStation 1',
            items: [
                {
                    name: 'Olympic Summer Games',
                    condition: 'Mint',
                    rarity: 5, 
                    image: 'media\\olympicsummergames.png'
                }
            ]
        },
        n64: {
            name: 'Nintendo 64',
            items: [
                {
                    name: 'Super Mario 64',
                    condition: 'Mint',
                    rarity: 2, 
                    image: 'media\\MK64.png'
                }
            ]
        },
        genesis: {
            name: 'SEGA Genesis',
            items: [
                {
                    name: 'Sonic the Hedgehog 2',
                    condition: 'Mint',
                    rarity: 4, 
                    image: 'media\\Sonic_the_Hedgehog.png'
                }
            ]
        }
    };

    // generate star rating 
    function generateStars(rating) {
        const maxStars = 5;
        let starsHTML = '<div class="rarity-stars">';
        
        for (let i = 1; i <= maxStars; i++) {
            const starClass = i <= rating ? 'star filled' : 'star empty';
            starsHTML += `<span class="${starClass}">★</span>`;
        }
        
        starsHTML += '</div>';
        return starsHTML;
    }

    // get rarity text based on stars
    function getRarityText(stars) {
        const rarityMap = {
            1: 'Common',
            2: 'Uncommon',
            3: 'Rare',
            4: 'Ultra Rare',
            5: 'Legendary'
        };
        return rarityMap[stars] || 'Unknown';
    }

    // Add click handlers to view details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => {
            const consoleId = button.getAttribute('data-console');
            showCollectionDetails(consoleId);
        });
    });

    // show collection details
    function showCollectionDetails(consoleId) {
        const collection = collections[consoleId];
        modalTitle.textContent = collection.name;
        collectionItems.innerHTML = '';

        collection.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'collection-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <span class="condition-badge">${item.condition}</span>
                    <div class="rarity-container">
                        <p>Rarity: ${getRarityText(item.rarity)}</p>
                        ${generateStars(item.rarity)}
                    </div>
                </div>
            `;
            collectionItems.appendChild(itemElement);
        });

        modal.style.display = 'block';
    }

    // Close modal handlers
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
});