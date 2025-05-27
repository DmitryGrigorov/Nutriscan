'use client';

import React, { useState } from 'react';
import { Card, List, Typography, Button, Modal, Form, DatePicker, Select } from 'antd';
import { PlusOutlined, BellOutlined } from '@ant-design/icons';
import { BasePage } from '@/components/dashboard/BasePage';

const { Text } = Typography;
const { Option } = Select;

interface Reminder {
  id: string;
  type: string;
  nextDate: string;
  frequency: string;
  status: 'upcoming' | 'completed';
}

export default function AnalysisRemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'Общий анализ крови',
      nextDate: '2024-04-15',
      frequency: 'Каждые 3 месяца',
      status: 'upcoming',
    },
    {
      id: '2',
      type: 'Анализ на витамин D',
      nextDate: '2024-05-01',
      frequency: 'Каждые 6 месяцев',
      status: 'upcoming',
    },
    {
      id: '3',
      type: 'Биохимический анализ',
      nextDate: '2024-03-01',
      frequency: 'Каждые 6 месяцев',
      status: 'completed',
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddReminder = () => {
    form.validateFields().then((values) => {
      const newReminder: Reminder = {
        id: Date.now().toString(),
        type: values.type,
        nextDate: values.nextDate.format('YYYY-MM-DD'),
        frequency: values.frequency,
        status: 'upcoming',
      };
      setReminders([...reminders, newReminder]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <div
        style={{
          background: 'linear-gradient(120deg, #e0f7fa 0%, #f6fffe 100%)',
          padding: '16px 24px',
          borderRadius: '8px',
          marginBottom: '24px',
          border: '1px solid #2ec6c6',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            color: '#003b3b',
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              background: '#2ec6c6',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: '16px',
              marginRight: '12px',
              fontSize: '14px',
            }}
          >
            В разработке
          </span>
          Раздел находится в разработке
        </div>
      </div>

      <BasePage
        title="Напоминания о необходимости сдачи анализов"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            Добавить напоминание
          </Button>
        }
      >
        <List
          dataSource={reminders}
          renderItem={(reminder) => (
            <List.Item>
              <Card style={{ width: '100%' }}>
                <List.Item.Meta
                  avatar={<BellOutlined style={{ fontSize: '24px' }} />}
                  title={reminder.type}
                  description={
                    <>
                      <Text>
                        Следующая сдача: {new Date(reminder.nextDate).toLocaleDateString()}
                      </Text>
                      <br />
                      <Text>Частота: {reminder.frequency}</Text>
                      <br />
                      <Text>
                        Статус: {reminder.status === 'upcoming' ? 'Предстоящий' : 'Выполнен'}
                      </Text>
                    </>
                  }
                />
              </Card>
            </List.Item>
          )}
        />

        <Modal
          title="Добавить напоминание"
          open={isModalVisible}
          onOk={handleAddReminder}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="type"
              label="Тип анализа"
              rules={[{ required: true, message: 'Выберите тип анализа' }]}
            >
              <Select placeholder="Выберите тип анализа">
                <Option value="Общий анализ крови">Общий анализ крови</Option>
                <Option value="Биохимический анализ">Биохимический анализ</Option>
                <Option value="Анализ на витамин D">Анализ на витамин D</Option>
                <Option value="Гормональный профиль">Гормональный профиль</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="nextDate"
              label="Дата следующей сдачи"
              rules={[{ required: true, message: 'Выберите дату' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="frequency"
              label="Частота сдачи"
              rules={[{ required: true, message: 'Выберите частоту' }]}
            >
              <Select placeholder="Выберите частоту">
                <Option value="Каждый месяц">Каждый месяц</Option>
                <Option value="Каждые 3 месяца">Каждые 3 месяца</Option>
                <Option value="Каждые 6 месяцев">Каждые 6 месяцев</Option>
                <Option value="Каждый год">Каждый год</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </BasePage>
    </div>
  );
}
