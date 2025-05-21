'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Switch, DatePicker, message, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, FormOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface Survey {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  questionsCount: number;
}

export default function SurveysPage() {
  const router = useRouter();
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: 1,
      title: 'Опрос о витаминах',
      description: 'Выяснение потребностей в витаминах',
      startDate: '2023-10-01',
      endDate: '2023-12-31',
      isActive: true,
      questionsCount: 15,
    },
    {
      id: 2,
      title: 'Опрос о пищевых добавках',
      description: 'Анализ использования пищевых добавок',
      startDate: '2023-11-01',
      endDate: '2024-01-31',
      isActive: true,
      questionsCount: 20,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Период',
      key: 'period',
      render: (record: Survey) => (
        <span>
          {dayjs(record.startDate).format('DD.MM.YYYY')} -{' '}
          {dayjs(record.endDate).format('DD.MM.YYYY')}
        </span>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Активен' : 'Неактивен'}</Tag>
      ),
    },
    {
      title: 'Вопросов',
      dataIndex: 'questionsCount',
      key: 'questionsCount',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: Survey) => (
        <Space>
          <Button icon={<FormOutlined />} onClick={() => handleEditQuestions(record.id)} />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingSurvey(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (survey: Survey) => {
    setEditingSurvey(survey);
    form.setFieldsValue({
      ...survey,
      dateRange: [dayjs(survey.startDate), dayjs(survey.endDate)],
    });
    setIsModalVisible(true);
  };

  const handleEditQuestions = (surveyId: number) => {
    router.push(`/admin/surveys/${surveyId}`);
  };

  const handleDelete = (id: number) => {
    setSurveys(surveys.filter((survey) => survey.id !== id));
    message.success('Опрос удален');
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const { dateRange, ...rest } = values;
      const surveyData = {
        ...rest,
        startDate: dateRange[0].format('YYYY-MM-DD'),
        endDate: dateRange[1].format('YYYY-MM-DD'),
      };

      if (editingSurvey) {
        setSurveys(
          surveys.map((survey) =>
            survey.id === editingSurvey.id ? { ...survey, ...surveyData } : survey
          )
        );
        message.success('Опрос обновлен');
      } else {
        const newSurvey = {
          id: Math.max(...surveys.map((s) => s.id)) + 1,
          ...surveyData,
          questionsCount: 0,
        };
        setSurveys([...surveys, newSurvey]);
        message.success('Опрос добавлен');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Добавить опрос
        </Button>
      </div>

      <Table columns={columns} dataSource={surveys} rowKey="id" />

      <Modal
        title={editingSurvey ? 'Редактировать опрос' : 'Добавить опрос'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Название"
            rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[{ required: true, message: 'Пожалуйста, введите описание' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="Период проведения"
            rules={[{ required: true, message: 'Пожалуйста, выберите период' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="isActive" label="Активен" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
