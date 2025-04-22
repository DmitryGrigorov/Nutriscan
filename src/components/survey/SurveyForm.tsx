'use client';

import React, { useState } from 'react';
import { Form, Input, Select, InputNumber, Button, message } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { surveyService } from '@/services/surveyService';
import { SurveyFormData, Gender, AgeGroup, PregnancyStatus, ActivityLevel } from '@/types/survey';

const { Option } = Select;

const SurveyForm: React.FC = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

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
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select your gender' }]}
      >
        <Select placeholder="Select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="ageGroup"
        label="Age Group"
        rules={[{ required: true, message: 'Please select your age group' }]}
      >
        <Select placeholder="Select your age group">
          <Option value="18-24">18-24</Option>
          <Option value="25-34">25-34</Option>
          <Option value="35-44">35-44</Option>
          <Option value="45-54">45-54</Option>
          <Option value="55+">55+</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="pregnancyStatus"
        label="Pregnancy Status"
        rules={[{ required: true, message: 'Please select your pregnancy status' }]}
      >
        <Select placeholder="Select your pregnancy status">
          <Option value="not_pregnant">Not Pregnant</Option>
          <Option value="pregnant">Pregnant</Option>
          <Option value="breastfeeding">Breastfeeding</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="height"
        label="Height (cm)"
        rules={[{ required: true, message: 'Please enter your height' }]}
      >
        <InputNumber
          min={100}
          max={250}
          style={{ width: '100%' }}
          placeholder="Enter your height in centimeters"
        />
      </Form.Item>

      <Form.Item
        name="weight"
        label="Weight (kg)"
        rules={[{ required: true, message: 'Please enter your weight' }]}
      >
        <InputNumber
          min={30}
          max={200}
          style={{ width: '100%' }}
          placeholder="Enter your weight in kilograms"
        />
      </Form.Item>

      <Form.Item
        name="activityLevel"
        label="Activity Level"
        rules={[{ required: true, message: 'Please select your activity level' }]}
      >
        <Select placeholder="Select your activity level">
          <Option value="sedentary">Sedentary (little or no exercise)</Option>
          <Option value="light">Light (exercise 1-3 days/week)</Option>
          <Option value="moderate">Moderate (exercise 3-5 days/week)</Option>
          <Option value="very_active">Very Active (exercise 6-7 days/week)</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="healthConditions"
        label="Health Conditions"
        rules={[{ required: true, message: 'Please enter your health conditions' }]}
      >
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Enter your health conditions (press enter to add)"
        />
      </Form.Item>

      <Form.Item
        name="allergies"
        label="Allergies"
        rules={[{ required: true, message: 'Please enter your allergies' }]}
      >
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Enter your allergies (press enter to add)"
        />
      </Form.Item>

      <Form.Item
        name="dietaryRestrictions"
        label="Dietary Restrictions"
        rules={[{ required: true, message: 'Please enter your dietary restrictions' }]}
      >
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Enter your dietary restrictions (press enter to add)"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Submit Survey
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SurveyForm;
