import { api } from '@shared/lib/axios';
import { User, UserFilters } from '../model/types';

export const userApi = {
  getAll: async (filters?: UserFilters): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users', { params: filters });
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  create: async (user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'applicationsCount'>): Promise<User> => {
    const { data } = await api.post<User>('/users', user);
    return data;
  },

  update: async (id: string, user: Partial<User>): Promise<User> => {
    const { data } = await api.patch<User>(`/users/${id}`, user);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

