'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { appwriteApi } from '@/lib/appwrite/api';
import { message } from 'antd';

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

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const currentUser = await appwriteApi.auth.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await appwriteApi.auth.login(email, password);
            setUser(response.user);
            message.success('Успешный вход в систему');
        } catch (error) {
            message.error('Ошибка при входе');
            throw error;
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            const response = await appwriteApi.auth.register(email, password, name);
            setUser(response.user);
            message.success('Регистрация успешна');
        } catch (error) {
            message.error('Ошибка при регистрации');
            throw error;
        }
    };

    const logout = async () => {
        try {
            await appwriteApi.auth.logout();
            setUser(null);
            message.success('Выход выполнен успешно');
        } catch (error) {
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