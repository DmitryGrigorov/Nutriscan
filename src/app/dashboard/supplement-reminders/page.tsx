'use client';

import React, { useState } from 'react';
import { Card, List, Typography, Button, Modal, Form, DatePicker, Select, Input } from 'antd';
import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { BasePage } from '@/components/dashboard/BasePage';

const { Text } = Typography;
const { Option } = Select;

interface Reminder {
  id: string;
  name: string;
  nextPurchaseDate: string;
  frequency: string;
  status: 'upcoming' | 'completed';
}

export default function SupplementRemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      name: 'Витамин D',
      nextPurchaseDate: '2024-04-20',
      frequency: 'Каждые 2 месяца',
      status: 'upcoming',
    },
    {
      id: '2',
      name: 'Омега-3',
      nextPurchaseDate: '2024-05-01',
      frequency: 'Каждые 3 месяца',
      status: 'upcoming',
    },
    {
      id: '3',
      name: 'Магний',
      nextPurchaseDate: '2024-03-15',
      frequency: 'Каждые 2 месяца',
      status: 'completed',
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddReminder = () => {
    form.validateFields().then((values) => {
      const newReminder: Reminder = {
        id: Date.now().toString(),
        name: values.name,
        nextPurchaseDate: values.nextPurchaseDate.format('YYYY-MM-DD'),
        frequency: values.frequency,
        status: 'upcoming',
      };
      setReminders([...reminders, newReminder]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <BasePage
      title="Напоминания о необходимости купить БАДы"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
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
                avatar={<ShoppingCartOutlined style={{ fontSize: '24px' }} />}
                title={reminder.name}
                description={
                  <>
                    <Text>
                      Следующая покупка: {new Date(reminder.nextPurchaseDate).toLocaleDateString()}
                    </Text>
                    <br />
                    <Text>Частота: {reminder.frequency}</Text>
                    <br />
                    <Text>
                      Статус:{' '}
                      {reminder.status === 'upcoming' ? 'Предстоящий' : 'Выполнен'}
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
            name="name"
            label="Название БАДа"
            rules={[{ required: true, message: 'Введите название БАДа' }]}
          >
            <Input placeholder="Введите название БАДа" />
          </Form.Item>
          <Form.Item
            name="nextPurchaseDate"
            label="Дата следующей покупки"
            rules={[{ required: true, message: 'Выберите дату' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="frequency"
            label="Частота покупки"
            rules={[{ required: true, message: 'Выберите частоту' }]}
          >
            <Select placeholder="Выберите частоту">
              <Option value="Каждый месяц">Каждый месяц</Option>
              <Option value="Каждые 2 месяца">Каждые 2 месяца</Option>
              <Option value="Каждые 3 месяца">Каждые 3 месяца</Option>
              <Option value="Каждые 6 месяцев">Каждые 6 месяцев</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </BasePage>
  );
} 