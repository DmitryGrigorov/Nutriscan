import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { Providers } from '@/components/providers/Providers';
import { AppLayout } from '@/components/layout/AppLayout';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { CartProvider } from '@/contexts/CartContext';
import { lato } from '@/lib/fonts';
import './globals.css';

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
  themeColor: '#00979F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00979F" />
      </head>
      <body className={lato.className}>
        <ConfigProvider 
          locale={ruRU}
          theme={{
            token: {
              fontFamily: 'var(--font-lato), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            },
          }}
        >
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
