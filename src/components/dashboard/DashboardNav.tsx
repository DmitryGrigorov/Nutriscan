'use client';

import React from 'react';
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
import styles from './DashboardNav.module.css';

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    key: '/dashboard/account',
    label: 'Личный кабинет',
    icon: <UserOutlined />,
  },
  {
    key: '/dashboard',
    label: 'Обзор',
    icon: <BarChartOutlined />,
  },
  {
    key: '/dashboard/surveys',
    label: 'Опросы',
    icon: <FileTextOutlined />,
  },
  {
    key: '/dashboard/analyses',
    label: 'Загруженные анализы',
    icon: <FileTextOutlined />,
  },
  {
    key: '/dashboard/trends',
    label: 'Динамика показателей',
    icon: <LineChartOutlined />,
  },
  {
    key: '/dashboard/supplements',
    label: 'История потребления БАДов',
    icon: <HistoryOutlined />,
  },
  {
    key: '/dashboard/recommendations',
    label: 'Персональные рекомендации',
    icon: <BulbOutlined />,
  },
  {
    key: '/dashboard/promotions',
    label: 'Акции и предложения',
    icon: <GiftOutlined />,
  },
  {
    key: '/dashboard/analysis-reminders',
    label: 'Напоминания об анализах',
    icon: <BellOutlined />,
  },
  {
    key: '/dashboard/supplement-reminders',
    label: 'Напоминания о БАДах',
    icon: <ShoppingCartOutlined />,
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

  const isActive = (key: string) => {
    return key === pathname;
  };

  const renderDesktopMenu = () => (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3 className={styles.sidebarTitle}>Личный профиль</h3>
      </div>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <div key={item.key}>
            <div
              className={`${styles.navItem} ${
                isActive(item.key) ? styles.active : ''
              }`}
              onClick={() => handleMenuClick(item.key)}
            >
              <div className={styles.navItemContent}>
                {item.icon && <span className={styles.navItemIcon}>{item.icon}</span>}
                <span className={styles.navItemLabel}>{item.label}</span>
              </div>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );

  const renderMobileMenu = () => (
    <div className={styles.mobileNav}>
      {menuItems.map((item) => (
        <div key={item.key}>
          <div
            className={`${styles.mobileNavItem} ${
              isActive(item.key) ? styles.active : ''
            }`}
            onClick={() => handleMenuClick(item.key)}
          >
            {item.icon && <span className={styles.navItemIcon}>{item.icon}</span>}
            <span>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );

  if (isMobile) {
    return renderMobileMenu();
  }

  return renderDesktopMenu();
};
