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
        setSurvey(surveyData);
      } catch (error) {
        console.error('Ошибка при загрузке опросника:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [surveyId, user]);

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

  if (!survey) {
    return <Empty description="Опросник не найден" className="my-8" />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()} className="mb-4">
        Назад
      </Button>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <Title level={3}>Опросник от {formatDate(survey.createdAt)}</Title>
          <Tag color={getStatusColor(survey.status)}>{getStatusText(survey.status)}</Tag>
        </div>

        <Descriptions bordered column={1}>
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

        <Divider orientation="left">Основная информация</Divider>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Пол">
            {survey.gender === 'male' ? 'Мужской' : 'Женский'}
          </Descriptions.Item>
          {survey.ageGroup && (
            <Descriptions.Item label="Возрастная группа">{survey.ageGroup}</Descriptions.Item>
          )}
          {survey.pregnancyStatus && (
            <Descriptions.Item label="Беременность/Грудное вскармливание">
              {survey.pregnancyStatus === 'pregnant'
                ? 'Беременна'
                : survey.pregnancyStatus === 'breastfeeding'
                  ? 'Кормит грудью'
                  : 'Нет'}
            </Descriptions.Item>
          )}
          {survey.pregnancyTerm && (
            <Descriptions.Item label="Срок беременности">
              {survey.pregnancyTerm === 'first_trimester'
                ? 'Первый триместр'
                : survey.pregnancyTerm === 'second_trimester'
                  ? 'Второй триместр'
                  : 'Третий триместр'}
            </Descriptions.Item>
          )}
          {survey.breastfeedingTerm && (
            <Descriptions.Item label="Срок грудного вскармливания">
              {survey.breastfeedingTerm === 'early'
                ? 'До 3 месяцев'
                : survey.breastfeedingTerm === 'middle'
                  ? '3-6 месяцев'
                  : 'Более 6 месяцев'}
            </Descriptions.Item>
          )}
        </Descriptions>

        {survey.bodyMetrics && (
          <>
            <Divider orientation="left">Антропометрические данные</Divider>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Рост">{survey.bodyMetrics.height} см</Descriptions.Item>
              <Descriptions.Item label="Вес">{survey.bodyMetrics.weight} кг</Descriptions.Item>
              {survey.bodyMetrics.bmi && (
                <Descriptions.Item label="Индекс массы тела (ИМТ)">
                  {survey.bodyMetrics.bmi.toFixed(1)}
                </Descriptions.Item>
              )}
            </Descriptions>
          </>
        )}

        {survey.recommendations && survey.recommendations.length > 0 && (
          <>
            <Divider orientation="left">Рекомендации</Divider>
            <div className="bg-gray-50 p-4 rounded">
              {survey.recommendations.map((rec, index) => (
                <Paragraph key={index} className="mb-2">
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
