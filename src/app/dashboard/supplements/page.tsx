'use client';

import React, { useState } from 'react';
import { Card, List, Typography, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { PlusOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { BasePage } from '@/components/dashboard/BasePage';

const { Text } = Typography;
const { Option } = Select;

interface Supplement {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed';
}

export default function SupplementsPage() {
  const [supplements, setSupplements] = useState<Supplement[]>([
    {
      id: '1',
      name: 'Витамин D',
      dosage: '1000 МЕ',
      frequency: '1 раз в день',
      startDate: '2024-01-01',
      status: 'active',
    },
    {
      id: '2',
      name: 'Омега-3',
      dosage: '1000 мг',
      frequency: '2 раза в день',
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      status: 'completed',
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddSupplement = () => {
    form.validateFields().then((values) => {
      const newSupplement: Supplement = {
        id: Date.now().toString(),
        name: values.name,
        dosage: values.dosage,
        frequency: values.frequency,
        startDate: values.startDate.format('YYYY-MM-DD'),
        status: 'active',
      };
      setSupplements([...supplements, newSupplement]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <BasePage
      title="История потребления БАДов"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Добавить БАД
        </Button>
      }
    >
      <List
        dataSource={supplements}
        renderItem={(supplement) => (
          <List.Item>
            <Card style={{ width: '100%' }}>
              <List.Item.Meta
                avatar={<MedicineBoxOutlined style={{ fontSize: '24px' }} />}
                title={supplement.name}
                description={
                  <>
                    <Text>Дозировка: {supplement.dosage}</Text>
                    <br />
                    <Text>Частота приема: {supplement.frequency}</Text>
                    <br />
                    <Text>
                      Период приема: {new Date(supplement.startDate).toLocaleDateString()}
                      {supplement.endDate
                        ? ` - ${new Date(supplement.endDate).toLocaleDateString()}`
                        : ' - настоящее время'}
                    </Text>
                    <br />
                    <Text>
                      Статус:{' '}
                      {supplement.status === 'active' ? 'Активный' : 'Завершен'}
                    </Text>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="Добавить БАД"
        open={isModalVisible}
        onOk={handleAddSupplement}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Название"
            rules={[{ required: true, message: 'Введите название БАДа' }]}
          >
            <Input placeholder="Введите название БАДа" />
          </Form.Item>
          <Form.Item
            name="dosage"
            label="Дозировка"
            rules={[{ required: true, message: 'Введите дозировку' }]}
          >
            <Input placeholder="Введите дозировку" />
          </Form.Item>
          <Form.Item
            name="frequency"
            label="Частота приема"
            rules={[{ required: true, message: 'Выберите частоту приема' }]}
          >
            <Select placeholder="Выберите частоту приема">
              <Option value="1 раз в день">1 раз в день</Option>
              <Option value="2 раза в день">2 раза в день</Option>
              <Option value="3 раза в день">3 раза в день</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Дата начала приема"
            rules={[{ required: true, message: 'Выберите дату начала приема' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </BasePage>
  );
} 