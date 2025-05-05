'use client';

import React, { useEffect, useState } from 'react';
import { Card, List, Typography, Tag, Button, Space } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { appwriteApi } from '@/lib/appwrite/api';
import { SurveyData } from '@/types';
import { BasePage } from '@/components/dashboard/BasePage';
import { FileTextOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function SurveysPage() {
  const { user } = useAuth();
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurveys = async () => {
      if (!user) return;
      try {
        const response = await appwriteApi.surveys.getUserSurvey(user.$id);
        if (response) {
          setSurveys([response]);
        }
      } catch (error) {
        console.error('Error loading surveys:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurveys();
  }, [user]);

  const getGoalLabel = (goal: string) => {
    switch (goal) {
      case 'weight-loss':
        return 'Похудение';
      case 'muscle-gain':
        return 'Набор мышечной массы';
      case 'maintenance':
        return 'Поддержание веса';
      default:
        return goal;
    }
  };

  const getActivityLabel = (activity: string) => {
    switch (activity) {
      case 'sedentary':
        return 'Малоподвижный';
      case 'moderate':
        return 'Умеренный';
      case 'active':
        return 'Активный';
      case 'very-active':
        return 'Очень активный';
      default:
        return activity;
    }
  };

  return (
    <BasePage
      title="Результаты опросов"
      extra={
        <Button type="primary" icon={<FileTextOutlined />}>
          Пройти новый опрос
        </Button>
      }
    >
      <List
        loading={loading}
        dataSource={surveys}
        renderItem={(survey) => (
          <List.Item>
            <Card style={{ width: '100%' }}>
              <List.Item.Meta
                title={`Опрос от ${new Date(survey.createdAt).toLocaleDateString()}`}
                description={
                  <Space direction="vertical">
                    <Text>Возраст: {survey.age}</Text>
                    <Text>Пол: {survey.gender === 'male' ? 'Мужской' : 'Женский'}</Text>
                    <Text>Цель: {getGoalLabel(survey.goal)}</Text>
                    <Text>Уровень активности: {getActivityLabel(survey.activityLevel)}</Text>
                  </Space>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </BasePage>
  );
} 