// Search functionality for Democratic Republic of Pigeonaria Website

// Define all searchable pages with their content
const searchablePages = [
    {
        title: "Government Portal",
        url: "index.html",
        keywords: "government portal home main ministries services transparency elections democracy pigeonaria featherhold prime minister council wings"
    },
    {
        title: "Constitution",
        url: "constitution.html",
        keywords: "constitution instrument government law fundamental rights democracy parliament council wings judiciary courts chapters articles"
    },
    {
        title: "Council of Wings",
        url: "how the council of wings works.html",
        keywords: "council wings parliament legislature legislative body representatives voting laws bills committees speaker"
    },
    {
        title: "Courts - Judicial Branch",
        url: "thetwocourts.html",
        keywords: "courts judicial supreme court constitutional court justice judges legal system judiciary featherhold"
    },
    {
        title: "Political Parties",
        url: "politicalparties.html",
        keywords: "political parties pioneer party earthfirst alliance ressortissants registration elections democracy voting"
    },
    {
        title: "Referendums",
        url: "referendums.html",
        keywords: "referendums citizen initiatives voting democracy direct democracy league servers public opinion"
    },
    {
        title: "International Relations",
        url: "internationalrelations.html",
        keywords: "international relations foreign affairs diplomacy neutrality treaties league servers trade cooperation"
    }
];

// Toggle search panel
function toggleSearch() {
    const panel = document.getElementById('searchPanel');
    const input = document.getElementById('searchInput');
    
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';
        input.focus();
    } else {
        panel.style.display = 'none';
        clearSearch();
    }
}

// Perform search
function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    
    if (query.length < 2) {
        resultsContainer.innerHTML = '<p style="color: #666; padding: 10px;">Please enter at least 2 characters to search.</p>';
        return;
    }
    
    // Easter egg: Check for secret searches
    if (checkEasterEgg(query)) {
        return; // Easter egg triggered, don't show normal results
    }
    
    // Search through all pages
    const results = searchablePages.filter(page => {
        return page.title.toLowerCase().includes(query) || 
               page.keywords.toLowerCase().includes(query);
    });
    
    // Display results
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p style="color: #666; padding: 10px;">No results found for "' + query + '"</p>';
    } else {
        let html = '<div style="padding: 10px;"><strong>Found ' + results.length + ' result(s):</strong></div>';
        results.forEach(result => {
            html += '<a href="' + result.url + '" class="search-result-item">';
            html += '<strong>' + result.title + '</strong>';
            html += '<div style="font-size: 0.9em; color: #666;">' + result.url + '</div>';
            html += '</a>';
        });
        resultsContainer.innerHTML = html;
    }
}

// Easter egg checker
function checkEasterEgg(query) {
    // Easter egg: "NATO"
    if (query.toUpperCase() === 'NATO') {
        triggerNATOAnimation();
        return true;
    }
    
    // Easter egg: "pigeon animation"
    if (query === 'pigeon animation') {
        triggerPigeonAnimation();
        return true;
    }
    
    // Easter egg: "pigeon video"
    if (query === 'pigeon video') {
        playEasterEggVideo('videos/pigeon.mp4');
        return true;
    }
    
    // Easter egg: "sigeon pex"
    if (query === 'sigeon pex') {
        playEasterEggVideo('videos/sigeon.mp4');
        return true;
    }
    
    // Easter egg: "pigstein files" - redirect to secret page
    if (query === 'pigstein files') {
        window.location.href = 'secret-pigstein-files.html';
        return true;
    }
    
    // Add more easter eggs here
    // Example: if (query === 'secret') { ... }
    
    return false;
}

