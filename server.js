const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


     // --- PROJECT DATA ---
const projectsData = [
    {
        id: "holiday-hunter",
        title: "Holiday Hunter",
        subtitle: "Global Holiday Tracking Dashboard",
        tags: ["Next.js", "Tailwind", "API Integration"],
        image: "https://imgur.com/a/MVjKpjy", 
        link: "https://holiday-hunter.vercel.app", // <--- NEW LINK FIELD
        description: "Interactive dashboard analyzing global public holidays to find the 'laziest' countries.",
        // This 'modalContent' is your BLOG area! You can write long paragraphs here.
        modalContent: {
            gist: "I wanted to create something fun that students would actually use. Holiday Hunter isn't just a calendar; it's a gamified dashboard that ranks countries by how many 'lazy days' they have.",
            goal: "The main goal was to practice working with real-time Data APIs and visualizing that data using Recharts in a way that feels modern and playful.",
            approach: "I used Next.js for server-side rendering to ensure the site is fast. For the data, I connected to the Nager.Date API. I spent a lot of time polishing the UI with Tailwind CSS to give it a 'Dark Mode' aesthetic.",
            result: "It was a hit with my classmates! We now use it to plan our breaks. Technically, it helped me master API error handling and dynamic routing."
        }
    },
    {
        id: "cet-tracker",
        title: "CET Tracker PH",
        subtitle: "University Entrance Exam Tracker",
        tags: ["Next.js", "Supabase", "TypeScript"],
        image: "https://i.imgur.com/ba89mgV.png",
        link: "https://cet-tracker-app.vercel.app", // <--- NEW LINK FIELD
        description: "Track College Entrance Test schedules, requirements, and announcements for top PH universities.",
        modalContent: {
            gist: "College applications are stressful. I built this to be the 'one-stop-shop' I wish I had when I was applying.",
            goal: "To centralize scattered information from Facebook posts and university websites into one clean, searchable dashboard.",
            approach: "I chose Supabase for the backend because I needed real-time updates. When a university changes a date, the site updates instantly for all users.",
            result: "The project helped over 500 students during the last application season and taught me the importance of mobile-first design."
        }
    },
    {
        id: "pdao-portal",
        title: "PDAO Analytics Portal",
        subtitle: "Government GIS System",
        tags: ["PHP", "MySQL", "LeafletJS"],
        image: "https://placehold.co/600x400/10b981/FFF?text=PDAO+Analytics",
        link: "https://pdaohelps.online",
        description: "Full-stack system with GIS mapping and analytics dashboard for government use.",
        modalContent: {
            gist: "A comprehensive system for the Persons with Disability Affairs Office.",
            goal: "Automate demographic analysis and reporting.",
            approach: "Built with raw PHP for legacy support and Leaflet for mapping.",
            result: "Reduced reporting time by 40%."
        }
    }
];

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// --- STUDENT DATA ---
const name = "Clarence Neil Meneses";
const role = "IT Student \\ Full-Stack Developer";
const location = "Tanauan City, Batangas";
const email = "clarenceneilpamplona@gmail.com";
const section = "BA 4102"; 
const quote = "Leading Innovations, Transforming Lives, Building the Nation."; 

// --- IMAGES ---
// These paths now look inside the 'public' folder automatically
const profileLight = '/profile.png';      
const profileDark = '/profile-dark.png';  

// --- ROUTES ---
app.get('/', (req, res) => { res.send(renderHome()); });
app.get('/tech-stack', (req, res) => { res.send(renderTechStack()); });
app.get('/projects', (req, res) => { res.send(renderProjects()); });
app.get('/certifications', (req, res) => { res.send(renderCertifications()); });

app.listen(port, () => { console.log(`Server is running on port ${port}`); });

// --- HTML GENERATORS ---

