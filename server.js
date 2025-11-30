require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// (AdminJS imports REMOVED)

const app = express();
const port = process.env.PORT || 3000;

// --- 2. CONNECT TO DATABASE ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ DB Connection Error:', err));

// --- 3. DEFINE SCHEMAS ---
const ProjectSchema = new mongoose.Schema({
    id: String,
    title: String,
    subtitle: String,
    image: String,
    link: String,
    tags: [String],
    description: String, // <--- ADD THIS LINE BACK
    
    // Your dynamic blocks
    contentBlocks: [
        {
            type: { type: String, enum: ['text', 'image'] }, 
            value: String 
        }
    ]
});

const ExperienceSchema = new mongoose.Schema({
    role: String,
    company: String,
    year: String
});

const CertificationSchema = new mongoose.Schema({
    title: String,
    issuer: String,
    year: String,
    description: String
});

const TechStackSchema = new mongoose.Schema({
    category: String,
    items: [String]
});

// --- 4. CREATE MODELS ---
const Project = mongoose.model('Project', ProjectSchema);
const Experience = mongoose.model('Experience', ExperienceSchema, 'experience'); 
const Certification = mongoose.model('Certification', CertificationSchema); 
const TechStack = mongoose.model('TechStack', TechStackSchema, 'tech_stack');

// --- AUTHENTICATION MIDDLEWARE ---
const adminUser = {
    username: "admin",
    password: "Jediletwotwo22" // Your password
};

function checkAuth(req, res, next) {
    const auth = {login: adminUser.username, password: adminUser.password}
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    if (login && password && login === auth.login && password === auth.password) {
        return next()
    }

    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('Authentication required.')
}

// Allow express to parse form data
app.use(express.urlencoded({ extended: true }));

// (AdminJS Setup Block REMOVED)

// --- 6. SERVE STATIC FILES ---
app.use(express.static(path.join(__dirname, 'public')));

// --- STUDENT DATA ---
const name = "Clarence Neil Meneses";
const role = "IT Student \\ Full-Stack Developer";
const location = "Tanauan City, Batangas";
const email = "clarenceneilpamplona@gmail.com";
const section = "BA 4102";


// --- ROUTES ---

// --- ADMIN ROUTES ---

