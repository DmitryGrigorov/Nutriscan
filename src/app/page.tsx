'use client';

import { Typography, Layout } from 'antd';
import { SurveyProvider } from '@/contexts/SurveyContext';
import SurveyForm from '@/components/survey/SurveyForm';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <Content style={{ padding: '50px', maxWidth: 1200, margin: '0 auto' }}>
      <Title>Комплексный опросник для подбора БАДов</Title>
      <Paragraph>
        Пройдите подробный опрос для персонализированного подбора БАДов. Мы учтем все ваши
        индивидуальные особенности и потребности.
      </Paragraph>

      <div style={{ maxWidth: 800, margin: '40px auto' }}>
        <SurveyProvider>
          <SurveyForm />
        </SurveyProvider>
      </div>
    </Content>
  );
}
