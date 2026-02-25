// Settings and Dark Mode for Democratic Republic of Pigeonaria Website

// Toggle settings panel
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    
    // Update toggle button text
    updateDarkModeButton();
}

// Update dark mode button text
function updateDarkModeButton() {
    const button = document.getElementById('darkModeToggle');
    if (button) {
        if (document.body.classList.contains('dark-mode')) {
            button.textContent = '☀️ Light Mode';
        } else {
            button.textContent = '🌙 Dark Mode';
        }
    }
}

// Load dark mode preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const darkMode = localStorage.getItem('darkMode');
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    
    updateDarkModeButton();
});

// Close settings panel when clicking outside
document.addEventListener('click', function(event) {
    const panel = document.getElementById('settingsPanel');
    const button = document.getElementById('settingsButton');
    
    if (panel && button) {
        if (!panel.contains(event.target) && !button.contains(event.target)) {
            panel.style.display = 'none';
        }
    }
});

// Back to top button functionality
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
