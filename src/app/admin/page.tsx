'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  MedicineBoxOutlined,
  FormOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Databases, Query, Account } from 'appwrite';
import { client } from '@/lib/appwrite';

const databases = new Databases(client);
const account = new Account(client);
const PRODUCTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID || '';
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product count
        const productsResponse = await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID);
        setProductCount(productsResponse.total);

        // Fetch user count
        const usersResponse = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID);
        setUserCount(usersResponse.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Панель управления</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Всего товаров"
              value={productCount}
              prefix={<MedicineBoxOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Активные опросы" value={4} prefix={<FormOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Заказы сегодня" value={12} prefix={<ShoppingCartOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Пользователи" value={userCount} prefix={<UserOutlined />} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
