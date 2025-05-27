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
        title="Динамика показателей"
        extra={
          <Select value={selectedMetric} onChange={setSelectedMetric} style={{ width: 200 }}>
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
            <div
              style={{
                height: 300,
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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
    </div>
  );
}
