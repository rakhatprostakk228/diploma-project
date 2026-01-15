export type UserRole = 'candidate' | 'employer' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'banned';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  experience?: string;
  company?: string;
  website?: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