// 1. ADMIN DASHBOARD (Lists all projects)
app.get('/admin', checkAuth, async (req, res) => {
    const projects = await Project.find({});
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Inter', sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; background: #f5f5f5; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
            .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; }
            .btn { text-decoration: none; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; font-size: 0.9rem; }
            .btn-green { background: #10B981; color: white; }
            .btn-red { background: #EF4444; color: white; margin-left: 1rem; }
            .form-group { margin-bottom: 1rem; }
            label { display: block; margin-bottom: 0.5rem; font-weight: 600; }
            input, textarea { width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Admin Dashboard</h1>
            <a href="/admin/add" class="btn btn-green">+ Add New Project</a>
        </div>
        
        ${projects.map(p => `
            <div class="card">
                <div>
                    <strong>${p.title}</strong><br>
                    <span style="color:#666; font-size:0.8rem">${p.subtitle}</span>
                </div>
                <div>
                     <a href="${p.link}" target="_blank" style="margin-right:10px; color:#2563EB">View</a>
                     <a href="/admin/delete/${p.id}" class="btn btn-red" onclick="return confirm('Are you sure?')">Delete</a>
                </div>
            </div>
        `).join('')}
    </body>
    </html>
    `;
    res.send(html);
});

// 2. SHOW DYNAMIC ADD FORM
app.get('/admin/add', checkAuth, (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Add Project</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Inter', sans-serif; padding: 2rem; max-width: 700px; margin: 0 auto; background: #f9fafb; }
            .container { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            h1 { margin-top: 0; }
            label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem; }
            input, textarea { width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; font-family: inherit; }
            .section-block { background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; position: relative; border: 1px solid #e5e7eb; }
            .btn { cursor: pointer; padding: 10px 15px; border-radius: 6px; border: none; font-weight: 600; font-size: 0.9rem; }
            .btn-black { background: #111; color: white; width: 100%; padding: 12px; margin-top: 1rem; }
            .btn-add { background: #fff; border: 1px solid #ccc; margin-right: 5px; }
            .btn-remove { position: absolute; top: 10px; right: 10px; background: #ef4444; color: white; padding: 4px 8px; font-size: 0.8rem; }
            .controls { margin: 1.5rem 0; padding: 1rem; border: 2px dashed #ccc; text-align: center; border-radius: 8px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Add Project (Dynamic)</h1>
            <form action="/admin/add" method="POST">
                <div style="margin-bottom:1rem"><label>ID (Unique)</label><input name="id" required placeholder="e.g. holiday-hunter"></div>
                <div style="margin-bottom:1rem"><label>Title</label><input name="title" required></div>
                <div style="margin-bottom:1rem"><label>Subtitle</label><input name="subtitle"></div>
                <div style="margin-bottom:1rem">
    <label>Short Description (For Home Page Card)</label>
    <textarea name="description" rows="3" required placeholder="A short summary that appears on the home page card..."></textarea>
</div>
                <div style="margin-bottom:1rem"><label>Cover Image URL</label><input name="image" required></div>
                <div style="margin-bottom:1rem"><label>Live Link</label><input name="link"></div>
                <div style="margin-bottom:1rem"><label>Tags (comma separated)</label><input name="tags"></div>

                <hr style="margin: 2rem 0; border: 0; border-top: 1px solid #eee;">
                
                <h3>Project Content</h3>
                <div id="blocks-container">
                    </div>

                <div class="controls">
                    <button type="button" class="btn btn-add" onclick="addBlock('text')">+ Add Text Paragraph</button>
                    <button type="button" class="btn btn-add" onclick="addBlock('image')">+ Add Image URL</button>
                </div>

                <button type="submit" class="btn btn-black">Save Project</button>
            </form>
        </div>

        <script>
            let blockCount = 0;
            const container = document.getElementById('blocks-container');

            function addBlock(type) {
                const div = document.createElement('div');
                div.className = 'section-block';
                div.innerHTML = \`
                    <button type="button" class="btn btn-remove" onclick="this.parentElement.remove()">Remove</button>
                    <input type="hidden" name="blocks[\${blockCount}][type]" value="\${type}">
                    <label>\${type === 'text' ? '📝 Text Paragraph' : '🖼️ Image URL'}</label>
                    \${type === 'text' 
                        ? \`<textarea name="blocks[\${blockCount}][value]" rows="4" required></textarea>\` 
                        : \`<input name="blocks[\${blockCount}][value]" placeholder="https://imgur.com/..." required>\`
                    }
                \`;
                container.appendChild(div);
                blockCount++;
            }
        </script>
    </body>
    </html>
    `);
});

// 3. HANDLE DYNAMIC POST
app.post('/admin/add', checkAuth, async (req, res) => {
    try {
        // Express parses "blocks[0][type]" automatically if using 'extended: true'
        const rawBlocks = req.body.blocks || [];
        
        // Convert the object format express might give us back into a clean array
        // (Express sometimes parses array-like inputs as objects { '0': {...}, '1': {...} })
        const contentBlocks = Array.isArray(rawBlocks) ? rawBlocks : Object.values(rawBlocks);

        const newProject = new Project({
    id: req.body.id,
    title: req.body.title,
    subtitle: req.body.subtitle,
    image: req.body.image,
    link: req.body.link,
    description: req.body.description, // <--- ADD THIS LINE
    tags: req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : [],
    contentBlocks: contentBlocks
});
        
        await newProject.save();
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.send("Error saving: " + err.message);
    }
});

// 4. DELETE ROUTE
app.get('/admin/delete/:id', checkAuth, async (req, res) => {
    try {
        await Project.deleteOne({ id: req.params.id });
        res.redirect('/admin');
    } catch (err) {
        res.send("Error deleting: " + err.message);
    }
});

// 1. HOME ROUTE
app.get('/', async (req, res) => { 
    try {
        const [projects, experience, certifications, techStack] = await Promise.all([
            Project.find({}),
            Experience.find({}), 
            Certification.find({}),
            TechStack.find({})
        ]);
        
        res.send(renderHome(projects, experience, certifications, techStack)); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error: " + err.message);
    }
});

// 2. TECH STACK PAGE
app.get('/tech-stack', async (req, res) => { 
    try {
        const techStack = await TechStack.find({});
        res.send(renderTechStackPage(techStack));
    } catch (err) { res.status(500).send("Error"); }
});

// 3. PROJECTS PAGE
app.get('/projects', async (req, res) => { 
    try {
        const projects = await Project.find({});
        res.send(renderProjectsPage(projects));
    } catch (err) { res.status(500).send("Error"); }
});

// 4. CERTIFICATIONS PAGE
app.get('/certifications', async (req, res) => { 
    try {
        const certifications = await Certification.find({});
        res.send(renderCertificationsPage(certifications));
    } catch (err) { res.status(500).send("Error"); }
});

app.listen(port, () => { console.log(`Server is running on port ${port}`); });


// --- HTML GENERATORS ---

function renderHome(projects, experience, certifications, techStack) {
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
                        <img id="profile-pic" src="/profile.png" alt="Profile" class="avatar" onerror="this.src='https://ui-avatars.com/api/?name=Clarence+Meneses&background=1A73E8&color=fff&size=200'">
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
                             <i data-feather="award"></i> Class of 2026
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
                        </p>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <div class="card-title"><i data-feather="cpu"></i> Tech Stack</div>
                            <a href="/tech-stack" class="view-all">View All <i data-feather="chevron-right" size="12"></i></a>
                        </div>
                        ${generateTechStackHome(techStack)}
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
                        ${generateExperience(experience)}
                    </div>
                </div>
            </div>

            <div class="section-header">
                <div class="card-title"><i data-feather="grid"></i> Featured Projects</div>
                <a href="/projects" class="view-all">View All <i data-feather="chevron-right" size="12"></i></a>
            </div>

            <div class="project-grid-visual">
                ${generateProjectCards(projects ? projects.slice(0, 3) : [])} 
            </div>

            ${generateProjectModals(projects || [])}

            <div class="bottom-grid">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title"><i data-feather="check-circle"></i> Certifications</div>
                        <a href="/certifications" class="view-all">View All <i data-feather="chevron-right" size="12"></i></a>
                    </div>
                    ${generateCertificationsHome(certifications)}
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
    </body>
    </html>
    `;
}

// --- GENERATOR FUNCTIONS (DYNAMIC) ---

function generateExperience(experience) {
    if(!experience || experience.length === 0) return '<p>No experience found.</p>';
    return experience.map(job => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="job-role">${job.role}</div>
                <div class="job-company">${job.company}</div>
                <div class="job-year">${job.year}</div>
            </div>
        </div>
    `).join('');
}

