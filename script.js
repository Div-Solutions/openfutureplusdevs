const supabaseUrl = 'https://bsrmyybqpkcukcavkzzl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzcm15eWJxcGtjdWtjYXZrenpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNjU4MTUsImV4cCI6MjEwNTc0MTgxNX0.0ZxEkNlZjTcQUqyjgYhPoMCG86iueq--IzSLeRGqOO8';
const supabaseClient = window.supabase && typeof window.supabase.createClient === 'function'
  ? window.supabase.createClient(supabaseUrl, supabaseKey)
  : null;

const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const helpForm = document.getElementById('helpForm');
const employerForm = document.querySelector('.employer-form');
const apsForm = document.getElementById('apsForm');
const tutForm = document.getElementById('tutForm');
const year = document.getElementById('year');
const STORAGE_KEY = 'openfuture_users_v1';
const SESSION_KEY = 'openfuture_session_v1';
const ADMIN_EMAIL = 'mutavhatsindivule@gmail.com';
const ADMIN_PASSWORD = 'Admin@1t';
const ADMIN_PHONE = '+27 72 999 0064';
const SECURITY_SECRET = 'openfutureplus-static-security-v1';
const SESSION_TIMEOUT_MS = 20 * 60 * 1000;
const ADMIN_NAME = 'Vuledzani Mbangambanga Mutavhatsindi';
const PHONE_COUNTRY_OPTIONS = [
  { value: 'ZA', label: 'South Africa (+27)', dialCode: '+27' },
  { value: 'US', label: 'United States (+1)', dialCode: '+1' },
  { value: 'UK', label: 'United Kingdom (+44)', dialCode: '+44' },
  { value: 'IN', label: 'India (+91)', dialCode: '+91' },
  { value: 'NG', label: 'Nigeria (+234)', dialCode: '+234' },
];

const sanitizeText = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

const createSessionToken = (user) => {
  const payload = {
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Date.now() + SESSION_TIMEOUT_MS,
  };

  return `${btoa(encodeURIComponent(JSON.stringify(payload)))}.${SECURITY_SECRET}`;
};

const isValidSessionToken = (sessionUser) => {
  if (!sessionUser || !sessionUser.token) return false;

  try {
    const tokenBody = sessionUser.token.split('.')[0];
    const payload = JSON.parse(decodeURIComponent(atob(tokenBody)));
    return Boolean(payload.email) && payload.role && Date.now() < payload.exp;
  } catch {
    return false;
  }
};

const SUBJECT_RESOURCES = [
  {
    title: 'English Home Language',
    summary: 'Focuses on reading, writing, analysis, and speaking skills needed for academic work and professional communication.',
    examFocus: 'Comprehension, essay writing, language structures, and literature study.',
    studyTips: ['Read articles and editorials daily.', 'Practice paragraph and essay planning.', 'Learn key literary devices and themes.']
  },
  {
    title: 'Afrikaans FAL',
    summary: 'Builds language confidence in reading, writing, speaking, and understanding everyday and formal Afrikaans texts.',
    examFocus: 'Vocabulary, grammar, comprehension, and transactional writing.',
    studyTips: ['Learn common sentence patterns.', 'Write short summaries each week.', 'Revise vocabulary with flashcards.']
  },
  {
    title: 'Mathematics',
    summary: 'Develops algebra, functions, geometry, trigonometry, and problem-solving skills needed for science and commerce pathways.',
    examFocus: 'Algebra, calculus basics, patterns, sequences, and Euclidean geometry.',
    studyTips: ['Practice past papers under timed conditions.', 'Memorise key formulas.', 'Always show all working clearly.']
  },
  {
    title: 'Mathematical Literacy',
    summary: 'Applies mathematics to real-life situations such as budgeting, transport, finance, and statistics.',
    examFocus: 'Graphs, ratios, interpretation, financial calculations, and data representation.',
    studyTips: ['Interpret the story behind the numbers.', 'Use real-life examples for practice.', 'Check units and rounding carefully.']
  },
  {
    title: 'Physical Sciences',
    summary: 'Explains motion, matter, energy, electricity, and chemical systems using scientific principles and experiments.',
    examFocus: 'Forces, energy, motion, acids and bases, and chemical reactions.',
    studyTips: ['Revise definitions and formulas weekly.', 'Balance equations regularly.', 'Understand experiments and graphs.']
  },
  {
    title: 'Life Sciences',
    summary: 'Looks at cells, genetics, human systems, ecology, and how living things function and interact.',
    examFocus: 'Cell structure, genetics, human body systems, and ecosystems.',
    studyTips: ['Use labelled diagrams often.', 'Link theory to examples from daily life.', 'Memorise keywords and processes.']
  },
  {
    title: 'Accounting',
    summary: 'Teaches financial reporting, bookkeeping, analysis, and understanding of business transactions.',
    examFocus: 'Financial statements, cash flow, balance sheet, and accounting concepts.',
    studyTips: ['Practise journal entries and ledgers.', 'Know the difference between cash and accrual accounting.', 'Use format templates.']
  },
  {
    title: 'Business Studies',
    summary: 'Introduces entrepreneurship, management, marketing, finance, and the role of business in society.',
    examFocus: 'Business environments, forms of ownership, marketing, and management functions.',
    studyTips: ['Use case studies to connect theory.', 'Learn definitions and examples.', 'Practise essay planning.']
  },
  {
    title: 'Economics',
    summary: 'Examines how individuals, businesses, and governments make economic decisions and allocate resources.',
    examFocus: 'Microeconomics, macroeconomics, inflation, unemployment, and markets.',
    studyTips: ['Understand key graphs and trends.', 'Relate theory to everyday examples.', 'Learn definitions precisely.']
  },
  {
    title: 'Geography',
    summary: 'Studies landforms, climate, settlements, resources, and the interaction between people and the environment.',
    examFocus: 'Map skills, weather and climate, population, and environmental management.',
    studyTips: ['Practise map interpretation.', 'Learn case studies and examples.', 'Use diagrams and labelled sketches.']
  },
  {
    title: 'History',
    summary: 'Explores major events, societies, causes, and consequences across time, especially in South Africa and the world.',
    examFocus: 'Source-based questions, essays, timelines, and cause-and-effect analysis.',
    studyTips: ['Build a timeline of events.', 'Compare causes and consequences.', 'Learn essay structure and evidence.']
  },
  {
    title: 'Computer Applications Technology',
    summary: 'Introduces digital tools, spreadsheets, word processing, database basics, and practical problem solving.',
    examFocus: 'Word processing, spreadsheets, databases, and system software.',
    studyTips: ['Practise practical tasks regularly.', 'Learn keyboard shortcuts.', 'Test formulas and data validation.']
  },
  {
    title: 'Information Technology',
    summary: 'Develops logical thinking, programming skills, and understanding of digital systems and data processing.',
    examFocus: 'Programming concepts, algorithms, hardware/software, and data structures.',
    studyTips: ['Break problems into steps.', 'Write pseudocode before coding.', 'Practise with small programming exercises.']
  },
  {
    title: 'Engineering Graphics & Design',
    summary: 'Teaches communication through technical drawings, design principles, and visual representation.',
    examFocus: 'Orthographic projection, design communication, and CAD basics.',
    studyTips: ['Keep tools and scales accurate.', 'Practise line types and dimensioning.', 'Study past drawings carefully.']
  },
  {
    title: 'Life Orientation',
    summary: 'Supports personal development, social responsibility, careers, health, and life skills.',
    examFocus: 'Career planning, personal growth, health education, and citizenship.',
    studyTips: ['Reflect on real-life decisions.', 'Research careers and skills needed.', 'Build a personal plan and goals.']
  },
  {
    title: 'Visual Arts',
    summary: 'Focuses on creativity, art theory, visual communication, and making meaning through artistic practice.',
    examFocus: 'Art movements, analysis, practical artworks, and design choices.',
    studyTips: ['Make time to sketch regularly.', 'Study artworks and describe visual choices.', 'Use critique to improve.']
  },
  {
    title: 'Music',
    summary: 'Explores sound, rhythm, performance, theory, and the cultural role of music in society.',
    examFocus: 'Music notation, theory, listening skills, and performance practice.',
    studyTips: ['Listen to different genres.', 'Practise rhythm and notation daily.', 'Learn musical terms and their meanings.']
  },
  {
    title: 'Tourism',
    summary: 'Covers travel, hospitality, customer service, tourism trends, and the economic importance of the industry.',
    examFocus: 'Tourism sectors, customer service, destinations, and responsible travel.',
    studyTips: ['Research tourist destinations.', 'Learn how service affects customer experience.', 'Understand local and international tourism trends.']
  },
  {
    title: 'Consumer Studies',
    summary: 'Builds practical knowledge about food, clothing, households, budgeting, and responsible consumer behaviour.',
    examFocus: 'Nutrition, textiles, consumer rights, and household management.',
    studyTips: ['Study practical examples and case studies.', 'Apply theory to everyday consumer choices.', 'Know key definitions and labels.']
  },
  {
    title: 'Agricultural Sciences',
    summary: 'Explores farming, crop production, animal production, soil science, and sustainable agriculture.',
    examFocus: 'Soil, plant growth, animal systems, and farm management.',
    studyTips: ['Link theory to practical farm examples.', 'Understand diagrams of plant and animal systems.', 'Revise key processes and terms.']
  },
  {
    title: 'Drama',
    summary: 'Develops performance, communication, imagination, and understanding of dramatic texts and theatre traditions.',
    examFocus: 'Performance skills, stage conventions, and dramatic analysis.',
    studyTips: ['Practise voice and movement.', 'Read play extracts closely.', 'Learn how theme and character shape performance.']
  }
];

