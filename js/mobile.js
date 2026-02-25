// Mobile Device Detection and Optimization for Democratic Republic of Pigeonaria

// Detect device type
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;
    
    return {
        isMobile: isMobile && !isTablet,
        isTablet: isTablet,
        isDesktop: isDesktop,
        isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0
    };
}

// Add device class to body
document.addEventListener('DOMContentLoaded', function() {
    const device = detectDevice();
    
    if (device.isMobile) {
        document.body.classList.add('mobile-device');
        console.log('Mobile device detected');
    } else if (device.isTablet) {
        document.body.classList.add('tablet-device');
        console.log('Tablet device detected');
    } else {
        document.body.classList.add('desktop-device');
        console.log('Desktop device detected');
    }
    
    if (device.isTouch) {
        document.body.classList.add('touch-device');
    }
    
    // Mobile-specific optimizations
    if (device.isMobile) {
        optimizeForMobile();
    }
});

// Mobile optimizations
function optimizeForMobile() {
    // Prevent zoom on input focus (optional)
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
        viewportMeta.setAttribute('content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
    
    // Add mobile menu toggle if navigation exists
    addMobileMenuToggle();
    
    // Optimize touch interactions
    optimizeTouchInteractions();
}

// Mobile menu toggle
function addMobileMenuToggle() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.id = 'mobileMenuToggle';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
        display: none;
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 1001;
        background-color: #2c5aa0;
        color: white;
        border: none;
        border-radius: 5px;
        width: 45px;
        height: 45px;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    `;
    
    // Show on mobile
    if (window.innerWidth <= 768) {
        hamburger.style.display = 'block';
    }
    
    // Toggle menu
    hamburger.addEventListener('click', function() {
        const navUl = nav.querySelector('ul');
        if (navUl) {
            if (navUl.style.display === 'none' || navUl.style.display === '') {
                navUl.style.display = 'flex';
                hamburger.innerHTML = '✕';
            } else {
                navUl.style.display = 'none';
                hamburger.innerHTML = '☰';
            }
        }
    });
    
    document.body.appendChild(hamburger);
    
    // Hide menu initially on mobile
    if (window.innerWidth <= 768) {
        const navUl = nav.querySelector('ul');
        if (navUl) {
            navUl.style.display = 'none';
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const navUl = nav.querySelector('ul');
        if (window.innerWidth > 768) {
            hamburger.style.display = 'none';
            if (navUl) navUl.style.display = 'flex';
        } else {
            hamburger.style.display = 'block';
            if (navUl) navUl.style.display = 'none';
            hamburger.innerHTML = '☰';
        }
    });
}

// Optimize touch interactions
function optimizeTouchInteractions() {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('button, .card, .ministry-card, .party-card');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        button.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    
    // Prevent double-tap zoom on buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Detect orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
});

// Show device info in console (for debugging)
document.addEventListener('DOMContentLoaded', function() {
    const device = detectDevice();
    console.log('Device Info:', {
        type: device.isMobile ? 'Mobile' : device.isTablet ? 'Tablet' : 'Desktop',
        touch: device.isTouch ? 'Yes' : 'No',
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        userAgent: navigator.userAgent
    });
});
