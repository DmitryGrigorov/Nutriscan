'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { appwriteApi } from '@/lib/appwrite/api';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await appwriteApi.auth.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
      Cookies.remove('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await appwriteApi.auth.login(email, password);
      console.log('Login response:', response);
      setUser(response.user);
      
      const session = await appwriteApi.auth.getSession();
      console.log('Session:', session);
      
      if (session?.$id) {
        Cookies.set('auth_token', session.$id, { expires: 7 });
      } else {
        console.error('No session ID found');
      }
      
      message.success('Успешный вход в систему');
    } catch (error) {
      console.error('Login error:', error);
      message.error('Ошибка при входе');
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await appwriteApi.auth.register(email, password, name);
      console.log('Register response:', response);
      setUser(response.user);
      
      const session = await appwriteApi.auth.getSession();
      console.log('Session:', session);
      
      if (session?.$id) {
        Cookies.set('auth_token', session.$id, { expires: 7 });
      } else {
        console.error('No session ID found');
      }
      
      message.success('Регистрация успешна');
      router.push('/profile/complete');
    } catch (error) {
      console.error('Register error:', error);
      message.error('Ошибка при регистрации');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await appwriteApi.auth.logout();
      setUser(null);
      Cookies.remove('auth_token');
      message.success('Выход выполнен успешно');
    } catch (error) {
      console.error('Logout error:', error);
      message.error('Ошибка при выходе');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
