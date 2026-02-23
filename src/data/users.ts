import { Entrepreneur, Investor } from '../types';

// Hardcoded initial data
export const entrepreneurs: Entrepreneur[] = [
  {
    id: 'e1',
    name: 'Sarah Johnson',
    email: 'sarah@techwave.io',
    role: 'entrepreneur',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    bio: 'Serial entrepreneur with 10+ years of experience in SaaS and fintech.',
    startupName: 'TechWave AI',
    pitchSummary: 'AI-powered financial analytics platform helping SMBs make data-driven decisions.',
    fundingNeeded: '$1.5M',
    industry: 'FinTech',
    location: 'San Francisco, CA',
    foundedYear: 2021,
    teamSize: 12,
    isOnline: true,
    createdAt: '2023-01-15T09:24:00Z'
  },
  {
    id: 'e2',
    name: 'David Chen',
    email: 'david@greenlife.co',
    role: 'entrepreneur',
    avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    bio: 'Environmental scientist turned entrepreneur. Passionate about sustainable solutions.',
    startupName: 'GreenLife Solutions',
    pitchSummary: 'Biodegradable packaging alternatives for consumer goods and food industry.',
    fundingNeeded: '$2M',
    industry: 'CleanTech',
    location: 'Portland, OR',
    foundedYear: 2020,
    teamSize: 8,
    isOnline: false,
    createdAt: '2022-03-10T14:35:00Z'
  }
];

export const investors: Investor[] = [
  {
    id: 'i1',
    name: 'Michael Rodriguez',
    email: 'michael@vcinnovate.com',
    role: 'investor',
    avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    bio: 'Early-stage investor focus on B2B SaaS and fintech.',
    investmentInterests: ['FinTech', 'SaaS', 'AI/ML'],
    investmentStage: ['Seed', 'Series A'],
    portfolioCompanies: ['PayStream', 'DataSense'],
    totalInvestments: 12,
    minimumInvestment: '$250K',
    maximumInvestment: '$1.5M',
    isOnline: true,
    createdAt: '2020-05-18T10:15:00Z'
  }
];

// --- LOGIC FOR AUTHCONTEXT ---

const STORAGE_KEY = 'business_nexus_all_users';

/**
 * Gets all users (Static + those registered in LocalStorage)
 */
export const getUsers = () => {
  // 1. Get the hardcoded lists we defined at the top of the file
  const initial = [...entrepreneurs, ...investors];
  
  // 2. Get any users who signed up via the Register page
  const storedData = localStorage.getItem('business_nexus_all_users');
  const stored = storedData ? JSON.parse(storedData) : [];
  
  // 3. Return BOTH (using a Map to prevent duplicates by ID)
  const allUsers = [...initial, ...stored];
  return Array.from(new Map(allUsers.map(u => [u.id, u])).values());
};

// Helper functions for other components
export const findUserById = (id: string) => getUsers().find(u => u.id === id) || null;
export const getUsersByRole = (role: 'entrepreneur' | 'investor') => getUsers().filter(u => u.role === role);


export const saveUsers = (allUsers: any[]) => {
  // We only want to save users that aren't part of the hardcoded initial list
  const initialIds = [...entrepreneurs, ...investors].map(u => u.id);
  const newUsersOnly = allUsers.filter(u => !initialIds.includes(u.id));
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsersOnly));
};