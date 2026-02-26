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

// Check if site is hosted (not file://)
function isHosted() {
    return window.location.protocol !== 'file:';
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('siteLanguage') || 'en';
    updateLanguageButton(savedLanguage);
    highlightActiveLanguage(savedLanguage);
    
    // Auto-translate if not English and hosted
    if (savedLanguage !== 'en' && isHosted()) {
        translatePage(savedLanguage);
    }
});
