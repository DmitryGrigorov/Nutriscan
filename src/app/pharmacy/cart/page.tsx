'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, List, Button, InputNumber, message, Typography, Space } from 'antd';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useCart } from '@/contexts/CartContext';

const { Title, Text } = Typography;

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (id: string, value: number | null) => {
    if (value === null || value < 1) {
      removeFromCart(id);
      message.success('Товар удален из корзины');
      return;
    }
    updateQuantity(id, value);
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    message.success('Товар удален из корзины');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Title level={3}>Корзина пуста</Title>
        <Text type="secondary">Добавьте товары в корзину, чтобы продолжить</Text>
        <div style={{ marginTop: '20px' }}>
          <Button
            type="primary"
            icon={<ShoppingOutlined />}
            onClick={() => router.push('/pharmacy')}
          >
            Перейти в каталог
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Корзина</Title>
      <List
        itemLayout="horizontal"
        dataSource={cart}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(item.id)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 64, height: 64, objectFit: 'cover' }}
                />
              }
              title={item.name}
              description={
                <Space>
                  <Text strong>{item.price} ₽</Text>
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(item.id, value)}
                  />
                  <Text strong>Итого: {item.price * item.quantity} ₽</Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />
      <Card style={{ marginTop: '24px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>Общая сумма:</Text>
            <Text strong>{calculateTotal()} ₽</Text>
          </div>
          <Space>
            <Button onClick={() => router.push('/pharmacy')}>Продолжить покупки</Button>
            <Button type="primary" onClick={() => router.push('/pharmacy/checkout')}>
              Оформить заказ
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
}
