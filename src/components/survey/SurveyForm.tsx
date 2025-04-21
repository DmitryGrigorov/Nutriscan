'use client';

import React from 'react';
import { Card, Steps, Button } from 'antd';
import { useSurvey } from '@/contexts/SurveyContext';
import { GenderStep } from './steps/GenderStep';
import { AgeStep } from './steps/AgeStep';
import { PregnancyStep } from './steps/PregnancyStep';
import { BodyMetricsStep } from './steps/BodyMetricsStep';
import { SurveySubmit } from './SurveySubmit';

const getSteps = (gender: string | null) => [
  {
    title: 'Пол',
    content: <GenderStep />,
  },
  {
    title: 'Возраст',
    content: <AgeStep />,
  },
  ...(gender === 'female'
    ? [
        {
          title: 'Беременность',
          content: <PregnancyStep />,
        },
      ]
    : []),
  {
    title: 'Метрики',
    content: <BodyMetricsStep />,
  },
];

const SurveyForm: React.FC = () => {
  const { state, dispatch } = useSurvey();
  const steps = getSteps(state.gender);

  const next = () => {
    dispatch({ type: 'SET_STEP', payload: state.step + 1 });
  };

  const prev = () => {
    dispatch({ type: 'SET_STEP', payload: state.step - 1 });
  };

  const isLastStep = state.step === steps.length - 1;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <Steps
        current={state.step}
        items={steps.map((item) => ({ title: item.title }))}
        className="mb-8"
        responsive
        size="small"
      />
      <div className="min-h-[400px] p-4">{steps[state.step].content}</div>
      <div className="flex justify-between mt-8">
        <Button onClick={prev} disabled={state.step === 0}>
          Назад
        </Button>
        {isLastStep ? (
          <SurveySubmit />
        ) : (
          <Button type="primary" onClick={next}>
            Далее
          </Button>
        )}
      </div>
    </Card>
  );
};

export default SurveyForm;
