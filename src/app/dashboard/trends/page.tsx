'use client';

import React, { useState } from 'react';
import { Card, Typography, Select, Space, List } from 'antd';
import { BasePage } from '@/components/dashboard/BasePage';

const { Title, Text } = Typography;
const { Option } = Select;

interface TrendData {
  date: string;
  value: number;
}

const mockData: Record<string, TrendData[]> = {
  weight: [
    { date: '2024-01-01', value: 75 },
    { date: '2024-02-01', value: 74 },
    { date: '2024-03-01', value: 73 },
    { date: '2024-04-01', value: 72 },
  ],
  bmi: [
    { date: '2024-01-01', value: 24.5 },
    { date: '2024-02-01', value: 24.2 },
    { date: '2024-03-01', value: 23.9 },
    { date: '2024-04-01', value: 23.6 },
  ],
  activity: [
    { date: '2024-01-01', value: 5000 },
    { date: '2024-02-01', value: 6000 },
    { date: '2024-03-01', value: 7000 },
    { date: '2024-04-01', value: 8000 },
  ],
};

export default function TrendsPage() {
  const [selectedMetric, setSelectedMetric] = useState('weight');

  return (
    <BasePage
      title="Динамика показателей"
      extra={
        <Select
          value={selectedMetric}
          onChange={setSelectedMetric}
          style={{ width: 200 }}
        >
          <Option value="weight">Вес (кг)</Option>
          <Option value="bmi">ИМТ</Option>
          <Option value="activity">Активность (шаги)</Option>
        </Select>
      }
    >
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={4}>
            {selectedMetric === 'weight'
              ? 'Динамика веса'
              : selectedMetric === 'bmi'
              ? 'Динамика ИМТ'
              : 'Динамика активности'}
          </Title>
          <div style={{ height: 300, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text type="secondary">График будет отображаться здесь</Text>
          </div>
          <List
            dataSource={mockData[selectedMetric]}
            renderItem={(item) => (
              <List.Item>
                <Space>
                  <Text>{new Date(item.date).toLocaleDateString()}</Text>
                  <Text strong>{item.value}</Text>
                </Space>
              </List.Item>
            )}
          />
        </Space>
      </Card>
    </BasePage>
  );
} 