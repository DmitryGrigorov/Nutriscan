'use client';

import React from 'react';
import { Form, Radio, Space, Typography } from 'antd';
import { useSurvey } from '@/contexts/SurveyContext';
import { PregnancyStatus, PregnancyTerm, BreastfeedingTerm } from '@/types/survey';

const { Title } = Typography;

export const PregnancyStep: React.FC = () => {
  const { state, dispatch } = useSurvey();

  // Если пол мужской, не отображаем компонент
  if (state.gender === 'male') {
    return null;
  }

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
    <div className="flex flex-col gap-4 px-4 sm:px-0">
      <Title level={4} className="text-lg sm:text-xl">
        Беременность и грудное вскармливание
      </Title>
      <Form layout="vertical" className="w-full">
        <Form.Item className="mb-2">
          <Radio.Group
            value={state.pregnancyStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full"
          >
            <Space direction="vertical" className="w-full">
              <Radio.Button
                value="pregnant"
                className="w-full h-10 sm:h-12 flex items-center px-3 sm:px-4 text-sm sm:text-base"
              >
                Да, я беременна
              </Radio.Button>
              <Radio.Button
                value="breastfeeding"
                className="w-full h-10 sm:h-12 flex items-center px-3 sm:px-4 text-sm sm:text-base"
              >
                Да, кормлю грудью
              </Radio.Button>
              <Radio.Button
                value="none"
                className="w-full h-10 sm:h-12 flex items-center px-3 sm:px-4 text-sm sm:text-base"
              >
                Нет
              </Radio.Button>
            </Space>
          </Radio.Group>
        </Form.Item>

        {state.pregnancyStatus === 'pregnant' && (
          <Form.Item className="mb-2">
            <Title level={5} className="text-base sm:text-lg">
              На каком сроке беременности вы находитесь?
            </Title>
            <Radio.Group
              value={state.pregnancyTerm}
              onChange={(e) => handleTermChange(e.target.value)}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                <Radio.Button
                  value="first_trimester"
                  className="w-full h-10 sm:h-12 flex items-center px-3 sm:px-4 text-sm sm:text-base"
                >
                  Первый триместр
                </Radio.Button>
                <Radio.Button
                  value="second_trimester"
                  className="w-full h-10 sm:h-12 flex items-center px-3 sm:px-4 text-sm sm:text-base"
                >
                  Второй триместр
                </Radio.Button>
                <Radio.Button
                  value="third_trimester"
                  className="w-full h-10 sm:h-12 flex items-center px-3 sm:px-4 text-sm sm:text-base"
                >
                  Третий триместр
                </Radio.Button>
              </Space>
            </Radio.Group>
          </Form.Item>
        )}

        {state.pregnancyStatus === 'breastfeeding' && (
          <Form.Item className="mb-2">
            <Title level={5} className="text-base sm:text-lg">
              Как долго вы кормите грудью?
            </Title>
            <Radio.Group
              value={state.breastfeedingTerm}
              onChange={(e) => handleTermChange(e.target.value)}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                <Radio.Button
                  value="early"
                  className="w-full h-10 sm:h-12 flex items-center px-3 sm:px-4 text-sm sm:text-base"
                >
                  До 3 месяцев
                </Radio.Button>
                <Radio.Button
                  value="middle"
                  className="w-full h-10 sm:h-12 flex items-center px-3 sm:px-4 text-sm sm:text-base"
                >
                  3-6 месяцев
                </Radio.Button>
                <Radio.Button
                  value="late"
                  className="w-full h-10 sm:h-12 flex items-center px-3 sm:px-4 text-sm sm:text-base"
                >
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
