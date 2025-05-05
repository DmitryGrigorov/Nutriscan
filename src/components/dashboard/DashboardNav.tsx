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
} from '@ant-design/icons';

const items = [
  {
    key: '/dashboard',
    icon: <BarChartOutlined />,
    label: 'Обзор',
  },
  {
    key: '/dashboard/surveys',
    icon: <FileTextOutlined />,
    label: 'Результаты опросов',
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

export const DashboardNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (key: string) => {
    router.push(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      items={items}
      onClick={({ key }) => handleMenuClick(key)}
      style={{ height: '100%', borderRight: 0 }}
    />
  );
}; 