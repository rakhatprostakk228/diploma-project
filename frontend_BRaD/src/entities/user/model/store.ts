import { create } from 'zustand';
import { User, AuthUser } from './types';
import api from '@shared/lib/api';
import { decodeJWT } from '@shared/lib/jwt';

interface UserStore {
  currentUser: AuthUser | null;
  users: Record<string, User>;
  isAuthenticated: boolean;
  currentProfile: any | null;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'candidate' | 'employer') => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  getUser: (id: string) => User | undefined;
  loadProfile: () => Promise<void>;
  updateProfile: (userId: string, data: Partial<User>) => Promise<void>;
}

const mockUsers: Record<string, User> = {
  'rakhat': {
    id: 'rakhat',
    email: 'rakhat@example.com',
    name: 'Rakhat',
    role: 'candidate',
    status: 'active',
    avatar: '/images/avatars/user1.jpg',
    bio: 'Experienced developer passionate about building great products',
    location: 'Remote',
    skills: ['React', 'TypeScript', 'Node.js', 'Full Stack'],
    experience: '5+ years',
    createdAt: '2023-01-01',
  },
  'user1': {
    id: 'user1',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'candidate',
    status: 'active',
    avatar: '/images/avatars/user1.jpg',
    bio: 'Experienced frontend developer passionate about React and TypeScript',
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js'],
    experience: '5 years',
    createdAt: '2023-01-01',
  },
  'user2': {
    id: 'user2',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    role: 'candidate',
    status: 'active',
    avatar: '/images/avatars/user2.jpg',
    bio: 'UI/UX Designer with a passion for creating beautiful and functional interfaces',
    location: 'New York, NY',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    experience: '3 years',
    createdAt: '2023-02-01',
  },
  'user3': {
    id: 'user3',
    email: 'mike@example.com',
    name: 'Mike Chen',
    role: 'candidate',
    status: 'active',
    avatar: '/images/avatars/user3.jpg',
    bio: 'Full-stack developer specializing in modern web technologies',
    location: 'Seattle, WA',
    skills: ['JavaScript', 'Python', 'Django', 'PostgreSQL'],
    experience: '4 years',
    createdAt: '2023-03-01',
  },
  'user4': {
    id: 'user4',
    email: 'emily@example.com',
    name: 'Emily Rodriguez',
    role: 'candidate',
    status: 'active',
    avatar: '/images/avatars/user4.jpg',
    bio: 'Marketing professional with expertise in digital campaigns and brand strategy',
    location: 'Los Angeles, CA',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    experience: '6 years',
    createdAt: '2023-04-01',
  },
  'user5': {
    id: 'user5',
    email: 'david@example.com',
    name: 'David Kim',
    role: 'candidate',
    status: 'active',
    avatar: '/images/avatars/user5.jpg',
    bio: 'Backend engineer focused on scalable systems and cloud infrastructure',
    location: 'Austin, TX',
    skills: ['Go', 'Kubernetes', 'AWS', 'Microservices'],
    experience: '7 years',
    createdAt: '2023-05-01',
  },
  'user6': {
    id: 'user6',
    email: 'lisa@example.com',
    name: 'Lisa Anderson',
    role: 'candidate',
    status: 'active',
    avatar: '/images/avatars/user6.jpg',
    bio: 'Product manager with a technical background and strong analytical skills',
    location: 'Boston, MA',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Stakeholder Management'],
    experience: '5 years',
    createdAt: '2023-06-01',
  },
  'emp1': {
    id: 'emp1',
    email: 'hr@techcorp.com',
    name: 'TechCorp HR',
    role: 'employer',
    status: 'active',
    avatar: '/images/avatars/user1.jpg',
    company: 'TechCorp',
    website: 'https://techcorp.com',
    createdAt: '2022-01-01',
  },
  'emp2': {
    id: 'emp2',
    email: 'contact@designstudio.com',
    name: 'DesignStudio Team',
    role: 'employer',
    status: 'active',
    avatar: '/images/avatars/user2.jpg',
    company: 'DesignStudio',
    website: 'https://designstudio.com',
    createdAt: '2022-02-01',
  },
  'emp3': {
    id: 'emp3',
    email: 'careers@cloudtech.com',
    name: 'CloudTech Recruiting',
    role: 'employer',
    status: 'active',
    avatar: '/images/avatars/user3.jpg',
    company: 'CloudTech',
    website: 'https://cloudtech.com',
    createdAt: '2022-03-01',
  },
  'emp4': {
    id: 'emp4',
    email: 'jobs@growthhub.com',
    name: 'GrowthHub HR',
    role: 'employer',
    status: 'active',
    avatar: '/images/avatars/user4.jpg',
    company: 'GrowthHub',
    website: 'https://growthhub.com',
    createdAt: '2022-04-01',
  },
};

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  users: mockUsers,
  isAuthenticated: false,
  currentProfile: null,

  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { accessToken, refreshToken } = response.data;
      
      // Decode JWT to get user info
      const payload = decodeJWT(accessToken);
      if (!payload) {
        throw new Error('Invalid token received');
      }
      
      const authUser: AuthUser = {
        id: payload.sub,
        email: payload.email,
        name: payload.email.split('@')[0], // Fallback name from email
        role: payload.role.toLowerCase() as 'candidate' | 'employer' | 'admin',
        accessToken,
        refreshToken,
      };
      
      set({ currentUser: authUser, isAuthenticated: true });
      localStorage.setItem('authUser', JSON.stringify(authUser));
      
      // Load user profile after login
      try {
        const profileResponse = await api.get('/profile/me');
        set({ currentProfile: profileResponse.data });
      } catch (e) {
        // Profile might not exist yet, that's okay
        set({ currentProfile: null });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  },

  register: async (email: string, password: string, _name: string, _role: 'candidate' | 'employer') => {
    try {
      // Note: Backend only supports CANDIDATE registration currently
      // The role parameter is ignored, backend always creates CANDIDATE
      const response = await api.post('/auth/register', { email, password });
      
      if (!response.data.ok) {
        throw new Error('Registration failed');
      }
      // Registration successful, user needs to verify email
      // Don't throw error, let the component handle navigation to verification page
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      throw new Error(errorMessage);
    }
  },

  verifyEmail: async (email: string, code: string) => {
    try {
      const response = await api.post('/auth/verify-email', { email, code });
      const { accessToken, refreshToken } = response.data;
      
      // Decode JWT to get user info
      const payload = decodeJWT(accessToken);
      if (!payload) {
        throw new Error('Invalid token received');
      }
      
      const authUser: AuthUser = {
        id: payload.sub,
        email: payload.email,
        name: payload.email.split('@')[0], // Fallback name from email
        role: payload.role.toLowerCase() as 'candidate' | 'employer' | 'admin',
        accessToken,
        refreshToken,
      };
      
      set({ currentUser: authUser, isAuthenticated: true });
      localStorage.setItem('authUser', JSON.stringify(authUser));
      
      // Load user profile after email verification
      try {
        const profileResponse = await api.get('/profile/me');
        set({ currentProfile: profileResponse.data });
      } catch (e) {
        // Profile might not exist yet, that's okay
        set({ currentProfile: null });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Email verification failed';
      throw new Error(errorMessage);
    }
  },

  requestPasswordReset: async (email: string) => {
    try {
      const response = await api.post('/auth/request-password-reset', { email });
      // Always return success for security (don't reveal if email exists)
      if (!response.data.ok) {
        throw new Error('Failed to request password reset');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to request password reset';
      throw new Error(errorMessage);
    }
  },

  resetPassword: async (email: string, code: string, newPassword: string) => {
    try {
      const response = await api.post('/auth/reset-password', { email, code, newPassword });
      if (!response.data.ok) {
        throw new Error('Password reset failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Password reset failed';
      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    try {
      const authUser = get().currentUser;
      if (authUser?.refreshToken) {
        // Try to call logout endpoint, but don't fail if it errors
        try {
          await api.post('/auth/logout', { refreshToken: authUser.refreshToken });
        } catch (e) {
          // Ignore logout errors
        }
      }
    } catch (e) {
      // Ignore errors
    } finally {
      set({ currentUser: null, isAuthenticated: false });
      localStorage.removeItem('authUser');
    }
  },

  getUser: (id: string) => {
    return get().users[id];
  },

  loadProfile: async () => {
    try {
      const response = await api.get('/profile/me');
      set({ currentProfile: response.data });
    } catch (error: any) {
      // If profile doesn't exist or error, set to null
      set({ currentProfile: null });
    }
  },

  updateProfile: async (_userId: string, data: any) => {
    try {
      // Map frontend form data to backend Profile DTO
      const profileData: any = {};
      if (data.firstName !== undefined) profileData.firstName = data.firstName;
      if (data.lastName !== undefined) profileData.lastName = data.lastName;
      if (data.bio !== undefined) profileData.bio = data.bio;
      if (data.city !== undefined) profileData.city = data.city;
      if (data.country !== undefined) profileData.country = data.country;
      if (data.university !== undefined) profileData.university = data.university;
      if (data.faculty !== undefined) profileData.faculty = data.faculty;
      if (data.major !== undefined) profileData.major = data.major;
      if (data.graduationYear !== undefined) profileData.graduationYear = data.graduationYear;
      if (data.githubUrl !== undefined) profileData.githubUrl = data.githubUrl;
      if (data.linkedinUrl !== undefined) profileData.linkedinUrl = data.linkedinUrl;
      if (data.portfolioUrl !== undefined) profileData.portfolioUrl = data.portfolioUrl;

      const response = await api.patch('/profile/me', profileData);
      set({ currentProfile: response.data });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile';
      throw new Error(errorMessage);
    }
  },
}));

// Initialize from localStorage on store creation
const storedAuth = localStorage.getItem('authUser');
if (storedAuth) {
  try {
    const authUser = JSON.parse(storedAuth) as AuthUser;
    // Check if token is expired (basic check)
    if (authUser.accessToken) {
      const payload = decodeJWT(authUser.accessToken);
      if (payload && payload.exp) {
        const expirationTime = payload.exp * 1000; // Convert to milliseconds
        if (Date.now() < expirationTime) {
          useUserStore.setState({ currentUser: authUser, isAuthenticated: true });
        } else {
          // Token expired, clear it
          localStorage.removeItem('authUser');
        }
      } else {
        useUserStore.setState({ currentUser: authUser, isAuthenticated: true });
      }
    } else {
      useUserStore.setState({ currentUser: authUser, isAuthenticated: true });
    }
  } catch (e) {
    localStorage.removeItem('authUser');
  }
}

