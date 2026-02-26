// Language selector for Democratic Republic of Pigeonaria Website

// Available languages
const languages = {
    'en': 'English',
    'fr': 'Français',
    'es': 'Español',
    'de': 'Deutsch',
    'it': 'Italiano',
    'ru': 'Русский',
    'pt': 'Português',
    'pl': 'Polski',
    'nl': 'Nederlands',
    'el': 'Ελληνικά',
    'sv': 'Svenska',
    'hu': 'Magyar',
    'ro': 'Română',
    'uk': 'Українська'
};

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('siteLanguage') || 'en';
    updateLanguageButton(savedLanguage);
    highlightActiveLanguage(savedLanguage);
});

// Toggle language dropdown
function toggleLanguageSelector() {
    const panel = document.getElementById('languagePanel');
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
    }
}

// Set language - for now just saves preference
function setLanguage(langCode) {
    localStorage.setItem('siteLanguage', langCode);
    updateLanguageButton(langCode);
    highlightActiveLanguage(langCode);
    
    // Close the language panel
    document.getElementById('languagePanel').style.display = 'none';
    
    // Show message to user
    if (langCode !== 'en') {
        alert(`Language set to ${languages[langCode]}. Translation feature will be available when the site is hosted online. For now, the site remains in English.`);
    }
}

// Update language button text
function updateLanguageButton(langCode) {
    const button = document.getElementById('languageButton');
    if (button) {
        button.title = languages[langCode];
    }
}

// Highlight active language in the panel
function highlightActiveLanguage(langCode) {
    const buttons = document.querySelectorAll('#languagePanel button');
    buttons.forEach(button => {
        const btnLang = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (btnLang === langCode) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Close language panel when clicking outside
document.addEventListener('click', function(event) {
    const panel = document.getElementById('languagePanel');
    const button = document.getElementById('languageButton');
    
    if (panel && button) {
        if (!panel.contains(event.target) && !button.contains(event.target)) {
            panel.style.display = 'none';
        }
    }
});
