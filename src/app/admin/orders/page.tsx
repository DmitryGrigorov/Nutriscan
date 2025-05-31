'use client';

import React from 'react';
import { Table, Card, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: string;
  total: number;
}

const columns: ColumnsType<Order> = [
  {
    title: 'ID заказа',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Имя клиента',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Сумма',
    dataIndex: 'total',
    key: 'total',
    render: (value) => `${value} ₽`,
  },
];

// Временные данные для примера
const mockData: Order[] = [
  {
    id: '1',
    customerName: 'Иван Иванов',
    date: '2024-03-20',
    status: 'В обработке',
    total: 1500,
  },
  {
    id: '2',
    customerName: 'Петр Петров',
    date: '2024-03-19',
    status: 'Доставлен',
    total: 2300,
  },
];

export default function OrdersPage() {
  return (
    <div>
      <Title level={2}>Заказы</Title>
      <Card>
        <Table columns={columns} dataSource={mockData} rowKey="id" pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
}
