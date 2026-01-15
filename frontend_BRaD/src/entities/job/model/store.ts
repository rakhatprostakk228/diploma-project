import { create } from 'zustand';
import { Job, JobFilters } from './types';

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    companyLogo: '/images/companies/default_company.jpg',
    type: 'Full-time',
    location: 'Remote',
    salary: '$80k - $120k',
    description: 'We are looking for an experienced Frontend Developer to join our team...',
    requirements: ['React', 'TypeScript', '5+ years experience'],
    tags: ['React', 'TypeScript', 'Next.js', 'Remote'],
    status: 'active',
    postedAt: '2024-01-15',
    applicationsCount: 24,
    employerId: 'emp1',
  },
  {
    id: '2',
    title: 'UX/UI Design Intern',
    company: 'DesignStudio',
    companyLogo: '/images/companies/default_company.jpg',
    type: 'Internship',
    location: 'Remote',
    salary: '$2k - $3k/month',
    description: 'Join our design team as an intern and work on exciting projects...',
    requirements: ['Figma', 'Design thinking', 'Portfolio'],
    tags: ['Design', 'Figma', 'UI/UX', 'Remote'],
    status: 'active',
    postedAt: '2024-01-14',
    applicationsCount: 18,
    employerId: 'emp2',
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'CloudTech',
    companyLogo: '/images/companies/default_company.jpg',
    type: 'Full-time',
    location: 'San Francisco, CA',
    salary: '$100k - $150k',
    description: 'We need a skilled Backend Engineer to build scalable systems...',
    requirements: ['Node.js', 'Python', 'AWS', '3+ years'],
    tags: ['Node.js', 'Python', 'AWS', 'Backend'],
    status: 'active',
    postedAt: '2024-01-13',
    applicationsCount: 32,
    employerId: 'emp3',
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    company: 'GrowthHub',
    companyLogo: '/images/companies/default_company.jpg',
    type: 'Part-time',
    location: 'Remote',
    salary: '$30k - $50k',
    description: 'Looking for a creative Marketing Specialist to drive our growth...',
    requirements: ['Marketing', 'Social Media', 'Content Creation'],
    tags: ['Marketing', 'Social Media', 'Content', 'Remote'],
    status: 'active',
    postedAt: '2024-01-12',
    applicationsCount: 15,
    employerId: 'emp4',
  },
];

interface JobStore {
  jobs: Job[];
  filteredJobs: Job[];
  filters: JobFilters;
  selectedJob: Job | null;
  isLoading: boolean;

  setFilters: (filters: JobFilters) => void;
  setSelectedJob: (job: Job | null) => void;
  applyFilters: () => void;
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: mockJobs,
  filteredJobs: mockJobs,
  filters: {},
  selectedJob: null,
  isLoading: false,

  setFilters: (filters) => {
    set({ filters });
    get().applyFilters();
  },

  setSelectedJob: (job) => set({ selectedJob: job }),

  applyFilters: () => {
    const { jobs, filters } = get();
    let filtered = [...jobs];

    if (filters.type && filters.type !== 'All') {
      filtered = filtered.filter((job) => job.type === filters.type);
    }

    if (filters.location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((job) =>
        filters.tags!.some((tag) => job.tags.includes(tag))
      );
    }

    set({ filteredJobs: filtered });
  },
}));

