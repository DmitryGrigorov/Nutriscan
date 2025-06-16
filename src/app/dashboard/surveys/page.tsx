'use client';

import React from 'react';
import { Card, List, Typography, Button, Tag, Space, Progress } from 'antd';
import { useRouter } from 'next/navigation';
import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { BasePage } from '@/components/dashboard/BasePage';

const { Text, Title } = Typography;

export default function SurveysDashboardPage() {
  const surveys = [
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
    {
      id: 'supplements',
      title: 'Подбор БАДов',
      description: 'Опросник для персонального подбора биологически активных добавок',
      status: 'not-started',
      progress: 0,
    },
  ];
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
    <div style={{ padding: '24px' }}>
      <div
        style={{
          background: 'linear-gradient(120deg, #e0f7fa 0%, #f6fffe 100%)',
          padding: '16px 24px',
          borderRadius: '8px',
          marginBottom: '24px',
          border: '1px solid #2ec6c6',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            color: '#003b3b',
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              background: '#2ec6c6',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: '16px',
              marginRight: '12px',
              fontSize: '14px',
            }}
          >
            В разработке
          </span>
          Раздел находится в разработке
        </div>
      </div>

      <BasePage title="Опросы">
        <Card>
          <Title level={2}>Опросы и анкеты</Title>
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
                        <Progress percent={survey.progress} size="small" style={{ marginTop: 8 }} />
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
        </Card>
      </BasePage>
    </div>
  );
}
