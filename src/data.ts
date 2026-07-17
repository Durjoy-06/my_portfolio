// =============================================================
//  PORTFOLIO CONTENT — single source of truth
//  Edit this file to update all site content.
// =============================================================

export interface NavLink {
  id: string;
  label: string;
  number: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface ProjectLink {
  github: string;
  live: string | null;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  links: ProjectLink;
  image: string;
  featured: boolean;
  year: string;
}

export interface RecognitionEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  credentialUrl?: string;
}

export interface EducationEntry {
  title: string;
  institution: string;
  period: string;
  detail: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialUrl: string;
}

export interface Social {
  label: string;
  url: string;
  handle: string;
}

export const profile = {
  name: 'Durjoy Banik',
  firstName: 'Durjoy',
  role: 'AI/ML Engineer & Frontend Builder',
  tagline: 'Building practical AI products and polished digital experiences.',
  location: 'Sylhet, Bangladesh',
  availability: 'Available for select projects',
  currently: [
    'Training a RAG pipeline for research papers',
    'Building a multi-agent AI business assistant',
    'Experimenting with edge-deployed ML inference',
  ],
  email: 'durjoybanik06@gmail.com',
  resumeUrl: '#',
  portrait:
    'https://i.imgur.com/Q9rz4EE.jpeg',
};

export const nav = [
  { id: 'hero', label: 'Index', number: '00' },
  { id: 'about', label: 'About', number: '01' },
  { id: 'work', label: 'Projects', number: '02' },
  { id: 'experience', label: 'Recognition', number: '03' },
  { id: 'education', label: 'Education', number: '04' },
  { id: 'contact', label: 'Contact', number: '05' },
];

export const about = {
  bio: [
    '"I am a Computer Science undergraduate focused on the intersection of machine learning, data-driven systems, and clean architecture. I work best where engineering rigor meets analytical intent—building intelligent systems that feel deliberate down to the last line of code and the last performance optimization. For me, development is about turning complex data into functional, research-driven solutions.',
    'Currently, I am engineering AI-driven research solutions that bridge the gap between statistical theory and production. Previously, I architected scalable web platforms and data pipelines, shipping software designed to solve complex, real-world puzzles.',
    'I care about legibility: in interfaces, in code, and in process. I write less and ship more. I prefer sharp corners.',
  ],
  stats: [
    { value: '3.84', label: 'Current CGPA' },
    { value: '5+', label: 'Languages Mastered' },
    { value: '10+', label: 'Active Projects' },
    { value: 'Research', label: 'Driven Focus' },
  ],
};

export const skills = [
  {
    group: 'Languages',
    items: ['Python', 'C', 'C++', 'Java', 'SQL', 'R'],
  },
  {
    group: 'Frameworks & Web',
    items: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Django'],
  },
  {
    group: 'AI / ML',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'GenAI / RAG'],
  },
  {
    group: 'Tools & Infrastructure',
    items: ['PostgreSQL', 'Docker', 'Supabase', 'Git', 'Firebase'],
  },
];

export const projects = [
  {
  title: 'TalentHub BD',
  subtitle: 'Multi-sided Community & Engagement Platform',
  description:
    'A comprehensive, multi-sided ecosystem built to connect students, organizers, and communities through deliberate UI/UX design. Focused on a modular architecture, clean code practices, and high-fidelity interaction design to deliver seamless real-time data integration.',
  tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Framer Motion'],
  links: { 
    github: 'https://github.com/Durjoy-06/talent_hub',
    live: 'https://github.com/Durjoy-06/talent_hub' // Update this link when you deploy your live site
  },
  image:
    'https://i.imgur.com/x4E8ADT.jpeg',
  featured: true,
  year: '2026',
},
 {
  title: 'AI Code Debugger',
  subtitle: 'Intelligent Debugging Assistant',
  description:
    'A Streamlit-powered utility designed to streamline the debugging workflow. Users upload error screenshots, which are processed via the Gemini API to identify bugs, provide explanatory hints, and generate corrected code snippets. Features real-time spinners, environment-variable security, and seamless deployment.',
  tech: ['Python', 'Streamlit', 'Gemini API', 'Computer Vision'],
  links: { 
    github: 'https://github.com/Durjoy-06/Codedebugger', 
    live: 'https://github.com/Durjoy-06/Codedebugger' // Update with your Streamlit cloud URL
  },
  image:
    'https://i.imgur.com/3zP6IPg.png',
  featured: true,
  year: '2026',
},
  {
  title: 'Customer Churn Prediction System',
  subtitle: 'End-to-End Predictive Analytics Pipeline',
  description:
    'A robust end-to-end machine learning system built to predict customer attrition. Developed a comprehensive pipeline spanning data cleaning, exploratory data analysis (EDA), feature engineering, and hyperparameter tuning. Engineered to deliver actionable business intelligence by identifying high-risk customer segments with high predictive accuracy.',
  tech: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
  links: { 
    github: 'https://github.com/Durjoy-06/end-to-end-customer-churn-prediction-system', 
    live: 'https://github.com/Durjoy-06/end-to-end-customer-churn-prediction-system' // Update if deployed
  },
  image:
    'https://i.imgur.com/JIlbjkH.jpeg',
  featured: true,
  year: '2026',
},
  {
  title: 'Messi Legacy',
  subtitle: 'Career Analytics & Tribute Platform',
  description:
    'An interactive platform designed to visualize and archive the historical career milestones of Lionel Messi. Features a data-rich interface showcasing career statistics, championship history, and performance metrics, built with a focus on responsive UI/UX and clean data visualization.',
  tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  links: { 
    github: 'https://github.com/Durjoy-06/Messi-legacy', 
    live: 'https://messi-legacy-nu.vercel.app/' 
  },
  image:
    'https://i.imgur.com/CQpsJLQ.jpeg',
  featured: true,
  year: '2026',
},
 {
  title: 'COVID-19 Data Analysis',
  subtitle: 'Epidemiological Trend Visualization',
  description:
    'A data-driven analysis project focusing on the epidemiological trends of the COVID-19 pandemic. Utilized advanced data processing techniques to clean, analyze, and visualize global and regional infection data, translating complex statistics into clear, actionable insights through interactive dashboards.',
  tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
  links: { 
    github: 'https://github.com/Durjoy-06/Covid-analysis', 
    live: 'https://github.com/Durjoy-06/Covid-analysis' 
  },
  image:
    'https://i.imgur.com/rPsWtuS.jpeg',
  featured: true,
  year: '2026',
},
];

