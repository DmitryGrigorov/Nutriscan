'use client';

import React from 'react';
import { Card, Row, Col, Typography, Space } from 'antd';
import {
  FileTextOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  LineChartOutlined,
  GiftOutlined,
  BulbOutlined,
  CalendarOutlined,
  BellOutlined,
  UserOutlined,
  HeartOutlined,
  AppleOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { BasePage } from '@/components/dashboard/BasePage';
import '@/styles/dashboard.css';

const { Title, Text } = Typography;

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, path }) => {
  const router = useRouter();

  return (
    <Card
      hoverable
      onClick={() => router.push(path)}
      className="dashboard-card"
      bodyStyle={{
        padding: '16px',
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space>
          <div className="dashboard-icon">{icon}</div>
          <Title level={4} className="dashboard-title">
            {title}
          </Title>
        </Space>
        <Text type="secondary" className="dashboard-description">
          {description}
        </Text>
      </Space>
    </Card>
  );
};

export default function DashboardPage() {
  const cards: DashboardCardProps[] = [
    {
      title: 'Личный кабинет',
      description: 'Управление личными данными и настройками',
      icon: <UserOutlined />,
      path: '/dashboard/account',
    },
    {
      title: 'Опросы',
      description: 'Пройдите необходимые опросы для получения персонализированных рекомендаций',
      icon: <FileTextOutlined />,
      path: '/dashboard/surveys',
    },
    {
      title: 'Опросник информация о о себе',
      description: 'Заполните информацию о себе для персонализации рекомендаций',
      icon: <DatabaseOutlined />,
      path: '/dashboard/surveys/user-profile-survey',
    },
    {
      title: 'Опросник оценка здоровья',
      description: 'Оцените ваше текущее состояние здоровья и образ жизни',
      icon: <HeartOutlined />,
      path: '/dashboard/surveys/health-assessment',
    },
    {
      title: 'Опросник пищевые привычки',
      description: 'Расскажите о ваших пищевых привычках и предпочтениях',
      icon: <AppleOutlined />,
      path: '/dashboard/surveys/nutrition-habits',
    },
    {
      title: 'Анализы',
      description: 'Просмотр и загрузка результатов медицинских анализов',
      icon: <ExperimentOutlined />,
      path: '/dashboard/analyses',
    },
    {
      title: 'Динамика показателей здоровья',
      description: 'Отслеживание изменений в показателях здоровья и анализов',
      icon: <LineChartOutlined />,
      path: '/dashboard/trends',
    },
    {
      title: 'История потребления БАДов',
      description: 'Управление приемом биологически активных добавок',
      icon: <MedicineBoxOutlined />,
      path: '/dashboard/supplements',
    },
    {
      title: 'Персональные рекомендации',
      description: 'Персонализированные рекомендации по здоровью и питанию',
      icon: <BulbOutlined />,
      path: '/dashboard/recommendations',
    },
    {
      title: 'Акции',
      description: 'Специальные предложения и скидки на БАДы и анализы',
      icon: <GiftOutlined />,
      path: '/dashboard/promotions',
    },
    {
      title: 'Напоминания о БАДах',
      description: 'Управление напоминаниями о приеме добавок',
      icon: <BellOutlined />,
      path: '/dashboard/supplement-reminders',
    },
    {
      title: 'Напоминания об анализах',
      description: 'Управление напоминаниями о сдаче анализов',
      icon: <CalendarOutlined />,
      path: '/dashboard/analysis-reminders',
    },
  ];

  return (
    <BasePage title="Панель управления">
      <Row gutter={[16, 16]}>
        {cards.map((card, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <DashboardCard {...card} />
          </Col>
        ))}
      </Row>
    </BasePage>
  );
}
