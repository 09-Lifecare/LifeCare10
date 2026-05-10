// Profile page initialization
document.addEventListener('DOMContentLoaded', function() {
    const user = redirectIfNotAuthenticated();
    loadProfileData(user);
    setupProfileForm();
    setupPasswordChange();
});

// Load profile data
function loadProfileData(user) {
    document.getElementById('profileName').value = user.name || '';
    document.getElementById('profileNickname').value = user.nickname || '';
    document.getElementById('profileEmail').value = user.email || '';
    document.getElementById('profileRole').value = user.role || '';
    document.getElementById('profilePhone').value = localStorage.getItem(`${user.email}_phone`) || '';
    document.getElementById('profileBio').value = localStorage.getItem(`${user.email}_bio`) || '';
}

// Setup profile form submission
function setupProfileForm() {
    const form = document.getElementById('profileForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const updatedData = {
                ...user,
                name: document.getElementById('profileName').value,
                nickname: document.getElementById('profileNickname').value,
                email: document.getElementById('profileEmail').value
            };
            
            localStorage.setItem('currentUser', JSON.stringify(updatedData));
            localStorage.setItem(`${user.email}_phone`, document.getElementById('profilePhone').value);
            localStorage.setItem(`${user.email}_bio`, document.getElementById('profileBio').value);
            
            alert('Profile updated successfully!');
        });
    }
}

// Setup password change
function setupPasswordChange() {
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            openModal('passwordModal');
        });
    }
    
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            alert('Password changed successfully!');
            closeModal('passwordModal');
            passwordForm.reset();
        });
    }
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Logout handler
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});
