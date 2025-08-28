'use client';

import React, { useState } from 'react';
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
  DownOutlined,
} from '@ant-design/icons';
import styles from './DashboardNav.module.css';

interface SubMenuItem {
  key: string;
  label: string;
}

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: SubMenuItem[];
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
    children: [
      {
        key: '/dashboard/surveys/supplements',
        label: 'Основной опросник',
      },
      {
        key: '/dashboard/surveys/health-assessment',
        label: 'Анкета «Образ жизни»',
      },
      {
        key: '/dashboard/surveys/nutrition-habits',
        label: 'Анкета «Пищевые привычки»',
      },
      {
        key: '/dashboard/surveys/user-profile-survey',
        label: 'Анкета «Оценка здоровья»',
      },
    ],
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
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleMenuClick = (key: string) => {
    router.push(key);
    if (onMenuClick) {
      onMenuClick();
    }
  };

  const handleToggleExpand = (key: string) => {
    setExpandedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const isActive = (key: string) => {
    return key === pathname;
  };

  const isExpanded = (key: string) => {
    return expandedItems.includes(key);
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
              className={`${styles.navItem} ${isActive(item.key) ? styles.active : ''}`}
              onClick={() => {
                if (item.children) {
                  handleToggleExpand(item.key);
                } else {
                  handleMenuClick(item.key);
                }
              }}
            >
              <div className={styles.navItemContent}>
                {item.icon && <span className={styles.navItemIcon}>{item.icon}</span>}
                <span className={styles.navItemLabel}>{item.label}</span>
              </div>
              {item.children && (
                <span
                  className={`${styles.expandIcon} ${isExpanded(item.key) ? styles.expanded : ''}`}
                >
                  <DownOutlined />
                </span>
              )}
            </div>
            {item.children && isExpanded(item.key) && (
              <div className={styles.submenu}>
                {item.children.map((child) => (
                  <div
                    key={child.key}
                    className={`${styles.submenuItem} ${isActive(child.key) ? styles.active : ''}`}
                    onClick={() => handleMenuClick(child.key)}
                  >
                    <span className={styles.submenuItemLabel}>{child.label}</span>
                  </div>
                ))}
              </div>
            )}
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
            className={`${styles.mobileNavItem} ${isActive(item.key) ? styles.active : ''}`}
            onClick={() => {
              if (item.children) {
                handleToggleExpand(item.key);
              } else {
                handleMenuClick(item.key);
              }
            }}
          >
            {item.icon && <span className={styles.navItemIcon}>{item.icon}</span>}
            <span>{item.label}</span>
            {item.children && (
              <span
                className={`${styles.expandIcon} ${isExpanded(item.key) ? styles.expanded : ''}`}
              >
                <DownOutlined />
              </span>
            )}
          </div>
          {item.children && isExpanded(item.key) && (
            <div className={styles.mobileSubmenu}>
              {item.children.map((child) => (
                <div
                  key={child.key}
                  className={`${styles.mobileSubmenuItem} ${isActive(child.key) ? styles.active : ''}`}
                  onClick={() => handleMenuClick(child.key)}
                >
                  <span>{child.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  if (isMobile) {
    return renderMobileMenu();
  }

  return renderDesktopMenu();
};