// NATO Easter egg - 32 flags with anthem
function triggerNATOAnimation() {
    // Close search panel
    document.getElementById('searchPanel').style.display = 'none';
    clearSearch();
    
    // Create animation container
    const container = document.createElement('div');
    container.id = 'natoAnimationContainer';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.1);
    `;
    document.body.appendChild(container);
    
    // Play NATO anthem
    const anthem = new Audio('sounds/nato.mp3');
    anthem.volume = 0.6;
    anthem.play().catch(err => console.log('Audio play prevented:', err));
    
    // Create NATO logo in center
    const natoLogo = document.createElement('img');
    natoLogo.src = 'Images/nato.png';
    natoLogo.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 300px;
        height: auto;
        filter: drop-shadow(0 8px 24px rgba(0,0,0,0.4));
        z-index: 10000;
    `;
    container.appendChild(natoLogo);
    
    // Animate NATO logo appearing
    natoLogo.animate([
        { transform: 'translate(-50%, -50%) scale(0) rotate(-180deg)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1.2) rotate(0deg)', opacity: 1, offset: 0.5 },
        { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: 1 }
    ], {
        duration: 2000,
        easing: 'ease-out',
        fill: 'forwards'
    });
    
    // Create 32 NATO member flags in a circle formation
    const numFlags = 32;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.42; // Increased from 0.35 to 0.42
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < numFlags; i++) {
        setTimeout(() => createNATOFlag(container, i, numFlags, radius, centerX, centerY), i * 150 + 2000);
    }
    
    // Remove container after animation completes
    setTimeout(() => {
        anthem.pause();
        anthem.currentTime = 0;
        if (document.getElementById('natoAnimationContainer')) {
            document.body.removeChild(container);
        }
    }, 78000); // 1 minute 18 seconds (78 seconds total)
}

// Create a single NATO flag
function createNATOFlag(container, index, total, radius, centerX, centerY) {
    const flag = document.createElement('img');
    flag.src = `Images/${index + 1}.png`; // 1.png through 32.png
    
    // Calculate position in circle
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2; // Start from top
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    flag.style.cssText = `
        position: absolute;
        width: 120px;
        height: auto;
        left: ${centerX}px;
        top: ${centerY}px;
        transform: translate(-50%, -50%) scale(0);
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
        border: 3px solid white;
        border-radius: 4px;
        box-shadow: 0 0 20px rgba(255,255,255,0.5);
    `;
    
    container.appendChild(flag);
    
    // Animate flag flying out to position
    flag.animate([
        { 
            left: `${centerX}px`,
            top: `${centerY}px`,
            transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
            opacity: 0
        },
        { 
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%) scale(1.2) rotate(360deg)',
            opacity: 1,
            offset: 0.7
        },
        { 
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%) scale(1) rotate(360deg)',
            opacity: 1
        }
    ], {
        duration: 1500,
        easing: 'ease-out',
        fill: 'forwards'
    });
    
    // Add gentle floating animation
    setTimeout(() => {
        flag.animate([
            { transform: 'translate(-50%, -50%) scale(1) translateY(0px)' },
            { transform: 'translate(-50%, -50%) scale(1) translateY(-10px)' },
            { transform: 'translate(-50%, -50%) scale(1) translateY(0px)' }
        ], {
            duration: 3000,
            easing: 'ease-in-out',
            iterations: Infinity
        });
    }, 1500);
    
    // Pulse effect on flag
    setTimeout(() => {
        flag.animate([
            { filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3)) brightness(1)' },
            { filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3)) brightness(1.3)' },
            { filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3)) brightness(1)' }
        ], {
            duration: 2000,
            easing: 'ease-in-out',
            iterations: Infinity
        });
    }, 1500 + index * 100);
}

