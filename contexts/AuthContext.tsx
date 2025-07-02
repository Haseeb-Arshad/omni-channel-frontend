"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import api from '@/lib/api';
import { User } from '@/lib/api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
  googleAuth: (token: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Development bypass: Auto-authenticate without login
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      // DEV MODE: Set authenticated without checking backend
      console.log('[AuthContext] DEV MODE: Auto-authenticating user');
      const mockUser = {
        id: 'dev-user-123',
        email: 'dev@example.com',
        name: 'Development User',
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('dev-auto-auth', 'true');
      setIsLoading(false);
    };

    initAuth();

    // Log current auth state for debugging
    console.log('[AuthContext] Auth state after initialization:', { 
      isAuthenticated: true, // Always authenticated in dev mode
      pathname,
      userExists: true 
    });
  }, []); // Only run once on component mount

  const checkAuth = async (): Promise<boolean> => {
    // DEV MODE: Always return authenticated
    console.log('[AuthContext] DEV MODE: checkAuth always returns true');
    
    if (!user) {
      const mockUser = {
        id: 'dev-user-123',
        email: 'dev@example.com',
        name: 'Development User',
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUser(mockUser);
    }
    
    setIsAuthenticated(true);
    return true;
    
    /* Original authentication logic - commented out for development
    try {
      // Check if token exists in localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }

      // Verify token by fetching user profile
      const response = await api.getProfile();
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
        return true;
      } else {
        // If token is invalid, clear it
        api.clearToken();
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      api.clearToken();
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
    */
  };

  const login = async (email: string, password: string, remember: boolean = false): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log('[AuthContext] Calling api.login with:', { email, remember });
      const response = await api.login({ email, password, remember });
      console.log('[AuthContext] api.login response:', response);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success('Logged in successfully');
        return true;
      } else {
        toast.error(response.message || 'Login failed: Invalid response from server.');
        return false;
      }
    } catch (error: any) {
      console.error('[AuthContext] login error:', error);
      // Check if error is an Axios error and has a response from the server
      const errorMessage = error.response?.data?.message || error.message || 'Login failed due to an unexpected error.';
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await api.register({ email, password, name });
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success('Account created successfully');
        return true;
      } else {
        toast.error(response.message || 'Registration failed');
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const googleAuth = async (token: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await api.googleAuth({ token });
      console.log('[AuthContext] api.googleAuth response:', response);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success('Logged in with Google successfully');
        return true;
      } else {
        toast.error(response.message || 'Google authentication failed');
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || 'Google authentication failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    api.clearToken();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/auth');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        googleAuth,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
