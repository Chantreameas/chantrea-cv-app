const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
let sharp;
try { sharp = require('sharp'); } catch(e) { sharp = null; }

const app = express();
const PORT = process.env.PORT || 3000;
const IS_CLOUD = !!process.env.RENDER || !!process.env.HEROKU || !!process.env.RAILWAY;

// ====== Config ======
// In cloud (ephemeral FS), use /tmp for writable data
const DATA_DIR = IS_CLOUD ? '/tmp/cv-app-data' : path.join(__dirname, 'data');
const UPLOAD_DIR = IS_CLOUD ? '/tmp/cv-app-uploads' : path.join(__dirname, 'public', 'uploads');
const DATA_FILE = path.join(DATA_DIR, 'cv-data.json');
const AUTH_FILE = path.join(DATA_DIR, 'auth.json');

// Ensure dirs exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ====== Middleware ======
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/admin', express.static(path.join(__dirname, 'public')));
// Serve uploaded photos from the writable upload dir
app.use('/uploads', express.static(UPLOAD_DIR));
// Serve static assets (fonts, images) for the CV page
app.use(express.static(path.join(__dirname, 'public')));

// Multer for photo upload (memory storage for cloud compat)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file.originalname)) cb(null, true);
    else cb(new Error('Only image files allowed'));
  }
});

// ====== Auth (Cloud-Safe) ======
// Password: ENV var ADMIN_PASSWORD > auto-generated > file
// Token: always regenerated on startup (stateless auth per restart)
let cachedAuth = null;

