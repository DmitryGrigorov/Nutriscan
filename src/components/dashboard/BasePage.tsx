'use client';

import React from 'react';
import { Card, Typography, Space } from 'antd';

const { Title } = Typography;

interface BasePageProps {
  title: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
}

export const BasePage: React.FC<BasePageProps> = ({ title, children, extra }) => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Title level={2}>{title}</Title>
          {extra}
        </Space>
      </Card>
      {children}
    </Space>
  );
}; 