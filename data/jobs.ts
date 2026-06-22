export type Platform = 'Indeed' | 'LinkedIn' | 'Google Jobs' | 'Glassdoor' | 'Twitter/X' | 'Reddit' | 'Website' | 'Public Board';
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship' | 'Remote';
export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';

export interface Job {
  id: string;
  platform: Platform;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salary?: string;
  description: string;
  requirements: string[];
  tags: string[];
  url: string;
  postedAt: string;
  logo: string;
  saved?: boolean;
  applied?: boolean;
}

export const PLATFORM_COLORS: Record<Platform, string> = {
  'Indeed': '#2164f3',
  'LinkedIn': '#0077b5',
  'Google Jobs': '#4285f4',
  'Glassdoor': '#0caa41',
  'Twitter/X': '#000000',
  'Reddit': '#ff4500',
  'Website': '#7c3aed',
  'Public Board': '#f59e0b',
};

export const PLATFORM_ICONS: Record<Platform, string> = {
  'Indeed': 'briefcase',
  'LinkedIn': 'logo-linkedin',
  'Google Jobs': 'search',
  'Glassdoor': 'star',
  'Twitter/X': 'logo-twitter',
  'Reddit': 'logo-reddit',
  'Website': 'globe-outline',
  'Public Board': 'clipboard-outline',
};

export const JOB_TYPE_COLORS: Record<JobType, string> = {
  'Full-time': '#059669',
  'Part-time': '#0284c7',
  'Contract': '#7c3aed',
  'Freelance': '#f59e0b',
  'Internship': '#db2777',
  'Remote': '#16a34a',
};

export const ALL_PLATFORMS: Platform[] = [
  'Indeed', 'LinkedIn', 'Google Jobs', 'Glassdoor', 'Twitter/X', 'Reddit', 'Website', 'Public Board'
];

