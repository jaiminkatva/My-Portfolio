// Single source of truth for site copy.
// Replace placeholders (marked TODO) with verified, disclosable information
// before shipping. Never invent metrics, client names or outcomes.

export const identity = {
  name: 'Jaimin Katva',
  roles: ['Backend Engineer', 'Team Lead', 'Product Builder'],
  brandSentence: 'I turn real business needs into reliable software systems.',
  linkedin: 'https://linkedin.com/in/jaiminkatva/',
  email: null, // TODO: add public email
  github: null, // TODO: add GitHub profile
};

export const hero = {
  kicker: 'Backend Engineer · Team Lead · Product Builder',
  headline: 'I build reliable systems that power products.',
  sub: 'I turn business needs into secure, scalable backend systems—from APIs and databases to deployment and ongoing improvement.',
  tags: ['Node.js', 'System Design', 'MongoDB', 'Docker', 'GIS'],
  ctaPrimary: { label: 'View selected work', href: '#work' },
  ctaSecondary: { label: "Let's work together", href: '#contact' },
};

export const about = {
  eyebrow: 'About',
  paragraphs: [
    "I'm Jaimin Katva, a backend engineer and Team Lead. I plan and build the technical systems that make digital products work—from the first idea to a production release.",
    'My main tools are Node.js, Express.js and MongoDB. I also work with real-time communication, cloud storage, deployment infrastructure and GIS mapping applications.',
    'Most of my experience comes from solving real business problems: managing customers and leads, organizing land and project records, automating HR work, processing orders and presenting data on maps.',
    'I enjoy taking a complicated process, breaking it into clear parts and building software that people can use, maintain and improve over time.',
  ],
  distinctive: [
    'Backend engineering with product understanding',
    'System planning and hands-on development',
    'Deployment and infrastructure experience',
    'Independent work and team leadership',
    'Software built for real business use',
  ],
  motto: 'Understand the problem. Design clearly. Build carefully. Release. Learn. Improve.',
};

export const whyMe = {
  eyebrow: 'Why Me',
  heading: 'AI accelerates the work. Thinking directs it.',
  intro:
    'Technology changes quickly, but the fundamentals remain the same: understand the problem, think critically and design the right solution.',
  paragraphs: [
    'I use AI for research, exploration, productivity and repetitive work. I do not treat generated output as the final answer—I question it, validate it and adapt it to the real problem.',
    'My process starts before the code. I study the workflow, find the friction, visualize how the system should behave and plan how each part should work together.',
    'This approach guides everything I build, from enterprise ERP and HR automation to GIS infrastructure and real-estate platforms.',
  ],
  statement: {
    lead: 'AI helps me move faster.',
    close: 'Thinking helps me move in the right direction.',
  },
  attributes: [
    { key: 'problem', title: 'Problem Solver', description: 'I focus on understanding the real problem before choosing an implementation.' },
    { key: 'system', title: 'System Thinker', description: 'I design complete workflows and architecture, not isolated features.' },
    { key: 'ai', title: 'AI-Enabled Engineer', description: 'I use modern tools to increase speed without giving up judgment or quality.' },
    { key: 'user', title: 'User-Focused Builder', description: 'I measure a solution by how useful it is to the people who depend on it.' },
  ],
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
      'One business management system for real-estate projects, land records, sales leads, buyers, payments, expenses, brokers and partners.',
    description:
      'An ERP—a central business management system—built for a real-estate and land-development company. It brings project records, sales, finance, brokers and site operations into one connected platform.',
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
      'An HR management system connecting attendance, shifts, leave and payroll, with reusable company rules and automatic employee documents.',
    description:
      'An HRMS—Human Resource Management System—where HR teams set company rules once, and the platform uses them to manage everyday employee tasks with less manual work.',
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
      'A self-service tool that turns uploaded MBTiles map files into URLs that MapLibre and other mapping applications can use.',
    description:
      'A GIS mapping platform that makes it easier to publish custom map layouts and use them inside web applications.',
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
      'An interactive map platform that combines project layouts, real-world location and construction progress in one clear view.',
    description:
      'A map-based platform that helps clients, sales teams and project stakeholders understand land, layouts and construction information visually.',
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
  { group: 'Backend', items: ['Node.js', 'Express.js', 'JavaScript', 'REST APIs'] },
  { group: 'Data', items: ['MongoDB', 'Mongoose', 'Redis'] },
  { group: 'Real-Time', items: ['Socket.IO'] },
  { group: 'Infrastructure', items: ['Docker', 'Nginx', 'PM2', 'VPS', 'Cloudflare'] },
  { group: 'Cloud & Storage', items: ['AWS S3'] },
  { group: 'Geospatial', items: ['MapTiler', 'MBTiles', 'GIS applications'] },
  { group: 'Development', items: ['Git / GitHub', 'Postman'] },
  { group: 'Frontend Awareness', items: ['React', 'MERN ecosystem'] },
];

export const experience = {
  eyebrow: 'Experience',
  role: 'Founding Engineer, Backend Engineer & Team Lead',
  company: 'Build India Technolab',
  period: 'TODO: confirm dates', // TODO: confirm exact tenure
  summary:
    'My work covers the full technical journey: understanding requirements, planning the system, building APIs and databases, deploying services and guiding the engineering team. I connect product needs with practical technical decisions.',
};

export const leadership = {
  eyebrow: 'Ownership',
  heading: 'From implementation to ownership',
  intro:
    'My responsibility goes beyond writing backend code. I help shape the architecture, deployment setup, technical decisions and team workflow. I care about both reliable software and a clear way of building it.',
  items: [
    'Planning backend systems and APIs',
    'Designing databases around business workflows',
    'Defining project structure and coding standards',
    'Setting up servers and production deployments',
    'Reviewing code and making technical decisions',
    'Coordinating work and supporting engineers',
    'Turning business needs into clear technical tasks',
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
    title: 'Deployment & Infra',
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
