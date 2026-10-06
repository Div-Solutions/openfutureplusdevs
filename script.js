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
const THEME_STORAGE_KEY = 'openfuture_theme_preference';
const ASSISTANT_FEED_KEY = 'openfuture_admin_assistant_feed';
const ADMIN_EMAIL = 'mutavhatsindivule@gmail.com';
const ADMIN_PASSWORD = 'Admin@1t';
const ADMIN_PHONE = '+27 72 999 0064';
const WHATSAPP_NUMBER = '27729990064';
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
    requirements: 'CV, ID, qualifications, and contact details.',
    source: 'Open Future+ verified listing',
    location: 'South Africa',
    city: 'South Africa',
    province: 'National',
    suburb: 'National',
    remote: false,
    southAfricaWide: true,
    verified: true
  },
  {
    name: 'PNet',
    url: 'https://www.pnet.co.za/',
    type: 'Professional jobs',
    radiusKm: 80,
    requirements: 'Updated CV, work experience, and qualifications.',
    source: 'Recruitment Platform',
    location: 'Johannesburg',
    city: 'Johannesburg',
    province: 'Gauteng',
    suburb: 'Johannesburg',
    remote: false,
    southAfricaWide: true,
    verified: false
  },
  {
    name: 'JobStreet South Africa',
    url: 'https://www.jobstreet.co.za/',
    type: 'Employment listings',
    radiusKm: 60,
    requirements: 'CV, ID, and a short profile summary.',
    source: 'Recruitment Platform',
    location: 'Pretoria',
    city: 'Pretoria',
    province: 'Gauteng',
    suburb: 'Pretoria Central',
    remote: false,
    southAfricaWide: true,
    verified: false
  },
  {
    name: 'LinkedIn Jobs',
    url: 'https://www.linkedin.com/jobs/',
    type: 'Corporate roles',
    radiusKm: 120,
    requirements: 'Professional profile, CV, and work history.',
    source: 'Company Careers',
    location: 'Remote',
    city: 'Remote',
    province: 'Remote',
    suburb: 'Remote',
    remote: true,
    southAfricaWide: true,
    verified: false
  },
  {
    name: 'Government Vacancies',
    url: 'https://www.gov.za/',
    type: 'Public sector',
    radiusKm: 150,
    requirements: 'Certified qualifications, ID, and relevant supporting documents.',
    source: 'DPSA',
    location: 'Pretoria',
    city: 'Pretoria',
    province: 'Gauteng',
    suburb: 'Pretoria',
    remote: false,
    southAfricaWide: true,
    verified: true
  },
  {
    name: 'Gumtree Jobs',
    url: 'https://www.gumtree.co.za/',
    type: 'Entry-level and casual jobs',
    radiusKm: 50,
    requirements: 'CV, ID, and availability confirmation.',
    source: 'Community listing',
    location: 'Cape Town',
    city: 'Cape Town',
    province: 'Western Cape',
    suburb: 'Cape Town Central',
    remote: false,
    southAfricaWide: true,
    verified: false
  },
  {
    name: 'Woolworths Careers',
    url: 'https://www.woolworthsholdings.co.za/careers/',
    type: 'Retail and admin',
    radiusKm: 30,
    requirements: 'CV, ID, matric certificate, and work availability.',
    source: 'Company Careers',
    location: 'Cape Town',
    city: 'Cape Town',
    province: 'Western Cape',
    suburb: 'Cape Town',
    remote: false,
    southAfricaWide: true,
    verified: true
  },
  {
    name: 'Shoprite Careers',
    url: 'https://www.shoprite.jobs/',
    type: 'Retail and support roles',
    radiusKm: 25,
    requirements: 'CV, ID, work references, and availability.',
    source: 'Company Careers',
    location: 'Johannesburg',
    city: 'Johannesburg',
    province: 'Gauteng',
    suburb: 'Johannesburg',
    remote: false,
    southAfricaWide: true,
    verified: true
  },
  {
    name: 'MTN Careers',
    url: 'https://www.mtn.co.za/careers/',
    type: 'Telecommunications',
    radiusKm: 90,
    requirements: 'CV, qualifications, and relevant experience if required.',
    source: 'Company Careers',
    location: 'Sandton',
    city: 'Johannesburg',
    province: 'Gauteng',
    suburb: 'Sandton',
    remote: false,
    southAfricaWide: true,
    verified: true
  },
  {
    name: 'Nedbank Careers',
    url: 'https://careers.nedbank.co.za/',
    type: 'Banking and finance',
    radiusKm: 70,
    requirements: 'Updated CV, qualifications, and clear communication skills.',
    source: 'Company Careers',
    location: 'Johannesburg',
    city: 'Johannesburg',
    province: 'Gauteng',
    suburb: 'Sandton',
    remote: false,
    southAfricaWide: true,
    verified: true
  }
];

