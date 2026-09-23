// Single source of truth for site copy.
// Replace placeholders (marked TODO) with verified, disclosable information
// before shipping. Never invent metrics, client names or outcomes.

export const identity = {
  name: 'Jaimin Katva',
  title: 'Backend Engineer · Team Lead',
  roles: ['Backend Engineer', 'Team Lead'],
  brandSentence: 'I turn real business needs into reliable software systems.',
  linkedin: 'https://linkedin.com/in/jaiminkatva/',
  email: 'jaiminkatva@gmail.com',
  github: 'https://github.com/jaiminkatva',
};

export const hero = {
  kicker: 'BACKEND · ARCHITECTURE · PRODUCT',
  headline: 'I build reliable systems that power products.',
  sub: 'I turn business needs into reliable backend systems—from APIs and databases to deployment and production.',
  tags: ['Node.js', 'System Design', 'MongoDB', 'Docker', 'GIS'],
  ctaPrimary: { label: 'View selected work', href: '#work' },
  ctaSecondary: { label: "Let's work together", href: '#contact' },
};

export const about = {
  eyebrow: 'About',
  paragraphs: [
    "I'm Jaimin Katva, a Backend Engineer · Team Lead responsible for planning systems, building core services and guiding delivery from requirements to production.",
    'My experience comes from operational software: connecting sales and land records, automating HR workflows, serving map data and turning fragmented processes into usable products.',
    'I work by making the workflow explicit, choosing clear system boundaries and keeping implementation practical for the team that will run and extend it.',
  ],
  distinctive: [
    'Product decisions informed by technical constraints',
    'Connected workflows, data and system boundaries',
    'Deployment, observability and operational reliability',
    'Technical direction with hands-on delivery',
  ],
  motto: 'Understand the problem. Design clearly. Build carefully. Release. Learn. Improve.',
};

export const whyMe = {
  eyebrow: 'AI in the workflow',
  heading: 'AI accelerates the work. Engineering judgment directs it.',
  intro: 'I use AI for research, exploration and repetitive work. Architecture, validation and product decisions remain engineering responsibilities.',
};

export const capabilities = [
  {
    id: 'backend',
    title: 'Backend Systems',
    description: 'APIs, login and permissions, business rules and services that safely connect users, data and product features.',
  },
  {
    id: 'platforms',
    title: 'Business Platforms',
    description: 'CRM and internal tools that help teams manage customers, projects, records and daily operations in one place.',
  },
  {
    id: 'gis',
    title: 'GIS Applications',
    description: 'Interactive maps that show project locations, land layouts, construction data and other location-based information.',
  },
  {
    id: 'realtime',
    title: 'Real-Time Features',
    description: 'Live notifications, online status and instant updates using Socket.IO and Redis-based communication.',
  },
  {
    id: 'infra',
    title: 'Infrastructure',
    description: 'The servers and tools that keep software running reliably, including Docker, Nginx, PM2, Cloudflare and storage.',
  },
  {
    id: 'architecture',
    title: 'Technical Architecture',
    description: 'Planning how APIs, databases and application modules work together so the product stays clear and maintainable.',
  },
];

