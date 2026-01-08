import { UserRole, UserStatus } from '@shared/types';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserFilters {
  role?: UserRole | 'All';
  status?: UserStatus | 'All';
  search?: string;
}

