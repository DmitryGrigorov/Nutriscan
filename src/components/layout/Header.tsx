'use client';

import { Layout, Button, Space, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <AntHeader
      style={{
        background: '#fff',
        padding: '0 50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Text strong style={{ fontSize: '18px', color: '#1677ff' }}>
          NutriScan
        </Text>
      </Link>

      <Space>
        {user ? (
          <>
            <Button type="link" onClick={() => router.push('/dashboard')}>
              Личный кабинет
            </Button>
            <Button onClick={handleLogout}>Выйти</Button>
          </>
        ) : (
          <>
            <Button type="link" onClick={() => router.push('/auth/login')}>
              Войти
            </Button>
            <Button type="primary" onClick={() => router.push('/auth/register')}>
              Регистрация
            </Button>
          </>
        )}
      </Space>
    </AntHeader>
  );
};
