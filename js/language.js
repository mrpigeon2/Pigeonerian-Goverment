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
    return window.location.protocol === 'http:' || window.location.protocol === 'https:';
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

// Toggle language dropdown
function toggleLanguageSelector() {
    const panel = document.getElementById('languagePanel');
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
    }
}

// Set language
function setLanguage(langCode) {
    localStorage.setItem('siteLanguage', langCode);
    updateLanguageButton(langCode);
    highlightActiveLanguage(langCode);
    
    // Close the language panel
    document.getElementById('languagePanel').style.display = 'none';
    
    if (langCode === 'en') {
        // Reload to show original English
        location.reload();
    } else if (isHosted()) {
        // Translate the page if hosted
        translatePage(langCode);
    }
    // If not hosted and not English, just save preference silently
}

// Translate page content
async function translatePage(targetLang) {
    const loader = document.getElementById('pageLoader');
    
    try {
        if (loader) loader.style.display = 'flex';
        
        // Get all text content elements
        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, li, td, th, span, div, label');
        const textsToTranslate = [];
        const elementsToUpdate = [];
        
        elements.forEach(el => {
            // Skip if element has no direct text or is a script/style
            if (el.children.length === 0 && el.textContent.trim().length > 0) {
                const text = el.textContent.trim();
                if (text && !el.closest('script') && !el.closest('style')) {
                    textsToTranslate.push(text);
                    elementsToUpdate.push(el);
                }
            }
        });
        
        // Translate in batches of 5
        for (let i = 0; i < textsToTranslate.length; i += 5) {
            const batch = textsToTranslate.slice(i, i + 5);
            const batchElements = elementsToUpdate.slice(i, i + 5);
            
            const translations = await Promise.all(
                batch.map(text => translateText(text, targetLang))
            );
            
            // Apply translations
            translations.forEach((translation, index) => {
                if (translation && batchElements[index]) {
                    batchElements[index].textContent = translation;
                }
            });
            
            // Small delay between batches
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        
    } catch (error) {
        console.error('Translation error:', error);
        alert('Translation failed. Please try again.');
    } finally {
        if (loader) loader.style.display = 'none';
    }
}

// Translate single text using MyMemory API
async function translateText(text, targetLang) {
    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
        );
        const data = await response.json();
        
        if (data.responseData && data.responseData.translatedText) {
            return data.responseData.translatedText;
        }
        return text;
    } catch (error) {
        console.error('Translation error:', error);
        return text;
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
