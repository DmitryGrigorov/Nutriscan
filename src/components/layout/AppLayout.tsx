'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  HomeOutlined,
  ShoppingOutlined,
  FormOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

const { Header, Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link href="/">Главная</Link>,
    },
    {
      key: 'pharmacy',
      icon: <ShoppingOutlined />,
      label: 'Продукты',
      children: [
        {
          key: '/pharmacy',
          label: <Link href="/pharmacy">Все продукты</Link>,
        },
        {
          key: '/pharmacy/category',
          label: <Link href="/pharmacy/category">Категории</Link>,
        },
      ],
    },
    {
      key: 'survey',
      icon: <FormOutlined />,
      label: 'Опросы',
      children: [
        {
          key: '/survey',
          label: <Link href="/survey">Новый опрос</Link>,
        },
        {
          key: '/surveys',
          label: <Link href="/surveys">Мои опросы</Link>,
        },
      ],
    },
    ...(user
      ? [
          {
            key: '/dashboard',
            icon: <UserOutlined />,
            label: <Link href="/dashboard">Личный кабинет</Link>,
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Выйти',
            onClick: handleLogout,
          },
        ]
      : [
          {
            key: '/auth/login',
            label: <Link href="/auth/login">Вход</Link>,
          },
          {
            key: '/auth/register',
            label: <Link href="/auth/register">Регистрация</Link>,
          },
        ]),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
          mode="horizontal"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ lineHeight: '64px' }}
        />
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>{children}</div>
      </Content>
    </Layout>
  );
};
