'use client';

import React, { useState, useEffect } from 'react';
import { Card, List, Typography, Button, Tag, Space, Progress } from 'antd';
import { useRouter } from 'next/navigation';
import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { BasePage } from '@/components/dashboard/BasePage';
import { appwriteApi } from '@/lib/appwrite/api';

const { Text } = Typography;

interface Survey {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'not-started';
  progress: number;
  lastUpdated?: string;
}

export default function SurveysDashboardPage() {
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: 'user-profile-survey',
      title: 'Профиль пользователя',
      description: 'Анкета для определения ваших целей, образа жизни и предпочтений',
      status: 'not-started',
      progress: 0,
    },
    {
      id: 'health-assessment',
      title: 'Оценка состояния здоровья',
      description: 'Опросник для оценки текущего состояния здоровья и выявления проблемных зон',
      status: 'in-progress',
      progress: 30,
      lastUpdated: '2024-03-15',
    },
    {
      id: 'nutrition-habits',
      title: 'Пищевые привычки',
      description: 'Анализ ваших пищевых привычек и предпочтений в питании',
      status: 'completed',
      progress: 100,
      lastUpdated: '2024-03-10',
    },
  ]);
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'processing';
      case 'not-started':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined />;
      case 'in-progress':
        return <ClockCircleOutlined />;
      case 'not-started':
        return <FileTextOutlined />;
      default:
        return <FileTextOutlined />;
    }
  };

  const handleStartSurvey = (surveyId: string) => {
    router.push(`/dashboard/surveys/${surveyId}`);
  };

  return (
    <BasePage title="Опросы">
      <List
        dataSource={surveys}
        renderItem={(survey) => (
          <List.Item>
            <Card style={{ width: '100%' }}>
              <List.Item.Meta
                avatar={getStatusIcon(survey.status)}
                title={
                  <Space>
                    {survey.title}
                    <Tag color={getStatusColor(survey.status)}>
                      {survey.status === 'completed'
                        ? 'Завершено'
                        : survey.status === 'in-progress'
                        ? 'В процессе'
                        : 'Не начато'}
                    </Tag>
                  </Space>
                }
                description={
                  <>
                    <Text>{survey.description}</Text>
                    <br />
                    {survey.lastUpdated && (
                      <Text type="secondary">
                        Последнее обновление:{' '}
                        {new Date(survey.lastUpdated).toLocaleDateString()}
                      </Text>
                    )}
                    <Progress
                      percent={survey.progress}
                      size="small"
                      style={{ marginTop: 8 }}
                    />
                  </>
                }
              />
              <Button
                type="primary"
                onClick={() => handleStartSurvey(survey.id)}
                style={{ marginTop: 16 }}
              >
                {survey.status === 'completed'
                  ? 'Пройти заново'
                  : survey.status === 'in-progress'
                  ? 'Продолжить'
                  : 'Начать'}
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </BasePage>
  );
} 