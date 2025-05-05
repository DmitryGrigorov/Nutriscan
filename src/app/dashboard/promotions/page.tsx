'use client';

import React from 'react';
import { Card, List, Typography, Tag, Button, Space } from 'antd';
import { GiftOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { BasePage } from '@/components/dashboard/BasePage';

const { Text } = Typography;

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  category: 'supplements' | 'analyses' | 'consultation';
}

const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Скидка на комплекс витаминов',
    description:
      'Специальное предложение на комплекс витаминов группы B. Включает все необходимые витамины для поддержания здоровья.',
    discount: '20%',
    validUntil: '2024-05-01',
    category: 'supplements',
  },
  {
    id: '2',
    title: 'Акция на расширенный анализ крови',
    description:
      'Расширенный анализ крови со скидкой 15%. Включает все основные показатели здоровья.',
    discount: '15%',
    validUntil: '2024-04-15',
    category: 'analyses',
  },
  {
    id: '3',
    title: 'Бесплатная консультация нутрициолога',
    description:
      'При покупке любого комплекса БАДов получите бесплатную консультацию нутрициолога.',
    discount: '100%',
    validUntil: '2024-04-30',
    category: 'consultation',
  },
];

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'supplements':
      return 'БАДы';
    case 'analyses':
      return 'Анализы';
    case 'consultation':
      return 'Консультации';
    default:
      return category;
  }
};

export default function PromotionsPage() {
  return (
    <BasePage title="Акции и предложения">
      <List
        dataSource={promotions}
        renderItem={(promotion) => (
          <List.Item>
            <Card style={{ width: '100%' }}>
              <List.Item.Meta
                avatar={<GiftOutlined style={{ fontSize: '24px' }} />}
                title={
                  <Space>
                    {promotion.title}
                    <Tag color="red">{promotion.discount}</Tag>
                    <Tag>{getCategoryLabel(promotion.category)}</Tag>
                  </Space>
                }
                description={
                  <>
                    <Text>{promotion.description}</Text>
                    <br />
                    <Text type="secondary">
                      Действует до: {new Date(promotion.validUntil).toLocaleDateString()}
                    </Text>
                  </>
                }
              />
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                style={{ marginTop: '16px' }}
              >
                Воспользоваться предложением
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </BasePage>
  );
} 