import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { Providers } from '@/components/providers/Providers';
import { AppLayout } from '@/components/layout/AppLayout';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers>
            <AppLayout>{children}</AppLayout>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
