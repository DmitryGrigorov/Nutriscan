'use client';

import React, { useState } from 'react';
import { Form, Select, InputNumber, Button, message, Input } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { surveyService } from '@/services/surveyService';
import { SurveyFormData } from '@/types';

const { Option } = Select;

const SurveyForm: React.FC = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  console.log(gender);

  const onFinish = async (values: SurveyFormData) => {
    if (!user) {
      message.error('Please login to submit the survey');
      return;
    }

    try {
      setLoading(true);
      await surveyService.createSurvey(user.$id, values);
      message.success('Survey submitted successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error submitting survey:', error);
      message.error('Failed to submit survey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="w-full max-w-[600px] mx-auto px-4 sm:px-0"
    >
      <Form.Item
        name="age"
        label={<span className="text-sm sm:text-base">Возраст</span>}
        rules={[{ required: true, message: 'Пожалуйста, введите ваш возраст' }]}
        className="mb-2"
      >
        <InputNumber
          min={18}
          max={100}
          className="w-full text-sm sm:text-base"
          placeholder="Введите ваш возраст"
        />
      </Form.Item>

      <Form.Item
        name="gender"
        label={<span className="text-sm sm:text-base">Пол</span>}
        rules={[{ required: true, message: 'Пожалуйста, выберите ваш пол' }]}
        className="mb-2"
      >
        <Select
          placeholder="Выберите ваш пол"
          onChange={(value) => setGender(value)}
          className="text-sm sm:text-base"
        >
          <Option value="male">Мужской</Option>
          <Option value="female">Женский</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="goal"
        label={<span className="text-sm sm:text-base">Цель</span>}
        rules={[{ required: true, message: 'Пожалуйста, выберите вашу цель' }]}
        className="mb-2"
      >
        <Select placeholder="Выберите вашу цель" className="text-sm sm:text-base">
          <Option value="weight-loss">Снижение веса</Option>
          <Option value="muscle-gain">Набор мышечной массы</Option>
          <Option value="maintenance">Поддержание веса</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="activityLevel"
        label={<span className="text-sm sm:text-base">Уровень активности</span>}
        rules={[{ required: true, message: 'Пожалуйста, выберите ваш уровень активности' }]}
        className="mb-2"
      >
        <Select placeholder="Выберите ваш уровень активности" className="text-sm sm:text-base">
          <Option value="sedentary">Малоподвижный</Option>
          <Option value="moderate">Умеренный</Option>
          <Option value="active">Активный</Option>
          <Option value="very-active">Очень активный</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="education"
        label={<span className="text-sm sm:text-base">Образование</span>}
        rules={[{ required: true, message: 'Пожалуйста, выберите ваше образование' }]}
        className="mb-2"
      >
        <Select placeholder="Выберите ваше образование" className="text-sm sm:text-base">
          <Option value="higher">Высшее</Option>
          <Option value="secondary">Среднее</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="location"
        label={<span className="text-sm sm:text-base">Местоположение</span>}
        rules={[{ required: true, message: 'Пожалуйста, введите ваше местоположение' }]}
        className="mb-2"
      >
        <Input placeholder="Введите ваше местоположение" className="text-sm sm:text-base" />
      </Form.Item>

      <Form.Item
        name="lifestyle"
        label={<span className="text-sm sm:text-base">Образ жизни</span>}
        rules={[
          { required: true, message: 'Пожалуйста, выберите характеристики вашего образа жизни' },
        ]}
        className="mb-2"
      >
        <Select
          mode="multiple"
          placeholder="Выберите характеристики вашего образа жизни"
          className="text-sm sm:text-base"
        >
          <Option value="healthyLifestyle">Ведет здоровый образ жизни</Option>
          <Option value="selfDevelopment">Занимается саморазвитием</Option>
          <Option value="healthValues">Ценит здоровье</Option>
          <Option value="longevityValues">Ценит долголетие</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="onlineActivity"
        label={<span className="text-sm sm:text-base">Онлайн активность</span>}
        rules={[{ required: true, message: 'Пожалуйста, выберите вашу онлайн активность' }]}
        className="mb-2"
      >
        <Select
          mode="multiple"
          placeholder="Выберите вашу онлайн активность"
          className="text-sm sm:text-base"
        >
          <Option value="healthResearch">Изучает информацию о здоровье</Option>
          <Option value="supplementsResearch">Изучает информацию о добавках</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="buyingHabits"
        label={<span className="text-sm sm:text-base">Привычки покупок</span>}
        rules={[{ required: true, message: 'Пожалуйста, выберите ваши привычки покупок' }]}
        className="mb-2"
      >
        <Select
          mode="multiple"
          placeholder="Выберите ваши привычки покупок"
          className="text-sm sm:text-base"
        >
          <Option value="regularPurchases">Регулярные покупки</Option>
          <Option value="trustReviews">Доверяет отзывам</Option>
          <Option value="trustExperts">Доверяет экспертам</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="painPoints"
        label={<span className="text-sm sm:text-base">Проблемные места</span>}
        rules={[{ required: true, message: 'Пожалуйста, выберите ваши проблемные места' }]}
        className="mb-2"
      >
        <Select
          mode="multiple"
          placeholder="Выберите ваши проблемные места"
          className="text-sm sm:text-base"
        >
          <Option value="lackOfTime">Нехватка времени</Option>
          <Option value="difficultyChoosing">Сложность выбора</Option>
          <Option value="overwhelmedByChoice">Перегружен выбором</Option>
          <Option value="tooManyPills">Слишком много таблеток</Option>
        </Select>
      </Form.Item>

      <Form.Item className="mb-2">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full h-10 sm:h-12 text-sm sm:text-base"
        >
          Отправить опрос
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SurveyForm;