export const projects = [
  {
    id: 'real-estate-erp',
    index: '01',
    name: 'Real Estate Operations ERP',
    fullTitle: 'Enterprise Real Estate Operations & Sales ERP',
    category: 'Real-estate operations',
    summary:
      'Replaces disconnected project, sales and finance records with one operating workflow—from campaign lead assignment through buyer payments, expenses and partner tracking.',
    description:
      'A real-estate and land-development company needed project records, lead handling, buyer payments, expenses and partner activity to follow one traceable process. The ERP connects those workflows in a modular backend, giving operations and sales teams a shared source of truth from lead intake through financial tracking.',
    tags: ['Node.js', 'MongoDB', 'ERP', 'Automation'],
    allTags: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Automation', 'ERP Architecture'],
    usp: {
      title: 'Load-Based Lead Distribution',
      body: 'New sales leads are assigned automatically based on each employee’s current workload, reducing manual work and helping the team share leads fairly.',
    },
    role: ['Project Planning', 'System Architecture', 'Backend Development', 'API Design', 'Business Logic', 'Deployment'],
    modules: ['Projects & legal records', 'Survey records', 'Buyer accounts & payments', 'Campaign lead generation', 'Site & office expenses', 'Funds, brokers & land partners'],
    caseStudy: {
      problem: 'Land records, sales, payments, brokers and site work were part of one business process but difficult to manage when handled in separate places.',
      architecture: 'The backend is divided into clear business modules for projects, sales, finance and partners. REST APIs connect those modules, while MongoDB stores their related records.',
      challenge: 'Assigning new sales leads fairly while considering how many active leads each employee already manages.',
      solution: 'When a new lead arrives, the system checks employee workloads and assigns it automatically. The same record is then used for follow-up and sales tracking.',
      workflow: ['Set up projects and business records', 'Collect leads from sales campaigns', 'Assign leads based on employee workload', 'Track buyers, payments and expenses', 'Manage brokers, funds and land partners'],
      outcome: 'Teams can manage project, sales and finance work in one connected system, while lead assignment happens automatically.',
    },
    featured: true,
  },
  {
    id: 'bit-hrms',
    index: '02',
    name: 'BIT HRMS',
    fullTitle: 'Automated HR, Attendance & Payroll Management',
    category: 'Workforce automation',
    summary:
      'Turns recurring HR administration into a rules-driven workflow connecting shifts, attendance, leave, payroll inputs and employee documents.',
    description:
      'HR teams were repeatedly applying the same shift, leave and payroll rules across employee records. The HRMS stores those policies as reusable configuration, connects daily attendance and approval workflows, and turns the resulting data into payroll inputs and generated documents.',
    tags: ['HRMS', 'Payroll', 'Attendance', 'Automation'],
    allTags: ['HR Automation', 'Attendance', 'Payroll', 'Workflow Engine', 'Document Generation', 'REST APIs'],
    usp: {
      title: 'Configure Once. Automate Daily.',
      body: 'HR sets shift, leave and payroll rules once. The system then applies those rules during everyday work, reducing repeated administration.',
    },
    role: ['System Planning', 'Backend Architecture', 'API Development', 'Automation Logic', 'Workflow Design'],
    modules: ['Shift configuration', 'Leave policies', 'Attendance rules', 'Payroll settings', 'Employee self-service', 'Dynamic document generation'],
    caseStudy: {
      problem: 'Attendance, leave and payroll require repeated work when HR staff must apply the same company policies manually for every employee and pay cycle.',
      architecture: 'Company policies are stored as reusable rules behind an API. Check-ins and leave requests update attendance records, which can then be used in payroll processing.',
      challenge: 'Automating daily HR work while still giving administrators control over company rules and exceptions.',
      solution: 'Shift, leave, attendance and payroll settings are saved as reusable configurations. Document templates also use current employee information from the HRMS database.',
      workflow: ['Set company policies and shifts', 'Employees check in and check out', 'Submit and review leave requests', 'Use attendance records for payroll', 'Generate employee documents from templates'],
      outcome: 'HR manages rules in one place, employees complete simple daily actions and the platform connects those records to payroll and documents.',
    },
    featured: false,
  },
  {
    id: 'gis-tile-server',
    index: '03',
    name: 'GIS Tile Server',
    fullTitle: 'Self-Service GIS Tile Infrastructure',
    category: 'Mapping infrastructure',
    summary:
      'Removes the GIS publishing bottleneck by turning uploaded MBTiles datasets into reusable tile endpoints ready for MapLibre applications.',
    description:
      'Publishing prepared geographic data into a web product required specialist infrastructure and repeated setup. This service validates uploaded MBTiles, exposes the dataset through reusable tile endpoints and gives application teams a direct path from map file to a working MapLibre layer.',
    tags: ['GIS', 'MBTiles', 'MapLibre', 'Tile Server'],
    allTags: ['GIS', 'MBTiles', 'MapLibre', 'Tile Serving', 'Node.js', 'Mapping Infrastructure'],
    usp: {
      title: 'Upload → Generate → Integrate',
      body: 'Upload an MBTiles map file, receive a reusable tile URL and connect it to any compatible mapping application.',
    },
    role: ['Architecture', 'Tile Processing', 'Backend Development', 'API Design', 'GIS Integration', 'Deployment'],
    modules: ['MBTiles upload', 'Dataset processing', 'Tile endpoint generation', 'Reusable tile delivery', 'MapLibre integration', 'Deployment workflow'],
    caseStudy: {
      problem: 'Product teams needed a simple way to turn prepared map data into web-map layers without managing a complex GIS publishing process.',
      architecture: 'The platform accepts and processes MBTiles files. A tile-serving API then makes the map data available through URLs that compatible map clients can request.',
      challenge: 'Connecting a packaged geographic dataset to the URL format expected by interactive web maps.',
      solution: 'The platform provides one clear flow: upload the file, process its tiles and return a URL ready for MapLibre or another compatible client.',
      workflow: ['Upload an MBTiles map file', 'Validate and process its tile data', 'Generate a reusable tile URL', 'Connect the URL to MapLibre', 'Show the map layer in the application'],
      outcome: 'Application teams can move from a map file to a working web-map layer without handling the full GIS publishing process themselves.',
    },
    featured: false,
  },
  {
    id: 'real-estate-construction-gis',
    index: '04',
    name: 'Real Estate & Construction GIS',
    fullTitle: 'GIS-Powered Real Estate & Construction Visualization',
    category: 'Map-based insights',
    summary:
      'Connects project layouts, real locations and construction progress in one interactive view, replacing the ambiguity of separate static plans.',
    description:
      'Project layouts, location context and construction updates were difficult to understand across separate static documents. The platform positions layouts on real maps, connects areas to operational data and gives clients, sales teams and project stakeholders one interactive view of place and progress.',
    tags: ['GIS', 'Real Estate', 'Construction', 'Visualization'],
    allTags: ['GIS', 'MapLibre', 'MBTiles', 'Real Estate', 'Construction', 'ERP Visualization'],
    usp: {
      title: 'Business Data + Geographic Context',
      body: 'Combines project plans and business data with real map locations, making the information easier to explore, understand and present.',
    },
    role: ['Product Planning', 'GIS Architecture', 'API Development', 'Map Integration', 'Business Workflow Design'],
    modules: ['Geographic project layouts', 'Interactive map layers', 'Land-banking views', 'Construction layouts', 'Area-based progress', 'Operational data overlays'],
    caseStudy: {
      problem: 'Static brochures and plans do not clearly show where a project is located, how its layout is organized or how it relates to the surrounding area.',
      architecture: 'MapLibre displays the interactive map, MBTiles provides the project layouts and business APIs connect each map area with relevant project information.',
      challenge: 'Making detailed map data easy for people without GIS experience while still supporting real-estate and construction work.',
      solution: 'Project layouts are placed on real geographic maps and connected with the business or progress information related to each area.',
      workflow: ['Publish the project layout as map tiles', 'Place it in its real geographic location', 'Connect project and business data', 'Link progress updates to construction areas', 'Present one combined view to stakeholders'],
      outcome: 'Clients and teams can explore land, layouts and construction progress in one interactive map instead of interpreting separate static plans.',
    },
    featured: false,
  },
];