const EXTRA_OPPORTUNITY_RECORDS = [
  {
    id: 'sappi-apprentice-electrical',
    title: 'Apprentice: Electrical',
    company: 'Sappi',
    type: 'Apprenticeship',
    location: 'Sappi site',
    province: 'KwaZulu-Natal',
    city: 'KwaZulu-Natal',
    suburb: 'South Africa',
    description: 'Sappi is offering an exciting career in engineering through its Apprentice training programme. Dynamic, self-motivated individuals with the right technical ability are given institutional and work based training in order to qualify as an artisan after 4 years.',
    requirements: 'Institutional and work-based training under supervision of engineering foremen and qualified artisans. Competitive apprentice wage for the duration of the assignment.',
    closingDate: '2026-09-22',
    applicationUrl: 'https://www.jobopportunitiessa.com/2026/09/apprentice-electrical-job-with-artisan-training-at-sappi/',
    source: 'Sappi',
    salary: 'Competitive apprentice wage',
    verified: true,
    importantNotes: 'Fixed-term contract with accredited training and workplace experiential training.'
  },
  {
    id: 'nedbank-senior-risk-manager',
    title: 'Senior Risk Manager IT and Cyber Risk',
    company: 'Nedbank',
    type: 'Professional role',
    location: 'Johannesburg',
    province: 'Gauteng',
    city: 'Johannesburg',
    suburb: 'Johannesburg',
    description: 'Senior risk and technology leadership opportunity with a focus on IT and cyber risk management.',
    requirements: 'Honours Degree or Postgraduate Diploma in Information Security, Cyber Security, Information Technology, Risk Management or a related discipline.',
    closingDate: '2026-09-22',
    applicationUrl: 'https://www.jobopportunitiessa.com/2026/09/step-into-senior-it-and-cyber-risk-management-with-nedbank/',
    source: 'Nedbank',
    salary: 'Information not provided',
    verified: true,
    importantNotes: 'Preferred qualification listed in supplied source.'
  },
  {
    id: 'sappi-apprentice-millwright',
    title: 'Apprentice: Millwright',
    company: 'Sappi',
    type: 'Apprenticeship',
    location: 'Sappi site',
    province: 'KwaZulu-Natal',
    city: 'KwaZulu-Natal',
    suburb: 'South Africa',
    description: 'Sappi is offering an exciting career in engineering through its Apprentice training programme. Dynamic, self-motivated individuals with the right technical ability are given institutional and work based training in order to qualify as an artisan after 4 years.',
    requirements: 'Accredited training and workplace experiential training under supervision of engineering foremen and qualified artisans.',
    closingDate: '2026-09-22',
    applicationUrl: 'https://www.jobopportunitiessa.com/2026/09/apprentice-millwright-job-with-artisan-training-at-sappi/',
    source: 'Sappi',
    salary: 'Competitive apprentice wage',
    verified: true,
    importantNotes: 'Fixed-term contract with artisan development pathway.'
  },
  {
    id: 'eskom-she-officer',
    title: 'Officer Safety Health & Environment',
    company: 'Eskom',
    type: 'Public sector role',
    location: 'South Africa',
    province: 'National',
    city: 'South Africa',
    suburb: 'National',
    description: 'Safety, health and environmental area management with risk management and SHEQ adherence responsibilities.',
    requirements: 'Safety, health, environmental area management skills, risk management and administration experience.',
    closingDate: '2026-09-22',
    applicationUrl: 'https://www.jobopportunitiessa.com/2026/09/eskom-officer-safety-health-environment-opportunity-across-south-africa/',
    source: 'Eskom',
    salary: 'Information not provided',
    verified: true,
    importantNotes: 'Key responsibilities include admin, management, and SHEQ adherence.'
  },
  {
    id: 'eskom-yes',
    title: 'Youth Employment Service (YES) x50',
    company: 'Eskom',
    type: 'Youth programme',
    location: 'Eskom Operations across divisions',
    province: 'National',
    city: 'South Africa',
    suburb: 'National',
    description: 'Youth employment and placement opportunity through the YES programme in Eskom operations across divisions.',
    requirements: 'Should not have been employed permanently with a single employer continuously for more than 1 year; should not be studying full time; should not have participated/registered on YES before.',
    closingDate: '2026-09-22',
    applicationUrl: 'https://www.jobopportunitiessa.com/2026/09/youth-employment-service-yes-x50-opportunity-at-eskom/',
    source: 'Eskom',
    salary: 'Information not provided',
    verified: true,
    importantNotes: 'Applicants go through recruitment and are placed in Eskom Operations across divisions.'
  },
  {
    id: 'dwarsrivier-electrician-learnership',
    title: 'Learnership — Electrician (18.1)',
    company: 'Dwarsrivier',
    type: 'Learnership',
    location: 'Dwarsrivier',
    province: 'Limpopo',
    city: 'Limpopo',
    suburb: 'Limpopo',
    description: 'Electrician learnership opportunity for candidates who meet the minimum requirements.',
    requirements: 'Applicants must provide information/proof of qualifications according to minimum requirements. No late applications, no unsolicited applications, and no recruitment agency CVs.',
    closingDate: '2026-09-24',
    applicationUrl: 'https://www.jobopportunitiessa.com/2026/09/grade-12-candidates-can-apply-for-dwarsrivier-electrician-learnership/',
    source: 'Dwarsrivier',
    salary: 'Information not provided',
    verified: true,
    importantNotes: 'POPIA disclaimer applies to CV processing for recruitment.'
  },
  {
    id: 'cba-data-engineer',
    title: 'Data Engineer',
    company: 'Coca-Cola Beverages Africa',
    type: 'Professional role',
    location: 'South Africa',
    province: 'National',
    city: 'South Africa',
    suburb: 'National',
    description: 'Data pipeline development, integration, and transformation for enterprise reporting and analytics.',
    requirements: 'Computer Science, Data Engineering, and Information Systems background; data pipeline and analytics experience preferred.',
    closingDate: '2026-09-24',
    applicationUrl: 'https://www.jobopportunitiessa.com/2026/09/build-your-data-career-with-coca-cola-beverages-africas-data-engineer-role/',
    source: 'Coca-Cola Beverages Africa',
    salary: 'Information not provided',
    verified: true,
    importantNotes: 'Same URL as supplied source; separate record retained with closing date 24 September 2026.'
  },
  {
    id: 'rosebank-ict-intern',
    title: 'ICT Intern',
    company: 'Rosebank College',
    type: 'Internship',
    location: 'Rosebank College campuses',
    province: 'National',
    city: 'South Africa',
    suburb: 'National',
    description: 'Practical IT support internship to provide desktop support by installing hardware and software applications and operating systems.',
    requirements: 'Level 1 desktop support skills including troubleshooting, hardware and software installation, and user support.',
    closingDate: '2026-09-25',
    applicationUrl: 'https://www.jobopportunitiessa.com/2026/09/practical-it-support-training-ict-intern-vacancy-at-rosebank-college/',
    source: 'Rosebank College',
    salary: 'Information not provided',
    verified: true,
    importantNotes: 'Job purpose is to provide desktop support while learning and improving.'
  },
  {
    id: 'tlb-driver',
    title: 'TLB Driver',
    company: 'Recruiting company',
    type: 'Driver role',
    location: 'Pretoria',
    province: 'Gauteng',
    city: 'Pretoria',
    suburb: 'Pretoria',
    description: 'Safely operate a Tractor-Loader-Backhoe for excavation, loading, backfilling and site preparation while following safety and operational standards.',
    requirements: 'Operation of TLB, pre-start inspections, and basic maintenance practices.',
    closingDate: 'Information not provided',
    applicationUrl: 'https://www.jobopportunitiessa.com/2026/09/put-your-tlb-operating-skills-to-work-on-this-pretoria-vacancy/',
    source: 'Recruiting company',
    salary: 'Information not provided',
    verified: true,
    importantNotes: 'This role is specific to safe operations and site preparation.'
  },
  {
    id: 'phakisa-driver-vacancies',
    title: 'Driver Vacancies',
    company: 'Phakisa Holdings',
    type: 'Driver role',
    location: 'Gauteng — multiple locations',
    province: 'Gauteng',
    city: 'Gauteng',
    suburb: 'Multiple locations',
    description: 'Multiple driver vacancies across Gauteng and surrounding areas including Johannesburg, Midrand, Centurion and Vereeniging.',
    requirements: 'Valid Code 10/14 licence; PDP and DGP where required; relevant driving experience; reliable and safety-conscious.',
    closingDate: 'Information not provided',
    applicationUrl: 'https://tinyurl.com/phakisa-driver-vacancies-2026',
    source: 'Phakisa Holdings',
    salary: 'Information not provided',
    verified: true,
    importantNotes: 'Positions include Code 10 and Code 14 driver roles with or without DGP/PDP.'
  },
  {
    id: 'pep-sales-assistant',
    title: 'PEP Sales Assistant',
    company: 'PEP',
    type: 'Sales role',
    location: 'Store near you',
    province: 'National',
    city: 'South Africa',
    suburb: 'National',
    description: 'PEP stores have started taking CVs and applicants can check stores near them and submit their CV online.',
    requirements: 'Customer service, sales support, and store-based retail skills.',
    closingDate: 'Information not provided',
    applicationUrl: 'https://tinyurl.com/PEP-Sales-Assistant-2026',
    source: 'PEP',
    salary: 'Information not provided',
    verified: true,
    importantNotes: 'This is a retail sales support opportunity and not a guaranteed role.'
  },
  {
    id: 'uif-itr-learnership',
    title: 'UIF ITR Learnership Programme 2026',
    company: 'Unemployment Insurance Fund',
    type: 'Learnership',
    location: 'South Africa',
    province: 'National',
    city: 'South Africa',
    suburb: 'National',
    description: 'Funded by the UIF through the Labour Activation Programme (LAP) and designed to give workplace experience and training.',
    requirements: 'Successful applicants receive a monthly stipend and workplace experience; an accredited qualification is mentioned in the supplied information.',
    closingDate: 'Information not provided',
    applicationUrl: 'https://insurance.sayouthcareer.com/uif-itr-learnership-12-months-programme/',
    source: 'UIF',
    salary: 'R3,000 stipend per month',
    verified: true,
    importantNotes: '12 month duration as described in the source information.'
  },
  {
    id: 'security-officer-contact-record',
    title: 'Security Officer Job Contacts',
    company: 'Multiple security companies',
    type: 'Resource/contact list',
    location: 'Multiple provinces',
    province: 'National',
    city: 'National',
    suburb: 'National',
    description: 'This is a contact and recruitment resource record, not a single confirmed vacancy list.',
    requirements: 'Contact details supplied by source; do not treat as verified vacancies without confirmation.',
    closingDate: 'Information not provided',
    applicationUrl: 'https://whatsapp.com/channel/0029Va9dydx1t90f8vpz0K2r',
    source: 'Security recruitment contacts',
    salary: 'Information not provided',
    verified: false,
    importantNotes: 'Displayed as supplied recruitment contacts only.'
  },
  {
    id: 'government-vacancy-circular',
    title: 'Public Service Vacancies (Government Posts)',
    company: 'Government of South Africa',
    type: 'Government vacancies resource',
    location: 'South Africa',
    province: 'National',
    city: 'South Africa',
    suburb: 'National',
    description: 'Vacancy Circular 34 of 2026 with downloadable circular and Z83 form for government job applications.',
    requirements: 'Follow the public service recruitment process and complete the Z83 form as required.',
    closingDate: 'Information not provided',
    applicationUrl: 'https://www.dpsa.gov.za/dpsa2g/documents/vacancies/2026/PSV%20CIRCULAR%2034%20of%202026.pdf',
    source: 'DPSA',
    salary: 'Information not provided',
    verified: true,
    importantNotes: 'Related Z83 form available as a second resource link in this same record.'
  },
  {
    id: 'transnet-cv-registration',
    title: 'Register Your CV at Transnet',
    company: 'Transnet',
    type: 'Career registration',
    location: 'All provinces, South Africa',
    province: 'National',
    city: 'National',
    suburb: 'National',
    description: 'Register your CV in the recruitment database so Transnet may contact you when suitable opportunities become available.',
    requirements: 'South African citizen, unemployed, Grade 10–12 depending on role; Grade 12 for learnerships and entry-level jobs; Grade 10 for general worker posts.',
    closingDate: 'Information not provided',
    applicationUrl: 'https://insurance.sayouthcareer.com/how-to-apply-for-jobs-at-transnet-complete-step-by-step-guide/',
    source: 'Transnet',
    salary: 'Information not provided',
    verified: true,
    importantNotes: 'The source says applicants should not be asked for money to apply.'
  },
  {
    id: 'free-certificate-opportunity',
    title: 'Free Certificates for South Africans',
    company: 'Online learning provider',
    type: 'Free course resource',
    location: 'Online',
    province: 'National',
    city: 'Online',
    suburb: 'Online',
    description: 'Free certificate opportunities were advertised for Data Entry Clerk, Basic Computer, Receptionist, Workplace Health & Safety, ECD, TEFL, Microsoft Word, Microsoft Excel, Microsoft Outlook and Microsoft PowerPoint.',
    requirements: 'South African citizen. No independent accreditation or guaranteed outcome claim has been verified.',
    closingDate: 'Information not provided',
    applicationUrl: 'https://tinyurl.com/Educourse-Online-Learning',
    source: 'Online learning provider',
    salary: 'Information not provided',
    verified: false,
    importantNotes: 'Presented as a resource opportunity based on supplied information only.'
  },
  {
    id: 'uj-free-online-short-courses',
    title: 'UJ Free Online Short Courses',
    company: 'University of Johannesburg',
    type: 'Free online course resource',
    location: 'Online',
    province: 'National',
    city: 'Online',
    suburb: 'Online',
    description: 'The supplied information says UJ is offering free online short courses and no Matric is required according to the source.',
    requirements: 'No Matric requirement according to the supplied information; duration up to 3 months.',
    closingDate: 'Information not provided',
    applicationUrl: 'https://tinyurl.com/UJ-Online-Applications-2026',
    source: 'UJ',
    salary: 'Information not provided',
    verified: false,
    importantNotes: 'Course difficulty and certificate claims are not independently verified in the supplied source.'
  },
  {
    id: 'remote-call-centre-agent',
    title: 'Remote Call Centre Agent',
    company: 'Remote support employer',
    type: 'Remote role',
    location: 'Remote — South Africa',
    province: 'National',
    city: 'Remote',
    suburb: 'Remote',
    description: 'Full-time remote call centre role with a customer service and support function.',
    requirements: 'Customer service or call centre experience preferred; strong English communication; reliable internet; quiet workspace.',
    closingDate: 'Information not provided',
    applicationUrl: 'https://insurance.sayouthcareer.com/apply-for-remote-logistics-operations-support-work-from-home-opportunity/',
    source: 'Remote employer',
    salary: 'R13,000–R16,000 per month',
    verified: true,
    importantNotes: 'Schedule is full-time 11:00–19:00 SAST.'
  }
];

