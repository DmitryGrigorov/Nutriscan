'use client';

import { ConfigProvider, theme } from 'antd';
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
        algorithm: theme.defaultAlgorithm,
        components: {
          Layout: {
            colorBgHeader: '#ffffff',
            colorBgBody: '#f5f5f5',
          },
          Card: {
            colorBgContainer: '#ffffff',
          },
        },
      }}
    >
      <AuthProvider>{children}</AuthProvider>
    </ConfigProvider>
  );
}
