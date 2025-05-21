'use client';

import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  MedicineBoxOutlined,
  FormOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

export default function AdminDashboard() {
  return (
    <div>
      <h1>Панель управления</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Всего товаров" value={93} prefix={<MedicineBoxOutlined />} />
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
            <Statistic title="Пользователи" value={256} prefix={<UserOutlined />} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