const OPPORTUNITY_RESOURCES = [
  {
    name: 'DPSA Vacancies',
    description: 'Government and public-sector vacancies for students, graduates, and professionals.',
    category: '🏛 Government',
    locationCoverage: 'South Africa',
    url: 'https://www.dpsa.gov.za/'
  },
  {
    name: 'SAYouth.mobi',
    description: 'Youth employment and learning opportunities, programmes, and support listings.',
    category: '💼 Jobs',
    locationCoverage: 'South Africa',
    url: 'https://sayouth.mobi/'
  },
  {
    name: 'Seta Vacancies',
    description: 'Sector education and training opportunities from accredited SETA providers.',
    category: '🎓 Learnerships',
    locationCoverage: 'South Africa',
    url: 'https://www.skillsportal.co.za/'
  },
  {
    name: 'Remotasks / Remote Jobs',
    description: 'Remote and online work opportunities for flexible digital and support roles.',
    category: '💻 Remote Jobs',
    locationCoverage: 'Remote',
    url: 'https://www.remote.co/'
  },
  {
    name: 'CareerJunction',
    description: 'Browse career and corporate opportunities in multiple South African cities.',
    category: '💼 Jobs',
    locationCoverage: 'South Africa',
    url: 'https://www.careerjunction.co.za/'
  },
  {
    name: 'Indeed South Africa',
    description: 'Search for jobs, internships, and graduate roles across the country.',
    category: '💼 Jobs',
    locationCoverage: 'South Africa',
    url: 'https://za.indeed.com/'
  },
  {
    name: 'Youth Employment Service',
    description: 'Structured entry-level work and youth development opportunities.',
    category: '🎓 Internships',
    locationCoverage: 'South Africa',
    url: 'https://www.yes4youth.co.za/'
  },
  {
    name: 'Free Courses / FutureLearn',
    description: 'Short online courses and career-building learning resources.',
    category: '📚 Free Courses',
    locationCoverage: 'Online',
    url: 'https://www.futurelearn.com/'
  }
];

const OPPORTUNITY_STORAGE_KEY = 'openfuture_custom_opportunities_v1';

