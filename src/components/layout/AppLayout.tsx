'use client';

import { Layout } from 'antd';
import { Header } from './Header';

const { Content } = Layout;

interface AppLayoutProps {
    children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Content style={{ padding: '24px', background: '#f5f5f5' }}>
                {children}
            </Content>
        </Layout>
    );
}; 