export const ALL_JOB_TYPES: JobType[] = [
  'Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote'
];

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    platform: 'Indeed',
    title: 'Senior React Native Developer',
    company: 'TechCorp',
    location: 'Cape Town, SA',
    remote: false,
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    salary: 'R65k – R85k/month',
    description: 'Build cross-platform mobile apps using React Native and Expo for millions of users. You will own key features end-to-end, from design to deployment.',
    requirements: ['3+ years React Native', 'TypeScript', 'REST APIs', 'Git'],
    tags: ['React Native', 'Expo', 'TypeScript'],
    url: 'https://indeed.com/jobs',
    postedAt: '2h ago',
    logo: '💼',
  },
  {
    id: '2',
    platform: 'LinkedIn',
    title: 'Mobile App Developer',
    company: 'StartupHub',
    location: 'Remote',
    remote: true,
    jobType: 'Remote',
    experienceLevel: 'Mid',
    salary: 'R45k – R60k/month',
    description: 'Join our growing team building next-gen fintech mobile experiences for African markets. Fully remote with flexible hours.',
    requirements: ['React Native', 'Node.js', 'PostgreSQL'],
    tags: ['Mobile', 'Fintech', 'Remote'],
    url: 'https://linkedin.com/jobs',
    postedAt: '5h ago',
    logo: '🔗',
  },
  {
    id: '3',
    platform: 'Google Jobs',
    title: 'UX/UI Designer',
    company: 'Design Studio',
    location: 'Johannesburg, SA',
    remote: false,
    jobType: 'Full-time',
    experienceLevel: 'Mid',
    salary: 'R35k – R50k/month',
    description: 'We are looking for a creative UX designer passionate about mobile-first product design with a strong portfolio.',
    requirements: ['Figma', '3+ years UX', 'User Research', 'Prototyping'],
    tags: ['Design', 'UX', 'Figma'],
    url: 'https://jobs.google.com',
    postedAt: '1d ago',
    logo: '🎨',
  },
  {
    id: '4',
    platform: 'Twitter/X',
    title: 'Backend Engineer (Node.js)',
    company: 'TechRecruiterZA',
    location: 'Remote',
    remote: true,
    jobType: 'Contract',
    experienceLevel: 'Mid',
    salary: 'R500 – R700/hour',
    description: 'Exciting opportunity for a backend engineer to work on high-scale APIs processing 10M+ daily requests. Contract initially with perm option.',
    requirements: ['Node.js', 'AWS', 'Docker', 'MongoDB'],
    tags: ['Node.js', 'Backend', 'API'],
    url: 'https://twitter.com',
    postedAt: '3h ago',
    logo: '⚡',
  },
  {
    id: '5',
    platform: 'Reddit',
    title: 'WordPress Developer',
    company: 'Local Agency',
    location: 'Remote',
    remote: true,
    jobType: 'Freelance',
    experienceLevel: 'Entry',
    salary: 'R15,000 (project)',
    description: 'Need a WordPress expert to rebuild our company website and integrate WooCommerce. One-time project with potential for ongoing work.',
    requirements: ['WordPress', 'WooCommerce', 'PHP', 'CSS'],
    tags: ['WordPress', 'WooCommerce', 'Freelance'],
    url: 'https://reddit.com/r/forhire',
    postedAt: '1d ago',
    logo: '🌐',
  },
  {
    id: '6',
    platform: 'Glassdoor',
    title: 'Product Manager — EdTech',
    company: 'EduTech Africa',
    location: 'Pretoria, SA',
    remote: false,
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    salary: 'R70k – R95k/month',
    description: 'Drive product vision for our e-learning platform reaching 500k+ students across Africa. Lead cross-functional teams in an agile environment.',
    requirements: ['5+ years PM', 'Agile/Scrum', 'Data Analysis', 'EdTech experience'],
    tags: ['Product', 'EdTech', 'Strategy'],
    url: 'https://glassdoor.com/jobs',
    postedAt: '12h ago',
    logo: '📋',
  },
  {
    id: '7',
    platform: 'Indeed',
    title: 'Data Analyst',
    company: 'DataCo',
    location: 'Durban, SA',
    remote: false,
    jobType: 'Full-time',
    experienceLevel: 'Entry',
    salary: 'R20k – R30k/month',
    description: 'Perfect for graduates. Analyse sales and marketing data to drive business decisions using Python and Tableau.',
    requirements: ['Python', 'SQL', 'Tableau', 'Excel'],
    tags: ['Python', 'Tableau', 'Entry Level'],
    url: 'https://indeed.com/jobs',
    postedAt: '2d ago',
    logo: '📊',
  },
  {
    id: '8',
    platform: 'LinkedIn',
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    location: 'Remote',
    remote: true,
    jobType: 'Remote',
    experienceLevel: 'Senior',
    salary: 'R75k – R100k/month',
    description: 'Manage CI/CD pipelines, Kubernetes clusters, and AWS infrastructure for a fast-growing SaaS platform serving enterprise clients.',
    requirements: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    tags: ['AWS', 'Kubernetes', 'DevOps'],
    url: 'https://linkedin.com/jobs',
    postedAt: '8h ago',
    logo: '☁️',
  },
  {
    id: '9',
    platform: 'Website',
    title: 'Frontend Developer',
    company: 'FinServe',
    location: 'Sandton, SA',
    remote: false,
    jobType: 'Full-time',
    experienceLevel: 'Mid',
    salary: 'R50k – R70k/month',
    description: 'Join South Africa\'s leading fintech company to build customer-facing web applications used by millions of South Africans.',
    requirements: ['React', 'TypeScript', 'CSS', 'Testing'],
    tags: ['React', 'Fintech', 'Frontend'],
    url: 'https://example.com/careers',
    postedAt: '4h ago',
    logo: '💻',
  },
  {
    id: '10',
    platform: 'Public Board',
    title: 'Graduate Internship Programme',
    company: 'SA Government Dept. of Labour',
    location: 'Nationwide, SA',
    remote: false,
    jobType: 'Internship',
    experienceLevel: 'Entry',
    salary: 'R6,000 – R8,000/month',
    description: 'Government-funded 12-month internship programme for recent graduates across all disciplines. Applications open nationwide.',
    requirements: ['Matric certificate', 'SA Citizen', 'Relevant Degree/Diploma'],
    tags: ['Government', 'Graduate', 'Internship'],
    url: 'https://dpsa.gov.za',
    postedAt: '3d ago',
    logo: '🏛️',
  },
  {
    id: '11',
    platform: 'Google Jobs',
    title: 'Social Media Manager',
    company: 'BrandAgency',
    location: 'Cape Town, SA',
    remote: false,
    jobType: 'Full-time',
    experienceLevel: 'Mid',
    salary: 'R30k – R45k/month',
    description: 'Lead social media strategy and content creation for top South African consumer brands with a combined following of 5M+.',
    requirements: ['Social Media Strategy', 'Content Creation', 'Analytics', 'Copywriting'],
    tags: ['Marketing', 'Social Media', 'Content'],
    url: 'https://jobs.google.com',
    postedAt: '3d ago',
    logo: '📣',
  },
  {
    id: '12',
    platform: 'Indeed',
    title: 'Cybersecurity Analyst',
    company: 'SecureNet',
    location: 'Johannesburg, SA',
    remote: true,
    jobType: 'Full-time',
    experienceLevel: 'Mid',
    salary: 'R55k – R75k/month',
    description: 'Protect critical infrastructure by monitoring, detecting, and responding to security threats. Work with a world-class team in a high-impact role.',
    requirements: ['SIEM tools', 'Incident Response', 'CISSP or similar', 'Networking'],
    tags: ['Security', 'Cyber', 'InfoSec'],
    url: 'https://indeed.com/jobs',
    postedAt: '6h ago',
    logo: '🔐',
  },
];
