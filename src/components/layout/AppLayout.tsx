'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  HomeOutlined,
  ShoppingOutlined,
  FormOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  BarChartOutlined,
  GiftOutlined,
  FileTextOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { CartButton } from '@/components/pharmacy/CartButton';
import { Header } from './Header';

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link href="/">Главная</Link>,
    },
    {
      key: 'pharmacy',
      icon: <ShoppingOutlined />,
      label: 'Аптека',
      children: [
        {
          key: '/pharmacy',
          icon: <MedicineBoxOutlined />,
          label: <Link href="/pharmacy">Все продукты</Link>,
        },
        {
          key: '/pharmacy/category',
          icon: <ExperimentOutlined />,
          label: <Link href="/pharmacy/category">Категории</Link>,
        },
        {
          key: '/pharmacy/cart',
          icon: <ShoppingCartOutlined />,
          label: <Link href="/pharmacy/cart">Корзина</Link>,
        },
      ],
    },
    {
      key: 'dashboard',
      icon: <UserOutlined />,
      label: 'Личный кабинет',
      children: [
        {
          key: '/dashboard',
          icon: <UserOutlined />,
          label: <Link href="/dashboard">Обзор</Link>,
        },
        {
          key: '/dashboard/supplements',
          icon: <MedicineBoxOutlined />,
          label: <Link href="/dashboard/supplements">Мои БАДы</Link>,
        },
        {
          key: '/dashboard/analyses',
          icon: <ExperimentOutlined />,
          label: <Link href="/dashboard/analyses">Мои анализы</Link>,
        },
        {
          key: '/dashboard/supplement-reminders',
          icon: <BellOutlined />,
          label: <Link href="/dashboard/supplement-reminders">Напоминания о БАДах</Link>,
        },
        {
          key: '/dashboard/analysis-reminders',
          icon: <BellOutlined />,
          label: <Link href="/dashboard/analysis-reminders">Напоминания об анализах</Link>,
        },
        {
          key: '/dashboard/recommendations',
          icon: <BarChartOutlined />,
          label: <Link href="/dashboard/recommendations">Рекомендации</Link>,
        },
        {
          key: '/dashboard/promotions',
          icon: <GiftOutlined />,
          label: <Link href="/dashboard/promotions">Акции</Link>,
        },
        {
          key: '/dashboard/surveys',
          icon: <FileTextOutlined />,
          label: <Link href="/dashboard/surveys">Опросы</Link>,
        },
        {
          key: '/dashboard/trends',
          icon: <LineChartOutlined />,
          label: <Link href="/dashboard/trends">Тренды</Link>,
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
      ? []
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
      <Header />
      <Content>
        {children}
      </Content>
    </Layout>
  );
};
