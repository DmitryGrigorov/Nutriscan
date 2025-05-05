'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, message, Card, Typography } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, LineChartOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { appwriteApi } from '@/lib/appwrite/api';
import { UserProfile } from '@/types';

const { Title } = Typography;

interface ProfileFormProps {
  onComplete?: () => void;
  mode?: 'create' | 'edit';
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onComplete, mode = 'create' }) => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (mode === 'edit' && user) {
      loadProfile();
    }
  }, [mode, user]);

  const loadProfile = async () => {
    if (!user) return;
    try {
      const userProfile = await appwriteApi.profile.get(user.$id);
      if (userProfile) {
        setProfile(userProfile);
        form.setFieldsValue(userProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      message.error('Failed to load profile');
    }
  };

  const onFinish = async (values: Omit<UserProfile, '$id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) {
      message.error('Please login to save profile');
      return;
    }

    try {
      setLoading(true);
      if (mode === 'create') {
        await appwriteApi.profile.create(user.$id, values);
        message.success('Profile created successfully!');
      } else {
        await appwriteApi.profile.update(user.$id, values);
        message.success('Profile updated successfully!');
      }
      onComplete?.();
    } catch (error) {
      console.error('Error saving profile:', error);
      message.error('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
        {mode === 'create' ? 'Завершите ваш профиль' : 'Редактировать профиль'}
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={profile || undefined}
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше ФИО' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Введите ваше ФИО" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш email' },
            { type: 'email', message: 'Пожалуйста, введите корректный email' }
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Введите ваш email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Номер телефона"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш номер телефона' }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Введите ваш номер телефона" />
        </Form.Item>

        <Form.Item
          name="age"
          label="Возраст"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш возраст' }]}
        >
          <InputNumber
            prefix={<CalendarOutlined />}
            min={1}
            max={120}
            style={{ width: '100%' }}
            placeholder="Введите ваш возраст"
          />
        </Form.Item>

        <Form.Item
          name="weight"
          label="Weight (kg)"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш вес' }]}
        >
          <InputNumber
            prefix={<LineChartOutlined />}
            min={1}
            max={500}
            style={{ width: '100%' }}
            placeholder="Введите ваш вес в кг"
          />
        </Form.Item>

        <Form.Item
          name="height"
          label="Рост (см)"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш рост' }]}
        >
          <InputNumber
            prefix={<ArrowsAltOutlined />}
            min={1}
            max={300}
            style={{ width: '100%' }}
            placeholder="Введите ваш рост в см"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {mode === 'create' ? 'Завершить' : 'Сохранить изменения'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}; 