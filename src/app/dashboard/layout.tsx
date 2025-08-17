'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Button, Drawer, Typography } from 'antd';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { MenuOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const { Content, Sider } = Layout;
const { Title } = Typography;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        <>
          <div
            style={{
              padding: '16px',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              position: 'sticky',
              top: 0,
              zIndex: 1000,
            }}
            onClick={handleMenuClick}
          >
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: '20px' }} />}
              onClick={(e) => {
                e.stopPropagation();
                handleMenuClick();
              }}
            />
            <Title
              level={4}
              style={{
                margin: 0,
                        color: '#16B6BE',
        background: 'linear-gradient(45deg, #16B6BE, #18C8D0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
                userSelect: 'none',
              }}
            >
              Личный кабинет
            </Title>
          </div>
          <Drawer
            title="Меню"
            placement="left"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            bodyStyle={{ padding: 0 }}
            width="100%"
            style={{ position: 'absolute' }}
          >
            <div style={{ padding: '24px 0' }}>
              <DashboardNav isMobile onMenuClick={() => setDrawerOpen(false)} />
            </div>
          </Drawer>
        </>
      ) : (
        <Sider width={250} theme="light">
          <DashboardNav />
        </Sider>
      )}
      <Layout>
        <Content
          style={{
            padding: isMobile ? '16px' : '24px',
            background: '#fff',
            minHeight: '100vh',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
