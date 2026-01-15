import { create } from 'zustand';
import { User, AuthUser } from './types';

interface UserStore {
  currentUser: AuthUser | null;
  users: Record<string, User>;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'candidate' | 'employer') => Promise<void>;
  logout: () => void;
  getUser: (id: string) => User | undefined;
  updateProfile: (userId: string, data: Partial<User>) => void;
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

  login: async (email: string, password: string) => {
    const user = Object.values(mockUsers).find(
      (u) => u.email === email || u.id === email || u.name.toLowerCase() === email.toLowerCase()
    );
    
    if (user && password === '123456') {
      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      };
      set({ currentUser: authUser, isAuthenticated: true });
      localStorage.setItem('authUser', JSON.stringify(authUser));
    } else {
      throw new Error('Invalid credentials');
    }
  },

  register: async (email: string, _password: string, name: string, role: 'candidate' | 'employer') => {
    const newUser: User = {
      id: `user${Date.now()}`,
      email,
      name,
      role,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    
    mockUsers[newUser.id] = newUser;
    
    const authUser: AuthUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };
    
    set({ 
      currentUser: authUser, 
      isAuthenticated: true,
      users: { ...mockUsers },
    });
    localStorage.setItem('authUser', JSON.stringify(authUser));
  },

  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
    localStorage.removeItem('authUser');
  },

  getUser: (id: string) => {
    return get().users[id];
  },

  updateProfile: (userId: string, data: Partial<User>) => {
    const users = { ...get().users };
    if (users[userId]) {
      users[userId] = { ...users[userId], ...data };
      set({ users });
    }
  },
}));

const storedAuth = localStorage.getItem('authUser');
if (storedAuth) {
  try {
    const authUser = JSON.parse(storedAuth);
    useUserStore.setState({ currentUser: authUser, isAuthenticated: true });
  } catch (e) {
    localStorage.removeItem('authUser');
  }
}

