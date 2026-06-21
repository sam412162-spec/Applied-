export type Platform = 'Indeed' | 'LinkedIn' | 'Google' | 'Twitter' | 'Reddit' | 'Glassdoor';

export interface Post {
  id: string;
  platform: Platform;
  title: string;
  source: string;
  description: string;
  url: string;
  postedAt: string;
  tags: string[];
  logo: string;
}

export const PLATFORM_COLORS: Record<Platform, string> = {
  Indeed: '#2164f3',
  LinkedIn: '#0077b5',
  Google: '#4285f4',
  Twitter: '#1da1f2',
  Reddit: '#ff4500',
  Glassdoor: '#0caa41',
};

export const PLATFORM_ICONS: Record<Platform, string> = {
  Indeed: 'briefcase',
  LinkedIn: 'logo-linkedin',
  Google: 'search',
  Twitter: 'logo-twitter',
  Reddit: 'logo-reddit',
  Glassdoor: 'star',
};

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    platform: 'Indeed',
    title: 'Senior React Native Developer',
    source: 'TechCorp · Cape Town, SA',
    description: 'Build cross-platform mobile apps using React Native and Expo. 3+ years experience required.',
    url: 'https://indeed.com',
    postedAt: '2h ago',
    tags: ['React Native', 'Expo', 'TypeScript'],
    logo: '💼',
  },
  {
    id: '2',
    platform: 'LinkedIn',
    title: 'Mobile App Developer — Remote',
    source: 'StartupHub · Remote',
    description: 'Join our growing team building next-gen fintech mobile experiences for African markets.',
    url: 'https://linkedin.com',
    postedAt: '5h ago',
    tags: ['Mobile', 'Fintech', 'Remote'],
    logo: '🔗',
  },
  {
    id: '3',
    platform: 'Google',
    title: 'UX Designer — Johannesburg',
    source: 'Design Studio · Johannesburg',
    description: 'We are looking for a creative UX designer passionate about mobile-first product design.',
    url: 'https://jobs.google.com',
    postedAt: '1d ago',
    tags: ['Design', 'UX', 'Figma'],
    logo: '🎨',
  },
  {
    id: '4',
    platform: 'Twitter',
    title: '#Hiring: Backend Engineer (Node.js)',
    source: '@TechRecruiterZA · Twitter',
    description: 'Exciting opportunity for a backend engineer to work on high-scale APIs. DM to apply! #jobs #tech #hiring',
    url: 'https://twitter.com',
    postedAt: '3h ago',
    tags: ['Node.js', 'Backend', '#Hiring'],
    logo: '🐦',
  },
  {
    id: '5',
    platform: 'Reddit',
    title: '[For Hire] Full Stack Dev — Open to offers',
    source: 'r/forhire · Reddit',
    description: 'Experienced full stack developer (React, Node, PostgreSQL). Available for freelance or full-time. Portfolio in comments.',
    url: 'https://reddit.com',
    postedAt: '6h ago',
    tags: ['React', 'Node', 'PostgreSQL'],
    logo: '🤝',
  },
  {
    id: '6',
    platform: 'Glassdoor',
    title: 'Product Manager — EdTech',
    source: 'EduTech Africa · Pretoria',
    description: 'Drive product vision for our e-learning platform reaching 500k+ students across Africa.',
    url: 'https://glassdoor.com',
    postedAt: '12h ago',
    tags: ['Product', 'EdTech', 'Strategy'],
    logo: '📋',
  },
  {
    id: '7',
    platform: 'Indeed',
    title: 'Data Analyst — Entry Level',
    source: 'DataCo · Durban',
    description: 'Perfect for graduates. Analyse sales and marketing data using Python and Tableau.',
    url: 'https://indeed.com',
    postedAt: '2d ago',
    tags: ['Python', 'Tableau', 'Entry Level'],
    logo: '📊',
  },
  {
    id: '8',
    platform: 'LinkedIn',
    title: 'DevOps Engineer — AWS',
    source: 'CloudSystems · Remote',
    description: 'Manage CI/CD pipelines, Kubernetes clusters, and AWS infrastructure for SaaS platform.',
    url: 'https://linkedin.com',
    postedAt: '8h ago',
    tags: ['AWS', 'Kubernetes', 'DevOps'],
    logo: '☁️',
  },
  {
    id: '9',
    platform: 'Google',
    title: 'Marketing Manager — Social Media',
    source: 'BrandAgency · Cape Town',
    description: 'Lead social media strategy and content creation for top South African consumer brands.',
    url: 'https://jobs.google.com',
    postedAt: '3d ago',
    tags: ['Marketing', 'Social Media', 'Content'],
    logo: '📣',
  },
  {
    id: '10',
    platform: 'Reddit',
    title: '[Hiring] WordPress Developer — Freelance',
    source: 'r/forhire · Reddit',
    description: 'Need a WordPress expert to rebuild our company website and integrate WooCommerce. Budget: R15k.',
    url: 'https://reddit.com',
    postedAt: '1d ago',
    tags: ['WordPress', 'WooCommerce', 'Freelance'],
    logo: '🌐',
  },
];
