import { JobType, JobStatus } from '@shared/types';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  type: JobType;
  location: string;
  duration?: string;
  salary?: string;
  description: string;
  requirements: string[];
  tags: string[];
  status: JobStatus;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobFilters {
  type?: JobType | 'All';
  search?: string;
  status?: JobStatus;
  category?: string;
}

