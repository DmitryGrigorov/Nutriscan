'use client';

import React from 'react';
import { Button, Space } from 'antd';
import { useSurvey } from '@/contexts/SurveyContext';

export const SurveyNavigation: React.FC = () => {
  const { state, dispatch } = useSurvey();

  const handleNext = () => {
    dispatch({ type: 'SET_STEP', payload: state.step + 1 });
  };

  const handlePrevious = () => {
    dispatch({ type: 'SET_STEP', payload: state.step - 1 });
  };

  return (
    <div className="flex justify-between items-center w-full mt-8 px-4 sm:px-0">
      <Space>
        {state.step > 0 && (
          <Button onClick={handlePrevious} size="large">
            Назад
          </Button>
        )}
      </Space>
      <Space>
        <Button type="primary" onClick={handleNext} size="large">
          Далее
        </Button>
      </Space>
    </div>
  );
}; 