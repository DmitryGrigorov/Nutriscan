'use client';

import React from 'react';
import { Typography, Space } from 'antd';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const { Title } = Typography;

interface BasePageProps {
  title: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
}

export const BasePage: React.FC<BasePageProps> = ({ title, children, extra }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <Title level={isMobile ? 4 : 3} style={{ margin: 0 }}>
          {title}
        </Title>
        {extra}
      </div>
      {children}
    </Space>
  );
};
