'use client';

import React, { useState } from 'react';
import { Form, Select, InputNumber, Button, message } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { surveyService } from '@/services/surveyService';
import { SurveyFormData, Gender } from '@/types/survey';

const { Option } = Select;

const SurveyForm: React.FC = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<Gender | null>(null);

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
        name="ageGroup"
        label={<span className="text-sm sm:text-base">Возрастная группа</span>}
        rules={[{ required: true, message: 'Пожалуйста, выберите вашу возрастную группу' }]}
        className="mb-2"
      >
        <Select placeholder="Выберите вашу возрастную группу" className="text-sm sm:text-base">
          <Option value="18-24">18-24</Option>
          <Option value="25-34">25-34</Option>
          <Option value="35-44">35-44</Option>
          <Option value="45-54">45-54</Option>
          <Option value="55+">55+</Option>
        </Select>
      </Form.Item>

      {gender === 'female' && (
        <Form.Item
          name="pregnancyStatus"
          label={<span className="text-sm sm:text-base">Статус беременности</span>}
          rules={[{ required: true, message: 'Пожалуйста, выберите ваш статус беременности' }]}
          className="mb-2"
        >
          <Select placeholder="Выберите ваш статус беременности" className="text-sm sm:text-base">
            <Option value="not_pregnant">Не беременна</Option>
            <Option value="pregnant">Беременна</Option>
            <Option value="breastfeeding">Кормите грудью</Option>
          </Select>
        </Form.Item>
      )}

      <Form.Item
        name="height"
        label={<span className="text-sm sm:text-base">Рост (см)</span>}
        rules={[{ required: true, message: 'Пожалуйста, введите ваш рост' }]}
        className="mb-2"
      >
        <InputNumber
          min={100}
          max={250}
          className="w-full text-sm sm:text-base"
          placeholder="Введите ваш рост в сантиметрах"
        />
      </Form.Item>

      <Form.Item
        name="weight"
        label={<span className="text-sm sm:text-base">Вес (кг)</span>}
        rules={[{ required: true, message: 'Пожалуйста, введите ваш вес' }]}
        className="mb-2"
      >
        <InputNumber
          min={30}
          max={200}
          className="w-full text-sm sm:text-base"
          placeholder="Введите ваш вес в килограммах"
        />
      </Form.Item>

      <Form.Item
        name="activityLevel"
        label={<span className="text-sm sm:text-base">Уровень активности</span>}
        rules={[{ required: true, message: 'Пожалуйста, выберите ваш уровень активности' }]}
        className="mb-2"
      >
        <Select placeholder="Выберите ваш уровень активности" className="text-sm sm:text-base">
          <Option value="sedentary">Сейчас (мало или нет физических упражнений)</Option>
          <Option value="light">Легкий (тренировки 1-3 дня в неделю)</Option>
          <Option value="moderate">Средний (тренировки 3-5 дней в неделю)</Option>
          <Option value="very_active">Очень активный (тренировки 6-7 дней в неделю)</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="healthConditions"
        label={<span className="text-sm sm:text-base">Состояния здоровья</span>}
        rules={[{ required: true, message: 'Пожалуйста, введите ваши состояния здоровья' }]}
        className="mb-2"
      >
        <Select
          mode="tags"
          className="w-full text-sm sm:text-base"
          placeholder="Введите ваши состояния здоровья (нажмите enter для добавления)"
        />
      </Form.Item>

      <Form.Item
        name="allergies"
        label={<span className="text-sm sm:text-base">Аллергии</span>}
        rules={[{ required: true, message: 'Пожалуйста, введите ваши аллергии' }]}
        className="mb-2"
      >
        <Select
          mode="tags"
          className="w-full text-sm sm:text-base"
          placeholder="Введите ваши аллергии (нажмите enter для добавления)"
        />
      </Form.Item>

      <Form.Item
        name="dietaryRestrictions"
        label={<span className="text-sm sm:text-base">Диетические ограничения</span>}
        rules={[{ required: true, message: 'Пожалуйста, введите ваши диетические ограничения' }]}
        className="mb-2"
      >
        <Select
          mode="tags"
          className="w-full text-sm sm:text-base"
          placeholder="Введите ваши диетические ограничения (нажмите enter для добавления)"
        />
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
