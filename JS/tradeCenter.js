document.addEventListener('DOMContentLoaded', () => {
    const modals = {
        trade: document.getElementById('tradeModal'),
        success: document.getElementById('successModal')
    };

    const toggleModal = (modal, show) => modal.style.display = show ? 'block' : 'none';

    // switch tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            ['tab-btn', 'tab-content'].forEach(cls =>
                document.querySelectorAll(`.${cls}`).forEach(el => el.classList.remove('active')));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // Modal controls
    document.querySelectorAll('.view-trade-btn').forEach(btn =>
        btn.addEventListener('click', () => toggleModal(modals.trade, true)));

    document.querySelector('.close-button').addEventListener('click', () =>
        toggleModal(modals.trade, false));

    Object.values(modals).forEach(modal =>
        modal.addEventListener('click', e => {
            if (e.target === modal) toggleModal(modal, false);
        }));

    // trade confirm/cancel
    document.querySelector('.confirm-trade-btn').addEventListener('click', () => {
        toggleModal(modals.trade, false);
        toggleModal(modals.success, true);
    });

    document.querySelector('.cancel-trade-btn').addEventListener('click', () =>
        toggleModal(modals.trade, false));

    document.querySelector('.back-to-home-btn').addEventListener('click', () => {
        toggleModal(modals.success, false);
        window.location.href = 'homepage.html';
    });

    // select trader
    document.querySelectorAll('.trader-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.trader-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    document.querySelector('.next-step-btn').addEventListener('click', () => {
        if (!document.querySelector('.trader-card.selected')) {
            alert('Please select a trader first!');
            return;
        }
        toggleModal(modals.trade, true);
    });

    // Item grid population
    const items = [
        { id: 1, name: 'PS1 Controller', image: 'media\\PSController.png', condition: 'Mint' },
        { id: 2, name: 'N64 Controller', image: 'media\\N64Controller.png', condition: 'Near Mint' }
    ];

    const itemGrid = document.querySelector('.item-selection-grid');
    items.forEach(({ image, name, condition }) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <img src="${image}" alt="${name}">
            <h3>${name}</h3>
            <div class="condition-badge ${condition.toLowerCase()}">${condition}</div>
        `;
        card.addEventListener('click', () => card.classList.toggle('selected'));
        itemGrid.appendChild(card);
    });

    // Calculator 
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

        switch (operator) {
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