function initAuth() {
  if (cachedAuth) return cachedAuth;

  const envPassword = process.env.ADMIN_PASSWORD;
  const token = crypto.randomBytes(32).toString('hex');

  if (envPassword) {
    // Cloud mode: password from env var, token regenerated each restart
    cachedAuth = { token, password: envPassword };
    console.log('🔑 Auth: using ADMIN_PASSWORD from environment');
  } else if (fs.existsSync(AUTH_FILE)) {
    // Local mode: read from file
    const fileData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'));
    cachedAuth = { token, password: fileData.password };
  } else {
    // First-time local: generate and save
    const password = crypto.randomBytes(8).toString('hex');
    cachedAuth = { token, password };
    fs.writeFileSync(AUTH_FILE, JSON.stringify({ token, password }, null, 2));
    console.log('===========================================');
    console.log('  FIRST TIME SETUP — Save these credentials:');
    console.log('  Password:', password);
    console.log('===========================================');
  }
  return cachedAuth;
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth && auth.replace('Bearer ', '');
  const authData = initAuth();
  if (token !== authData.token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ====== Default CV Data ======
function getDefaultData() {
  return {
    personal: {
      firstName: 'Chantrea',
      lastName: 'MEAS',
      title: 'IT Manager · Luxury Hospitality',
      summary: 'Experienced IT Manager specializing in luxury hotel technology infrastructure. Driving digital transformation, managing enterprise systems, and ensuring seamless guest experiences through innovative technology solutions.',
      about: [
        'I am a dedicated IT Manager with extensive experience in the luxury hospitality industry. I oversee the complete technology ecosystem of high-end hotel properties — from network infrastructure and PMS systems to in-room smart technology and cybersecurity.',
        'With 10+ years in IT and hospitality technology, I have successfully led digital transformation initiatives, system migrations, and technology rollouts across multiple properties. My mission is to bridge the gap between world-class guest experiences and cutting-edge technology.',
        'I believe that in luxury hospitality, technology should be invisible yet flawless — empowering staff, delighting guests, and protecting the brand\'s reputation.'
      ],
      email: '4hantrea@gmail.com',
      phone: '+855 (0) 86 86 09 86',
      location: 'Phnom Penh, Cambodia',
      linkedin: 'https://www.linkedin.com/in/chantrea-m-9847a08a/',
      availability: 'Open to opportunities',
      specialization: 'Luxury Hotel IT',
      profilePhoto: ''
    },
    stats: [
      { label: 'Years Experience', value: 10, suffix: '+' },
      { label: 'Properties Managed', value: 5, suffix: '+' },
      { label: '% Uptime SLA', value: 99, suffix: '+' },
      { label: 'Team Members Led', value: 50, suffix: '+' }
    ],
    skills: [
      {
        category: 'Hotel IT Systems',
        icon: '🏨',
        items: [
          { name: 'PMS (Opera / Mews / Protel)', level: 95 },
          { name: 'POS & F&B Systems', level: 90 },
          { name: 'Guest Experience Platforms', level: 88 },
          { name: 'Channel Manager & CRS', level: 85 }
        ]
      },
      {
        category: 'Infrastructure & Security',
        icon: '🔧',
        items: [
          { name: 'Network Architecture (LAN/WAN/WiFi)', level: 92 },
          { name: 'Cybersecurity & PCI-DSS', level: 88 },
          { name: 'Cloud Services (AWS / Azure)', level: 80 },
          { name: 'Server & Virtualization (VMware)', level: 86 }
        ]
      },
      {
        category: 'Leadership & Strategy',
        icon: '💡',
        items: [
          { name: 'IT Strategy & Budgeting', level: 93 },
          { name: 'Vendor Management', level: 90 },
          { name: 'Team Leadership & Training', level: 92 },
          { name: 'Digital Transformation', level: 89 }
        ]
      }
    ],
    techTags: [
      'Opera PMS', 'Mews', 'Oracle Hospitality', 'Micros POS',
      'Cisco Networking', 'VMware', 'Microsoft 365', 'PCI-DSS',
      'AWS', 'Fortinet', 'Smart Room Tech', 'IoT',
      'ITIL', 'Project Management', 'Budgeting'
    ],
    experience: [
      {
        date: '2021 — Present',
        title: 'IT Manager',
        company: 'The Royal Palace Hotel & Resort · Phnom Penh',
        bullets: [
          'Oversee full IT infrastructure for a 5-star 300+ room luxury property',
          'Led migration from legacy PMS to Oracle Opera Cloud, improving check-in time by 60%',
          'Implemented enterprise-grade WiFi covering 15,000 sqm with 99.9% uptime',
          'Managed annual IT budget of $500K+, reducing costs by 15% through vendor negotiations',
          'Established cybersecurity framework achieving full PCI-DSS compliance',
          'Directed a team of 12 IT staff across helpdesk, infrastructure, and applications'
        ]
      },
      {
        date: '2018 — 2021',
        title: 'Assistant IT Manager',
        company: 'Grand Angkor Luxury Hotel · Siem Reap',
        bullets: [
          'Supported IT operations for a 200-room 5-star property serving international clientele',
          'Deployed smart room technology (IoT lighting, climate, entertainment) in 150 rooms',
          'Implemented new POS system across 6 F&B outlets, reducing order errors by 40%',
          'Managed network security, VPN, and guest internet with bandwidth management',
          'Coordinated with vendors for 24/7 support SLAs on critical systems'
        ]
      },
      {
        date: '2015 — 2018',
        title: 'IT Officer',
        company: 'Mekong Riverside Boutique Hotel · Phnom Penh',
        bullets: [
          'Administered PMS, POS, and back-office systems for a boutique property',
          'Provided first- and second-level technical support to 100+ staff members',
          'Upgraded network infrastructure from 100Mbps to 1Gbps backbone',
          'Maintained backup systems, disaster recovery plans, and data security protocols'
        ]
      },
      {
        date: '2013 — 2015',
        title: 'IT Support Specialist',
        company: 'Tech Solutions Cambodia · Phnom Penh',
        bullets: [
          'Delivered on-site IT support for hospitality and corporate clients',
          'Installed and configured network equipment, servers, and workstations',
          'Trained end-users on software applications and security best practices'
        ]
      }
    ],
    education: [
      {
        year: '2009 — 2013',
        degree: 'Bachelor of Science in Information Technology',
        school: 'Royal University of Phnom Penh',
        description: 'GPA: 3.6/4.0 · Focus on Network Administration & Information Systems'
      },
      {
        year: '2017',
        degree: 'Master of Business Administration (MBA)',
        school: 'Institute of Cambodia for Business Studies',
        description: 'Specialization in Technology Management & Digital Strategy'
      }
    ],
    certifications: [
      { name: 'ITIL v4 Foundation', org: 'Axelos / PeopleCert · 2022' },
      { name: 'Cisco CCNA', org: 'Cisco Systems · 2019' },
      { name: 'PCI-DSS Implementer', org: 'PCI Security Standards · 2021' },
      { name: 'Oracle Hospitality Certified', org: 'Oracle University · 2020' },
      { name: 'AWS Cloud Practitioner', org: 'Amazon Web Services · 2023' },
      { name: 'PMP Certified', org: 'Project Management Institute · 2022' }
    ],
    achievements: [
      {
        icon: '🏗️',
        title: 'Full PMS Cloud Migration',
        description: 'Led the end-to-end migration from on-premise Opera to Oracle Opera Cloud across 300+ rooms, achieving zero downtime during cutover and 60% faster check-in process.',
        tags: ['Oracle Opera Cloud', 'Data Migration', 'Change Mgmt', 'Staff Training']
      },
      {
        icon: '🔒',
        title: 'PCI-DSS Compliance Program',
        description: 'Established and maintained full PCI-DSS compliance for payment card handling, including network segmentation, vulnerability scans, and staff awareness training.',
        tags: ['PCI-DSS v3.2', 'Network Segmentation', 'Firewall', 'SIEM']
      },
      {
        icon: '🌐',
        title: 'Enterprise WiFi Overhaul',
        description: 'Deployed high-density WiFi across 15,000 sqm including guest rooms, conference halls, and pool areas with 99.9% uptime and seamless roaming.',
        tags: ['Cisco Meraki', 'UniFi', 'Bandwidth Mgmt', 'Captive Portal']
      },
      {
        icon: '🤖',
        title: 'Smart Room Technology Rollout',
        description: 'Implemented IoT-based smart room system in 150 rooms — automated lighting, climate control, and entertainment via tablet and voice commands.',
        tags: ['IoT', 'Control4', 'Creston', 'Tablet UX']
      }
    ],
    languages: [
      { name: 'Khmer', level: 'Native', dots: 5 },
      { name: 'English', level: 'Fluent', dots: 4 },
      { name: 'French', level: 'Intermediate', dots: 3 },
      { name: 'Thai', level: 'Conversational', dots: 2 }
    ],
    socialLinks: [
      { icon: '💼', label: 'LinkedIn', url: 'https://www.linkedin.com/in/chantrea-m-9847a08a/' },
      { icon: '📧', label: 'Email', url: 'mailto:4hantrea@gmail.com' },
      { icon: '🐙', label: 'GitHub', url: '#' },
      { icon: '💬', label: 'WhatsApp', url: '#' },
      { icon: '✈️', label: 'Telegram', url: '#' }
    ]
  };
}

// ====== Load/Save Data (Cloud-Safe) ======
// On cloud: every restart wipes the filesystem, so we always seed from defaults
// if no data file exists. During a session, changes are saved to the file and persist
// until the next deploy/restart.
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.log('⚠️  Could not read data file, using defaults:', e.message);
  }
  const defaults = getDefaultData();
  fs.writeFileSync(DATA_FILE, JSON.stringify(defaults, null, 2));
  return defaults;
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('⚠️  Could not save data file:', e.message);
  }
}

