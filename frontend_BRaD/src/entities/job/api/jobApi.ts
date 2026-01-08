import { api } from '@shared/lib/axios';
import { Job, JobFilters } from '../model/types';

export const jobApi = {
  getAll: async (filters?: JobFilters): Promise<Job[]> => {
    const { data } = await api.get<Job[]>('/jobs', { params: filters });
    return data;
  },

  getById: async (id: string): Promise<Job> => {
    const { data } = await api.get<Job>(`/jobs/${id}`);
    return data;
  },

  create: async (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'applicationsCount'>): Promise<Job> => {
    const { data } = await api.post<Job>('/jobs', job);
    return data;
  },

  update: async (id: string, job: Partial<Job>): Promise<Job> => {
    const { data } = await api.patch<Job>(`/jobs/${id}`, job);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/jobs/${id}`);
  },
};

