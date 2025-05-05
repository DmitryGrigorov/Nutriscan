'use client';

import React, { useState } from 'react';
import { Card, Form, Input, Select, Checkbox, Button, Typography, Steps, message } from 'antd';
import { useRouter } from 'next/navigation';
import { appwriteApi } from '@/lib/appwrite/api';
import { BasePage } from '@/components/dashboard/BasePage';
import { SurveyFormData } from '@/types';

const { Title, Text } = Typography;
const { Option } = Select;

export default function UserProfileSurveyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const router = useRouter();

  const steps = [
    {
      title: 'Общая информация',
      content: (
        <>
          <Form.Item
            name="education"
            label="Уровень образования"
            rules={[{ required: true, message: 'Пожалуйста, выберите уровень образования' }]}
          >
            <Select placeholder="Выберите уровень образования">
              <Option value="higher">Высшее образование</Option>
              <Option value="secondary">Среднее специальное образование</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="location"
            label="Место проживания"
            rules={[{ required: true, message: 'Пожалуйста, укажите место проживания' }]}
          >
            <Select placeholder="Выберите город">
              <Option value="moscow">Москва</Option>
              <Option value="spb">Санкт-Петербург</Option>
              <Option value="million">Город-миллионник</Option>
              <Option value="large">Крупный город</Option>
              <Option value="medium">Средний город</Option>
            </Select>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Образ жизни и ценности',
      content: (
        <>
          <Form.Item name={['lifestyle', 'healthyLifestyle']} valuePropName="checked">
            <Checkbox>Я веду здоровый образ жизни</Checkbox>
          </Form.Item>
          <Form.Item name={['lifestyle', 'selfDevelopment']} valuePropName="checked">
            <Checkbox>Я стремлюсь к саморазвитию</Checkbox>
          </Form.Item>
          <Form.Item name={['lifestyle', 'healthValues']} valuePropName="checked">
            <Checkbox>Здоровье является для меня важной ценностью</Checkbox>
          </Form.Item>
          <Form.Item name={['lifestyle', 'longevityValues']} valuePropName="checked">
            <Checkbox>Я стремлюсь к долголетию и активному долголетию</Checkbox>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Онлайн активность',
      content: (
        <>
          <Form.Item name={['onlineActivity', 'healthResearch']} valuePropName="checked">
            <Checkbox>Я регулярно ищу информацию о здоровье в интернете</Checkbox>
          </Form.Item>
          <Form.Item name={['onlineActivity', 'supplementsResearch']} valuePropName="checked">
            <Checkbox>Я изучаю информацию о БАДах и витаминах</Checkbox>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Покупательские привычки',
      content: (
        <>
          <Form.Item name={['buyingHabits', 'regularPurchases']} valuePropName="checked">
            <Checkbox>Я регулярно покупаю витамины и БАДы</Checkbox>
          </Form.Item>
          <Form.Item name={['buyingHabits', 'trustReviews']} valuePropName="checked">
            <Checkbox>Я доверяю отзывам других пользователей</Checkbox>
          </Form.Item>
          <Form.Item name={['buyingHabits', 'trustExperts']} valuePropName="checked">
            <Checkbox>Я доверяю рекомендациям специалистов</Checkbox>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Трудности и проблемы',
      content: (
        <>
          <Form.Item name={['painPoints', 'lackOfTime']} valuePropName="checked">
            <Checkbox>У меня не хватает времени на изучение информации о БАДах</Checkbox>
          </Form.Item>
          <Form.Item name={['painPoints', 'difficultyChoosing']} valuePropName="checked">
            <Checkbox>Мне сложно подобрать подходящие БАДы</Checkbox>
          </Form.Item>
          <Form.Item name={['painPoints', 'overwhelmedByChoice']} valuePropName="checked">
            <Checkbox>Я теряюсь в большом ассортименте БАДов</Checkbox>
          </Form.Item>
          <Form.Item name={['painPoints', 'tooManyPills']} valuePropName="checked">
            <Checkbox>Мне не нравится принимать большое количество таблеток</Checkbox>
          </Form.Item>
        </>
      ),
    },
  ];

  const handleSubmit = async (values: SurveyFormData) => {
    try {
      await appwriteApi.surveys.saveUserProfileSurvey(values);
      message.success('Спасибо за заполнение анкеты!');
      router.push('/dashboard');
    } catch (error) {
      message.error('Произошла ошибка при сохранении данных');
      console.error('Error saving survey:', error);
    }
  };

  const next = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <BasePage title="Анкета пользователя">
      <Card>
        <Steps current={currentStep} items={steps.map(step => ({ title: step.title }))} />
        <div style={{ marginTop: 24 }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              lifestyle: {},
              onlineActivity: {},
              buyingHabits: {},
              painPoints: {},
            }}
          >
            {steps[currentStep].content}
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
              {currentStep > 0 && (
                <Button onClick={prev}>
                  Назад
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={next}>
                  Далее
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  Завершить
                </Button>
              )}
            </div>
          </Form>
        </div>
      </Card>
    </BasePage>
  );
} 