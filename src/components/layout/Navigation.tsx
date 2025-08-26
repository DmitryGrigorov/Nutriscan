'use client';

import { Layout, Button, Space, Typography, Menu, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import {
  TeamOutlined,
  ShoppingOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
  PhoneOutlined,
  BellOutlined,
  GiftOutlined,
  FileTextOutlined,
  LineChartOutlined,
  BarChartOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mobileMenuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link href="/">Главная</Link>,
    },
    {
      key: '/about',
      icon: <TeamOutlined />,
      label: <Link href="/about">О нас</Link>,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'pharmacy-header',
      label: (
        <Text strong style={{ fontSize: '16px', color: '#16B6BE' }}>
          Каталог продукции
        </Text>
      ),
      disabled: true,
    },
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
    {
      type: 'divider' as const,
    },
    {
      key: 'dashboard-header',
      label: (
        <Text strong style={{ fontSize: '16px', color: '#16B6BE' }}>
          Личный кабинет
        </Text>
      ),
      disabled: true,
    },
    {
      key: '/dashboard/account',
      icon: <UserOutlined />,
      label: <Link href="/dashboard/account">Аккаунт</Link>,
    },
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
    ...(user?.$id === '683409e1a4097e2da357' || user?.$id === '680658de4352f354f0a9'
      ? [
          {
            type: 'divider' as const,
          },
          {
            key: '/admin',
            icon: <SettingOutlined />,
            label: <Link href="/admin">Админ панель</Link>,
          },
        ]
      : []),
  ];

  const menuItems: MenuProps['items'] = [
    {
      key: '/about',
      label: <Link href="/about">О нас</Link>,
    },
    {
      key: 'pharmacy',
      label: 'Каталог продукции',
      children: [
        {
          key: '/pharmacy',
          icon: <MedicineBoxOutlined />,
          label: <Link href="/pharmacy">Каталог продукции</Link>,
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
      label: 'Личный кабинет',
      children: [
        {
          key: '/dashboard/account',
          icon: <UserOutlined />,
          label: <Link href="/dashboard/account">Аккаунт</Link>,
        },
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
        ...(user?.$id === '683409e1a4097e2da357' || user?.$id === '680658de4352f354f0a9'
          ? [
              {
                key: '/admin',
                icon: <SettingOutlined />,
                label: <Link href="/admin">Админ панель</Link>,
              },
            ]
          : []),
      ],
    },
  ];

  const renderMenu = (mode: 'horizontal' | 'vertical' = 'horizontal') => (
    <Menu
      mode={mode}
      selectedKeys={[pathname]}
      items={isMobile ? mobileMenuItems : menuItems}
      expandIcon={({ isOpen }) => (
        <DownOutlined
          className={styles.menuExpandIcon}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      )}
      className={styles.menuWithArrows}
      style={
        mode === 'horizontal'
          ? {
              lineHeight: '64px',
              borderBottom: 'none',
              flex: 1,
              maxWidth: 'calc(100vw - 400px)', // Оставляем место для правых элементов
            }
          : {}
      }
      onClick={() => setDrawerOpen(false)}
    />
  );

  return (
    <AntHeader
      style={{
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: isMobile ? '0 16px' : '0 24px',
        userSelect: 'none'
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          minWidth: isMobile ? '150px' : '200px',
          marginRight: '24px',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image
            src={isMobile ? '/assets/icons/logo_small.svg' : '/assets/icons/logo.svg'}
            alt="Nutriscan Logo"
            width={isMobile ? 32 : 200}
            height={isMobile ? 32 : 40}
            style={{ marginRight: isMobile ? '8px' : '12px' }}
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      {isMobile ? (
        <>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: '20px' }} />}
            onClick={() => setDrawerOpen(true)}
          />
          <Menu
            mode="vertical"
            selectedKeys={[pathname]}
            items={mobileMenuItems}
            expandIcon={({ isOpen }) => (
              <DownOutlined
                className={styles.menuExpandIcon}
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            )}
            className={styles.menuWithArrows}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              zIndex: 1000,
              background: '#fff',
              transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.3s ease-in-out',
            }}
            onClick={() => setDrawerOpen(false)}
          />
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {renderMenu()}
        </div>
      )}

      {/* Right Section - CTA Button */}
      <Space size="large">
        <Dropdown
          menu={{
            items: user
              ? [
                  {
                    key: '/dashboard/account',
                    icon: <UserOutlined />,
                    label: <Link href="/dashboard/account">Аккаунт</Link>,
                  },
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
                    label: (
                      <Link href="/dashboard/analysis-reminders">Напоминания об анализах</Link>
                    ),
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
                  ...(user?.$id === '683409e1a4097e2da357' || user?.$id === '680658de4352f354f0a9'
                    ? [
                        {
                          key: '/admin',
                          icon: <SettingOutlined />,
                          label: <Link href="/admin">Админ панель</Link>,
                        },
                      ]
                    : []),
                ]
              : [
                  {
                    key: '/auth/login',
                    icon: <UserOutlined />,
                    label: <Link href="/auth/login">Войти</Link>,
                  },
                  {
                    key: '/auth/register',
                    icon: <UserOutlined />,
                    label: <Link href="/auth/register">Зарегистрироваться</Link>,
                  },
                ],
            onClick: ({ key }) => router.push(key),
          }}
          placement="bottomRight"
          trigger={['click']}
        >
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <Button
              type="default"
              size="large"
              style={{
                background: '#fff',
                border: '1px solid #16B6BE',
                height: '40px',
                padding: '0 16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'none',
                position: 'relative',
                zIndex: 2,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f0f9ff';
                e.currentTarget.style.borderColor = '#0ea5e9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.borderColor = '#16B6BE';
              }}
            >
              <Image src="/assets/icons/logo_small.svg" alt="Pill Icon" width={20} height={20} />
              <span style={{ color: '#15456E', fontWeight: '500' }}>Личный кабинет</span>
              <DownOutlined style={{ fontSize: '12px', color: '#15456E' }} />
            </Button>
          </div>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Navigation;
