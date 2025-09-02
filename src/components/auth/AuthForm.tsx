'use client';

import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import styles from './AuthForm.module.css';
const { Title, Text } = Typography;

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
  const [form] = Form.useForm();

  const onFinish = async (values: FormValues) => {
    try {
      if (mode === 'register') {
        await register(values.email, values.password, values.name!);
      } else {
        await login(values.email, values.password);
      }
    } catch (error) {
      // Ошибка уже обработана в контексте
    }
  };

  const formContent = (
    <>
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
      {mode === 'login' && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Text className={styles.linkText}>
            Нет аккаунта?{' '}
            <Link href="/auth/register" style={{ color: '#1890ff' }}>
              Зарегистрироваться
            </Link>
          </Text>
        </div>
      )}
      {mode === 'register' && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Text className={styles.linkText}>
            Уже есть аккаунт?{' '}
            <Link href="/auth/login" style={{ color: '#1890ff' }}>
              Войти
            </Link>
          </Text>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop version */}
      <div className={styles.desktopContainer}>
        <Card className={styles.card}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
            {mode === 'login' ? 'Вход' : 'Регистрация'}
          </Title>
          <Form form={form} name="auth" onFinish={onFinish} layout="vertical">
            {formContent}
          </Form>
        </Card>
      </div>

      {/* Mobile version */}
      <div className={styles.mobileContainer}>
        <div className={styles.mobileContent}>
          <Title level={3} className={styles.title}>
            {mode === 'login' ? 'Вход' : 'Регистрация'}
          </Title>
          <div className={styles.form}>
            <Form form={form} name="auth" onFinish={onFinish} layout="vertical">
              {formContent}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