function generateTechStackHome(techStack) {
    if(!techStack) return '';
    return techStack.slice(0, 2).map(stack => `
        <div class="stack-category">${stack.category}</div>
        <div class="tags-wrapper">
            ${stack.items.map(item => `<span class="tag">${item}</span>`).join('')}
        </div>
    `).join('');
}

function generateCertificationsHome(certs) {
    if(!certs) return '';
    return certs.slice(0, 3).map(cert => `
        <div class="cert-item">
            <div style="font-weight:600">${cert.title}</div>
            <div style="font-size:0.8rem; color:var(--text-muted)">${cert.issuer}</div>
        </div>
    `).join('');
}


// --- INNER PAGE RENDERERS ---

function renderTechStackPage(techStack) {
    const content = techStack.map(stack => `
        <div class="stack-section">
            <div class="stack-title">${stack.category}</div>
            <div class="pill-grid">
                ${stack.items.map(item => `<div class="pill-large">${item}</div>`).join('')}
            </div>
        </div>
    `).join('');
    
    return renderInnerPage("Tech Stack", content);
}

function renderCertificationsPage(certifications) {
    const content = `
        <div class="card">
            ${certifications.map((cert, index) => `
                <div class="cert-item">
                    <div style="font-weight:700; font-size:1.1rem">${cert.title}</div>
                    <div style="color:var(--text-muted)">${cert.issuer} • ${cert.year}</div>
                    <p>${cert.description}</p>
                </div>
                ${index < certifications.length - 1 ? '<hr style="border:0; border-top:1px solid var(--border); margin:1rem 0;">' : ''}
            `).join('')}
        </div>
    `;
    return renderInnerPage("Certifications", content);
}

function renderProjectsPage(projects) {
    return renderInnerPage("Recent Projects", `
        <p style="margin-bottom: 2rem; color: var(--text-muted);">
            A selection of projects I've built, from web applications to side projects that solve real problems.
        </p>
        <div class="project-grid-visual">
            ${generateProjectCards(projects)}
        </div>
        ${generateProjectModals(projects)}
        <script>
            function openModal(id) {
                document.getElementById('modal-' + id).classList.add('active');
                document.body.style.overflow = 'hidden'; 
                feather.replace();
            }
            function closeModal(event, id) {
                const modal = document.getElementById('modal-' + id);
                if (modal) {
                     modal.classList.remove('active');
                     document.body.style.overflow = 'auto'; 
                }
            }
        </script>
    `);
}

