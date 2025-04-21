'use client';

import React from 'react';
import { Form, Radio, Space, Typography } from 'antd';
import { useSurvey } from '@/contexts/SurveyContext';
import { PregnancyStatus, PregnancyTerm, BreastfeedingTerm } from '@/types/survey';

const { Title } = Typography;

export const PregnancyStep: React.FC = () => {
  const { state, dispatch } = useSurvey();

  const handleStatusChange = (status: PregnancyStatus) => {
    dispatch({ type: 'SET_PREGNANCY_STATUS', payload: status });
  };

  const handleTermChange = (term: PregnancyTerm | BreastfeedingTerm) => {
    if (state.pregnancyStatus === 'pregnant') {
      dispatch({ type: 'SET_PREGNANCY_TERM', payload: term as PregnancyTerm });
    } else {
      dispatch({ type: 'SET_BREASTFEEDING_TERM', payload: term as BreastfeedingTerm });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Title level={4}>Беременность и грудное вскармливание</Title>
      <Form layout="vertical" className="w-full">
        <Form.Item>
          <Radio.Group
            value={state.pregnancyStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full"
          >
            <Space direction="vertical" className="w-full">
              <Radio.Button value="pregnant" className="w-full h-12 flex items-center px-4">
                Да, я беременна
              </Radio.Button>
              <Radio.Button value="breastfeeding" className="w-full h-12 flex items-center px-4">
                Да, кормлю грудью
              </Radio.Button>
              <Radio.Button value="none" className="w-full h-12 flex items-center px-4">
                Нет
              </Radio.Button>
            </Space>
          </Radio.Group>
        </Form.Item>

        {state.pregnancyStatus === 'pregnant' && (
          <Form.Item>
            <Title level={5}>На каком сроке беременности вы находитесь?</Title>
            <Radio.Group
              value={state.pregnancyTerm}
              onChange={(e) => handleTermChange(e.target.value)}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                <Radio.Button
                  value="first_trimester"
                  className="w-full h-12 flex items-center px-4"
                >
                  Первый триместр
                </Radio.Button>
                <Radio.Button
                  value="second_trimester"
                  className="w-full h-12 flex items-center px-4"
                >
                  Второй триместр
                </Radio.Button>
                <Radio.Button
                  value="third_trimester"
                  className="w-full h-12 flex items-center px-4"
                >
                  Третий триместр
                </Radio.Button>
              </Space>
            </Radio.Group>
          </Form.Item>
        )}

        {state.pregnancyStatus === 'breastfeeding' && (
          <Form.Item>
            <Title level={5}>Как долго вы кормите грудью?</Title>
            <Radio.Group
              value={state.breastfeedingTerm}
              onChange={(e) => handleTermChange(e.target.value)}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                <Radio.Button value="early" className="w-full h-12 flex items-center px-4">
                  До 3 месяцев
                </Radio.Button>
                <Radio.Button value="middle" className="w-full h-12 flex items-center px-4">
                  3-6 месяцев
                </Radio.Button>
                <Radio.Button value="late" className="w-full h-12 flex items-center px-4">
                  Более 6 месяцев
                </Radio.Button>
              </Space>
            </Radio.Group>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};
