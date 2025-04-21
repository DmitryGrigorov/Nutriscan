'use client';

import React from 'react';
import { Typography, Tabs } from 'antd';
import { SurveyHistory } from '@/components/survey/SurveyHistory';
import SurveyForm from '@/components/survey/SurveyForm';
import { SurveyProvider } from '@/contexts/SurveyContext';

const { Title } = Typography;

export default function SurveysPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2} className="text-center mb-8">
        Опросник для подбора БАДов
      </Title>

      <Tabs
        defaultActiveKey="new"
        items={[
          {
            key: 'new',
            label: 'Новый опросник',
            children: (
              <SurveyProvider>
                <SurveyForm />
              </SurveyProvider>
            ),
          },
          {
            key: 'history',
            label: 'История опросников',
            children: <SurveyHistory />,
          },
        ]}
        className="max-w-4xl mx-auto"
      />
    </div>
  );
}
