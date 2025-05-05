import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { Providers } from '@/components/providers/Providers';
import { AppLayout } from '@/components/layout/AppLayout';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { CartProvider } from '@/contexts/CartContext';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'NutriScan',
  description: 'Application for nutritional assessment and recommendations',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192x192.png',
  },
};

export const viewport = {
  themeColor: '#1890ff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1890ff" />
      </head>
      <body className={inter.className}>
        <ConfigProvider locale={ruRU}>
          <CartProvider>
            <StyledComponentsRegistry>
              <Providers>
                <AppLayout>{children}</AppLayout>
              </Providers>
            </StyledComponentsRegistry>
          </CartProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
