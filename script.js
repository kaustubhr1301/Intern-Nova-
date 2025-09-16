document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // --- Single Page Application (SPA) Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const ctaButton = document.querySelector('.cta-button');

    function showSection(targetId) {
        pageSections.forEach(section => {
            if ('#' + section.id === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        // Scroll to the top of the page on navigation
        window.scrollTo(0, 0);
    }

    const allLinks = [...navLinks, ctaButton]; // Combine nav links and CTA

    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Navigate to the section
            showSection(targetId);

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // --- Floating Cart Logic ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.getElementById('cart-count');
    const floatingCart = document.getElementById('floating-cart');
    let cartCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            cartCountElement.textContent = cartCount;

            // Animate cart
            floatingCart.classList.add('item-added-animation');
            setTimeout(() => {
                floatingCart.classList.remove('item-added-animation');
            }, 500); // Animation duration
            
            // Provide user feedback
            button.textContent = 'Added!';
            button.style.backgroundColor = '#a8e6cf'; // light-green
            button.style.color = '#333';
            
            setTimeout(() => {
                 button.textContent = 'Add to Favorites';
                 button.style.backgroundColor = ''; // Revert to original color from CSS
                 button.style.color = '';
            }, 1500);
        });
    });
    
    // Add a simple animation style via JS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes cart-pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        .item-added-animation {
            animation: cart-pop 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // --- Form Submission Simulation ---
    const contactForm = document.getElementById('contact-form');
    const loginForm = document.getElementById('login-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login functionality is a demo. You are now "logged in"!');
        loginForm.reset();
    });

});
document.addEventListener('DOMContentLoaded', () => {

    // --- MOCK DATA (Simulating a database/API) ---
    const internshipsData = [
        { id: 1, title: 'Data Science Intern', company: 'Ministry of IT & Electronics', location: 'Delhi', featured: true, stipend: '20,000/month', duration: '3 Months', skills: ['Python', 'R', 'SQL', 'Machine Learning'], details: 'Work on real-world government datasets to derive actionable insights. Assist in developing predictive models for public policy.' },
        { id: 2, title: 'Web Development Intern', company: 'National Informatics Centre', location: 'Bangalore', featured: true, stipend: '18,000/month', duration: '6 Months', skills: ['HTML', 'CSS', 'JavaScript', 'React'], details: 'Contribute to the development of high-impact public-facing websites and applications. Learn agile methodologies in a large-scale environment.' },
        { id: 3, title: 'Public Policy Research', company: 'NITI Aayog', location: 'Mumbai', featured: true, stipend: '15,000/month', duration: '4 Months', skills: ['Research', 'Data Analysis', 'Writing'], details: 'Conduct in-depth research on key policy issues facing India. Prepare reports and policy briefs for senior officials.' },
        { id: 4, title: 'Cybersecurity Analyst', company: 'CERT-In', location: 'Hyderabad', featured: false, stipend: '22,000/month', duration: '6 Months', skills: ['Networking', 'Linux', 'Python', 'Wireshark'], details: 'Monitor network traffic for suspicious activity and assist in incident response. A great opportunity to learn from top cybersecurity experts.' },
        { id: 5, title: 'Mechanical Design Intern', company: 'DRDO', location: 'Pune', featured: false, stipend: '17,000/month', duration: '5 Months', skills: ['AutoCAD', 'SolidWorks', 'FEA'], details: 'Assist in the design and analysis of mechanical components for defense applications. Gain hands-on experience with advanced engineering tools.' }
    ];

    const studentData = {
        allotted: {
            name: 'Priya Sharma',
            email: 'student@example.com',
            field: 'Computer Science',
            profilePic: 'https://images.unsplash.com/photo-1544005313-94ddf0286de2?q=80&w=100',
            status: 'Allotted',
            internship: internshipsData[1], // Allotted the Web Dev Internship
            skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
        },
        notAllotted: {
            name: 'Rohan Verma',
            email: 'student2@example.com',
            field: 'Public Policy',
            profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100',
            status: 'Not Allotted',
            feedback: {
                cons: ['Lacked practical examples in the application essay.', 'Resume could be formatted better to highlight key projects.'],
                improvements: ['Enroll in a "Project Management" certification.', 'Contribute to an open-source policy project on GitHub.', 'Seek a resume review from a career advisor.']
            },
            skills: ['Research', 'Microsoft Office', 'Public Speaking'],
        }
    };
    
    // --- APPLICATION STATE ---
    let state = {
        isLoggedIn: false,
        currentUser: null, // Will be 'allotted' or 'notAllotted'
        cartCount: 0,
    };

    // --- SELECTORS ---
    const mainContent = document.querySelector('main');

    // --- RENDER FUNCTIONS (Dynamically create HTML) ---
    
    const renderInternships = (containerId, data) => {
        const container = document.getElementById(containerId);
        container.innerHTML = data.map(internship => `
            <div class="card" data-internship-id="${internship.id}">
                <h3>${internship.title}</h3>
                <p>${internship.company}</p>
                <span>Location: ${internship.location}</span>
            </div>
        `).join('');
    };

    const renderInternshipDetail = (internshipId) => {
        const internship = internshipsData.find(i => i.id == internshipId);
        const container = document.getElementById('internship-detail-content');
        if (!internship) {
            container.innerHTML = `<p>Internship not found.</p>`;
            return;
        }
        container.innerHTML = `
            <div class="internship-detail-grid">
                <div class="detail-main">
                    <div class="detail-header">
                        <h1>${internship.title}</h1>
                        <p>${internship.company}</p>
                    </div>
                    <h3>Responsibilities:</h3>
                    <p>${internship.details}</p>
                    <h3>Required Skills:</h3>
                    <ul>
                        ${internship.skills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
                <div class="detail-sidebar">
                    <h3>Overview</h3>
                    <div class="info-item"><strong>Stipend:</strong> ₹${internship.stipend}</div>
                    <div class="info-item"><strong>Duration:</strong> ${internship.duration}</div>
                    <div class="info-item"><strong>Location:</strong> ${internship.location}</div>
                    <button class="cta-button" style="width:100%">Apply Now</button>
                </div>
            </div>`;
    };

    const renderDashboard = () => {
        const user = studentData[state.currentUser];
        const container = document.getElementById('dashboard-content');
        let feedbackHTML = '';

        if (user.status === 'Allotted') {
            feedbackHTML = `
                <div class="dash-card" id="dash-feedback">
                    <h3>Current Allotment</h3>
                    <h4>${user.internship.title}</h4>
                    <p>at ${user.internship.company}</p>
                    <p>Congratulations! Your internship is confirmed. Check your email for onboarding details.</p>
                </div>`;
        } else {
            feedbackHTML = `
                <div class="dash-card" id="dash-feedback">
                    <h3>Constructive Feedback</h3>
                    <p>Here are some reasons you may not have been shortlisted:</p>
                    <ul>${user.feedback.cons.map(con => `<li>${con}</li>`).join('')}</ul>
                </div>
                <div class="dash-card" id="dash-improve">
                    <h3>How to Upgrade</h3>
                    <ul class="improve-list">${user.feedback.improvements.map(imp => `<li>${imp}</li>`).join('')}</ul>
                </div>`;
        }

        container.innerHTML = `
            <h2>Welcome, ${user.name}</h2>
            <div class="dashboard-grid">
                <div class="dash-card" id="dash-profile">
                    <img src="${user.profilePic}" alt="Profile Picture">
                    <div>
                        <h4>${user.name}</h4>
                        <p>${user.email}</p>
                        <span>Field: ${user.field}</span>
                    </div>
                </div>
                <div class="dash-card" id="dash-status">
                    <h3>Application Status</h3>
                    <h2>${user.status}</h2>
                </div>
                <div class="dash-card" id="dash-skills">
                    <h3>Your Skills</h3>
                    <ul class="skill-list">${user.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
                </div>
                ${feedbackHTML}
            </div>`;
    };

    // --- NAVIGATION / ROUTING ---
    const pageSections = document.querySelectorAll('.page-section');
    const showSection = (targetId) => {
        pageSections.forEach(section => {
            section.classList.toggle('active', `#${section.id}` === targetId);
        });
        window.scrollTo(0, 0);

        // Dynamic rendering based on route
        if (targetId === '#all-internships') renderInternships('all-internships-grid', internshipsData);
        if (targetId === '#dashboard' && state.isLoggedIn) renderDashboard();
    };

    mainContent.addEventListener('click', (e) => {
        if (e.target.closest('.card')) {
            const card = e.target.closest('.card');
            const internshipId = card.dataset.internshipId;
            renderInternshipDetail(internshipId);
            showSection('#internship-detail');
        }
    });

    document.querySelector('.navbar').addEventListener('click', (e) => {
        if (e.target.matches('.nav-link')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                showSection(targetId);
            }
        }
    });

    // --- AUTHENTICATION (Simulated) ---
    const updateAuthView = () => {
        const views = document.querySelectorAll('.auth-view');
        views.forEach(view => {
            view.style.display = view.dataset.view === (state.isLoggedIn ? 'logged-in' : 'logged-out') ? '' : 'none';
        });
    };

    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Simple check for demo purposes
        const email = document.getElementById('login-email').value;
        state.isLoggedIn = true;
        state.currentUser = email.includes('2') ? 'notAllotted' : 'allotted';
        updateAuthView();
        showSection('#dashboard');
    });
    
    document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        state.isLoggedIn = false;
        state.currentUser = null;
        updateAuthView();
        showSection('#home');
    });

    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Account created successfully! Please login.');
        showSection('#login');
    });
    

    // --- CHATBOT LOGIC ---
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chatbot-messages');

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const getBotResponse = (text) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('application') || lowerText.includes('apply')) {
            return "To apply, navigate to an internship you're interested in and click 'Apply Now'. Make sure your profile is complete!";
        } else if (lowerText.includes('interview') || lowerText.includes('tips')) {
            return "Great question! For interviews, research the organization, prepare answers for common questions, and have questions of your own ready. Confidence is key!";
        } else if (lowerText.includes('skills')) {
            return "Most tech internships require skills like Python, JavaScript, or SQL. Policy internships often look for strong research and writing skills. Check the specific requirements on the internship detail page.";
        } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
            return "Hello there! What can I help you with today?";
        }
        return "I'm not sure I understand. You can ask me about the 'application process', 'interview tips', or 'required skills'.";
    };

    sendBtn.addEventListener('click', () => {
        const userText = userInput.value.trim();
        if (userText) {
            addMessage(userText, 'user');
            userInput.value = '';
            setTimeout(() => {
                const botText = getBotResponse(userText);
                addMessage(botText, 'bot');
            }, 500);
        }
    });
    
    userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendBtn.click(); });
    
    // --- GENERAL & INITIALIZATION ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    const init = () => {
        // Render initial content
        renderInternships('featured-internships', internshipsData.filter(i => i.featured));
        updateAuthView();
        showSection('#home');
    };

    init(); // Run the app
});

