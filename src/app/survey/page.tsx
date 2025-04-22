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
          <Title level={2}>Health Survey</Title>
          <Paragraph>
            Please fill out this survey to help us understand your health needs and provide
            personalized recommendations.
          </Paragraph>
        </Typography>
        <SurveyForm />
      </Card>
    </div>
  );
}
