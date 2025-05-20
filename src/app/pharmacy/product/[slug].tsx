"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Card, Tag, Button, Spin, message, Row, Col } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Databases, Query } from 'appwrite';
import { client } from '@/lib/appwrite';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

const { Title, Paragraph, Text } = Typography;

const databases = new Databases(client);
const PRODUCTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID || '';
const CATEGORIES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (slug) {
      fetchProduct(slug as string);
    }
    // eslint-disable-next-line
  }, [slug]);

  const fetchProduct = async (slug: string) => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        [Query.equal('slug', slug), Query.equal('isActive', true)]
      );
      if (response.documents.length > 0) {
        const prod = response.documents[0] as Product;
        setProduct(prod);
        fetchCategory(prod.categoryId);
      } else {
        setProduct(null);
      }
    } catch (error) {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async (categoryId: string) => {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        CATEGORIES_COLLECTION_ID,
        categoryId
      );
      setCategory(response as Category);
    } catch (error) {
      setCategory(null);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;
  }

  if (!product) {
    return <div style={{ textAlign: 'center', padding: '50px' }}><Title level={3}>Товар не найден</Title></div>;
  }

  return (
    <div style={{ padding: '24px', maxWidth: 900, margin: '0 auto' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()} style={{ marginBottom: 24 }}>
        Назад
      </Button>
      <Card>
        <Row gutter={[32, 16]} align="middle">
          <Col xs={24} md={10}>
            {product.imageUrl && (
              <div style={{ position: 'relative', width: '100%', height: 300 }}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover', borderRadius: 8 }}
                />
              </div>
            )}
          </Col>
          <Col xs={24} md={14}>
            <Title level={2}>{product.name}</Title>
            <div style={{ marginBottom: 16 }}>
              {category && <Tag color="blue">{category.name}</Tag>}
              <Tag color="green">{product.price} ₽</Tag>
              <Tag color={product.stock > 0 ? 'green' : 'red'}>
                {product.stock > 0 ? `В наличии: ${product.stock}` : 'Нет в наличии'}
              </Tag>
            </div>
            <Paragraph>{product.description}</Paragraph>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              disabled={product.stock === 0}
              onClick={() => {
                if (product.stock > 0) {
                  addToCart({
                    id: product.$id,
                    name: product.name,
                    price: product.price,
                    image: product.imageUrl || '',
                  });
                  message.success('Товар добавлен в корзину');
                } else {
                  message.error('Товар отсутствует в наличии');
                }
              }}
              size="large"
            >
              {product.stock > 0 ? 'В корзину' : 'Нет в наличии'}
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
} 