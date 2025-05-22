'use client';

import React, { useState } from 'react';
import { Card, Form, Input, Button, Steps, message, Radio, Checkbox } from 'antd';
import { useRouter } from 'next/navigation';
import { appwriteApi } from '@/lib/appwrite/api';
import { BasePage } from '@/components/dashboard/BasePage';

const { TextArea } = Input;

interface HealthAssessmentFormData {
  generalHealth: 'excellent' | 'good' | 'fair' | 'poor';
  chronicConditions: string[];
  medications: string;
  allergies: string;
  sleepQuality: 'excellent' | 'good' | 'fair' | 'poor';
  stressLevel: 'low' | 'medium' | 'high';
  energyLevel: 'high' | 'medium' | 'low';
  physicalActivity: 'daily' | 'weekly' | 'monthly' | 'rarely';
  healthGoals: string[];
  additionalInfo: string;
}

export default function HealthAssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const router = useRouter();

  const steps = [
    {
      title: 'Общее состояние здоровья',
      content: (
        <>
          <Form.Item
            name="generalHealth"
            label="Как бы вы оценили ваше общее состояние здоровья?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value="excellent">Отличное</Radio>
              <Radio value="good">Хорошее</Radio>
              <Radio value="fair">Удовлетворительное</Radio>
              <Radio value="poor">Плохое</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="chronicConditions" label="Есть ли у вас хронические заболевания?">
            <Checkbox.Group>
              <Checkbox value="hypertension">Гипертония</Checkbox>
              <Checkbox value="diabetes">Сахарный диабет</Checkbox>
              <Checkbox value="heartDisease">Заболевания сердца</Checkbox>
              <Checkbox value="gastrointestinal">Заболевания ЖКТ</Checkbox>
              <Checkbox value="thyroid">Заболевания щитовидной железы</Checkbox>
              <Checkbox value="other">Другое</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="medications" label="Какие лекарства вы принимаете регулярно?">
            <TextArea rows={4} placeholder="Укажите названия и дозировки" />
          </Form.Item>
          <Form.Item name="allergies" label="Есть ли у вас аллергии?">
            <TextArea rows={4} placeholder="Укажите аллергены и реакции" />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Образ жизни',
      content: (
        <>
          <Form.Item
            name="sleepQuality"
            label="Как вы оцениваете качество вашего сна?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value="excellent">Отличное</Radio>
              <Radio value="good">Хорошее</Radio>
              <Radio value="fair">Удовлетворительное</Radio>
              <Radio value="poor">Плохое</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="stressLevel"
            label="Какой у вас уровень стресса?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value="low">Низкий</Radio>
              <Radio value="medium">Средний</Radio>
              <Radio value="high">Высокий</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="energyLevel"
            label="Какой у вас уровень энергии в течение дня?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value="high">Высокий</Radio>
              <Radio value="medium">Средний</Radio>
              <Radio value="low">Низкий</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="physicalActivity"
            label="Как часто вы занимаетесь физической активностью?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value="daily">Ежедневно</Radio>
              <Radio value="weekly">Несколько раз в неделю</Radio>
              <Radio value="monthly">Несколько раз в месяц</Radio>
              <Radio value="rarely">Редко</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Цели и ожидания',
      content: (
        <>
          <Form.Item
            name="healthGoals"
            label="Какие цели в отношении здоровья вы хотели бы достичь?"
            rules={[{ required: true, message: 'Пожалуйста, выберите хотя бы одну цель' }]}
          >
            <Checkbox.Group>
              <Checkbox value="weightLoss">Снижение веса</Checkbox>
              <Checkbox value="muscleGain">Набор мышечной массы</Checkbox>
              <Checkbox value="energyBoost">Повышение энергии</Checkbox>
              <Checkbox value="betterSleep">Улучшение сна</Checkbox>
              <Checkbox value="stressReduction">Снижение стресса</Checkbox>
              <Checkbox value="immunityBoost">Укрепление иммунитета</Checkbox>
              <Checkbox value="digestion">Улучшение пищеварения</Checkbox>
              <Checkbox value="other">Другое</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="additionalInfo" label="Дополнительная информация">
            <TextArea
              rows={4}
              placeholder="Опишите любые дополнительные аспекты вашего здоровья, которые вы хотели бы улучшить"
            />
          </Form.Item>
        </>
      ),
    },
  ];

  const handleSubmit = async (values: HealthAssessmentFormData) => {
    try {
      await appwriteApi.surveys.saveHealthAssessment(values);
      message.success('Спасибо за заполнение анкеты!');
      router.push('/dashboard/surveys');
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
    <BasePage title="Оценка состояния здоровья">
      <Card>
        <Steps current={currentStep} items={steps.map((step) => ({ title: step.title }))} />
        <div style={{ marginTop: 24 }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              chronicConditions: [],
              healthGoals: [],
            }}
          >
            {steps[currentStep].content}
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
              {currentStep > 0 && <Button onClick={prev}>Назад</Button>}
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
