'use client';

import React from 'react';
import { Card, Row, Col, Typography, Space, Button, Divider } from 'antd';
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
  DatabaseOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { BasePage } from '@/components/dashboard/BasePage';

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
      style={{ height: '100%' }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space>
          {icon}
          <Title level={4} style={{ margin: 0 }}>{title}</Title>
        </Space>
        <Text type="secondary">{description}</Text>
      </Space>
    </Card>
  );
};

export default function DashboardPage() {
  const cards: DashboardCardProps[] = [
    {
      title: 'Личный кабинет',
      description: '',
      icon: <UserOutlined style={{ fontSize: '24px' }} />,
      path: '/dashboard/account'
    },
    {
      title: 'Опросы',
      description: 'Пройдите необходимые опросы для получения персонализированных рекомендаций',
      icon: <FileTextOutlined style={{ fontSize: '24px' }} />,
      path: '/dashboard/surveys'
    },
    {
      title: 'Опросник информация о о себе',
      description: 'Заполните информацию о себе для персонализации рекомендаций',
      icon: <DatabaseOutlined style={{ fontSize: '24px' }} />,
      path: '/dashboard/surveys/user-profile-survey'
    },
    {
      title: 'Опросник оценка здоровья',
      description: 'Оцените ваше текущее состояние здоровья и образ жизни',
      icon: <HeartOutlined style={{ fontSize: '24px' }} />,
      path: '/dashboard/surveys/health-assessment'
    },
    {
      title: 'Опросник пищевые привычки',
      description: 'Расскажите о ваших пищевых привычках и предпочтениях',
      icon: <AppleOutlined style={{ fontSize: '24px' }} />,
      path: '/dashboard/surveys/nutrition-habits'
    },
    {
      title: 'Анализы',
      description: 'Просмотр и загрузка результатов медицинских анализов',
      icon: <ExperimentOutlined style={{ fontSize: '24px' }} />,
      path: '/dashboard/analyses'
    },
    {
      title: 'Динамика показателей здоровья',
      description: 'Отслеживание изменений в показателях здоровья и анализов',
      icon: <LineChartOutlined style={{ fontSize: '24px' }} />,
      path: '/dashboard/trends'
    },
    {
      title: 'История потребления БАДов',
      description: 'Управление приемом биологически активных добавок',
      icon: <MedicineBoxOutlined style={{ fontSize: '24px' }} />,
      path: '/dashboard/supplements'
    },
    {
      title: 'Персональные рекомендации',
      description: 'Персонализированные рекомендации по здоровью и питанию',
      icon: <BulbOutlined style={{ fontSize: '24px' }} />,
      path: '/dashboard/recommendations'
    },
    {
      title: 'Акции',
      description: 'Специальные предложения и скидки на БАДы и анализы',
      icon: <GiftOutlined style={{ fontSize: '24px' }} />,
      path: '/dashboard/promotions'
    },
    {
      title: 'Напоминания о БАДах',
      description: 'Управление напоминаниями о приеме добавок',
      icon: <BellOutlined style={{ fontSize: '24px' }} />,
      path: '/dashboard/supplement-reminders'
    },
    {
      title: 'Напоминания об анализах',
      description: 'Управление напоминаниями о сдаче анализов',
      icon: <CalendarOutlined style={{ fontSize: '24px' }} />,
      path: '/dashboard/analysis-reminders'
    }
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
