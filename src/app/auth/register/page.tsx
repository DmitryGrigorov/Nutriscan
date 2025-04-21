'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { Spin } from 'antd';

export default function RegisterPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <Spin size="large" />
            </div>
        );
    }

    if (user) {
        return null;
    }

    return <AuthForm mode="register" />;
} 