document.addEventListener('DOMContentLoaded', () => {

    // --- MOCK DATA (Simplified to a single student for the demo) ---
    const sampleStudent = {
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        field: 'Computer Science',
        profilePic: 'https://images.unsplash.com/photo-1544005313-94ddf0286de2?q=80&w=100',
        status: 'Actively Seeking',
        // ADDED: Skill data now includes proficiency levels for the chart
        skillSet: [
            { name: 'Python', level: 90 },
            { name: 'JavaScript', level: 85 },
            { name: 'React', level: 80 },
            { name: 'SQL', level: 75 },
            { name: 'Data Analysis', level: 70 },
            { name: 'CSS', level: 65 },
        ],
        feedback: {
            cons: ['Lacked practical examples in the application essay.', 'Resume could be formatted better to highlight key projects.'],
            improvements: ['Enroll in a "Project Management" certification.', 'Contribute to an open-source policy project on GitHub.', 'Seek a resume review from a career advisor.']
        }
    };

    const internshipsData = [
        { id: 1, title: 'Data Science Intern', company: 'Ministry of IT & Electronics', location: 'Delhi', featured: true },
        { id: 2, title: 'Web Development Intern', company: 'National Informatics Centre', location: 'Bangalore', featured: true },
        { id: 3, title: 'Public Policy Research', company: 'NITI Aayog', location: 'Mumbai', featured: true },
        { id: 4, title: 'Cybersecurity Analyst', company: 'CERT-In', location: 'Hyderabad', featured: false },
        { id: 5, title: 'Mechanical Design Intern', company: 'DRDO', location: 'Pune', featured: false }
    ];

    let skillChartInstance = null; // To hold the chart instance

    // --- RENDER FUNCTIONS ---
    
    /**
     * ADDED: Renders a bar chart of student skills using Chart.js
     * @param {Array} skillSet - The student's skills with names and levels
     */
    function renderSkillChart(skillSet) {
        const ctx = document.getElementById('skillChart').getContext('2d');

        // Destroy the old chart instance if it exists, to prevent bugs
        if (skillChartInstance) {
            skillChartInstance.destroy();
        }

        skillChartInstance = new Chart(ctx, {
            type: 'bar', // Bar chart
            data: {
                labels: skillSet.map(skill => skill.name), // Skill names as labels
                datasets: [{
                    label: 'Proficiency Level',
                    data: skillSet.map(skill => skill.level), // Skill levels as data
                    backgroundColor: [
                        'rgba(168, 230, 207, 0.6)',
                        'rgba(255, 218, 185, 0.6)',
                        'rgba(46, 139, 87, 0.6)',
                    ],
                    borderColor: [
                        'rgba(168, 230, 207, 1)',
                        'rgba(255, 218, 185, 1)',
                        'rgba(46, 139, 87, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', // Makes the bar chart horizontal for better readability
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // Hide the legend
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100 // Scale from 0 to 100
                    }
                }
            }
        });
    }

    /**
     * UPDATED: Populates the entire dashboard, including profile, status, and the new skill chart.
     */
    function renderDashboard() {
        const user = sampleStudent;
        
        // Populate Profile Card
        document.getElementById('dash-profile').innerHTML = `
            <img src="${user.profilePic}" alt="Profile Picture">
            <div>
                <h4>${user.name}</h4>
                <p>${user.email}</p>
                <span>Field: ${user.field}</span>
            </div>`;

        // Populate Status Card
        document.getElementById('dash-status').innerHTML = `
            <h3>Application Status</h3>
            <h2>${user.status}</h2>`;
        
        // Populate Skill Text List
        document.getElementById('skill-list-text').innerHTML = 
            user.skillSet.map(skill => `<li>${skill.name}</li>`).join('');

        // Populate Feedback Card
        document.getElementById('dash-feedback').innerHTML = `
            <h3>Constructive Feedback</h3>
            <p>Here are some areas for potential improvement:</p>
            <ul>${user.feedback.improvements.map(imp => `<li>${imp}</li>`).join('')}</ul>`;

        // Render the Skill Chart
        renderSkillChart(user.skillSet);
    }

    function renderInternships(containerId, data) {
        const container = document.getElementById(containerId);
        container.innerHTML = data.map(internship => `
            <div class="card" data-internship-id="${internship.id}">
                <h3>${internship.title}</h3>
                <p>${internship.company}</p>
                <span>Location: ${internship.location}</span>
            </div>
        `).join('');
    };

    // --- NAVIGATION / ROUTING (Simplified) ---
    const pageSections = document.querySelectorAll('.page-section');
    function showSection(targetId) {
        pageSections.forEach(section => {
            section.classList.toggle('active', `#${section.id}` === targetId);
        });
        window.scrollTo(0, 0);

        // Dynamically render content when a page is shown
        if (targetId === '#all-internships') {
            renderInternships('all-internships-grid', internshipsData);
        }
        if (targetId === '#dashboard') {
            renderDashboard(); // Render the dashboard with the chart
        }
        if (targetId === '#home') {
             renderInternships('featured-internships', internshipsData.filter(i => i.featured));
        }
    };

    document.querySelector('.navbar').addEventListener('click', (e) => {
        if (e.target.matches('.nav-link')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                showSection(targetId);
            }
        }
    });

    // --- GENERAL & INITIALIZATION ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    const init = () => {
        showSection('#home');
    };

    init();
});
document.addEventListener('DOMContentLoaded', () => {

    // --- MOCK DATA ---
    const sampleStudent = {
        name: 'Priya Sharma',
        field: 'Computer Science',
        profilePic: 'https://images.unsplash.com/photo-1544005313-94ddf0286de2?q=80&w=120',
        // Data for new stats
        applications: 8,
        interviews: 2,
        profileCompletion: 85, // Value for the doughnut chart
        skillSet: [ 'Python', 'JavaScript', 'React', 'SQL', 'Data Analysis' ]
    };

    const internshipsData = [
        { id: 1, title: 'Data Science Intern', company: 'Ministry of IT', featured: true },
        { id: 2, title: 'Web Development Intern', company: 'NIC', featured: true },
        { id: 3, title: 'Public Policy Research', company: 'NITI Aayog', featured: true }
    ];

    let statusChartInstance = null; // To hold the chart instance

    // --- RENDER FUNCTIONS ---
    
    /**
     * Renders a doughnut chart for profile completion status
     */
    function renderStatusChart(percentage) {
        const ctx = document.getElementById('statusChart').getContext('2d');
        const remaining = 100 - percentage;

        if (statusChartInstance) {
            statusChartInstance.destroy();
        }

        statusChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Complete', 'Incomplete'],
                datasets: [{
                    data: [percentage, remaining],
                    backgroundColor: [ 'var(--dark-green)', '#e0e0e0' ],
                    borderColor: [ 'var(--dark-green)', '#e0e0e0' ],
                    borderWidth: 1,
                    cutout: '80%' // Makes it a thin doughnut
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });

        // Update the text in the center
        document.getElementById('chart-percentage').textContent = `${percentage}%`;
    }

    /**
     * Populates the entire redesigned dashboard
     */
    function renderDashboard() {
        const user = sampleStudent;
        
        // Populate Profile Card
        document.getElementById('dash-profile-pic').src = user.profilePic;
        document.getElementById('dash-profile-name').textContent = user.name;
        document.getElementById('dash-profile-field').textContent = user.field;

        // Populate Main Stats
        document.getElementById('dash-applications').textContent = user.applications;
        document.getElementById('dash-interviews').textContent = user.interviews;

        // Populate Skill Text List
        document.getElementById('skill-list-text').innerHTML = 
            user.skillSet.map(skill => `<li>${skill}</li>`).join('');

        // Render the Status Chart
        renderStatusChart(user.profileCompletion);
    }

    function renderInternships(containerId, data) {
        const container = document.getElementById(containerId);
        container.innerHTML = data.map(internship => `
            <div class="card">
                <h3>${internship.title}</h3>
                <p>${internship.company}</p>
            </div>
        `).join('');
    };

    // --- NAVIGATION / ROUTING ---
    const pageSections = document.querySelectorAll('.page-section');
    function showSection(targetId) {
        pageSections.forEach(section => {
            section.classList.toggle('active', `#${section.id}` === targetId);
        });
        window.scrollTo(0, 0);

        if (targetId === '#all-internships') {
            renderInternships('all-internships-grid', internshipsData);
        }
        if (targetId === '#dashboard') {
            renderDashboard();
        }
        if (targetId === '#home') {
             renderInternships('featured-internships', internshipsData.filter(i => i.featured));
        }
    };

    document.querySelector('.navbar').addEventListener('click', (e) => {
        if (e.target.matches('.nav-link')) {
            e.preventDefault();
            showSection(e.target.getAttribute('href'));
        }
    });

    // --- GENERAL & INITIALIZATION ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    const init = () => {
        showSection('#home');
    };

    init();
});