export const engineeringPhilosophy = {
  eyebrow: 'Engineering Approach',
  heading: 'I design the system around the problem it needs to solve.',
  intro:
    'Good engineering starts before coding. I first understand the people, process and goal, then choose a structure that works today and can grow with the product.',
  steps: [
    { key: 'understand', label: 'Understand', detail: 'Learn the business goal, the users, their workflow and any limits.' },
    { key: 'architect', label: 'Design', detail: 'Plan the modules, database, APIs and how each part works together.' },
    { key: 'build', label: 'Build', detail: 'Write clear, maintainable code using consistent patterns.' },
    { key: 'test', label: 'Test', detail: 'Check the main user flows, unusual cases and possible failures.' },
    { key: 'deploy', label: 'Release', detail: 'Prepare servers, storage, networking and processes for real users.' },
    { key: 'improve', label: 'Improve', detail: 'Use feedback to fix, simplify and extend the system over time.' },
  ],
};

export const stack = [
  { group: 'Backend', items: ['Node.js', 'Express.js', 'JavaScript', 'REST APIs', 'Socket.IO', 'Git / GitHub', 'Postman'] },
  { group: 'Data', items: ['MongoDB', 'Mongoose', 'Redis', 'SQL', 'PostgreSQL'] },
  { group: 'Infrastructure', items: ['Docker', 'Nginx', 'PM2', 'VPS', 'Cloudflare', 'AWS S3'] },
  { group: 'Geospatial', items: ['MapTiler', 'MBTiles', 'GIS applications'] },
  { group: 'Product', items: ['React', 'MERN ecosystem'] },
];

export const experience = {
  eyebrow: 'Experience',
  role: 'Backend Engineer & Team Lead',
  badge: 'Founding Engineer',
  company: 'Build India Technolab',
  period: 'TODO: confirm dates', // TODO: confirm exact tenure
  summary:
    'My work covers the full technical journey: understanding requirements, planning the system, building APIs and databases, deploying services and guiding the engineering team. I connect product needs with practical technical decisions.',
};

export const leadership = {
  items: [
    'Backend planning and API design',
    'Database design around business workflows',
    'Project structure and coding standards',
    'Production deployment and infrastructure',
    'Code review and quality direction',
    'Architecture and technical decisions',
    'Team coordination and engineer support',
    'Requirements translated into delivery plans',
  ],
};

export const services = [
  {
    id: 'backend-dev',
    title: 'Backend Development',
    description: 'Building the APIs, login systems, business rules and integrations that power a product.',
  },
  {
    id: 'system-architecture',
    title: 'System Architecture',
    description: 'Planning how the application, database and APIs fit together so the system stays maintainable.',
  },
  {
    id: 'business-apps',
    title: 'Business Applications',
    description: 'Creating CRM, dashboard and internal tools around the way your team actually works.',
  },
  {
    id: 'gis-mapping',
    title: 'GIS & Mapping',
    description: 'Building interactive maps for locations, land layouts, projects and geographic data.',
  },
  {
    id: 'deployment-infra',
    title: 'Deployment & Infrastructure',
    description: 'Preparing servers, deployment processes, storage and production environments for reliable releases.',
  },
  {
    id: 'tech-leadership',
    title: 'Technical Leadership',
    description: 'Guiding technical decisions, reviewing work and turning product goals into clear engineering plans.',
  },
];

export const contact = {
  eyebrow: 'Contact',
  heading: 'Have a system to build?',
  body: 'If you are planning a product, improving an existing system or trying to simplify a difficult business process, I would be happy to understand the problem and explore a practical solution.',
  ctaLabel: "Let's discuss your project.",
};
