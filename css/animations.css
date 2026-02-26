// Loading Animations for Democratic Republic of Pigeonaria Website

// Page loading animation
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        // Fade out the loader
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Trigger fade-in animations for content
    animateContent();
});

// Animate content on page load
function animateContent() {
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 100); // Stagger the animations
    });
}

// Smooth page transitions when clicking links
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to main content sections
    const sections = document.querySelectorAll('section, .section, .ministry-card, .party-card, .court-section, .organization-card');
    sections.forEach(section => {
        section.classList.add('fade-in-element');
    });
    
    // Intercept internal page links for smooth transitions
    const internalLinks = document.querySelectorAll('a[href$=".html"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply to relative links (not external)
            if (href && !href.startsWith('http') && !href.startsWith('//')) {
                e.preventDefault();
                
                // Fade out current page
                document.body.style.opacity = '0';
                
                // Navigate after fade
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.card, .news-item, .ministry-card, .party-card');
    revealElements.forEach(element => {
        element.classList.add('scroll-reveal-element');
        scrollObserver.observe(element);
    });
});

// Pulse animation for important elements
function pulseElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('pulse-animation');
        setTimeout(() => {
            element.classList.remove('pulse-animation');
        }, 1000);
    }
}

// Typing effect for headers (optional - can be enabled)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}
