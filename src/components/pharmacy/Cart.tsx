'use client';

import React, { useState } from 'react';
import {
  Drawer,
  List,
  Button,
  InputNumber,
  Typography,
  Divider,
  Space,
  Empty,
  message,
  Modal,
  Form,
  Input,
  Select,
} from 'antd';
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { useCart, CartItem } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

const { Text } = Typography;
const { Option } = Select;

interface CartProps {
  visible: boolean;
  onClose: () => void;
}

interface CheckoutFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
}

export const Cart: React.FC<CartProps> = ({ visible, onClose }) => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [form] = Form.useForm();
  // const router = useRouter();

  const handleCheckout = () => {
    if (items.length === 0) {
      message.warning('Корзина пуста');
      return;
    }
    setCheckoutModalVisible(true);
  };

  const handleCheckoutSubmit = async (values: CheckoutFormValues) => {
    // Mock payment processing
    message.loading({ content: 'Обработка заказа...', key: 'checkout' });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear cart and show success message
    clearCart();
    message.success({ content: 'Заказ успешно оформлен!', key: 'checkout' });

    // Close modals and redirect to order confirmation
    setCheckoutModalVisible(false);
    onClose();

    // In a real app, you would redirect to an order confirmation page
    // router.push('/orders/confirmation');
  };

  return (
    <>
      <Drawer
        title="Корзина"
        placement="right"
        onClose={onClose}
        open={visible}
        width={400}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={onClose}>Продолжить покупки</Button>
              <Button type="primary" onClick={handleCheckout} disabled={items.length === 0}>
                Оформить заказ
              </Button>
            </Space>
          </div>
        }
      >
        {items.length === 0 ? (
          <Empty
            image={<ShoppingCartOutlined style={{ fontSize: 64 }} />}
            description="Корзина пуста"
          />
        ) : (
          <>
            <List
              itemLayout="horizontal"
              dataSource={items}
              renderItem={(item: CartItem) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeItem(item.id)}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                      />
                    }
                    title={item.name}
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary">{item.category}</Text>
                        <Text strong>{item.price} ₽</Text>
                      </Space>
                    }
                  />
                  <div>
                    <Space>
                      <Button
                        size="small"
                        icon={<MinusOutlined />}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      />
                      <InputNumber
                        min={1}
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item.id, value || 1)}
                        style={{ width: 50 }}
                      />
                      <Button
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      />
                    </Space>
                  </div>
                </List.Item>
              )}
            />

            <Divider />

            <div style={{ marginBottom: 16 }}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Text>Товаров:</Text>
                <Text strong>{totalItems}</Text>
              </Space>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Text>Итого:</Text>
                <Text strong style={{ fontSize: 18 }}>
                  {totalPrice} ₽
                </Text>
              </Space>
            </div>

            <Button type="primary" block icon={<CreditCardOutlined />} onClick={handleCheckout}>
              Оформить заказ
            </Button>
          </>
        )}
      </Drawer>

      <Modal
        title="Оформление заказа"
        open={checkoutModalVisible}
        onCancel={() => setCheckoutModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCheckoutSubmit}
          initialValues={{ paymentMethod: 'card' }}
        >
          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true, message: 'Пожалуйста, введите ваше имя' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Пожалуйста, введите ваш email' },
              { type: 'email', message: 'Пожалуйста, введите корректный email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Телефон"
            rules={[{ required: true, message: 'Пожалуйста, введите ваш телефон' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Адрес доставки"
            rules={[{ required: true, message: 'Пожалуйста, введите адрес доставки' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="paymentMethod"
            label="Способ оплаты"
            rules={[{ required: true, message: 'Пожалуйста, выберите способ оплаты' }]}
          >
            <Select>
              <Option value="card">Банковская карта</Option>
              <Option value="cash">Наличные при получении</Option>
            </Select>
          </Form.Item>

          <Divider />

          <div style={{ marginBottom: 16 }}>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Text>Итого к оплате:</Text>
              <Text strong style={{ fontSize: 18 }}>
                {totalPrice} ₽
              </Text>
            </Space>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Подтвердить заказ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
