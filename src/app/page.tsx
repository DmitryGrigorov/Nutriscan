'use client';

import { Typography, Layout, Button, Space } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import SurveyForm from '@/components/survey/SurveyForm';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function HomePage() {
    const router = useRouter();
    const { user } = useAuth();

    return (
        <Content style={{ padding: '50px', maxWidth: 1200, margin: '0 auto' }}>
            <Title>NutriScan</Title>
            <Paragraph>
                Добро пожаловать в NutriScan! Пройдите короткий опрос, чтобы мы могли
                подобрать для вас персональные рекомендации по питанию и тренировкам.
            </Paragraph>

            {user ? (
                <div style={{ maxWidth: 600, margin: '40px auto' }}>
                    <SurveyForm />
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Space size="large">
                        <Button type="primary" size="large" onClick={() => router.push('/auth/login')}>
                            Войти
                        </Button>
                        <Button size="large" onClick={() => router.push('/auth/register')}>
                            Зарегистрироваться
                        </Button>
                    </Space>
                    <Paragraph style={{ marginTop: '20px' }}>
                        Войдите или зарегистрируйтесь, чтобы пройти опрос
                    </Paragraph>
                </div>
            )}
        </Content>
    );
} 