document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');

    if (loginModal) {
        loginModal.style.display = 'none';
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            if (loginModal) {
                loginModal.style.display = 'flex';  
            }
        });
    }

    if (loginModal) {
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }

    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email && password) {
                console.log('Login attempt with:', { email });
                loginModal.style.display = 'none';
            }
        });
    }
});