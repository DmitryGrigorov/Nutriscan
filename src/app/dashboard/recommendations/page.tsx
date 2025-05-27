'use client';

import React from 'react';
import { Card, List, Typography, Tag, Space } from 'antd';
import { BulbOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'nutrition' | 'supplements' | 'lifestyle' | 'exercise';
  priority: 'high' | 'medium' | 'low';
}

const recommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Увеличьте потребление витамина D',
    description:
      'На основе ваших анализов, уровень витамина D ниже нормы. Рекомендуется принимать 2000 МЕ витамина D ежедневно.',
    category: 'supplements',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Увеличьте физическую активность',
    description:
      'Для достижения вашей цели по снижению веса рекомендуется увеличить физическую активность до 150 минут в неделю.',
    category: 'exercise',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Сбалансируйте рацион питания',
    description:
      'Рекомендуется увеличить потребление белка до 1.6-2.2 г на кг веса и уменьшить потребление простых углеводов.',
    category: 'nutrition',
    priority: 'high',
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'red';
    case 'medium':
      return 'orange';
    case 'low':
      return 'green';
    default:
      return 'default';
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'nutrition':
      return 'Питание';
    case 'supplements':
      return 'БАДы';
    case 'lifestyle':
      return 'Образ жизни';
    case 'exercise':
      return 'Физическая активность';
    default:
      return category;
  }
};

export default function RecommendationsPage() {
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

      <Card>
        <Title level={2}>Персональные рекомендации</Title>
        <List
          dataSource={recommendations}
          renderItem={(recommendation) => (
            <List.Item>
              <Card style={{ width: '100%' }}>
                <List.Item.Meta
                  avatar={<BulbOutlined style={{ fontSize: '24px' }} />}
                  title={
                    <Space>
                      {recommendation.title}
                      <Tag color={getPriorityColor(recommendation.priority)}>
                        {recommendation.priority === 'high'
                          ? 'Высокий приоритет'
                          : recommendation.priority === 'medium'
                            ? 'Средний приоритет'
                            : 'Низкий приоритет'}
                      </Tag>
                      <Tag>{getCategoryLabel(recommendation.category)}</Tag>
                    </Space>
                  }
                  description={<Text>{recommendation.description}</Text>}
                />
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
