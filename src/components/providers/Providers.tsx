'use client';

import { ConfigProvider } from 'antd';
import { AuthProvider } from '@/contexts/AuthContext';
import ruRU from 'antd/locale/ru_RU';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ConfigProvider
            locale={ruRU}
            theme={{
                token: {
                    colorPrimary: '#1677ff',
                },
            }}
        >
            <AuthProvider>{children}</AuthProvider>
        </ConfigProvider>
    );
} 