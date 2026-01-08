import { create } from 'zustand';
import { Job, JobFilters } from './types';
import { jobApi } from '../api/jobApi';

interface JobStore {
  jobs: Job[];
  selectedJob: Job | null;
  filters: JobFilters;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchJobs: (filters?: JobFilters) => Promise<void>;
  fetchJobById: (id: string) => Promise<void>;
  createJob: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'applicationsCount'>) => Promise<void>;
  updateJob: (id: string, job: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  setFilters: (filters: JobFilters) => void;
  setSelectedJob: (job: Job | null) => void;
  clearError: () => void;
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  selectedJob: null,
  filters: {},
  isLoading: false,
  error: null,

  fetchJobs: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const jobs = await jobApi.getAll(filters || get().filters);
      set({ jobs, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch jobs',
        isLoading: false 
      });
    }
  },

  fetchJobById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const job = await jobApi.getById(id);
      set({ selectedJob: job, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch job',
        isLoading: false 
      });
    }
  },

  createJob: async (job) => {
    set({ isLoading: true, error: null });
    try {
      const newJob = await jobApi.create(job);
      set((state) => ({ 
        jobs: [...state.jobs, newJob],
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create job',
        isLoading: false 
      });
      throw error;
    }
  },

  updateJob: async (id, job) => {
    set({ isLoading: true, error: null });
    try {
      const updatedJob = await jobApi.update(id, job);
      set((state) => ({
        jobs: state.jobs.map((j) => (j.id === id ? updatedJob : j)),
        selectedJob: state.selectedJob?.id === id ? updatedJob : state.selectedJob,
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update job',
        isLoading: false 
      });
      throw error;
    }
  },

  deleteJob: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await jobApi.delete(id);
      set((state) => ({
        jobs: state.jobs.filter((j) => j.id !== id),
        selectedJob: state.selectedJob?.id === id ? null : state.selectedJob,
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete job',
        isLoading: false 
      });
      throw error;
    }
  },

  setFilters: (filters) => set({ filters }),
  setSelectedJob: (job) => set({ selectedJob: job }),
  clearError: () => set({ error: null }),
}));