const normalizeLocationText = (value) => String(value ?? '')
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const getStoredOpportunityRecords = () => {
  try {
    const storageValue = localStorage.getItem(OPPORTUNITY_STORAGE_KEY);
    const parsed = storageValue ? JSON.parse(storageValue) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveStoredOpportunityRecords = (records) => {
  localStorage.setItem(OPPORTUNITY_STORAGE_KEY, JSON.stringify(records));
};

const normalizeOpportunityLinks = (item) => {
  const urls = [];
  const rawLinks = [];

  if (Array.isArray(item?.applicationUrls)) {
    rawLinks.push(...item.applicationUrls);
  }
  if (Array.isArray(item?.sourceUrls)) {
    rawLinks.push(...item.sourceUrls);
  }
  if (item?.applicationUrl) rawLinks.push(item.applicationUrl);
  if (item?.sourceUrl) rawLinks.push(item.sourceUrl);
  if (item?.url) rawLinks.push(item.url);

  rawLinks.forEach((link) => {
    if (!link || typeof link !== 'string') return;
    const trimmed = link.trim();
    if (!trimmed) return;
    if (!urls.includes(trimmed)) urls.push(trimmed);
  });

  return urls;
};

const getOpportunityCatalog = () => [...JOB_PORTALS, ...EXTRA_OPPORTUNITY_RECORDS, ...getStoredOpportunityRecords()];

const getSARegionAliases = () => ({
  soshanguve: ['soshanguve', 'pretoria north', 'tshwane north'],
  mamelodi: ['mamelodi', 'pretoria east', 'east pretoria'],
  tembisa: ['tembisa', 'east rand', 'alberton'],
  soweto: ['soweto', 'johannesburg south', 'jhb south'],
  midrand: ['midrand', 'sandton', 'randburg', 'rosebank', 'fourways'],
  centurion: ['centurion', 'pretoria west', 'tshwane west'],
  pretoria: ['pretoria', 'tshwane'],
  johannesburg: ['johannesburg', 'jhb', 'gauteng'],
  cape_town: ['cape town', 'capetown', 'western cape'],
  durban: ['durban', 'kwazulu-natal', 'kzn'],
  bloemfontein: ['bloemfontein', 'free state'],
  polokwane: ['polokwane', 'limpopo'],
  rutenburg: ['rustenburg', 'north west'],
  george: ['george', 'western cape south'],
  benoni: ['benoni', 'east rand'],
  boksburg: ['boksburg', 'east rand'],
  vereeniging: ['vereeniging', 'vanderbijlpark'],
  meyerton: ['meyerton', 'vanderbijlpark']
});

const getDistanceEstimateKm = (origin, destination) => {
  const map = {
    soshanguve: { lat: -25.53, lng: 28.1 },
    mamelodi: { lat: -25.7, lng: 28.35 },
    tembisa: { lat: -25.99, lng: 28.23 },
    soweto: { lat: -26.27, lng: 27.86 },
    midrand: { lat: -25.99, lng: 28.12 },
    centurion: { lat: -25.86, lng: 28.19 },
    pretoria: { lat: -25.75, lng: 28.24 },
    johannesburg: { lat: -26.2, lng: 28.04 },
    sandton: { lat: -26.11, lng: 28.05 },
    rosebank: { lat: -26.15, lng: 28.04 },
    randburg: { lat: -26.1, lng: 27.98 },
    benoni: { lat: -26.19, lng: 28.32 },
    boksburg: { lat: -26.21, lng: 28.25 },
    vereeniging: { lat: -26.67, lng: 27.92 },
    meyerton: { lat: -26.58, lng: 27.98 },
    rustenburg: { lat: -25.66, lng: 27.24 },
    george: { lat: -33.96, lng: 22.46 },
    durban: { lat: -29.86, lng: 31.02 },
    cape_town: { lat: -33.92, lng: 18.42 },
    polokwane: { lat: -23.9, lng: 29.45 },
    bloemfontein: { lat: -29.12, lng: 26.22 },
    remote: { lat: 0, lng: 0 }
  };

  const start = map[origin] || null;
  const end = map[destination] || map[origin] || null;

  if (!start || !end) return null;

  const toRad = (degrees) => (degrees * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRad(end.lat - start.lat);
  const dLng = toRad(end.lng - start.lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(start.lat)) * Math.cos(toRad(end.lat)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(earthRadiusKm * c);
};

const getUserLocationProfile = (suburb, city, province) => {
  const profile = { suburb, city, province };
  const aliasMap = getSARegionAliases();
  const findMatch = (value) => {
    const norm = normalizeLocationText(value);
    if (!norm) return null;
    const entry = Object.entries(aliasMap).find(([, aliases]) => aliases.some((alias) => alias === norm || norm.includes(alias) || alias.includes(norm)));
    return entry ? entry[0] : null;
  };

  return {
    ...profile,
    suburbKey: findMatch(suburb) || findMatch(city) || findMatch(province),
    cityKey: findMatch(city) || findMatch(suburb) || findMatch(province),
    provinceKey: findMatch(province) || findMatch(city) || findMatch(suburb)
  };
};

const isOpportunityNearUser = (opportunity, userLocation) => {
  const opportunityText = [opportunity.suburb, opportunity.city, opportunity.province, opportunity.location].filter(Boolean).join(' ');
  const userText = [userLocation.suburb, userLocation.city, userLocation.province].filter(Boolean).join(' ');
  if (!opportunityText || !userText) return false;

  const normalizedOpportunity = normalizeLocationText(opportunityText);
  const normalizedUser = normalizeLocationText(userText);
  return normalizedOpportunity.includes(normalizedUser) || normalizedUser.includes(normalizedOpportunity) ||
    (userLocation.suburbKey && (normalizedOpportunity.includes(userLocation.suburbKey) || userLocation.suburbKey.includes(normalizedOpportunity))) ||
    (userLocation.cityKey && (normalizedOpportunity.includes(userLocation.cityKey) || userLocation.cityKey.includes(normalizedOpportunity)));
};

const getNearbyOpportunitySections = (userInput) => {
  const userLocation = getUserLocationProfile(userInput.suburb, userInput.city, userInput.province);
  const items = getOpportunityCatalog();

  const inArea = [];
  const nearbyArea = [];
  const national = [];
  const remoteItems = [];

  items.forEach((item) => {
    if (!item) return;
    const areaMatch = isOpportunityNearUser(item, userLocation);
    const status = item.remote ? 'remote' : item.southAfricaWide ? 'national' : (areaMatch ? 'area' : 'other');

    if (item.remote) {
      remoteItems.push(item);
      return;
    }

    if (status === 'area' || areaMatch) {
      inArea.push(item);
      return;
    }

    if (status === 'national' || item.southAfricaWide) {
      national.push(item);
      return;
    }

    if (userLocation.suburbKey || userLocation.cityKey) {
      const userKey = userLocation.suburbKey || userLocation.cityKey;
      const opportunityKey = normalizeLocationText([item.suburb, item.city, item.province].join(' '));
      const nearbyAliases = getSARegionAliases()[userKey] || [];
      const isNearbyMatch = nearbyAliases.some((alias) => opportunityKey.includes(alias) || alias.includes(opportunityKey));
      if (isNearbyMatch) {
        nearbyArea.push(item);
      } else {
        national.push(item);
      }
    } else {
      national.push(item);
    }
  });

  return { inArea, nearbyArea, national, remoteItems };
};

const formatLocationInfo = (opportunity, userLocation) => {
  const locationText = [opportunity.suburb, opportunity.city, opportunity.province, opportunity.location].filter(Boolean).join(', ') || 'Location not provided';
  const hasReliableOrigin = userLocation && (userLocation.suburbKey || userLocation.cityKey);
  const hasReliableDestination = normalizeLocationText([opportunity.suburb, opportunity.city, opportunity.province, opportunity.location].join(' '));

  if (!hasReliableOrigin || !hasReliableDestination || hasReliableDestination === 'location not provided') {
    return '📍 Location not provided';
  }

  const userKey = userLocation.suburbKey || userLocation.cityKey || 'pretoria';
  const destinationKey = normalizeLocationText([opportunity.suburb, opportunity.city, opportunity.province, opportunity.location].join(' ')).split(' ')[0] || 'pretoria';
  const distance = getDistanceEstimateKm(userKey, destinationKey);

  if (distance === null) {
    return '📍 Distance unavailable';
  }

  return `📍 ${distance} km from ${userLocation.suburb || userLocation.city || 'your area'}`;
};

const getOpportunityDisplayName = (item) => item.title || item.name || 'Opportunity';

const getOpportunityClosingStatus = (closingDate) => {
  if (!closingDate) {
    return { label: '📅 Closes: Information not provided', kind: 'info' };
  }

  const date = new Date(closingDate);
  if (Number.isNaN(date.getTime())) {
    return { label: '📅 Closes: Information not provided', kind: 'info' };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const closing = new Date(date);
  closing.setHours(0, 0, 0, 0);

  const diffDays = Math.round((closing - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { label: '🔴 Closed', kind: 'closed' };
  }
  if (diffDays === 0) {
    return { label: '🟠 Closing Today', kind: 'today' };
  }
  if (diffDays === 1) {
    return { label: '🟡 Closing Tomorrow', kind: 'tomorrow' };
  }

  return {
    label: `📅 Closes: ${closing.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}`,
    kind: 'future'
  };
};

const getOpportunityLinks = (item) => {
  const links = normalizeOpportunityLinks(item);
  return links.length ? links : [];
};

const getOpportunityDetailValue = (...values) => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (value && value !== 'Information not provided') return value;
  }
  return 'Information not provided';
};

const getOpportunityDistanceText = (userState, item) => {
  const userKeys = [userState.suburb, userState.city, userState.province].filter(Boolean);
  const itemLocation = [item?.suburb, item?.city, item?.province, item?.location].filter(Boolean).join(' ');

  if (!userKeys.length || !itemLocation || item?.remote) {
    return item?.remote ? 'Remote/online' : 'Distance unavailable';
  }

  const userProfile = getUserLocationProfile(userState.suburb, userState.city, userState.province);
  const originKey = userProfile.suburbKey || userProfile.cityKey || userProfile.provinceKey;
  const destinationText = normalizeLocationText(itemLocation);
  const destinationKey = Object.keys(getSARegionAliases()).find((key) => destinationText.includes(key) || getSARegionAliases()[key].some((alias) => destinationText.includes(alias) || alias.includes(destinationText)));

  if (!originKey || !destinationKey) {
    return 'Distance unavailable';
  }

  const distance = getDistanceEstimateKm(originKey, destinationKey);
  return distance === null ? 'Distance unavailable' : `${distance} km`;
};

const matchTextValue = (value, expected) => {
  if (!expected) return true;
  const actual = normalizeLocationText(String(value || ''));
  const target = normalizeLocationText(String(expected || ''));
  return !actual || !target ? true : actual.includes(target) || target.includes(actual);
};

const matchOpportunityType = (item, selectedType) => {
  if (!selectedType) return true;
  const values = [item?.type, item?.category, item?.opportunityType, item?.title, item?.name, item?.description]
    .filter(Boolean)
    .join(' ');
  const text = normalizeLocationText(values);
  const typeText = normalizeLocationText(selectedType);
  if (text.includes(typeText) || typeText.includes(text)) return true;

  const aliases = {
    Jobs: ['job', 'employment', 'vacancy'],
    Learnerships: ['learnership'],
    Internships: ['internship'],
    Bursaries: ['bursary', 'funding'],
    'Graduate programmes': ['graduate', 'graduate programme'],
    'Free courses': ['free course', 'course'],
    'University opportunities': ['university'],
    'TVET opportunities': ['tvet', 'college'],
    'Business funding': ['funding', 'business funding'],
    'Entrepreneurship opportunities': ['entrepreneurship', 'startup', 'business'],
    'Remote/online opportunities': ['remote', 'online']
  };

  const patterns = aliases[selectedType] || [typeText];
  return patterns.some((pattern) => text.includes(pattern));
};

const matchEducation = (item, selectedEducation) => {
  if (!selectedEducation) return true;
  const text = normalizeLocationText([item?.education, item?.educationRequirements, item?.requirements, item?.description].join(' '));
  return text.includes(normalizeLocationText(selectedEducation)) || selectedEducation === 'Other' || !text;
};

const matchExperience = (item, selectedExperience) => {
  if (!selectedExperience) return true;
  const text = normalizeLocationText([item?.experience, item?.experienceRequirements, item?.requirements, item?.description].join(' '));
  const target = normalizeLocationText(selectedExperience);

  if (target.includes('no experience')) {
    return text.includes('no experience') || text.includes('entry level') || text.includes('no previous') || text.includes('0 years') || !text;
  }

  if (target.includes('less than 1 year')) {
    return text.includes('less than 1 year') || text.includes('1 year') || text.includes('entry level') || !text;
  }

  if (target.includes('1-2 years') || target.includes('1–2 years')) {
    return text.includes('1 year') || text.includes('2 years') || text.includes('1-2 years') || text.includes('1–2 years') || !text;
  }

  if (target.includes('2+ years')) {
    return text.includes('2 years') || text.includes('3 years') || text.includes('2+') || text.includes('2+ years') || !text;
  }

  return text.includes(target) || !text;
};

const matchField = (item, selectedField) => {
  if (!selectedField) return true;
  const text = normalizeLocationText([item?.field, item?.category, item?.industry, item?.title, item?.description].join(' '));
  return text.includes(normalizeLocationText(selectedField)) || !text;
};

const getOpportunityFinderMatches = (formState) => {
  const catalog = getOpportunityCatalog();
  const userState = {
    suburb: formState.suburb || '',
    city: formState.city || '',
    province: formState.province || ''
  };

  return catalog.filter((item) => {
    if (!item) return false;

    const locationText = [item.suburb, item.city, item.province, item.location].join(' ');
    const includesProvince = formState.province ? matchTextValue(locationText, formState.province) : true;
    const includesCity = formState.city ? matchTextValue(locationText, formState.city) : true;
    const includesSuburb = formState.suburb ? matchTextValue(locationText, formState.suburb) : true;
    const matchesType = matchOpportunityType(item, formState.type);
    const matchesEducation = matchEducation(item, formState.education);
    const matchesExperience = matchExperience(item, formState.experience);
    const matchesField = matchField(item, formState.field);

    let matchesDistance = true;
    if (formState.distance && Number(formState.distance) < 999) {
      const distanceText = getOpportunityDistanceText(userState, item);
      const distanceValue = Number.parseInt(String(distanceText).replace(/\D/g, ''), 10);
      if (Number.isFinite(distanceValue) && distanceValue > Number(formState.distance)) {
        matchesDistance = false;
      }
    }

    return includesProvince && includesCity && includesSuburb && matchesType && matchesEducation && matchesExperience && matchesField && matchesDistance;
  });
};

const buildOpportunityExplanation = (item, formState) => {
  const typeText = item?.type || item?.category || 'opportunity';
  const title = item?.title || item?.name || 'This opportunity';
  const locationText = [item?.suburb, item?.city, item?.province, item?.location].filter(Boolean).join(', ') || 'Location not provided';
  const educationText = getOpportunityDetailValue(item?.education, item?.educationRequirements, item?.requirements);
  const experienceText = getOpportunityDetailValue(item?.experience, item?.experienceRequirements, item?.requirements);
  const matchBlock = [];

  if (formState.type) matchBlock.push(`your interest in ${formState.type.toLowerCase()}`);
  if (formState.education) matchBlock.push(`your education level of ${formState.education}`);
  if (formState.experience) matchBlock.push(`your experience level of ${formState.experience}`);
  if (formState.city || formState.suburb || formState.province) matchBlock.push(`your location in ${[formState.suburb, formState.city, formState.province].filter(Boolean).join(', ') || 'your area'}`);

  const summary = matchBlock.length ? `This may be a good match because it matches ${matchBlock.join(', ')}.` : 'This may be a good match because it matches your search preferences.';

  return `${summary} ${title} is a ${typeText.toLowerCase()} opportunity in ${locationText}. Education requirement: ${educationText}. Experience requirement: ${experienceText}.`;
};

const renderOpportunityFinderResults = (formState) => {
  const container = document.getElementById('nearbyOpportunityResults');
  if (!container) return;

  const hasAnyFormData = Object.values(formState).some((value) => String(value || '').trim() !== '');

  if (!hasAnyFormData) {
    container.innerHTML = `
      <div class="finder-results-panel empty-state">
        <h3>📍 Tell us where you are</h3>
        <p>Enter your province, city/town and suburb to find opportunities around you.</p>
      </div>
    `;
    return;
  }

  const matches = getOpportunityFinderMatches(formState);
  if (!matches.length) {
    container.innerHTML = `
      <div class="finder-results-panel empty-state">
        <h3>😔 We couldn't find a close match yet.</h3>
        <p>Try expanding your search to 20 km or Anywhere, remove one filter, or choose another opportunity type.</p>
        <p><strong>Try expanding your search to 20 km or Anywhere.</strong></p>
      </div>
    `;
    return;
  }

  const cards = matches.map((item) => {
    const title = item.title || item.name || 'Opportunity';
    const type = item.type || item.category || 'Opportunity';
    const locationText = [item.suburb, item.city, item.province, item.location].filter(Boolean).join(', ') || 'Location not provided';
    const educationText = getOpportunityDetailValue(item.education, item.educationRequirements, item.requirements);
    const experienceText = getOpportunityDetailValue(item.experience, item.experienceRequirements, item.requirements);
    const salaryText = getOpportunityDetailValue(item.salary, item.funding, item.budget);
    const closingStatus = getOpportunityClosingStatus(item.closingDate || item.closing_date || item.deadline);
    const links = getOpportunityLinks(item);
    const distanceText = getOpportunityDistanceText(formState, item);
    const verificationLabel = item.verified ? '✅ Verified' : 'Unverified';
    const explanation = buildOpportunityExplanation(item, formState);
    const applyUrl = links[0] || '#';

    return `
      <article class="finder-match-card">
        <div class="finder-match-header">
          <span class="job-type">${sanitizeText(type)}</span>
          ${item.verified ? '<span class="verified-pill">✅ Verified</span>' : '<span class="pending-pill">Unverified</span>'}
        </div>

        <h3>${sanitizeText(title)}</h3>
        <p><strong>📍 Location:</strong> ${sanitizeText(locationText)}</p>
        <p><strong>🎓 Education requirement:</strong> ${sanitizeText(educationText)}</p>
        <p><strong>💼 Experience requirement:</strong> ${sanitizeText(experienceText)}</p>
        <p><strong>💰 Salary/Funding:</strong> ${sanitizeText(salaryText)}</p>
        <p><strong>📅 Closing date:</strong> ${sanitizeText(closingStatus.label)}</p>
        <p><strong>📏 Distance:</strong> ${sanitizeText(distanceText)}</p>
        <p><strong>Verification:</strong> ${sanitizeText(verificationLabel)}</p>

        <div class="match-summary">
          <strong>✨ Opportunities That Match You</strong>
          <p>${sanitizeText(explanation)}</p>
        </div>

        <div class="finder-card-actions">
          <a class="button" href="${sanitizeText(applyUrl)}" target="_blank" rel="noopener">Apply Now →</a>
          <button type="button" class="button secondary explain-button">💡 Explain this opportunity simply</button>
        </div>
        <div class="simple-explanation hidden">${sanitizeText(explanation)}</div>
      </article>
    `;
  }).join('');

  container.innerHTML = `
    <div class="finder-results-panel">
      <h3>✨ Opportunities That Match You</h3>
      <div class="finder-results-grid">
        ${cards}
      </div>
    </div>
  `;

  container.querySelectorAll('.explain-button').forEach((button) => {
    button.addEventListener('click', () => {
      const panel = button.closest('.finder-match-card')?.querySelector('.simple-explanation');
      if (!panel) return;
      panel.classList.toggle('hidden');
      const expanded = !panel.classList.contains('hidden');
      button.textContent = expanded ? 'Hide simple explanation' : '💡 Explain this opportunity simply';
    });
  });
};

const readOpportunityFinderState = () => ({
  province: document.getElementById('finderProvince')?.value || '',
  city: document.getElementById('finderCity')?.value || '',
  suburb: document.getElementById('finderSuburb')?.value || '',
  age: document.getElementById('finderAge')?.value || '',
  education: document.getElementById('finderEducation')?.value || '',
  experience: document.getElementById('finderExperience')?.value || '',
  type: document.getElementById('finderType')?.value || '',
  distance: document.getElementById('finderDistance')?.value || '',
  field: document.getElementById('finderField')?.value || ''
});

const applyQuickSearchPreset = (preset) => {
  const form = document.getElementById('opportunityFinderForm');
  if (!form) return;

  const values = {
    'no-experience': {
      finderEducation: 'Matric',
      finderExperience: 'No experience',
      finderType: 'Jobs',
      finderDistance: '20'
    },
    matric: {
      finderEducation: 'Matric',
      finderType: 'Jobs',
      finderDistance: '20'
    },
    'jobs-near-me': {
      finderType: 'Jobs',
      finderDistance: '20'
    },
    learnerships: {
      finderType: 'Learnerships',
      finderDistance: '50'
    },
    bursaries: {
      finderType: 'Bursaries',
      finderDistance: '999'
    },
    remote: {
      finderType: 'Remote/online opportunities',
      finderDistance: '999'
    },
    funding: {
      finderType: 'Business funding',
      finderDistance: '999'
    },
    'free-courses': {
      finderType: 'Free courses',
      finderDistance: '999'
    }
  };

  const presetValues = values[preset] || {};
  Object.entries(presetValues).forEach(([fieldId, value]) => {
    const field = document.getElementById(fieldId);
    if (field) field.value = value;
  });

  const state = readOpportunityFinderState();
  renderOpportunityFinderResults(state);
};

const bindOpportunityFinderControls = () => {
  const form = document.getElementById('opportunityFinderForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderOpportunityFinderResults(readOpportunityFinderState());
  });

  document.querySelectorAll('.quick-search').forEach((button) => {
    button.addEventListener('click', () => {
      applyQuickSearchPreset(button.dataset.quickSearch);
    });
  });
};

const openOpportunityDetailModal = (item) => {
  const modal = document.getElementById('opportunityDetailModal');
  const content = document.getElementById('opportunityDetailContent');
  if (!modal || !content) return;

  const title = item?.title || item?.name || 'Opportunity';
  const company = item?.company || item?.source || 'Opportunity provider';
  const type = item?.type || item?.category || 'Opportunity';
  const location = [item?.suburb, item?.city, item?.province, item?.location].filter(Boolean).join(', ') || 'Location not provided';
  const description = item?.description || item?.requirements || 'Information not provided';
  const requirements = item?.requirements || item?.education || 'Information not provided';
  const closingDate = item?.closingDate || item?.closing_date || item?.deadline || 'Closing date not provided';
  const salary = item?.salary || item?.stipend || 'Information not provided';
  const importantNotes = item?.importantNotes || 'Information not provided';
  const links = normalizeOpportunityLinks(item);
  const primaryUrl = links[0] || item?.applicationUrl || item?.url || '#';

  const linkMarkup = links.length
    ? links.map((link, index) => `<a href="${link}" target="_blank" rel="noopener">${index === 0 ? 'Open original source' : 'Related link'}</a>`).join('')
    : '<span>Application link not provided</span>';

  content.innerHTML = `
    <div class="opportunity-detail-content">
      <div class="opportunity-detail-meta">
        <span>${sanitizeText(type)}</span>
        ${item?.verified ? '<span>Verified</span>' : '<span>Unverified</span>'}
      </div>
      <h2 id="opportunityDetailTitle">${sanitizeText(title)}</h2>
      <p><strong>Company/provider:</strong> ${sanitizeText(company)}</p>
      <p><strong>Location:</strong> ${sanitizeText(location)}</p>
      <p><strong>Description:</strong> ${sanitizeText(description)}</p>
      <p><strong>Requirements:</strong> ${sanitizeText(requirements)}</p>
      <p><strong>Closing date:</strong> ${sanitizeText(closingDate)}</p>
      <p><strong>Salary/stipend:</strong> ${sanitizeText(salary)}</p>
      <p><strong>Important notes:</strong> ${sanitizeText(importantNotes)}</p>
      <div class="opportunity-detail-list">
        <div><strong>Original source/application link:</strong> ${linkMarkup}</div>
      </div>
      <div class="detail-actions">
        <a class="button" href="${sanitizeText(primaryUrl)}" target="_blank" rel="noopener">Apply Now →</a>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
};

const closeOpportunityDetailModal = () => {
  const modal = document.getElementById('opportunityDetailModal');
  if (!modal) return;
  modal.classList.add('hidden');
};

const renderNearByResults = (userQuery) => {
  const container = document.getElementById('nearbyOpportunityResults');
  if (!container) return;

  const query = {
    suburb: document.getElementById('userSuburbInput')?.value || userQuery?.suburb || '',
    city: document.getElementById('userCityInput')?.value || userQuery?.city || '',
    province: document.getElementById('userProvinceInput')?.value || userQuery?.province || ''
  };

  const userLocation = getUserLocationProfile(query.suburb, query.city, query.province);
  const sections = getNearbyOpportunitySections(query);
  const hasAnyInput = query.suburb || query.city || query.province;

  if (!hasAnyInput) {
    container.innerHTML = `
      <div class="nearby-results-block">
        <div class="nearby-results-section">
          <h3>📍 Jobs near you</h3>
          <div class="nearby-results-grid">
            <div class="nearby-result-card">
              <h4>Enter your suburb to get nearby results.</h4>
              <p>Use the search above or browse all opportunities below.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const buildCards = (items, heading, emptyText) => {
    if (!items.length) {
      return `
        <div class="nearby-results-section">
          <h3>${heading}</h3>
          <div class="nearby-results-grid">
            <div class="nearby-result-card">
              <h4>${emptyText}</h4>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="nearby-results-section">
        <h3>${heading}</h3>
        <div class="nearby-results-grid">
          ${items.map((item) => {
            const sourceName = item.source || 'Source not provided';
            const objectLocation = [item.suburb, item.city, item.province, item.location].filter(Boolean).join(', ') || 'Location not provided';
            const distanceText = formatLocationInfo(item, userLocation);
            const links = normalizeOpportunityLinks(item);
            const detailsLabel = item.requirements || item.description || 'Information not provided';
            const linksMarkup = links.length
              ? links.map((link, index) => `<div class="source-row"><a href="${link}" target="_blank" rel="noopener">${index === 0 ? '🔗 Apply Now' : '🔗 View Link'}</a></div>`).join('')
              : '<div class="source-row">Application link not provided</div>';
            return `
              <article class="nearby-result-card">
                <span class="job-type">${item.type || item.category || 'Opportunity'}</span>
                <h4>${getOpportunityDisplayName(item)}</h4>
                <p>${item.company || item.name || 'Opportunity listing'}</p>
                <p>${objectLocation}</p>
                <p>${distanceText}</p>
                <p>${detailsLabel}</p>
                <div class="source-row">Source: ${sourceName}</div>
                ${linksMarkup}
              </article>
            `;
          }).join('')}
        </div>
      </div>
    `;
  };

  container.innerHTML = `
    <div class="nearby-results-block">
      ${buildCards(sections.inArea, '📍 In Your Area', 'No opportunities were found in your area.')}
      ${buildCards(sections.nearbyArea, '🚗 Nearby Areas', 'No nearby-area opportunities were found.')}
      ${buildCards(sections.national, '🇿🇦 South Africa-Wide', 'No South Africa-wide opportunities were found.')}
      ${buildCards(sections.remoteItems, '💻 Remote', 'No remote opportunities were found.')}
    </div>
  `;
};

const renderMorePlaces = () => {
  const container = document.getElementById('morePlacesList');
  if (!container) return;

  container.innerHTML = OPPORTUNITY_RESOURCES.map((source) => `
    <article class="opportunity-card">
      <span class="opportunity-icon">🔎</span>
      <h3>${source.name}</h3>
      <p>${source.description}</p>
      <p><strong>Category:</strong> ${source.category}</p>
      <p><strong>Location coverage:</strong> ${source.locationCoverage}</p>
      <a href="${source.url}" target="_blank" rel="noopener">Visit website →</a>
    </article>
  `).join('');
};

const renderAllOpportunities = () => {
  const list = document.getElementById('jobListings');
  if (!list) return;

  const allItems = getOpportunityCatalog();
  list.innerHTML = allItems.map((job) => {
    const locationText = [job.suburb, job.city, job.province, job.location].filter(Boolean).join(', ') || 'Location not provided';
    const links = normalizeOpportunityLinks(job);
    const linksMarkup = links.length
      ? links.map((link, index) => `<div class="source-row"><a href="${link}" target="_blank" rel="noopener">${index === 0 ? '🔗 Apply Now' : '🔗 View Link'}</a></div>`).join('')
      : '<div class="source-row">Application link not provided</div>';

    return `
      <article class="job-card">
        <div class="job-top">
          <div>
            <span class="job-type">${job.type || job.category || 'Opportunity'}</span>
            <h3>${getOpportunityDisplayName(job)}</h3>
          </div>
          <span class="job-distance">${job.remote ? 'Remote' : (job.location || 'Location not provided')}</span>
        </div>
        <p>${job.requirements || job.description || 'Information not provided'}</p>
        <p><strong>Location:</strong> ${locationText}</p>
        <p><strong>Source:</strong> ${job.source || 'Source not provided'}</p>
        ${linksMarkup}
      </article>
    `;
  }).join('');
};

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
    {
      id: 'user-scott',
      name: 'Scott Mokoena',
      email: 'scott@openfutureplus.demo',
      phone: '+27 71 987 6543',
      password: 'Scott@123',
      role: 'user',
      points: 42,
      district: 'Pretoria',
      school: 'Pretoria West Secondary',
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

const readAssistantFeed = () => {
  try {
    const feed = JSON.parse(localStorage.getItem(ASSISTANT_FEED_KEY) || '[]');
    return Array.isArray(feed) ? feed : [];
  } catch {
    return [];
  }
};

const saveAssistantFeed = (entries) => {
  localStorage.setItem(ASSISTANT_FEED_KEY, JSON.stringify(entries));
};

const addAssistantFeedEntry = (text, author = 'Open Future+ Admin') => {
  const entries = readAssistantFeed();
  entries.push({
    id: `feed-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    text,
    author,
    createdAt: new Date().toISOString(),
  });
  saveAssistantFeed(entries.slice(-12));
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

const loadThemePreference = () => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'dark';
};

const applyTheme = (theme) => {
  const selectedTheme = theme === 'light' ? 'light' : 'dark';
  document.body.dataset.theme = selectedTheme;
  document.documentElement.style.colorScheme = selectedTheme;

  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(selectedTheme === 'light'));
    toggle.querySelector('.theme-toggle-thumb')?.setAttribute('data-checked', String(selectedTheme === 'light'));
  }
};

const ensureThemeToggle = () => {
  const nav = document.querySelector('.nav');
  if (!nav || nav.querySelector('#themeToggle')) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'themeToggle';
  button.className = 'theme-toggle';
  button.setAttribute('aria-label', 'Toggle light and dark mode');
  button.setAttribute('aria-pressed', 'false');
  button.innerHTML = `
    <span class="theme-toggle-track">
      <span class="theme-toggle-thumb"></span>
    </span>
  `;

  button.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });

  nav.appendChild(button);
  applyTheme(loadThemePreference());
};

const openWhatsApp = (message = 'Hi Open Future+, I would like to learn more about your support.') => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

const getVisibleAssistantMessage = () => {
  const entries = readAssistantFeed();
  const latest = entries[entries.length - 1];
  return latest?.text || 'Hi! I’m here to help with Open Future+, APS, TUT, funding, and opportunities.';
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
  const catalog = getOpportunityCatalog();
  const filteredJobs = catalog.filter((job) => {
    const radius = Number(job.radiusKm || 150);
    return radius <= maxDistance || maxDistance >= 150;
  });

  list.innerHTML = filteredJobs.map((job) => {
    const links = normalizeOpportunityLinks(job);
    const applyUrl = links[0] || job.applicationUrl || job.url || '#';
    return `
      <article class="job-card">
        <div class="job-top">
          <div>
            <span class="job-type">${job.type || job.category || 'Opportunity'}</span>
            <h3>${getOpportunityDisplayName(job)}</h3>
          </div>
          <span class="job-distance">${job.radiusKm ? `Up to ${job.radiusKm} km` : (job.remote ? 'Remote' : 'Location not provided')}</span>
        </div>
        <p>${job.requirements || job.description || 'Information not provided'}</p>
        <p><strong>Location:</strong> ${[job.suburb, job.city, job.province, job.location].filter(Boolean).join(', ') || 'Location not provided'}</p>
        <p><strong>Source:</strong> ${job.source || 'Source not provided'}</p>
        <div class="detail-actions">
          <button type="button" class="button secondary job-detail-trigger" data-job-id="${sanitizeText(job.id || getOpportunityDisplayName(job))}">Open record</button>
          <a href="${applyUrl}" target="_blank" rel="noopener">Apply Now →</a>
        </div>
      </article>
    `;
  }).join('');

  list.querySelectorAll('.job-detail-trigger').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.jobId;
      const item = catalog.find((job) => (job.id || getOpportunityDisplayName(job)) === key);
      if (item) openOpportunityDetailModal(item);
    });
  });
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
    <li class="admin-list-item">
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
        <div class="dashboard-actions">
          <button type="button" class="button secondary" data-whatsapp-button data-whatsapp-message="Hi Open Future+ admin team, I need support.">WhatsApp</button>
          <button type="button" class="button secondary" id="logoutButton">Logout</button>
        </div>
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
          <button type="button" class="button primary" data-whatsapp-button data-whatsapp-message="Hi Open Future+, I have reached 50 points and want to speak directly with the founder.">Talk to me directly</button>
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

  body.querySelectorAll('[data-whatsapp-button]').forEach((button) => {
    const message = button.getAttribute('data-whatsapp-message') || 'Hi Open Future+, I would like to learn more.';
    button.addEventListener('click', () => openWhatsApp(message));
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

const renderAdminOpportunityList = () => {
  const list = document.getElementById('adminOpportunityList');
  if (!list) return;

  const records = getStoredOpportunityRecords();
  list.innerHTML = records.length
    ? records.map((item) => `
        <li>
          <div>
            <strong>${sanitizeText(item.title || item.name || 'Untitled opportunity')}</strong>
            <span>${sanitizeText(item.company || 'Company not provided')}</span>
          </div>
          <div>
            <span>${sanitizeText(item.location || 'Location not provided')}</span>
            <small>${sanitizeText(item.source || 'Source not provided')}</small>
          </div>
          <div class="admin-opportunity-actions">
            <button type="button" class="text-button" data-edit-opportunity="${item.id}">Edit</button>
            <button type="button" class="text-button" data-delete-opportunity="${item.id}">Delete</button>
          </div>
        </li>
      `).join('')
    : '<li><span>No additional opportunities have been added yet.</span></li>';

  list.querySelectorAll('[data-edit-opportunity]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-edit-opportunity');
      const item = getStoredOpportunityRecords().find((record) => String(record.id) === String(targetId));
      if (!item) return;
      const form = document.getElementById('opportunityAdminForm');
      if (!form) return;

      Object.entries(item).forEach(([key, value]) => {
        const field = form.elements.namedItem(key);
        if (!field) return;
        if (field.type === 'checkbox') {
          field.checked = Boolean(value);
        } else if (Array.isArray(value)) {
          field.value = value.join(', ');
        } else {
          field.value = value || '';
        }
      });

      const hiddenId = document.getElementById('opportunityFormId');
      if (hiddenId) hiddenId.value = item.id || '';
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.textContent = 'Update opportunity';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  list.querySelectorAll('[data-delete-opportunity]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-delete-opportunity');
      const records = getStoredOpportunityRecords().filter((record) => String(record.id) !== String(targetId));
      saveStoredOpportunityRecords(records);
      renderAdminOpportunityList();
      showToast('Opportunity removed from the admin list.');
    });
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
  const preferredUserId = localStorage.getItem('openfuture_selected_admin_user') || users.find((user) => user.role !== 'admin')?.id || users[0]?.id || '';
  const selectedUser = users.find((user) => user.id === preferredUserId) || users[0] || null;
  const adminFeed = readAssistantFeed();

  root.innerHTML = `
    <header class="site-header">
      <nav class="nav container" aria-label="Admin navigation">
        <a href="index.html" class="logo">Open Future<span>+</span></a>
        <div class="admin-actions">
          <button type="button" class="button secondary" data-whatsapp-button data-whatsapp-message="Hi Open Future+ admin team, I need support.">WhatsApp</button>
          <button type="button" class="button secondary" id="adminLogoutButton">Logout</button>
        </div>
      </nav>
    </header>

    <main class="section">
      <div class="container">
        <div class="dashboard-card admin-dashboard-shell">
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

          <div class="admin-layout">
            <div class="admin-user-rail">
              <div class="admin-rail-header">
                <h3>People</h3>
                <span>${users.length} records</span>
              </div>
              <ul class="admin-user-list">
                ${users.map((user) => `
                  <li>
                    <button type="button" class="admin-user-card ${selectedUser && user.id === selectedUser.id ? 'active' : ''}" data-user-id="${sanitizeText(user.id)}">
                      <div>
                        <strong>${sanitizeText(user.name)}</strong>
                        <span>${sanitizeText(user.email)}</span>
                      </div>
                      <div>
                        <span>${sanitizeText(formatPhoneForDisplay(user.phone))}</span>
                        <small>${sanitizeText(user.role === 'admin' ? 'Admin' : `Credit ${Number(user.points || 0)}`)}</small>
                      </div>
                    </button>
                  </li>
                `).join('')}
              </ul>
            </div>

            <aside class="admin-user-panel">
              ${selectedUser ? `
                <div class="admin-user-detail-head">
                  <p class="small-heading">PROFILE</p>
                  <h3>${sanitizeText(selectedUser.name)}</h3>
                </div>
                <div class="admin-detail-grid">
                  <div class="user-card">
                    <span>Email</span>
                    <strong>${sanitizeText(selectedUser.email || 'Information not provided')}</strong>
                  </div>
                  <div class="user-card">
                    <span>Phone</span>
                    <strong>${sanitizeText(formatPhoneForDisplay(selectedUser.phone))}</strong>
                  </div>
                  <div class="user-card">
                    <span>District</span>
                    <strong>${sanitizeText(selectedUser.district || 'Information not provided')}</strong>
                  </div>
                  <div class="user-card">
                    <span>School</span>
                    <strong>${sanitizeText(selectedUser.school || 'Information not provided')}</strong>
                  </div>
                  <div class="user-card">
                    <span>Role</span>
                    <strong>${sanitizeText(selectedUser.role || 'user')}</strong>
                  </div>
                  <div class="user-card">
                    <span>Credits</span>
                    <strong>${Number(selectedUser.points || 0)}</strong>
                  </div>
                </div>
                <div class="admin-detail-actions">
                  <button type="button" class="button primary" data-whatsapp-button data-whatsapp-message="Hi ${sanitizeText(selectedUser.name)}, I am contacting you from Open Future+.">WhatsApp ${sanitizeText(selectedUser.name)}</button>
                  <button type="button" class="button secondary" data-admin-message-target="${sanitizeText(selectedUser.id)}">Send a message</button>
                </div>
              ` : '<p>No user selected.</p>'}
            </aside>
          </div>

          <div class="assistant-admin-panel">
            <div class="assistant-admin-header">
              <div>
                <p class="small-heading">ASSISTANT FEED</p>
                <h3>Promoted assistant messages</h3>
              </div>
            </div>
            <div class="assistant-feed-list">
              ${adminFeed.length ? adminFeed.map((entry) => `
                <div class="assistant-feed-item">
                  <strong>${sanitizeText(entry.author || 'Open Future+ Admin')}</strong>
                  <span>${sanitizeText(entry.text)}</span>
                  <small>${new Date(entry.createdAt || Date.now()).toLocaleString()}</small>
                </div>
              `).join('') : `<div class="assistant-feed-item empty"><span>No messages yet. Add one for the user-facing assistant.</span></div>`}
            </div>
            <form id="assistantAdminForm" class="assistant-admin-form">
              <textarea id="assistantAdminMessage" rows="3" placeholder="Write a message for the assistant to show users..."></textarea>
              <div class="admin-actions">
                <button type="submit" class="button primary">Send to assistant</button>
              </div>
            </form>
          </div>

          <div class="admin-list-wrap">
            <h3>Add more opportunities</h3>
            <form id="opportunityAdminForm" class="opportunity-admin-form">
              <input type="hidden" id="opportunityFormId" name="id" />
              <div class="opportunity-admin-grid">
                <label><span>Title</span><input name="title" type="text" required /></label>
                <label><span>Company / Provider</span><input name="company" type="text" /></label>
                <label><span>Location</span><input name="location" type="text" /></label>
                <label><span>Province</span><input name="province" type="text" /></label>
                <label><span>City</span><input name="city" type="text" /></label>
                <label><span>Suburb</span><input name="suburb" type="text" /></label>
                <label><span>Category</span><input name="category" type="text" /></label>
                <label><span>Career field</span><input name="careerField" type="text" /></label>
                <label><span>Job type</span><input name="jobType" type="text" /></label>
                <label><span>Closing date</span><input name="closingDate" type="date" /></label>
                <label><span>Salary</span><input name="salary" type="text" /></label>
                <label><span>Stipend</span><input name="stipend" type="text" /></label>
                <label><span>Number of positions</span><input name="positions" type="text" /></label>
                <label><span>Date posted</span><input name="datePosted" type="date" /></label>
                <label><span>Application URL</span><input name="applicationUrl" type="url" placeholder="https://example.com/apply" /></label>
                <label><span>Original source URL</span><input name="sourceUrl" type="url" placeholder="https://example.com/source" /></label>
                <label><span>Source</span><input name="source" type="text" placeholder="DPSA, Company Careers, etc." /></label>
              </div>
              <div class="opportunity-admin-grid large">
                <label><span>Description</span><textarea name="description"></textarea></label>
                <label><span>Requirements</span><textarea name="requirements"></textarea></label>
                <label><span>Important notes</span><textarea name="importantNotes"></textarea></label>
              </div>
              <div class="opportunity-admin-checks">
                <label><input name="verified" type="checkbox" /> Verified</label>
                <label><input name="remote" type="checkbox" /> Remote</label>
                <label><input name="southAfricaWide" type="checkbox" /> South Africa-wide</label>
              </div>
              <div class="admin-actions">
                <button type="submit" class="button">Save opportunity</button>
                <button type="button" class="button secondary" id="resetOpportunityForm">Reset</button>
              </div>
            </form>

            <div class="admin-list-wrap">
              <h4>Added opportunities</h4>
              <ul id="adminOpportunityList" class="admin-user-list"></ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;

  const userButtons = root.querySelectorAll('.admin-user-card');
  userButtons.forEach((button) => {
    button.addEventListener('click', () => {
      localStorage.setItem('openfuture_selected_admin_user', button.dataset.userId);
      renderAdminPage();
    });
  });

  const messageTargetButtons = root.querySelectorAll('[data-admin-message-target]');
  messageTargetButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const messageField = document.getElementById('assistantAdminMessage');
      if (!messageField) return;
      const targetName = users.find((entry) => entry.id === button.dataset.adminMessageTarget)?.name || 'student';
      messageField.value = `Reply to ${targetName}: `;
      messageField.focus();
    });
  });

  const assistantAdminForm = document.getElementById('assistantAdminForm');
  if (assistantAdminForm) {
    assistantAdminForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const field = document.getElementById('assistantAdminMessage');
      const value = field?.value.trim();
      if (!value) {
        showToast('Write a message before sending it to the assistant.');
        return;
      }
      addAssistantFeedEntry(value, ADMIN_NAME);
      field.value = '';
      renderAdminPage();
      showToast('Message shared with the user assistant.');
    });
  }

  root.querySelectorAll('[data-whatsapp-button]').forEach((button) => {
    const message = button.getAttribute('data-whatsapp-message') || 'Hi Open Future+, I would like to learn more.';
    button.addEventListener('click', () => openWhatsApp(message));
  });

  renderAdminOpportunityList();

  const form = document.getElementById('opportunityAdminForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const serialized = Object.fromEntries(formData.entries());
      const payload = {
        id: serialized.id || `opportunity-${Date.now()}`,
        title: serialized.title || '',
        company: serialized.company || '',
        location: serialized.location || '',
        province: serialized.province || '',
        city: serialized.city || '',
        suburb: serialized.suburb || '',
        category: serialized.category || '',
        careerField: serialized.careerField || '',
        jobType: serialized.jobType || '',
        description: serialized.description || '',
        requirements: serialized.requirements || '',
        importantNotes: serialized.importantNotes || '',
        closingDate: serialized.closingDate || '',
        salary: serialized.salary || '',
        stipend: serialized.stipend || '',
        positions: serialized.positions || '',
        datePosted: serialized.datePosted || '',
        applicationUrl: serialized.applicationUrl || '',
        sourceUrl: serialized.sourceUrl || '',
        source: serialized.source || 'Source not provided',
        verified: form.querySelector('input[name="verified"]').checked,
        remote: form.querySelector('input[name="remote"]').checked,
        southAfricaWide: form.querySelector('input[name="southAfricaWide"]').checked,
        type: serialized.jobType || serialized.category || 'Opportunity'
      };

      if (!payload.title) {
        showToast('A title is required for each opportunity.');
        return;
      }

      const existing = getStoredOpportunityRecords();
      const index = existing.findIndex((item) => String(item.id) === String(payload.id));
      if (index >= 0) {
        existing[index] = { ...existing[index], ...payload };
      } else {
        existing.push(payload);
      }
      saveStoredOpportunityRecords(existing);
      form.reset();
      document.getElementById('opportunityFormId').value = '';
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.textContent = 'Save opportunity';
      renderAdminOpportunityList();
      showToast('Opportunity saved successfully.');
    });
  }

  const resetButton = document.getElementById('resetOpportunityForm');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      const form = document.getElementById('opportunityAdminForm');
      if (form) form.reset();
      const hiddenId = document.getElementById('opportunityFormId');
      if (hiddenId) hiddenId.value = '';
      const submitButton = form?.querySelector('button[type="submit"]');
      if (submitButton) submitButton.textContent = 'Save opportunity';
    });
  }

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
        <div class="message bot">${sanitizeText(getVisibleAssistantMessage())}</div>
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

