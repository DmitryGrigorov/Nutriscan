'use client';

import React from 'react';
import { SurveyDetails } from '@/components/survey/SurveyDetails';

interface SurveyPageProps {
  params: {
    id: string;
  };
}

export default function SurveyPage({ params }: SurveyPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <SurveyDetails surveyId={params.id} />
    </div>
  );
}