// ====== API Routes ======

// Login
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const authData = initAuth();
  if (password === authData.password) {
    res.json({ token: authData.token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Change password
app.post('/api/change-password', authMiddleware, (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  const authData = initAuth();
  authData.token = crypto.randomBytes(32).toString('hex');
  authData.password = newPassword;
  cachedAuth = authData;
  // Try to persist to file (works locally, may fail on cloud)
  try {
    fs.writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2));
  } catch(e) { /* ok on cloud */ }
  res.json({ token: authData.token, message: 'Password changed. Note: on free cloud hosting, set ADMIN_PASSWORD env var to persist across restarts.' });
});

// Get CV data (public)
app.get('/api/cv', (req, res) => {
  res.json(loadData());
});

// Update full CV data
app.put('/api/cv', authMiddleware, (req, res) => {
  saveData(req.body);
  res.json({ message: 'CV updated successfully' });
});

// Update personal info
app.put('/api/cv/personal', authMiddleware, (req, res) => {
  const data = loadData();
  data.personal = { ...data.personal, ...req.body };
  saveData(data);
  res.json({ message: 'Personal info updated', data: data.personal });
});

// Update stats
app.put('/api/cv/stats', authMiddleware, (req, res) => {
  const data = loadData();
  data.stats = req.body;
  saveData(data);
  res.json({ message: 'Stats updated' });
});

// Update skills
app.put('/api/cv/skills', authMiddleware, (req, res) => {
  const data = loadData();
  data.skills = req.body;
  saveData(data);
  res.json({ message: 'Skills updated' });
});

// Update tech tags
app.put('/api/cv/tech-tags', authMiddleware, (req, res) => {
  const data = loadData();
  data.techTags = req.body;
  saveData(data);
  res.json({ message: 'Tech tags updated' });
});

// Update experience
app.put('/api/cv/experience', authMiddleware, (req, res) => {
  const data = loadData();
  data.experience = req.body;
  saveData(data);
  res.json({ message: 'Experience updated' });
});

// Update education
app.put('/api/cv/education', authMiddleware, (req, res) => {
  const data = loadData();
  data.education = req.body;
  saveData(data);
  res.json({ message: 'Education updated' });
});

// Update certifications
app.put('/api/cv/certifications', authMiddleware, (req, res) => {
  const data = loadData();
  data.certifications = req.body;
  saveData(data);
  res.json({ message: 'Certifications updated' });
});

// Update achievements
app.put('/api/cv/achievements', authMiddleware, (req, res) => {
  const data = loadData();
  data.achievements = req.body;
  saveData(data);
  res.json({ message: 'Achievements updated' });
});

// Update languages
app.put('/api/cv/languages', authMiddleware, (req, res) => {
  const data = loadData();
  data.languages = req.body;
  saveData(data);
  res.json({ message: 'Languages updated' });
});

// Update social links
app.put('/api/cv/social-links', authMiddleware, (req, res) => {
  const data = loadData();
  data.socialLinks = req.body;
  saveData(data);
  res.json({ message: 'Social links updated' });
});

// Upload profile photo (cloud-safe: store as base64 data URL in JSON)
app.post('/api/cv/photo', authMiddleware, upload.single('photo'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const buffer = req.file.buffer;
    const mimeType = req.file.mimetype || 'image/jpeg';
    let finalBuffer = buffer;
    let finalMime = mimeType;

    // Try to resize with sharp
    if (sharp) {
      try {
        finalBuffer = await sharp(buffer)
          .resize(400, 400, { fit: 'cover' })
          .webp({ quality: 90 })
          .toBuffer();
        finalMime = 'image/webp';
      } catch(e) { /* use original */ }
    }

    // Store as base64 data URL in the JSON data (works on ephemeral FS)
    const base64 = finalBuffer.toString('base64');
    const dataUrl = `data:${finalMime};base64,${base64}`;

    const data = loadData();
    data.personal.profilePhoto = dataUrl;
    saveData(data);

    res.json({ message: 'Photo uploaded', stored: 'base64', size: base64.length });
  } catch (err) {
    res.status(500).json({ error: 'Image processing failed' });
  }
});

// ====== Health check (useful for Render) ======
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', cloud: IS_CLOUD, uptime: process.uptime() });
});

// ====== Serve CV frontend (root) ======
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cv.html'));
});

// ====== Start ======
app.listen(PORT, () => {
  const mode = IS_CLOUD ? '☁️  CLOUD' : '💻 LOCAL';
  console.log(`\n  🏨 CV App running at http://localhost:${PORT}`);
  console.log(`  🔧 Admin panel at http://localhost:${PORT}/admin`);
  console.log(`  📡 API endpoint: http://localhost:${PORT}/api/cv`);
  console.log(`  🌍 Mode: ${mode}`);
  if (IS_CLOUD) {
    console.log('  ⚠️  Cloud mode: data persists per-session only (ephemeral FS)');
    console.log('  💡 To keep your edits, download CV JSON from admin before deploy');
  }
  initAuth();
});