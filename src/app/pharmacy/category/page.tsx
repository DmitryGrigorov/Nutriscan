'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Button, Spin, Empty } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Databases, Query } from 'appwrite';
import { client } from '@/lib/appwrite';
import { Category } from '@/types/category';

const { Title, Paragraph } = Typography;

const databases = new Databases(client);
const CATEGORIES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

export default function CategoryPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, CATEGORIES_COLLECTION_ID, [
        Query.equal('isActive', true),
        Query.orderDesc('$createdAt'),
      ]);
      setCategories(response.documents as Category[]);
    } catch (error) {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (slug: string) => {
    router.push(`/pharmacy?category=${encodeURIComponent(slug)}`);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Категории продуктов</Title>
      <Paragraph>Выберите категорию витаминов и добавок</Paragraph>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : categories.length === 0 ? (
        <Empty description="Категории не найдены" />
      ) : (
        <Row gutter={[16, 16]}>
          {categories.map((category) => (
            <Col xs={24} sm={12} md={8} key={category.$id}>
              <Card
                hoverable
                cover={
                  category.imageUrl ? (
                    <img
                      alt={category.name}
                      src={category.imageUrl}
                      style={{ height: 150, objectFit: 'cover' }}
                    />
                  ) : null
                }
                onClick={() => handleCategoryClick(category.slug)}
              >
                <Card.Meta
                  title={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>{category.name}</span>
                      {/* <Tag color="blue">{category.productCount} товаров</Tag> */}
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
      )}
    </div>
  );
}
