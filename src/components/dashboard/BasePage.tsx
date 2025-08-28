'use client';

import React, { useEffect } from 'react';
import { Typography, Space } from 'antd';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getFontStyle } from '@/lib/fontUtils';

const { Title } = Typography;

interface BasePageProps {
  title: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
}

export const BasePage: React.FC<BasePageProps> = ({ title, children, extra }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    // Добавляем data-page атрибут к body для dashboard страниц
    document.body.setAttribute('data-page', 'dashboard');
    
    return () => {
      // Убираем атрибут при размонтировании
      document.body.removeAttribute('data-page');
    };
  }, []);

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
        <Title
          level={isMobile ? 4 : 3}
          style={{
            margin: 0,
            ...getFontStyle('bold'),
          }}
        >
          {title}
        </Title>
        {extra}
      </div>
      {children}
    </Space>
  );
};
