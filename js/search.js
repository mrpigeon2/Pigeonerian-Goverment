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
