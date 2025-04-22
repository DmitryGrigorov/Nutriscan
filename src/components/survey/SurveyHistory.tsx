'use client';

import React, { useEffect, useState } from 'react';
import { List, Card, Typography, Spin, Empty, Tag, Button } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { surveyService } from '@/services/surveyService';
import { SurveyRecord } from '@/types/survey';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

const { Text, Paragraph } = Typography;

export const SurveyHistory: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [surveys, setSurveys] = useState<SurveyRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const userSurveys = await surveyService.getUserSurveys(user.$id);
        setSurveys(userSurveys);
      } catch (error) {
        console.error('Ошибка при загрузке опросников:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'processing';
      case 'abandoned':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Завершен';
      case 'in_progress':
        return 'В процессе';
      case 'abandoned':
        return 'Прерван';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy, HH:mm', { locale: ru });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (surveys.length === 0) {
    return <Empty description="У вас пока нет опросников" className="my-8" />;
  }

  console.log(surveys);

  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
      dataSource={surveys}
      renderItem={(survey) => (
        <List.Item key={survey.id}>
          <Card
            title={
              <div className="flex justify-between items-center">
                <Text strong>{formatDate(survey.createdAt)}</Text>
                <Tag color={getStatusColor(survey.status)}>{getStatusText(survey.status)}</Tag>
              </div>
            }
            actions={[
              <Button key={1} type="primary" onClick={() => router.push(`/surveys/${survey.id}`)}>
                Подробнее
              </Button>,
            ]}
          >
            <Paragraph>
              <Text strong>Пол: </Text>
              {survey.surveyData.gender === 'male' ? 'Мужской' : 'Женский'}
            </Paragraph>
            {survey.surveyData.ageGroup && (
              <Paragraph>
                <Text strong>Возрастная группа: </Text>
                {survey.surveyData.ageGroup}
              </Paragraph>
            )}
            {survey.surveyData.bodyMetrics && (
              <>
                <Paragraph>
                  <Text strong>Рост: </Text>
                  {survey.surveyData.bodyMetrics.height} см
                </Paragraph>
                <Paragraph>
                  <Text strong>Вес: </Text>
                  {survey.surveyData.bodyMetrics.weight} кг
                </Paragraph>
                {survey.surveyData.bodyMetrics.bmi && (
                  <Paragraph>
                    <Text strong>ИМТ: </Text>
                    {survey.surveyData.bodyMetrics.bmi.toFixed(1)}
                  </Paragraph>
                )}
              </>
            )}
            {survey.recommendations && survey.recommendations.length > 0 && (
              <Paragraph>
                <Text strong>Рекомендации: </Text>
                {survey.recommendations.length} шт.
              </Paragraph>
            )}
          </Card>
        </List.Item>
      )}
    />
  );
};
