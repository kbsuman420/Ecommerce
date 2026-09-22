import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole, LoginPayload, RegisterPayload } from '../types/auth';
import { mockUsers } from '../services/mockData';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginPayload) => Promise<{ success: boolean; user?: User; message?: string }>;
  register: (data: RegisterPayload) => Promise<{ success: boolean; user?: User; message?: string }>;
  logout: () => void;
  quickSwitchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'myec_auth_user';
const TOKEN_STORAGE_KEY = 'myec_auth_token';
const USERS_DB_STORAGE_KEY = 'myec_users_database';

// Pre-seeded database of users with assigned roles
const initialUsersDatabase: User[] = [
  {
    id: 1,
    fname: 'Alex',
    lname: 'Morgan',
    email: 'customer@gmail.com',
    role: 'CUSTOMER',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phoneNo: '+1 (555) 234-5678',
    createdAt: new Date().toISOString(),
  },
  {
    id: 101,
    fname: 'David',
    lname: 'Chen',
    email: 'seller@gmail.com',
    role: 'SELLER',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phoneNo: '+1 (555) 876-5432',
    createdAt: new Date().toISOString(),
  },
  {
    id: 999,
    fname: 'Sarah',
    lname: 'Jenkins',
    email: 'admin@gmail.com',
    role: 'ADMIN',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phoneNo: '+1 (555) 999-0000',
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and load users database
  const getUsersDB = (): User[] => {
    try {
      const stored = localStorage.getItem(USERS_DB_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(USERS_DB_STORAGE_KEY, JSON.stringify(initialUsersDatabase));
    return initialUsersDatabase;
  };

  useEffect(() => {
    try {
      // Ensure database exists
      getUsersDB();

      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken || 'mock-jwt-token-123');
      }
    } catch (e) {
      console.error('Error hydrating auth', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async ({ email, password: _password }: LoginPayload): Promise<{ success: boolean; user?: User; message?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400)); // Simulate API network latency

    const usersDB = getUsersDB();
    const cleanEmail = email.toLowerCase().trim();

    // 1. Find user in database by email
    let matchedUser = usersDB.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!matchedUser) {
      // Assign role automatically based on standard credentials or default to CUSTOMER
      let assignedRole: UserRole = 'CUSTOMER';
      if (cleanEmail.startsWith('admin') || cleanEmail.includes('admin')) {
        assignedRole = 'ADMIN';
      } else if (cleanEmail.startsWith('seller') || cleanEmail.includes('seller') || cleanEmail.includes('vendor')) {
        assignedRole = 'SELLER';
      }

      matchedUser = {
        id: Math.floor(Math.random() * 9000) + 1000,
        fname: email.split('@')[0],
        email: email,
        role: assignedRole,
        createdAt: new Date().toISOString(),
      };

      // Save new user to database
      const updatedDB = [...usersDB, matchedUser];
      localStorage.setItem(USERS_DB_STORAGE_KEY, JSON.stringify(updatedDB));
    }

    const mockToken = `jwt-token-${matchedUser.id}-${Date.now()}`;
    setUser(matchedUser);
    setToken(mockToken);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(matchedUser));
    localStorage.setItem(TOKEN_STORAGE_KEY, mockToken);
    setIsLoading(false);

    return { success: true, user: matchedUser };
  };

  const register = async (data: RegisterPayload): Promise<{ success: boolean; user?: User; message?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    const usersDB = getUsersDB();
    const cleanEmail = data.email.toLowerCase().trim();

    const newUser: User = {
      id: Math.floor(Math.random() * 9000) + 1000,
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      role: data.role || 'CUSTOMER',
      phoneNo: data.phoneNo,
      createdAt: new Date().toISOString(),
    };

    const updatedDB = [...usersDB.filter((u) => u.email.toLowerCase() !== cleanEmail), newUser];
    localStorage.setItem(USERS_DB_STORAGE_KEY, JSON.stringify(updatedDB));

    const mockToken = `jwt-token-${newUser.id}-${Date.now()}`;
    setUser(newUser);
    setToken(mockToken);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem(TOKEN_STORAGE_KEY, mockToken);
    setIsLoading(false);

    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  const quickSwitchRole = (role: UserRole) => {
    let targetUser: User;
    if (role === 'ADMIN') targetUser = mockUsers.admin;
    else if (role === 'SELLER') targetUser = mockUsers.seller;
    else targetUser = mockUsers.customer;

    setUser(targetUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        quickSwitchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