// Pigeon animation Easter egg
function triggerPigeonAnimation() {
    // Close search panel
    document.getElementById('searchPanel').style.display = 'none';
    clearSearch();
    
    // Create animation container
    const container = document.createElement('div');
    container.id = 'pigeonAnimationContainer';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(container);
    
    // Add screen shake CSS
    const shakeStyle = document.createElement('style');
    shakeStyle.id = 'pigeonShakeStyle';
    shakeStyle.textContent = `
        @keyframes screenShake {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            10% { transform: translate(-5px, 2px) rotate(-0.5deg); }
            20% { transform: translate(5px, -2px) rotate(0.5deg); }
            30% { transform: translate(-3px, 4px) rotate(-0.3deg); }
            40% { transform: translate(3px, -4px) rotate(0.3deg); }
            50% { transform: translate(-4px, 3px) rotate(-0.4deg); }
            60% { transform: translate(4px, -3px) rotate(0.4deg); }
            70% { transform: translate(-2px, 5px) rotate(-0.2deg); }
            80% { transform: translate(2px, -5px) rotate(0.2deg); }
            90% { transform: translate(-3px, 2px) rotate(-0.3deg); }
        }
        .shake-screen {
            animation: screenShake 0.5s ease-in-out infinite;
        }
    `;
    document.head.appendChild(shakeStyle);
    
    // Start screen shaking
    document.body.classList.add('shake-screen');
    
    // Create 20 HUGE pigeons in a parade
    const numPigeons = 20;
    const totalDuration = 30000; // 30 seconds total
    
    for (let i = 0; i < numPigeons; i++) {
        setTimeout(() => createParadePigeon(container, i), i * 1200);
    }
    
    // Stop shaking and remove container after animation
    setTimeout(() => {
        document.body.classList.remove('shake-screen');
        if (document.getElementById('pigeonShakeStyle')) {
            document.head.removeChild(shakeStyle);
        }
        if (document.getElementById('pigeonAnimationContainer')) {
            document.body.removeChild(container);
        }
    }, totalDuration);
}

// Create a HUGE parade pigeon
function createParadePigeon(container, index) {
    const pigeon = document.createElement('img');
    pigeon.src = 'Images/pigeon.png';
    
    // Alternate between top and bottom, left and right
    const fromTop = index % 2 === 0;
    const fromLeft = index % 4 < 2;
    
    // HUGE size - varies between 200-350px
    const size = 200 + Math.random() * 150;
    
    // Starting position (off screen)
    let startX, startY, endX, endY;
    
    if (fromLeft) {
        startX = -size - 100;
        endX = window.innerWidth + 100;
    } else {
        startX = window.innerWidth + 100;
        endX = -size - 100;
    }
    
    if (fromTop) {
        startY = Math.random() * (window.innerHeight * 0.3);
    } else {
        startY = window.innerHeight * 0.5 + Math.random() * (window.innerHeight * 0.3);
    }
    
    endY = startY + (Math.random() - 0.5) * 200; // Slight vertical movement
    
    pigeon.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: auto;
        left: ${startX}px;
        top: ${startY}px;
        transform: ${fromLeft ? 'scaleX(1)' : 'scaleX(-1)'} rotate(0deg);
        filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));
        opacity: 0;
    `;
    
    container.appendChild(pigeon);
    
    // Animate HUGE pigeon marching across screen
    const duration = 8000 + Math.random() * 4000;
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    pigeon.animate([
        { 
            left: `${startX}px`,
            top: `${startY}px`,
            transform: `${fromLeft ? 'scaleX(1)' : 'scaleX(-1)'} rotate(${fromLeft ? -5 : 5}deg) scale(0.8)`,
            opacity: 0
        },
        { 
            left: `${startX + (endX - startX) * 0.1}px`,
            top: `${startY}px`,
            transform: `${fromLeft ? 'scaleX(1)' : 'scaleX(-1)'} rotate(0deg) scale(1)`,
            opacity: 1,
            offset: 0.1
        },
        { 
            left: `${midX}px`,
            top: `${midY}px`,
            transform: `${fromLeft ? 'scaleX(1)' : 'scaleX(-1)'} rotate(${fromLeft ? 3 : -3}deg) scale(1.1)`,
            opacity: 1,
            offset: 0.5
        },
        { 
            left: `${endX - (endX - startX) * 0.1}px`,
            top: `${endY}px`,
            transform: `${fromLeft ? 'scaleX(1)' : 'scaleX(-1)'} rotate(0deg) scale(1)`,
            opacity: 1,
            offset: 0.9
        },
        { 
            left: `${endX}px`,
            top: `${endY}px`,
            transform: `${fromLeft ? 'scaleX(1)' : 'scaleX(-1)'} rotate(${fromLeft ? 5 : -5}deg) scale(0.8)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'ease-in-out'
    });
    
    // Create LOTS of feathers falling from HUGE pigeon
    const featherInterval = setInterval(() => {
        if (!document.getElementById('pigeonAnimationContainer')) {
            clearInterval(featherInterval);
            return;
        }
        // More feathers for bigger pigeons
        createFeather(container, pigeon);
        if (Math.random() > 0.5) createFeather(container, pigeon);
    }, 200);
    
    // Stop creating feathers after pigeon is gone
    setTimeout(() => clearInterval(featherInterval), duration);
    
    // Remove pigeon after animation
    setTimeout(() => {
        if (pigeon.parentNode) {
            pigeon.parentNode.removeChild(pigeon);
        }
    }, duration + 100);
}

