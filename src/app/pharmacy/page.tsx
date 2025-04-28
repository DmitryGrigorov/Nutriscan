'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input, Select, Typography, Tag, Space, Button, Pagination } from 'antd';
import { SearchOutlined, FilterOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

const { Title, Paragraph } = Typography;
const { Option } = Select;

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'Витамин D3',
    category: 'Витамины',
    price: 450,
    description: 'Витамин D3 для укрепления иммунитета и здоровья костей',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Омега-3',
    category: 'Жирные кислоты',
    price: 890,
    description: 'Омега-3 жирные кислоты для здоровья сердца и мозга',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Магний',
    category: 'Минералы',
    price: 320,
    description: 'Магний для нормализации сна и снижения стресса',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Пробиотики',
    category: 'Пробиотики',
    price: 780,
    description: 'Пробиотики для здоровья кишечника и иммунитета',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Коллаген',
    category: 'Белки',
    price: 1200,
    description: 'Коллаген для здоровья кожи, волос и суставов',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    name: 'Железо',
    category: 'Минералы',
    price: 420,
    description: 'Железо для профилактики анемии',
    image: 'https://via.placeholder.com/150',
  },
];

// Categories for filter
const categories = ['Все', 'Витамины', 'Минералы', 'Жирные кислоты', 'Пробиотики', 'Белки'];

export default function PharmacyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCart();
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
  const filteredProducts = mockProducts.filter(product => {
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
  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
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
                >
                  В корзину
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