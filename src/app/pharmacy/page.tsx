'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Input, Select, Space, Spin, Empty, Tag, Button, message, Pagination } from 'antd';
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

const pageSizeOptions = [8, 12, 16, 20, 24, 32, 50, 100];

export default function PharmacyPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

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

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Аптека</Title>
      
      <Space direction="horizontal" size="large" style={{ width: '100%', marginBottom: '24px', justifyContent: 'space-between' }}>
        <Space>
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
        <Space>
          <span>Товаров на страницу:</span>
          <Select
            value={pageSize}
            style={{ width: 80 }}
            onChange={value => {
              setPageSize(value);
              setCurrentPage(1);
            }}
          >
            {pageSizeOptions.map(size => (
              <Option key={size} value={size}>{size}</Option>
            ))}
          </Select>
        </Space>
      </Space>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <Empty description="Товары не найдены" />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {paginatedProducts.map(product => {
              const category = categories.find(cat => cat.$id === product.categoryId);
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={product.$id}>
                  <Link href={`/pharmacy/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <Card
                      hoverable
                      cover={
                        product.imageUrl ? (
                          <div style={{ position: 'relative', height: '200px' }}>
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
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
                  </Link>
                </Col>
              );
            })}
          </Row>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredProducts.length}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
} 