const TUT_COURSES = [
  {
    name: 'Information Technology',
    aps: '24+ with Mathematics or strong technical aptitude',
    subjects: 'English, Mathematics, Physical Sciences/IT preferred',
    careers: ['Software Developer', 'Systems Analyst', 'IT Support Technician', 'Database Administrator'],
    requirements: 'Minimum APS set by TUT; Mathematics strongly recommended; good digital literacy.'
  },
  {
    name: 'Business Administration',
    aps: '20+ to 26+',
    subjects: 'English plus business-related subjects',
    careers: ['Office Manager', 'Business Analyst', 'Operations Coordinator', 'Sales Supervisor'],
    requirements: 'English competence, good communication skills, and an interest in organisational work.'
  },
  {
    name: 'Human Resource Management',
    aps: '20+ to 28+',
    subjects: 'English, Business Studies, Economics or related subjects',
    careers: ['HR Assistant', 'Recruitment Officer', 'Training Coordinator', 'Labour Relations Officer'],
    requirements: 'Strong communication, organisational ability, and people skills.'
  },
  {
    name: 'Civil Engineering',
    aps: '28+ with Mathematics and Physical Sciences',
    subjects: 'Mathematics, Physical Sciences, English',
    careers: ['Site Engineer', 'Quantity Surveyor Assistant', 'Structural Technician', 'Project Supervisor'],
    requirements: 'Strong mathematics, physics understanding, attention to detail, and problem solving.'
  },
  {
    name: 'Electrical Engineering',
    aps: '28+ with Mathematics and Physical Sciences',
    subjects: 'Mathematics, Physical Sciences, English',
    careers: ['Electrical Technician', 'Control Systems Technician', 'Maintenance Engineer', 'Power Systems Assistant'],
    requirements: 'Analytical thinking and a strong grounding in technical mathematics and circuits.'
  },
  {
    name: 'Education (Foundation Phase / Intermediate)',
    aps: '22+ to 28+',
    subjects: 'English, Mathematics, and related school subjects',
    careers: ['Primary School Teacher', 'Junior Phase Teacher', 'Learning Support Facilitator'],
    requirements: 'English proficiency, patience, communication skills, and a passion for teaching.'
  },
  {
    name: 'Nursing',
    aps: '30+ or as per programme requirements',
    subjects: 'English, Life Sciences, Mathematics or Mathematical Literacy',
    careers: ['Registered Nurse', 'Clinic Nurse', 'Community Health Worker', 'Healthcare Assistant'],
    requirements: 'Science background, caring nature, responsibility, and clinical readiness.'
  },
  {
    name: 'Marketing',
    aps: '20+ to 26+',
    subjects: 'English, Business Studies, Economics, Mathematics',
    careers: ['Marketing Coordinator', 'Sales Representative', 'Brand Assistant', 'Digital Marketer'],
    requirements: 'Good communication, creativity, and digital literacy.'
  },
  {
    name: 'Accounting',
    aps: '25+ with Accounting and Mathematics preferred',
    subjects: 'Accounting, English, Mathematics',
    careers: ['Junior Accountant', 'Bookkeeper', 'Financial Clerk', 'Auditing Assistant'],
    requirements: 'Strong numerical skills, attention to detail, and financial discipline.'
  },
  {
    name: 'Tourism Management',
    aps: '20+ to 26+',
    subjects: 'English, Geography, Tourism or Business Studies',
    careers: ['Travel Consultant', 'Tour Coordinator', 'Hospitality Assistant', 'Event Assistant'],
    requirements: 'Customer service skills, communication, and flexibility.'
  },
  {
    name: 'Architecture',
    aps: '28+ with Mathematics and EGD',
    subjects: 'Mathematics, Engineering Graphics & Design, English',
    careers: ['Architectural Drafter', 'Design Assistant', 'Interior Design Assistant', 'Planning Technician'],
    requirements: 'Strong design sense, spatial thinking, technical drawing, and creativity.'
  },
  {
    name: 'Journalism and Media Practice',
    aps: '20+ to 26+',
    subjects: 'English, History, Languages, or Business Studies',
    careers: ['Reporter', 'Content Writer', 'Media Assistant', 'Social Media Coordinator'],
    requirements: 'Strong writing, reading, communication, and research ability.'
  }
];

const JOB_PORTALS = [
  {
    name: 'Careers24',
    url: 'https://www.careers24.com/',
    type: 'General jobs',
    radiusKm: 100,
    requirements: 'CV, ID, qualifications, and contact details.'
  },
  {
    name: 'PNet',
    url: 'https://www.pnet.co.za/',
    type: 'Professional jobs',
    radiusKm: 80,
    requirements: 'Updated CV, work experience, and qualifications.'
  },
  {
    name: 'JobStreet South Africa',
    url: 'https://www.jobstreet.co.za/',
    type: 'Employment listings',
    radiusKm: 60,
    requirements: 'CV, ID, and a short profile summary.'
  },
  {
    name: 'LinkedIn Jobs',
    url: 'https://www.linkedin.com/jobs/',
    type: 'Corporate roles',
    radiusKm: 120,
    requirements: 'Professional profile, CV, and work history.'
  },
  {
    name: 'Government Vacancies',
    url: 'https://www.gov.za/',
    type: 'Public sector',
    radiusKm: 150,
    requirements: 'Certified qualifications, ID, and relevant supporting documents.'
  },
  {
    name: 'Gumtree Jobs',
    url: 'https://www.gumtree.co.za/',
    type: 'Entry-level and casual jobs',
    radiusKm: 50,
    requirements: 'CV, ID, and availability confirmation.'
  },
  {
    name: 'Woolworths Careers',
    url: 'https://www.woolworthsholdings.co.za/careers/',
    type: 'Retail and admin',
    radiusKm: 30,
    requirements: 'CV, ID, matric certificate, and work availability.'
  },
  {
    name: 'Shoprite Careers',
    url: 'https://www.shoprite.jobs/',
    type: 'Retail and support roles',
    radiusKm: 25,
    requirements: 'CV, ID, work references, and availability.'
  },
  {
    name: 'MTN Careers',
    url: 'https://www.mtn.co.za/careers/',
    type: 'Telecommunications',
    radiusKm: 90,
    requirements: 'CV, qualifications, and relevant experience if required.'
  },
  {
    name: 'Nedbank Careers',
    url: 'https://careers.nedbank.co.za/',
    type: 'Banking and finance',
    radiusKm: 70,
    requirements: 'Updated CV, qualifications, and clear communication skills.'
  }
];

const normalizePhoneNumber = (value, countryCode = 'ZA') => {
  const digits = String(value || '').replace(/\D/g, '');
  if (!digits) return '';

  const countryMap = {
    ZA: '+27',
    US: '+1',
    UK: '+44',
    IN: '+91',
    NG: '+234',
  };

  const dialCode = countryMap[countryCode] || '+27';

  if (countryCode === 'ZA') {
    let clean = digits;
    if (clean.startsWith('27')) {
      clean = clean.slice(2);
    }
    if (clean.startsWith('0')) {
      clean = clean.slice(1);
    }

    if (clean.length !== 9) return '';
    return `${dialCode}${clean}`;
  }

  if (digits.length < 7 || digits.length > 15) return '';
  return `${dialCode}${digits}`;
};

const normalizePhoneForComparison = (value, countryCode = 'ZA') => {
  const normalized = normalizePhoneNumber(value, countryCode);
  if (normalized) return normalized;

  const digits = String(value || '').replace(/\D/g, '');
  if (countryCode === 'ZA' && digits.length === 9) {
    return `+27${digits}`;
  }

  return '';
};

const getAllowedPhoneDigits = (countryCode) => (countryCode === 'ZA' ? 9 : 15);

