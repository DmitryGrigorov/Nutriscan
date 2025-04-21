'use client';

import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

interface AuthFormProps {
  mode: 'login' | 'register';
}

interface FormValues {
  email: string;
  password: string;
  name?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { login, register } = useAuth();
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: FormValues) => {
    try {
      if (mode === 'register') {
        await register(values.email, values.password, values.name!);
      } else {
        await login(values.email, values.password);
      }
      router.push('/dashboard');
    } catch (error) {
      // Ошибка уже обработана в контексте
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: '0 auto', marginTop: 24 }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        {mode === 'login' ? 'Вход' : 'Регистрация'}
      </Title>
      <Form form={form} name="auth" onFinish={onFinish} layout="vertical">
        {mode === 'register' && (
          <Form.Item name="name" rules={[{ required: true, message: 'Введите ваше имя' }]}>
            <Input prefix={<UserOutlined />} placeholder="Имя" size="large" />
          </Form.Item>
        )}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Введите email' },
            { type: 'email', message: 'Некорректный email' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
