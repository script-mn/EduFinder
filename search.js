// Search page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mock data for institutions
    const mockInstitutions = [
        {
            id: 1,
            name: "Tribhuvan University",
            type: "University",
            address: "Kirtipur, Kathmandu",
            distance: "2.5 km",
            rating: 4.5,
            phone: "+977-1-4330433",
            website: "www.tu.edu.np",
            programs: ["BSc.CSIT", "BBA", "Engineering", "Medicine"],
            fees: "NPR 50,000 - 200,000",
            image: "https://via.placeholder.com/300x200",
            established: 1959,
            students: 25000,
        },
        {
            id: 2,
            name: "Kathmandu University",
            type: "University",
            address: "Dhulikhel, Kavre",
            distance: "15.2 km",
            rating: 4.7,
            phone: "+977-11-661399",
            website: "www.ku.edu.np",
            programs: ["Engineering", "Medicine", "Management", "Arts"],
            fees: "NPR 100,000 - 500,000",
            image: "https://via.placeholder.com/300x200",
            established: 1991,
            students: 15000,
        },
        {
            id: 3,
            name: "St. Xavier's College",
            type: "College",
            address: "Maitighar, Kathmandu",
            distance: "3.8 km",
            rating: 4.6,
            phone: "+977-1-4221065",
            website: "www.sxc.edu.np",
            programs: ["BBA", "BBS", "Plus Two Science", "Plus Two Management"],
            fees: "NPR 30,000 - 80,000",
            image: "https://via.placeholder.com/300x200",
            established: 1988,
            students: 3000,
        },
        {
            id: 4,
            name: "Budhanilkantha School",
            type: "School",
            address: "Budhanilkantha, Kathmandu",
            distance: "8.1 km",
            rating: 4.3,
            phone: "+977-1-4371952",
            website: "www.bnks.edu.np",
            programs: ["SEE", "Plus Two Science", "Plus Two Management"],
            fees: "NPR 15,000 - 40,000",
            image: "https://via.placeholder.com/300x200",
            established: 1972,
            students: 2500,
        },
    ];

    let filteredInstitutions = [...mockInstitutions];
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location') || 'Kathmandu';
    const program = urlParams.get('program') || '';

    // Update search title
    document.getElementById('searchTitle').textContent = `Educational Institutions near "${location}"`;

    // Filter and search functionality
    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const programFilter = document.getElementById('programFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const toggleMapBtn = document.getElementById('toggleMapBtn');
    const mapContainer = document.getElementById('mapContainer');
    const mapToggleText = document.getElementById('mapToggleText');

    // Set initial program filter if coming from homepage
    if (program) {
        programFilter.value = program.toLowerCase();
    }

    // Map toggle functionality
    let mapVisible = false;
    toggleMapBtn.addEventListener('click', function() {
        mapVisible = !mapVisible;
        if (mapVisible) {
            mapContainer.style.display = 'block';
            mapToggleText.textContent = 'Hide Map';
        } else {
            mapContainer.style.display = 'none';
            mapToggleText.textContent = 'Show Map';
        }
    });

    // Filter functions
    function applyFilters() {
        const searchQuery = searchInput.value.toLowerCase();
        const typeValue = typeFilter.value;
        const programValue = programFilter.value;
        const ratingValue = ratingFilter.value;

        filteredInstitutions = mockInstitutions.filter(institution => {
            // Search query filter
            const matchesSearch = !searchQuery || 
                institution.name.toLowerCase().includes(searchQuery) ||
                institution.programs.some(prog => prog.toLowerCase().includes(searchQuery));

            // Type filter
            const matchesType = typeValue === 'all' || 
                institution.type.toLowerCase() === typeValue;

            // Program filter
            const matchesProgram = programValue === 'all' || 
                institution.programs.some(prog => prog.toLowerCase().includes(programValue));

            // Rating filter
            const matchesRating = ratingValue === 'all' || 
                institution.rating >= parseFloat(ratingValue);

            return matchesSearch && matchesType && matchesProgram && matchesRating;
        });

        renderInstitutions();
        updateSearchCount();
    }

    // Event listeners for filters
    searchInput.addEventListener('input', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
    programFilter.addEventListener('change', applyFilters);
    ratingFilter.addEventListener('change', applyFilters);

    // Render institutions
    function renderInstitutions() {
        const institutionsList = document.getElementById('institutionsList');
        
        if (filteredInstitutions.length === 0) {
            institutionsList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #6b7280;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No institutions found matching your criteria.</p>
                </div>
            `;
            return;
        }

        institutionsList.innerHTML = filteredInstitutions.map(institution => `
            <div class="institution-card">
                <div class="institution-card-content">
                    <div>
                        <img src="${institution.image}" alt="${institution.name}" class="institution-image">
                    </div>
                    <div class="institution-details">
                        <div class="institution-header">
                            <div>
                                <h3 class="institution-name">${institution.name}</h3>
                                <div class="institution-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>${institution.address} • ${institution.distance}</span>
                                </div>
                            </div>
                            <div class="rating">
                                <i class="fas fa-star"></i>
                                <span>${institution.rating}</span>
                            </div>
                        </div>

                        <div class="institution-meta">
                            <span class="badge">${institution.type}</span>
                            <span>Est. ${institution.established}</span>
                            <span>${institution.students.toLocaleString()} students</span>
                        </div>

                        <div class="programs-offered">
                            <p>Programs offered:</p>
                            <div class="programs-list">
                                ${institution.programs.map(program => `<span class="badge">${program}</span>`).join('')}
                            </div>
                        </div>

                        <div class="institution-footer">
                            <div class="fee-info">
                                <p>Fee Range: ${institution.fees}</p>
                            </div>
                            <div class="institution-actions">
                                <button class="btn btn-outline" onclick="contactInstitution('${institution.phone}')">
                                    <i class="fas fa-phone"></i>
                                    Contact
                                </button>
                                <button class="btn btn-primary" onclick="viewDetails(${institution.id})">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update search count
    function updateSearchCount() {
        document.getElementById('searchCount').textContent = 
            `Found ${filteredInstitutions.length} institutions matching your criteria`;
    }

    // Initial render
    applyFilters();
});

// Global functions for button actions
function contactInstitution(phone) {
    alert(`Contact: ${phone}`);
}

function viewDetails(institutionId) {
    window.location.href = `institution.html?id=${institutionId}`;
}