const formatPhoneForDisplay = (value) => {
  if (!value) return 'Not provided';
  const digits = String(value).replace(/\D/g, '');
  if (!digits) return 'Not provided';

  if (digits.startsWith('27') && digits.length === 12) {
    const local = digits.slice(2);
    return `0${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
  }

  if (digits.startsWith('0') && digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  if (digits.length === 9) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  return value;
};

const parseLoginContact = (loginValue, countryCode = 'ZA') => {
  const value = String(loginValue || '').trim();
  if (!value) return { email: '', phone: '' };

  if (value.includes('@')) {
    return { email: value.toLowerCase(), phone: '' };
  }

  const normalizedPhone = normalizePhoneForComparison(value, countryCode);
  return { email: '', phone: normalizedPhone || value };
};

const isStrongPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
};

const isAdminPage = () => {
  const pathname = window.location.pathname.toLowerCase();
  return pathname.endsWith('/admin.html') || pathname.endsWith('admin.html');
};

const keepPageAtTop = () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
};

const protectAdminPage = () => {
  const currentUser = readSessionUser();
  if (window.location.protocol === 'file:') {
    window.location.replace('index.html');
    return;
  }

  if (isAdminPage() && (!currentUser || currentUser.role !== 'admin')) {
    window.location.replace('index.html');
  }
};

const scrollToTarget = (targetId) => {
  const target = document.querySelector(targetId);
  if (!target) return;

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const percentageToLevel = (percentage) => {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  if (percentage > 0) return 1;
  return 0;
};

const resolveAchievementLevel = (percentInput, levelSelect) => {
  const percentValue = Number(percentInput.value || 0);

  if (percentValue > 0) {
    return percentageToLevel(percentValue);
  }

  return Number(levelSelect.value || 0);
};

const normalizeSubjectName = (value = '') => String(value ?? '')
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const isLifeOrientationSubject = (subjectName = '') => {
  const normalized = normalizeSubjectName(subjectName);
  return normalized === 'life orientation' || normalized === 'life orient' || normalized === 'lo' || normalized.includes('life orientation') || normalized.includes('life orient');
};

const buildApsLevelOptions = (selectedValue = '1') => {
  const options = ['1', '2', '3', '4', '5', '6', '7'];
  return options.map((value) => `<option value="${value}" ${value === String(selectedValue) ? 'selected' : ''}>${value}</option>`).join('');
};

const createApsSubjectRow = (index, subjectName = '', percentageValue = '', selectedLevel = '1') => {
  const row = document.createElement('div');
  row.className = 'aps-subject-row';
  row.innerHTML = `
    <div class="input-grid aps-row-grid">
      <div>
        <label>Subject ${index}</label>
        <input class="aps-subject" type="text" placeholder="e.g. English" value="${sanitizeText(subjectName)}" />
      </div>
      <div>
        <label>% or Level</label>
        <input class="aps-mark" type="number" min="0" max="100" step="1" value="${sanitizeText(percentageValue)}" placeholder="85 or choose below" />
      </div>
      <div>
        <label>Level</label>
        <select class="aps-level">
          ${buildApsLevelOptions(selectedLevel)}
        </select>
      </div>
      <div>
        <button type="button" class="remove-aps-subject" aria-label="Remove subject">Remove</button>
      </div>
    </div>
  `;
  return row;
};

const ensureApsRows = () => {
  const container = document.getElementById('apsSubjectRows');
  if (!container) return;

  if (container.children.length > 0) return;

  const defaults = ['English', 'Mathematics', 'Life Orientation'];
  defaults.forEach((subject, index) => {
    const row = createApsSubjectRow(index + 1, subject, '', '1');
    container.appendChild(row);
  });
};

const addApsSubjectRow = () => {
  const container = document.getElementById('apsSubjectRows');
  if (!container) return;

  const totalRows = container.querySelectorAll('.aps-subject-row').length;
  if (totalRows >= 10) {
    showToast('You can add up to 10 subjects.');
    return;
  }

  const nextIndex = totalRows + 1;
  container.appendChild(createApsSubjectRow(nextIndex, '', '', '0'));
};

const ensureDemoUsers = () => {
  const existingUsers = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  const demoUsers = [
    {
      id: 'admin-1',
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      phone: ADMIN_PHONE,
      password: ADMIN_PASSWORD,
      role: 'admin',
      points: 0,
      district: 'Pretoria',
      school: 'Open Future+ Admin',
    },
    {
      id: 'user-1',
      name: 'Demo Student',
      email: 'student@openfutureplus.demo',
      phone: '+27 71 234 5678',
      password: 'Student@123',
      role: 'user',
      points: 0,
      district: 'Johannesburg',
      school: 'Demo High School',
    },
    {
      id: 'user-2',
      name: 'Demo Applicant',
      email: 'applicant@openfutureplus.demo',
      phone: '+27 82 345 6789',
      password: 'Applicant@123',
      role: 'user',
      points: 0,
      district: 'Cape Town',
      school: 'Demo Academy',
    },
  ];

  if (!Array.isArray(existingUsers) || existingUsers.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUsers));
    return;
  }

  const adminIndex = existingUsers.findIndex((user) => user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() || user.role === 'admin');
  if (adminIndex >= 0) {
    existingUsers[adminIndex] = {
      ...existingUsers[adminIndex],
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      phone: ADMIN_PHONE,
      password: ADMIN_PASSWORD,
      role: 'admin',
      district: existingUsers[adminIndex].district || 'Pretoria',
      school: existingUsers[adminIndex].school || 'Open Future+ Admin',
    };
  } else {
    existingUsers.unshift(demoUsers[0]);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingUsers));
};

const readUsers = () => {
  ensureDemoUsers();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

const readSessionUser = () => {
  try {
    const storedSession = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    const sessionUser = JSON.parse(storedSession || 'null');
    if (!sessionUser) return null;

    if (!isValidSessionToken(sessionUser)) {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return sessionUser;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

const saveSessionUser = (user) => {
  const secureUser = {
    ...user,
    token: createSessionToken(user),
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(secureUser));
  localStorage.setItem(SESSION_KEY, JSON.stringify(secureUser));
};

const clearSessionUser = () => {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
};

const refreshSessionActivity = () => {
  const currentUser = readSessionUser();
  if (!currentUser) return;

  const refreshedUser = {
    ...currentUser,
    token: createSessionToken(currentUser),
  };

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(refreshedUser));
  localStorage.setItem(SESSION_KEY, JSON.stringify(refreshedUser));
};

const enforceSessionTimeout = () => {
  const currentUser = readSessionUser();
  if (!currentUser) return;

  try {
    const tokenBody = currentUser.token.split('.')[0];
    const payload = JSON.parse(decodeURIComponent(atob(tokenBody)));
    if (Date.now() >= payload.exp) {
      clearSessionUser();
      if (window.location.pathname.toLowerCase().endsWith('/admin.html')) {
        window.location.replace('index.html');
      }
    }
  } catch {
    clearSessionUser();
  }
};

const awardUserPoint = () => {
  const currentUser = readSessionUser();
  if (!currentUser || currentUser.role !== 'user') return;

  const users = readUsers();
  const userIndex = users.findIndex((user) => user.email.toLowerCase() === currentUser.email.toLowerCase());
  if (userIndex === -1) return;

  const nextPoints = Math.min(50, Number(users[userIndex].points || 0) + 1);
  users[userIndex].points = nextPoints;
  saveUsers(users);

  const updatedUser = {
    ...currentUser,
    points: nextPoints,
    unlockChat: nextPoints >= 50,
  };
  saveSessionUser(updatedUser);
  renderDashboard();

  if (nextPoints >= 50) {
    showToast('You unlocked direct chat access!');
  }
};

const getSubjectMaterials = (subject) => {
  const title = subject.title || 'Subject';
  const examFocus = subject.examFocus || 'Core theory and practical understanding';

  const topicPatterns = {
    'English Home Language': {
      notes: ['Analyse language features, themes, and tone in prose and poetry.', 'Practise essay structure, paragraphing, and sentence variety.', 'Revise comprehension strategies and assessment terminology.'],
      papers: ['Comprehension and summary task practice.', 'Essay plan and writing drills for literature-based questions.', 'Language structures and editing practice papers.'],
      quizzes: ['Identify figurative language in a sample paragraph.', 'Choose the best topic sentence for an essay.', 'Match literary devices to their definitions.']
    },
    'Afrikaans FAL': {
      notes: ['Build vocabulary with everyday and formal Afrikaans phrases.', 'Practise summary writing and sentence correction.', 'Know grammar rules for tense, adjectives, and verbs.'],
      papers: ['Transactional writing and diary responses.', 'Reading comprehension and context-based questions.', 'Grammar revision tests with correction exercises.'],
      quizzes: ['Choose the correct verb form in context.', 'Identify adjective agreement and sentence structure.', 'Match Afrikaans vocabulary to meanings.']
    },
    Mathematics: {
      notes: ['Revise equations, algebra, functions, and patterns.', 'Memorise formulas and always show working clearly.', 'Practise geometry and trigonometry applications.'],
      papers: ['Algebra and equation-solving papers.', 'Patterns, sequences, and function question sets.', 'Geometry, trigonometry, and Euclidean proof practice.'],
      quizzes: ['Solve one-step and two-step equations.', 'Find the gradient of a line from two points.', 'Apply the theorem of Pythagoras to a right triangle.']
    },
    'Mathematical Literacy': {
      notes: ['Work with ratios, finance, percentages, and graphs.', 'Read the story behind the numbers before calculating.', 'Use units and rounding carefully in real-world tasks.'],
      papers: ['Finance and banking scenario questions.', 'Maps, graphs, and interpretation tasks.', 'Ratio, speed, and percentage applications.'],
      quizzes: ['Calculate percentage increase or decrease.', 'Interpret a graph and identify the trend.', 'Convert between units or rates in a real-life example.']
    },
    'Physical Sciences': {
      notes: ['Focus on formulas, units, graphs, and scientific reasoning.', 'Revise definitions for motion, forces, and energy.', 'Use worked examples to strengthen problem-solving.'],
      papers: ['Mechanics, electricity, and chemical reactions.', 'Rate-of-reaction and balancing equations questions.', 'Practical lab and graph interpretation tasks.'],
      quizzes: ['Calculate force using mass and acceleration.', 'Balance a simple chemistry equation.', 'Identify independent and dependent variables in an experiment.']
    },
    'Life Sciences': {
      notes: ['Revise cell structure, genetics, and biological systems.', 'Use labelled diagrams and definitions in answers.', 'Connect theory with everyday examples from life.'],
      papers: ['Genetics, inheritance, and reproduction questions.', 'Human systems and ecosystems tasks.', 'Diagram labelling and process-explanation papers.'],
      quizzes: ['Name the stages of mitosis.', 'Match organ systems to their functions.', 'Identify the correct sequence in photosynthesis.']
    },
    Accounting: {
      notes: ['Practise accounting equation, journals, and ledgers.', 'Know the difference between cash and accrual concepts.', 'Revise financial statements and adjustments.'],
      papers: ['Journal entries and ledger trial balance tasks.', 'Cash flow and financial statement preparation.', 'Year-end adjustments and balance sheet practice.'],
      quizzes: ['Identify debit and credit entries.', 'Classify expenses and assets correctly.', 'Prepare a simple profit and loss calculation.']
    },
    'Business Studies': {
      notes: ['Review business functions, management, and marketing.', 'Use case studies to connect theory to real organisations.', 'Study entrepreneurship and economic factors.'],
      papers: ['Business environments and stakeholder questions.', 'Marketing, management, and operations tasks.', 'Case-study essays about a business challenge.'],
      quizzes: ['Match management functions to examples.', 'Identify the correct marketing mix element.', 'Choose the best form of ownership for a business scenario.']
    },
    Economics: {
      notes: ['Understand scarcity, demand, supply, inflation, and unemployment.', 'Practise explaining graphs and economic terms clearly.', 'Learn how government policies affect households and firms.'],
      papers: ['Microeconomics and macroeconomics questions.', 'Inflation, graphs, and market behaviour tasks.', 'Policy and trade topic revision.'],
      quizzes: ['Identify the effect of a price increase on demand.', 'Match inflation causes to their consequences.', 'Interpret a supply-and-demand graph.']
    },
    Geography: {
      notes: ['Revise map skills, climate, population, and environmental management.', 'Use case studies and examples to support answers.', 'Learn how landforms and human activity shape regions.'],
      papers: ['Map reading and interpretation tasks.', 'Weather, climate, and settlement questions.', 'Population and environmental management practice.'],
      quizzes: ['Identify features on a map.', 'Choose the best climate description for a region.', 'Match environmental issues to their causes.']
    },
    History: {
      notes: ['Build a clear timeline and note causes and consequences.', 'Practise source-based answers and essay structure.', 'Compare events across different historical periods.'],
      papers: ['Source-based interpretation questions.', 'Cause-and-effect essay tasks.', 'Timeline and significance revision sets.'],
      quizzes: ['Match a historical event to its cause.', 'Choose the strongest evidence in a source response.', 'Identify the significance of a date or movement.']
    },
    'Computer Applications Technology': {
      notes: ['Revise spreadsheets, internet safety, and file management.', 'Practice word processing, formatting, and formulas.', 'Understand database and system concepts.'],
      papers: ['Spreadsheet formula and formatting tasks.', 'Database queries and practical application tasks.', 'System software and internet safety questions.'],
      quizzes: ['Identify the correct spreadsheet formula.', 'Choose the best way to format a document.', 'Select the appropriate internet safety practice.']
    },
    'Information Technology': {
      notes: ['Revise programming logic, data types, and algorithms.', 'Break large problems into smaller steps.', 'Practise pseudocode and digital systems concepts.'],
      papers: ['Programming logic and algorithm questions.', 'Hardware, software, and networking tasks.', 'Data representation and problem-solving exercises.'],
      quizzes: ['Predict the output of a short algorithm.', 'Select the correct data type for a value.', 'Identify the correct logic gate or control structure.']
    },
    'Engineering Graphics & Design': {
      notes: ['Practise line types, dimensioning, and orthographic projections.', 'Study scale and layout conventions carefully.', 'Use past drawings to improve accuracy and presentation.'],
      papers: ['Orthographic drawing tasks.', 'Dimensioning and line-work questions.', 'Design communication and CAD-style exercises.'],
      quizzes: ['Identify the correct line type for a hidden edge.', 'Choose the correct scale for a drawing.', 'Match a view to an object description.']
    },
    'Life Orientation': {
      notes: ['Focus on career planning, health, and personal development.', 'Revise values, communication, and social responsibility.', 'Reflect on study skills and goal setting.'],
      papers: ['Career and personal development responses.', 'Health and life skills scenarios.', 'Reflective and citizenship-oriented questions.'],
      quizzes: ['Select the best career decision for a scenario.', 'Identify healthy communication habits.', 'Match a life skill to a real-world challenge.']
    },
    'Visual Arts': {
      notes: ['Study colour theory, composition, and visual analysis.', 'Build confidence describing artworks and design choices.', 'Keep sketching and critique practice consistent.'],
      papers: ['Art criticism and theory tasks.', 'Practical design and mixed-media planning.', 'Analysis of style, movement, and meaning.'],
      quizzes: ['Identify the mood created by a colour palette.', 'Match an art movement to a style description.', 'Name the design principle used in a composition.']
    },
    Music: {
      notes: ['Revise notation, rhythm, and listening skills.', 'Practise intervals, scales, and musical vocabulary.', 'Connect theory to performance and composition.'],
      papers: ['Music theory and notation tasks.', 'Listening analysis and rhythm practice.', 'Performance and composition question sets.'],
      quizzes: ['Identify the time signature in a rhythm.', 'Match a note to its value.', 'Choose the correct musical term for a sound pattern.']
    },
    Tourism: {
      notes: ['Study tourism sectors, customer service, and destinations.', 'Understand responsible travel and local/global trends.', 'Revise challenges and opportunities in hospitality.'],
      papers: ['Tourism service and customer experience questions.', 'Destination and travel planning tasks.', 'Tourism trends and sustainability scenarios.'],
      quizzes: ['Choose the best customer-service response.', 'Match a tourism sector to a service example.', 'Identify a sustainable tourism practice.']
    },
    'Consumer Studies': {
      notes: ['Revise food, textiles, budgeting, and consumer rights.', 'Understand labels, nutrition, and household management.', 'Use examples to explain responsible consumer choices.'],
      papers: ['Budgeting, nutrition, and household planning tasks.', 'Textiles and consumer rights scenarios.', 'Food preparation and consumer decision questions.'],
      quizzes: ['Identify the healthiest food choice for a case study.', 'Choose the correct consumer-rights principle.', 'Match a household task to the correct management skill.']
    },
    'Agricultural Sciences': {
      notes: ['Revise soil science, plant growth, and animal systems.', 'Use diagrams and examples to explain processes.', 'Focus on sustainable agriculture and farm management.'],
      papers: ['Plant and animal systems practice questions.', 'Soil and agricultural productivity tasks.', 'Sustainable farming and management scenarios.'],
      quizzes: ['Identify the role of soil nutrients.', 'Match a crop need to the correct farming practice.', 'Choose the best method for sustainable production.']
    },
    Drama: {
      notes: ['Practise performance, characterisation, and dramatic conventions.', 'Learn how theme and tension shape a play.', 'Use evidence from texts to support analysis.'],
      papers: ['Performance and character analysis tasks.', 'Stage conventions and dramatic technique questions.', 'Text interpretation and scene analysis assignments.'],
      quizzes: ['Identify a dramatic convention in a scene.', 'Match a character trait to a performance choice.', 'Choose the strongest evidence for a dramatic interpretation.']
    }
  };

  const defaultPattern = {
    notes: [
      `${title} revision should focus on the most important concepts, terminology, and application points.`,
      `${examFocus} is a good starting point for your revision schedule.`,
      'Practise a mix of short-answer, paragraph, and application questions to improve confidence.'
    ],
    papers: ['Past-question style application exercises.', 'Short revision tests based on the main topic sections.', 'Timed practice tasks to improve exam pacing.'],
    quizzes: ['Match key terms to definitions.', 'Choose the correct method or answer from a scenario.', 'Test recall from your topic summary notes.']
  };

  return topicPatterns[title] || defaultPattern;
};

const renderSubjectResources = () => {
  const list = document.getElementById('subjectResourceList');
  if (!list) return;

  const makeSlug = (title) => String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const buttonsHTML = SUBJECT_RESOURCES.map((subject) => {
    const slug = makeSlug(subject.title);
    return `<button type="button" class="subject-button" data-target="#${slug}" aria-label="Open ${subject.title}">${subject.title}</button>`;
  }).join('');

  const cardsHTML = SUBJECT_RESOURCES.map((subject) => {
    const slug = makeSlug(subject.title);
    return `
      <article class="subject-card">
        <a class="subject-card-link" href="#${slug}" aria-label="Open study support for ${subject.title}">
          <div class="subject-topline">Study topic</div>
          <h3>${subject.title}</h3>
          <p>${subject.summary}</p>
          <div class="subject-meta">
            <strong>Exam focus:</strong>
            <span>${subject.examFocus}</span>
          </div>
          <ul>
            ${subject.studyTips.map((tip) => `<li>${tip}</li>`).join('')}
          </ul>
          <span class="subject-card-link-label">Open study materials →</span>
        </a>
      </article>
    `;
  }).join('');

  const detailsHTML = SUBJECT_RESOURCES.map((subject) => {
    const slug = makeSlug(subject.title);
    const materials = getSubjectMaterials(subject);

    return `
      <section id="${slug}" class="subject-detail-panel" aria-label="Study materials for ${subject.title}">
        <div class="subject-topline">Study materials</div>
        <h3>${subject.title}</h3>
        <p>${subject.summary}</p>
        <div class="subject-meta">
          <strong>Exam focus:</strong>
          <span>${subject.examFocus}</span>
        </div>
        <div class="subject-material-grid">
          <div class="material-column">
            <h4>Study notes</h4>
            <ul>
              ${materials.notes.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <div class="material-column">
            <h4>Question papers</h4>
            <ul>
              ${materials.papers.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <div class="material-column">
            <h4>Quizzes</h4>
            <ul>
              ${materials.quizzes.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      </section>
    `;
  }).join('');

  list.innerHTML = `
    <div class="subject-button-list">${buttonsHTML}</div>
    <div class="resource-grid">${cardsHTML}</div>
    <div class="subject-detail-list">${detailsHTML}</div>
  `;

  list.querySelectorAll('.subject-button').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.querySelector(button.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};

const renderTutCourses = () => {
  const list = document.getElementById('tutCourseList');
  if (!list) return;

  list.innerHTML = `
    <article class="tut-course-card">
      <span class="tut-course-tag">Verified data required</span>
      <h3>Programme requirements unavailable</h3>
      <p>Official TUT prospectus requirements for the selected intake year are not included in this site's verified dataset.</p>
      <p>Use the official TUT prospectus or admissions office to confirm each programme's APS, subject, language, and additional requirements.</p>
    </article>
  `;
};

const renderJobListings = () => {
  const list = document.getElementById('jobListings');
  const select = document.getElementById('jobDistanceFilter');
  if (!list) return;

  const maxDistance = Number(select?.value || 100);
  const filteredJobs = JOB_PORTALS.filter((job) => job.radiusKm <= maxDistance || maxDistance >= 150);

  list.innerHTML = filteredJobs.map((job) => `
    <article class="job-card">
      <div class="job-top">
        <div>
          <span class="job-type">${job.type}</span>
          <h3>${job.name}</h3>
        </div>
        <span class="job-distance">Up to ${job.radiusKm} km</span>
      </div>
      <p>${job.requirements}</p>
      <a href="${job.url}" target="_blank" rel="noopener">Open verified listing</a>
    </article>
  `).join('');
};

const showToast = (message) => {
  let toast = document.getElementById('openfutureToast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'openfutureToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
};

const addAssistantMessage = (text, type = 'bot') => {
  const assistantMessages = document.getElementById('assistantMessages');
  if (!assistantMessages) return;

  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  assistantMessages.appendChild(message);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
};

const getAssistantReply = (question) => {
  const q = question.toLowerCase();

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) return 'Hi there! I’m here to help with Open Future+ and your next step. What would you like to know?';
  if (q.includes('aps')) return 'Your APS is the total of your subject achievement levels. It is a quick way to estimate how your marks may match different study options. You can also use the APS calculator on this website.';
  if (q.includes('tut')) return 'The TUT checker helps compare your marks and profile with example TUT programme requirements, so you can see what might be a good fit.';
  if (q.includes('funding') || q.includes('nsfas')) return 'Funding can feel stressful, but you are not alone. Open Future+ can guide you in the right direction, and you should always confirm the final details with the official funding provider.';
  if (q.includes('help')) return 'Absolutely. You can ask me for guidance, use the Get Help form, or reach out through WhatsApp. I can point you in the right direction.';
  if (q.includes('whatsapp')) return 'You can contact Open Future+ on WhatsApp using the public contact link on the site, or start a message with the example number +27 71 234 5678 for demo guidance.';
  if (q.includes('instagram')) return 'You can find Open Future+ on Instagram at @openfutureplus.';
  if (q.includes('facebook')) return 'Open Future+ is also on Facebook, and you can find the link in the social section of the site.';
  if (q.includes('tiktok') || q.includes('tik tok')) return 'Open Future+ is on TikTok too — look for openFuturePlus.';
  if (q.includes('venda') || q.includes('venda')) return 'I am proud to support Open Future+ and help young people connect with culture, identity, and opportunity.';
  if (q.includes('founder') || q.includes('vuledzani') || q.includes('mutavhatsindi')) return 'Vuledzani Mbangambanga Mutavhatsindi is the founder of Open Future+, and the mission is to help young people grow, learn, and move forward with confidence.';
  if (q.includes('future')) return 'Open Future+ is built to support students and young people with study guidance, funding help, opportunities, and next-step planning.';
  if (q.includes('login') || q.includes('sign up') || q.includes('register')) return 'You can create an account with your email, phone number, and password. For admin access, use the admin credentials provided on the site.';
  if (q.includes('password')) return 'A strong password should include a capital letter, a small letter, a number, and a special character so it is safer.';
  if (q.includes('thank you') || q.includes('thanks')) return 'You are welcome. I am happy to help anytime.';
  if (q.includes('who are you') || q.includes('what are you')) return 'I am your Open Future+ assistant, here to guide you, answer questions, and help you navigate the site more easily.';

  return 'I understand what you are asking, and I can help with Open Future+, APS, TUT, funding, opportunities, and your next steps. Tell me a bit more and I will guide you clearly.';
};

const ensureLoginButton = () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  if (readSessionUser()) {
    const existingButtons = nav.querySelector('.auth-button-group');
    if (existingButtons) existingButtons.remove();
    return;
  }

  const existingButtons = nav.querySelector('.auth-button-group');
  if (existingButtons) return;

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'auth-button-group';

  const loginButton = document.createElement('button');
  loginButton.type = 'button';
  loginButton.id = 'openAuthButton';
  loginButton.className = 'account-button';
  loginButton.textContent = 'Login';
  loginButton.addEventListener('click', () => openAuthModal());

  const signupButton = document.createElement('button');
  signupButton.type = 'button';
  signupButton.id = 'openSignupButton';
  signupButton.className = 'account-button account-button-secondary';
  signupButton.textContent = 'Create new';
  signupButton.addEventListener('click', () => {
    openAuthModal();
    setAuthTab('signup');
  });

  buttonGroup.appendChild(loginButton);
  buttonGroup.appendChild(signupButton);
  nav.appendChild(buttonGroup);
};

const openAuthModal = () => {
  const modal = document.getElementById('authModal');
  if (!modal) return;

  modal.classList.add('show');
  const loginTab = document.getElementById('authLoginTab');
  if (loginTab) loginTab.click();
};

const closeAuthModal = () => {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('show');
};

const setAuthTab = (tabName) => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const forgotPanel = document.getElementById('forgotPasswordPanel');
  const loginTab = document.getElementById('authLoginTab');
  const signupTab = document.getElementById('authSignupTab');

  if (!loginForm || !signupForm || !loginTab || !signupTab) return;

  const isLogin = tabName === 'login';
  loginForm.classList.toggle('hidden', !isLogin);
  signupForm.classList.toggle('hidden', isLogin);
  forgotPanel.classList.add('hidden');
  loginTab.classList.toggle('active', isLogin);
  signupTab.classList.toggle('active', !isLogin);
};

const renderAdminUsers = () => {
  const users = readUsers();
  const list = document.getElementById('adminUsersList');
  if (!list) return;

  list.innerHTML = users.map((user) => `
    <li>
      <div>
        <strong>${sanitizeText(user.name)}</strong>
        <span>${sanitizeText(user.email)}</span>
      </div>
      <div>
        <span>${sanitizeText(formatPhoneForDisplay(user.phone))}</span>
        <small>${sanitizeText(user.role)}</small>
      </div>
      <div class="mask-password">${user.password ? '••••••••' : 'Not set'}</div>
    </li>
  `).join('');
};

const getPasswordRequirementsMessage = () => 'Password must include at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.';

const renderDashboard = () => {
  const currentUser = readSessionUser();
  const dashboard = document.getElementById('accountDashboard');
  if (!dashboard) return;

  if (!currentUser) {
    dashboard.classList.add('hidden');
    return;
  }

  dashboard.classList.remove('hidden');

  const body = document.getElementById('dashboardBody');
  if (!body) return;

  if (currentUser.role === 'admin') {
    body.innerHTML = `
      <div class="dashboard-header">
        <div>
          <p class="small-heading">ADMIN DASHBOARD</p>
          <h3>Welcome back, ${sanitizeText(currentUser.name)}</h3>
        </div>
        <button type="button" class="button secondary" id="logoutButton">Logout</button>
      </div>
      <div class="users-panel">
        <ul id="adminUsersList" class="admin-user-list"></ul>
      </div>
    `;
    renderAdminUsers();
  } else {
    const userPoints = Number(currentUser.points || 0);
    const unlockReady = userPoints >= 50;

    body.innerHTML = `
      <div class="dashboard-header">
        <div>
          <p class="small-heading">MY ACCOUNT</p>
          <h3>Welcome, ${sanitizeText(currentUser.name)}</h3>
        </div>
        <button type="button" class="button secondary" id="logoutButton">Logout</button>
      </div>
      <div class="user-card-grid">
        <div class="user-card">
          <span>Email</span>
          <strong>${sanitizeText(currentUser.email)}</strong>
        </div>
        <div class="user-card">
          <span>Phone</span>
          <strong>${sanitizeText(formatPhoneForDisplay(currentUser.phone))}</strong>
        </div>
        <div class="user-card">
          <span>District</span>
          <strong>${sanitizeText(currentUser.district || 'Not added')}</strong>
        </div>
        <div class="user-card">
          <span>School</span>
          <strong>${sanitizeText(currentUser.school || 'Not added')}</strong>
        </div>
        <div class="user-card">
          <span>Credits</span>
          <strong>${userPoints}/50</strong>
        </div>
        <div class="user-card">
          <span>Access</span>
          <strong>${unlockReady ? 'Direct chat unlocked' : 'Free page access'}</strong>
        </div>
      </div>
      ${unlockReady ? `
        <div class="unlock-box">
          <p>You have reached 50 points and can talk directly with the founder.</p>
          <a class="button primary" href="https://wa.me/27712345678?text=Hi%20Open%20Future%2B%2C%20I%20have%20reached%2050%20points%20and%20want%20to%20talk%20directly." target="_blank" rel="noopener">Talk to me directly</a>
        </div>
      ` : `
        <div class="unlock-box muted">
          <p>Check the site buttons and actions to earn +1 credit each time. You need 50 points to unlock direct chat access.</p>
        </div>
      `}
      <section class="dashboard-tools" aria-labelledby="dashboardToolsHeading">
        <div class="dashboard-tools-heading">
          <p class="small-heading">STUDENT TOOLS</p>
          <h4 id="dashboardToolsHeading">Keep moving forward</h4>
        </div>
        <div class="dashboard-tool-grid">
          <a class="dashboard-tool" href="aps-calculator.html"><strong>APS Calculator</strong><span>Calculate points from your subject marks.</span></a>
          <a class="dashboard-tool" href="tut-checker.html"><strong>TUT Course Checker</strong><span>Review your subjects and verified-data status.</span></a>
          <a class="dashboard-tool" href="opportunities.html"><strong>Opportunities &amp; Jobs</strong><span>Find funding, jobs, and career options.</span></a>
          <a class="dashboard-tool" href="resources.html"><strong>Study Resources</strong><span>Browse subject notes and revision material.</span></a>
          <a class="dashboard-tool" href="resources.html#question-papers"><strong>Question Papers</strong><span>Use practice papers to prepare.</span></a>
          <a class="dashboard-tool" href="quiz.html"><strong>Quizzes</strong><span>Test your knowledge and build confidence.</span></a>
          <a class="dashboard-tool" href="contact.html"><strong>CV Builder</strong><span>Get support preparing your CV.</span></a>
          <a class="dashboard-tool" href="contact.html"><strong>Student Support</strong><span>Ask for help with your next step.</span></a>
          <button class="dashboard-tool dashboard-tool-button" type="button" data-open-assistant><strong>AI Assistant</strong><span>Ask about study, APS, TUT, or opportunities.</span></button>
        </div>
      </section>
    `;
  }

  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      clearSessionUser();
      ensureLoginButton();
      renderDashboard();
      showToast('You have been logged out.');
    });
  }

  body.querySelectorAll('[data-open-assistant]').forEach((button) => {
    button.addEventListener('click', () => {
      const assistantToggle = document.getElementById('assistantToggle');
      if (assistantToggle) assistantToggle.click();
    });
  });
};

const submitLogin = (event) => {
  event.preventDefault();

  const primaryContact = parseLoginContact(document.getElementById('loginEmail').value, document.getElementById('loginCountry')?.value || 'ZA');
  const countryCode = document.getElementById('loginCountry')?.value || 'ZA';
  const rawPhone = document.getElementById('loginPhone').value.trim();
  const secondaryContact = parseLoginContact(rawPhone, countryCode);
  const email = primaryContact.email || secondaryContact.email;
  const normalizedPhone = primaryContact.phone || secondaryContact.phone;
  const password = document.getElementById('loginPassword').value.trim();

  if ((!email && !normalizedPhone) || !password) {
    showToast('Please enter your email or phone number and password.');
    return;
  }

  const users = readUsers();
  const foundUser = users.find((user) => {
    const emailMatches = !!email && user.email.toLowerCase() === email;
    const storedPhone = normalizePhoneForComparison(user.phone, 'ZA');
    const phoneMatches = !!normalizedPhone && !!storedPhone && storedPhone === normalizedPhone;
    const passwordMatches = user.password === password;
    return passwordMatches && (emailMatches || phoneMatches);
  });

  if (!foundUser) {
    showToast('Login failed. Please check your email, phone number and password.');
    return;
  }

  saveSessionUser(foundUser);
  refreshSessionActivity();
  const authButtonGroup = document.querySelector('.auth-button-group');
  if (authButtonGroup) authButtonGroup.remove();
  closeAuthModal();

  if (foundUser.role === 'admin') {
    window.location.href = 'admin.html';
    return;
  }

  window.location.href = 'index.html#accountDashboard';
  renderDashboard();
  showToast(`Welcome back, ${foundUser.name}.`);
};

const submitSignup = (event) => {
  event.preventDefault();

  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim().toLowerCase();
  const countryCode = document.getElementById('signupCountry')?.value || 'ZA';
  const rawPhone = document.getElementById('signupPhone').value.trim();
  const district = document.getElementById('signupDistrict').value.trim();
  const school = document.getElementById('signupSchool').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  if (!name || !email || !rawPhone || !district || !school || !password) {
    showToast('Please complete all fields to create your account.');
    return;
  }

  const normalizedPhone = normalizePhoneNumber(rawPhone, countryCode);

  if (!normalizedPhone) {
    showToast('Phone number must be valid for the selected country code.');
    return;
  }

  const phone = normalizedPhone;

  if (!isStrongPassword(password)) {
    showToast(getPasswordRequirementsMessage());
    return;
  }

  const users = readUsers();
  const duplicate = users.some((user) => user.email.toLowerCase() === email || normalizePhoneForComparison(user.phone, countryCode) === phone);

  if (duplicate) {
    showToast('That email or phone number is already registered.');
    return;
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    phone,
    password,
    role: 'user',
    points: 0,
    district,
    school,
    unlockChat: false,
  };

  users.push(newUser);
  saveUsers(users);
  saveSessionUser(newUser);
  const authButtonGroup = document.querySelector('.auth-button-group');
  if (authButtonGroup) authButtonGroup.remove();
  closeAuthModal();
  window.location.href = 'index.html#accountDashboard';
  renderDashboard();
  showToast('Account created successfully.');
};

const handleForgotPassword = (event) => {
  event.preventDefault();

  const contact = document.getElementById('resetContact').value.trim();
  const normalizedContact = contact.includes('@') ? contact.toLowerCase() : normalizePhoneForComparison(contact, 'ZA');
  const users = readUsers();
  const user = users.find((entry) => {
    const emailMatches = entry.email.toLowerCase() === normalizedContact.toLowerCase();
    const phoneMatches = !!normalizedContact && normalizePhoneForComparison(entry.phone, 'ZA') === normalizedContact;
    return emailMatches || phoneMatches;
  });

  if (!user) {
    showToast('No account was found with that email or phone number. If you forgot your email, use the phone number linked to your account and we will help you recover it.');
    return;
  }

  const message = contact.includes('@')
    ? `Password reset request received for ${user.email}. Demo reset instructions have been sent.`
    : `Your email is ${user.email}. Demo reset instructions were sent to your phone ${formatPhoneForDisplay(user.phone)}.`;

  showToast(message);
  document.getElementById('forgotPasswordPanel').classList.add('hidden');
};

const setupAuthModal = () => {
  const modal = document.createElement('div');
  modal.id = 'authModal';
  modal.className = 'auth-modal';
  modal.innerHTML = `
    <div class="auth-card">
      <div class="auth-header">
        <div>
          <p class="small-heading">ACCOUNT</p>
          <h3>Open Future+</h3>
        </div>
        <button type="button" class="auth-close" id="closeAuthModal">×</button>
      </div>

      <div class="auth-tabs">
        <button type="button" class="auth-tab active" id="authLoginTab">Login</button>
        <button type="button" class="auth-tab" id="authSignupTab">Create account</button>
      </div>

      <div id="authMessage" class="auth-message"></div>

      <form id="loginForm" class="auth-form">
        <label>
          Email or phone number
          <input id="loginEmail" type="text" placeholder="you@example.com or 071 234 5678" />
        </label>
        <label>
          Country code (for phone login)
          <select id="loginCountry">
            ${PHONE_COUNTRY_OPTIONS.map((option) => `<option value="${option.value}">${option.label}</option>`).join('')}
          </select>
        </label>
        <label>
          Phone number (optional if using email)
          <input id="loginPhone" type="tel" inputmode="tel" maxlength="15" placeholder="71 234 5678" />
        </label>
        <label>
          Password
          <div class="password-input-wrap">
            <input id="loginPassword" type="password" placeholder="Your password" required />
            <button type="button" class="password-toggle" data-target="loginPassword">Show</button>
          </div>
        </label>
        <button type="submit" class="button primary">Login</button>
        <button type="button" class="text-button" id="showResetPanel">Forgot password or email?</button>
      </form>

      <form id="signupForm" class="auth-form hidden">
        <label>
          Full name
          <input id="signupName" type="text" placeholder="Your full name" required />
        </label>
        <label>
          Email address
          <input id="signupEmail" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          Country code
          <select id="signupCountry">
            ${PHONE_COUNTRY_OPTIONS.map((option) => `<option value="${option.value}">${option.label}</option>`).join('')}
          </select>
        </label>
        <label>
          Phone number
          <input id="signupPhone" type="tel" inputmode="tel" maxlength="15" placeholder="71 234 5678" required />
        </label>
        <label>
          District
          <input id="signupDistrict" type="text" placeholder="Your district" required />
        </label>
        <label>
          School or institution
          <input id="signupSchool" type="text" placeholder="School or institution" required />
        </label>
        <label>
          Password
          <div class="password-input-wrap">
            <input id="signupPassword" type="password" placeholder="Create a password" required />
            <button type="button" class="password-toggle" data-target="signupPassword">Show</button>
          </div>
          <small class="password-hint">${getPasswordRequirementsMessage()}</small>
        </label>
        <button type="submit" class="button primary">Create account</button>
      </form>

      <form id="forgotPasswordPanel" class="auth-form hidden">
        <label>
          Email or phone number
          <input id="resetContact" type="text" placeholder="Enter your email or phone" required />
        </label>
        <button type="submit" class="button secondary">Send SMS reset</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
  document.getElementById('closeAuthModal').addEventListener('click', closeAuthModal);
  document.getElementById('authLoginTab').addEventListener('click', () => setAuthTab('login'));
  document.getElementById('authSignupTab').addEventListener('click', () => setAuthTab('signup'));
  document.getElementById('showResetPanel').addEventListener('click', () => {
    document.getElementById('forgotPasswordPanel').classList.remove('hidden');
  });
  document.getElementById('loginForm').addEventListener('submit', submitLogin);
  document.getElementById('signupForm').addEventListener('submit', submitSignup);
  document.getElementById('forgotPasswordPanel').addEventListener('submit', handleForgotPassword);

  document.querySelectorAll('.password-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const target = document.getElementById(toggle.dataset.target);
      if (!target) return;
      const isPassword = target.type === 'password';
      target.type = isPassword ? 'text' : 'password';
      toggle.textContent = isPassword ? 'Hide' : 'Show';
    });
  });

  ['loginPhone', 'signupPhone'].forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const countryFieldId = fieldId === 'loginPhone' ? 'loginCountry' : 'signupCountry';
    const updatePhoneField = () => {
      const countryCode = document.getElementById(countryFieldId)?.value || 'ZA';
      const digits = field.value.replace(/\D/g, '');
      field.value = digits.slice(0, getAllowedPhoneDigits(countryCode));
    };

    field.addEventListener('input', updatePhoneField);
    const countryField = document.getElementById(countryFieldId);
    if (countryField) {
      countryField.addEventListener('change', updatePhoneField);
    }
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeAuthModal();
  });
};

