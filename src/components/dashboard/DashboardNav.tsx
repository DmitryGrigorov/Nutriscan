'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
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
  HomeOutlined,
  MedicineBoxOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  LogoutOutlined,
  SettingOutlined,
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

const dashboardMenuItems: MenuItem[] = [
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

const mainNavigationItems: MenuItem[] = [
  {
    key: '/',
    label: 'Главная',
    icon: <HomeOutlined />,
  },
  {
    key: '/about',
    label: 'О нас',
    icon: <InfoCircleOutlined />,
  },
  {
    key: '/pharmacy',
    label: 'Каталог продукции',
    icon: <MedicineBoxOutlined />,
    children: [
      {
        key: '/pharmacy',
        label: 'Каталог продукции',
      },
      {
        key: '/pharmacy/category',
        label: 'Категории',
      },
      {
        key: '/pharmacy/cart',
        label: 'Корзина',
      },
    ],
  },
  {
    key: '/about',
    label: 'Контакты',
    icon: <PhoneOutlined />,
  },
];

interface DashboardNavProps {
  isMobile?: boolean;
  onMenuClick?: () => void;
  includeMainNavigation?: boolean;
}

export const DashboardNav: React.FC<DashboardNavProps> = ({
  isMobile,
  onMenuClick,
  includeMainNavigation,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const getMenuItems = () => {
    if (isMobile && includeMainNavigation) {
      return [...mainNavigationItems, ...dashboardMenuItems];
    }
    return dashboardMenuItems;
  };

  const menuItems = getMenuItems();

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

  const renderMobileMenu = () => {
    if (includeMainNavigation) {
      return (
        <div className={styles.mobileNav}>
          {/* Основная навигация */}
          <div className={styles.mobileSectionHeader}>Основное меню</div>
          {mainNavigationItems.map((item) => (
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

          {/* Личный кабинет */}
          <div className={styles.mobileSectionHeader}>Личный кабинет</div>
          {dashboardMenuItems.map((item) => (
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

          {/* Дополнительные опции */}
          <div className={styles.mobileSectionHeader}>Аккаунт</div>
          {/* Админ панель для админов */}
          {(user?.$id === '683409e1a4097e2da357' || user?.$id === '680658de4352f354f0a9') && (
            <div className={styles.mobileNavItem} onClick={() => handleMenuClick('/admin')}>
              <span className={styles.navItemIcon}>
                <SettingOutlined />
              </span>
              <span>Админ панель</span>
            </div>
          )}
          {/* Выход */}
          <div
            className={`${styles.mobileNavItem} ${styles.logoutItem}`}
            onClick={async () => {
              await logout();
              if (onMenuClick) onMenuClick();
            }}
          >
            <span className={styles.navItemIcon}>
              <LogoutOutlined />
            </span>
            <span>Выйти</span>
          </div>
        </div>
      );
    }

    return (
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
  };

  if (isMobile) {
    return renderMobileMenu();
  }

  return renderDesktopMenu();
};
