'use client';

import React from 'react';
import { Layout } from 'antd';
import { Header } from './Header';
import Navigation from './Navigation';

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh', maxWidth: '100%' }}>
      <Header />
      <Navigation />
      <Content style={{ maxWidth: '100%' }}>{children}</Content>
    </Layout>
  );
};
