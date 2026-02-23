import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import { User, UserRole, AuthContextType } from "../types";
import { getUsers, saveUsers } from '../data/users';
import toast from "react-hot-toast";

const USER_STORAGE_KEY = "business_nexus_user";
const RESET_TOKEN_KEY = "business_nexus_reset_token";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse stored user", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // FIXED LOGIN
  const login = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const users = getUsers();

      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!foundUser) {
        throw new Error("User not found. Please sign up.");
      }

      setUser(foundUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}`);
    } catch (error) {
      toast.error((error as Error).message);
      throw error; 
    } finally {
      setIsLoading(false);
    }
  };

  // REGISTER
  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const users = getUsers();
      const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

      if (exists) {
        throw new Error("Email already exists");
      }

      const newUser: User = {
        id: `${Date.now()}`,
        name,
        email,
        role,
        avatarUrl: `https://ui-avatars.com/api/?name=${name}`,
        bio: "",
        isOnline: true,
        createdAt: new Date().toISOString()
      };

      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);
      setUser(newUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      toast.success("Signup successful");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    toast.success("Logged out");
  };

  // FIXED FORGOT PASSWORD (Added getUsers)
  const forgotPassword = async (email: string): Promise<void> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const users = getUsers(); 
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!exists) {
        throw new Error("User not found");
      }

      const token = Math.random().toString(36).substring(2);
      localStorage.setItem(RESET_TOKEN_KEY, token);
      toast.success("Reset email sent");
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  const resetPassword = async (
    token: string,
    newPassword: string
  ): Promise<void> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const storedToken = localStorage.getItem(RESET_TOKEN_KEY);

      if (token !== storedToken) {
        throw new Error("Invalid token");
      }

      localStorage.removeItem(RESET_TOKEN_KEY);
      toast.success("Password reset successful");
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  const updateProfile = async (
    userId: string,
    updates: Partial<User>
  ): Promise<void> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const users = getUsers();
      const index = users.findIndex((u) => u.id === userId);

      if (index === -1) {
        throw new Error("User not found");
      }

      const updatedUser = { ...users[index], ...updates };
      const updatedUsers = [...users];
      updatedUsers[index] = updatedUser;
      saveUsers(updatedUsers);

      if (user?.id === userId) {
        setUser(updatedUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      }
      toast.success("Profile updated");
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};