// Search functionality for Democratic Republic of Pigeonaria Website

// Define all searchable pages with their content
const searchablePages = [
    {
        title: "Government Portal",
        url: "website.html",
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
    // Easter egg: "pigeon video"
    if (query === 'pigeon video') {
        playEasterEggVideo('videos/pigeon.mp4');
        return true;
    }
    
    // Add more easter eggs here
    // Example: if (query === 'secret') { ... }
    
    return false;
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
