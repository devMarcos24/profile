'use client';

import { createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { validateToken } from '@/lib/auth-service';

export type UserRole = 'ADMIN' | 'USER';

type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
};

interface RegisterData {
  name: string;
  phone?: string;
  email: string;
  password: string;
}

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  status: 'loading' | 'authenticated' | 'unauthenticated';
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = authStatus === 'authenticated';

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
      
      if (!token) {
        setAuthStatus('unauthenticated');
        return;
      }

      const userData = await validateToken(token);
      
      if (userData) {
        setUser(userData as User);
        setAuthStatus('authenticated');
      } else {
        localStorage.removeItem('auth-token');
        setAuthStatus('unauthenticated');
      }
    } catch (error) {
      console.error('Auth error:', error);
      localStorage.removeItem('auth-token');
      setAuthStatus('unauthenticated');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.user && data.token) {
        localStorage.setItem('auth-token', data.token);
        setUser(data.user);
        setAuthStatus('authenticated');
        return { success: true };
      }

      return { success: false, error: data.error || 'Falha no login' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Erro ao conectar ao servidor' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success && result.token) {
        localStorage.setItem('auth-token', result.token);
        setUser(result.user);
        setAuthStatus('authenticated');
        return { success: true };
      }

      return { success: false, error: result.error || 'Falha no registro' };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Erro ao conectar ao servidor' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth-token');
    setUser(null);
    setAuthStatus('unauthenticated');
    router.push('/login');
  }, [router]);

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    status: authStatus,
  }), [user, isAuthenticated, isLoading, authStatus, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
