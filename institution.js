// Institution details page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mock detailed institution data
    const institutionData = {
        1: {
            id: 1,
            name: "Tribhuvan University",
            type: "University",
            address: "Kirtipur, Kathmandu, Nepal",
            phone: "+977-1-4330433",
            email: "info@tu.edu.np",
            website: "www.tu.edu.np",
            rating: 4.5,
            established: 1959,
            students: 25000,
            faculty: 1200,
            image: "https://via.placeholder.com/800x300",
            description: "Tribhuvan University is the oldest and largest university in Nepal. It was established in 1959 and offers a wide range of undergraduate and graduate programs across various disciplines.",
            programs: [
                {
                    name: "BSc.CSIT",
                    duration: "4 years",
                    fee: "NPR 80,000",
                    seats: 120,
                    entrance: "TU Entrance Exam",
                    description: "Bachelor of Science in Computer Science and Information Technology",
                },
                {
                    name: "BBA",
                    duration: "4 years",
                    fee: "NPR 60,000",
                    seats: 200,
                    entrance: "TU Entrance Exam",
                    description: "Bachelor of Business Administration",
                },
                {
                    name: "Engineering",
                    duration: "4 years",
                    fee: "NPR 150,000",
                    seats: 300,
                    entrance: "IOE Entrance Exam",
                    description: "Various engineering disciplines available",
                },
            ],
            facilities: [
                "Central Library with 500,000+ books",
                "Computer Labs with latest equipment",
                "Sports Complex",
                "Hostels for students",
                "Medical Center",
                "Cafeteria and Food Courts",
            ],
            admissionProcess: [
                "Fill out the online application form",
                "Submit required documents",
                "Appear for entrance examination",
                "Merit list publication",
                "Document verification",
                "Fee payment and enrollment",
            ],
            preparationTips: [
                "Focus on basic concepts in Mathematics and Science",
                "Practice previous year question papers",
                "Improve English vocabulary and grammar",
                "Stay updated with current affairs",
            ],
        },
    };

    // Get institution ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const institutionId = urlParams.get('id') || '1';
    const institution = institutionData[institutionId];

    if (!institution) {
        document.body.innerHTML = '<div class="container"><h1>Institution not found</h1></div>';
        return;
    }

    // Populate institution data
    populateInstitutionData(institution);

    // Tab functionality
    setupTabs();
});

function populateInstitutionData(institution) {
    // Basic information
    document.getElementById('institutionName').textContent = institution.name;
    document.getElementById('institutionAddress').textContent = institution.address;
    document.getElementById('institutionRating').textContent = institution.rating;
    document.getElementById('institutionType').textContent = institution.type;
    document.getElementById('institutionDescription').textContent = institution.description;
    document.getElementById('institutionImage').src = institution.image;

    // Quick info
    document.getElementById('establishedYear').textContent = institution.established;
    document.getElementById('studentCount').textContent = institution.students.toLocaleString();
    document.getElementById('facultyCount').textContent = institution.faculty.toLocaleString();

    // Overview tab details
    document.getElementById('aboutDescription').textContent = institution.description;
    document.getElementById('detailType').textContent = institution.type;
    document.getElementById('detailEstablished').textContent = institution.established;
    document.getElementById('detailStudents').textContent = institution.students.toLocaleString();
    document.getElementById('detailFaculty').textContent = institution.faculty.toLocaleString();

    // Contact information
    document.getElementById('contactAddress').textContent = institution.address;
    document.getElementById('contactPhone').textContent = institution.phone;
    document.getElementById('contactWebsite').textContent = institution.website;

    // Programs
    populatePrograms(institution.programs);

    // Admission process
    populateAdmissionSteps(institution.admissionProcess);

    // Facilities
    populateFacilities(institution.facilities);

    // Preparation tips
    populatePreparationTips(institution.preparationTips);
}

function populatePrograms(programs) {
    const programsList = document.getElementById('programsList');
    programsList.innerHTML = programs.map(program => `
        <div class="program-card-detailed">
            <div class="program-card-header">
                <div>
                    <h3>${program.name}</h3>
                    <p>${program.description}</p>
                </div>
                <span class="badge">${program.duration}</span>
            </div>
            <div class="program-details-grid">
                <div class="program-detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <div>
                        <p>Annual Fee</p>
                        <p>${program.fee}</p>
                    </div>
                </div>
                <div class="program-detail-item">
                    <i class="fas fa-users"></i>
                    <div>
                        <p>Available Seats</p>
                        <p>${program.seats}</p>
                    </div>
                </div>
                <div class="program-detail-item">
                    <i class="fas fa-file-text"></i>
                    <div>
                        <p>Entrance Exam</p>
                        <p>${program.entrance}</p>
                    </div>
                </div>
                <div class="program-detail-item">
                    <i class="fas fa-clock"></i>
                    <div>
                        <p>Duration</p>
                        <p>${program.duration}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function populateAdmissionSteps(steps) {
    const admissionSteps = document.getElementById('admissionSteps');
    admissionSteps.innerHTML = steps.map((step, index) => `
        <div class="admission-step">
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
                <p>${step}</p>
            </div>
        </div>
    `).join('');
}

function populateFacilities(facilities) {
    const facilitiesList = document.getElementById('facilitiesList');
    facilitiesList.innerHTML = facilities.map(facility => `
        <div class="facility-item">${facility}</div>
    `).join('');
}

function populatePreparationTips(tips) {
    const preparationTips = document.getElementById('preparationTips');
    preparationTips.innerHTML = tips.map(tip => `
        <div class="tip-item">${tip}</div>
    `).join('');
}

function setupTabs() {
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all triggers and panels
            tabTriggers.forEach(t => t.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked trigger and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}