// --- SHARED HELPERS ---
function generateProjectCards(projects) {
    if(!projects || projects.length === 0) return '<p>No projects found.</p>';
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
    if (!projects) return '';
    return projects.map(p => `
        <div id="modal-${p.id}" class="modal-overlay">

            <button class="close-btn-fixed" onclick="closeModal(null, '${p.id}')">
                <i data-feather="x"></i> Close
            </button>

            <div class="modal-content-scrollable">
                <div class="modal-inner-container">

                    <div class="content-block-media">
                        <img src="${p.image}" alt="${p.title}" class="project-detail-img">
                    </div>

                    <div class="modal-header-simple">
                        <h1>${p.title}</h1>
                        <span class="subtitle">${p.subtitle}</span>
                    </div>

                    <div class="content-block-text" style="margin-top: 3rem;">
                        <h3>Tech Stack</h3>
                        <div class="tags-wrapper">
                            ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="modal-actions">
                            <a href="${p.link}" target="_blank" class="btn btn-black">
                                Visit Live Website <i data-feather="external-link"></i>
                            </a>
                        </div>
                    </div>  <!-- FIXED: missing closing tag -->

                    ${p.contentBlocks && p.contentBlocks.length > 0 ?
                        p.contentBlocks.map(block => {
                            if (block.type === 'text') {
                                return `
                                    <div class="content-block-text">
                                        <p>${block.value.replace(/\n/g, '<br>')}</p>
                                    </div>
                                `;
                            } else if (block.type === 'image') {
                                return `
                                    <div class="content-block-media">
                                        <img src="${block.value}" class="project-detail-img">
                                    </div>
                                `;
                            }
                        }).join('')
                        : '<p>No content details available.</p>'
                    }

                </div>
            </div>
        </div>
    `).join('');
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
        
        /* PROJECTS VISUAL */
        .project-grid-visual { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .project-card-visual { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; display: flex; flex-direction: column; height: 100%; }
        .project-card-visual:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
        .card-img-container { height: 180px; background: #e5e7eb; overflow: hidden; }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .project-card-visual:hover .card-img { transform: scale(1.05); }
        .card-content { padding: 1.25rem; flex: 1; display: flex; flex-direction: column; }
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

        /* --- MODAL LAYOUT --- */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 2000; background: var(--bg-page); opacity: 0; visibility: hidden; overflow-y: auto; transition: opacity 0.3s ease, visibility 0.3s; }
        .modal-overlay.active { opacity: 1; visibility: visible; }
        
        .close-btn-fixed { position: fixed; top: 20px; right: 20px; background: rgba(0, 0, 0, 0.6); color: white; border: none; padding: 10px 20px; border-radius: 30px; display: flex; align-items: center; gap: 8px; cursor: pointer; z-index: 2005; backdrop-filter: blur(4px); font-weight: 600; transition: background 0.2s; }
        .close-btn-fixed:hover { background: rgba(0, 0, 0, 0.8); }

        .modal-content-scrollable { width: 100%; min-height: 100vh; background: var(--bg-page); overflow-y: auto; padding: 60px 20px 100px 20px; }
        
        /* FIXED: Added text-align left to container for global uniformity */
        .modal-inner-container { max-width: 800px; margin: 0 auto; text-align: left; }

        .modal-header-simple { text-align: left; margin-bottom: 2rem; margin-top: 2rem; }
        .modal-header-simple h1 { font-size: 2.5rem; margin-bottom: 0.5rem; line-height: 1.1; }
        .modal-header-simple .subtitle { font-size: 1.1rem; color: var(--text-muted); display: block; margin-bottom: 1.5rem; }

        /* FIXED: Added action container specific styles */
        .modal-actions { margin-top: 1.5rem; }
        .modal-actions .btn { width: fit-content; display: inline-flex; }

        .content-block-media { margin-bottom: 3rem; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); background: var(--hover); }
        .project-detail-img { width: 100%; height: auto; display: block; }

        /* FIXED: Removed padding from content block to align it with header */
        .content-block-text { margin-bottom: 3rem; padding: 0; }
        .content-block-text h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-main); }
        .content-block-text p { font-size: 1.05rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.5rem; }

        @media (max-width: 768px) {
            .modal-header-simple h1 { font-size: 2rem; }
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

        const imgLight = "/profile.png";
        const imgDark = "/profile-dark.png";
        
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