function renderHome() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${name} - Portfolio</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <script src="https://unpkg.com/feather-icons"></script>
        <style>
            ${getCSS()}
        </style>
    </head>
    <body>
        <div class="container">
            <header class="header-block">
                <div class="header-top">
                    <div class="profile-left">
                        <img id="profile-pic" src="${profileLight}" alt="Profile" class="avatar" onerror="this.src='https://ui-avatars.com/api/?name=Clarence+Meneses&background=1A73E8&color=fff&size=200'">
                        <div class="profile-details">
                            <h1>${name} <i data-feather="check-circle" class="verified-icon"></i></h1>
                            <div class="location"><i data-feather="map-pin" size="14"></i> ${location}</div>
                            <div class="role">${role}</div>
                        </div>
                    </div>
                    
                    <div class="profile-right">
                        <div class="toggle-wrapper">
                            <button id="darkModeToggle" class="icon-btn"><i data-feather="moon"></i></button>
                        </div>
                        <div class="hackathon-badge">
                             <i data-feather="award"></i> Graduating Soon! (Manifesting)
                        </div>
                    </div>
                </div>

                <div class="header-bottom">
                    <a href="#" class="btn btn-black"><i data-feather="calendar"></i> Schedule a Call</a>
                    <a href="mailto:${email}" class="btn btn-white"><i data-feather="mail"></i> Send Email</a>
                    <a href="https://github.com/Clarensyoooooo" target="_blank" class="btn btn-white-wide">
                        <i data-feather="users"></i> Visit my community <i data-feather="chevron-right" style="margin-left:auto"></i>
                    </a>
                </div>
            </header>

            <div class="main-grid">
                <div class="left-col">
                    <div class="card">
                        <div class="card-title"><i data-feather="user"></i> About</div>
                        <p>
                            I'm a full-stack IT student specializing in developing solutions with JavaScript, PHP, and Python. I work on projects including building modern web applications, data analytics dashboards, and system testing.
                            <br><br>
                            Lately, I've been diving deeper into the world of Data Analytics using Power BI and integrating GIS mapping into web systems.
                        </p>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <div class="card-title"><i data-feather="cpu"></i> Tech Stack</div>
                            <a href="/tech-stack" class="view-all">View All <i data-feather="chevron-right" size="12"></i></a>
                        </div>
                        <div class="stack-category">Frontend</div>
                        <div class="tags-wrapper">
                            <span class="tag">JavaScript</span><span class="tag">HTML5</span><span class="tag">CSS3</span><span class="tag">Bootstrap</span><span class="tag">Figma</span>
                        </div>
                        <div class="stack-category">Backend & Data</div>
                        <div class="tags-wrapper">
                            <span class="tag">PHP</span><span class="tag">MySQL</span><span class="tag">Python</span><span class="tag">Power BI</span>
                        </div>
                    </div>

                     <div class="card">
                        <div class="card-title"><i data-feather="coffee"></i> Beyond Coding</div>
                        <p>When not writing code, I focus on:</p>
                         <div class="tags-wrapper">
                            <span class="tag">Digital Art</span><span class="tag">Analytics</span><span class="tag">Startup Culture</span><span class="tag">Learning New Tech Stuff</span>
                         </div>
                    </div>
                </div>

                <div class="right-col">
                    <div class="banner-card">
                        <div style="font-weight:700; font-size:0.9rem; opacity:0.9">BS INFORMATION TECHNOLOGY</div>
                        <div style="font-size:1.2rem; font-weight:800; margin-top:2px;">CLASS OF 2026 <i data-feather="chevrons-right" style="float:right"></i></div>
                    </div>

                    <div class="card">
                        <div class="card-title"><i data-feather="briefcase"></i> Experience</div>
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <div class="job-role">Developer</div>
                                <div class="job-company">Sto. Tomas PDAO (Capstone)</div>
                                <div class="job-year">2025</div>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <div class="job-role">Freelance UI Designer</div>
                                <div class="job-company">THEEA Agency (Australia)</div>
                                <div class="job-year">2025</div>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <div class="job-role">Commissioned Artist</div>
                                <div class="job-company">Freelance (US Clients)</div>
                                <div class="job-year">2024</div>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <div class="job-role">Student</div>
                                <div class="job-company">Batangas State University</div>
                                <div class="job-year">2022</div>
                            </div>
                        </div>
                         <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <div class="job-role">Hello World! 👋</div>
                                <div class="job-company">Wrote my first line of code</div>
                                <div class="job-year">2022</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section-header">
    <div class="card-title"><i data-feather="grid"></i> Featured Projects</div>
    <a href="/projects" class="view-all">View All <i data-feather="chevron-right" size="12"></i></a>
