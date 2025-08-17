'use client';

import { ConfigProvider, theme } from 'antd';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import ruRU from 'antd/locale/ru_RU';
import { ReminderProvider } from '@/contexts/ReminderContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: '#16B6BE',
        },
        algorithm: theme.defaultAlgorithm,
        components: {
          Layout: {
            headerBg: '#ffffff',
            bodyBg: '#f5f5f5',
          },
          Card: {
            colorBgContainer: '#ffffff',
          },
        },
      }}
    >
      <AuthProvider>
        <ReminderProvider>
          <CartProvider>{children}</CartProvider>
        </ReminderProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}
