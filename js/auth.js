// Mock user database
const mockUsers = {
    'user@lifecare.com': {
        password: '123456',
        name: 'Juna Student',
        nickname: 'Juna',
        role: 'Nursing Student'
    },
    'test@lifecare.com': {
        password: 'password123',
        name: 'Marjorie Pascua',
        nickname: 'Jo',
        role: 'Student'
    }
};

// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && window.location.pathname !== '/dashboard.html' && window.location.pathname !== '/profile.html') {
        // User is logged in on home page - show logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.style.display = 'inline-block';
        }
        const getStartedBtn = document.getElementById('getStartedBtn');
        if (getStartedBtn) {
            getStartedBtn.textContent = 'Go to Dashboard';
            getStartedBtn.onclick = () => window.location.href = 'dashboard.html';
        }
    }
}

// Login handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous error
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';

    // Validation
    if (!email || !password || !role) {
        errorMessage.textContent = 'Please fill in all fields!';
        errorMessage.classList.add('show');
        return;
    }

    // Check credentials
    if (mockUsers[email] && mockUsers[email].password === password && mockUsers[email].role === role) {
        // Successful login
        const user = {
            email: email,
            name: mockUsers[email].name,
            nickname: mockUsers[email].nickname,
            role: mockUsers[email].role
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        // Failed login
        errorMessage.textContent = 'Invalid login credentials!';
        errorMessage.classList.add('show');
    }
}

// Logout handler
function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Redirect to login if not authenticated (for protected pages)
function redirectIfNotAuthenticated() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
    }
    return user;
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();

    // Get Started button
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            const loginModal = document.getElementById('loginModal');
            if (loginModal) {
                loginModal.classList.add('show');
            }
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Logout buttons
    const logoutBtns = document.querySelectorAll('#logoutBtn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });

    // Modal close button
    const closeBtn = document.querySelector('.modal .close');
    const loginModal = document.getElementById('loginModal');
    if (closeBtn && loginModal) {
        closeBtn.addEventListener('click', () => {
            loginModal.classList.remove('show');
        });
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('show');
            }
        });
    }
});
