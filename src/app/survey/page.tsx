'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import SurveyForm from '@/components/survey/SurveyForm';

const { Title, Paragraph } = Typography;

export default function SurveyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <Typography className="text-center mb-8">
          <Title level={2}>Опросник для подбора БАДов</Title>
          <Paragraph>
            Пожалуйста, заполните этот опросник, чтобы помочь нам понять ваши потребности в здоровье
            и предоставить персонализированные рекомендации.
          </Paragraph>
        </Typography>
        <SurveyForm />
      </Card>
    </div>
  );
}
