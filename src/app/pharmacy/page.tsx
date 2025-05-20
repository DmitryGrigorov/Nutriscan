'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Input, Select, Space, Spin, Empty, Tag, Button, message } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import { Databases, Query } from 'appwrite';
import { client } from '@/lib/appwrite';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useSearchParams, useRouter } from 'next/navigation';

const { Title } = Typography;
const { Option } = Select;

const databases = new Databases(client);
const PRODUCTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID || '';
const CATEGORIES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

export default function PharmacyPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;
    const categorySlug = searchParams.get('category');
    if (categorySlug) {
      const found = categories.find(cat => cat.slug === categorySlug);
      if (found) {
        setSelectedCategory(found.$id);
      } else {
        setSelectedCategory('all');
      }
    } else {
      setSelectedCategory('all');
    }
  }, [categories, searchParams]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === 'all') {
      router.push('/pharmacy');
    } else {
      const cat = categories.find(c => c.$id === value);
      if (cat) {
        router.push(`/pharmacy?category=${encodeURIComponent(cat.slug)}`);
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        [
          Query.equal('isActive', true),
          Query.orderDesc('$createdAt')
        ]
      );
      setProducts(response.documents as Product[]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CATEGORIES_COLLECTION_ID,
        [
          Query.equal('isActive', true),
          Query.orderDesc('$createdAt')
        ]
      );
      setCategories(response.documents as Category[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Аптека</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%', marginBottom: '24px' }}>
        <Input
          placeholder="Поиск товаров..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        
        <Select
          value={selectedCategory}
          style={{ width: 200 }}
          onChange={handleCategoryChange}
        >
          <Option value="all">Все категории</Option>
          {categories.map(category => (
            <Option key={category.$id} value={category.$id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Space>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <Empty description="Товары не найдены" />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredProducts.map(product => {
            const category = categories.find(cat => cat.$id === product.categoryId);
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={product.$id}>
                <Card
                  hoverable
                  cover={
                    product.imageUrl ? (
                      <div style={{ position: 'relative', height: '200px' }}>
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ) : null
                  }
                  actions={[
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
                    >
                      {product.stock > 0 ? 'В корзину' : 'Нет в наличии'}
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={product.name}
                    description={
                      <>
                        <div>{product.description}</div>
                        <div style={{ marginTop: 8 }}>
                          {category && <Tag color="blue">{category.name}</Tag>}
                          <Tag color="green">{product.price} ₽</Tag>
                          <Tag color={product.stock > 0 ? 'green' : 'red'}>
                            {product.stock > 0 ? `В наличии: ${product.stock}` : 'Нет в наличии'}
                          </Tag>
                        </div>
                      </>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
} 