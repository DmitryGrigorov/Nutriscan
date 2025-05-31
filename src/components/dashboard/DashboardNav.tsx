'use client';

import React from 'react';
import { Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import {
  BarChartOutlined,
  FileTextOutlined,
  LineChartOutlined,
  HistoryOutlined,
  BulbOutlined,
  GiftOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '/dashboard/account',
    icon: <UserOutlined />,
    label: 'Личный кабинет',
  },
  {
    key: '/dashboard',
    icon: <BarChartOutlined />,
    label: 'Обзор',
  },
  {
    key: '/dashboard/surveys',
    icon: <FileTextOutlined />,
    label: 'Опросы',
  },
  {
    key: '/dashboard/analyses',
    icon: <FileTextOutlined />,
    label: 'Загруженные анализы',
  },
  {
    key: '/dashboard/trends',
    icon: <LineChartOutlined />,
    label: 'Динамика показателей',
  },
  {
    key: '/dashboard/supplements',
    icon: <HistoryOutlined />,
    label: 'История потребления БАДов',
  },
  {
    key: '/dashboard/recommendations',
    icon: <BulbOutlined />,
    label: 'Персональные рекомендации',
  },
  {
    key: '/dashboard/promotions',
    icon: <GiftOutlined />,
    label: 'Акции и предложения',
  },
  {
    key: '/dashboard/analysis-reminders',
    icon: <BellOutlined />,
    label: 'Напоминания об анализах',
  },
  {
    key: '/dashboard/supplement-reminders',
    icon: <ShoppingCartOutlined />,
    label: 'Напоминания о БАДах',
  },
];

interface DashboardNavProps {
  isMobile?: boolean;
  onMenuClick?: () => void;
}

export const DashboardNav: React.FC<DashboardNavProps> = ({ isMobile, onMenuClick }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (key: string) => {
    router.push(key);
    if (onMenuClick) {
      onMenuClick();
    }
  };

  const renderMenu = (mode: 'inline' | 'vertical' = 'inline') => (
    <Menu
      mode={mode}
      selectedKeys={[pathname]}
      items={items}
      onClick={({ key }) => handleMenuClick(key)}
      style={mode === 'inline' ? { height: '100%', borderRight: 0 } : {}}
    />
  );

  if (isMobile) {
    return renderMenu('vertical');
  }

  return renderMenu('inline');
};
