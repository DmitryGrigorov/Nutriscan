'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input, Select, Typography, Tag, Space, Button, Pagination, message } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Product, initialProducts, categories } from '@/data/products';

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function PharmacyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, addToCart } = useCart();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Get category from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Update URL when category changes
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === 'Все') {
      router.push('/pharmacy');
    } else {
      router.push(`/pharmacy?category=${encodeURIComponent(value)}`);
    }
  };

  // Filter products based on search text and category
  const filteredProducts = initialProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    if (product.stock > 0) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image
      });
      message.success('Товар добавлен в корзину');
    } else {
      message.error('Товар отсутствует в наличии');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Аптека</Title>
      <Paragraph>Найдите необходимые вам витамины и добавки</Paragraph>
      
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Input
          placeholder="Поиск продуктов..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          value={selectedCategory}
          style={{ width: 200 }}
          onChange={handleCategoryChange}
        >
          {categories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
      </Space>

      <Row gutter={[16, 16]}>
        {paginatedProducts.map(product => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.image} style={{ height: 150, objectFit: 'cover' }} />}
              actions={[
                <Button 
                  type="primary" 
                  icon={<ShoppingCartOutlined />}
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
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
                      <Tag color="blue">{product.category}</Tag>
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
        ))}
      </Row>

      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Title level={4}>Товары не найдены</Title>
          <Paragraph>Попробуйте изменить параметры поиска</Paragraph>
        </div>
      )}

      {totalPages > 1 && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Pagination
            current={currentPage}
            total={filteredProducts.length}
            pageSize={pageSize}
            onChange={page => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
} 