</div>

<div class="project-grid-visual">
    ${generateProjectCards(projectsData.slice(0, 3))} </div>

${generateProjectModals(projectsData)}
<script>
    function openModal(id) {
        document.getElementById('modal-' + id).classList.add('active');
        document.body.style.overflow = 'hidden'; 
        feather.replace();
    }
    function closeModal(event, id) {
        document.getElementById('modal-' + id).classList.remove('active');
        document.body.style.overflow = 'auto'; 
    }
</script>

            <div class="bottom-grid">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title"><i data-feather="check-circle"></i> Certifications</div>
                        <a href="/certifications" class="view-all">View All <i data-feather="chevron-right" size="12"></i></a>
                    </div>
                    <div class="cert-item">
                        <div style="font-weight:600">Microsoft Power BI Certification</div>
                        <div style="font-size:0.8rem; color:var(--text-muted)">Microsoft</div>
                    </div>
                    <div class="cert-item">
                        <div style="font-weight:600">Intro to Cybersecurity</div>
                        <div style="font-size:0.8rem; color:var(--text-muted)">Cisco Networking Academy</div>
                    </div>
                    <div class="cert-item">
                        <div style="font-weight:600">Tech Start-up Fundamentals</div>
                        <div style="font-size:0.8rem; color:var(--text-muted)">BatStateU & HCMUTE</div>
                    </div>
                </div>
                <div class="card">
                     <div class="card-title"><i data-feather="message-square"></i> Recommendations</div>
                     <div style="height: 120px; display:flex; align-items:center; justify-content:center; color:var(--text-muted); gap:5px;">
                        <span style="width:6px; height:6px; background:#ccc; border-radius:50%"></span>
                        <span style="width:6px; height:6px; background:#ccc; border-radius:50%"></span>
                        <span style="width:6px; height:6px; background:#ccc; border-radius:50%"></span>
                        <span style="width:6px; height:6px; background:#ccc; border-radius:50%"></span>
                        <span style="width:6px; height:6px; background:#ccc; border-radius:50%"></span>
                     </div>
                </div>
            </div>

            <div class="footer-links-grid">
                <div class="footer-col">
                    <small><i data-feather="users"></i> A member of</small>
                    <div class="footer-link-item">BatStateU CICS</div>
                    <div class="footer-link-item">JPLPC Students</div>
                </div>
                <div class="footer-col">
                    <small><i data-feather="link"></i> Social Links</small>
                    <a href="https://www.linkedin.com/" target="_blank" class="footer-link-item footer-clickable"><i data-feather="linkedin" size="12"></i> LinkedIn</a>
                    <a href="https://github.com/" target="_blank" class="footer-link-item footer-clickable"><i data-feather="github" size="12"></i> GitHub</a>
                    <a href="https://instagram.com/" target="_blank" class="footer-link-item footer-clickable"><i data-feather="instagram" size="12"></i> Instagram</a>
                </div>
                <div class="footer-col">
                    <small><i data-feather="mic"></i> Availability</small>
                    <div class="footer-link-item">Open for Inquiries</div>
                </div>
                <div class="footer-col">
                    <small><i data-feather="mail"></i> Contact</small>
                    <a href="mailto:${email}" class="footer-link-item footer-clickable">${email}</a>
                    <a href="#" class="footer-link-item footer-clickable" style="margin-top:5px; font-weight:600;">Schedule a Call <i data-feather="chevron-right" size="12"></i></a>
                </div>
            </div>

            <footer class="copyright">
                &copy; 2025 ${name}. All rights reserved.<br>
                <span style="font-size:0.7rem; opacity:0.5; margin-top:5px; display:block;">${section}</span>
            </footer>
        </div>

        ${getScripts()}
    </body>
    </html>
    `;
}

function renderTechStack() {
    return renderInnerPage("Tech Stack", `
        <div class="stack-section">
            <div class="stack-title">Frontend</div>
            <div class="pill-grid">
                <div class="pill-large">JavaScript</div><div class="pill-large">HTML5</div><div class="pill-large">CSS3</div><div class="pill-large">Bootstrap</div><div class="pill-large">Tailwind CSS</div><div class="pill-large">Figma</div>
            </div>
        </div>
        <div class="stack-section">
            <div class="stack-title">Backend</div>
            <div class="pill-grid">
                <div class="pill-large">PHP</div><div class="pill-large">Node.js</div><div class="pill-large">Express.js</div><div class="pill-large">Python</div><div class="pill-large">MySQL</div>
            </div>
        </div>
         <div class="stack-section">
            <div class="stack-title">Data & Tools</div>
            <div class="pill-grid">
                <div class="pill-large">Power BI</div><div class="pill-large">Git / GitHub</div><div class="pill-large">VS Code</div><div class="pill-large">Adobe Photoshop</div>
            </div>
        </div>
    `);
}

function renderProjects() {
    return renderInnerPage("Recent Projects", `
        <p style="margin-bottom: 2rem; color: var(--text-muted);">
            A selection of projects I've built, from web applications to side projects that solve real problems.
        </p>
        
        <div class="project-grid-visual">
            ${generateProjectCards(projectsData)}
        </div>
        
        ${generateProjectModals(projectsData)}
        
        <script>
            function openModal(id) {
                document.getElementById('modal-' + id).classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
                feather.replace();
            }
            
            function closeModal(event, id) {
                // If event is null (close button) or target is the overlay (background click)
                // Note: The close button in the full-screen modal passes null, so it always closes.
                const modal = document.getElementById('modal-' + id);
                if (modal) {
                     modal.classList.remove('active');
                     document.body.style.overflow = 'auto'; // Restore scrolling
                }
            }
        </script>
    `);
}

// --- HELPER FUNCTIONS ---
function generateProjectCards(projects) {
    return projects.map(p => `
        <div class="project-card-visual" onclick="openModal('${p.id}')">
            <div class="card-img-container">
                <img src="${p.image}" alt="${p.title}" class="card-img">
            </div>
            <div class="card-content">
                <div class="project-top">
                    <h3>${p.title}</h3>
                </div>
                <p>${p.description}</p>
                <div class="tags-wrapper" style="margin-top:auto; padding-top:1rem;">
                    ${p.tags.map(tag => `<span class="tag-sm">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function generateProjectModals(projects) {
    return projects.map(p => `
        <div id="modal-${p.id}" class="modal-overlay">
            <button class="close-btn-fixed" onclick="closeModal(null, '${p.id}')">
                <i data-feather="x"></i> Close
            </button>
            
            <div class="modal-content-full">
                <div class="modal-hero-full" style="background-image: url('${p.image}')">
                    <div class="hero-overlay">
                        <h1>${p.title}</h1>
                        <span class="hero-subtitle">${p.subtitle}</span>
                        
                        <div style="margin-top: 2rem;">
                            <a href="${p.link}" target="_blank" class="btn-live">
                                Visit Live Website <i data-feather="external-link"></i>
                            </a>
                        </div>

                    </div>
                </div>

                <div class="modal-body-full">
                    <div class="modal-grid">
                        <div class="modal-left">
                            <div class="modal-section">
                                <h3>The Story</h3> <p>${p.modalContent.gist}</p>
                            </div>
                            <div class="modal-section">
                                <h3>The Goal</h3>
                                <p>${p.modalContent.goal}</p>
                            </div>
                        </div>
                        <div class="modal-right">
                             <div class="modal-section">
                                <h3>Tech Stack</h3>
                                <div class="tags-wrapper">
                                    ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                            </div>
                            <div class="modal-section">
                                <h3>Technical Approach</h3>
                                <p>${p.modalContent.approach}</p>
                            </div>
                             <div class="modal-section">
                                <h3>The Result</h3>
                                <p>${p.modalContent.result}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderCertifications() {
    return renderInnerPage("Certifications", `
        <div class="card">
            <div class="cert-item">
                <div style="font-weight:700; font-size:1.1rem">Microsoft Power BI Certification</div>
                <div style="color:var(--text-muted)">Microsoft • 2025</div>
                <p>Validated skills in data visualization, modeling, and analytics.</p>
            </div>
            <hr style="border:0; border-top:1px solid var(--border); margin:1rem 0;">
            <div class="cert-item">
                <div style="font-weight:700; font-size:1.1rem">Introduction to Cybersecurity</div>
                <div style="color:var(--text-muted)">Cisco Networking Academy • 2024</div>
                <p>Foundational knowledge in network security and threat protection.</p>
            </div>
            <hr style="border:0; border-top:1px solid var(--border); margin:1rem 0;">
            <div class="cert-item">
                <div style="font-weight:700; font-size:1.1rem">Tech Start-up Fundamentals</div>
                <div style="color:var(--text-muted)">BatStateU & HCMUTE • 2025</div>
                <p>Workshop on entrepreneurship and tech innovation.</p>
            </div>
        </div>
    `);
}

function renderInnerPage(title, content) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - ${name}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <script src="https://unpkg.com/feather-icons"></script>
        <style>
            ${getCSS()}
            .page-container { max-width: 800px; margin: 0 auto; padding-top: 2rem; }
            .back-link { display: inline-flex; align-items: center; gap: 5px; color: var(--text-main); text-decoration: none; font-weight: 600; margin-bottom: 2rem; transition:0.2s; }
            .back-link:hover { transform: translateX(-3px); }
            .stack-section { margin-bottom: 3rem; }
            .stack-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; }
            .pill-grid { display: flex; flex-wrap: wrap; gap: 0.8rem; }
            .pill-large { 
                padding: 0.6rem 1.2rem; 
                border: 1px solid var(--border); 
                border-radius: 8px; 
                font-size: 0.9rem; 
                font-weight: 500; 
                background: var(--bg-card);
                transition: transform 0.2s;
            }
            .pill-large:hover { transform: translateY(-2px); border-color: var(--text-muted); }
        </style>
    </head>
    <body>
        <div class="page-container">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <a href="/" class="back-link"><i data-feather="arrow-left"></i> Back to Home</a>
                <button id="darkModeToggle" class="icon-btn"><i data-feather="moon"></i></button>
            </div>
            <h1 style="font-size: 2rem; margin-bottom: 2rem;">${title}</h1>
            ${content}
            <footer class="copyright" style="margin-top:4rem">
                &copy; 2025 ${name}. All rights reserved.
            </footer>
        </div>
        ${getScripts()}
    </body>
    </html>
    `;
}

function getCSS() {
    return `
        :root {
            --bg-page: #ffffff; --bg-card: #ffffff; --text-main: #111111; --text-muted: #666666;
            --border: #D1D5DB; --btn-black: #111111; --btn-text: #ffffff; --hover: #f3f4f6;
            --badge-blue: #2563EB; --banner-grad: linear-gradient(90deg, #7C3AED 0%, #2563EB 100%);
        }
        body.dark {
            --bg-page: #0a0a0a; --bg-card: #0a0a0a; --text-main: #ededed; --text-muted: #a1a1a1;
            --border: #333333; --btn-black: #ffffff; --btn-text: #000000; --hover: #1f1f1f;
            --badge-blue: #3B82F6; --banner-grad: linear-gradient(90deg, #5B21B6 0%, #1E40AF 100%);
        }
        body { background-color: var(--bg-page); color: var(--text-main); font-family: 'Inter', sans-serif; margin: 0; padding: 2rem; transition: background 0.3s, color 0.3s; }
        .container { max-width: 1000px; margin: 0 auto; }
        a { text-decoration: none; color: inherit; }
        /* HEADER */
        .header-block { margin-bottom: 3rem; }
        .header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .profile-left { display: flex; gap: 1.5rem; }
        .avatar { width: 100px; height: 100px; border-radius: 16px; object-fit: cover; }
        .profile-details h1 { margin: 0; font-size: 1.8rem; font-weight: 700; display: flex; align-items: center; gap: 6px; }
        .verified-icon { width: 20px; color: #3B82F6; fill: transparent; }
        .location { display: flex; align-items: center; gap: 5px; color: var(--text-muted); margin-top: 5px; font-size: 0.95rem; }
        .role { font-size: 1.1rem; margin-top: 5px; }
        .profile-right { display: flex; flex-direction: column; align-items: flex-end; gap: 1rem; }
        .hackathon-badge { background: var(--badge-blue); color: white; padding: 0.6rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; display: flex; align-items: center; gap: 8px; }
        .icon-btn { background: transparent; border: 1px solid var(--border); padding: 8px; border-radius: 50%; cursor: pointer; color: var(--text-main); }
        .header-bottom { display: flex; gap: 10px; flex-wrap: wrap; }
        .btn { display: flex; align-items: center; gap: 8px; padding: 0.7rem 1.2rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: pointer; border: 1px solid var(--border); transition: 0.2s; }
        .btn-black { background: var(--btn-black); color: var(--btn-text); border: none; }
        .btn-white { background: var(--bg-card); color: var(--text-main); }
        .btn-white-wide { background: var(--bg-card); color: var(--text-main); flex-grow: 1; }
        .btn:hover { opacity: 0.8; transform: translateY(-1px); }
        /* MAIN GRID */
        .main-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 2rem; margin-bottom: 2rem; }
        @media (max-width: 768px) { .main-grid { grid-template-columns: 1fr; } }
        /* CARDS */
        .card { margin-bottom: 2rem; border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .card-title { font-weight: 700; font-size: 1.1rem; display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem; }
        .view-all { font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 4px; }
        p { color: var(--text-muted); line-height: 1.6; font-size: 0.95rem; margin-top: 0; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        /* TAGS */
        .stack-category { font-size: 0.8rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.5rem; margin-top: 1rem; }
        .stack-category:first-of-type { margin-top: 0; }
        .tags-wrapper { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .tag { background: var(--hover); padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 500; color: var(--text-main); }
        .tag-sm { background: transparent; border: 1px solid var(--border); padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; }
        /* BANNER */
        .banner-card { background: var(--banner-grad); color: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; }
        /* TIMELINE */
        .timeline-item { display: flex; gap: 1rem; margin-bottom: 1.5rem; padding: 0.5rem; border-radius: 8px; transition: 0.2s; cursor: default; position: relative; }
        .timeline-item:hover { background: var(--hover); }
        .timeline-item:not(:last-child)::after { content: ''; position: absolute; left: 11px; top: 22px; bottom: -20px; width: 1px; background: var(--border); z-index: 0; }
        .timeline-dot { width: 8px; height: 8px; background: var(--text-main); border-radius: 50%; margin-top: 6px; z-index: 1; }
        .timeline-content { flex: 1; }
        .job-role { font-weight: 600; font-size: 1rem; }
        .job-company { color: var(--text-muted); font-size: 0.9rem; }
        .job-year { float: right; font-size: 0.8rem; font-weight: 600; opacity: 0.6; }
        /* PROJECTS GRID */
        .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .project-card { background: var(--bg-card); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border); transition: 0.2s; display: block; }
        .project-card:hover { border-color: var(--text-muted); }
        .project-top { display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 0.5rem; align-items: center; }
        /* FOOTER */
        .bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem; }
        @media (max-width: 768px) { .bottom-grid { grid-template-columns: 1fr; } }
        .cert-item { margin-bottom: 1rem; }
        .footer-links-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; border-top: 1px solid var(--border); padding-top: 2rem; margin-bottom: 2rem; }
        @media (max-width: 768px) { .footer-links-grid { grid-template-columns: 1fr 1fr; } }
        .footer-col small { display: flex; align-items: center; gap: 5px; font-weight: 600; margin-bottom: 1rem; }
        .footer-link-item { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 8px; }
        .footer-clickable:hover { color: var(--text-main); text-decoration:underline; }
        .copyright { display: flex; flex-direction: column; align-items: center; text-align: center; color: var(--text-muted); font-size: 0.85rem; padding-bottom: 2rem; }
        /* --- VISUAL CARD GRID --- */
/* --- VISUAL CARD STYLES (Used on Home & Projects) --- */
.project-grid-visual {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.project-card-visual {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.project-card-visual:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
}

.card-img-container {
    height: 180px;
    background: #e5e7eb;
    overflow: hidden;
}

.card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
}

.project-card-visual:hover .card-img {
    transform: scale(1.05); /* Slight zoom on hover */
}

.card-content {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
}

/* --- FULL PAGE MODAL STYLES --- */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    background: var(--bg-page); /* Opaque background */
    opacity: 0;
    visibility: hidden;
    overflow-y: auto; /* Allow scrolling within the full page */
    transition: opacity 0.3s ease, visibility 0.3s;
}

.modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

/* This container mimics a full page layout */
.modal-content-full {
    width: 100%;
    min-height: 100vh;
    background: var(--bg-page);
    position: relative;
    padding-bottom: 4rem;
}

.close-btn-fixed {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    z-index: 2005;
    backdrop-filter: blur(4px);
    font-weight: 600;
    transition: background 0.2s;
}

.close-btn-fixed:hover {
    background: rgba(0, 0, 0, 0.8);
}

/* Hero Section inside Modal */
.modal-hero-full {
    height: 50vh; /* Takes up half the screen height */
    width: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: flex-end;
}

.hero-overlay {
    background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    width: 100%;
    padding: 3rem 10%;
    color: white;
}

.hero-overlay h1 {
    font-size: 3rem;
    margin: 0;
    line-height: 1.1;
}

.hero-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    font-weight: 500;
    display: block;
    margin-top: 10px;
}

/* Content Body */
.modal-body-full {
    max-width: 1000px;
    margin: 0 auto;
    padding: 3rem 2rem;
}

.modal-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 4rem;
}

@media (max-width: 768px) {
    .modal-grid { grid-template-columns: 1fr; gap: 2rem; }
    .hero-overlay h1 { font-size: 2rem; }
    .modal-hero-full { height: 40vh; }
}
    /* --- Add this to your existing CSS --- */
