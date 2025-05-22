'use client';

import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Steps,
  message,
  Radio,
  Checkbox,
} from 'antd';
import { useRouter } from 'next/navigation';
import { appwriteApi } from '@/lib/appwrite/api';
import { BasePage } from '@/components/dashboard/BasePage';

const { TextArea } = Input;

interface NutritionHabitsFormData {
  eatingSchedule: 'regular' | 'irregular' | 'skipsMeals';
  mealFrequency: number;
  breakfast: 'always' | 'sometimes' | 'rarely' | 'never';
  lunch: 'always' | 'sometimes' | 'rarely' | 'never';
  dinner: 'always' | 'sometimes' | 'rarely' | 'never';
  snacks: 'frequent' | 'occasional' | 'rare' | 'never';
  waterIntake: 'adequate' | 'insufficient' | 'excessive';
  foodPreferences: string[];
  dietaryRestrictions: string[];
  cookingHabits: 'home' | 'takeout' | 'mixed';
  additionalInfo: string;
}

export default function NutritionHabitsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const router = useRouter();

  const steps = [
    {
      title: 'Режим питания',
      content: (
        <>
          <Form.Item
            name="eatingSchedule"
            label="Как бы вы описали ваш режим питания?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value="regular">Регулярный</Radio>
              <Radio value="irregular">Нерегулярный</Radio>
              <Radio value="skipsMeals">Пропускаю приемы пищи</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="mealFrequency"
            label="Сколько раз в день вы обычно едите?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value={2}>2 раза</Radio>
              <Radio value={3}>3 раза</Radio>
              <Radio value={4}>4 раза</Radio>
              <Radio value={5}>5 раз</Radio>
              <Radio value={6}>6 и более раз</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="breakfast"
            label="Как часто вы завтракаете?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value="always">Всегда</Radio>
              <Radio value="sometimes">Иногда</Radio>
              <Radio value="rarely">Редко</Radio>
              <Radio value="never">Никогда</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="lunch"
            label="Как часто вы обедаете?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value="always">Всегда</Radio>
              <Radio value="sometimes">Иногда</Radio>
              <Radio value="rarely">Редко</Radio>
              <Radio value="never">Никогда</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="dinner"
            label="Как часто вы ужинаете?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value="always">Всегда</Radio>
              <Radio value="sometimes">Иногда</Radio>
              <Radio value="rarely">Редко</Radio>
              <Radio value="never">Никогда</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Пищевые привычки',
      content: (
        <>
          <Form.Item
            name="snacks"
            label="Как часто вы перекусываете между основными приемами пищи?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value="frequent">Часто</Radio>
              <Radio value="occasional">Иногда</Radio>
              <Radio value="rare">Редко</Radio>
              <Radio value="never">Никогда</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="waterIntake"
            label="Как вы оцениваете ваше потребление воды?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value="adequate">Достаточное</Radio>
              <Radio value="insufficient">Недостаточное</Radio>
              <Radio value="excessive">Избыточное</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="foodPreferences"
            label="Какие продукты вы предпочитаете?"
            rules={[{ required: true, message: 'Пожалуйста, выберите хотя бы один вариант' }]}
          >
            <Checkbox.Group>
              <Checkbox value="vegetables">Овощи</Checkbox>
              <Checkbox value="fruits">Фрукты</Checkbox>
              <Checkbox value="meat">Мясо</Checkbox>
              <Checkbox value="fish">Рыба</Checkbox>
              <Checkbox value="dairy">Молочные продукты</Checkbox>
              <Checkbox value="grains">Зерновые</Checkbox>
              <Checkbox value="sweets">Сладости</Checkbox>
              <Checkbox value="fastFood">Фастфуд</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Ограничения и предпочтения',
      content: (
        <>
          <Form.Item
            name="dietaryRestrictions"
            label="Есть ли у вас пищевые ограничения или предпочтения?"
          >
            <Checkbox.Group>
              <Checkbox value="vegetarian">Вегетарианство</Checkbox>
              <Checkbox value="vegan">Веганство</Checkbox>
              <Checkbox value="glutenFree">Безглютеновая диета</Checkbox>
              <Checkbox value="lactoseFree">Безлактозная диета</Checkbox>
              <Checkbox value="halal">Халяль</Checkbox>
              <Checkbox value="kosher">Кошерное питание</Checkbox>
              <Checkbox value="other">Другое</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="cookingHabits"
            label="Как вы обычно питаетесь?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group>
              <Radio value="home">Готовлю дома</Radio>
              <Radio value="takeout">Заказываю еду</Radio>
              <Radio value="mixed">Смешанный вариант</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="additionalInfo" label="Дополнительная информация">
            <TextArea
              rows={4}
              placeholder="Опишите любые дополнительные аспекты вашего питания, которые вы хотели бы улучшить"
            />
          </Form.Item>
        </>
      ),
    },
  ];

  const handleSubmit = async (values: NutritionHabitsFormData) => {
    try {
      await appwriteApi.surveys.saveNutritionHabits(values);
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
    <BasePage title="Пищевые привычки">
      <Card>
        <Steps current={currentStep} items={steps.map((step) => ({ title: step.title }))} />
        <div style={{ marginTop: 24 }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              foodPreferences: [],
              dietaryRestrictions: [],
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
