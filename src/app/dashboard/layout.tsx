'use client';

import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';

const { Content, Sider } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsNarrowScreen(width > 768 && width < 1680);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        <></>
      ) : (
        <Sider
          width={isNarrowScreen ? 280 : 250}
          theme="light"
          style={
            isNarrowScreen
              ? {
                  position: 'fixed',
                  height: '100vh',
                  left: 0,
                  top: 0,
                  zIndex: 100,
                }
              : {}
          }
        >
          <DashboardNav />
        </Sider>
      )}
      <Layout style={isNarrowScreen ? { marginLeft: 280 } : {}}>
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