const bindLocationSearchControls = () => {
  const suburbInput = document.getElementById('userSuburbInput');
  const cityInput = document.getElementById('userCityInput');
  const provinceInput = document.getElementById('userProvinceInput');
  const findButton = document.getElementById('findNearbyJobsButton');
  const browseButton = document.getElementById('browseAllOpportunitiesButton');

  if (!findButton || !browseButton) return;

  const runSearch = () => {
    renderNearByResults({
      suburb: suburbInput?.value || '',
      city: cityInput?.value || '',
      province: provinceInput?.value || ''
    });
  };

  findButton.addEventListener('click', runSearch);
  browseButton.addEventListener('click', () => {
    renderAllOpportunities();
    renderNearByResults({ suburb: '', city: '', province: '' });
    const jobSearch = document.getElementById('job-search');
    if (jobSearch) {
      jobSearch.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  [suburbInput, cityInput, provinceInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        runSearch();
      }
    });
  });
};

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
    renderMorePlaces();
    bindLocationSearchControls();
    bindOpportunityFinderControls();
    renderNearByResults({ suburb: '', city: '', province: '' });
    renderOpportunityFinderResults(readOpportunityFinderState());
    const jobDistanceFilter = document.getElementById('jobDistanceFilter');
    if (jobDistanceFilter) {
      jobDistanceFilter.addEventListener('change', renderJobListings);
    }
  }

  const detailModal = document.getElementById('opportunityDetailModal');
  if (detailModal) {
    detailModal.addEventListener('click', (event) => {
      if (event.target && event.target.dataset.closeDetail === 'true') {
        closeOpportunityDetailModal();
      }
    });

    const closeButton = detailModal.querySelector('.opportunity-detail-close');
    if (closeButton) {
      closeButton.addEventListener('click', closeOpportunityDetailModal);
    }
  }

  ensureDemoUsers();
  ensureThemeToggle();
  applyTheme(loadThemePreference());

  if (isAdminPage()) {
    protectAdminPage();
    renderAdminPage();
  } else {
    ensureLoginButton();
    setupAuthModal();
    setupDashboard();
    renderDashboard();
    setupDraggableAssistant();
  }
} catch {
  // access denied; stop execution
}
