'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, Descriptions, Spin, Typography } from 'antd';
import { surveyService } from '@/services/surveyService';
import { SurveyRecord } from '@/types/survey';
import { AppLayout } from '@/components/layout/AppLayout';

const { Title } = Typography;

export default function SurveyDetailsPage() {
  const params = useParams();
  const [survey, setSurvey] = useState<SurveyRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        if (typeof params.id === 'string') {
          const surveyData = await surveyService.getSurveyById(params.id);
          setSurvey(surveyData);
        }
      } catch (err) {
        setError('Failed to load survey details');
        console.error('Error fetching survey details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyDetails();
  }, [params.id]);

  if (loading) {
    return (
      <AppLayout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </AppLayout>
    );
  }

  if (error || !survey) {
    return (
      <AppLayout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Title level={3} type="danger">
            {error || 'Survey not found'}
          </Title>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Survey Details</Title>
        <Card>
          <Descriptions bordered>
            <Descriptions.Item label="Status" span={3}>
              {survey.status}
            </Descriptions.Item>
            <Descriptions.Item label="Created At" span={3}>
              {new Date(survey.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Gender" span={3}>
              {survey.surveyData.gender}
            </Descriptions.Item>
            {survey.surveyData.ageGroup && (
              <Descriptions.Item label="Age Group" span={3}>
                {survey.surveyData.ageGroup}
              </Descriptions.Item>
            )}
            {survey.surveyData.pregnancyStatus && (
              <Descriptions.Item label="Pregnancy Status" span={3}>
                {survey.surveyData.pregnancyStatus}
              </Descriptions.Item>
            )}
            {survey.surveyData.bodyMetrics && (
              <>
                <Descriptions.Item label="Height" span={1}>
                  {survey.surveyData.bodyMetrics.height} cm
                </Descriptions.Item>
                <Descriptions.Item label="Weight" span={1}>
                  {survey.surveyData.bodyMetrics.weight} kg
                </Descriptions.Item>
                <Descriptions.Item label="BMI" span={1}>
                  {survey.surveyData.bodyMetrics.bmi?.toFixed(1) || 'N/A'}
                </Descriptions.Item>
              </>
            )}
          </Descriptions>

          {survey.recommendations && survey.recommendations.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <Title level={4}>Recommendations</Title>
              <ul>
                {survey.recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
