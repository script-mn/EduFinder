// Main homepage JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('locationInput');
    const detectLocationBtn = document.getElementById('detectLocationBtn');
    const searchBtn = document.getElementById('searchBtn');
    const detectLocationText = document.getElementById('detectLocationText');

    // Location detection functionality
    detectLocationBtn.addEventListener('click', function() {
        if (navigator.geolocation) {
            detectLocationText.textContent = 'Detecting...';
            detectLocationBtn.disabled = true;

            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // In a real application, you would reverse geocode these coordinates
                    locationInput.value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                    
                    detectLocationText.textContent = 'Use My Location';
                    detectLocationBtn.disabled = false;
                },
                function(error) {
                    console.error('Error detecting location:', error);
                    alert('Unable to detect your location. Please enter it manually.');
                    detectLocationText.textContent = 'Use My Location';
                    detectLocationBtn.disabled = false;
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });

    // Search functionality
    searchBtn.addEventListener('click', function() {
        const location = locationInput.value.trim();
        if (location) {
            // Redirect to search page with location parameter
            window.location.href = `search.html?location=${encodeURIComponent(location)}`;
        } else {
            alert('Please enter a location or use location detection.');
        }
    });

    // Allow Enter key to trigger search
    locationInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Program card click handlers
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real application, this would navigate to program-specific results
            const programName = this.querySelector('h4').textContent;
            window.location.href = `search.html?program=${encodeURIComponent(programName)}`;
        });
    });
});
