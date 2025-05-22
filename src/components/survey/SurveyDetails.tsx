'use client';

import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, Empty, Descriptions, Tag, Button, Divider } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { surveyService } from '@/services/surveyService';
import { SurveyRecord } from '@/types/survey';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Paragraph } = Typography;

interface SurveyDetailsProps {
  surveyId: string;
}

export const SurveyDetails: React.FC<SurveyDetailsProps> = ({ surveyId }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [survey, setSurvey] = useState<SurveyRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurvey = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const surveyData = await surveyService.getSurveyById(surveyId);
        const surveyRecord: SurveyRecord = {
          id: surveyData.$id,
          userId: surveyData.userId,
          createdAt: surveyData.createdAt.toISOString(),
          updatedAt: new Date().toISOString(),
          completedAt: undefined,
          status: 'completed',
          version: '1.0',
          surveyData: {
            gender: surveyData.gender,
            ageGroup: '18-24', // Default age group since it's not in SurveyData
            bodyMetrics: undefined, // No body metrics in SurveyData
          },
          recommendations: [],
        };
        setSurvey(surveyRecord);
      } catch (error) {
        console.error('Ошибка при загрузке опросника:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [surveyId, user]);

  const getStatusColor = (status: string): string => {
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

  const getStatusText = (status: string): string => {
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

  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), 'dd MMMM yyyy, HH:mm', { locale: ru });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!survey) {
    return <Empty description="Опросник не найден" className="my-8" />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => router.back()}
        className="mb-4 text-sm sm:text-base"
      >
        Назад
      </Button>

      <Card className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2 sm:gap-0">
          <Title level={3} className="text-lg sm:text-2xl">
            Опросник от {formatDate(survey.createdAt)}
          </Title>
          <Tag color={getStatusColor(survey.status)} className="text-xs sm:text-sm">
            {getStatusText(survey.status)}
          </Tag>
        </div>

        <Descriptions bordered column={1} className="text-sm sm:text-base">
          <Descriptions.Item label="Дата создания">
            {formatDate(survey.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Дата обновления">
            {formatDate(survey.updatedAt)}
          </Descriptions.Item>
          {survey.completedAt && (
            <Descriptions.Item label="Дата завершения">
              {formatDate(survey.completedAt)}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Версия">{survey.version}</Descriptions.Item>
        </Descriptions>

        <Divider orientation="left" className="text-sm sm:text-base">
          Основная информация
        </Divider>

        <Descriptions bordered column={1} className="text-sm sm:text-base">
          <Descriptions.Item label="Пол">
            {survey.surveyData.gender === 'male' ? 'Мужской' : 'Женский'}
          </Descriptions.Item>
          {survey.surveyData.ageGroup && (
            <Descriptions.Item label="Возрастная группа">
              {survey.surveyData.ageGroup}
            </Descriptions.Item>
          )}
        </Descriptions>

        {survey.surveyData.bodyMetrics && (
          <>
            <Divider orientation="left" className="text-sm sm:text-base">
              Антропометрические данные
            </Divider>
            <Descriptions bordered column={1} className="text-sm sm:text-base">
              <Descriptions.Item label="Рост">
                {survey.surveyData.bodyMetrics.height} см
              </Descriptions.Item>
              <Descriptions.Item label="Вес">
                {survey.surveyData.bodyMetrics.weight} кг
              </Descriptions.Item>
              {survey.surveyData.bodyMetrics.bmi && (
                <Descriptions.Item label="Индекс массы тела (ИМТ)">
                  {survey.surveyData.bodyMetrics.bmi.toFixed(1)}
                </Descriptions.Item>
              )}
            </Descriptions>
          </>
        )}

        {survey.recommendations && survey.recommendations.length > 0 && (
          <>
            <Divider orientation="left" className="text-sm sm:text-base">
              Рекомендации
            </Divider>
            <div className="bg-gray-50 p-3 sm:p-4 rounded">
              {survey.recommendations.map((rec, index) => (
                <Paragraph key={index} className="mb-2 text-sm sm:text-base">
                  {rec}
                </Paragraph>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
