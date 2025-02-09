document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements using object destructuring
    const {
        tradeModal,
        successModal
    } = {
        tradeModal: document.getElementById('tradeModal'),
        successModal: document.getElementById('successModal')
    };

    // Helper function to toggle modal display
    const toggleModal = (modal, show) => modal.style.display = show ? 'block' : 'none';

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn, .tab-content').forEach(el => el.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // Trade modal controls
    document.querySelectorAll('.view-trade-btn').forEach(btn => 
        btn.addEventListener('click', () => toggleModal(tradeModal, true)));

    document.querySelector('.close-button').addEventListener('click', () => 
        toggleModal(tradeModal, false));

    // Modal background click handlers
    [tradeModal, successModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) toggleModal(modal, false);
        });
    });

    // Trade confirmation flow
    document.querySelector('.confirm-trade-btn').addEventListener('click', () => {
        toggleModal(tradeModal, false);
        toggleModal(successModal, true);
    });

    document.querySelector('.cancel-trade-btn').addEventListener('click', () => 
        toggleModal(tradeModal, false));

    document.querySelector('.back-to-home-btn').addEventListener('click', () => {
        toggleModal(successModal, false);
        window.location.href = 'homepage.html';
    });

    // Trader card selection
    document.querySelectorAll('.trader-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.trader-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    // Next step validation
    document.querySelector('.next-step-btn').addEventListener('click', () => {
        if (!document.querySelector('.trader-card.selected')) {
            alert('Please select a trader first!');
            return;
        }
        toggleModal(tradeModal, true);
    });

    // Populate item grid
    const populateItemGrid = () => {
        const items = [
            { id: 1, name: 'PS1 Controller', image: 'media\\PSController.png', condition: 'Mint' },
            { id: 2, name: 'N64 Controller', image: 'media\\N64Controller.png', condition: 'Near Mint' }
        ];

        const itemGrid = document.querySelector('.item-selection-grid');
        items.forEach(({ image, name, condition }) => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <img src="${image}" alt="${name}">
                <h3>${name}</h3>
                <div class="condition-badge ${condition.toLowerCase()}">${condition}</div>
            `;
            itemCard.addEventListener('click', () => itemCard.classList.toggle('selected'));
            itemGrid.appendChild(itemCard);
        });
    };

    populateItemGrid();
});

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn, .tab-content').forEach(el => 
                el.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // Calculator functionality
    const display = document.querySelector('.calculator-display');
    let currentValue = '0';
    let previousValue = null;
    let operator = null;
    let newNumber = true;

    const updateDisplay = () => display.textContent = currentValue;

    const calculate = () => {
        const prev = parseFloat(previousValue);
        const curr = parseFloat(currentValue);
        let result = 0;
        
        switch(operator) {
            case '+': result = prev + curr; break;
            case '-': result = prev - curr; break;
            case '×': result = prev * curr; break;
            case '÷': result = prev / curr; break;
            default: return curr;
        }
        return Math.round(result * 100) / 100;
    };

    document.querySelectorAll('.calculator-btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                if (newNumber) {
                    currentValue = value === '.' ? '0.' : value;
                    newNumber = false;
                } else {
                    if (value === '.' && currentValue.includes('.')) return;
                    currentValue += value;
                }
                updateDisplay();
            } else if (['+', '-', '×', '÷'].includes(value)) {
                if (previousValue === null) {
                    previousValue = currentValue;
                } else if (!newNumber) {
                    previousValue = calculate().toString();
                }
                operator = value;
                newNumber = true;
                updateDisplay();
            } else if (value === '=') {
                if (operator && !newNumber) {
                    currentValue = calculate().toString();
                    previousValue = null;
                    operator = null;
                    newNumber = true;
                    updateDisplay();
                }
            } else if (value === 'C') {
                currentValue = '0';
                previousValue = null;
                operator = null;
                newNumber = true;
                updateDisplay();
            }
        });
    });
});