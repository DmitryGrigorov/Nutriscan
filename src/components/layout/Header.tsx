'use client';

import { Layout, Button, Space, Typography, Badge, Popover, List, Tag, Menu, Drawer } from 'antd';
import type { MenuProps } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useReminders } from '@/contexts/ReminderContext';
import Link from 'next/link';
import {
  BellOutlined,
  ShoppingCartOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
  BarChartOutlined,
  GiftOutlined,
  FileTextOutlined,
  SettingOutlined,
  LineChartOutlined,
  MenuOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

const ReminderItem = ({
  title,
  datetime,
  type,
  completed,
}: {
  title: string;
  datetime: string;
  type: 'supplement' | 'analysis';
  completed: boolean;
}) => {
  const date = new Date(datetime);
  const isToday = new Date().toDateString() === date.toDateString();
  const isTomorrow = new Date(Date.now() + 86400000).toDateString() === date.toDateString();

  const getDateText = () => {
    if (isToday) return 'Сегодня';
    if (isTomorrow) return 'Завтра';
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  };

  const getTimeText = () => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <List.Item>
      <Space align="start">
        {type === 'supplement' ? (
          <MedicineBoxOutlined style={{ fontSize: '20px', color: '#16B6BE' }} />
        ) : (
          <ExperimentOutlined style={{ fontSize: '20px', color: '#16B6BE' }} />
        )}
        <Space direction="vertical" size={0}>
          <Text strong>{title}</Text>
          <Space size={4}>
            <ClockCircleOutlined style={{ fontSize: '12px' }} />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {getDateText()} в {getTimeText()}
            </Text>
          </Space>
        </Space>
        {completed ? (
          <Tag color="success" icon={<CheckCircleOutlined />}>
            Выполнено
          </Tag>
        ) : (
          <Tag color={isToday ? 'warning' : 'default'}>
            {isToday ? 'Сегодня' : isTomorrow ? 'Завтра' : 'Запланировано'}
          </Tag>
        )}
      </Space>
    </List.Item>
  );
};

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { reminders, unreadCount } = useReminders();
  const { cart } = useCart();
  const [reminderOpen, setReminderOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Более разумный breakpoint - оставляем место для:
      // - Логотип/меню (~400px)
      // - Правые иконки и кнопки (~300px)
      // - Запас (~100px)
      // Итого минимум ~800px для десктопного режима
      setIsMobile(window.innerWidth <= 992);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
    setDrawerOpen(false);
  };

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
      key: 'pharmacy',
      icon: <ShoppingOutlined />,
      label: 'Аптека',
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
      icon: <UserOutlined />,
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
      style={
        mode === 'horizontal'
          ? {
              lineHeight: '64px',
              borderBottom: 'none',
              flex: 1,
              maxWidth: 'calc(100vw - 400px)', // Оставляем место для правых иконок
            }
          : {}
      }
      onClick={() => setDrawerOpen(false)}
    />
  );

  const reminderContent = (
    <div style={{ width: 350 }}>
      <div style={{ marginBottom: 16 }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Title level={5} style={{ margin: 0 }}>
            Напоминания
          </Title>
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => {
                setReminderOpen(false);
                router.push('/dashboard/analysis-reminders');
              }}
            >
              Анализы
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                setReminderOpen(false);
                router.push('/dashboard/supplement-reminders');
              }}
            >
              БАДы
            </Button>
          </Space>
        </Space>
      </div>
      <List
        dataSource={reminders}
        renderItem={(reminder) => (
          <ReminderItem
            key={reminder.id}
            title={reminder.title}
            datetime={reminder.datetime}
            type={reminder.type}
            completed={reminder.completed}
          />
        )}
        locale={{
          emptyText: (
            <div style={{ padding: '24px 0', textAlign: 'center' }}>
              <Text type="secondary">Нет активных напоминаний</Text>
            </div>
          ),
        }}
        style={{
          maxHeight: 350,
          overflowY: 'auto',
          marginLeft: -16,
          marginRight: -16,
          padding: '0 16px',
        }}
      />
    </div>
  );

  const cartContent = (
    <div style={{ width: 300 }}>
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text strong>Корзина</Text>
        <Text type="secondary">{cart.length} товаров</Text>
      </div>
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        {cart.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <Text type="secondary">Корзина пуста</Text>
          </div>
        ) : (
          <List
            size="small"
            dataSource={cart}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 40, height: 40, objectFit: 'cover' }}
                    />
                  }
                  title={<Text ellipsis>{item.name}</Text>}
                  description={
                    <Space>
                      <Text type="secondary">{item.quantity} шт.</Text>
                      <Text strong>{item.price * item.quantity} ₽</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </div>
      {cart.length > 0 && (
        <div
          style={{
            padding: '12px 16px',
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text strong>Итого:</Text>
          <Text strong>
            {cart.reduce((total, item) => total + item.price * item.quantity, 0)} ₽
          </Text>
        </div>
      )}
      <div style={{ padding: '12px 16px' }}>
        <Button
          type="primary"
          block
          onClick={() => {
            router.push('/pharmacy/cart');
            setCartOpen(false);
          }}
        >
          Перейти в корзину
        </Button>
      </div>
    </div>
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
      }}
    >
      {isMobile ? (
        <>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: '20px' }} />}
            onClick={() => setDrawerOpen(true)}
          />
          <Drawer
            title="Меню"
            placement="left"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            bodyStyle={{ padding: 0 }}
            width="100%"
            style={{ position: 'absolute' }}
          >
            <div style={{ padding: '24px 0' }}>{renderMenu('vertical')}</div>
          </Drawer>
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

      <Space size="large">
        {user ? (
          <>
            <Popover
              content={reminderContent}
              title={null}
              trigger="click"
              open={reminderOpen}
              onOpenChange={setReminderOpen}
              placement="bottomRight"
              arrow={false}
            >
              <Badge count={unreadCount} style={{ cursor: 'pointer' }}>
                <BellOutlined style={{ fontSize: '20px' }} />
              </Badge>
            </Popover>
            <Popover
              content={cartContent}
              title={null}
              trigger="click"
              open={cartOpen}
              onOpenChange={setCartOpen}
              placement="bottomRight"
              arrow={false}
            >
              <Badge count={cart.length} style={{ cursor: 'pointer' }}>
                <ShoppingCartOutlined style={{ fontSize: '20px' }} />
              </Badge>
            </Popover>
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
