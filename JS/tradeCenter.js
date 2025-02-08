// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tradeModal = document.getElementById('tradeModal');
    const successModal = document.getElementById('successModal');
    const closeButton = document.querySelector('.close-button');
    const viewTradeButtons = document.querySelectorAll('.view-trade-btn');
    const confirmTradeBtn = document.querySelector('.confirm-trade-btn');
    const cancelTradeBtn = document.querySelector('.cancel-trade-btn');
    const backToHomeBtn = document.querySelector('.back-to-home-btn');
    const nextStepBtn = document.querySelector('.next-step-btn');
    const traderCards = document.querySelectorAll('.trader-card');

    // Tab Switching Logic
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // View Trade Button Logic
    viewTradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            tradeModal.style.display = 'block';
        });
    });

    // Close Modal Logic
    closeButton.addEventListener('click', () => {
        tradeModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === tradeModal) {
            tradeModal.style.display = 'none';
        }
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });

    // Confirm Trade Logic
    confirmTradeBtn.addEventListener('click', () => {
        tradeModal.style.display = 'none';
        successModal.style.display = 'block';
    });

    // Cancel Trade Logic
    cancelTradeBtn.addEventListener('click', () => {
        tradeModal.style.display = 'none';
    });

    // Back to Home Logic
    backToHomeBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
        window.location.href = 'homepage.html';
    });

    // Trader Selection Logic
    traderCards.forEach(card => {
        card.addEventListener('click', () => {
            traderCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    // Next Step Button Logic
    nextStepBtn.addEventListener('click', () => {
        const selectedTrader = document.querySelector('.trader-card.selected');
        if (!selectedTrader) {
            alert('Please select a trader first!');
            return;
        }
        // Here you would typically implement the logic to proceed to the next step
        // For now, we'll just show the trade modal
        tradeModal.style.display = 'block';
    });

    // Sample function to populate items grid (you would need to implement this with your actual data)
    function populateItemGrid() {
        const itemGrid = document.querySelector('.item-selection-grid');
        // Sample data - replace with your actual data
        const items = [
            { id: 1, name: 'PS1 Controller', image: 'path-to-image/ps1.png', condition: 'Mint' },
            { id: 2, name: 'N64 Controller', image: 'path-to-image/n64.png', condition: 'Near Mint' },
            // Add more items as needed
        ];

        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <div class="condition-badge ${item.condition.toLowerCase()}">${item.condition}</div>
            `;
            itemGrid.appendChild(itemCard);

            itemCard.addEventListener('click', () => {
                itemCard.classList.toggle('selected');
            });
        });
    }

    // Call the function to populate items when the page loads
    populateItemGrid();
});