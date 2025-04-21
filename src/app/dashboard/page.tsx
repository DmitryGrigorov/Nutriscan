'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, Typography, Descriptions, Space, Spin } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { appwriteApi } from '@/lib/appwrite/api';
import { SurveyData } from '@/types';
import { useEffect, useState } from 'react';

const { Title } = Typography;

function DashboardContent() {
  const { user } = useAuth();
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurveyData = async () => {
      if (!user) return;
      try {
        const data = await appwriteApi.surveys.getUserSurvey(user.$id);
        setSurveyData(data);
      } catch (error) {
        console.error('Error loading survey data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurveyData();
  }, [user]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Title level={3}>Личный кабинет</Title>
        <Descriptions bordered>
          <Descriptions.Item label="Имя" span={3}>
            {user?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>
            {user?.email}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {surveyData && (
        <Card title="Данные опроса">
          <Descriptions bordered>
            <Descriptions.Item label="Возраст" span={3}>
              {surveyData.age}
            </Descriptions.Item>
            <Descriptions.Item label="Пол" span={3}>
              {surveyData.gender === 'male' ? 'Мужской' : 'Женский'}
            </Descriptions.Item>
            <Descriptions.Item label="Цель" span={3}>
              {surveyData.goal}
            </Descriptions.Item>
            <Descriptions.Item label="Уровень активности" span={3}>
              {surveyData.activityLevel}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </Space>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
