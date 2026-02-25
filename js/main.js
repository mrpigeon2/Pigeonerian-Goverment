// Main JavaScript for Democratic Republic of Pigeonaria Government Website

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for internal anchor links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // External links (like .html files) will work normally
        });
    });
});

// Back to top button
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

// Mobile menu toggle (for future responsive design)
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    if (nav) {
        nav.classList.toggle('mobile-active');
    }
}

// Announcement banner close
function closeAnnouncement() {
    const banner = document.getElementById('announcementBanner');
    if (banner) {
        banner.style.display = 'none';
        // Store in localStorage so it stays closed
        localStorage.setItem('announcementClosed', 'true');
    }
}

// Check if announcement was previously closed
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('announcementBanner');
    if (banner && localStorage.getItem('announcementClosed') === 'true') {
        banner.style.display = 'none';
    }
});

// Add fade-in animation to sections as they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});