const renderAdminPage = () => {
  const currentUser = readSessionUser();
  const root = document.getElementById('adminPageRoot');

  if (!root) return;

  if (!currentUser || currentUser.role !== 'admin') {
    window.location.replace('index.html');
    return;
  }

  const users = readUsers();
  root.innerHTML = `
    <header class="site-header">
      <nav class="nav container" aria-label="Admin navigation">
        <a href="index.html" class="logo">Open Future<span>+</span></a>
        <div class="admin-actions">
          <button type="button" class="button secondary" id="adminLogoutButton">Logout</button>
        </div>
      </nav>
    </header>

    <main class="section">
      <div class="container">
        <div class="dashboard-card">
          <div class="dashboard-header">
            <div>
              <p class="small-heading">ADMIN CONTROL</p>
              <h2>Welcome back, ${ADMIN_NAME}</h2>
            </div>
          </div>

          <div class="user-card-grid">
            <div class="user-card">
              <span>Total users</span>
              <strong>${users.length}</strong>
            </div>
            <div class="user-card">
              <span>Admin account</span>
              <strong>${ADMIN_EMAIL}</strong>
            </div>
          </div>

          <div class="admin-list-wrap">
            <ul class="admin-user-list">
              ${users.map((user) => `
                <li>
                  <div>
                    <strong>${user.name}</strong>
                    <span>${user.email}</span>
                  </div>
                  <div>
                    <span>${user.phone}</span>
                    <small>${user.role}</small>
                  </div>
                  <div class="mask-password">${user.password ? '••••••••' : 'Not set'}</div>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    </main>
  `;

  const adminLogoutButton = document.getElementById('adminLogoutButton');
  if (adminLogoutButton) {
    adminLogoutButton.addEventListener('click', () => {
      clearSessionUser();
      ensureLoginButton();
      window.location.href = 'index.html';
    });
  }
};

const setupDashboard = () => {
  if (document.getElementById('accountDashboard')) return;

  const dashboard = document.createElement('section');
  dashboard.id = 'accountDashboard';
  dashboard.className = 'section hidden';
  dashboard.innerHTML = `
    <div class="container">
      <div class="dashboard-card" id="dashboardBody"></div>
    </div>
  `;
  document.body.appendChild(dashboard);
};

const ensureAssistantWidget = () => {
  if (document.getElementById('assistantWidget')) return;

  const widget = document.createElement('div');
  widget.className = 'assistant-widget';
  widget.id = 'assistantWidget';
  widget.innerHTML = `
    <div class="assistant-panel" id="assistantPanel">
      <div class="assistant-header">
        <span>Open Future+ Assistant</span>
        <button type="button" class="assistant-close" id="assistantClose" aria-label="Close assistant">×</button>
      </div>
      <div class="assistant-messages" id="assistantMessages">
        <div class="message bot">Hi! I’m here to help with Open Future+, APS, TUT, funding, and opportunities.</div>
      </div>
      <form id="assistantForm" class="assistant-form">
        <input type="text" placeholder="Ask a question..." aria-label="Ask the assistant a question" />
        <button type="submit">Send</button>
      </form>
    </div>
    <button type="button" class="assistant-toggle" id="assistantToggle" aria-label="Open assistant chat">🤖</button>
  `;

  document.body.appendChild(widget);
};

const setupDraggableAssistant = () => {
  ensureAssistantWidget();

  const assistantWidget = document.getElementById('assistantWidget');
  const assistantPanel = document.getElementById('assistantPanel');
  const assistantToggle = document.getElementById('assistantToggle');
  const assistantClose = document.getElementById('assistantClose');
  const assistantHeader = document.querySelector('.assistant-header');
  const assistantForm = document.getElementById('assistantForm');
  if (!assistantWidget || !assistantPanel || !assistantToggle || !assistantClose || !assistantHeader || !assistantForm) return;

  assistantWidget.style.left = '1.2rem';
  assistantWidget.style.right = 'auto';
  assistantWidget.style.bottom = '1.2rem';
  assistantWidget.style.top = 'auto';

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let dragStartX = 0;
  let dragStartY = 0;
  let hasMoved = false;
  let suppressClick = false;
  let activePointerId = null;

  const clampPosition = (value, min, max) => Math.min(Math.max(value, min), max);

  const startDragging = (event) => {
    if (event.button !== 0) return;
    isDragging = true;
    hasMoved = false;
    activePointerId = event.pointerId;
    const rect = assistantWidget.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    event.currentTarget?.setPointerCapture?.(event.pointerId);
    assistantHeader.style.cursor = 'grabbing';
  };

  const stopDragging = () => {
    isDragging = false;
    activePointerId = null;
    assistantHeader.style.cursor = 'grab';
  };

  const updateWidgetPosition = (x, y) => {
    const maxLeft = Math.max(12, window.innerWidth - assistantWidget.offsetWidth - 12);
    const maxTop = Math.max(12, window.innerHeight - assistantWidget.offsetHeight - 12);

    assistantWidget.style.left = `${clampPosition(x, 12, maxLeft)}px`;
    assistantWidget.style.top = `${clampPosition(y, 12, maxTop)}px`;
    assistantWidget.style.right = 'auto';
    assistantWidget.style.bottom = 'auto';
  };

  assistantToggle.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    startDragging(event);
  });

  assistantToggle.addEventListener('pointermove', (event) => {
    if (!isDragging || event.pointerId !== activePointerId) return;

    const dx = Math.abs(event.clientX - dragStartX);
    const dy = Math.abs(event.clientY - dragStartY);
    if (dx > 6 || dy > 6) hasMoved = true;

    const nextLeft = event.clientX - offsetX;
    const nextTop = event.clientY - offsetY;
    updateWidgetPosition(nextLeft, nextTop);
  });

  assistantToggle.addEventListener('pointerup', (event) => {
    if (!isDragging || event.pointerId !== activePointerId) return;

    const moved = hasMoved;
    stopDragging();

    if (moved) {
      suppressClick = true;
    }
  });

  assistantToggle.addEventListener('pointercancel', () => {
    stopDragging();
  });

  assistantToggle.addEventListener('click', (event) => {
    if (suppressClick) {
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    assistantPanel.classList.toggle('open');
  });

  assistantClose.addEventListener('click', () => {
    assistantPanel.classList.remove('open');
  });

  assistantHeader.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.assistant-close')) return;
    startDragging(event);
  });

  assistantHeader.addEventListener('pointermove', (event) => {
    if (!isDragging || event.pointerId !== activePointerId) return;

    const dx = Math.abs(event.clientX - dragStartX);
    const dy = Math.abs(event.clientY - dragStartY);
    if (dx > 6 || dy > 6) hasMoved = true;

    const nextLeft = event.clientX - offsetX;
    const nextTop = event.clientY - offsetY;
    updateWidgetPosition(nextLeft, nextTop);
  });

  assistantHeader.addEventListener('pointerup', (event) => {
    if (!isDragging || event.pointerId !== activePointerId) return;
    const moved = hasMoved;
    stopDragging();
    if (moved) {
      suppressClick = true;
    }
  });

  assistantHeader.addEventListener('pointerleave', () => {
    if (!isDragging) return;
    stopDragging();
  });

  assistantForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = assistantForm.querySelector('input');
    const question = input.value.trim();

    if (!question) return;

    addAssistantMessage(question, 'user');
    input.value = '';

    setTimeout(() => {
      addAssistantMessage(getAssistantReply(question), 'bot');
    }, 350);
  });
};

if (year) {
  year.textContent = new Date().getFullYear();
}

setInterval(() => {
  const sessionUser = readSessionUser();
  if (!sessionUser) return;

  try {
    const tokenBody = sessionUser.token.split('.')[0];
    const payload = JSON.parse(decodeURIComponent(atob(tokenBody)));
    if (Date.now() >= payload.exp) {
      clearSessionUser();
      if (window.location.pathname.toLowerCase().endsWith('/admin.html')) {
        window.location.replace('index.html');
      }
      showToast('Your session expired after 20 minutes of inactivity. Please log in again.');
    }
  } catch {
    clearSessionUser();
  }
}, 15000);

['pointerdown', 'keydown', 'click', 'mousemove'].forEach((eventName) => {
  document.addEventListener(eventName, () => {
    refreshSessionActivity();
  }, { passive: true });
});

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    });
  });
}

document.querySelectorAll('.action-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = link.getAttribute('data-target');
    if (target) {
      event.preventDefault();
      scrollToTarget(target);
    }
    awardUserPoint();
  });
});

document.addEventListener('click', (event) => {
  const target = event.target.closest('button, a');
  if (!target || target.closest('.password-toggle') || target.closest('.assistant-close') || target.closest('.auth-close')) return;
  if (target.closest('button') || target.closest('a')) {
    awardUserPoint();
  }
});

if (apsForm) {
  ensureApsRows();

  const addSubjectButton = document.getElementById('addApsSubject');
  if (addSubjectButton) {
    addSubjectButton.addEventListener('click', addApsSubjectRow);
  }

  const apsSubjectRows = document.getElementById('apsSubjectRows');
  if (apsSubjectRows) {
    apsSubjectRows.addEventListener('click', (event) => {
      const removeButton = event.target.closest('.remove-aps-subject');
      if (!removeButton) return;

      const row = removeButton.closest('.aps-subject-row');
      if (row) {
        row.remove();
        const remainingRows = apsSubjectRows.querySelectorAll('.aps-subject-row');
        remainingRows.forEach((item, index) => {
          const label = item.querySelector('label');
          if (label) {
            label.textContent = `Subject ${index + 1}`;
          }
        });
      }
    });
  }

  apsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const resultBox = document.getElementById('apsResult');
    const rows = document.querySelectorAll('.aps-subject-row');

    if (!rows.length) {
      showToast('Add at least one subject to calculate your APS.');
      return;
    }

    let total = 0;
    let excludedCount = 0;
    const breakdown = [];

    try {
      rows.forEach((row, index) => {
        const subjectInput = row.querySelector('.aps-subject');
        const markInput = row.querySelector('.aps-mark');
        const levelSelect = row.querySelector('.aps-level');

        if (!subjectInput || !markInput || !levelSelect) return;

        const subjectName = subjectInput.value.trim();
        const rawMark = markInput.value.trim();
        const markValue = rawMark === '' ? 0 : Number(rawMark);

        if (!subjectName) {
          throw new Error(`Please enter a subject name for subject ${index + 1}.`);
        }

        if (rawMark !== '' && (Number.isNaN(markValue) || markValue < 0 || markValue > 100)) {
          throw new Error(`Subject ${index + 1} has an invalid mark. Use a value from 0 to 100.`);
        }

        if (isLifeOrientationSubject(subjectName)) {
          excludedCount += 1;
          breakdown.push({ subjectName, markValue: rawMark || 'Not entered', level: 'Excluded', points: 0 });
          return;
        }

        const points = rawMark === ''
          ? Number(levelSelect.value || 1)
          : percentageToLevel(markValue);
        total += points;
        breakdown.push({ subjectName, markValue: rawMark || 'Not entered', level: levelSelect.value || '0', points });
      });

      const excludeMessage = excludedCount > 0
        ? ' Life Orientation was excluded from this APS total.'
        : '';

      resultBox.innerHTML = `
        <strong>Total APS: ${total}</strong>
        <p>Points use the South African achievement scale: 80-100 = 7, 70-79 = 6, 60-69 = 5, 50-59 = 4, 40-49 = 3, 30-39 = 2, and 0-29 = 1. A selected level is used when no mark is entered.</p>
        <div class="aps-breakdown">${breakdown.map((item) => `
          <div class="aps-breakdown-row">
            <span>${sanitizeText(item.subjectName)}</span>
            <span>Mark: ${sanitizeText(item.markValue)} | Level: ${sanitizeText(item.level)}</span>
            <strong>${item.points} point${item.points === 1 ? '' : 's'}</strong>
          </div>
        `).join('')}</div>
        <p>${excludeMessage} Confirm the final admission calculation with the official TUT prospectus for your programme and intake year.</p>
      `;
    } catch (error) {
      showToast(error.message || 'Please complete the APS form correctly.');
    }
  });
}

if (tutForm) {
  tutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const resultBox = document.getElementById('tutResult');
    const yearValue = document.getElementById('tutYear')?.value || 'selected year';
    const enteredSubjects = [...document.querySelectorAll('.tut-subject')]
      .map((input) => input.value.trim())
      .filter(Boolean);
    const enteredMarks = [...document.querySelectorAll('.tut-mark')]
      .map((input) => input.value.trim())
      .filter(Boolean);

    resultBox.innerHTML = `<strong>Qualification status: Information unavailable</strong><p>No verified TUT prospectus data for ${sanitizeText(yearValue)} is available in this site dataset. The checker cannot safely determine whether any programme is qualified or not qualified.</p><p>Information entered: ${enteredSubjects.length} subject(s), ${enteredMarks.length} mark(s). Check each programme's official TUT prospectus and admissions office for the current subject, APS, and language requirements.</p>`;
  });
}

if (helpForm) {
  helpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const submitButton = helpForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Request Sent';
    submitButton.disabled = true;

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      helpForm.reset();
    }, 2000);
  });
}

if (employerForm) {
  employerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const submitButton = employerForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Submitted';
    submitButton.disabled = true;

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      employerForm.reset();
    }, 2000);
  });
}

window.addEventListener('load', keepPageAtTop);
window.addEventListener('beforeunload', keepPageAtTop);

try {
  if (document.getElementById('subjectResourceList')) {
    renderSubjectResources();
  }

  if (document.getElementById('tutCourseList')) {
    renderTutCourses();
  }

  if (document.getElementById('jobListings')) {
    renderJobListings();
    const jobDistanceFilter = document.getElementById('jobDistanceFilter');
    if (jobDistanceFilter) {
      jobDistanceFilter.addEventListener('change', renderJobListings);
    }
  }

  if (isAdminPage()) {
    protectAdminPage();
    ensureDemoUsers();
    renderAdminPage();
  } else {
    ensureDemoUsers();
    ensureLoginButton();
    setupAuthModal();
    setupDashboard();
    renderDashboard();
    setupDraggableAssistant();
  }
} catch {
  // access denied; stop execution
}