export const recognition = [
  {
    role: 'Finalist',
    company: 'The Infinity AI Buildfest 2026',
    period: '2026',
    location: 'Brac University, Dhaka',
    summary:
      'Selected as a finalist for designing a production-ready AI-native business assistant. Focused on multi-agent reasoning and multimodal data ingestion.',
    achievements: [
      'Architected a system to convert unstructured ledger images into structured financial data',
      'Implemented robust validation logic to ensure arithmetic precision in AI-generated outputs',
      'Optimized deployment via serverless edge functions for low-latency performance',
    ],
    credentialUrl: 'https://cloudcampbd.com/verify/d27661dad57bc648fcaa1a44',
  },
  {
    role: 'Delegate',
    company: 'Model United Nations (MUN)',
    period: '2026',
    location: 'Metropolitan University, Sylhet',
    summary:
      'Participated as a delegate of Maldives in formal diplomatic simulations. Developed high-level skills in negotiation, policy analysis, and complex problem-solving.',
    achievements: [
      'Collaborated in multi-stakeholder simulations to draft consensus-based resolutions',
      'Refined communication skills in high-pressure environments',
      'Analyzed geopolitical and social policy trends to inform debate strategies',
    ],
    credentialUrl: 'https://example.com/mun-certificate',
  },
  {
    role: 'Workshop Participant',
    company: 'Research Odyssey: Basic to Advanced ',
    period: '2026',
    location: 'Remote',
    summary:
      'Intensive research training organized by MUGAS and CTRP. Focused on academic methodology, data integrity, and publication standards.',
    achievements: [
      'Gained deep insights into research design and analytical frameworks',
      'Studied best practices for conducting comprehensive literature reviews and data synthesis',
      'Collaborated on interdisciplinary strategies for academic documentation and publication',
    ],
    credentialUrl: 'https://example.com/research-odyssey-certificate',
  },
];

export const education = [
  {
    title: 'B.Sc. Computer Science and Engineering',
    institution: 'Metropolitan University, Sylhet',
    period: '2023 — Present',
    detail: 'Current CGPA 3.84. Focus on AI/ML, Data-Driven Systems, and Algorithmic Foundations.',
  },
  {
    title: 'Higher Secondary Certificate (HSC)',
    institution: 'Dhaka College',
    period: '2020 — 2022',
    detail: 'GPA: 5.00. Focus on Science stream with advanced coursework in Mathematics and Physics.',
  },
];

export const certifications = [
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM',
    year: '2026',
    credentialUrl: 'https://www.credly.com/badges/7aa2a684-ae42-4891-959c-913dc8c0a3cf/linked_in_profile',
  },
  {
    title: 'Data Science & Machine Learning with Python',
    issuer: 'Ostad',
    year: '2026',
    credentialUrl: 'https://ostad.app/share/certificate/c39676-durjoy-banik',
  },
  {
    title: 'Intro to Machine Learning – Kaggle',
    issuer: 'Kaggle',
    year: '2026',
    credentialUrl: 'https://www.kaggle.com/learn/certification/durjoybanik/intro-to-machine-learning',
  },
];

export const socials = [
  { label: 'GitHub', url: 'https://github.com/Durjoy-06', handle: '@Durjoy-06' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/durjoy-banik06', handle: '/in/durjoy-banik06' },
  { label: 'X', url: 'https://x.com/durjoybanik06', handle: '@durjoybanik06' },
  { label: 'Email', url: 'mailto:durjoybanik06@gmail.com', handle: 'durjoybanik06@gmail.com' },
];
