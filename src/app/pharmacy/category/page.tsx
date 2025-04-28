'use client';

import React from 'react';
import { Card, Row, Col, Typography, List, Tag, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Paragraph } = Typography;

// Mock data for categories
const categories = [
  {
    id: 1,
    name: 'Витамины',
    description: 'Витамины для поддержания здоровья и укрепления иммунитета',
    productCount: 24,
    image: 'https://via.placeholder.com/300x150',
  },
  {
    id: 2,
    name: 'Минералы',
    description: 'Минералы для нормализации обмена веществ и укрепления организма',
    productCount: 18,
    image: 'https://via.placeholder.com/300x150',
  },
  {
    id: 3,
    name: 'Жирные кислоты',
    description: 'Омега-3 и другие жирные кислоты для здоровья сердца и мозга',
    productCount: 12,
    image: 'https://via.placeholder.com/300x150',
  },
  {
    id: 4,
    name: 'Пробиотики',
    description: 'Пробиотики для здоровья кишечника и укрепления иммунитета',
    productCount: 15,
    image: 'https://via.placeholder.com/300x150',
  },
  {
    id: 5,
    name: 'Белки',
    description: 'Протеины и аминокислоты для поддержания мышечной массы',
    productCount: 20,
    image: 'https://via.placeholder.com/300x150',
  },
  {
    id: 6,
    name: 'Антиоксиданты',
    description: 'Антиоксиданты для защиты клеток от свободных радикалов',
    productCount: 10,
    image: 'https://via.placeholder.com/300x150',
  },
];

export default function CategoryPage() {
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/pharmacy?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Категории продуктов</Title>
      <Paragraph>Выберите категорию витаминов и добавок</Paragraph>

      <Row gutter={[16, 16]}>
        {categories.map(category => (
          <Col xs={24} sm={12} md={8} key={category.id}>
            <Card
              hoverable
              cover={<img alt={category.name} src={category.image} style={{ height: 150, objectFit: 'cover' }} />}
              onClick={() => handleCategoryClick(category.name)}
            >
              <Card.Meta
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{category.name}</span>
                    <Tag color="blue">{category.productCount} товаров</Tag>
                  </div>
                }
                description={category.description}
              />
              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <Button type="link" icon={<RightOutlined />}>
                  Перейти к товарам
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
} 