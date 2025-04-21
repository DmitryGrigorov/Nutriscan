'use client';

import React from 'react';
import { Form, Radio, Space, Typography } from 'antd';
import { useSurvey } from '@/contexts/SurveyContext';
import { AgeGroup } from '@/types/survey';

const { Title, Paragraph } = Typography;

export const AgeStep: React.FC = () => {
  const { state, dispatch } = useSurvey();

  const handleAgeChange = (ageGroup: AgeGroup) => {
    dispatch({ type: 'SET_AGE_GROUP', payload: ageGroup });
  };

  return (
    <div className="flex flex-col gap-4">
      <Title level={4}>Укажите ваш возраст</Title>
      <Paragraph>
        Возраст является важным фактором при подборе рекомендаций и дозировок.
      </Paragraph>
      <Form layout="vertical" className="w-full">
        <Form.Item>
          <Radio.Group
            value={state.ageGroup}
            onChange={(e) => handleAgeChange(e.target.value)}
            className="w-full"
          >
            <Space direction="vertical" className="w-full">
              <Radio.Button value="under_18" className="w-full h-12 flex items-center px-4">
                Младше 18 лет
              </Radio.Button>
              <Radio.Button value="18_30" className="w-full h-12 flex items-center px-4">
                18-30 лет
              </Radio.Button>
              <Radio.Button value="31_45" className="w-full h-12 flex items-center px-4">
                31-45 лет
              </Radio.Button>
              <Radio.Button value="46_60" className="w-full h-12 flex items-center px-4">
                46-60 лет
              </Radio.Button>
              <Radio.Button value="over_60" className="w-full h-12 flex items-center px-4">
                Старше 60 лет
              </Radio.Button>
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
}; 