// Create falling feather
function createFeather(container, pigeon) {
    const feather = document.createElement('img');
    feather.src = 'Images/feather.png';
    
    // Get pigeon's current position
    const pigeonRect = pigeon.getBoundingClientRect();
    const startX = pigeonRect.left + Math.random() * pigeonRect.width;
    const startY = pigeonRect.top + Math.random() * pigeonRect.height;
    
    // Bigger feathers for bigger pigeons
    const featherSize = 30 + Math.random() * 30;
    
    feather.style.cssText = `
        position: absolute;
        width: ${featherSize}px;
        height: auto;
        left: ${startX}px;
        top: ${startY}px;
        opacity: 0.9;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
    `;
    
    container.appendChild(feather);
    
    // Animate feather falling with rotation and drift
    const endX = startX + (Math.random() - 0.5) * 300;
    const duration = 2000 + Math.random() * 2000;
    
    feather.animate([
        { 
            top: `${startY}px`,
            left: `${startX}px`,
            transform: 'rotate(0deg)',
            opacity: 0.9
        },
        { 
            top: `${startY + 200}px`,
            left: `${(startX + endX) / 2}px`,
            transform: 'rotate(180deg)',
            opacity: 0.7,
            offset: 0.5
        },
        { 
            top: `${window.innerHeight + 50}px`,
            left: `${endX}px`,
            transform: 'rotate(360deg)',
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'ease-in'
    });
    
    // Remove feather after animation
    setTimeout(() => {
        if (feather.parentNode) {
            feather.parentNode.removeChild(feather);
        }
    }, duration + 100);
}

// Play fullscreen easter egg video
function playEasterEggVideo(videoPath) {
    // Close search panel
    document.getElementById('searchPanel').style.display = 'none';
    clearSearch();
    
    // Create video overlay
    const overlay = document.createElement('div');
    overlay.id = 'easterEggOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    
    // Create video element
    const video = document.createElement('video');
    video.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
    `;
    video.src = videoPath;
    video.autoplay = true;
    video.controls = true;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        color: black;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        z-index: 10001;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    `;
    closeBtn.onclick = function() {
        document.body.removeChild(overlay);
    };
    
    // Add elements
    overlay.appendChild(video);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    
    // Remove overlay when video ends
    video.addEventListener('ended', function() {
        document.body.removeChild(overlay);
    });
    
    // Remove overlay on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape' && document.getElementById('easterEggOverlay')) {
            document.body.removeChild(overlay);
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
}

// Close search when clicking outside
document.addEventListener('click', function(event) {
    const panel = document.getElementById('searchPanel');
    const button = document.getElementById('searchButton');
    
    if (panel && button) {
        if (!panel.contains(event.target) && !button.contains(event.target)) {
            panel.style.display = 'none';
        }
    }
});

// Search on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});
