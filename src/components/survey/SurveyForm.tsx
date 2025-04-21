'use client';

import React from 'react';
import { Form, InputNumber, Select, Button, Card, Typography } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { appwriteApi } from '@/lib/appwrite/api';

const { Title } = Typography;

const SurveyForm: React.FC = () => {
    const { user } = useAuth();
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        if (!user) return;

        try {
            await appwriteApi.surveys.create({
                userId: user.$id,
                ...values,
            });
            form.resetFields();
        } catch (error) {
            console.error('Error submitting survey:', error);
        }
    };

    return (
        <Card>
            <Title level={4}>Опросник</Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="age"
                    label="Возраст"
                    rules={[{ required: true, message: 'Укажите возраст' }]}
                >
                    <InputNumber min={18} max={100} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Пол"
                    rules={[{ required: true, message: 'Выберите пол' }]}
                >
                    <Select>
                        <Select.Option value="male">Мужской</Select.Option>
                        <Select.Option value="female">Женский</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="goal"
                    label="Цель"
                    rules={[{ required: true, message: 'Выберите цель' }]}
                >
                    <Select>
                        <Select.Option value="weight-loss">Снижение веса</Select.Option>
                        <Select.Option value="muscle-gain">Набор мышечной массы</Select.Option>
                        <Select.Option value="maintenance">Поддержание формы</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="activityLevel"
                    label="Уровень активности"
                    rules={[{ required: true, message: 'Выберите уровень активности' }]}
                >
                    <Select>
                        <Select.Option value="sedentary">Малоподвижный</Select.Option>
                        <Select.Option value="moderate">Умеренный</Select.Option>
                        <Select.Option value="active">Активный</Select.Option>
                        <Select.Option value="very-active">Очень активный</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Отправить
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default SurveyForm; 