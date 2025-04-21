'use client';

import React from 'react';
import { Form, InputNumber, Typography } from 'antd';
import { useSurvey } from '@/contexts/SurveyContext';
import { BodyMetrics } from '@/types/survey';

const { Title, Paragraph } = Typography;

export const BodyMetricsStep: React.FC = () => {
  const { state, dispatch } = useSurvey();

  const handleMetricsChange = (values: BodyMetrics) => {
    const height = values.height;
    const weight = values.weight;
    const bmi = height && weight ? weight / ((height / 100) ** 2) : undefined;
    
    dispatch({ 
      type: 'SET_BODY_METRICS', 
      payload: { ...values, bmi } 
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Title level={4}>Антропометрические данные</Title>
      <Paragraph>
        Эти данные помогут нам рассчитать индекс массы тела и подобрать оптимальные дозировки.
      </Paragraph>
      <Form 
        layout="vertical" 
        className="w-full"
        onValuesChange={(_, values) => handleMetricsChange(values)}
        initialValues={state.bodyMetrics || {}}
      >
        <Form.Item 
          name="height" 
          label="Рост (см)"
          rules={[{ required: true, message: 'Пожалуйста, укажите рост' }]}
        >
          <InputNumber 
            min={100} 
            max={250} 
            className="w-full" 
            placeholder="Введите рост в сантиметрах"
          />
        </Form.Item>

        <Form.Item 
          name="weight" 
          label="Вес (кг)"
          rules={[{ required: true, message: 'Пожалуйста, укажите вес' }]}
        >
          <InputNumber 
            min={30} 
            max={200} 
            className="w-full" 
            placeholder="Введите вес в килограммах"
          />
        </Form.Item>

        {state.bodyMetrics?.bmi && (
          <Paragraph>
            Ваш ИМТ: {state.bodyMetrics.bmi.toFixed(1)}
          </Paragraph>
        )}
      </Form>
    </div>
  );
}; 