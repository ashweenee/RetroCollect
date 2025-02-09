// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');

// Login Modal Functions
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Login Form Handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        loginModal.style.display = 'none';
        // Handle successful login here
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect sound or animation if needed
    const gameGearButtons = document.querySelectorAll('.game-gear-button');
    
    gameGearButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Add hover sound or effect here
        });
    });

    // Show welcome achievement after a delay
    setTimeout(() => {
        unlockAchievement('Welcome to RetroCollect!');
    }, 1000);
});