.btn-live {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background-color: #ffffff;
    color: #000000;
    padding: 12px 24px;
    border-radius: 30px;
    font-weight: 700;
    font-size: 1rem;
    text-decoration: none;
    transition: transform 0.2s, background-color 0.2s;
}

.btn-live:hover {
    transform: translateY(-2px);
    background-color: #f0f0f0;
}
    `;
}

function getScripts() {
    return `
    <script>
        feather.replace();
        const toggle = document.getElementById('darkModeToggle');
        const body = document.body;
        const profilePic = document.getElementById('profile-pic');

        const imgLight = "${profileLight}";
        const imgDark = "${profileDark}";
        
        function updateImage(isDark) {
            if(profilePic) {
                profilePic.src = isDark ? imgDark : imgLight;
            }
        }

        // CHECK LOCAL STORAGE ON LOAD
        if(localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark');
            if(toggle) toggle.innerHTML = '<i data-feather="sun"></i>';
            updateImage(true);
        } else {
            updateImage(false);
        }

        if(toggle) {
            toggle.addEventListener('click', () => {
                body.classList.toggle('dark');
                const isDark = body.classList.contains('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                toggle.innerHTML = isDark ? '<i data-feather="sun"></i>' : '<i data-feather="moon"></i>';
                updateImage(isDark);
                feather.replace();
            });
        }
    </script>
    `;
}