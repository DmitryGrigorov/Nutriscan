'use client';

import React from 'react';
import { Form, Radio, Space, Typography } from 'antd';
import { useSurvey } from '@/contexts/SurveyContext';
import { Gender } from '@/types/survey';

const { Title, Paragraph } = Typography;

export const GenderStep: React.FC = () => {
  const { state, dispatch } = useSurvey();

  const handleGenderChange = (gender: Gender) => {
    dispatch({ type: 'SET_GENDER', payload: gender });
  };

  return (
    <div className="flex flex-col gap-4">
      <Title level={4}>Укажите ваш пол</Title>
      <Paragraph>
        Этот вопрос поможет нам определить дальнейшие шаги опросника и подобрать наиболее подходящие
        рекомендации.
      </Paragraph>
      <Form layout="vertical" className="w-full">
        <Form.Item>
          <Radio.Group
            value={state.gender}
            onChange={(e) => handleGenderChange(e.target.value)}
            className="w-full"
          >
            <Space direction="vertical" className="w-full">
              <Radio.Button value="male" className="w-full h-12 flex items-center px-4">
                Мужской
              </Radio.Button>
              <Radio.Button value="female" className="w-full h-12 flex items-center px-4">
                Женский
              </Radio.Button>
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};
