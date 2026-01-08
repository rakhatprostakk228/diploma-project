import { create } from 'zustand';
import { User, UserFilters } from './types';
import { userApi } from '../api/userApi';

interface UserStore {
  users: User[];
  selectedUser: User | null;
  filters: UserFilters;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUsers: (filters?: UserFilters) => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  createUser: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'applicationsCount'>) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  setFilters: (filters: UserFilters) => void;
  setSelectedUser: (user: User | null) => void;
  clearError: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  selectedUser: null,
  filters: {},
  isLoading: false,
  error: null,

  fetchUsers: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const users = await userApi.getAll(filters || get().filters);
      set({ users, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch users',
        isLoading: false 
      });
    }
  },

  fetchUserById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userApi.getById(id);
      set({ selectedUser: user, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch user',
        isLoading: false 
      });
    }
  },

  createUser: async (user) => {
    set({ isLoading: true, error: null });
    try {
      const newUser = await userApi.create(user);
      set((state) => ({ 
        users: [...state.users, newUser],
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create user',
        isLoading: false 
      });
      throw error;
    }
  },

  updateUser: async (id, user) => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await userApi.update(id, user);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u)),
        selectedUser: state.selectedUser?.id === id ? updatedUser : state.selectedUser,
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update user',
        isLoading: false 
      });
      throw error;
    }
  },

  deleteUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await userApi.delete(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete user',
        isLoading: false 
      });
      throw error;
    }
  },

  setFilters: (filters) => set({ filters }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  clearError: () => set({ error: null }),
}));

